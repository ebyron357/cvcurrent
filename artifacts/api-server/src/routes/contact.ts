import { Router } from "express";
import { Resend } from "resend";

const contactRouter = Router();

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

type PgPool = {
  query: (sql: string, params?: unknown[]) => Promise<unknown>;
};

let _pool: PgPool | null | undefined;

async function getPool(): Promise<PgPool | null> {
  if (_pool !== undefined) return _pool;
  if (!process.env.DATABASE_URL) {
    console.warn("[Contact] DATABASE_URL not set — DB persistence unavailable");
    _pool = null;
    return null;
  }
  try {
    const { pool } = await import("@workspace/db");
    _pool = pool as PgPool;
    return _pool;
  } catch (err) {
    console.error("[Contact] DB pool init failed:", err);
    _pool = null;
    return null;
  }
}

async function persistToDb(data: ContactPayload): Promise<boolean> {
  const pool = await getPool();
  if (!pool) return false;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    await pool.query(
      "INSERT INTO contact_submissions (name, email, phone, message) VALUES ($1, $2, $3, $4)",
      [data.name, data.email, data.phone ?? null, data.message],
    );
    console.log("[Contact] Submission persisted to DB");
    return true;
  } catch (err) {
    console.error("[Contact] DB insert failed:", err);
    return false;
  }
}

async function syncToGHL(data: ContactPayload): Promise<boolean> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.log("[GHL] No credentials configured — skipping CRM sync");
    return false;
  }

  const nameParts = data.name.trim().split(" ");
  const firstName = nameParts[0] ?? data.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  const contactBody = {
    firstName,
    lastName,
    email: data.email,
    phone: data.phone || "",
    locationId,
    source: "Website Contact Form",
    tags: ["website-contact-form", "inbound"],
    customFields: [{ key: "message", field_value: data.message }],
  };

  // Try v2 API first (requires Private Integration token)
  try {
    const resV2 = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactBody),
    });

    if (resV2.ok) {
      console.log("[GHL] CRM contact created successfully (v2)");
      return true;
    }

    const v2Status = resV2.status;
    const v2Body = await resV2.text();

    // If 401 on v2, fall back to v1 (standard location API key)
    if (v2Status === 401) {
      console.log("[GHL] v2 auth failed — falling back to v1 API");
      const resV1 = await fetch("https://rest.gohighlevel.com/v1/contacts/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactBody),
      });

      if (resV1.ok) {
        console.log("[GHL] CRM contact created successfully (v1)");
        return true;
      }

      const v1Body = await resV1.text();
      console.error("[GHL] v1 CRM sync also failed:", resV1.status, v1Body);
      return false;
    }

    console.error("[GHL] v2 CRM sync failed:", v2Status, v2Body);
    return false;
  } catch (err) {
    console.error("[GHL] CRM sync network error:", err);
    return false;
  }
}

async function sendNotificationEmail(data: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY not set — skipping email notification");
    return false;
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeMessage = escapeHtml(data.message);
  const phoneLine = data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : "";

  try {
    const { error } = await resend.emails.send({
      from: "ClientVerse <notifications@clientverse.io>",
      to: ["support@clientverse.io"],
      subject: `New Contact Form Submission from ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #1a1a2e; margin-bottom: 4px;">New Contact Form Submission</h2>
          <p style="color: #666; margin-top: 0; margin-bottom: 24px; font-size: 14px;">Received from the ClientVerse website</p>
          <div style="background: #fff; border-radius: 6px; padding: 20px; margin-bottom: 16px; border: 1px solid #e5e5e5;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            ${phoneLine}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 4px;">${safeMessage}</p>
          </div>
          <p style="font-size: 12px; color: #999; text-align: center;">ClientVerse · support@clientverse.io</p>
        </div>
      `,
    });

    if (error) {
      console.error("[Email] Notification send failed:", error);
      return false;
    }

    console.log("[Email] Notification sent to support@clientverse.io");
    return true;
  } catch (err) {
    console.error("[Email] Notification send error:", err);
    return false;
  }
}

async function sendConfirmationEmail(data: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(data.name);
  const safeMessage = escapeHtml(data.message);

  try {
    const { error } = await resend.emails.send({
      from: "ClientVerse <notifications@clientverse.io>",
      to: [data.email],
      subject: "We received your message — ClientVerse",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #1a1a2e; margin-bottom: 4px;">Thanks for reaching out, ${safeName}!</h2>
          <p style="color: #444; margin-top: 8px;">We've received your message and will get back to you within 24 hours.</p>
          <div style="background: #fff; border-radius: 6px; padding: 20px; margin: 24px 0; border: 1px solid #e5e5e5;">
            <p style="margin: 0 0 8px 0; color: #666; font-size: 13px;"><strong>Your message:</strong></p>
            <p style="white-space: pre-wrap; margin: 0; color: #333;">${safeMessage}</p>
          </div>
          <p style="color: #444;">In the meantime, feel free to explore <a href="https://clientverse.io" style="color: #6c63ff;">clientverse.io</a>.</p>
          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 32px;">ClientVerse · support@clientverse.io</p>
        </div>
      `,
    });

    if (error) {
      console.error("[Email] Confirmation send failed:", error);
      return false;
    }

    console.log(`[Email] Confirmation sent to ${data.email}`);
    return true;
  } catch (err) {
    console.error("[Email] Confirmation send error:", err);
    return false;
  }
}

contactRouter.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body as ContactPayload;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }

  const payload: ContactPayload = {
    name: name.trim(),
    email: email.trim(),
    phone: phone?.trim() || undefined,
    message: message.trim(),
  };

  const [dbOk, ghlOk, emailOk] = await Promise.all([
    persistToDb(payload),
    syncToGHL(payload),
    sendNotificationEmail(payload),
  ]);

  if (!dbOk && !ghlOk && !emailOk) {
    console.error("[Contact] All delivery paths failed");
    res.status(500).json({ error: "Failed to deliver your message. Please try again or email us directly." });
    return;
  }

  const confirmationEnabled = process.env.SEND_CONTACT_CONFIRMATION !== "false";
  if (confirmationEnabled) {
    sendConfirmationEmail(payload).catch((err) =>
      console.error("[Email] Confirmation fire-and-forget error:", err),
    );
  }

  res.json({ success: true, message: "Message received! We will be in touch within 24 hours." });
});

export default contactRouter;

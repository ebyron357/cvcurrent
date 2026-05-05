import { Router } from "express";

const contactRouter = Router();

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

  try {
    const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email: data.email,
        phone: data.phone || "",
        locationId,
        source: "Website Contact Form",
        tags: ["website-contact-form", "inbound"],
        customFields: [{ key: "message", field_value: data.message }],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[GHL] CRM sync failed:", res.status, body);
      return false;
    }

    console.log("[GHL] CRM contact created successfully");
    return true;
  } catch (err) {
    console.error("[GHL] CRM sync network error:", err);
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

  const [dbOk, ghlOk] = await Promise.all([
    persistToDb(payload),
    syncToGHL(payload),
  ]);

  if (!dbOk && !ghlOk) {
    console.error("[Contact] All delivery paths failed");
    res.status(500).json({ error: "Failed to deliver your message. Please try again or email us directly." });
    return;
  }

  res.json({ success: true, message: "Message received! We will be in touch within 24 hours." });
});

export default contactRouter;

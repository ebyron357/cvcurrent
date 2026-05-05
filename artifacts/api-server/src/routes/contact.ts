import { Router } from "express";

const contactRouter = Router();

interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

async function submitContactToGHL(data: ContactSubmission): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.log("[GHL] Contact form — no credentials, logging data:", data);
    return { ok: true };
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
        customFields: [
          { key: "message", field_value: data.message },
        ],
      }),
    });

    const body = await res.text();
    if (!res.ok) {
      console.error("[GHL] Contact form submission failed:", res.status, body);
      return { ok: false, error: `GHL error: ${res.status}` };
    }

    console.log("[GHL] Contact form submitted successfully:", data.email);
    return { ok: true };
  } catch (err) {
    console.error("[GHL] Contact form error:", err);
    return { ok: false, error: "Network error" };
  }
}

contactRouter.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body as ContactSubmission;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }

  const result = await submitContactToGHL({ name, email, phone, message });

  if (!result.ok) {
    res.status(500).json({ error: "Failed to submit your message. Please try again or email us directly." });
    return;
  }

  res.json({ success: true, message: "Message received! We will be in touch within 24 hours." });
});

export default contactRouter;

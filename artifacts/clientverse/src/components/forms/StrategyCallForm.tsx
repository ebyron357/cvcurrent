import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { CVButton } from "@/components/cv-ui";
import {
  CV_INPUT_CLASS,
  CVFormField,
  CVFormPrivacy,
  CVFormSuccess,
  CVFormErrorBanner,
  CVFormSpinner,
  submitFormData,
} from "@/components/cv-ui/Form";
import { FORM_IDS } from "@/lib/form-schema";

// ─── Strategy Call Request Form ───────────────────────────────────────────────
// Form ID:  cv-strategy-call-v1
// Fields:   name (req), email (req), phone (opt)
// Hidden:   lead_source, page_url, form_id
// Endpoint: /api/strategy-call  (API-LATER — currently not connected)
// GHL tag:  cv-strategy-call → pipeline: Call Requested
// Usage:    Embeddable anywhere a "Book Your Revenue Audit" Calendly link exists.
//           Pass `leadSource` so GHL knows which page triggered the request.
//           Calendly fallback remains in place until API-LATER is wired.
// ─────────────────────────────────────────────────────────────────────────────

interface StrategyCallFormProps {
  leadSource?: string;
  ctaLabel?: string;
  successTitle?: string;
  successMessage?: string;
}

export function StrategyCallForm({
  leadSource = "Strategy Call CTA",
  ctaLabel = "Request My Strategy Call",
  successTitle = "We'll Be in Touch",
  successMessage = "Check your email — you'll receive a calendar link within 15 minutes.",
}: StrategyCallFormProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitFormData("/api/strategy-call", {
        ...form,
        lead_source: leadSource,
        page_url: window.location.href,
        form_id: FORM_IDS.STRATEGY_CALL,
        message: `Strategy Call Request — Source: ${leadSource}`,
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <CVFormSuccess
        title={successTitle}
        message={successMessage}
        onReset={() => {
          setStatus("idle");
          setForm({ name: "", email: "", phone: "" });
        }}
        resetLabel="Submit again"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <CVFormField label="Full Name" htmlFor="scf-name" required>
        <input
          id="scf-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jane Smith"
          value={form.name}
          onChange={handleChange}
          disabled={status === "loading"}
          className={CV_INPUT_CLASS}
        />
      </CVFormField>

      <CVFormField label="Business Email" htmlFor="scf-email" required>
        <input
          id="scf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@company.com"
          value={form.email}
          onChange={handleChange}
          disabled={status === "loading"}
          className={CV_INPUT_CLASS}
        />
      </CVFormField>

      <CVFormField label="Phone" htmlFor="scf-phone" optional>
        <input
          id="scf-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 (555) 000-0000"
          value={form.phone}
          onChange={handleChange}
          disabled={status === "loading"}
          className={CV_INPUT_CLASS}
        />
      </CVFormField>

      {status === "error" && <CVFormErrorBanner message={errorMsg} />}

      <CVButton
        type="submit"
        disabled={status === "loading"}
        variant="primary"
        fullWidth
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <CVFormSpinner /> Requesting...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {ctaLabel} <ArrowRight size={16} weight="bold" />
          </span>
        )}
      </CVButton>

      <CVFormPrivacy note="No spam. Free 30-minute session." />
    </form>
  );
}

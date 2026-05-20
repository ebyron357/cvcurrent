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

// ─── Revenue Audit Request Form ───────────────────────────────────────────────
// Form ID:  cv-audit-request-v1
// Fields:   name (req), email (req), phone (opt)
// Hidden:   lead_source, page_url, form_id
// Endpoint: /api/audit-request  (API-LATER — currently not connected)
// GHL tag:  cv-audit-request → pipeline: Audit Requested
// Usage:    Drop into any page CTA section as a Calendly alternative.
//           Pass `leadSource` prop to track which page triggered the request.
// ─────────────────────────────────────────────────────────────────────────────

interface AuditRequestFormProps {
  leadSource?: string;
}

export function AuditRequestForm({
  leadSource = "Audit Request Form",
}: AuditRequestFormProps) {
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
      await submitFormData("/api/audit-request", {
        ...form,
        lead_source: leadSource,
        page_url: window.location.href,
        form_id: FORM_IDS.AUDIT_REQUEST,
        message: `Revenue Audit Request — Source: ${leadSource}`,
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
        title="Audit Request Received"
        message="You'll receive a confirmation with calendar options within 15 minutes."
        onReset={() => {
          setStatus("idle");
          setForm({ name: "", email: "", phone: "" });
        }}
        resetLabel="Submit another request"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <CVFormField label="Full Name" htmlFor="arf-name" required>
        <input
          id="arf-name"
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

      <CVFormField label="Business Email" htmlFor="arf-email" required>
        <input
          id="arf-email"
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

      <CVFormField label="Phone" htmlFor="arf-phone" optional>
        <input
          id="arf-phone"
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
            <CVFormSpinner /> Requesting Audit...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Book My Free Revenue Audit <ArrowRight size={16} weight="bold" />
          </span>
        )}
      </CVButton>

      <CVFormPrivacy note="No spam. Free 30-minute session." />
    </form>
  );
}

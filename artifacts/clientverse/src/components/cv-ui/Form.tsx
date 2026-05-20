import { Link } from "wouter";

// ─── Input tokens (single source of truth) ────────────────────────────────────

export const CV_INPUT_CLASS =
  "w-full bg-[#0A1628] border border-[#1E2D4A] rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4AC4E0]/50 focus:ring-1 focus:ring-[#4AC4E0]/20 transition-colors text-sm";

export const CV_TEXTAREA_CLASS = CV_INPUT_CLASS + " resize-none";

// ─── API helper ───────────────────────────────────────────────────────────────

export function getApiBase(): string {
  return (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
}

export async function submitFormData(
  endpoint: string,
  data: Record<string, unknown>
): Promise<void> {
  const res = await fetch(`${getApiBase()}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(
      (json as { error?: string }).error ?? "Submission failed. Please try again."
    );
  }
}

// ─── CVFormField — label + slot + optional error ──────────────────────────────

interface CVFormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}

export function CVFormField({
  label,
  htmlFor,
  required,
  optional,
  error,
  children,
}: CVFormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wider"
      >
        {label}
        {required && (
          <span className="text-[#4AC4E0] ml-1" aria-label="required">
            *
          </span>
        )}
        {optional && (
          <span className="text-gray-600 font-normal normal-case ml-1">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── CVFormSuccess ────────────────────────────────────────────────────────────

interface CVFormSuccessProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export function CVFormSuccess({
  title = "Message Received",
  message = "We'll be in touch within 24 hours.",
  onReset,
  resetLabel = "Send another message",
}: CVFormSuccessProps) {
  return (
    <div className="text-center py-12" role="status" aria-live="polite">
      <div className="w-14 h-14 rounded-full bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 flex items-center justify-center mx-auto mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <polyline
            points="20,6 9,17 4,12"
            stroke="#4AC4E0"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{message}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-6 text-[#4AC4E0] text-sm hover:underline focus:outline-none focus:underline"
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}

// ─── CVFormErrorBanner ────────────────────────────────────────────────────────

interface CVFormErrorBannerProps {
  message: string;
}

export function CVFormErrorBanner({ message }: CVFormErrorBannerProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-start gap-2.5 bg-red-950/30 border border-red-500/20 rounded-xl px-4 py-3"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        className="shrink-0 mt-0.5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="#f87171" strokeWidth="2" />
        <line
          x1="12" y1="8" x2="12" y2="12"
          stroke="#f87171" strokeWidth="2" strokeLinecap="round"
        />
        <circle cx="12" cy="16" r="1" fill="#f87171" />
      </svg>
      <p className="text-red-400 text-sm">{message}</p>
    </div>
  );
}

// ─── CVFormSpinner ────────────────────────────────────────────────────────────

export function CVFormSpinner() {
  return (
    <svg
      className="animate-spin w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor" strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  );
}

// ─── CVFormPrivacy ────────────────────────────────────────────────────────────

interface CVFormPrivacyProps {
  note?: string;
}

export function CVFormPrivacy({ note }: CVFormPrivacyProps) {
  return (
    <p className="text-xs text-gray-600 text-center leading-relaxed">
      {note ?? "No spam."}{" "}
      By submitting you agree to our{" "}
      <Link
        href="/privacy"
        className="text-gray-500 hover:text-[#4AC4E0] underline transition-colors"
      >
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link
        href="/terms"
        className="text-gray-500 hover:text-[#4AC4E0] underline transition-colors"
      >
        Terms
      </Link>
      .
    </p>
  );
}

// ─── Form IDs ─────────────────────────────────────────────────────────────────
// Each form has a stable ID used for analytics, GHL tagging, and API routing.

export const FORM_IDS = {
  CONTACT:              "cv-contact-v1",
  CALCULATOR_CAPTURE:   "cv-calc-capture-v1",
  AI_READINESS_CAPTURE: "cv-ai-readiness-v1",
  AUDIT_REQUEST:        "cv-audit-request-v1",
  STRATEGY_CALL:        "cv-strategy-call-v1",
} as const;

export type FormId = (typeof FORM_IDS)[keyof typeof FORM_IDS];

// ─── Canonical field definitions ──────────────────────────────────────────────

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "hidden";
  required: boolean;
  placeholder?: string;
  validation?: string;
  ghlField: string;
}

export const FIELDS = {
  FULL_NAME: {
    name: "name",
    label: "Full Name",
    type: "text" as const,
    required: true,
    placeholder: "Jane Smith",
    validation: "min 2 characters",
    ghlField: "full_name",
  },
  EMAIL: {
    name: "email",
    label: "Business Email",
    type: "email" as const,
    required: true,
    placeholder: "jane@company.com",
    validation: "valid email format",
    ghlField: "email",
  },
  PHONE: {
    name: "phone",
    label: "Phone",
    type: "tel" as const,
    required: false,
    placeholder: "+1 (555) 000-0000",
    validation: "E.164 or US local format",
    ghlField: "phone",
  },
  MESSAGE: {
    name: "message",
    label: "What's Going On?",
    type: "textarea" as const,
    required: true,
    placeholder: "Describe your situation — what's broken, what you've tried, what outcome you need...",
    validation: "min 10 characters",
    ghlField: "message",
  },
  // ── Hidden tracking fields ──
  LEAD_SOURCE: {
    name: "lead_source",
    label: "Lead Source",
    type: "hidden" as const,
    required: false,
    ghlField: "lead_source",
  },
  PAGE_URL: {
    name: "page_url",
    label: "Page URL",
    type: "hidden" as const,
    required: false,
    ghlField: "last_page_url",
  },
  FORM_ID: {
    name: "form_id",
    label: "Form ID",
    type: "hidden" as const,
    required: false,
    ghlField: "form_id",
  },
  // ── Calculator hidden fields ──
  ANNUAL_LEAK: {
    name: "annual_leak",
    label: "Annual Revenue Leak",
    type: "hidden" as const,
    required: false,
    ghlField: "revenue_leak_annual",
  },
  MONTHLY_LEAK: {
    name: "monthly_leak",
    label: "Monthly Revenue Leak",
    type: "hidden" as const,
    required: false,
    ghlField: "revenue_leak_monthly",
  },
  MISSED_CALLS_WEEKLY: {
    name: "missed_calls_weekly",
    label: "Missed Calls / Week",
    type: "hidden" as const,
    required: false,
    ghlField: "missed_calls_weekly",
  },
  AVG_JOB_VALUE: {
    name: "avg_job_value",
    label: "Avg Job Value",
    type: "hidden" as const,
    required: false,
    ghlField: "avg_job_value",
  },
  CLOSE_RATE: {
    name: "close_rate",
    label: "Close Rate %",
    type: "hidden" as const,
    required: false,
    ghlField: "close_rate_pct",
  },
  // ── AI Readiness hidden fields ──
  QUIZ_SCORE: {
    name: "quiz_score",
    label: "Quiz Score",
    type: "hidden" as const,
    required: false,
    ghlField: "ai_readiness_score",
  },
  READINESS_LEVEL: {
    name: "readiness_level",
    label: "Readiness Level",
    type: "hidden" as const,
    required: false,
    ghlField: "ai_readiness_level",
  },
  RECOMMENDED_TIER: {
    name: "recommended_tier",
    label: "Recommended Tier",
    type: "hidden" as const,
    required: false,
    ghlField: "recommended_tier",
  },
} satisfies Record<string, FieldDef>;

// ─── GHL Pipeline Mapping Table ───────────────────────────────────────────────
//
// Form Name               │ GHL Custom Field        │ Tag                      │ Pipeline Stage    │ Workflow Trigger
// ─────────────────────── │ ─────────────────────── │ ───────────────────────  │ ──────────────── │ ───────────────────────────────
// Contact Form            │ full_name               │ cv-contact-form          │ New Lead          │ Contact Form Submitted
//  cv-contact-v1          │ email                   │                          │                   │
//  /contact               │ phone                   │                          │                   │
//                         │ message                 │                          │                   │
//                         │ lead_source = "Contact" │                          │                   │
//                         │ last_page_url           │                          │                   │
//                         │ form_id                 │                          │                   │
// ─────────────────────── │ ─────────────────────── │ ─────────────────────── │ ──────────────── │ ───────────────────────────────
// Calculator Capture      │ full_name               │ cv-calculator-lead       │ Calculator Lead   │ Revenue Calculator Completed
//  cv-calc-capture-v1     │ email                   │                          │                   │
//  /revenue-calculator    │ phone                   │                          │                   │
//                         │ revenue_leak_annual     │                          │                   │
//                         │ revenue_leak_monthly    │                          │                   │
//                         │ missed_calls_weekly     │                          │                   │
//                         │ avg_job_value           │                          │                   │
//                         │ close_rate_pct          │                          │                   │
//                         │ recommended_tier        │                          │                   │
//                         │ lead_source = "Calc"    │                          │                   │
//                         │ last_page_url           │                          │                   │
//                         │ form_id                 │                          │                   │
// ─────────────────────── │ ─────────────────────── │ ─────────────────────── │ ──────────────── │ ───────────────────────────────
// AI Readiness Capture    │ full_name               │ cv-ai-readiness-lead     │ Quiz Lead         │ AI Readiness Quiz Completed
//  cv-ai-readiness-v1     │ email                   │                          │                   │
//  /ai-readiness          │ phone                   │                          │                   │
//                         │ ai_readiness_score      │                          │                   │
//                         │ ai_readiness_level      │                          │                   │
//                         │ recommended_tier        │                          │                   │
//                         │ lead_source = "Quiz"    │                          │                   │
//                         │ last_page_url           │                          │                   │
//                         │ form_id                 │                          │                   │
// ─────────────────────── │ ─────────────────────── │ ─────────────────────── │ ──────────────── │ ───────────────────────────────
// Revenue Audit Request   │ full_name               │ cv-audit-request         │ Audit Requested   │ Audit Request Form Submitted
//  cv-audit-request-v1    │ email                   │                          │                   │
//  API-LATER              │ phone                   │                          │                   │
//                         │ lead_source (dynamic)   │                          │                   │
//                         │ last_page_url           │                          │                   │
//                         │ form_id                 │                          │                   │
// ─────────────────────── │ ─────────────────────── │ ─────────────────────── │ ──────────────── │ ───────────────────────────────
// Strategy Call Request   │ full_name               │ cv-strategy-call         │ Call Requested    │ Strategy Call Requested
//  cv-strategy-call-v1    │ email                   │                          │                   │
//  API-LATER              │ phone                   │                          │                   │
//                         │ lead_source (dynamic)   │                          │                   │
//                         │ last_page_url           │                          │                   │
//                         │ form_id                 │                          │                   │
//
// NOTE (API-LATER):
//   1. All GHL custom fields above must be created in the GHL sub-account
//      before workflow triggers will fire. Use the exact field key names listed.
//   2. Tags are applied at the contact level. Pipeline stages require the
//      pipeline to be pre-configured in GHL before the workflow can assign them.
//   3. The /api/contact endpoint currently handles all form submissions.
//      When GHL is connected, route each form_id to its own GHL workflow trigger.
//   4. VITE_API_URL must be set in the environment for all forms to submit.

// ─── Form config objects (for runtime use) ────────────────────────────────────

export const FORM_CONFIG = {
  [FORM_IDS.CONTACT]: {
    id: FORM_IDS.CONTACT,
    name: "Contact / Send a Message",
    page: "/contact",
    endpoint: "/api/contact",
    ghlTag: "cv-contact-form",
    pipelineStage: "New Lead",
    workflowTrigger: "Contact Form Submitted",
    leadSource: "Contact Page",
  },
  [FORM_IDS.CALCULATOR_CAPTURE]: {
    id: FORM_IDS.CALCULATOR_CAPTURE,
    name: "Revenue Calculator Lead Capture",
    page: "/revenue-calculator",
    endpoint: "/api/contact",
    ghlTag: "cv-calculator-lead",
    pipelineStage: "Calculator Lead",
    workflowTrigger: "Revenue Calculator Completed",
    leadSource: "Revenue Calculator",
  },
  [FORM_IDS.AI_READINESS_CAPTURE]: {
    id: FORM_IDS.AI_READINESS_CAPTURE,
    name: "AI Readiness Quiz Lead Capture",
    page: "/ai-readiness",
    endpoint: "/api/contact",
    ghlTag: "cv-ai-readiness-lead",
    pipelineStage: "Quiz Lead",
    workflowTrigger: "AI Readiness Quiz Completed",
    leadSource: "AI Readiness Quiz",
  },
  [FORM_IDS.AUDIT_REQUEST]: {
    id: FORM_IDS.AUDIT_REQUEST,
    name: "Revenue Audit Request",
    page: "API-LATER",
    endpoint: "/api/audit-request",
    ghlTag: "cv-audit-request",
    pipelineStage: "Audit Requested",
    workflowTrigger: "Audit Request Form Submitted",
    leadSource: "Audit Request Form",
  },
  [FORM_IDS.STRATEGY_CALL]: {
    id: FORM_IDS.STRATEGY_CALL,
    name: "Strategy Call Request",
    page: "API-LATER",
    endpoint: "/api/strategy-call",
    ghlTag: "cv-strategy-call",
    pipelineStage: "Call Requested",
    workflowTrigger: "Strategy Call Requested",
    leadSource: "Strategy Call CTA",
  },
} as const;

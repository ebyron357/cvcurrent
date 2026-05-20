import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CVButton } from "@/components/cv-ui";
import {
  CV_INPUT_CLASS,
  CV_TEXTAREA_CLASS,
  CVFormField,
  CVFormSuccess,
  CVFormErrorBanner,
  CVFormSpinner,
  CVFormPrivacy,
  submitFormData,
} from "@/components/cv-ui/Form";
import { FORM_IDS } from "@/lib/form-schema";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  CalendarCheck,
  Envelope,
  Clock,
  Plus,
  Minus,
  CheckCircle,
} from "@phosphor-icons/react";

async function submitContact(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  await submitFormData("/api/contact", {
    ...data,
    lead_source: "Contact Page",
    page_url: window.location.href,
    form_id: FORM_IDS.CONTACT,
  });
}

const faqs = [
  {
    q: "How fast do I go live?",
    a: "7 days — that's the guarantee, not the estimate. Day 1 is your discovery call. By day 7, your CRM is configured, your AI follow-up is running, and your pipeline has contacts in it.",
  },
  {
    q: "Do I need my own CRM account to get started?",
    a: "No. Your account lives inside the ClientVerse platform — fully branded with your business. You get login access and full visibility into everything we build.",
  },
  {
    q: "What's included in the Revenue Audit?",
    a: "A 30-minute live session where we map your current stack, identify every revenue leak, and put a dollar value on each gap. You get a written C.L.A.R.I.T.Y. report within 48 hours — 7 categories assessed, every fix prioritized by ROI.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Month-to-month on every plan. Cancel at the end of any billing month. Your data is fully exportable for 30 days after cancellation.",
  },
  {
    q: "What if I already have a CRM that's a mess?",
    a: "That's exactly what System Rescue™ is for. We go in, audit it, clean it, and rebuild it to spec — typically in 48 hours. Most inherited accounts have 12–20 broken or missing configurations.",
  },
];

function ContactFaq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map(({ q, a }, i) => (
        <div
          key={i}
          className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
            open === i ? "border-[#4AC4E0]/40 bg-[#0D1B2E]" : "border-[#1E2D4A] bg-[#0D1B2E] hover:border-[#4AC4E0]/20"
          }`}
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold text-white text-sm">{q}</span>
            {open === i ? <Minus size={14} color="#4AC4E0" weight="bold" className="shrink-0" /> : <Plus size={14} color="#4AC4E0" weight="bold" className="shrink-0" />}
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed border-t border-[#1E2D4A] pt-3">{a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">

        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-16 text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Let's Find Your <span className="text-[#4AC4E0]">Revenue Leak.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Book a free 30-minute Revenue Audit. We'll map your operations, identify every gap, and show you exactly what to fix first — with a dollar value attached to each one.
          </motion.p>
        </section>

        {/* 2-column: CTA options + form */}
        <section className="container mx-auto px-4 pb-20 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* Left: options */}
            <div className="space-y-5">
              {/* Primary: Book a call */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#4AC4E0] rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <CalendarCheck size={28} color="#0A1628" weight="duotone" />
                  <h2 className="text-xl font-bold text-[#0A1628]">Book a Revenue Audit</h2>
                </div>
                <p className="text-[#0A1628]/75 text-sm mb-6 leading-relaxed">
                  30 minutes. Free. We map your gaps, put a dollar value on each one, and deliver a written C.L.A.R.I.T.Y. report within 48 hours.
                </p>
                <div className="space-y-2 mb-6">
                  {["No sales pressure", "Written report delivered in 48 hours", "Includes recommended 90-day roadmap"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-[#0A1628]/80">
                      <CheckCircle size={14} weight="fill" color="#0A1628" className="shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  className="bg-[#0A1628] hover:bg-[#132038] text-white font-bold h-12 px-6 w-full flex items-center gap-2"
                >
                  <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                    Book Your Free Audit <ArrowRight size={16} weight="bold" />
                  </a>
                </Button>
              </motion.div>

              {/* Secondary: email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="cv-card cv-card--feature p-6 flex items-center gap-4"
              >
                <div
                  className="shrink-0 rounded-xl flex items-center justify-center"
                  style={{ width: 48, height: 48, background: "rgba(74,196,224,0.08)", border: "1.5px solid rgba(74,196,224,0.5)" }}
                >
                  <Envelope size={22} color="#4AC4E0" weight="duotone" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">Email us directly</p>
                  <a href="mailto:support@clientverse.io" className="text-[#4AC4E0] hover:underline text-sm">support@clientverse.io</a>
                  <p className="text-gray-500 text-xs mt-1">Response within 24 hours</p>
                </div>
              </motion.div>

              {/* Response time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="cv-card cv-card--feature p-6 flex items-center gap-4"
              >
                <div
                  className="shrink-0 rounded-xl flex items-center justify-center"
                  style={{ width: 48, height: 48, background: "rgba(74,196,224,0.08)", border: "1.5px solid rgba(74,196,224,0.5)" }}
                >
                  <Clock size={22} color="#4AC4E0" weight="duotone" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-0.5">Response time</p>
                  <p className="text-[#4AC4E0] font-bold text-sm">Under 24 hours</p>
                  <p className="text-gray-500 text-xs mt-1">Mon–Fri · 9am–6pm ET</p>
                </div>
              </motion.div>
            </div>

            {/* Right: contact form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="cv-card cv-card--feature p-8 md:p-10"
            >
              <h2 className="text-xl font-bold mb-2">Send a Message</h2>
              <p className="text-gray-400 text-sm mb-7">
                Not ready to book a call? Tell us what's going on. We'll reply within 24 hours with a direct recommendation.
              </p>

              {status === "success" ? (
                <CVFormSuccess
                  title="Message Received"
                  message="We'll be in touch within 24 hours."
                  onReset={() => {
                    setStatus("idle");
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                  resetLabel="Send another message"
                />
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CVFormField label="Full Name" htmlFor="contact-name" required>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        className={CV_INPUT_CLASS}
                      />
                    </CVFormField>
                    <CVFormField label="Email" htmlFor="contact-email" required>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={handleChange}
                        className={CV_INPUT_CLASS}
                      />
                    </CVFormField>
                  </div>

                  <CVFormField label="Phone" htmlFor="contact-phone" optional>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className={CV_INPUT_CLASS}
                    />
                  </CVFormField>

                  <CVFormField label="What's going on?" htmlFor="contact-message" required>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Describe your situation — what's broken, what you've tried, what outcome you need..."
                      value={form.message}
                      onChange={handleChange}
                      className={CV_TEXTAREA_CLASS}
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
                        <CVFormSpinner /> Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <ArrowRight size={16} weight="bold" />
                      </span>
                    )}
                  </CVButton>

                  <CVFormPrivacy note="No spam. We'll respond within 24 hours." />
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#0D1B2E] border-t border-[#1E2D4A] py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Quick Questions</h2>
            <ContactFaq />
            <div className="text-center mt-8">
              <Button asChild variant="ghost" className="text-[#4AC4E0] hover:bg-[#4AC4E0]/5 flex items-center gap-1.5 mx-auto w-fit">
                <Link href="/faq">
                  See all 26 questions <ArrowRight size={14} weight="bold" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

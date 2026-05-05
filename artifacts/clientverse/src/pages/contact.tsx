import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const API_BASE = import.meta.env.BASE_URL?.replace(/\/$/, "") === ""
  ? ""
  : import.meta.env.BASE_URL?.replace(/\/$/, "");

async function submitContact(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const base = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
  const res = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Submission failed");
  return json;
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

  const inputClass =
    "w-full bg-[#0F1E35] border border-[#1E2D4A] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#4AC4E0] transition-colors text-sm";

  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-12 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Start With a <span className="text-[#4AC4E0]">Systems Review.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Stop guessing where the bottleneck is. We will map your operations and give you a technical diagnosis.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button size="lg" asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-lg px-8 h-14">
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Book a Systems Review
              </a>
            </Button>
            <p className="mt-6 text-gray-400">
              Or email us at{" "}
              <a href="mailto:support@clientverse.io" className="text-[#4AC4E0] hover:underline">
                support@clientverse.io
              </a>
            </p>
          </motion.div>
        </section>

        {/* Contact Form */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0F1E35] border border-[#1E2D4A] rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-gray-400 text-sm mb-8">
                Not ready to book a call? Tell us what you're dealing with and we'll follow up within 24 hours.
              </p>

              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#4AC4E0]/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#4AC4E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Received</h3>
                  <p className="text-gray-400">We'll be in touch within 24 hours.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-[#4AC4E0] text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Full Name <span className="text-[#4AC4E0]">*</span>
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5">
                        Email Address <span className="text-[#4AC4E0]">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Phone Number <span className="text-gray-500 font-normal">(optional)</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      What's going on? <span className="text-[#4AC4E0]">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Describe your current situation — what's broken, what you've tried, and what outcome you need..."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm">{errorMsg}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-12 text-base"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-[#1E2D4A]">
                <AccordionTrigger className="text-left text-lg hover:text-[#4AC4E0]">Are you a GoHighLevel agency?</AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed">
                  No, we are strictly platform-agnostic. While we are highly capable in platforms like GoHighLevel, HubSpot, Salesforce, and others, our job is to architect the best system for your specific operational needs, not force you into a specific software ecosystem.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-[#1E2D4A]">
                <AccordionTrigger className="text-left text-lg hover:text-[#4AC4E0]">Do you do custom software development?</AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed">
                  We build custom integrations, complex API bridges, and middleware to connect your existing tools. For full-stack native applications from scratch, we consult on architecture and can partner with development firms, but our core focus is operational orchestration and automation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-[#1E2D4A]">
                <AccordionTrigger className="text-left text-lg hover:text-[#4AC4E0]">How long does an engagement typically take?</AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed">
                  A System Rescue™ or initial Build project typically takes 4–8 weeks depending on complexity. Operate engagements are ongoing monthly partnerships.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

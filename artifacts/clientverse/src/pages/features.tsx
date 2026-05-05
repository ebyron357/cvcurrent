import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

/* ─── Solid, fully opaque teal icons — designed to pop on dark backgrounds ─── */

function IconAI() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <circle cx="17" cy="17" r="5.5" fill="#4AC4E0" />
      <circle cx="6.5" cy="8.5" r="3.2" fill="#4AC4E0" opacity="0.55" />
      <circle cx="27.5" cy="8.5" r="3.2" fill="#4AC4E0" opacity="0.55" />
      <circle cx="6.5" cy="25.5" r="3.2" fill="#4AC4E0" opacity="0.55" />
      <circle cx="27.5" cy="25.5" r="3.2" fill="#4AC4E0" opacity="0.55" />
      <circle cx="17" cy="3.5" r="3.2" fill="#4AC4E0" opacity="0.78" />
      <circle cx="17" cy="30.5" r="3.2" fill="#4AC4E0" opacity="0.78" />
      <line x1="17" y1="11.5" x2="17" y2="6.7" stroke="#4AC4E0" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="17" y1="22.5" x2="17" y2="27.3" stroke="#4AC4E0" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="13.5" y1="14.5" x2="9.2" y2="10.5" stroke="#4AC4E0" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="20.5" y1="19.5" x2="24.8" y2="23.5" stroke="#4AC4E0" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="20.5" y1="14.5" x2="24.8" y2="10.5" stroke="#4AC4E0" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="13.5" y1="19.5" x2="9.2" y2="23.5" stroke="#4AC4E0" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconCRM() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <rect x="1.5" y="14" width="9" height="7" rx="2.5" fill="#4AC4E0" />
      <rect x="12.5" y="5" width="9" height="7" rx="2.5" fill="#4AC4E0" opacity="0.9" />
      <rect x="12.5" y="22" width="9" height="7" rx="2.5" fill="#4AC4E0" opacity="0.65" />
      <rect x="23.5" y="14" width="9" height="7" rx="2.5" fill="#4AC4E0" opacity="0.4" />
      <path d="M10.5 17.5 C11.5 8.5 12.5 8.5 12.5 8.5" stroke="#4AC4E0" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      <path d="M10.5 17.5 C11.5 26.5 12.5 25.5 12.5 25.5" stroke="#4AC4E0" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      <path d="M21.5 8.5 C22.5 12 23 15.5 23.5 17.5" stroke="#4AC4E0" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      <path d="M21.5 25.5 C22.5 23 23 20 23.5 17.5" stroke="#4AC4E0" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

function IconMarketing() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path d="M17 3.5 L19.8 12.5 L29.5 13 L22.5 19.4 L24.8 29 L17 24 L9.2 29 L11.5 19.4 L4.5 13 L14.2 12.5 Z" fill="#4AC4E0" />
      <circle cx="28" cy="7.5" r="2.5" fill="#4AC4E0" opacity="0.4" />
      <circle cx="6" cy="7.5" r="2.5" fill="#4AC4E0" opacity="0.4" />
      <path d="M22 31.5 Q25.5 33.5 29 32" stroke="#4AC4E0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M5 31.5 Q8.5 33.5 12 32" stroke="#4AC4E0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function IconOps() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <rect x="3.5" y="9" width="27" height="17" rx="3.5" stroke="#4AC4E0" strokeWidth="2" />
      <rect x="8.5" y="13.5" width="17" height="3.5" rx="1.75" fill="#4AC4E0" opacity="0.85" />
      <rect x="8.5" y="19.5" width="11" height="2.5" rx="1.25" fill="#4AC4E0" opacity="0.5" />
      <circle cx="24.5" cy="20.75" r="2.5" fill="#4AC4E0" opacity="0.8" />
      <path d="M13.5 29 L20.5 29" stroke="#4AC4E0" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      <path d="M17 27 L17 29" stroke="#4AC4E0" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

const capabilities = [
  {
    Icon: IconAI,
    title: "AI & Automation",
    description: "Intelligent workflows that replace repetitive manual labor.",
    items: [
      "Zapier & Make architecture",
      "Custom API integrations",
      "LLM-powered text extraction & parsing",
      "Automated reporting generation",
    ],
  },
  {
    Icon: IconCRM,
    title: "CRM & Pipelines",
    description: "Structured environments for managing relationships at scale.",
    items: [
      "Platform-agnostic CRM setup",
      "Lead scoring & routing logic",
      "Deal stage automation",
      "Historical data migration",
    ],
  },
  {
    Icon: IconMarketing,
    title: "Marketing & Reviews",
    description: "Systems to amplify reach and capture customer sentiment.",
    items: [
      "Multi-channel drip campaigns",
      "Automated review requests",
      "Social media distribution workflows",
      "Attribution tracking",
    ],
  },
  {
    Icon: IconOps,
    title: "Operations & Payments",
    description: "The financial and fulfillment backbone of your business.",
    items: [
      "Stripe & payment gateway integration",
      "Automated invoicing & dunning",
      "Client onboarding sequences",
      "Contract & e-signature automation",
    ],
  },
];

export default function Features() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        <section className="container mx-auto px-4 pt-16 pb-20 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Technical <span className="text-[#4AC4E0]">Capabilities</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            We don't sell software. We engineer solutions. Here is the technical foundation of what we implement.
          </motion.p>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative bg-[#0D1B2E] border border-[#1E2D4A] p-10 rounded-2xl group hover:border-[#4AC4E0]/40 transition-colors duration-300"
                style={{ isolation: "isolate" }}
              >
                {/* Card top-left ambient — doesn't need overflow-hidden to work */}
                <div
                  className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{ background: "radial-gradient(circle, rgba(74,196,224,0.1) 0%, transparent 70%)" }}
                />

                {/* Icon block */}
                <div className="mb-8">
                  <div
                    className="rounded-2xl flex items-center justify-center"
                    style={{
                      width: 68,
                      height: 68,
                      background: "#0d2d44",
                      border: "2px solid #4AC4E0",
                      boxShadow: "0 0 16px rgba(74,196,224,0.25)",
                    }}
                  >
                    <cap.Icon />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3">{cap.title}</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">{cap.description}</p>

                <ul className="space-y-3">
                  {cap.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                        <circle cx="8" cy="8" r="6.5" stroke="#4AC4E0" strokeWidth="1" opacity="0.35" />
                        <path d="M5.5 8 L7 10 L10.5 5.5" stroke="#4AC4E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-24 text-center border-t border-[#1E2D4A] mt-12">
          <h2 className="text-3xl font-bold mb-6">Need a specific technical solution?</h2>
          <Button size="lg" asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-lg px-8 h-14">
            <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
              Discuss Your Stack
            </a>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

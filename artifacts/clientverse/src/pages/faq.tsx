import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import { Plus, Minus, ArrowRight } from "@phosphor-icons/react";

type FaqItem = { q: string; a: string | React.ReactNode };

const categories: { label: string; items: FaqItem[] }[] = [
  {
    label: "Getting Started",
    items: [
      {
        q: "What exactly does ClientVerse do?",
        a: "ClientVerse builds, repairs, and operates the operational backbone of your business — CRM, AI follow-up, appointment booking, reputation management, ads, and more — all managed for you under one monthly subscription. You own the client relationship. We own the delivery. Nothing requires you to touch a dashboard unless you want to.",
      },
      {
        q: "How fast can I actually go live?",
        a: "7 days. That's the guarantee. On day one you have a discovery call. By day seven your CRM is live, your missed-call text-back is firing, your AI follow-up is running, and your pipeline is populated. Most clients go live faster than that — but 7 days is the ceiling, not the average.",
      },
      {
        q: "Do I need any technical knowledge to use this?",
        a: "No. You don't need to know what a CRM is, what an API is, or how automation works. You describe what you want to happen in your business — we build and manage the systems that make it happen. If something breaks, we fix it. If you want to change something, you tell us.",
      },
      {
        q: "Do I need my own CRM or software account?",
        a: "No. Your account lives inside the ClientVerse platform. You get your own workspace — fully branded with your business — and we configure and manage it for you. You have login access and full visibility into everything.",
      },
      {
        q: "What happens during onboarding?",
        a: "You complete a detailed onboarding form covering your business, your current tools, your pipeline stages, and your goals. We then migrate any existing data, build your automations, configure your AI follow-up, and schedule a walkthrough call. You're live in 7 days or less.",
      },
    ],
  },
  {
    label: "Pricing & Plans",
    items: [
      {
        q: "What's the difference between COMMAND, OPERATOR, and COMMANDER?",
        a: "COMMAND is the core stack — CRM, AI follow-up, booking, proposals, and funding access. OPERATOR adds reputation management, call tracking, AI chatbot, and directory listings. COMMANDER adds AI voice agent, lead intelligence, Google + Meta ads management, local SEO, and content creation. All tiers include the 7-day go-live guarantee. Pricing is discussed on your Revenue Audit call.",
      },
      {
        q: "What's the setup fee and is it refundable?",
        a: "Setup fees cover onboarding, configuration, data migration, and the first-week build sprint. They are non-refundable after onboarding begins — but most clients recover the full investment in their first month from recovered leads alone. Setup investment is discussed on your Revenue Audit call.",
      },
      {
        q: "Is there a contract? Can I cancel?",
        a: "Month-to-month. No annual lock-in required. You can cancel at the end of any billing month. If you do cancel, your data remains accessible for 30 days so you can export everything. We don't trap you.",
      },
      {
        q: "Are there any usage fees on top of the monthly price?",
        a: "There are usage-based costs for outbound SMS and email if you exceed plan limits — billed at cost as pass-through. For most clients these are negligible. We're transparent about this upfront and disclose it before onboarding.",
      },
      {
        q: "Do you offer discounts for annual billing?",
        a: "Yes — 2 months free when you pay annually. This is equivalent to a ~17% discount on any tier. Ask about annual billing during your onboarding call.",
      },
    ],
  },
  {
    label: "AI & Technology",
    items: [
      {
        q: "What AI tools are actually running in my account?",
        a: "Your account uses native AI features (AI chatbot, AI voice agent, AI Decision Maker in workflows) combined with Claude AI via the official MCP connector for account management and reporting. No third-party subscriptions required — it's all included.",
      },
      {
        q: "What is the AI CRM integration and why does it matter?",
        a: "MCP (Model Context Protocol) is an official CRM integration that lets Claude AI read and write directly to your account — contacts, pipelines, conversations, calendars, and tags. This is what powers the AI CRM Management and AI Operations Management services. Less than 5% of agencies know this exists. We've been using it since launch.",
      },
      {
        q: "How does the AI voice agent work?",
        a: "The AI voice agent answers inbound calls 24/7, answers FAQs using your business knowledge, books appointments directly into your calendar, and routes complex calls to a human. It speaks naturally and handles full conversations — not just a menu system. Setup takes under 48 hours once your account is live.",
      },
      {
        q: "How does the missed-call text-back work?",
        a: "Every missed call triggers an automatic SMS to the caller within 60 seconds. The message is customized for your business and starts a conversation. If the caller responds, the AI picks up the thread and can book an appointment. This single feature typically recovers 20–40% of previously lost leads.",
      },
      {
        q: "Is my data secure?",
        a: "Your account runs on SOC 2 Type II certified infrastructure — the same compliance tier as enterprise software. Data is encrypted in transit and at rest. We also offer an AI Security Audit as an add-on service, which reviews your full AI stack for exposure, weak access controls, and staff vulnerabilities.",
      },
    ],
  },
  {
    label: "Services & Delivery",
    items: [
      {
        q: "Who actually does the work — do you outsource it?",
        a: "Managed services (ads, SEO, content, web builds) are delivered through vetted partners — a curated network of white-label providers. The client relationship stays with you. Proprietary services (C.L.A.R.I.T.Y. Audit, SAIG-OS AI Governance, AI Security Audit) are delivered personally — no outsourcing.",
      },
      {
        q: "What is the C.L.A.R.I.T.Y. Framework™?",
        a: "A 7-point AI stack evaluation system that maps every gap in your business to a specific, executable fix — with an ROI projection attached to every recommendation. It covers Consolidate, Leak, Automate, Revenue, Integrate, Trust, and Yield. Delivered as a 30-minute session with a full written report within 48 hours. Investment is discussed on your call.",
      },
      {
        q: "What is SAIG-OS™?",
        a: "SAIG-OS is a documented AI governance framework for organizations that need written policies, risk classification, and oversight structures for their AI stack. It's built for nonprofits, healthcare organizations, schools, and any business with regulatory exposure. Delivered personally — no outsourcing. Scope and investment are discussed directly.",
      },
      {
        q: "Can you migrate my data from my current CRM?",
        a: "Yes. We handle CRM migrations from Salesforce, HubSpot, Pipedrive, Zoho, Keap, and most CSV exports. Contact, deal, and tag data come with you. Complex automation migrations are scoped separately. Most migrations are included in the setup fee.",
      },
      {
        q: "What industries do you work with?",
        a: "Home services, medical/dental, real estate, law firms, financial services, nonprofits, education, veteran-owned businesses, e-commerce, and B2B service companies. We have pre-built industry snapshots for HVAC, dental, real estate, and veteran-owned businesses — which reduces go-live time to under 24 hours for those industries.",
      },
    ],
  },
  {
    label: "Veteran-Owned & Federal",
    items: [
      {
        q: "Is ClientVerse a veteran-owned business?",
        a: "Yes. ClientVerse is a veteran-owned small business. We prioritize working with other veteran-owned businesses, nonprofits, and mission-driven organizations — and we have specific engagement models designed for that community.",
      },
      {
        q: "Can federal agencies or government contractors work with ClientVerse?",
        a: "Yes. As a veteran-owned business, ClientVerse is positioned for GSA Schedule contracting once registered. SAIG-OS can be delivered as part of CMMC and federal AI compliance readiness engagements. Relevant NAICS codes: 541511, 541519, 541613. Contact us to discuss procurement options.",
      },
      {
        q: "Do you offer any discounts for veteran-owned businesses or nonprofits?",
        a: "Yes. We offer priority onboarding and adjusted investment terms for verified veteran-owned businesses and 501(c)(3) nonprofits. Contact us directly to discuss eligibility — this is handled case by case.",
      },
    ],
  },
];

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map(({ q, a }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
          className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
            open === i ? "border-[#4AC4E0]/40 bg-[#0D1B2E]" : "border-[#1E2D4A] bg-[#0D1B2E] hover:border-[#4AC4E0]/20"
          }`}
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold text-white text-sm leading-snug">{q}</span>
            <div className="shrink-0">
              {open === i
                ? <Minus size={18} color="#4AC4E0" weight="bold" />
                : <Plus size={18} color="#4AC4E0" weight="bold" />
              }
            </div>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-[#1E2D4A] pt-4">
                  {a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        {/* Header */}
        <section className="container mx-auto px-4 pt-16 pb-16 text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Frequently Asked <span className="text-[#4AC4E0]">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to know before booking a call. Don't see your question? Ask Mr. ClientVerse — the chat icon in the corner.
          </motion.p>
        </section>

        {/* Category tabs */}
        <section className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map(({ label }, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === i
                    ? "bg-[#4AC4E0] text-[#0A1628]"
                    : "border border-[#1E2D4A] text-gray-400 hover:border-[#4AC4E0]/30 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <FaqAccordion items={categories[activeCategory].items} />
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Still have questions */}
        <section className="container mx-auto px-4 py-20 max-w-3xl">
          <div className="bg-[#0D1B2E] border border-[#4AC4E0]/20 rounded-2xl p-10 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
              Book a free 30-minute Revenue Audit and get every question answered live — with a custom recommendation for your specific business at the end.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold px-8 h-12 flex items-center gap-2"
              >
                <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                  Book Your Free Revenue Audit <ArrowRight size={16} weight="bold" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/30 h-12 px-8"
              >
                <Link href="/revenue-calculator">Calculate My Revenue Leak</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

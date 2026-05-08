import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Phone,
  ChatCircle,
  Envelope,
  MegaphoneSimple,
  Robot,
  CheckCircle,
  ArrowRight,
  Clock,
  CurrencyDollar,
  TrendUp,
  Star,
  Brain,
} from "@phosphor-icons/react";

const services = [
  {
    id: "voice-agent",
    Icon: Phone,
    name: "AI Voice Agent",
    tagline: "Your business answers every call. 24 hours a day. 7 days a week.",
    price: "$497/mo — 1,000 min included",
    setupTime: "48-hr setup",
    description:
      "A fully trained AI receptionist powered by Retell AI that handles inbound calls, answers FAQs using your business knowledge, books appointments directly into your calendar, and escalates complex calls to a human. Includes 1,000 minutes per month — overage billed at $0.35/min. Speaks naturally — full conversations, not menu trees.",
    problems: [
      "Missed calls after hours that go to voicemail and never call back",
      "Front desk staff spending 40% of their day answering the same 8 questions",
      "Calls that come in during appointments — interrupting and never getting returned",
      "Leads calling competitors because you didn't pick up first",
    ],
    outcomes: [
      "Every call answered under 2 rings, 24/7/365",
      "1,000 minutes/mo included — overage at $0.35/min, billed transparently",
      "Appointments booked without a human involved",
      "FAQs handled automatically — pricing, hours, services, location",
      "Call recordings and transcripts in your dashboard",
      "Seamless handoff to human staff when needed",
    ],
    highlight: "Typical outcome: 25–40% increase in booked appointments within 30 days of go-live.",
  },
  {
    id: "ai-chat",
    Icon: ChatCircle,
    name: "AI Chatbot & Lead Capture",
    tagline: "Your website closes leads while you sleep.",
    price: "Included — OPERATOR+",
    setupTime: "24-hr setup",
    description:
      "A trained AI chatbot deployed on your website, SMS channel, and WhatsApp — answering questions, qualifying leads, and booking appointments. Connected directly to your CRM pipeline. Every conversation captured, tagged, and routed.",
    problems: [
      "Website visitors leaving without converting because no one was there to answer",
      "Contact forms sitting unread for 6–12 hours",
      "No way to qualify leads before they hit your calendar",
      "Chatbots that just say 'leave us a message' instead of actually helping",
    ],
    outcomes: [
      "Live on website, SMS, and WhatsApp from one dashboard",
      "Qualified leads booked directly into your calendar",
      "Every conversation tagged and stored in your CRM",
      "Escalates to human when conversation needs it",
      "Custom-trained on your business — not generic responses",
    ],
    highlight: "Typical outcome: 2–4x more website leads captured vs. contact form alone.",
  },
  {
    id: "email-sms",
    Icon: Envelope,
    name: "AI Email & SMS Campaigns",
    tagline: "Multi-touch follow-up that doesn't give up until they book.",
    price: "$197–$497/mo",
    setupTime: "3-day setup",
    description:
      "Automated drip sequences across email and SMS that nurture leads, re-engage cold contacts, and follow up on quotes — written in your voice, triggered by behavior, and running in the background 24/7. No manual sending.",
    problems: [
      "Leads who didn't book on the first touch and were never followed up with",
      "Quotes sent that never got a response — and no follow-up",
      "Past clients who went silent and were never re-engaged",
      "Email newsletters that take 3 hours to write and send to a dead list",
    ],
    outcomes: [
      "5–7 touch follow-up sequence on every new lead automatically",
      "Quote follow-up that fires at day 1, day 3, and day 7",
      "Re-engagement campaigns for contacts inactive 30, 60, 90 days",
      "Behavior-triggered emails (visited pricing page, clicked link, etc.)",
      "Full open, click, and reply tracking in dashboard",
    ],
    highlight: "Typical outcome: 15–30% of previously lost leads recovered in first 60 days.",
  },
  {
    id: "reputation",
    Icon: Star,
    name: "AI Review & Reputation Management",
    tagline: "More 5-star reviews. Automatically. On every platform that matters.",
    price: "$297/mo",
    setupTime: "24-hr setup",
    description:
      "Automated review request sequences that fire after every appointment or completed job. Negative sentiment flagged before it posts. 50+ platforms monitored. Responses drafted automatically. Your reputation managed without you lifting a finger.",
    problems: [
      "Competitors with more reviews dominating local search even though you're better",
      "Satisfied clients who never left a review because no one asked",
      "Negative reviews that sat unanswered for weeks damaging your ranking",
      "Staff manually texting clients after jobs to ask for reviews (and forgetting)",
    ],
    outcomes: [
      "Post-appointment review request fires automatically via SMS and email",
      "Google and Facebook review monitoring across 50+ platforms",
      "AI-drafted response templates for every review — positive and negative",
      "Negative sentiment alerts before they hit public review sites",
      "Monthly reputation report showing your star rating trend",
    ],
    highlight: "Typical outcome: 3–5x more reviews per month within 60 days, 0.3–0.7 star rating increase.",
  },
  {
    id: "lead-intelligence",
    Icon: MegaphoneSimple,
    name: "AI Lead Prospecting & Sniper Lists",
    tagline: "Pull any local business into your pipeline in under 60 seconds.",
    price: "Included — COMMANDER",
    setupTime: "Live immediately",
    description:
      "Built into the ClientVerse platform — map-based local business prospecting that lets you pull any business category in any city into your CRM pipeline with one click. Name, phone, email, address, website — captured and ready for outreach. Replaces Apollo and ZoomInfo at zero extra cost.",
    problems: [
      "Paying $500–$1,200/mo for Apollo or ZoomInfo for lead lists that go stale",
      "Hours spent manually researching and building prospecting lists",
      "Outreach to businesses with wrong contact info or closed locations",
      "No way to quickly target a specific industry in a specific area",
    ],
    outcomes: [
      "Pull 50–500 local business leads from a map in under 5 minutes",
      "Immediately added to a CRM pipeline with full contact data",
      "Tag by industry, city, and campaign for organized outreach",
      "Launch email or SMS campaign directly from the same platform",
      "Zero additional subscription cost — included in COMMANDER",
    ],
    highlight: "Typical outcome: Replaces $500–$1,200/mo in prospecting tool costs on day one.",
  },
];

const stats = [
  { Icon: Clock, value: "< 60s", label: "Missed call text-back speed" },
  { Icon: TrendUp, value: "30–40%", label: "Avg lead recovery rate" },
  { Icon: CurrencyDollar, value: "$40K+", label: "Avg annual revenue recovered" },
  { Icon: Robot, value: "24/7", label: "AI running without breaks" },
];

export default function AiServices() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-20 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-full px-4 py-1.5 text-sm text-[#4AC4E0] font-medium mb-6"
          >
            <Brain size={14} weight="fill" />
            5 AI Services — All Managed For You
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            AI That Works While <br />
            <span className="text-[#4AC4E0]">You Work.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Five distinct AI services — each solving a specific revenue leak. All configured, managed, and optimized for your business. No software to learn. No dashboards to monitor. No staff to manage.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-13 px-8 flex items-center gap-2">
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Get a Free AI Stack Review <ArrowRight size={18} weight="bold" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/30 h-13 px-8">
              <Link href="/ai-readiness">Take the AI Readiness Quiz</Link>
            </Button>
          </motion.div>
        </section>

        {/* Stats bar */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-10">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map(({ Icon, value, label }) => (
                <div key={label} className="py-2">
                  <Icon size={22} color="#4AC4E0" weight="duotone" className="mx-auto mb-2" />
                  <p className="text-2xl font-black text-white mb-1">{value}</p>
                  <p className="text-gray-400 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="container mx-auto px-4 py-20 max-w-5xl space-y-16">
          {services.map(({ id, Icon, name, tagline, price, setupTime, description, problems, outcomes, highlight }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="bg-[#0D1B2E] border border-[#1E2D4A] hover:border-[#4AC4E0]/30 rounded-2xl overflow-hidden transition-colors duration-300"
            >
              {/* Service header */}
              <div className="p-8 md:p-10 border-b border-[#1E2D4A]">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div
                    className="rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      width: 64,
                      height: 64,
                      background: "rgba(74,196,224,0.08)",
                      border: "1.5px solid rgba(74,196,224,0.5)",
                      boxShadow: "0 0 20px rgba(74,196,224,0.15)",
                    }}
                  >
                    <Icon size={32} color="#4AC4E0" weight="duotone" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">{name}</h2>
                      <span className="text-[#4AC4E0] font-bold text-sm bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 px-3 py-0.5 rounded-full">{price}</span>
                      <span className="text-gray-500 text-xs border border-[#1E2D4A] px-2.5 py-0.5 rounded-full">{setupTime}</span>
                    </div>
                    <p className="text-[#4AC4E0] font-semibold text-base mb-3">{tagline}</p>
                    <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
                  </div>
                </div>
              </div>

              {/* Problems + Outcomes */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1E2D4A]">
                <div className="p-8 md:p-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">Problems This Solves</p>
                  <ul className="space-y-3">
                    {problems.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-gray-400">
                        <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-8 md:p-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#4AC4E0] mb-5">What You Get</p>
                  <ul className="space-y-3">
                    {outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <CheckCircle size={15} weight="duotone" color="#4AC4E0" className="mt-0.5 shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Highlight bar */}
              <div className="px-8 md:px-10 py-5 bg-[#4AC4E0]/5 border-t border-[#4AC4E0]/20 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <TrendUp size={16} color="#4AC4E0" weight="duotone" className="shrink-0" />
                  <p className="text-sm text-[#4AC4E0] font-medium">{highlight}</p>
                </div>
                <Button asChild size="sm" className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold shrink-0 flex items-center gap-1.5">
                  <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                    Get This Service <ArrowRight size={14} weight="bold" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </section>

        {/* MCP bonus */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-start gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-full px-4 py-1.5 text-sm text-[#4AC4E0] font-medium mb-5">
                  <Brain size={14} weight="fill" />
                  Bonus: AI CRM Management via Claude MCP
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Your Entire CRM, <span className="text-[#4AC4E0]">Reviewed by AI Every Week</span>
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Alongside the 5 core AI services, every ClientVerse account can be enrolled in AI CRM Management — where Claude AI connects directly to your GHL account via the official MCP server and runs a weekly pipeline review in plain English.
                </p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Stalled leads get flagged. Dead contacts get cleaned. Follow-up gaps get identified. You receive a plain-English weekly summary — no dashboards, no spreadsheets, just actionable findings.
                </p>
                <Button asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-11 px-7 flex items-center gap-2 w-fit">
                  <Link href="/services">See All AI Services <ArrowRight size={16} weight="bold" /></Link>
                </Button>
              </div>
              <div className="md:w-72 space-y-4 shrink-0">
                {[
                  { label: "AI CRM Management", price: "$397/mo" },
                  { label: "AI Performance Reporting", price: "$297/mo" },
                  { label: "AI Operations Management", price: "$597/mo" },
                  { label: "Cross-Channel Intelligence", price: "$497/mo" },
                ].map(({ label, price }) => (
                  <div key={label} className="bg-[#0A1628] border border-[#1E2D4A] rounded-xl px-5 py-4 flex justify-between items-center">
                    <span className="text-sm text-gray-400">{label}</span>
                    <span className="font-bold text-[#4AC4E0] text-sm">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 py-20 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Which AI services are right <span className="text-[#4AC4E0]">for your business?</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Take the 5-question AI Readiness Quiz and get a personalized recommendation — or book a free Systems Review and we'll map your stack live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold px-8 h-13 flex items-center gap-2">
                <Link href="/ai-readiness">
                  Take the AI Readiness Quiz <ArrowRight size={18} weight="bold" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/30 h-13 px-8">
                <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                  Book a Free Review
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

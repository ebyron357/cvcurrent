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
  Star,
  Brain,
  Robot,
  CheckCircle,
  ArrowRight,
  Clock,
  TrendUp,
  CurrencyDollar,
  Lightning,
  Cpu,
  Gear,
  Pulse,
} from "@phosphor-icons/react";

const modules = [
  {
    id: "voice-agent",
    status: "Active",
    Icon: Phone,
    name: "AI Voice Agent",
    tagline: "Every inbound call answered. Every lead captured.",
    setupTime: "48-hr deployment",
    description:
      "A fully trained AI receptionist deployed inside your business — handling inbound calls, answering FAQs from your knowledge base, booking appointments directly into your calendar, and escalating complex calls to a human. Speaks naturally. Full conversations, not menu trees.",
    problems: [
      "Missed calls after hours that go to voicemail and never call back",
      "Front desk staff spending 40% of their day on the same 8 questions",
      "Leads calling competitors because you didn't pick up first",
    ],
    outcomes: [
      "Every call answered under 2 rings, 24/7/365",
      "Appointments booked without a human involved",
      "FAQs handled automatically — pricing, hours, services, location",
      "Call recordings and transcripts logged automatically",
      "Seamless escalation to human staff when needed",
    ],
    highlight: "Typical outcome: 25–40% increase in booked appointments within 30 days.",
  },
  {
    id: "ai-chat",
    status: "Active",
    Icon: ChatCircle,
    name: "AI Lead Capture System",
    tagline: "Your website closes leads around the clock.",
    setupTime: "24-hr deployment",
    description:
      "A trained AI agent deployed across your website, SMS channel, and WhatsApp — qualifying leads, answering questions, and booking appointments. Every conversation is captured, tagged, and routed directly into your CRM pipeline. Nothing falls through.",
    problems: [
      "Website visitors leaving without converting because no one responded",
      "Contact forms sitting unread for 6–12 hours",
      "No qualification layer before leads hit your calendar",
    ],
    outcomes: [
      "Live on website, SMS, and WhatsApp from one unified dashboard",
      "Qualified leads booked directly into your calendar",
      "Every conversation tagged and stored in your pipeline",
      "Escalates to human when the conversation requires it",
      "Custom-trained on your business — not generic templates",
    ],
    highlight: "Typical outcome: 2–4x more leads captured vs. contact form alone.",
  },
  {
    id: "email-sms",
    status: "Active",
    Icon: Envelope,
    name: "Automated Follow-Up Engine",
    tagline: "Multi-touch sequences that run until they respond.",
    setupTime: "3-day deployment",
    description:
      "Automated drip sequences across email and SMS that nurture leads, re-engage cold contacts, and follow up on open quotes — written in your voice, triggered by behavior, and running continuously. No manual sending required.",
    problems: [
      "Leads who didn't book on first touch and were never followed up with",
      "Quotes sent that never received a response",
      "Past clients who went silent and were never re-engaged",
    ],
    outcomes: [
      "5–7 touch follow-up sequence fires on every new lead automatically",
      "Quote follow-up sequences at day 1, day 3, and day 7",
      "Re-engagement campaigns for contacts inactive 30, 60, 90 days",
      "Behavior-triggered emails (price page visited, link clicked, etc.)",
      "Full open, click, and reply analytics in your dashboard",
    ],
    highlight: "Typical outcome: 15–30% of previously lost leads recovered in first 60 days.",
  },
  {
    id: "reputation",
    status: "Active",
    Icon: Star,
    name: "Reputation Engine",
    tagline: "More 5-star reviews. Automatically. On every platform.",
    setupTime: "24-hr deployment",
    description:
      "Automated review request sequences that fire after every appointment or completed job. Negative sentiment is flagged before it posts publicly. 50+ platforms monitored continuously. Responses drafted automatically. Your reputation managed without any manual effort.",
    problems: [
      "Competitors dominating local search with more reviews despite worse service",
      "Satisfied clients who never left a review because no one asked",
      "Negative reviews sitting unanswered for weeks, damaging your ranking",
    ],
    outcomes: [
      "Post-appointment review request fires automatically via SMS and email",
      "Google and Facebook monitoring across 50+ review platforms",
      "AI-drafted response templates for every review type",
      "Negative sentiment alerts before they hit public sites",
      "Monthly reputation report with star rating trend",
    ],
    highlight: "Typical outcome: 3–5x more reviews per month, 0.3–0.7 star rating increase within 60 days.",
  },
  {
    id: "lead-intelligence",
    status: "Active",
    Icon: MegaphoneSimple,
    name: "Lead Intelligence & Prospecting",
    tagline: "Build a targeted pipeline in under 60 seconds.",
    setupTime: "Live on deployment",
    description:
      "Map-based local business prospecting built directly into the ClientVerse platform — pull any business category in any city into your CRM pipeline with one click. Name, phone, email, address, website — captured and ready for outreach. No third-party subscription required.",
    problems: [
      "Paying hundreds per month for prospecting tools that deliver stale data",
      "Hours spent manually researching and building outreach lists",
      "No way to quickly target a specific industry in a specific market",
    ],
    outcomes: [
      "Pull 50–500 targeted leads from a map in under 5 minutes",
      "Immediately added to your CRM pipeline with full contact data",
      "Tag by industry, city, and campaign for organized outreach",
      "Launch email or SMS campaign directly from the same platform",
      "Replaces external prospecting tools at no additional cost",
    ],
    highlight: "Typical outcome: Replaces costly prospecting subscriptions on day one.",
  },
];

const stats = [
  { Icon: Clock, value: "< 60s", label: "Missed call text-back speed" },
  { Icon: TrendUp, value: "30–40%", label: "Avg lead recovery rate" },
  { Icon: CurrencyDollar, value: "$40K+", label: "Avg annual revenue recovered" },
  { Icon: Robot, value: "24/7", label: "AI running without breaks" },
];

const additionalModules = [
  { Icon: Brain, name: "AI CRM Management", desc: "Weekly AI-powered pipeline reviews and contact hygiene" },
  { Icon: Pulse, name: "AI Performance Reporting", desc: "Plain-English monthly reports — no dashboards required" },
  { Icon: Gear, name: "AI Operations Management", desc: "Workflow optimization driven by Claude MCP analysis" },
  { Icon: Cpu, name: "Cross-Channel Intelligence", desc: "Unified view of performance across all lead channels" },
];

export default function AiStudio() {
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
            <Lightning size={14} weight="fill" />
            AI Studio — Your Operational Workforce Layer
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Your AI Workforce. <br />
            <span className="text-[#4AC4E0]">Deployed and Running.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Five operational modules — each solving a specific revenue leak in your business. All configured, deployed, and managed for you. No software to learn. No staff to manage. Live in 7 days.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-13 px-8 flex items-center gap-2">
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Get Your AI Stack Review <ArrowRight size={18} weight="bold" />
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

        {/* Modules */}
        <section className="container mx-auto px-4 py-20 max-w-5xl space-y-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase text-[#4AC4E0]/70 mb-3">Operational Modules</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              What's Running <span className="text-[#4AC4E0]">Inside Your Business</span>
            </h2>
          </div>

          {modules.map(({ id, status, Icon, name, tagline, setupTime, description, problems, outcomes, highlight }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="bg-[#0D1B2E] border border-[#1E2D4A] hover:border-[#4AC4E0]/30 rounded-2xl overflow-hidden transition-colors duration-300"
            >
              {/* Module header */}
              <div className="p-8 md:p-10 border-b border-[#1E2D4A]">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div
                    className="rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      width: 64,
                      height: 64,
                      background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)",
                      border: "1px solid rgba(74,196,224,0.4)",
                      boxShadow: "0 0 28px rgba(74,196,224,0.18)",
                    }}
                  >
                    <Icon size={32} color="#4AC4E0" weight="fill" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">{name}</h2>
                      <span className="text-[#4AC4E0] text-xs font-bold bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4AC4E0] inline-block" />
                        {status}
                      </span>
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
                  <p className="text-xs font-bold uppercase tracking-widest text-[#4AC4E0] mb-5">Module Output</p>
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

              {/* Outcome bar */}
              <div className="px-8 md:px-10 py-5 bg-[#4AC4E0]/5 border-t border-[#4AC4E0]/20 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <TrendUp size={16} color="#4AC4E0" weight="duotone" className="shrink-0" />
                  <p className="text-sm text-[#4AC4E0] font-medium">{highlight}</p>
                </div>
                <Button asChild size="sm" className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold shrink-0 flex items-center gap-1.5">
                  <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                    Deploy This Module <ArrowRight size={14} weight="bold" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </section>

        {/* AI Intelligence Layer */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-start gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-full px-4 py-1.5 text-sm text-[#4AC4E0] font-medium mb-5">
                  <Brain size={14} weight="fill" />
                  Intelligence Layer — Claude MCP
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Your Entire CRM, <span className="text-[#4AC4E0]">Reviewed by AI Every Week</span>
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Every ClientVerse account includes the AI Intelligence Layer — where Claude AI connects directly to your CRM via an official MCP integration and runs a weekly pipeline review in plain English.
                </p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Stalled leads get flagged. Dead contacts get cleaned. Follow-up gaps get identified. You receive a plain-English weekly summary — no dashboards, no spreadsheets, just actionable intelligence.
                </p>
                <Button asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-11 px-7 flex items-center gap-2 w-fit">
                  <Link href="/features">See Full Platform Capabilities <ArrowRight size={16} weight="bold" /></Link>
                </Button>
              </div>
              <div className="md:w-72 space-y-3 shrink-0">
                {additionalModules.map(({ Icon, name, desc }) => (
                  <div key={name} className="bg-[#0A1628] border border-[#1E2D4A] rounded-xl px-5 py-4 flex items-start gap-3">
                    <div
                      className="rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        width: 32,
                        height: 32,
                        background: "rgba(74,196,224,0.08)",
                        border: "1px solid rgba(74,196,224,0.3)",
                      }}
                    >
                      <Icon size={16} color="#4AC4E0" weight="duotone" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                    </div>
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
              Which modules does your business <span className="text-[#4AC4E0]">need most?</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Take the 5-question AI Readiness Quiz for a personalized recommendation — or book a free Revenue Audit and we'll map your full AI workforce stack live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold px-8 h-13 flex items-center gap-2">
                <Link href="/ai-readiness">
                  Take the AI Readiness Quiz <ArrowRight size={18} weight="bold" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/30 h-13 px-8">
                <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                  Book a Free Audit
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

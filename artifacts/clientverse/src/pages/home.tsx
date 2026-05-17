import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import {
  ChartBar,
  Wrench,
  Gauge,
  PhoneSlash,
  ArrowRight,
  CheckCircle,
  Phone,
  Robot,
  Star,
  CalendarCheck,
  Envelope,
  ChatCircle,
  ClockCountdown,
  TrendUp,
  CurrencyDollar,
  Users,
  ShieldCheck,
  Lightning,
  Plus,
  Minus,
  Brain,
  MagnifyingGlass,
  Funnel,
} from "@phosphor-icons/react";

const leaks = [
  {
    Icon: PhoneSlash,
    title: "Missed Calls → Lost Revenue",
    body: "Every call that hits voicemail after hours is a lead that called your competitor next. The average business misses 38% of inbound calls.",
    cost: "~$8,400/yr per missed call slot",
  },
  {
    Icon: Funnel,
    title: "Leads Falling Through Gaps",
    body: "New leads that don't hear back within 5 minutes are 80% less likely to convert. Most businesses follow up in 2–3 days — or never.",
    cost: "~$22,000/yr in lost pipeline",
  },
  {
    Icon: Envelope,
    title: "Quotes Sent. Silence.",
    body: "Proposals go out. Nothing comes back. No automated follow-up means you're waiting on deals that already died — you just don't know yet.",
    cost: "~$15,000/yr in recoverable revenue",
  },
  {
    Icon: CalendarCheck,
    title: "No-Shows With No Recovery",
    body: "Appointments are booked. Clients don't show. No automated reminder, no rebooking sequence, no revenue recovery. Just an empty slot.",
    cost: "~$6,000/yr in unrecovered appointments",
  },
  {
    Icon: Star,
    title: "Reviews Never Asked For",
    body: "Happy clients leave. You forget to ask. Your competitor has 200 reviews. You have 14. Local search visibility drops accordingly.",
    cost: "~$12,000/yr in referral and search revenue",
  },
  {
    Icon: Users,
    title: "Staff on Repetitive Tasks",
    body: "Your team is answering the same 8 questions, manually entering contacts, and chasing paperwork. AI eliminates all of it — without headcount.",
    cost: "~$18,000/yr in recoverable staff efficiency",
  },
];

const outcomes = [
  { before: "38% of calls go to voicemail", after: "Every call answered in under 2 rings, 24/7" },
  { before: "Leads wait 48+ hours for follow-up", after: "Automated reply within 60 seconds of inquiry" },
  { before: "Quotes sit with no follow-up", after: "5-touch automated sequence fires automatically" },
  { before: "No-shows eat your calendar", after: "Automated reminders + same-day rebooking" },
  { before: "12 Google reviews vs. competitor's 200", after: "Post-job review request fires every time" },
  { before: "Staff answering the same FAQs all day", after: "AI handles FAQ, booking, and intake" },
];

const aiSystems = [
  {
    Icon: Phone,
    name: "AI Voice Receptionist",
    desc: "Answers every call, 24/7. Books appointments, handles FAQs, escalates intelligently. Never calls in sick. Never puts a lead on hold.",
    tag: "Always On",
  },
  {
    Icon: ChatCircle,
    name: "AI Lead Follow-Up",
    desc: "Every new lead gets a personalized reply within 60 seconds — SMS, email, or chat. 5-touch sequences run automatically until they book.",
    tag: "< 60 sec",
  },
  {
    Icon: Star,
    name: "AI Review Engine",
    desc: "Post-appointment review requests fire automatically. Negative sentiment flagged before it posts. 50+ platforms monitored.",
    tag: "50+ platforms",
  },
  {
    Icon: Robot,
    name: "AI Pipeline Manager",
    desc: "Claude connects directly to your CRM via MCP. Stalled leads flagged. Dead contacts cleaned. Weekly plain-English report. No dashboards.",
    tag: "Weekly audit",
  },
  {
    Icon: Brain,
    name: "AI Search Visibility",
    desc: "Optimize to appear in ChatGPT, Perplexity, and Gemini answers — not just Google. First-mover advantage before your competitors discover this.",
    tag: "GEO / AEO",
  },
];

const steps = [
  {
    n: "01",
    title: "Book Your Revenue Audit",
    body: "30 minutes. We map your current stack, identify every revenue leak, and calculate the exact dollar cost of each gap.",
  },
  {
    n: "02",
    title: "Receive Your Gap Report",
    body: "A written C.L.A.R.I.T.Y. report delivered within 48 hours. Every gap. Every fix. Every ROI projection. Prioritized by revenue impact.",
  },
  {
    n: "03",
    title: "We Build Your Systems",
    body: "Your CRM, AI agents, automations, and follow-up sequences go live in 7 days or less. You don't touch a dashboard.",
  },
  {
    n: "04",
    title: "Revenue Comes Back",
    body: "Missed calls answered. Lost leads recovered. Reviews flowing. Pipeline clean. Monthly reporting tells you exactly what's working.",
  },
];

const trustStats = [
  { value: "7 days", label: "Go-live guarantee" },
  { value: "< 60s", label: "Lead response time" },
  { value: "38%", label: "Avg missed call rate fixed" },
  { value: "$40K+", label: "Avg annual revenue recovered" },
];

const faqs = [
  {
    q: "How fast do I actually go live?",
    a: "7 days. That's the ceiling, not the average. Day 1 is your discovery call. By day 7, your CRM is live, your AI follow-up is running, and your pipeline has contacts in it. Most clients go live faster.",
  },
  {
    q: "Do I need any technical knowledge?",
    a: "No. You describe what you want to happen in your business. We build and manage the systems that make it happen. If something breaks, we fix it.",
  },
  {
    q: "What if I already have GoHighLevel?",
    a: "We do a System Rescue™ — audit your existing account, clean it out, and rebuild it to spec. Most GHL accounts we inherit have 12–20 broken or missing configurations.",
  },
  {
    q: "Is there a contract?",
    a: "Month-to-month. No annual lock-in. Cancel any billing month. Your data stays accessible for 30 days after cancellation — fully exportable.",
  },
  {
    q: "What does the Revenue Audit actually deliver?",
    a: "A written C.L.A.R.I.T.Y. report: 7 operational categories assessed, every revenue leak identified, a dollar value on each gap, a prioritized 90-day fix roadmap, and a live walkthrough call.",
  },
];

function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map(({ q, a }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
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
              {open === i ? <Minus size={16} color="#4AC4E0" weight="bold" /> : <Plus size={16} color="#4AC4E0" weight="bold" />}
            </div>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-[#1E2D4A] pt-4">{a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">

        {/* ── 1. HERO ────────────────────────────────────────────────── */}
        <section className="relative container mx-auto px-4 pt-16 pb-24 md:pt-28 md:pb-40 text-center max-w-5xl">
          {/* Radial glow behind hero */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-32 w-[900px] h-[600px]"
            style={{ background: "radial-gradient(ellipse 70% 55% at 50% 5%, rgba(74,196,224,0.11) 0%, rgba(74,196,224,0.04) 45%, transparent 70%)", zIndex: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 inline-flex items-center gap-2 bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-full px-4 py-1.5 text-sm text-[#4AC4E0] font-medium mb-8"
          >
            <ShieldCheck size={14} weight="fill" />
            Veteran-Owned · 7-Day Go-Live Guarantee · No Contracts
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.08]"
          >
            Your Business Is Leaking Revenue.
            <br className="hidden md:block" />
            <span className="text-[#4AC4E0]">We Find It. We Fix It.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-base text-[#4AC4E0]/70 font-semibold tracking-widest uppercase mb-4"
          >
            AI Business Operating System for Service Businesses
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.17 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            Not a tool. Not an agency. A fully managed operational infrastructure — AI workforce deployed inside your business, running 24/7, live in 7 days.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="text-sm text-gray-500 mb-10"
          >
            The average service business loses <span className="text-white font-semibold">$40,000–$70,000/year</span> to operational gaps that take under 7 days to fix.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              asChild
              className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-lg px-10 h-14 flex items-center gap-2"
            >
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Book Your Revenue Audit
                <ArrowRight size={18} weight="bold" />
              </a>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/40 hover:bg-[#4AC4E0]/5 text-base px-8 h-14 flex items-center gap-2"
            >
              <Link href="/ai-studio">
                <Robot size={18} weight="duotone" />
                Explore the AI Workforce
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* ── 2. TRUST BAR ────────────────────────────────────────────── */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-10">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {trustStats.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl font-black text-[#4AC4E0] mb-1">{value}</p>
                  <p className="text-gray-400 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. REVENUE LEAKS ────────────────────────────────────────── */}
        <section className="container mx-auto px-4 py-24 max-w-6xl">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-3"
            >
              The 6 Operational Revenue Leaks
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Where Your Revenue Is <span className="text-[#4AC4E0]">Going Right Now</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-gray-400 max-w-xl mx-auto"
            >
              These aren't hypotheticals. They're measurable, fixable operational gaps — and most businesses have all six.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {leaks.map(({ Icon, title, body, cost }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#0D1B2E] border border-[#1E2D4A] hover:border-[#4AC4E0]/30 rounded-2xl p-7 transition-colors duration-300 flex flex-col gap-4"
              >
                <div
                  className="rounded-xl flex items-center justify-center shrink-0 self-start"
                  style={{ width: 52, height: 52, background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)", border: "1px solid rgba(74,196,224,0.4)", boxShadow: "0 0 24px rgba(74,196,224,0.18), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                >
                  <Icon size={24} color="#4AC4E0" weight="fill" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{body}</p>
                  <p className="text-xs text-red-400 font-semibold border border-red-400/20 bg-red-400/5 inline-block px-3 py-1 rounded-full">{cost}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold px-8 h-13 flex items-center gap-2 mx-auto w-fit">
              <Link href="/revenue-calculator">
                <CurrencyDollar size={18} weight="bold" />
                Calculate My Exact Revenue Leak
              </Link>
            </Button>
          </div>
        </section>

        {/* ── 4. BEFORE / AFTER ───────────────────────────────────────── */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                What Your Business Looks Like <span className="text-[#4AC4E0]">After 30 Days</span>
              </motion.h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-[#1E2D4A]">
              <div className="bg-[#0A1628] p-8 border-b md:border-b-0 md:border-r border-[#1E2D4A]">
                <p className="text-xs font-bold tracking-widest text-red-400 uppercase mb-6">Before ClientVerse</p>
                <ul className="space-y-4">
                  {outcomes.map(({ before }) => (
                    <li key={before} className="flex items-start gap-3 text-sm text-gray-400">
                      <span className="text-red-400 mt-0.5 shrink-0 font-bold">✗</span>
                      {before}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0D1B2E] p-8">
                <p className="text-xs font-bold tracking-widest text-[#4AC4E0] uppercase mb-6">After ClientVerse</p>
                <ul className="space-y-4">
                  {outcomes.map(({ after }) => (
                    <li key={after} className="flex items-start gap-2.5 text-sm text-gray-200">
                      <CheckCircle size={16} weight="duotone" color="#4AC4E0" className="mt-0.5 shrink-0" />
                      {after}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. AI SYSTEMS / EMPLOYEES ──────────────────────────────── */}
        <section className="container mx-auto px-4 py-24 max-w-6xl">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-3"
            >
              5 AI Systems Running 24/7 In Your Business
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Your AI Workforce. <span className="text-[#4AC4E0]">Never Sleeps.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 max-w-xl mx-auto"
            >
              Each system is configured, managed, and optimized for your specific business. No software to learn. No dashboards to check. No staff to manage.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiSystems.map(({ Icon, name, desc, tag }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`bg-[#0D1B2E] border rounded-2xl p-7 hover:border-[#4AC4E0]/40 transition-colors duration-300 flex flex-col gap-4 ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
                style={{ borderColor: "rgba(30, 45, 74, 1)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="rounded-xl flex items-center justify-center shrink-0"
                    style={{ width: 56, height: 56, background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)", border: "1px solid rgba(74,196,224,0.4)", boxShadow: "0 0 28px rgba(74,196,224,0.2), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                  >
                    <Icon size={26} color="#4AC4E0" weight="fill" />
                  </div>
                  <span className="text-[10px] font-bold text-[#4AC4E0] bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">{tag}</span>
                </div>
                <div>
                  <h3 className="font-bold text-base mb-2">{name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/30 h-12 px-8 flex items-center gap-2 mx-auto w-fit">
              <Link href="/ai-studio">
                See Your AI Workforce Stack <ArrowRight size={16} weight="bold" />
              </Link>
            </Button>
          </div>
        </section>

        {/* ── 5b. OPERATIONAL ARCHITECTURE ─────────────────────────────── */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-3">How the System Works</p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Every Lead. Every Channel. <span className="text-[#4AC4E0]">One Operating Layer.</span>
              </h2>
            </div>

            {/* Architecture diagram */}
            <div className="flex flex-col gap-4">

              {/* Row 1 — Inputs */}
              <div>
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase text-center mb-3">Inbound Signals</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Inbound Calls", sub: "Missed & live" },
                    { label: "Web Visitors", sub: "Site & landing pages" },
                    { label: "Form Submissions", sub: "Contact & booking" },
                    { label: "Existing Contacts", sub: "Cold & dormant leads" },
                  ].map(({ label, sub }) => (
                    <div key={label} className="bg-[#0A1628] border border-[#1E2D4A] rounded-xl px-4 py-3 text-center">
                      <p className="text-sm font-semibold text-white">{label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-6 bg-[#4AC4E0]/30" />
                  <ArrowRight size={16} color="#4AC4E0" weight="bold" className="rotate-90 opacity-60" />
                </div>
              </div>

              {/* Row 2 — AI Processing */}
              <div>
                <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase text-center mb-3">AI Workforce Layer</p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {[
                    "AI Voice Agent",
                    "Lead Capture System",
                    "Follow-Up Engine",
                    "Reputation Engine",
                    "CRM Intelligence",
                  ].map((label) => (
                    <div
                      key={label}
                      className="rounded-xl px-3 py-3 text-center"
                      style={{
                        background: "linear-gradient(145deg, rgba(74,196,224,0.15) 0%, rgba(74,196,224,0.05) 100%)",
                        border: "1px solid rgba(74,196,224,0.35)",
                        boxShadow: "0 0 16px rgba(74,196,224,0.1)",
                      }}
                    >
                      <p className="text-xs font-bold text-[#4AC4E0]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-px h-6 bg-[#4AC4E0]/30" />
                  <ArrowRight size={16} color="#4AC4E0" weight="bold" className="rotate-90 opacity-60" />
                </div>
              </div>

              {/* Row 3 — Outputs */}
              <div>
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase text-center mb-3">Business Outcomes</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Pipeline Growth", sub: "Every lead captured & qualified" },
                    { label: "Revenue Recovery", sub: "Lost deals re-engaged" },
                    { label: "Reputation Score", sub: "Reviews growing automatically" },
                    { label: "Operational Data", sub: "Plain-English weekly reports" },
                  ].map(({ label, sub }) => (
                    <div key={label} className="bg-[#0A1628] border border-emerald-500/20 rounded-xl px-4 py-3 text-center">
                      <p className="text-sm font-semibold text-emerald-400">{label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <p className="text-center text-gray-500 text-xs mt-8">
              Fully managed · Deployed in 7 days · Running 24/7 · No dashboards required
            </p>
          </div>
        </section>

        {/* ── 6. HOW IT WORKS ─────────────────────────────────────────── */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold mb-4"
              >
                From Audit to Revenue <span className="text-[#4AC4E0]">In 4 Steps</span>
              </motion.h2>
              <p className="text-gray-400">No long onboarding. No technical requirements. No waiting.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map(({ n, title, body }, i) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[#0A1628] border border-[#1E2D4A] rounded-2xl p-8 flex gap-6 items-start"
                >
                  <span className="text-5xl font-black text-[#4AC4E0]/40 leading-none shrink-0 select-none">{n}</span>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. REVENUE AUDIT OFFER ──────────────────────────────────── */}
        <section className="container mx-auto px-4 py-24 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D1B2E] border border-[#4AC4E0]/30 rounded-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 md:p-12 border-b md:border-b-0 md:border-r border-[#4AC4E0]/20">
                <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-4">The C.L.A.R.I.T.Y. Framework™</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-5">
                  Your Revenue Audit. <br />
                  <span className="text-[#4AC4E0]">Delivered in 48 Hours.</span>
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8">
                  A 7-point operational assessment of your entire business — every gap identified, every fix mapped, every revenue leak given a dollar value. Delivered as a written report with a live walkthrough call.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "7 operational categories assessed",
                    "Every revenue leak identified and quantified",
                    "Prioritized 90-day fix roadmap",
                    "Written report + live walkthrough call",
                    "No fluff — only executable recommendations",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle size={16} weight="duotone" color="#4AC4E0" className="shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-13 px-8 flex items-center gap-2 w-full sm:w-fit"
                >
                  <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                    Book Your Revenue Audit <ArrowRight size={16} weight="bold" />
                  </a>
                </Button>
              </div>
              <div className="p-10 md:p-12 flex flex-col justify-center gap-6">
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-2">C.L.A.R.I.T.Y. covers:</p>
                {[
                  { letter: "C", label: "Consolidate", desc: "What tools overlap or conflict?" },
                  { letter: "L", label: "Leak", desc: "Where is revenue escaping?" },
                  { letter: "A", label: "Automate", desc: "What should never be manual?" },
                  { letter: "R", label: "Revenue", desc: "What converts more leads?" },
                  { letter: "I", label: "Integrate", desc: "What isn't connected that should be?" },
                  { letter: "T", label: "Trust", desc: "What kills conversions silently?" },
                  { letter: "Y", label: "Yield", desc: "What's the ROI of fixing it all?" },
                ].map(({ letter, label, desc }) => (
                  <div key={letter} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#4AC4E0]/10 border border-[#4AC4E0]/40 flex items-center justify-center font-black text-[#4AC4E0] shrink-0 text-sm">
                      {letter}
                    </div>
                    <div>
                      <span className="font-bold text-sm text-white">{label}</span>
                      <span className="text-gray-500 text-sm ml-2">— {desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── 8. WHAT'S INCLUDED / 3 PILLARS ─────────────────────────── */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                We <span className="text-[#4AC4E0]">Build. Repair. Operate.</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Unlike agencies that hand you tools and disappear, we run the systems for you — permanently.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  Icon: Lightning,
                  label: "Build",
                  body: "We construct your CRM, automations, AI agents, and pipelines from scratch — configured exactly for your business. Go-live in 7 days.",
                  items: ["CRM setup", "AI voice agent", "Automation workflows", "Pipeline stages", "Booking system"],
                },
                {
                  Icon: Wrench,
                  label: "Repair",
                  body: "Already have GHL or another CRM that's a mess? System Rescue™ audits, cleans, and rebuilds it. Typically 12–20 issues fixed in 48 hours.",
                  items: ["Broken automation repair", "Duplicate contact cleanup", "Pipeline restoration", "Data migration", "Lost lead recovery"],
                },
                {
                  Icon: Gauge,
                  label: "Operate",
                  body: "We don't hand you the keys and disappear. Monthly AI-powered reviews, weekly reporting, and ongoing optimization — all managed.",
                  items: ["Monthly AI pipeline review", "Performance reporting", "Review management", "Campaign optimization", "Ongoing support"],
                },
              ].map(({ Icon, label, body, items }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[#0A1628] border border-[#1E2D4A] hover:border-[#4AC4E0]/30 rounded-2xl p-8 transition-colors duration-300"
                >
                  <div
                    className="mb-6 rounded-2xl flex items-center justify-center"
                    style={{ width: 72, height: 72, background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)", border: "1px solid rgba(74,196,224,0.4)", boxShadow: "0 0 32px rgba(74,196,224,0.22), inset 0 1px 0 rgba(255,255,255,0.06)" }}
                  >
                    <Icon size={34} color="#4AC4E0" weight="fill" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{label}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{body}</p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle size={12} weight="duotone" color="#4AC4E0" className="shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. FAQ ──────────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 py-24 max-w-4xl">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Common Questions
            </motion.h2>
            <p className="text-gray-400">Fast answers before you book.</p>
          </div>
          <HomeFaq />
          <div className="text-center mt-8">
            <Button asChild variant="ghost" className="text-[#4AC4E0] hover:text-[#4AC4E0] hover:bg-[#4AC4E0]/5 flex items-center gap-1.5 mx-auto w-fit">
              <Link href="/faq">
                See all 26 questions <ArrowRight size={14} weight="bold" />
              </Link>
            </Button>
          </div>
        </section>

        {/* ── 10. FINAL CTA ───────────────────────────────────────────── */}
        <section className="bg-[#4AC4E0] py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-[#0A1628] mb-5 leading-tight"
            >
              Your competitors are already automating.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-[#0A1628]/75 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Book your Revenue Audit. In 30 minutes we'll identify every gap in your business, put a dollar value on it, and show you exactly what to fix first.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#0A1628] hover:bg-[#132038] text-white font-bold h-14 px-10 text-lg flex items-center gap-2"
              >
                <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                  Book Your Revenue Audit
                  <ArrowRight size={18} weight="bold" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#0A1628]/30 text-[#0A1628] hover:bg-[#0A1628]/10 h-14 px-8 font-semibold"
              >
                <Link href="/revenue-calculator">Calculate My Revenue Leak First</Link>
              </Button>
            </motion.div>
            <p className="text-[#0A1628]/50 text-xs mt-6">
              No long-term contracts · 7-day go-live guarantee · Veteran-owned
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

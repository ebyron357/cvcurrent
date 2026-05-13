import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  PhoneSlash,
  Robot,
  CurrencyDollar,
  TrendUp,
  FileText,
  BookOpen,
  ArrowRight,
  CheckCircle,
} from "@phosphor-icons/react";

const freeTools = [
  {
    Icon: PhoneSlash,
    title: "Revenue Leak Calculator",
    description: "Find out how much your business is losing to missed calls, slow follow-up, and lead drop-off — in 60 seconds. Enter 3 numbers. See your annual leak.",
    cta: "Calculate Now",
    href: "/revenue-calculator",
    internal: true,
    tag: "Most Used",
  },
  {
    Icon: Robot,
    title: "AI Readiness Quiz",
    description: "5 questions that score your business's AI readiness. Low score creates urgency. High score shows you're ready for Commander tier. Both paths end with a personalized plan.",
    cta: "Take the Quiz",
    href: "/ai-readiness",
    internal: true,
    tag: "2 Minutes",
  },
  {
    Icon: CurrencyDollar,
    title: "ROI Calculator",
    description: "Enter what you're currently paying for your CRM, scheduling, reputation, and ad tools. See exactly what you save by switching — and how fast the setup fee pays for itself.",
    cta: "Calculate My Savings",
    href: "/roi-calculator",
    internal: true,
    tag: "Interactive",
  },
  {
    Icon: TrendUp,
    title: "C.L.A.R.I.T.Y. Framework™",
    description: "Our proprietary 7-point AI stack audit methodology. Learn what we evaluate in every audit, what findings look like, and how the ROI projection is built. The framework that separates us from every other operator.",
    cta: "Explore the Framework",
    href: "/clarity",
    internal: true,
    tag: "Proprietary",
  },
];

const guides = [
  {
    title: "The Operator's Guide to AI Integration",
    description: "How to responsibly evaluate, pilot, and operationalize AI tools in a business environment without creating new dependencies or risks.",
    cta: "Read via Consultation",
  },
  {
    title: "From Chaos to System: A 90-Day Operations Playbook",
    description: "A stage-by-stage guide to stabilizing and then scaling a business operation. Written for operators who've outgrown their current setup.",
    cta: "Read via Consultation",
  },
  {
    title: "AI Security for Small Business: What You Need to Know in 2026",
    description: "The threats your AI tools create and the controls that mitigate them. Written from a cybersecurity background — not a marketing perspective.",
    cta: "Read via Consultation",
  },
  {
    title: "Veteran Entrepreneurs: The AI Tools That Run Your Business",
    description: "Built specifically for veteran-owned businesses entering the AI era — what to implement first, what to avoid, and how to access veteran-owned business resources.",
    cta: "Read via Consultation",
  },
];

const templates = [
  {
    title: "Systems Audit Checklist",
    description: "A 40-point checklist for auditing your current operational stack — tech tools, automations, data flows, and team processes. Based on the C.L.A.R.I.T.Y. Framework™.",
    cta: "Download via Consultation",
  },
  {
    title: "CRM Architecture Worksheet",
    description: "Map your pipeline stages, field requirements, and ownership model before touching your CRM. Prevents the most common implementation failures.",
    cta: "Download via Consultation",
  },
  {
    title: "GHL Snapshot Deployment Checklist",
    description: "Step-by-step checklist for deploying an industry snapshot into a new client sub-account — under 15 minutes every time.",
    cta: "Download via Consultation",
  },
  {
    title: "MCP Setup Guide — Claude + GHL",
    description: "Internal-grade walkthrough for connecting Claude to a GHL sub-account via Private Integration Token. Covers permissions, security, and test commands.",
    cta: "Download via Consultation",
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="mb-16">
            <p className="text-[#4AC4E0] font-semibold uppercase tracking-widest text-sm mb-4">Resources</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tools That Answer <br />
              <span className="text-[#4AC4E0]">Before You Ask.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl">
              Free calculators, quizzes, and guides built for service business owners who want to know their numbers before they talk to anyone.
            </p>
          </div>

          {/* Free Interactive Tools */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">Free Interactive Tools</h2>
              <span className="bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 text-[#4AC4E0] text-xs font-bold px-3 py-1 rounded-full">Live Now</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {freeTools.map(({ Icon, title, description, cta, href, internal, tag }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-[#132038] border border-[#4AC4E0]/20 hover:border-[#4AC4E0]/50 rounded-xl p-7 flex flex-col transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className="rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        width: 48,
                        height: 48,
                        background: "rgba(74,196,224,0.08)",
                        border: "1.5px solid rgba(74,196,224,0.5)",
                        boxShadow: "0 0 12px rgba(74,196,224,0.10)",
                      }}
                    >
                      <Icon size={22} color="#4AC4E0" weight="duotone" />
                    </div>
                    <span className="text-xs font-bold text-[#4AC4E0] bg-[#4AC4E0]/10 border border-[#4AC4E0]/20 px-2.5 py-1 rounded-full">{tag}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                  <p className="text-white/60 leading-relaxed flex-1 mb-6 text-sm">{description}</p>
                  {internal ? (
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-[#4AC4E0] text-sm font-semibold group-hover:gap-3 transition-all"
                    >
                      {cta} <ArrowRight size={14} weight="bold" />
                    </Link>
                  ) : (
                    <a
                      href={href}
                      className="inline-flex items-center gap-2 text-[#4AC4E0] text-sm font-semibold group-hover:gap-3 transition-all"
                    >
                      {cta} <ArrowRight size={14} weight="bold" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Templates */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <FileText size={22} color="#4AC4E0" weight="duotone" />
              <h2 className="text-2xl font-bold text-white">Templates & Checklists</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {templates.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#132038] border border-white/10 rounded-xl p-7 hover:border-[#4AC4E0]/30 transition-all duration-300 flex flex-col"
                >
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed flex-1 mb-5 text-sm">{item.description}</p>
                  <a
                    href="https://calendly.com/clientverse/strategy-call"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[#4AC4E0] text-sm font-semibold hover:gap-3 transition-all"
                  >
                    {item.cta} →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Guides */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <BookOpen size={22} color="#4AC4E0" weight="duotone" />
              <h2 className="text-2xl font-bold text-white">Guides & Playbooks</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {guides.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#132038] border border-white/10 rounded-xl p-7 hover:border-[#4AC4E0]/30 transition-all duration-300 flex flex-col"
                >
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed flex-1 mb-5 text-sm">{item.description}</p>
                  <a
                    href="https://calendly.com/clientverse/strategy-call"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-[#4AC4E0] text-sm font-semibold hover:gap-3 transition-all"
                  >
                    {item.cta} →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-[#132038] border border-[#4AC4E0]/20 rounded-2xl p-10 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4">Start with the Revenue Leak Calculator</h2>
                <p className="text-white/60 mb-0 max-w-xl leading-relaxed">
                  Know your number before you talk to anyone. Three questions. Sixty seconds. Your annual revenue leak — personalized.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Link
                  href="/revenue-calculator"
                  className="inline-flex items-center justify-center gap-2 bg-[#4AC4E0] text-[#0A1628] font-bold px-8 py-4 rounded-lg hover:bg-[#3bb1cc] transition-colors"
                >
                  <PhoneSlash size={18} weight="duotone" />
                  Calculate My Revenue Leak
                </Link>
                <a
                  href="https://calendly.com/clientverse/strategy-call"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:border-[#4AC4E0]/40 transition-colors text-sm"
                >
                  Book Your Revenue Audit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

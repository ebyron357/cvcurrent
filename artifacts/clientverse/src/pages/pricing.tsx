import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CVButtonLink } from "@/components/cv-ui";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Stack,
  Gauge,
  Buildings,
  CheckCircle,
  ArrowRight,
  Lightning,
  Shield,
  Crown,
  Star,
  Lock,
} from "@phosphor-icons/react";

const tiers = [
  {
    Icon: Stack,
    name: "COMMAND",
    badge: null,
    replaces: "$400–600/mo in tools",
    tagline: "Your complete business operating system — ready in 7 days.",
    features: [
      "CRM & pipeline management",
      "Missed call text-back under 60 seconds",
      "AI lead response & follow-up",
      "Calendar & appointment booking",
      "Proposals & e-sign",
      "Automated follow-up sequences",
      "Embedded funding access (Lendio, Relay, BlueVine)",
    ],
  },
  {
    Icon: Lightning,
    name: "OPERATOR",
    badge: "Most Popular",
    replaces: "$800–1,100/mo in tools",
    tagline: "Everything in Command plus reputation, calls, and reach.",
    features: [
      "Everything in Command",
      "Reputation management (50+ platforms)",
      "Call tracking & recording",
      "AI chatbot",
      "100+ directory listings management",
      "Voicemail drop campaigns",
      "WhatsApp business integration",
    ],
  },
  {
    Icon: Crown,
    name: "COMMANDER",
    badge: "Best Value",
    replaces: "$3,000–5,000/mo in tools/agencies",
    tagline: "A full AI operations team — at a fraction of agency cost.",
    features: [
      "Everything in Operator",
      "AI voice agent 24/7",
      "Lead Intelligence (map-based local import)",
      "AI Decision Maker in workflows",
      "Google + Meta ads management",
      "Local SEO",
      "Done-for-you content creation",
      "Business Academy access",
    ],
  },
  {
    Icon: Buildings,
    name: "ENTERPRISE / FEDERAL",
    badge: "Veteran-Owned",
    replaces: "Full custom stack",
    tagline: "Federal-grade infrastructure. Compliance-ready. Custom-built.",
    features: [
      "Everything in Commander",
      "Dedicated account manager",
      "AI Security Audit",
      "Compliance documentation",
      "Federal contract readiness",
      "Veteran-owned business positioning",
      "Custom integrations & SLAs",
    ],
  },
];

const addOns = [
  { name: "Reputation Management", note: "50+ platform coverage" },
  { name: "AI CRM Management", note: "MCP-powered" },
  { name: "AI Performance Reporting", note: "Plain-English monthly" },
  { name: "Local SEO", note: "Fully managed" },
  { name: "Google + Meta Ads", note: "Done-for-you" },
  { name: "AI Voice Agent Management", note: "24/7 coverage" },
  { name: "Social Media Management", note: "Content + scheduling" },
  { name: "AI Operations Management", note: "MCP-powered" },
  { name: "Cross-Channel Intelligence", note: "Ads + CRM unified" },
  { name: "CRM Audit + Cleanup", note: "Full account fix" },
];

export default function Pricing() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-12 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-full px-4 py-1.5 text-sm text-[#4AC4E0] font-medium mb-6"
          >
            <Gauge size={14} weight="fill" />
            7-Day Go-Live Guarantee
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            One Platform. <br />
            <span className="text-[#4AC4E0]">Every System You Need.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-4"
          >
            ClientVerse replaces the stack of tools draining your budget — and the agency fees for managing them.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-sm text-gray-500"
          >
            Not sure where to start?{" "}
            <Link href="/revenue-calculator" className="text-[#4AC4E0] hover:underline">
              Calculate your revenue leak first →
            </Link>
          </motion.p>
        </section>

        {/* Pricing note banner */}
        <section className="container mx-auto px-4 mb-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-2xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
          >
            <div className="flex items-center gap-3">
              <Lock size={18} color="#4AC4E0" weight="fill" className="shrink-0" />
              <div>
                <span className="text-[#4AC4E0] font-bold text-lg">Pricing is discussed on your Revenue Audit call.</span>
                <span className="text-gray-400 ml-3 text-sm">We match the right tier to your actual needs — not the other way around.</span>
              </div>
            </div>
            <CVButtonLink
              href="https://calendly.com/clientverse/strategy-call"
              target="_blank"
              rel="noreferrer"
              variant="primary"
              size="sm"
              className="shrink-0"
            >
              Book Your Revenue Audit
            </CVButtonLink>
          </motion.div>
        </section>

        {/* Tier Cards */}
        <section className="container mx-auto px-4 pb-16 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {tiers.map(({ Icon, name, badge, replaces, tagline, features }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`cv-card cv-card--interactive relative p-8 flex flex-col ${badge === "Most Popular" ? "cv-card--pricing-featured" : "cv-card--pricing"}`}
                style={{ overflow: "visible" }}
              >
                {badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap ${
                      badge === "Most Popular"
                        ? "bg-[#4AC4E0] text-[#0A1628]"
                        : badge === "Best Value"
                        ? "bg-amber-500 text-[#0A1628]"
                        : "bg-[#1E2D4A] text-[#4AC4E0] border border-[#4AC4E0]/30"
                    }`}
                  >
                    {badge === "Most Popular" && <Star size={10} weight="fill" className="inline mr-1 mb-0.5" />}
                    {badge}
                  </div>
                )}

                {/* Icon */}
                <div
                  className="mb-5 rounded-xl flex items-center justify-center"
                  style={{
                    width: 60,
                    height: 60,
                    background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)",
                    border: "1px solid rgba(74,196,224,0.4)",
                    boxShadow: "0 0 28px rgba(74,196,224,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <Icon size={28} color="#4AC4E0" weight="fill" />
                </div>

                {/* Tier name */}
                <p className="text-xs font-bold tracking-widest text-[#4AC4E0] mb-2 uppercase">{name}</p>

                {/* Replaces */}
                <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                  <p className="text-xs text-emerald-400">
                    <span className="font-bold">Replaces</span> {replaces}
                  </p>
                </div>

                <p className="text-sm text-gray-400 mb-5 leading-relaxed">{tagline}</p>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle
                        size={16}
                        weight="fill"
                        color="#4AC4E0"
                        className="mt-0.5 shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <CVButtonLink
                  href="https://calendly.com/clientverse/strategy-call"
                  target="_blank"
                  rel="noreferrer"
                  variant={badge === "Most Popular" ? "primary" : "secondary"}
                  fullWidth
                  rightIcon={<ArrowRight size={16} weight="bold" />}
                >
                  {name === "ENTERPRISE / FEDERAL" ? "Book a Consultation" : "Get Started"}
                </CVButtonLink>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Add-Ons */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Power Up Any Tier With <span className="text-[#4AC4E0]">Add-Ons</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Layer additional managed services onto any base plan. Every add-on is fully handled — you never touch the execution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {addOns.map(({ name, note }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="cv-card cv-card--feature cv-card--interactive px-6 py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle size={18} weight="fill" color="#4AC4E0" className="shrink-0" />
                  <span className="text-sm font-medium text-white">{name}</span>
                </div>
                <span className="text-xs text-gray-500">{note}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Add-on pricing discussed on your audit call.</p>
          </div>
        </section>

        {/* AI Audit entry point */}
        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-10 md:p-12 flex flex-col md:flex-row items-center gap-8"
          >
            <div
              className="shrink-0 rounded-xl flex items-center justify-center"
              style={{
                width: 72,
                height: 72,
                background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)",
                border: "1px solid rgba(74,196,224,0.4)",
                boxShadow: "0 0 32px rgba(74,196,224,0.22), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <Shield size={36} color="#4AC4E0" weight="fill" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-2">Start Here</p>
              <h3 className="text-2xl font-bold mb-3">
                Start With Your Revenue Audit
              </h3>
              <p className="text-gray-400 mb-0 leading-relaxed">
                Every engagement starts with the <span className="text-white font-medium">C.L.A.R.I.T.Y. Framework™</span> audit. We map your current tools, quantify your revenue leaks, and hand you a 90-day roadmap. Most clients find $2,000–$5,000/mo in waste and missed revenue in the first session.
              </p>
            </div>
            <Button
              asChild
              className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold px-8 h-12 shrink-0"
            >
              <a
                href="https://calendly.com/clientverse/strategy-call"
                target="_blank"
                rel="noreferrer"
              >
                Book Your Revenue Audit
              </a>
            </Button>
          </motion.div>
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 py-20 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not sure which tier fits?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Find out exactly how much revenue you're leaving on the table — then we'll show you the right fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-base px-8 h-13"
              >
                <Link href="/revenue-calculator">Calculate My Revenue Leak</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/40 hover:bg-[#4AC4E0]/5 text-base px-8 h-13"
              >
                <a
                  href="https://calendly.com/clientverse/strategy-call"
                  target="_blank"
                  rel="noreferrer"
                >
                  Book Your Revenue Audit
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

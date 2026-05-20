import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  CheckCircle,
  ArrowRight,
  Lightning,
  Sparkle,
  ChartBar,
  Megaphone,
  Phone,
  Globe,
  Star,
  Shield,
  Buildings,
  CurrencyDollar,
  ChatCircle,
  UsersThree,
  MagnifyingGlass,
  HandCoins,
} from "@phosphor-icons/react";
import { TrustBadgeStrip } from "@/components/cv-ui";

const recurringServices = [
  { name: "Reputation Management", Icon: Star, desc: "Review monitoring and request automation across 50+ platforms. Every client gets it. Flat vendor cost regardless of client count.", tag: "High margin" },
  { name: "Local SEO", Icon: Globe, desc: "Fully managed local search optimization — keyword research, on-page, citations, and monthly reporting. Outsourced, white-labeled.", tag: "Managed" },
  { name: "Google + Meta Ads Management", Icon: Megaphone, desc: "Done-for-you paid ad campaigns across Google and Meta. Strategy, creative, optimization, and monthly reporting — all handled.", tag: "High margin" },
  { name: "Social Media Management", Icon: ChatCircle, desc: "Content creation, scheduling, and posting across platforms. Outsourced to a vetted content partner at flat monthly cost.", tag: "Managed" },
  { name: "Done-For-You Content Creation", Icon: Globe, desc: "Blog posts, landing page copy, and brand content — AI-drafted and human-refined. Delivered white-labeled under your brand.", tag: "Managed" },
  { name: "AI Voice Agent Management", Icon: Phone, desc: "24/7 AI receptionist powered by Retell AI. Includes 1,000 minutes/mo — books appointments, handles FAQs, escalates intelligently. Configured and managed.", tag: "AI-powered" },
  { name: "AI Search Visibility (GEO/AEO)", Icon: MagnifyingGlass, desc: "Optimize your business to appear in ChatGPT, Perplexity, and Gemini answers — not just Google. Includes monthly AI visibility audit, structured data, and schema markup. Emerging category with almost zero local competition.", tag: "Premium" },
  { name: "Call Tracking & Recording", Icon: Phone, desc: "Every inbound call tracked, recorded, and visible in the client dashboard. Shows which ads and channels drive real calls.", tag: "Managed" },
  { name: "Voicemail Drop Campaigns", Icon: Phone, desc: "Pre-recorded voicemails dropped directly to prospect inboxes — phone never rings. VA-managed execution.", tag: "Managed" },
  { name: "Website Maintenance", Icon: Globe, desc: "Ongoing site updates, speed optimization, uptime monitoring, and plugin/security patches. Outsourced via vetted partners.", tag: "Managed" },
  { name: "WhatsApp Business Campaigns", Icon: ChatCircle, desc: "Outbound WhatsApp messaging campaigns — appointment reminders, promotions, and re-engagement. Native platform execution.", tag: "Managed" },
];

const oneTimeServices = [
  { name: "AI Stack Audit (C.L.A.R.I.T.Y. Framework™)", Icon: ChartBar, desc: "7-point evaluation of your entire AI and automation stack. Produces a written report with quantified revenue leaks and a prioritized 90-day roadmap.", highlight: true },
  { name: "AI Implementation", Icon: Lightning, desc: "Full platform build — pipelines, automations, AI agents, and staff walkthrough. Managed via vetted contractors." },
  { name: "AI Audit + Implementation Bundle", Icon: MagnifyingGlass, desc: "Audit and implementation delivered together. Close both in one call." },
  { name: "AI Security Audit", Icon: Shield, desc: "Personal delivery only. Maps exposed data, weak access controls, and staff vulnerabilities. Cybersecurity background is the moat — no competitor can replicate this." },
  { name: "AI Security Setup", Icon: Shield, desc: "Execution of security recommendations — 2FA rollout, data protocol setup, phishing training. Delivered via vetted veteran tech professionals." },
  { name: "Website Build", Icon: Globe, desc: "Full website design and build delivered white-labeled. You maintain the client relationship. Includes landing pages and funnel setup." },
  { name: "Capital Stack Setup", Icon: CurrencyDollar, desc: "Configure 4–5 embedded financial partners (Lendio, Relay, BlueVine, NMI, Stripe Capital) with eligibility monitoring workflows. Zero fulfillment cost." },
  { name: "Client Financing Setup (Wisetack)", Icon: HandCoins, desc: "Help your clients offer 'buy now, pay later' to their own customers — raising close rates and average ticket size. Partner/referral model — zero tech build. Best for HVAC, dental, roofing, med spa, and home services clients.", highlight: false },
  { name: "SAIG-OS™ AI Governance Setup", Icon: Shield, desc: "Documented AI governance framework for nonprofits, healthcare, education, and small businesses. Personal delivery. Zero competition.", highlight: true },
  { name: "Industry Snapshot", Icon: Buildings, desc: "Pre-built account setups for specific industries (HVAC, Dental, Real Estate, Veteran-Owned). Build once. Zero fulfillment after that." },
  { name: "CRM Audit + Cleanup", Icon: MagnifyingGlass, desc: "Full account audit via Claude AI — duplicate contacts, dead pipelines, broken automations, lost leads. Every fix applied. Written report delivered." },
];

const mcpServices = [
  { name: "AI CRM Management", desc: "Weekly AI review of the client's pipeline via Claude AI. Stalled leads flagged, dead contacts cleaned, pipeline stays accurate." },
  { name: "AI Performance Reporting", desc: "Monthly plain-English report showing what's working, what's not, and 3 recommended actions. No dashboards. No spreadsheets. Just answers." },
  { name: "AI Operations Management", desc: "Weekly and monthly AI-powered reviews of the full account — lead scoring, follow-up gaps, no-show rates, campaign performance." },
  { name: "Cross-Channel Intelligence Report", desc: "CRM + Google Ads + Meta Ads analyzed together monthly. Shows which campaigns actually drove closed revenue — not just clicks." },
];

export default function Services() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-20 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Every Service. <span className="text-[#4AC4E0]">Fully Managed.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            You own the client relationship. We own the delivery. Every service runs under your brand — clients never see our vendors.
          </motion.p>
        </section>

        {/* Trust Badges */}
        <section className="container mx-auto px-4 pb-8 max-w-4xl">
          <TrustBadgeStrip
            badges={["crm-automation-ready", "ai-workflow-ready", "lead-capture", "veteran-founded"]}
          />
        </section>

        {/* System Rescue */}
        <section id="system-rescue" className="bg-[#4AC4E0] text-[#0A1628] py-20 my-8">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-start gap-12">
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-bold mb-5">System Rescue™</h2>
                <p className="text-xl font-medium mb-8 opacity-90">
                  Already have a CRM or automation platform that's a mess? We go in, clean it out, and rebuild it right. New clients with existing accounts get this at onboarding. It reveals every gap — and every gap becomes a service.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {["Duplicate contact cleanup", "Dead pipeline removal", "Broken automation repair", "Lost lead recovery", "Data migration", "Staff re-training"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle size={16} weight="fill" />
                      {item}
                    </div>
                  ))}
                </div>
                <Button size="lg" asChild className="bg-[#0A1628] hover:bg-[#132038] text-white font-bold h-13 px-8">
                  <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    Request a System Rescue
                    <ArrowRight size={18} weight="bold" />
                  </a>
                </Button>
              </div>
              <div className="md:w-72 space-y-3">
                {[
                  { label: "Typical cleanup time", value: "48 hours" },
                  { label: "Avg issues found", value: "12–20" },
                  { label: "Upsell conversion rate", value: "~70%" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#0A1628]/15 rounded-xl p-5">
                    <p className="text-2xl font-black">{value}</p>
                    <p className="text-sm opacity-80">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MCP Services — new section */}
        <section className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-full px-4 py-1.5 text-sm text-[#4AC4E0] font-medium mb-5">
              <Sparkle size={14} weight="fill" />
              Claude AI Integration — Only 5% of Agencies Know This Exists
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              AI-Powered Managed Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Claude connects directly to each client's CRM via MCP (Model Context Protocol). No Zapier. No middleware. Claude reads pipelines, flags issues, and writes back — all in plain English. These are services your competitors have never heard of.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mcpServices.map(({ name, desc }) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0D1B2E] border border-[#4AC4E0]/20 hover:border-[#4AC4E0]/40 rounded-2xl p-7 transition-colors duration-300"
              >
                <h3 className="text-lg font-bold mb-3">{name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-[#0D1B2E] border border-[#1E2D4A] rounded-xl px-6 py-4 flex items-center gap-3">
            <Lightning size={20} color="#4AC4E0" weight="duotone" className="shrink-0" />
            <p className="text-sm text-gray-400">
              Setup takes under 15 minutes per client. Claude reads contacts, pipelines, conversations, tags, and custom fields — and writes back. Powered by the official MCP connector.
            </p>
          </div>
        </section>

        {/* New Services Spotlight */}
        <section className="container mx-auto px-4 py-16 max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-full px-4 py-1.5 text-sm text-[#4AC4E0] font-medium mb-4">
              New — Just Added
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Two New Services <span className="text-[#4AC4E0]">Worth Knowing About</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              One raises your clients' close rates. The other puts them in front of AI search engines before any competitor does.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Search Visibility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0D1B2E] border border-[#4AC4E0]/30 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="rounded-xl flex items-center justify-center shrink-0"
                  style={{ width: 56, height: 56, background: "rgba(74,196,224,0.08)", border: "1.5px solid rgba(74,196,224,0.5)", boxShadow: "0 0 16px rgba(74,196,224,0.15)" }}
                >
                  <MagnifyingGlass size={26} color="#4AC4E0" weight="duotone" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">AI Search Visibility</h3>
                    <span className="text-[10px] font-bold text-[#4AC4E0] bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 px-2 py-0.5 rounded-full uppercase tracking-wider">GEO / AEO</span>
                  </div>
                  <p className="text-[#4AC4E0] font-semibold text-sm">Monthly retainer</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Google is no longer the only search engine that matters. ChatGPT, Perplexity, and Gemini are answering questions your clients' customers are asking — and right now, almost no local business shows up. We fix that with structured data, schema markup, and monthly AI visibility audits.
              </p>
              <div className="space-y-2 mb-5">
                {[
                  "Monthly AI visibility report (ChatGPT, Perplexity, Gemini)",
                  "Structured data + schema markup implementation",
                  "Sell the audit first — tools engaged after client pays",
                  "Near-zero local competition — genuine first-mover advantage",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2 text-xs text-gray-300">
                    <CheckCircle size={13} weight="duotone" color="#4AC4E0" className="mt-0.5 shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
              <Button asChild size="sm" className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold w-full flex items-center gap-1.5">
                <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                  Get an AI Visibility Audit <ArrowRight size={14} weight="bold" />
                </a>
              </Button>
            </motion.div>

            {/* Wisetack Client Financing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="bg-[#0D1B2E] border border-[#4AC4E0]/30 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="rounded-xl flex items-center justify-center shrink-0"
                  style={{ width: 56, height: 56, background: "rgba(74,196,224,0.08)", border: "1.5px solid rgba(74,196,224,0.5)", boxShadow: "0 0 16px rgba(74,196,224,0.15)" }}
                >
                  <HandCoins size={26} color="#4AC4E0" weight="duotone" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">Client Financing Setup</h3>
                    <span className="text-[10px] font-bold text-[#4AC4E0] bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 px-2 py-0.5 rounded-full uppercase tracking-wider">Wisetack</span>
                  </div>
                  <p className="text-[#4AC4E0] font-semibold text-sm">One-time setup</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Help your clients offer "buy now, pay later" to their own customers. When a $4,000 HVAC job becomes 12 payments of $350, more customers say yes — and your client closes bigger tickets without doing anything differently. Partner model — no software to build, no cash to carry.
              </p>
              <div className="space-y-2 mb-5">
                {[
                  "Best for HVAC, dental, roofing, med spa, home services",
                  "Partner/referral model — zero upfront cost to ClientVerse",
                  "Raises client close rates and average ticket size immediately",
                  "No financing infrastructure to build — Wisetack handles everything",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2 text-xs text-gray-300">
                    <CheckCircle size={13} weight="duotone" color="#4AC4E0" className="mt-0.5 shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
              <Button asChild size="sm" className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold w-full flex items-center gap-1.5">
                <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                  Add Financing to My Client Stack <ArrowRight size={14} weight="bold" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Monthly Recurring */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Monthly <span className="text-[#4AC4E0]">Recurring Add-Ons</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Layer onto any base tier. Every service is managed — you never touch the execution.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {recurringServices.map(({ name, Icon, desc, tag }) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#0A1628] border border-[#1E2D4A] hover:border-[#4AC4E0]/30 rounded-2xl p-7 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        width: 52,
                        height: 52,
                        background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)",
                        border: "1px solid rgba(74,196,224,0.4)",
                        boxShadow: "0 0 20px rgba(74,196,224,0.16), inset 0 1px 0 rgba(255,255,255,0.04)",
                      }}
                    >
                      <Icon size={24} color="#4AC4E0" weight="fill" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="font-bold text-base">{name}</h3>
                        <span className="text-xs text-gray-500 shrink-0 mt-0.5">{tag}</span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* One-Time Services */}
        <section className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              One-Time <span className="text-[#4AC4E0]">Services</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Engagements that close fast and convert to recurring platform clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {oneTimeServices.map(({ name, Icon, desc, highlight }) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`bg-[#0D1B2E] rounded-2xl p-7 border transition-colors duration-300 ${
                  highlight ? "border-[#4AC4E0]/40 ring-1 ring-[#4AC4E0]/10" : "border-[#1E2D4A] hover:border-[#4AC4E0]/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      width: 52,
                      height: 52,
                      background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)",
                      border: "1px solid rgba(74,196,224,0.4)",
                      boxShadow: "0 0 20px rgba(74,196,224,0.16), inset 0 1px 0 rgba(255,255,255,0.04)",
                    }}
                  >
                    <Icon size={24} color="#4AC4E0" weight="fill" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">{name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SAIG-OS callout */}
        <section className="container mx-auto px-4 pb-16 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D1B2E] border border-[#4AC4E0]/30 rounded-2xl p-10 md:p-12 flex flex-col md:flex-row items-center gap-8"
          >
            <div
              className="shrink-0 rounded-xl flex items-center justify-center"
              style={{ width: 72, height: 72, background: "rgba(74,196,224,0.08)", border: "1.5px solid rgba(74,196,224,0.5)", boxShadow: "0 0 20px rgba(74,196,224,0.15)" }}
            >
              <Shield size={36} color="#4AC4E0" weight="duotone" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-2">Proprietary Product</p>
              <h3 className="text-2xl font-bold mb-3">SAIG-OS™ AI Governance — For Nonprofits, Healthcare & Education</h3>
              <p className="text-gray-400 leading-relaxed">
                The only AI governance framework built specifically for organizations that can't afford to get compliance wrong. Personal delivery. Zero competition. No outsourcing.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Button asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold px-7 h-11">
                <Link href="/saig-os">Learn More <ArrowRight size={16} weight="bold" className="inline ml-1" /></Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 py-20 text-center border-t border-[#1E2D4A]">
          <h2 className="text-3xl font-bold mb-4">Not sure which services you need?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Book a C.L.A.R.I.T.Y. Audit. In 30 minutes we'll map every gap in your stack and tell you exactly what to build first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-base px-8 h-13">
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Book a C.L.A.R.I.T.Y. Audit
              </a>
            </Button>
            <Button size="lg" asChild variant="outline" className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/30 h-13 px-8">
              <Link href="/clarity">Learn About the Framework</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

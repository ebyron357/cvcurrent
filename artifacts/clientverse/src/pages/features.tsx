import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Brain,
  Robot,
  ChatCircle,
  Phone,
  Star,
  Globe,
  Megaphone,
  CurrencyDollar,
  Shield,
  UsersThree,
  Database,
  Lightning,
  CheckCircle,
  ArrowRight,
  Buildings,
} from "@phosphor-icons/react";

const platformFeatures = [
  {
    Icon: Robot,
    title: "AI Lead Response & Follow-Up",
    desc: "The moment a lead comes in, AI responds. It follows up automatically until they book or opt out — no manual chasing.",
    bullets: ["Missed call text-back under 60 seconds", "Multi-channel AI follow-up (SMS, email, voicemail)", "AI Decision Maker routes each lead to the right workflow", "Never loses a lead to slow response time"],
  },
  {
    Icon: ChatCircle,
    title: "AI Chatbot & Voice Agent",
    desc: "24/7 AI receptionist that handles inbound questions, books appointments, and escalates to a human when needed.",
    bullets: ["Trained on client-specific business knowledge", "Books directly into the calendar", "Escalation logic for complex queries", "Works on website, SMS, and WhatsApp"],
  },
  {
    Icon: Phone,
    title: "Call Tracking & Recording",
    desc: "Every inbound call tracked to its source — which ad, which keyword, which channel drove the call. All recorded and searchable.",
    bullets: ["Attribution to specific ad campaigns", "Call recording accessible in the dashboard", "Missed call alerts and instant follow-up", "Local and toll-free numbers included"],
  },
  {
    Icon: Star,
    title: "Reputation Management",
    desc: "Automated review requests go out after every appointment. Negative reviews get flagged before they post. 50+ platforms monitored.",
    bullets: ["Post-appointment review request sequence", "Google and Facebook review monitoring", "Automated response templates", "50+ platform coverage"],
  },
  {
    Icon: Globe,
    title: "Listings & Local SEO",
    desc: "Business listed and synced across 100+ directories. Name, address, and phone number consistent everywhere that matters.",
    bullets: ["100+ directory listings managed", "NAP consistency enforced automatically", "Local pack visibility improvement", "Monthly reporting included"],
  },
  {
    Icon: Megaphone,
    title: "Google + Meta Ads Management",
    desc: "Full-service paid advertising — strategy, creative, optimization, and reporting — handled end to end under your brand.",
    bullets: ["Campaign setup and management", "Ad creative and copywriting", "Weekly bid and budget optimization", "Monthly performance reporting"],
  },
  {
    Icon: CurrencyDollar,
    title: "Embedded Funding Access",
    desc: "Clients access business funding directly inside their ClientVerse dashboard — without leaving the platform. Powered by Lendio, Relay, and BlueVine.",
    bullets: ["Business loans up to $5M (Lendio)", "Free business banking (Relay)", "Lines of credit (BlueVine)", "Proactive eligibility monitoring"],
  },
  {
    Icon: UsersThree,
    title: "Lead Intelligence",
    desc: "Pull any local business into a pipeline from a map in seconds. Replaces Apollo and ZoomInfo at a fraction of the cost.",
    bullets: ["Map-based local business import", "One click to add as a lead", "Custom field data capture", "Included in Commander tier"],
  },
  {
    Icon: Database,
    title: "Pipelines & CRM",
    desc: "Every contact, every deal, every conversation — organized in one place with full automation between stages.",
    bullets: ["Multi-stage pipeline builder", "Automated stage movement on triggers", "Smart contact segmentation", "Historical data migration included"],
  },
  {
    Icon: Lightning,
    title: "Workflow Automation",
    desc: "Complex multi-step automation without a developer. Triggers, conditions, and actions built once and run forever.",
    bullets: ["Visual drag-and-drop workflow builder", "AI Decision Maker in workflow branches", "Zapier-level logic at zero per-task cost", "Pre-built templates for common use cases"],
  },
  {
    Icon: Brain,
    title: "Claude + GHL MCP Integration",
    desc: "Claude AI connects directly to each client's account via the official GHL MCP server — no middleware needed. Plain-English AI operations.",
    bullets: ["39 official GHL tools accessible by Claude", "Read and write contacts, pipelines, tags", "AI-powered weekly CRM reviews", "Monthly performance analysis in plain English"],
    highlight: true,
  },
  {
    Icon: Shield,
    title: "SOC 2 Type II Infrastructure",
    desc: "ClientVerse runs on GoHighLevel's SOC 2 Type II certified infrastructure — the same compliance tier as enterprise software.",
    bullets: ["SOC 2 Type II certified platform", "HIPAA-eligible data handling", "Unlocks enterprise and government contracts", "AI Security Audit available as add-on"],
  },
];

const comparison = [
  { feature: "All-in-one platform", cv: true, reseller: false, agency: false, diy: false },
  { feature: "AI-native (Claude MCP)", cv: true, reseller: false, agency: false, diy: false },
  { feature: "Fully managed delivery", cv: true, reseller: false, agency: true, diy: false },
  { feature: "7-day go-live", cv: true, reseller: false, agency: false, diy: false },
  { feature: "Proprietary audit methodology", cv: true, reseller: false, agency: false, diy: false },
  { feature: "Embedded business funding", cv: true, reseller: false, agency: false, diy: false },
  { feature: "Veteran-owned / Federal eligible", cv: true, reseller: false, agency: false, diy: false },
  { feature: "AI Security Audit", cv: true, reseller: false, agency: false, diy: false },
  { feature: "Under $1,000/mo for full stack", cv: true, reseller: true, agency: false, diy: true },
];

export default function Features() {
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
            What the Platform <span className="text-[#4AC4E0]">Actually Does</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Every feature below is live, managed, and operational in 7 days. This is not a list of things you can configure — it's a list of things we configure for you.
          </motion.p>
        </section>

        {/* Feature grid */}
        <section className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {platformFeatures.map(({ Icon, title, desc, bullets, highlight }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`relative bg-[#0D1B2E] rounded-2xl p-7 flex flex-col border transition-colors duration-300 ${
                  highlight
                    ? "border-[#4AC4E0]/40 ring-1 ring-[#4AC4E0]/10"
                    : "border-[#1E2D4A] hover:border-[#4AC4E0]/30"
                }`}
                style={{ isolation: "isolate" }}
              >
                {highlight && (
                  <div className="absolute -top-3 left-6 bg-[#4AC4E0] text-[#0A1628] text-xs font-bold px-3 py-0.5 rounded-full">
                    Early-Mover Advantage
                  </div>
                )}
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
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{desc}</p>
                <ul className="space-y-2 mt-auto">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle size={13} weight="duotone" color="#4AC4E0" className="mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ClientVerse vs. <span className="text-[#4AC4E0]">Everything Else</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Other options exist. None of them do what we do — and none of them do it for less than what we charge.
            </p>
          </div>
          <div className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-5 text-center text-xs font-bold uppercase tracking-wider border-b border-[#1E2D4A]">
              <div className="col-span-1 p-4 text-left text-gray-400">Feature</div>
              <div className="p-4 text-[#4AC4E0]">ClientVerse</div>
              <div className="p-4 text-gray-400">GHL Reseller</div>
              <div className="p-4 text-gray-400">Agency</div>
              <div className="p-4 text-gray-400">DIY GHL</div>
            </div>
            {comparison.map(({ feature, cv, reseller, agency, diy }, i) => (
              <div
                key={i}
                className={`grid grid-cols-5 text-center text-sm ${i % 2 === 0 ? "bg-[#0A1628]/40" : ""} border-b border-[#1E2D4A]/50 last:border-0`}
              >
                <div className="col-span-1 p-4 text-left text-gray-300 text-xs">{feature}</div>
                {[cv, reseller, agency, diy].map((val, j) => (
                  <div key={j} className="p-4 flex items-center justify-center">
                    {val
                      ? <CheckCircle size={18} weight="fill" color="#4AC4E0" />
                      : <span className="text-gray-600 text-lg">—</span>
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* MCP deep-dive */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col md:flex-row items-start gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-full px-4 py-1.5 text-sm text-[#4AC4E0] font-medium mb-5">
                  <Brain size={14} weight="fill" />
                  The Feature 95% of Agencies Don't Know Exists
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-5">
                  Claude + GHL MCP: <br />
                  <span className="text-[#4AC4E0]">AI That Runs Your CRM</span>
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  GoHighLevel launched an official MCP server in late 2025. Claude now connects directly to any GHL account — reading contacts, pipelines, conversations, and calendars — and writing back to them in plain English. No Zapier. No Make. No middleware.
                </p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  This is the technology behind ClientVerse's AI CRM Management, AI Operations Management, and Cross-Channel Intelligence services. It turns every client account into a living, AI-reviewed system that gets cleaner and more accurate every week.
                </p>
                <Button asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-12 px-7 flex items-center gap-2 w-fit">
                  <Link href="/services">
                    See the MCP Services <ArrowRight size={16} weight="bold" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-80 space-y-4">
                {[
                  { label: "Setup time per client", value: "~15 minutes" },
                  { label: "Official GHL tools available", value: "39" },
                  { label: "Community-extended tools", value: "269+" },
                  { label: "Token rotation cadence", value: "Every 90 days" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#0A1628] border border-[#1E2D4A] rounded-xl px-5 py-4 flex justify-between items-center">
                    <span className="text-sm text-gray-400">{label}</span>
                    <span className="font-bold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SAIG-OS + CLARITY callouts */}
        <section className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0D1B2E] border border-[#4AC4E0]/20 rounded-2xl p-8"
            >
              <div className="mb-4" style={{ width: 52, height: 52, background: "rgba(74,196,224,0.08)", border: "1.5px solid rgba(74,196,224,0.5)", boxShadow: "0 0 16px rgba(74,196,224,0.12)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shield size={26} color="#4AC4E0" weight="duotone" />
              </div>
              <p className="text-xs text-[#4AC4E0] font-bold uppercase tracking-widest mb-2">Proprietary Product</p>
              <h3 className="text-xl font-bold mb-3">SAIG-OS™ AI Governance</h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">A documented AI governance framework for nonprofits, healthcare, education, and federal contractors. Zero competition. Personal delivery. $1,500–$15,000/yr.</p>
              <Button asChild variant="outline" className="border-[#4AC4E0]/30 text-[#4AC4E0] hover:bg-[#4AC4E0]/10 h-10">
                <Link href="/saig-os">Learn More <ArrowRight size={14} weight="bold" className="inline ml-1" /></Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#0D1B2E] border border-[#4AC4E0]/20 rounded-2xl p-8"
            >
              <div className="mb-4" style={{ width: 52, height: 52, background: "rgba(74,196,224,0.08)", border: "1.5px solid rgba(74,196,224,0.5)", boxShadow: "0 0 16px rgba(74,196,224,0.12)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Buildings size={26} color="#4AC4E0" weight="duotone" />
              </div>
              <p className="text-xs text-[#4AC4E0] font-bold uppercase tracking-widest mb-2">Audit Methodology</p>
              <h3 className="text-xl font-bold mb-3">C.L.A.R.I.T.Y. Framework™</h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">A 7-point AI stack evaluation system that maps every gap to a specific fix — with ROI projections attached to every recommendation. Proprietary. Trademarked.</p>
              <Button asChild variant="outline" className="border-[#4AC4E0]/30 text-[#4AC4E0] hover:bg-[#4AC4E0]/10 h-10">
                <Link href="/clarity">See the Framework <ArrowRight size={14} weight="bold" className="inline ml-1" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16 text-center border-t border-[#1E2D4A] max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">See it all live in your account.</h2>
          <p className="text-gray-400 mb-8">
            Every feature above is live in your GHL dashboard within 7 days. Book a Revenue Audit and we'll map exactly which features stop your biggest revenue leaks first.
          </p>
          <Button size="lg" asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-base px-10 h-13">
            <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
              Book Your Revenue Audit
            </a>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

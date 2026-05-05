import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  Buildings,
  Heart,
  GraduationCap,
  Storefront,
  Lock,
  FileText,
  UsersThree,
  Warning,
  Star,
} from "@phosphor-icons/react";

const tiers = [
  {
    name: "Foundation",
    price: "$1,500–$3,000",
    cadence: "one-time",
    description: "Documented AI governance baseline for organizations deploying AI for the first time.",
    includes: [
      "AI inventory & usage documentation",
      "Risk classification for each AI tool",
      "Staff responsibilities matrix",
      "Basic data handling policy",
      "Written governance framework document",
    ],
  },
  {
    name: "Standard",
    price: "$3,500–$7,500",
    cadence: "per year",
    badge: "Most Common",
    description: "Ongoing governance oversight with quarterly reviews and policy updates as your AI stack evolves.",
    includes: [
      "Everything in Foundation",
      "Quarterly AI stack review",
      "Policy update cycle",
      "Incident response protocol",
      "Staff training documentation",
      "Compliance readiness checklist",
      "Annual governance report",
    ],
  },
  {
    name: "Oversight",
    price: "$7,500–$15,000",
    cadence: "per year",
    description: "Full-scope governance for regulated industries — healthcare, education, and federal contractors.",
    includes: [
      "Everything in Standard",
      "Monthly governance reviews",
      "Regulatory mapping (HIPAA, FERPA, CMMC)",
      "Third-party AI vendor vetting",
      "Board/leadership briefing documents",
      "Custom policy drafting",
      "Ongoing advisory access",
    ],
  },
];

const audiences = [
  {
    Icon: Heart,
    label: "Healthcare",
    body: "Patient data, AI diagnostic tools, and staff-facing automation all require documented oversight. SAIG-OS provides the written framework that protects your organization.",
  },
  {
    Icon: GraduationCap,
    label: "Education",
    body: "FERPA compliance, AI tutoring tools, and student data governance. Schools adopting AI need documentation before regulators catch up.",
  },
  {
    Icon: Buildings,
    label: "Nonprofits",
    body: "Funders and boards increasingly require documented AI policies. SAIG-OS gives your organization the written framework to show responsible use.",
  },
  {
    Icon: Storefront,
    label: "Small Business",
    body: "Any business using AI tools for customer communication, lead management, or operations needs a governance baseline before litigation risk arrives.",
  },
];

const framework = [
  { letter: "S", word: "Scope", desc: "Map every AI tool in use across your organization." },
  { letter: "A", word: "Assess", desc: "Classify risk level for each tool and use case." },
  { letter: "I", word: "Implement", desc: "Define policies, responsibilities, and data handling rules." },
  { letter: "G", word: "Govern", desc: "Establish oversight structure and review cadence." },
  { letter: "O", word: "Operate", desc: "Train staff and integrate governance into daily operations." },
  { letter: "S", word: "Secure", desc: "Address security gaps and document incident response." },
];

export default function SaigOs() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-20 max-w-5xl">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-full px-4 py-1.5 text-sm text-[#4AC4E0] font-medium mb-6"
              >
                <Shield size={14} weight="fill" />
                Proprietary Product — Personal Delivery Only
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
              >
                SAIG-OS™ <br />
                <span className="text-[#4AC4E0]">AI Governance Setup</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400 mb-8 leading-relaxed"
              >
                Your organization is using AI. That means you have liability. SAIG-OS is a documented AI governance framework that maps your AI stack, classifies your risk, and gives you written policies your team, your board, and your regulators can actually read.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-13 px-8 flex items-center gap-2"
                >
                  <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                    Book a Governance Consultation
                    <ArrowRight size={18} weight="bold" />
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Stat block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="md:w-80 space-y-4 shrink-0"
            >
              {[
                { label: "Zero competition", desc: "No other local operator can deliver this — cybersecurity background is the moat" },
                { label: "Zero outsourcing", desc: "Delivered personally. Every document has your name on it." },
                { label: "$0 cost to deliver", desc: "Your time and expertise — no vendor cost. Pure margin." },
              ].map(({ label, desc }) => (
                <div key={label} className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <Star size={18} weight="fill" color="#4AC4E0" className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-white text-sm mb-1">{label}</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Organizations Need This <span className="text-[#4AC4E0]">Now</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                AI regulation is arriving. The organizations that have documented governance today will not scramble when compliance requirements hit their industry.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  Icon: Warning,
                  title: "Legal Liability Is Already Here",
                  body: "If your AI tool makes a decision that harms a client, customer, or employee — and you have no documented policy — you have no defense.",
                },
                {
                  Icon: FileText,
                  title: "Funders & Boards Are Asking",
                  body: "Grant funders, nonprofit boards, and investors are now requesting AI governance documentation before approving funding.",
                },
                {
                  Icon: Lock,
                  title: "Data Regulations Are Expanding",
                  body: "HIPAA, FERPA, GDPR, and emerging state AI laws all touch how you store, process, and act on data through AI systems.",
                },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="bg-[#0A1628] border border-[#1E2D4A] rounded-2xl p-8">
                  <div
                    className="mb-5 rounded-xl flex items-center justify-center"
                    style={{
                      width: 56,
                      height: 56,
                      background: "rgba(74,196,224,0.08)",
                      border: "1.5px solid rgba(74,196,224,0.5)",
                      boxShadow: "0 0 16px rgba(74,196,224,0.12)",
                    }}
                  >
                    <Icon size={28} color="#4AC4E0" weight="duotone" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SAIG-OS Framework */}
        <section className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="text-[#4AC4E0]">SAIG-OS™</span> Framework
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A structured 6-phase methodology for building AI governance from the ground up — documented, defensible, and maintained over time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {framework.map(({ letter, word, desc }, i) => (
              <motion.div
                key={letter + i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#0D1B2E] border border-[#1E2D4A] hover:border-[#4AC4E0]/30 rounded-2xl p-7 flex items-start gap-5 transition-colors duration-300"
              >
                <div
                  className="rounded-xl flex items-center justify-center shrink-0 text-2xl font-black text-[#4AC4E0]"
                  style={{
                    width: 52,
                    height: 52,
                    background: "rgba(74,196,224,0.08)",
                    border: "1.5px solid rgba(74,196,224,0.5)",
                  }}
                >
                  {letter}
                </div>
                <div>
                  <p className="font-bold text-white mb-1">{word}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Who <span className="text-[#4AC4E0]">SAIG-OS</span> Is Built For
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {audiences.map(({ Icon, label, body }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#0A1628] border border-[#1E2D4A] hover:border-[#4AC4E0]/30 rounded-2xl p-8 flex items-start gap-5 transition-colors duration-300"
                >
                  <div
                    className="rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      width: 52,
                      height: 52,
                      background: "rgba(74,196,224,0.08)",
                      border: "1.5px solid rgba(74,196,224,0.5)",
                      boxShadow: "0 0 16px rgba(74,196,224,0.12)",
                    }}
                  >
                    <Icon size={26} color="#4AC4E0" weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{label}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SAIG-OS <span className="text-[#4AC4E0]">Pricing</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              No vendor cost. No outsourcing. Delivered personally using a proprietary framework no competitor can replicate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map(({ name, price, cadence, badge, description, includes }) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative bg-[#0D1B2E] rounded-2xl p-8 flex flex-col border transition-colors duration-300 ${
                  badge ? "border-[#4AC4E0] ring-1 ring-[#4AC4E0]/30" : "border-[#1E2D4A] hover:border-[#4AC4E0]/30"
                }`}
              >
                {badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4AC4E0] text-[#0A1628] text-xs font-bold px-4 py-1 rounded-full">
                    {badge}
                  </div>
                )}
                <p className="text-xs font-bold tracking-widest text-[#4AC4E0] uppercase mb-2">{name}</p>
                <div className="mb-1">
                  <span className="text-3xl font-bold">{price}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">{cadence}</p>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{description}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle size={16} weight="duotone" color="#4AC4E0" className="mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full font-semibold ${
                    badge
                      ? "bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628]"
                      : "bg-[#1E2D4A] hover:bg-[#4AC4E0]/20 text-white border border-[#1E2D4A] hover:border-[#4AC4E0]/40"
                  }`}
                >
                  <a
                    href="https://calendly.com/clientverse/strategy-call"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Get Started <ArrowRight size={16} weight="bold" />
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SDVOSB angle */}
        <section className="container mx-auto px-4 pb-20 max-w-5xl">
          <div className="bg-[#0D1B2E] border border-[#4AC4E0]/20 rounded-2xl p-10 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div
              className="shrink-0 rounded-xl flex items-center justify-center"
              style={{
                width: 72,
                height: 72,
                background: "rgba(74,196,224,0.08)",
                border: "1.5px solid rgba(74,196,224,0.5)",
                boxShadow: "0 0 20px rgba(74,196,224,0.15)",
              }}
            >
              <UsersThree size={36} color="#4AC4E0" weight="duotone" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-2">Federal & SDVOSB Eligible</p>
              <h3 className="text-2xl font-bold mb-3">SAIG-OS for Government Contractors</h3>
              <p className="text-gray-400 leading-relaxed">
                As a Service-Disabled Veteran-Owned Small Business, ClientVerse can deliver SAIG-OS as part of CMMC and federal AI compliance readiness engagements. Government agencies can procure through the GSA Schedule once registered — no full procurement process required. NAICS codes: 541511, 541519, 541613.
              </p>
            </div>
            <Button
              asChild
              className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold px-8 h-12 shrink-0"
            >
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Schedule a Call
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

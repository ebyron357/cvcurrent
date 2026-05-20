import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowsInSimple,
  Drop,
  Robot,
  CurrencyDollar,
  LinkSimple,
  ShieldCheck,
  TrendUp,
  CheckCircle,
  Clock,
} from "@phosphor-icons/react";

const framework = [
  {
    letter: "C",
    word: "Consolidate",
    Icon: ArrowsInSimple,
    what: "Which AI tools overlap or duplicate each other — money being wasted on redundant software.",
    deliver: "A clear list of tools to cut immediately — with the estimated monthly savings from cutting each one.",
    example: "Typical finding: 3–5 tools doing the same job. Average savings: $200–600/mo in redundant subscriptions.",
  },
  {
    letter: "L",
    word: "Leak",
    Icon: Drop,
    what: "Which manual processes are bleeding hours that AI could handle — the hidden labor cost no one tracks.",
    deliver: "Quantified time and revenue loss per week, translated to an annual dollar figure.",
    example: "Typical finding: 8–15 hours/week in manual tasks. At $50/hr loaded cost = $20,000–$39,000/yr in labor waste.",
  },
  {
    letter: "A",
    word: "Automate",
    Icon: Robot,
    what: "What to fix first for maximum ROI — the highest-leverage automation opportunities ranked by impact.",
    deliver: "A prioritized 90-day automation roadmap with estimated time savings per item.",
    example: "Typical finding: Missed call text-back alone recovers 30–40% of lost leads within 30 days.",
  },
  {
    letter: "R",
    word: "Revenue",
    Icon: CurrencyDollar,
    what: "Where AI directly impacts close rate, lead response time, and follow-up consistency.",
    deliver: "Revenue recovery estimate based on their specific numbers — calculated from the Revenue Leak Analysis.",
    example: "Typical finding: $40,000–$120,000/yr in recoverable revenue from faster lead response alone.",
  },
  {
    letter: "I",
    word: "Integrate",
    Icon: LinkSimple,
    what: "What systems should connect to each other — the broken handoffs costing leads and causing data errors.",
    deliver: "Integration map showing exactly what connects to what — and what to build first.",
    example: "Typical finding: 4–7 disconnected tools creating manual data entry between systems.",
  },
  {
    letter: "T",
    word: "Trust",
    Icon: ShieldCheck,
    what: "Security gaps in their AI stack — exposed data, weak access controls, staff vulnerabilities.",
    deliver: "Written risk report with prioritized fixes, mapped to actual regulatory exposure.",
    example: "Typical finding: Shared login credentials, no 2FA on CRM, unencrypted client data in spreadsheets.",
  },
  {
    letter: "Y",
    word: "Yield",
    Icon: TrendUp,
    what: "The projected ROI of each recommended fix — what they get back for every dollar invested.",
    deliver: "ROI projection used to justify every recommendation — closes the engagement by showing the math.",
    example: "Typical finding: Every $1 spent on ClientVerse returns $3–$8 in recovered revenue and saved costs.",
  },
];

export default function Clarity() {
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
            <ShieldCheck size={14} weight="fill" />
            Proprietary Audit Methodology
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            The C.L.A.R.I.T.Y. <br />
            <span className="text-[#4AC4E0]">Framework™</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
          >
            A 7-point AI stack evaluation system that maps every gap in your business to a specific, executable fix — with an ROI projection attached to every recommendation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-13 px-8 flex items-center gap-2"
            >
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Book a C.L.A.R.I.T.Y. Audit
                <ArrowRight size={18} weight="bold" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/40 hover:bg-[#4AC4E0]/5 h-13 px-8"
            >
              <Link href="/revenue-calculator">
                Calculate My Revenue Leak First
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* What it delivers */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { Icon: Clock, value: "30–60 min", label: "Delivery time per audit" },
                { Icon: CurrencyDollar, value: "$497–$997", label: "Audit investment" },
                { Icon: TrendUp, value: "$2K–$5K/mo", label: "Avg waste found per client" },
              ].map(({ Icon, value, label }) => (
                <div key={label} className="py-6">
                  <Icon size={28} color="#4AC4E0" weight="duotone" className="mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white mb-1">{value}</p>
                  <p className="text-gray-400 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The 7 points */}
        <section className="container mx-auto px-4 py-20 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The 7-Point <span className="text-[#4AC4E0]">Evaluation</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Every audit covers all 7 dimensions. Every dimension produces a written finding and a prioritized action.
            </p>
          </div>

          <div className="space-y-6">
            {framework.map(({ letter, word, Icon, what, deliver, example }, i) => (
              <motion.div
                key={letter + i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#0D1B2E] border border-[#1E2D4A] hover:border-[#4AC4E0]/30 rounded-2xl p-8 transition-colors duration-300"
              >
                <div className="flex items-start gap-6">
                  {/* Letter */}
                  <div
                    className="shrink-0 rounded-xl flex items-center justify-center text-3xl font-black text-[#4AC4E0]"
                    style={{
                      width: 64,
                      height: 64,
                      background: "rgba(74,196,224,0.08)",
                      border: "1.5px solid rgba(74,196,224,0.5)",
                      boxShadow: "0 0 16px rgba(74,196,224,0.12)",
                    }}
                  >
                    {letter}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon size={20} color="#4AC4E0" weight="duotone" />
                      <h3 className="text-xl font-bold">{word}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <p className="text-xs text-[#4AC4E0] font-bold uppercase tracking-wider mb-1.5">What We Evaluate</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{what}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4AC4E0] font-bold uppercase tracking-wider mb-1.5">What You Receive</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{deliver}</p>
                      </div>
                      <div className="bg-[#0A1628] border border-[#1E2D4A] rounded-xl p-4">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1.5">Typical Finding</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{example}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How it's used */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How the Audit <span className="text-[#4AC4E0]">Works</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Discovery Call", body: "A VA conducts a 30-minute discovery session using a standardized questionnaire. You review the completed answers." },
                { step: "02", title: "Framework Analysis", body: "Your team runs the C.L.A.R.I.T.Y. evaluation against the discovery data and produces written findings for all 7 dimensions." },
                { step: "03", title: "Deliverable Review", body: "You review the audit document, add your strategic recommendations, and sign off. Delivered within 48 hours." },
                { step: "04", title: "Findings Presentation", body: "The audit is presented to the client with the 90-day roadmap and ROI projections — the close for platform services." },
              ].map(({ step, title, body }) => (
                <div key={step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#4AC4E0] font-black text-sm">{step}</span>
                  </div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to see what's actually broken?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Most clients find $2,000–$5,000/mo in waste and missed revenue in their first C.L.A.R.I.T.Y. audit. The audit pays for itself before the call ends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold px-8 h-13 flex items-center gap-2"
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
                className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/40 hover:bg-[#4AC4E0]/5 px-8 h-13"
              >
                <Link href="/pricing">View Platform Pricing</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
              {["30-min delivery", "48-hr document turnaround", "Audit + Implementation bundle available"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <CheckCircle size={14} weight="fill" color="#4AC4E0" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

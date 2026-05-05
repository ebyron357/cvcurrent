import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import {
  CurrencyDollar,
  ArrowRight,
  CheckCircle,
  TrendUp,
  Minus,
  Plus,
} from "@phosphor-icons/react";

type Tier = "command" | "operator" | "commander";

const tools = [
  { id: "crm", label: "CRM (HubSpot, Salesforce, Pipedrive, etc.)", typical: 150 },
  { id: "scheduling", label: "Scheduling tool (Calendly Pro, Acuity, etc.)", typical: 40 },
  { id: "proposals", label: "Proposals & e-sign (PandaDoc, DocuSign, etc.)", typical: 65 },
  { id: "followup", label: "Email/SMS follow-up (ActiveCampaign, Klaviyo, etc.)", typical: 80 },
  { id: "reputation", label: "Reputation management (Birdeye, Podium, etc.)", typical: 300 },
  { id: "calltracking", label: "Call tracking (CallRail, etc.)", typical: 95 },
  { id: "listings", label: "Listings management (Yext, etc.)", typical: 200 },
  { id: "chatbot", label: "AI chatbot (Intercom, Drift, etc.)", typical: 150 },
  { id: "seo", label: "SEO service (agency retainer)", typical: 1200 },
  { id: "ads", label: "Ads management (agency retainer)", typical: 1500 },
  { id: "social", label: "Social media management (agency)", typical: 500 },
  { id: "content", label: "Content creation (agency)", typical: 600 },
];

const tierData = {
  command: { name: "COMMAND", price: 297, setup: 497, replaces: ["crm", "scheduling", "proposals", "followup"] },
  operator: { name: "OPERATOR", price: 497, setup: 997, replaces: ["crm", "scheduling", "proposals", "followup", "reputation", "calltracking", "listings", "chatbot"] },
  commander: { name: "COMMANDER", price: 997, setup: 1497, replaces: ["crm", "scheduling", "proposals", "followup", "reputation", "calltracking", "listings", "chatbot", "seo", "ads", "social", "content"] },
};

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export default function RoiCalculator() {
  const [spend, setSpend] = useState<Record<string, number>>(
    Object.fromEntries(tools.map((t) => [t.id, t.typical]))
  );
  const [selectedTier, setSelectedTier] = useState<Tier>("operator");

  const totalCurrentSpend = Object.values(spend).reduce((a, b) => a + b, 0);
  const tier = tierData[selectedTier];
  const clientverseCost = tier.price;
  const monthlySavings = totalCurrentSpend - clientverseCost;
  const annualSavings = monthlySavings * 12;
  const setupBreakeven = Math.ceil(tier.setup / Math.max(monthlySavings, 1));

  const updateSpend = (id: string, delta: number) => {
    setSpend((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        {/* Header */}
        <section className="container mx-auto px-4 pt-12 pb-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-full px-4 py-1.5 text-sm text-[#4AC4E0] font-medium mb-6"
          >
            <CurrencyDollar size={14} weight="fill" />
            ROI Calculator
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            See Exactly What You Save <br />
            <span className="text-[#4AC4E0]">By Switching to ClientVerse</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Enter what you're currently paying for each tool. We'll show you your exact monthly and annual savings.
          </motion.p>
        </section>

        <section className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tool inputs */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-6 md:p-8">
                <h2 className="text-lg font-bold mb-1">What Are You Currently Paying?</h2>
                <p className="text-gray-400 text-sm mb-6">Adjust to match your actual monthly spend. We've pre-filled typical market rates.</p>

                <div className="space-y-3">
                  {tools.map(({ id, label }) => (
                    <div
                      key={id}
                      className={`flex items-center justify-between gap-4 p-4 rounded-xl border transition-colors duration-200 ${
                        tier.replaces.includes(id)
                          ? "border-emerald-500/30 bg-emerald-950/10"
                          : "border-[#1E2D4A] bg-[#0A1628]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        {tier.replaces.includes(id) && (
                          <CheckCircle size={16} weight="duotone" color="#4ade80" className="shrink-0" />
                        )}
                        <span className={`text-sm ${tier.replaces.includes(id) ? "text-white" : "text-gray-400"} truncate`}>
                          {label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => updateSpend(id, -25)}
                          className="w-7 h-7 rounded-lg bg-[#1E2D4A] hover:bg-[#4AC4E0]/20 flex items-center justify-center transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-16 text-center font-mono font-bold text-sm text-white">
                          {formatCurrency(spend[id] || 0)}
                        </span>
                        <button
                          onClick={() => updateSpend(id, 25)}
                          className="w-7 h-7 rounded-lg bg-[#1E2D4A] hover:bg-[#4AC4E0]/20 flex items-center justify-center transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                  <div className="w-3 h-3 rounded border border-emerald-500/40 bg-emerald-950/30 shrink-0" />
                  <span>Green = replaced by your selected ClientVerse tier</span>
                </div>
              </div>
            </div>

            {/* Results sidebar */}
            <div className="space-y-5">
              {/* Tier selector */}
              <div className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-6">
                <p className="text-xs font-bold tracking-widest text-[#4AC4E0] uppercase mb-3">Select Your Tier</p>
                <div className="space-y-2">
                  {(Object.keys(tierData) as Tier[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTier(t)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                        selectedTier === t
                          ? "border-[#4AC4E0] bg-[#4AC4E0]/10"
                          : "border-[#1E2D4A] hover:border-[#4AC4E0]/30"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">{tierData[t].name}</span>
                        <span className={`text-sm font-bold ${selectedTier === t ? "text-[#4AC4E0]" : "text-gray-400"}`}>
                          {formatCurrency(tierData[t].price)}/mo
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Savings summary */}
              <div className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-6 space-y-4">
                <p className="text-xs font-bold tracking-widest text-[#4AC4E0] uppercase">Your Savings</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Current monthly spend</span>
                    <span className="font-bold">{formatCurrency(totalCurrentSpend)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">ClientVerse {tier.name}</span>
                    <span className="font-bold text-[#4AC4E0]">{formatCurrency(clientverseCost)}</span>
                  </div>
                  <div className="border-t border-[#1E2D4A] pt-3 flex justify-between items-center">
                    <span className="text-sm font-bold text-white">Monthly savings</span>
                    <span className={`text-xl font-black ${monthlySavings > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {monthlySavings > 0 ? "+" : ""}{formatCurrency(monthlySavings)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white">Annual savings</span>
                    <span className={`text-2xl font-black ${annualSavings > 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {annualSavings > 0 ? "+" : ""}{formatCurrency(annualSavings)}
                    </span>
                  </div>
                </div>

                {monthlySavings > 0 && (
                  <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl px-4 py-3">
                    <div className="flex items-start gap-2">
                      <TrendUp size={16} color="#4ade80" weight="duotone" className="mt-0.5 shrink-0" />
                      <p className="text-xs text-emerald-400 leading-relaxed">
                        Setup fee ({formatCurrency(tier.setup)}) pays for itself in <strong>{setupBreakeven} month{setupBreakeven !== 1 ? "s" : ""}</strong> of savings.
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  asChild
                  className="w-full bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-11 flex items-center justify-center gap-2"
                >
                  <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                    Get Started <ArrowRight size={16} weight="bold" />
                  </a>
                </Button>
              </div>

              {/* What you also GET */}
              <div className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-6">
                <p className="text-xs font-bold tracking-widest text-[#4AC4E0] uppercase mb-3">Plus You Also Get</p>
                <ul className="space-y-2">
                  {[
                    "7-day go-live guarantee",
                    "Missed call text-back under 60s",
                    "AI lead follow-up automation",
                    "Embedded funding access",
                    "Veteran-owned support team",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle size={13} weight="duotone" color="#4AC4E0" className="shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-gray-600 text-center leading-relaxed">
                Also try the{" "}
                <Link href="/revenue-calculator" className="text-[#4AC4E0] hover:underline">
                  Revenue Leak Calculator
                </Link>{" "}
                to see what missed calls are costing you.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

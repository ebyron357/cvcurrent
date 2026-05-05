import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  PhoneSlash,
  CurrencyDollar,
  TrendUp,
  ArrowRight,
  WarningCircle,
  CheckCircle,
  ChartBar,
  ArrowLeft,
} from "@phosphor-icons/react";

type Step = "q1" | "q2" | "q3" | "capture" | "result";

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function calcLeak(missed: number, jobValue: number, closeRate: number) {
  const weeklyLeak = missed * (closeRate / 100) * jobValue;
  const monthlyLeak = weeklyLeak * 4.33;
  const annualLeak = weeklyLeak * 52;
  return { weeklyLeak, monthlyLeak, annualLeak };
}

function getTierRecommendation(annualLeak: number) {
  if (annualLeak < 30000)
    return {
      tier: "COMMAND",
      price: "$297/mo",
      reason:
        "The Command tier's missed call text-back and AI lead response will start recovering your missed opportunities immediately — in under 7 days.",
    };
  if (annualLeak < 80000)
    return {
      tier: "OPERATOR",
      price: "$497/mo",
      reason:
        "Operator adds call tracking and AI chatbot on top of the full CRM stack — so every lead channel is covered, not just inbound calls.",
    };
  return {
    tier: "COMMANDER",
    price: "$997/mo",
    reason:
      "At your volume, you need the full stack — AI voice agent, lead intelligence, and done-for-you ads management to replace what you're losing.",
  };
}

export default function RevenueCalculator() {
  const [step, setStep] = useState<Step>("q1");
  const [missed, setMissed] = useState(10);
  const [jobValue, setJobValue] = useState(500);
  const [closeRate, setCloseRate] = useState(30);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { weeklyLeak, monthlyLeak, annualLeak } = calcLeak(missed, jobValue, closeRate);
  const rec = getTierRecommendation(annualLeak);

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setStep("result");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: `Revenue Leak Calculator Lead — Annual Leak: ${formatCurrency(annualLeak)} | Missed calls/wk: ${missed} | Avg job value: ${formatCurrency(jobValue)} | Close rate: ${closeRate}% | Recommended tier: ${rec.tier} ${rec.price}`,
        }),
      });
    } catch {}
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
            <PhoneSlash size={14} weight="fill" />
            Revenue Leak Calculator
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            How Much Is Your Business <br />
            <span className="text-[#4AC4E0]">Losing Right Now?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Answer 3 questions. See your exact annual revenue leak in real time. Takes 60 seconds.
          </motion.p>
        </section>

        {/* Calculator card */}
        <section className="container mx-auto px-4 max-w-2xl">
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === "q1" && (
              <motion.div
                key="q1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-8 md:p-12"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      background: "rgba(74,196,224,0.08)",
                      border: "1.5px solid rgba(74,196,224,0.5)",
                      boxShadow: "0 0 16px rgba(74,196,224,0.12)",
                    }}
                  >
                    <PhoneSlash size={24} color="#4AC4E0" weight="duotone" />
                  </div>
                  <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase">Question 1 of 3</p>
                </div>
                <h2 className="text-2xl font-bold mb-2 mt-4">
                  How many calls does your business miss per week?
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Include calls that go to voicemail, ring out, or are missed after hours.
                </p>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Missed calls / week</span>
                    <span className="text-3xl font-bold text-[#4AC4E0]">{missed}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={missed}
                    onChange={(e) => setMissed(Number(e.target.value))}
                    className="w-full accent-[#4AC4E0] h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>1</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100</span>
                  </div>
                </div>

                {/* Live preview */}
                <div className="bg-[#0A1628] border border-[#1E2D4A] rounded-xl px-5 py-4 mb-8 text-center">
                  <p className="text-xs text-gray-500 mb-1">Estimated weekly missed opportunities</p>
                  <p className="text-2xl font-bold text-white">
                    {missed} calls <span className="text-gray-500 text-base font-normal">× your close rate</span>
                  </p>
                </div>

                <Button
                  onClick={() => setStep("q2")}
                  className="w-full bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-12 text-base flex items-center justify-center gap-2"
                >
                  Next <ArrowRight size={18} weight="bold" />
                </Button>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === "q2" && (
              <motion.div
                key="q2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-8 md:p-12"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      background: "rgba(74,196,224,0.08)",
                      border: "1.5px solid rgba(74,196,224,0.5)",
                      boxShadow: "0 0 16px rgba(74,196,224,0.12)",
                    }}
                  >
                    <CurrencyDollar size={24} color="#4AC4E0" weight="duotone" />
                  </div>
                  <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase">Question 2 of 3</p>
                </div>
                <h2 className="text-2xl font-bold mb-2 mt-4">
                  What's your average job or sale value?
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Think average ticket — HVAC job, appointment, project, or product sale.
                </p>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Average job value</span>
                    <span className="text-3xl font-bold text-[#4AC4E0]">{formatCurrency(jobValue)}</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={10000}
                    step={100}
                    value={jobValue}
                    onChange={(e) => setJobValue(Number(e.target.value))}
                    className="w-full accent-[#4AC4E0] h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>$100</span>
                    <span>$2,500</span>
                    <span>$5,000</span>
                    <span>$7,500</span>
                    <span>$10K</span>
                  </div>
                </div>

                <div className="bg-[#0A1628] border border-[#1E2D4A] rounded-xl px-5 py-4 mb-8 text-center">
                  <p className="text-xs text-gray-500 mb-1">If you closed just half your missed calls at this value</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency((missed * 0.5) * jobValue)}<span className="text-gray-500 text-base font-normal"> / week</span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep("q1")}
                    variant="outline"
                    className="border-[#1E2D4A] text-gray-400 hover:border-[#4AC4E0]/30 h-12 px-5 flex items-center gap-2"
                  >
                    <ArrowLeft size={16} /> Back
                  </Button>
                  <Button
                    onClick={() => setStep("q3")}
                    className="flex-1 bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-12 text-base flex items-center justify-center gap-2"
                  >
                    Next <ArrowRight size={18} weight="bold" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === "q3" && (
              <motion.div
                key="q3"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-8 md:p-12"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      background: "rgba(74,196,224,0.08)",
                      border: "1.5px solid rgba(74,196,224,0.5)",
                      boxShadow: "0 0 16px rgba(74,196,224,0.12)",
                    }}
                  >
                    <TrendUp size={24} color="#4AC4E0" weight="duotone" />
                  </div>
                  <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase">Question 3 of 3</p>
                </div>
                <h2 className="text-2xl font-bold mb-2 mt-4">
                  What's your current lead-to-client close rate?
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Out of every 10 people who actually reach you, how many become paying clients?
                </p>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Close rate</span>
                    <span className="text-3xl font-bold text-[#4AC4E0]">{closeRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={80}
                    step={5}
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="w-full accent-[#4AC4E0] h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>5%</span>
                    <span>20%</span>
                    <span>40%</span>
                    <span>60%</span>
                    <span>80%</span>
                  </div>
                </div>

                {/* Live annual leak preview */}
                <div className="bg-red-950/30 border border-red-500/20 rounded-xl px-5 py-4 mb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <WarningCircle size={16} color="#f87171" weight="fill" />
                    <p className="text-xs text-red-400 font-semibold">Estimated Annual Revenue Leak</p>
                  </div>
                  <p className="text-4xl font-bold text-red-400">{formatCurrency(annualLeak)}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatCurrency(monthlyLeak)}/mo · {formatCurrency(weeklyLeak)}/wk
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep("q2")}
                    variant="outline"
                    className="border-[#1E2D4A] text-gray-400 hover:border-[#4AC4E0]/30 h-12 px-5 flex items-center gap-2"
                  >
                    <ArrowLeft size={16} /> Back
                  </Button>
                  <Button
                    onClick={() => setStep("capture")}
                    className="flex-1 bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-12 text-base flex items-center justify-center gap-2"
                  >
                    See My Full Report <ArrowRight size={18} weight="bold" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Lead capture */}
            {step === "capture" && (
              <motion.div
                key="capture"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-8 md:p-12"
              >
                {/* Teaser */}
                <div className="bg-red-950/30 border border-red-500/20 rounded-xl px-5 py-4 mb-8 text-center">
                  <p className="text-xs text-red-400 font-semibold mb-1">Your estimated annual revenue leak</p>
                  <p className="text-5xl font-bold text-red-400">{formatCurrency(annualLeak)}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatCurrency(monthlyLeak)}/mo · {formatCurrency(weeklyLeak)}/wk</p>
                </div>

                <h2 className="text-2xl font-bold mb-2">Where should we send your full breakdown?</h2>
                <p className="text-gray-400 text-sm mb-7">
                  We'll include your personalized recovery plan and the exact ClientVerse tier that closes your gap fastest.
                </p>

                <form onSubmit={handleCapture} className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0A1628] border border-[#1E2D4A] rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4AC4E0]/50 transition-colors"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A1628] border border-[#1E2D4A] rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4AC4E0]/50 transition-colors"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0A1628] border border-[#1E2D4A] rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#4AC4E0]/50 transition-colors"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-12 text-base flex items-center justify-center gap-2"
                  >
                    Show Me My Full Report <ArrowRight size={18} weight="bold" />
                  </Button>
                  <p className="text-xs text-gray-600 text-center">
                    No spam. We'll reach out within 24 hours with your personalized plan.
                  </p>
                </form>
              </motion.div>
            )}

            {/* Result */}
            {step === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5"
              >
                {/* Leak summary */}
                <div className="bg-[#0D1B2E] border border-red-500/20 rounded-2xl p-8 md:p-10 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <WarningCircle size={20} color="#f87171" weight="fill" />
                    <p className="text-sm text-red-400 font-bold tracking-wider uppercase">Your Revenue Leak Report</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-5">Based on {missed} missed calls/wk · {formatCurrency(jobValue)} avg job · {closeRate}% close rate</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: "Per Week", value: formatCurrency(weeklyLeak) },
                      { label: "Per Month", value: formatCurrency(monthlyLeak) },
                      { label: "Per Year", value: formatCurrency(annualLeak) },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-[#0A1628] border border-[#1E2D4A] rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">{label}</p>
                        <p className="text-xl md:text-2xl font-bold text-red-400">{value}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-400 text-sm">
                    Over 3 years, that's <span className="text-red-400 font-bold">{formatCurrency(annualLeak * 3)}</span> in revenue your competitors are capturing instead.
                  </p>
                </div>

                {/* Recommendation */}
                <div className="bg-[#0D1B2E] border border-[#4AC4E0]/30 rounded-2xl p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-5">
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
                      <ChartBar size={26} color="#4AC4E0" weight="duotone" />
                    </div>
                    <div>
                      <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-0.5">Recommended Plan</p>
                      <h3 className="text-2xl font-bold">
                        {rec.tier} — <span className="text-[#4AC4E0]">{rec.price}</span>
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">{rec.reason}</p>

                  <ul className="space-y-2.5 mb-8">
                    {[
                      "Missed call text-back under 60 seconds — automatic",
                      "AI lead response follows up until they book or opt out",
                      "Full CRM pipeline so no deal ever falls through a crack",
                      "7-day go-live — not 30 days, not 60 days",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <CheckCircle size={16} weight="duotone" color="#4AC4E0" className="mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      className="flex-1 bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-12 text-base flex items-center justify-center gap-2"
                    >
                      <a
                        href="https://calendly.com/clientverse/strategy-call"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Book My Free Audit <ArrowRight size={16} weight="bold" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/30 h-12 text-sm"
                    >
                      <a href="/pricing">View All Plans</a>
                    </Button>
                  </div>
                </div>

                {/* ROI reminder */}
                <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl px-6 py-5 text-center">
                  <p className="text-sm text-emerald-400 font-semibold mb-1">The Math</p>
                  <p className="text-gray-300 text-sm">
                    If ClientVerse recovers just <span className="text-white font-bold">15%</span> of your annual leak, that's{" "}
                    <span className="text-emerald-400 font-bold">{formatCurrency(annualLeak * 0.15)}/yr</span> returned —
                    against a {rec.price} investment of{" "}
                    <span className="text-white font-bold">
                      {formatCurrency(
                        parseInt(rec.price.replace(/[^0-9]/g, "")) * 12
                      )}/yr.
                    </span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step dots */}
          {step !== "result" && (
            <div className="flex justify-center gap-2 mt-6">
              {(["q1", "q2", "q3", "capture"] as Step[]).map((s) => (
                <div
                  key={s}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    s === step ? "bg-[#4AC4E0]" : "bg-[#1E2D4A]"
                  }`}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

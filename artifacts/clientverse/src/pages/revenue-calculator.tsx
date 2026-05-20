import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CVButtonLink } from "@/components/cv-ui";
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
  ClipboardText,
  CalendarCheck,
  Rocket,
} from "@phosphor-icons/react";
import { Link } from "wouter";

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
      reason:
        "The Command tier's missed call text-back and AI lead response will start recovering your missed opportunities immediately — in under 7 days.",
    };
  if (annualLeak < 80000)
    return {
      tier: "OPERATOR",
      reason:
        "Operator adds call tracking and AI chatbot on top of the full CRM stack — so every lead channel is covered, not just inbound calls.",
    };
  return {
    tier: "COMMANDER",
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
          message: `Revenue Leak Calculator Lead — Annual Leak: ${formatCurrency(annualLeak)} | Missed calls/wk: ${missed} | Avg job value: ${formatCurrency(jobValue)} | Close rate: ${closeRate}% | Recommended tier: ${rec.tier}`,
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
                className="cv-card cv-card--feature p-8 md:p-12"
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
                className="cv-card cv-card--feature p-8 md:p-12"
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
                className="cv-card cv-card--feature p-8 md:p-12"
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
                className="cv-card cv-card--feature p-8 md:p-12"
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
                <div className="cv-card cv-card--feature p-8 md:p-10 text-center" style={{ borderColor: "rgba(239, 68, 68, 0.20)" }}>
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
                      <div key={label} className="cv-card cv-card--dashboard p-4">
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
                <div className="cv-card cv-card--trust p-8 md:p-10" style={{ borderColor: "rgba(74,196,224,0.3)" }}>
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
                        {rec.tier}
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
                    <CVButtonLink
                      href="https://calendly.com/clientverse/strategy-call"
                      target="_blank"
                      rel="noreferrer"
                      variant="primary"
                      className="flex-1"
                      rightIcon={<ArrowRight size={16} weight="bold" />}
                    >
                      Book My Free Audit
                    </CVButtonLink>
                    <CVButtonLink
                      href="/pricing"
                      variant="secondary"
                    >
                      View All Plans
                    </CVButtonLink>
                  </div>
                </div>

                {/* ROI reminder */}
                <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl px-6 py-5 text-center">
                  <p className="text-sm text-emerald-400 font-semibold mb-1">The Math</p>
                  <p className="text-gray-300 text-sm">
                    If ClientVerse recovers just <span className="text-white font-bold">15%</span> of your annual leak, that's{" "}
                    <span className="text-emerald-400 font-bold">{formatCurrency(annualLeak * 0.15)}/yr</span> returned to your business — without any new marketing spend.
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

        {/* What happens after your number */}
        <section className="container mx-auto px-4 py-20 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              After Your Number — <span className="text-[#4AC4E0]">Here's What Happens</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              The calculator gives you the leak. The Revenue Audit gives you the fix — with a written report and a prioritized 90-day roadmap.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                Icon: CalendarCheck,
                step: "01",
                title: "Book Your Revenue Audit",
                desc: "30 minutes. Free. We review your current stack, confirm your leak estimate, and identify every gap by category.",
              },
              {
                Icon: ClipboardText,
                step: "02",
                title: "Receive Your C.L.A.R.I.T.Y. Report",
                desc: "Within 48 hours — a written 7-point assessment. Every revenue leak quantified. Every fix prioritized by ROI impact.",
              },
              {
                Icon: Rocket,
                step: "03",
                title: "Go Live in 7 Days",
                desc: "Your CRM, AI follow-up, and automation systems live in 7 days or less. Revenue starts coming back immediately.",
              },
            ].map(({ Icon, step, title, desc }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="cv-card cv-card--feature cv-card--interactive p-7 text-center"
              >
                <div className="text-4xl font-black text-[#4AC4E0]/20 mb-4 select-none">{step}</div>
                <div
                  className="rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ width: 48, height: 48, background: "rgba(74,196,224,0.08)", border: "1.5px solid rgba(74,196,224,0.5)" }}
                >
                  <Icon size={22} color="#4AC4E0" weight="duotone" />
                </div>
                <h3 className="font-bold text-base mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CVButtonLink
              href="https://calendly.com/clientverse/strategy-call"
              target="_blank"
              rel="noreferrer"
              variant="primary"
              size="lg"
              style={{ marginLeft: "auto", marginRight: "auto" }}
              rightIcon={<ArrowRight size={16} weight="bold" />}
            >
              Book Your Revenue Audit — Free
            </CVButtonLink>
          </div>
        </section>

        {/* What the calculator doesn't capture */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-3">Important Context</p>
                <h2 className="text-2xl font-bold mb-4">This calculator only counts missed calls. Your actual leak is likely larger.</h2>
                <p className="text-gray-400 leading-relaxed text-sm mb-4">
                  The calculator above isolates one leak — inbound calls that go unanswered. But there are 5 other operational gaps that lose revenue just as fast: dead quote follow-up, no-show appointments, reviews never requested, stale pipeline leads, and staff time on manual tasks.
                </p>
                <p className="text-gray-400 leading-relaxed text-sm">
                  The Revenue Audit identifies all six categories — with a dollar value on each one and a prioritized fix for each.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Missed calls (this calculator)", included: true },
                  { label: "Dead quote follow-up", included: false },
                  { label: "No-show appointments with no recovery", included: false },
                  { label: "Reviews never requested", included: false },
                  { label: "Stale leads in dead pipeline", included: false },
                  { label: "Staff time on manual repetitive tasks", included: false },
                ].map(({ label, included }) => (
                  <div key={label} className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${included ? "border-[#4AC4E0]/30 bg-[#4AC4E0]/5 text-white" : "border-[#1E2D4A] text-gray-500"}`}>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${included ? "bg-[#4AC4E0]" : "bg-gray-700"}`} />
                    {label}
                    {!included && <span className="ml-auto text-xs text-gray-600">Audit only</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <p className="text-gray-500 text-sm mb-8">What our clients say about the Revenue Audit</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { quote: "The audit identified $23,000 in annual revenue I didn't know I was losing. We fixed it in the first week.", attr: "HVAC company owner, Southeast" },
              { quote: "I expected a sales pitch. I got a 7-page written report with specific fixes and ROI projections. That's not what I expected.", attr: "Dental practice manager" },
              { quote: "Within 30 minutes I knew exactly what was broken and why. The 7-day go-live was real — we hit it exactly.", attr: "Veteran-owned roofing company" },
            ].map(({ quote, attr }) => (
              <motion.div
                key={attr}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="cv-card cv-card--trust p-7 text-left"
              >
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{quote}"</p>
                <p className="text-gray-500 text-xs">— {attr}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

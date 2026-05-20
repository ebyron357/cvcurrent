import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  CV_INPUT_CLASS,
  CVFormField,
  CVFormPrivacy,
  getApiBase,
} from "@/components/cv-ui/Form";
import { FORM_IDS } from "@/lib/form-schema";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Robot,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Warning,
  TrendUp,
  Lightning,
  Crown,
  Stack,
} from "@phosphor-icons/react";

type Stage = "quiz" | "capture" | "result";

const questions = [
  {
    id: 1,
    question: "How does your business currently handle missed calls or after-hours inquiries?",
    options: [
      { text: "We miss them and hope they call back", score: 0 },
      { text: "Voicemail — we call back when we can", score: 1 },
      { text: "We have a basic auto-reply or bot", score: 2 },
      { text: "Automated follow-up within minutes", score: 3 },
    ],
  },
  {
    id: 2,
    question: "How do you track leads and follow up with prospects?",
    options: [
      { text: "Spreadsheets, notes, or memory", score: 0 },
      { text: "A basic CRM but no automation", score: 1 },
      { text: "CRM with some automated reminders", score: 2 },
      { text: "Fully automated pipeline with AI scoring", score: 3 },
    ],
  },
  {
    id: 3,
    question: "How do you collect and respond to client reviews?",
    options: [
      { text: "We don't actively collect reviews", score: 0 },
      { text: "We ask manually sometimes", score: 1 },
      { text: "We have a process but it's manual", score: 2 },
      { text: "Automated review requests and monitoring", score: 3 },
    ],
  },
  {
    id: 4,
    question: "How does your team handle appointment scheduling?",
    options: [
      { text: "Phone/email back-and-forth", score: 0 },
      { text: "A booking link but no automation", score: 1 },
      { text: "Online booking with confirmation emails", score: 2 },
      { text: "AI-managed booking with reminders and rescheduling", score: 3 },
    ],
  },
  {
    id: 5,
    question: "Do you have a documented AI or automation strategy for your business?",
    options: [
      { text: "No — we're not using AI at all", score: 0 },
      { text: "We use a few AI tools informally", score: 1 },
      { text: "We have AI tools but no real strategy", score: 2 },
      { text: "Yes — documented and actively optimized", score: 3 },
    ],
  },
];

function getResult(total: number) {
  if (total <= 4) {
    return {
      level: "Starting Point",
      label: "Your business is leaving significant revenue on the table every week.",
      body: "You're operating without the automation safety net that catches missed calls, lost leads, and dropped follow-ups. The good news: the gaps are clear and the fixes are fast. Businesses at this stage typically see the biggest ROI from ClientVerse — because there's so much low-hanging fruit to recover.",
      Icon: Stack,
      tier: "COMMAND",
      price: "$297/mo",
      color: "text-amber-400",
      borderColor: "border-amber-500/30",
      bgColor: "bg-amber-950/20",
    };
  }
  if (total <= 9) {
    return {
      level: "Building Momentum",
      label: "You have some automation in place — but the gaps are still costly.",
      body: "You've started the journey but your systems aren't connected and your follow-up is inconsistent. Leads are falling through the cracks between your tools, and you're paying for the same thing multiple times. The Operator tier gives you the full connected stack — so nothing slips.",
      Icon: Lightning,
      tier: "OPERATOR",
      price: "$497/mo",
      color: "text-blue-400",
      borderColor: "border-blue-500/30",
      bgColor: "bg-blue-950/20",
    };
  }
  return {
    level: "Ready to Scale",
    label: "Your foundation is solid. It's time to build a competitive moat.",
    body: "You're already ahead of most small businesses — your systems work. Now the opportunity is to add the AI layer that takes you from good to unbeatable: AI voice agent, lead intelligence, done-for-you ads management, and full operations oversight. Commander tier is built for exactly where you are.",
    Icon: Crown,
    tier: "COMMANDER",
    price: "$997/mo",
    color: "text-[#4AC4E0]",
    borderColor: "border-[#4AC4E0]/30",
    bgColor: "bg-[#4AC4E0]/5",
  };
}

export default function AiReadiness() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);

  const handleSelect = (score: number) => setSelected(score);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setStage("capture");
    }
  };

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = getResult(totalScore);
    setStage("result");
    try {
      await fetch(`${getApiBase()}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          lead_source: "AI Readiness Quiz",
          page_url: window.location.href,
          form_id: FORM_IDS.AI_READINESS_CAPTURE,
          quiz_score: totalScore,
          readiness_level: res.level,
          recommended_tier: res.tier,
          message: `AI Readiness Quiz Lead — Score: ${totalScore}/15 | Level: ${res.level} | Recommended tier: ${res.tier} ${res.price}`,
        }),
      });
    } catch {}
  };

  const pct = ((currentQ) / questions.length) * 100;

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
            <Robot size={14} weight="fill" />
            AI Readiness Quiz
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Is Your Business <br />
            <span className="text-[#4AC4E0]">Ready for AI?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            5 questions. 2 minutes. Find out exactly where you stand — and what to do next.
          </motion.p>
        </section>

        <section className="container mx-auto px-4 max-w-2xl">
          <AnimatePresence mode="wait">
            {/* Quiz */}
            {stage === "quiz" && (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-8 md:p-10"
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Question {currentQ + 1} of {questions.length}</span>
                    <span>{Math.round(pct)}% complete</span>
                  </div>
                  <div className="w-full bg-[#1E2D4A] rounded-full h-1.5">
                    <div
                      className="bg-[#4AC4E0] h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-bold mb-7 leading-snug">
                  {questions[currentQ].question}
                </h2>

                <div className="space-y-3 mb-8">
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt.score)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 text-sm font-medium ${
                        selected === opt.score
                          ? "border-[#4AC4E0] bg-[#4AC4E0]/10 text-white"
                          : "border-[#1E2D4A] bg-[#0A1628] text-gray-300 hover:border-[#4AC4E0]/30 hover:bg-[#4AC4E0]/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                            selected === opt.score ? "border-[#4AC4E0] bg-[#4AC4E0]" : "border-gray-600"
                          }`}
                        >
                          {selected === opt.score && <div className="w-1.5 h-1.5 rounded-full bg-[#0A1628]" />}
                        </div>
                        {opt.text}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  {currentQ > 0 && (
                    <Button
                      onClick={() => {
                        setCurrentQ(currentQ - 1);
                        setAnswers(answers.slice(0, -1));
                        setSelected(null);
                      }}
                      variant="outline"
                      className="border-[#1E2D4A] text-gray-400 hover:border-[#4AC4E0]/30 h-12 px-5 flex items-center gap-2"
                    >
                      <ArrowLeft size={16} /> Back
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    disabled={selected === null}
                    className="flex-1 bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-12 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {currentQ + 1 === questions.length ? "See My Results" : "Next"}
                    <ArrowRight size={18} weight="bold" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Lead capture */}
            {stage === "capture" && (
              <motion.div
                key="capture"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-8 md:p-10"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 flex items-center justify-center">
                    <TrendUp size={30} color="#4AC4E0" weight="duotone" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-center">Your results are ready.</h2>
                <p className="text-gray-400 text-sm mb-7 text-center">
                  Enter your details to see your AI Readiness Score, what it means for your business, and your personalized next step.
                </p>

                <form onSubmit={handleCapture} noValidate className="space-y-4">
                  <CVFormField label="Full Name" htmlFor="quiz-name" required>
                    <input
                      id="quiz-name"
                      required
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={CV_INPUT_CLASS}
                    />
                  </CVFormField>
                  <CVFormField label="Business Email" htmlFor="quiz-email" required>
                    <input
                      id="quiz-email"
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={CV_INPUT_CLASS}
                    />
                  </CVFormField>
                  <CVFormField label="Phone" htmlFor="quiz-phone" optional>
                    <input
                      id="quiz-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={CV_INPUT_CLASS}
                    />
                  </CVFormField>
                  <Button
                    type="submit"
                    className="w-full bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-12 flex items-center justify-center gap-2"
                  >
                    Show Me My Score <ArrowRight size={18} weight="bold" />
                  </Button>
                  <CVFormPrivacy note="No spam. We'll reach out with your personalized plan." />
                </form>
              </motion.div>
            )}

            {/* Result */}
            {stage === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5"
              >
                {/* Score card */}
                <div className={`bg-[#0D1B2E] border ${result.borderColor} rounded-2xl p-8 md:p-10 text-center`}>
                  <div className={`inline-flex items-center gap-2 ${result.bgColor} border ${result.borderColor} rounded-full px-4 py-1.5 text-sm font-bold mb-5 ${result.color}`}>
                    <result.Icon size={16} weight="duotone" />
                    {result.level}
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className={`text-6xl font-black ${result.color}`}>{totalScore}</span>
                    <span className="text-2xl text-gray-500 font-bold">/ 15</span>
                  </div>
                  <p className="text-xl font-bold text-white mb-3">{result.label}</p>
                  <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">{result.body}</p>
                </div>

                {/* Recommendation */}
                <div className="bg-[#0D1B2E] border border-[#4AC4E0]/30 rounded-2xl p-8 md:p-10">
                  <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-3">Your Recommended Starting Point</p>
                  <h3 className="text-2xl font-bold mb-1">
                    {result.tier} — <span className="text-[#4AC4E0]">{result.price}</span>
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">7-day go-live guarantee. Cancel anytime.</p>

                  <ul className="space-y-2.5 mb-8">
                    {[
                      "Missed call text-back under 60 seconds",
                      "AI lead follow-up that doesn't give up",
                      "Full CRM pipeline — no deal falls through",
                      "Reputation management across 50+ platforms",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <CheckCircle size={16} weight="duotone" color="#4AC4E0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      className="flex-1 bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-12 flex items-center justify-center gap-2"
                    >
                      <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
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

                {/* Also check revenue leak */}
                <div className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <Warning size={20} color="#f59e0b" weight="duotone" />
                    <p className="text-sm text-gray-300">
                      Want to see the exact dollar amount your business is losing?
                    </p>
                  </div>
                  <Button asChild size="sm" variant="outline" className="border-[#1E2D4A] hover:border-[#4AC4E0]/30 text-white shrink-0">
                    <a href="/revenue-calculator">Calculate My Revenue Leak →</a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step dots */}
          {stage === "quiz" && (
            <div className="flex justify-center gap-2 mt-6">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i === currentQ ? "bg-[#4AC4E0]" : i < currentQ ? "bg-[#4AC4E0]/40" : "bg-[#1E2D4A]"
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

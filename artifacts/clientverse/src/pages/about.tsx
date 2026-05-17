import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowsInSimple,
  Database,
  Robot,
  HardHat,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Users,
  Buildings,
  Heartbeat,
  GraduationCap,
  Wrench,
  Star,
  Medal,
  Lock,
  Brain,
} from "@phosphor-icons/react";

const beliefs = [
  {
    Icon: ArrowsInSimple,
    title: "Simplicity scales. Complexity breaks.",
    body: "We ruthlessly eliminate redundant tools and convoluted workflows. If it takes 5 steps to do what could be done in 1, it's broken. Every system we build has to survive without us explaining it to someone.",
  },
  {
    Icon: Database,
    title: "Data must have one source of truth.",
    body: "Siloed data is useless data. Contacts in three places, jobs tracked in spreadsheets, and revenue in someone's head — that's not a business, it's organized chaos. We fix it at the root.",
  },
  {
    Icon: Robot,
    title: "AI is infrastructure, not a feature.",
    body: "We deploy AI where it measurably saves time or recovers revenue — not because it sounds impressive. Practical application over hype. Every AI system we build has a clear business outcome attached.",
  },
  {
    Icon: HardHat,
    title: "We operate what we build.",
    body: "A system is only as good as its maintenance. We don't hand you the keys and disappear. We stay in the stack — monitoring, optimizing, and fixing — because that's what operational partnership actually means.",
  },
];

const whoWeServe = [
  { Icon: Wrench, label: "Home Services", desc: "HVAC, plumbing, roofing, landscaping, cleaning" },
  { Icon: Heartbeat, label: "Medical & Dental", desc: "Dental practices, med spas, health clinics, therapists" },
  { Icon: Buildings, label: "Real Estate", desc: "Agents, brokerages, property managers, investors" },
  { Icon: Star, label: "Veteran-Owned", desc: "Veteran-owned small businesses across all industries" },
  { Icon: GraduationCap, label: "Nonprofits & Education", desc: "501(c)(3)s, schools, training programs, associations" },
  { Icon: Users, label: "Professional Services", desc: "Law firms, financial advisors, consultants, agencies" },
];

export default function About() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">

        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-20 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 rounded-full px-4 py-1.5 text-sm text-[#4AC4E0] font-medium mb-6"
          >
            <ShieldCheck size={14} weight="fill" />
            Veteran-Owned · No Contracts · 7-Day Go-Live Guarantee
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            We Fix the Operational Gaps <br />
            <span className="text-[#4AC4E0]">That Are Costing You Revenue.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            ClientVerse is a veteran-owned AI operations company. We build, repair, and operate the business systems that stop revenue from leaking — CRM, automation, AI voice agents, reputation management, and pipeline operations. All managed for you.
          </motion.p>
        </section>

        {/* The Problem & Mission */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-4">The Problem</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">Most service businesses are losing $40K–$70K a year to operational gaps they don't know they have.</h3>
                <div className="text-gray-400 space-y-4 text-base leading-relaxed">
                  <p>Missed calls that go to voicemail. Leads that fall through because no one followed up within 5 minutes. Quotes sent with no automated follow-up sequence. Appointments booked with no reminders. Happy clients who never left a review because nobody asked.</p>
                  <p>These aren't big strategic failures. They're small operational gaps that compound into five and six figures of lost revenue every year. Every one of them is fixable — in under 7 days.</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-4">Our Mission</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">To be the operational backbone for businesses that are too good to be losing the revenue they're losing.</h3>
                <div className="text-gray-400 space-y-4 text-base leading-relaxed">
                  <p>ClientVerse doesn't just set up software. We architect the specific systems that stop specific revenue leaks — then we run them for you permanently, so you stay focused on the business instead of the tools.</p>
                  <p>We are operators, not just architects. That's the difference.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Veteran-owned callout */}
        <section className="container mx-auto px-4 py-20 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D1B2E] border border-[#4AC4E0]/25 rounded-2xl p-10 md:p-12 flex flex-col md:flex-row items-start gap-8"
          >
            <div
              className="shrink-0 rounded-2xl flex items-center justify-center"
              style={{ width: 80, height: 80, background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)", border: "1px solid rgba(74,196,224,0.4)", boxShadow: "0 0 32px rgba(74,196,224,0.22), inset 0 1px 0 rgba(255,255,255,0.06)" }}
            >
              <ShieldCheck size={40} color="#4AC4E0" weight="fill" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-3">Veteran-Owned Small Business</p>
              <h3 className="text-2xl font-bold mb-4">Built on military operational discipline. Applied to business systems.</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                ClientVerse is founded and operated by a veteran. The operational precision, systems thinking, and accountability standards we bring to client engagements come directly from that background. We prioritize working with other veteran-owned businesses and mission-driven organizations — and offer dedicated programs for that community.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Veteran-owned priority onboarding", "Priority terms for verified VOSBs", "SAIG-OS™ governance for compliance-sensitive orgs", "Federal contractor readiness available"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-xs text-gray-300 bg-[#0A1628] border border-[#1E2D4A] rounded-full px-3 py-1.5">
                    <CheckCircle size={11} weight="duotone" color="#4AC4E0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Founder */}
        <section className="container mx-auto px-4 py-20 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left — identity */}
              <div className="md:w-72 bg-[#0A1628] border-b md:border-b-0 md:border-r border-[#1E2D4A] p-10 flex flex-col items-center text-center gap-5 shrink-0">
                <div
                  className="rounded-2xl flex items-center justify-center"
                  style={{
                    width: 96,
                    height: 96,
                    background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)",
                    border: "1px solid rgba(74,196,224,0.4)",
                    boxShadow: "0 0 40px rgba(74,196,224,0.2)",
                  }}
                >
                  <ShieldCheck size={48} color="#4AC4E0" weight="fill" />
                </div>
                <div>
                  <p className="font-bold text-white text-lg mb-0.5">Founder & Operator</p>
                  <p className="text-[#4AC4E0] text-sm font-medium">ClientVerse</p>
                </div>
                <div className="w-full space-y-2 pt-2">
                  {[
                    { Icon: Medal, label: "U.S. Veteran" },
                    { Icon: Lock, label: "Cybersecurity Background" },
                    { Icon: Brain, label: "AI Systems Architect" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 bg-[#0D1B2E] border border-[#1E2D4A] rounded-lg px-3 py-2">
                      <Icon size={14} color="#4AC4E0" weight="fill" className="shrink-0" />
                      <span className="text-xs text-gray-300">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right — story */}
              <div className="flex-1 p-10 md:p-12">
                <p className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-4">Why This Exists</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                  I built ClientVerse because I kept seeing the same problem. <span className="text-[#4AC4E0]">Good businesses losing revenue to broken systems.</span>
                </h3>
                <div className="text-gray-400 space-y-4 leading-relaxed">
                  <p>
                    After years in cybersecurity and military operations, I noticed that most service businesses were running on operational infrastructure that would never survive a real inspection. Missed calls with no recovery. Leads falling through gaps nobody was watching. Proposals going out with no follow-up. Revenue leaking through cracks that were completely fixable.
                  </p>
                  <p>
                    The tools existed to fix all of it. What didn't exist was someone willing to build and run the systems permanently — not just hand over software and walk away. That's the gap ClientVerse fills.
                  </p>
                  <p>
                    Every system we deploy is one I've personally designed, tested, and would stand behind. The cybersecurity background isn't incidental — it's why every system we build is documented, auditable, and defensible. That's the standard.
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-11 px-6 flex items-center gap-2 w-fit">
                    <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                      Book a Direct Call <ArrowRight size={16} weight="bold" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/30 h-11 px-6 w-fit">
                    <a href="mailto:hello@clientverse.io">
                      Send a Direct Message
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Core Beliefs */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Think</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Four principles that govern every system we build and every engagement we run.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {beliefs.map(({ Icon, title, body }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[#0A1628] p-8 border border-[#1E2D4A] rounded-2xl hover:border-[#4AC4E0]/30 transition-colors duration-300"
                >
                  <div
                    className="mb-5 rounded-2xl flex items-center justify-center"
                    style={{ width: 64, height: 64, background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)", border: "1px solid rgba(74,196,224,0.4)", boxShadow: "0 0 28px rgba(74,196,224,0.2), inset 0 1px 0 rgba(255,255,255,0.05)" }}
                  >
                    <Icon size={30} color="#4AC4E0" weight="fill" />
                  </div>
                  <h4 className="text-lg font-bold mb-3">{title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="container mx-auto px-4 py-24 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Who We Serve
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Service businesses, healthcare providers, real estate professionals, veteran-owned companies, nonprofits, and anyone with operational gaps costing them revenue they don't have to lose.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-14">
            {whoWeServe.map(({ Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#0D1B2E] border border-[#1E2D4A] hover:border-[#4AC4E0]/30 rounded-xl p-6 flex items-start gap-4 transition-colors duration-300"
              >
                <div
                  className="shrink-0 rounded-xl flex items-center justify-center"
                  style={{ width: 48, height: 48, background: "linear-gradient(145deg, rgba(74,196,224,0.22) 0%, rgba(74,196,224,0.08) 100%)", border: "1px solid rgba(74,196,224,0.4)", boxShadow: "0 0 20px rgba(74,196,224,0.16), inset 0 1px 0 rgba(255,255,255,0.04)" }}
                >
                  <Icon size={22} color="#4AC4E0" weight="fill" />
                </div>
                <div>
                  <p className="font-bold text-sm mb-1">{label}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold h-13 px-8 flex items-center gap-2">
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Book Your Revenue Audit <ArrowRight size={16} weight="bold" />
              </a>
            </Button>
            <Button size="lg" asChild variant="outline" className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/30 h-13 px-8">
              <Link href="/revenue-calculator">Calculate My Revenue Leak</Link>
            </Button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

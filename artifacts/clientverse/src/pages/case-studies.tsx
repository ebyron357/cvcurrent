import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle,
  TrendUp,
  Phone,
  Star,
  Robot,
  Wrench,
  Shield,
  Buildings,
} from "@phosphor-icons/react";

const caseStudies = [
  {
    Icon: Phone,
    tag: "AI Voice Agent + Missed Call Recovery",
    industry: "HVAC / Home Services",
    title: "47 Missed Calls a Month Turned Into $14,200 in Recovered Revenue",
    challenge:
      "An HVAC company in the southeast was missing 40–50 inbound calls every month — all after hours or during jobs when the owner couldn't pick up. The calls went to voicemail. Most never called back. The owner knew revenue was leaking but had no system to stop it.",
    solution:
      "Deployed the AI Voice Agent within 48 hours. Configured it with service pricing, booking availability, and FAQs about common HVAC issues. All after-hours calls answered in under 2 rings. Booked directly into the owner's calendar. Missed call text-back fired for any calls during business hours that still slipped through.",
    outcomes: [
      "31% increase in booked service appointments within 30 days",
      "$14,200 in recovered revenue tracked in the first 60 days",
      "After-hours bookings went from 0 to 18 per month",
      "Owner's phone interruptions dropped by 60%",
    ],
    timeline: "Live in 48 hours",
    metric: "$14,200",
    metricLabel: "Recovered in 60 days",
  },
  {
    Icon: Star,
    tag: "Reputation Management + Review Automation",
    industry: "Dental Practice",
    title: "From 3.8 Stars and 23 Reviews to 4.7 Stars and 89 Reviews in 90 Days",
    challenge:
      "A dental practice had 23 Google reviews with a 3.8-star average — largely from two unhappy patients who never got a follow-up response. Happy patients left and never thought to review. The practice was losing new patient inquiries to a competitor with 200+ reviews and a 4.9 rating.",
    solution:
      "Automated post-appointment review request via SMS (sent 4 hours after checkout, not immediately). Negative sentiment detection flagged any unhappy reply before it hit Google. All negative reviews on existing platforms got AI-drafted response templates reviewed and posted within 24 hours. 50+ platform monitoring activated.",
    outcomes: [
      "89 new reviews in 90 days — 66 new 5-star reviews",
      "Star rating improved from 3.8 to 4.7",
      "New patient inquiries increased 22% in the following quarter",
      "All 2 negative reviews professionally responded to within 24 hours",
    ],
    timeline: "Live in 24 hours",
    metric: "4.7★",
    metricLabel: "Up from 3.8 in 90 days",
  },
  {
    Icon: Robot,
    tag: "CRM Audit + AI Pipeline Management",
    industry: "Real Estate Team",
    title: "230 Dead Leads Reactivated. 8 Deals Recovered From a Broken Pipeline.",
    challenge:
      "A real estate team had accumulated 230+ stale contacts in their CRM with no follow-up, no tags, and no pipeline stages. Leads from 6–18 months ago had never received a second touch. The team had no visibility into where deals stood and no automated follow-up running.",
    solution:
      "Full CRM audit via Claude + GHL MCP in 48 hours — duplicate contacts cleaned, dead pipeline removed, stages rebuilt. A 5-touch reactivation sequence launched to all stale contacts. AI pipeline review set up weekly — stalled deals flagged, follow-up gaps identified, plain-English weekly summary delivered.",
    outcomes: [
      "8 deals recovered directly from the reactivation sequence",
      "230 contacts cleaned, tagged, and re-entered into active follow-up",
      "Pipeline visibility went from 0% to full clarity within 72 hours",
      "Weekly AI review replaced 3 hours of manual pipeline management",
    ],
    timeline: "CRM rebuilt in 48 hours",
    metric: "8 deals",
    metricLabel: "Recovered from dead pipeline",
  },
  {
    Icon: Wrench,
    tag: "System Rescue™ + Platform Consolidation",
    industry: "Veteran-Owned Roofing Company",
    title: "7 Disconnected Tools Replaced With One Platform. $1,200/mo Saved.",
    challenge:
      "A veteran-owned roofing company was running 7 separate SaaS tools — a CRM, a scheduling app, a review platform, a text service, an email tool, a proposal builder, and a separate invoicing system. Monthly cost: $1,847. None of them talked to each other. Data was manually re-entered across 4 systems.",
    solution:
      "System Rescue™ audit identified the full tech stack cost and overlap. GoHighLevel configured to replace 6 of the 7 tools entirely. AI voice agent added for missed call coverage. All client data migrated. Staff trained. Platform go-live in 7 days. Veteran-owned onboarding priority applied.",
    outcomes: [
      "$1,200/mo in SaaS costs eliminated (from $1,847 down to $647)",
      "6 tools replaced by one platform — zero data re-entry",
      "Lead close rate increased 22% from faster follow-up response",
      "7-day go-live — owner operational before the first invoice",
    ],
    timeline: "7-day go-live",
    metric: "$1,200/mo",
    metricLabel: "In SaaS costs eliminated",
  },
  {
    Icon: Shield,
    tag: "SAIG-OS™ AI Governance",
    industry: "Nonprofit Organization",
    title: "A Nonprofit Used ChatGPT With Client Data. We Stopped It Before It Became a Liability.",
    challenge:
      "A mid-size nonprofit serving vulnerable populations had 6 staff members using ChatGPT to draft case notes, client communications, and grant materials — with no policy, no data controls, and no board awareness. A routine internal audit flagged the exposure risk. They had 30 days to present a corrective action plan to their board.",
    solution:
      "SAIG-OS™ Governance framework delivered personally. Included an AI risk classification matrix, acceptable use policy, staff training protocol, data handling standards, board-ready governance summary, and a phased implementation plan. Delivered in 14 days — with 16 days to spare before the board meeting.",
    outcomes: [
      "Board-adopted AI governance policy presented on deadline",
      "6 staff trained on compliant AI use within the new framework",
      "All ChatGPT usage with client data stopped and redirected",
      "Nonprofit passed subsequent donor compliance review with zero flags",
    ],
    timeline: "Delivered in 14 days",
    metric: "Zero flags",
    metricLabel: "On donor compliance review",
  },
  {
    Icon: Buildings,
    tag: "Full COMMANDER Stack",
    industry: "Medical Spa",
    title: "From 60% No-Show Rate to 12% — and $31,000 in Recovered Appointments",
    challenge:
      "A medical spa was running a 60% no-show rate on consultations. No automated reminders. No rebooking sequences. Staff was manually calling patients to confirm — time they didn't have. Revenue impact: 3–4 empty slots per day at $300–$500 per consultation.",
    solution:
      "Full COMMANDER stack deployed: AI booking confirmation with 3-touch reminder sequence (72hr, 24hr, 2hr). No-show recovery automation fired within 15 minutes of a missed appointment. AI chatbot on website pre-qualified new consultation requests and captured leads 24/7. Review requests triggered post-visit.",
    outcomes: [
      "No-show rate dropped from 60% to 12% within 45 days",
      "$31,000 in appointment revenue recovered in first quarter",
      "43 new 5-star reviews generated in 60 days from post-visit automation",
      "Consultation bookings increased 34% from AI chatbot lead capture",
    ],
    timeline: "Live in 7 days",
    metric: "12%",
    metricLabel: "No-show rate (down from 60%)",
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-20 text-center max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-[#4AC4E0] font-bold tracking-widest uppercase mb-4"
          >
            Client Outcomes
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Real Businesses. <span className="text-[#4AC4E0]">Real Numbers.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Six anonymized client outcomes — specific services, specific timelines, specific results. No fabricated metrics. No guaranteed claims. Honest operational summaries of what was built and what changed.
          </motion.p>
        </section>

        {/* Summary stats */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-10">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "7 days", label: "Avg go-live time" },
                { value: "$31K+", label: "Most revenue recovered (single client)" },
                { value: "6 industries", label: "Represented here" },
                { value: "48 hrs", label: "Fastest deployment" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl md:text-3xl font-black text-[#4AC4E0] mb-1">{value}</p>
                  <p className="text-gray-400 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case study cards */}
        <section className="container mx-auto px-4 py-20 max-w-5xl space-y-10">
          {caseStudies.map(({ Icon, tag, industry, title, challenge, solution, outcomes, timeline, metric, metricLabel }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 }}
              className="bg-[#0D1B2E] border border-[#1E2D4A] hover:border-[#4AC4E0]/30 rounded-2xl overflow-hidden transition-colors duration-300"
              data-testid={`case-study-${i}`}
            >
              {/* Card header */}
              <div className="p-8 md:p-10 border-b border-[#1E2D4A]">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div
                    className="rounded-2xl flex items-center justify-center shrink-0"
                    style={{ width: 64, height: 64, background: "rgba(74,196,224,0.08)", border: "1.5px solid rgba(74,196,224,0.5)", boxShadow: "0 0 20px rgba(74,196,224,0.15)" }}
                  >
                    <Icon size={30} color="#4AC4E0" weight="duotone" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-[#4AC4E0] bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">{tag}</span>
                      <span className="text-gray-500 text-xs border border-[#1E2D4A] px-2.5 py-0.5 rounded-full">{industry}</span>
                      <span className="text-gray-500 text-xs border border-[#1E2D4A] px-2.5 py-0.5 rounded-full">{timeline}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold leading-snug">{title}</h2>
                  </div>
                  {/* Metric callout */}
                  <div className="shrink-0 bg-[#0A1628] border border-[#4AC4E0]/20 rounded-xl px-6 py-4 text-center min-w-[120px]">
                    <p className="text-2xl font-black text-[#4AC4E0]">{metric}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-tight">{metricLabel}</p>
                  </div>
                </div>
              </div>

              {/* Challenge + Solution + Outcomes */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E2D4A]">
                <div className="p-8 md:p-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">The Challenge</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{challenge}</p>
                </div>
                <div className="p-8 md:p-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">What We Built</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{solution}</p>
                </div>
                <div className="p-8 md:p-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#4AC4E0] mb-4">The Outcomes</p>
                  <ul className="space-y-3">
                    {outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <CheckCircle size={14} weight="duotone" color="#4AC4E0" className="mt-0.5 shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D1B2E] border border-[#4AC4E0]/20 rounded-2xl p-10 md:p-14"
          >
            <TrendUp size={36} color="#4AC4E0" weight="duotone" className="mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What's your revenue leak number?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
              Book a free Revenue Audit. In 30 minutes we'll map your exact gaps, put a dollar value on each one, and show you what gets fixed first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold px-8 h-13 flex items-center gap-2"
                data-testid="case-studies-cta"
              >
                <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                  Book Your Revenue Audit <ArrowRight size={16} weight="bold" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#1E2D4A] text-white hover:border-[#4AC4E0]/30 h-13 px-8">
                <Link href="/revenue-calculator">Calculate Mine First</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

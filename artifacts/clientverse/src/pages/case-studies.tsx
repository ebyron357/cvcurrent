import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const caseStudies = [
  {
    tag: "System Rescue™",
    title: "Untangling a 3-Year CRM Disaster",
    industry: "Professional Services",
    challenge: "A consulting firm had accumulated three years of duplicate contacts, broken automations, and unmaintained pipelines across a CRM that nobody trusted. Sales reps were maintaining their own spreadsheets instead.",
    outcome: "Full CRM audit, data deduplication, pipeline rebuild, automation cleanup, and team training. The CRM became the single source of truth within 60 days.",
  },
  {
    tag: "Growth Systems",
    title: "Building a Lead Machine From Scratch",
    industry: "B2B SaaS",
    challenge: "A founder-led sales motion with no repeatable process. Every lead was handled differently. Follow-up was inconsistent. Close rates were unpredictable.",
    outcome: "Designed and built a full inbound + outbound system: lead scoring, automated sequences, pipeline stages, handoff protocols, and a reporting dashboard that showed real performance.",
  },
  {
    tag: "AI Services",
    title: "Deploying AI Across the Support Function",
    industry: "E-commerce",
    challenge: "A growing e-commerce brand was spending 40+ hours per week on customer support tickets that followed predictable patterns. The team was burned out and response times were slipping.",
    outcome: "Implemented an AI-assisted support workflow that handled 70% of ticket volume automatically, with clean escalation paths for complex issues. Response time dropped from hours to minutes.",
  },
  {
    tag: "Scale Systems",
    title: "Operationalizing a 50-Person Team",
    industry: "Agency",
    challenge: "A marketing agency had grown from 5 to 50 people in 18 months. Project management was chaos, delivery was inconsistent, and the founder was still the critical path for every decision.",
    outcome: "Built a complete operational infrastructure: project tracking, resource allocation, delivery standards, reporting cadences, and delegation frameworks. The founder stepped out of day-to-day delivery.",
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-16">
            <p className="text-[#4AC4E0] font-semibold uppercase tracking-widest text-sm mb-4">Case Studies</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Operations Transformed.<br />
              <span className="text-[#4AC4E0]">Results That Last.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl">
              Real engagements. Real outcomes. No fabricated metrics or guaranteed claims — just honest summaries of the work and what it produced.
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, i) => (
              <div
                key={i}
                className="bg-[#132038] border border-white/10 rounded-xl p-10 hover:border-[#4AC4E0]/30 transition-all duration-300"
                data-testid={`case-study-${i}`}
              >
                <div className="flex items-start gap-6 flex-col md:flex-row">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#4AC4E0] text-xs font-semibold uppercase tracking-widest">{study.tag}</span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/40 text-xs uppercase tracking-wider">{study.industry}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-6">{study.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-[#4AC4E0] text-xs font-semibold uppercase tracking-wider mb-2">The Challenge</p>
                        <p className="text-white/65 leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <p className="text-[#4AC4E0] text-xs font-semibold uppercase tracking-wider mb-2">The Outcome</p>
                        <p className="text-white/65 leading-relaxed">{study.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-white/60 mb-8 text-lg">
              Ready to be the next transformation story?
            </p>
            <a
              href="https://calendly.com/clientverse/strategy-call"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#4AC4E0] text-[#0A1628] font-bold px-10 py-4 rounded-lg hover:bg-[#3bb1cc] transition-colors"
              data-testid="case-studies-cta"
            >
              Book a Systems Review
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";

const insights = [
  {
    type: "Article",
    title: "The 5 Automation Wins Every Service Business Should Build First",
    description: "Not all automation is created equal. These five workflows deliver the highest leverage for HVAC, dental, real estate, and home services — fast setup, immediate impact, easy maintenance.",
    href: "/blog/automation-before-ai",
  },
  {
    type: "Framework",
    title: "The Systems Audit Framework: How We Diagnose an Operation",
    description: "A walkthrough of the diagnostic methodology we use in every Systems Review. Adapt it for your own team or use it to prepare for an engagement.",
    href: "/blog/what-is-a-systems-review",
  },
  {
    type: "Article",
    title: "CRM Architecture 101: Why Your Data Model Matters More Than Your Platform",
    description: "The tool is the last decision, not the first. Here's how to think about CRM architecture before you pick a platform.",
    href: "/blog/why-most-crms-fail",
  },
  {
    type: "Strategy",
    title: "When to Hire vs. When to Systemize: The Operator's Decision Framework",
    description: "Adding headcount solves people problems. Adding systems solves process problems. Knowing which one you have changes everything.",
    href: "/blog/growth-vs-scale-systems",
  },
];

export default function Insights() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-16">
            <p className="text-[#4AC4E0] font-semibold uppercase tracking-widest text-sm mb-4">Insights & Resources</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Operational Intelligence<br />
              <span className="text-[#4AC4E0]">for Serious Operators.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl">
              Frameworks, breakdowns, and field notes from the team that builds and runs business infrastructure.
            </p>
          </div>

          <div className="space-y-6">
            {insights.map((item, i) => (
              <Link href={item.href} key={i}>
                <article
                  className="bg-[#132038] border border-white/10 rounded-xl p-8 hover:border-[#4AC4E0]/40 transition-all duration-300 cursor-pointer group flex items-start gap-8"
                  data-testid={`insight-item-${i}`}
                >
                  <div className="flex-1">
                    <span className="text-[#4AC4E0] text-xs font-semibold uppercase tracking-widest mb-3 block">{item.type}</span>
                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#4AC4E0] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="text-[#4AC4E0] text-2xl font-light mt-1 opacity-60 group-hover:opacity-100 transition-opacity">→</div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const resources = [
  {
    category: "Templates",
    items: [
      {
        title: "Systems Audit Checklist",
        description: "A 40-point checklist for auditing your current operational stack — tech tools, automations, data flows, and team processes.",
        cta: "Download",
      },
      {
        title: "CRM Architecture Worksheet",
        description: "Map your pipeline stages, field requirements, and ownership model before touching your CRM. Prevents the most common implementation failures.",
        cta: "Download",
      },
      {
        title: "Automation ROI Calculator",
        description: "Estimate the time and cost savings from automating specific workflows. Use it to prioritize your automation roadmap.",
        cta: "Download",
      },
    ],
  },
  {
    category: "Guides",
    items: [
      {
        title: "The Operator's Guide to AI Integration",
        description: "How to responsibly evaluate, pilot, and operationalize AI tools in a business environment without creating new dependencies or risks.",
        cta: "Read",
      },
      {
        title: "From Chaos to System: A 90-Day Operations Playbook",
        description: "A stage-by-stage guide to stabilizing and then scaling a business operation. Written for operators who've outgrown their current setup.",
        cta: "Read",
      },
    ],
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-16">
            <p className="text-[#4AC4E0] font-semibold uppercase tracking-widest text-sm mb-4">Resources</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tools for<br />
              <span className="text-[#4AC4E0]">Operational Excellence.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl">
              Practical templates, checklists, and guides to help you build and maintain a well-run operation.
            </p>
          </div>

          <div className="space-y-16">
            {resources.map((section) => (
              <div key={section.category}>
                <h2 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-white/10">{section.category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#132038] border border-white/10 rounded-xl p-8 hover:border-[#4AC4E0]/40 transition-all duration-300 flex flex-col"
                      data-testid={`resource-item-${section.category.toLowerCase()}-${i}`}
                    >
                      <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed flex-1 mb-6">{item.description}</p>
                      <a
                        href="https://calendly.com/clientverse/strategy-call"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[#4AC4E0] text-sm font-semibold hover:gap-3 transition-all"
                        data-testid={`resource-cta-${i}`}
                      >
                        {item.cta} via consultation →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 bg-[#132038] border border-[#4AC4E0]/20 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need a custom resource?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Every operation is different. Book a Systems Review and we'll map your specific situation and identify exactly what you need to build.
            </p>
            <a
              href="https://calendly.com/clientverse/strategy-call"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#4AC4E0] text-[#0A1628] font-bold px-10 py-4 rounded-lg hover:bg-[#3bb1cc] transition-colors"
              data-testid="resources-cta"
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

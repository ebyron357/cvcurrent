import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5">
        <circle cx="9" cy="9" r="8" stroke="#4AC4E0" strokeWidth="1.2" opacity="0.4" />
        <path d="M5.5 9 L7.5 11.5 L12.5 6" stroke="#4AC4E0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-sm text-gray-300">{text}</span>
    </li>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="ml-2 shrink-0">
      <path d="M3 9 H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 4.5 L15 9 L10 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const serviceCategories = [
  {
    id: "growth",
    title: "Growth Systems",
    description: "Systems designed to generate pipeline, track leads, and close deals predictably.",
    features: ["CRM Implementation", "Lead Scoring", "Pipeline Automation", "Sales Dashboards"],
  },
  {
    id: "scale",
    title: "Scale Systems",
    description: "Infrastructure that handles increasing volume without breaking or requiring more headcount.",
    features: ["Process Standardization", "Capacity Planning", "Automated Onboarding", "Fulfillment Workflows"],
  },
  {
    id: "enterprise",
    title: "Enterprise Systems",
    description: "Custom, complex operational ecosystems for mature organizations.",
    features: ["ERP Integration", "Data Warehousing", "Custom Applications", "Security Compliance"],
  },
  {
    id: "ai-services",
    title: "AI Services",
    description: "Practical artificial intelligence deployment to reduce manual work.",
    features: ["Custom AI Agents", "Support Automation", "Content Generation", "Data Analysis"],
  },
  {
    id: "content",
    title: "Content & Social Media",
    description: "Engines that distribute your message across channels automatically.",
    features: ["Distribution Workflows", "Asset Management", "Scheduling Systems", "Performance Tracking"],
  },
  {
    id: "web",
    title: "Websites, Funnels & E-commerce",
    description: "High-converting digital storefronts connected directly to your operations.",
    features: ["Conversion Optimization", "Payment Infrastructure", "Inventory Sync", "Analytics Setup"],
  },
  {
    id: "consulting",
    title: "Business Systems & Consulting",
    description: "Strategic guidance on how to architect your company for maximum efficiency.",
    features: ["Tech Stack Audits", "Process Mapping", "Vendor Selection", "Change Management"],
  },
  {
    id: "outsourcing",
    title: "Outsourcing & Partnerships",
    description: "Connecting your automated systems with reliable human operators.",
    features: ["BPO Integration", "SOP Documentation", "Quality Assurance", "Communication Hubs"],
  },
  {
    id: "support",
    title: "Ongoing Support & Optimization",
    description: "Continuous improvement and maintenance of your operational backbone.",
    features: ["System Monitoring", "Iterative Improvements", "Helpdesk Support", "Performance Reviews"],
  },
];

export default function Services() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        {/* Header */}
        <section className="container mx-auto px-4 pt-16 pb-20 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            What We Build, Repair, and <span className="text-[#4AC4E0]">Operate.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Comprehensive operational engineering. From the front-end funnel to the back-office database.
          </motion.p>
        </section>

        {/* System Rescue Block */}
        <section id="system-rescue" className="bg-[#4AC4E0] text-[#0A1628] py-24 my-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">System Rescue™</h2>
              <p className="text-xl font-medium mb-12 opacity-90">
                Is your current tech stack a mess? We specialize in untangling, fixing, and migrating broken operations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Audit™", body: "Comprehensive review of existing broken systems to identify bottlenecks and failure points." },
                  { title: "Cleanup™", body: "Data sanitization, removing redundant tools, and simplifying complex zaps/automations." },
                  { title: "Rebuild™", body: "Re-engineering processes from the ground up using best-in-class architecture." },
                  { title: "Migration™ & Optimization™", body: "Moving data safely to new platforms and continuously tuning for peak performance." },
                ].map((item) => (
                  <div key={item.title} className="bg-[#0A1628]/10 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Button size="lg" asChild className="bg-[#0A1628] hover:bg-[#132038] text-white font-bold h-14 px-8">
                  <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer" className="flex items-center">
                    Request a Rescue Audit <ArrowRight />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Standard Services */}
        <section className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCategories.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#0D1B2E] border border-[#1E2D4A] p-8 rounded-2xl flex flex-col hover:border-[#4AC4E0]/30 transition-colors duration-300"
              >
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6 flex-1 text-sm leading-relaxed">{service.description}</p>

                <ul className="space-y-2.5">
                  {service.features.map((feature, i) => (
                    <CheckItem key={i} text={feature} />
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 py-24 text-center border-t border-[#1E2D4A]">
          <h2 className="text-3xl font-bold mb-6">Ready to engineer your operations?</h2>
          <Button size="lg" asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-lg px-8 h-14">
            <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
              Book a Systems Review
            </a>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, GitBranch, Megaphone, Gear, CheckCircle } from "@phosphor-icons/react";

const capabilities = [
  {
    Icon: Brain,
    title: "AI & Automation",
    description: "Intelligent workflows that replace repetitive manual labor.",
    items: [
      "Zapier & Make architecture",
      "Custom API integrations",
      "LLM-powered text extraction & parsing",
      "Automated reporting generation",
    ],
  },
  {
    Icon: GitBranch,
    title: "CRM & Pipelines",
    description: "Structured environments for managing relationships at scale.",
    items: [
      "Platform-agnostic CRM setup",
      "Lead scoring & routing logic",
      "Deal stage automation",
      "Historical data migration",
    ],
  },
  {
    Icon: Megaphone,
    title: "Marketing & Reviews",
    description: "Systems to amplify reach and capture customer sentiment.",
    items: [
      "Multi-channel drip campaigns",
      "Automated review requests",
      "Social media distribution workflows",
      "Attribution tracking",
    ],
  },
  {
    Icon: Gear,
    title: "Operations & Payments",
    description: "The financial and fulfillment backbone of your business.",
    items: [
      "Stripe & payment gateway integration",
      "Automated invoicing & dunning",
      "Client onboarding sequences",
      "Contract & e-signature automation",
    ],
  },
];

export default function Features() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        <section className="container mx-auto px-4 pt-16 pb-20 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Technical <span className="text-[#4AC4E0]">Capabilities</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            We don't sell software. We engineer solutions. Here is the technical foundation of what we implement.
          </motion.p>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {capabilities.map(({ Icon, title, description, items }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative bg-[#0D1B2E] border border-[#1E2D4A] p-10 rounded-2xl group hover:border-[#4AC4E0]/40 transition-colors duration-300"
                style={{ isolation: "isolate" }}
              >
                <div
                  className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{ background: "radial-gradient(circle, rgba(74,196,224,0.1) 0%, transparent 70%)" }}
                />

                {/* Icon tile */}
                <div className="mb-8">
                  <div
                    className="rounded-2xl flex items-center justify-center"
                    style={{
                      width: 72,
                      height: 72,
                      background: "rgba(74,196,224,0.08)",
                      border: "1.5px solid rgba(74,196,224,0.5)",
                      boxShadow: "0 0 20px rgba(74,196,224,0.15)",
                    }}
                  >
                    <Icon size={36} color="#4AC4E0" weight="duotone" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">{description}</p>

                <ul className="space-y-3">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle size={18} color="#4AC4E0" weight="duotone" className="shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-24 text-center border-t border-[#1E2D4A] mt-12">
          <h2 className="text-3xl font-bold mb-6">Need a specific technical solution?</h2>
          <Button size="lg" asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-lg px-8 h-14">
            <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
              Discuss Your Stack
            </a>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

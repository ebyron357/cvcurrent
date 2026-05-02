import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Settings, Cpu, LineChart, CreditCard } from "lucide-react";

export default function Features() {
  const capabilities = [
    {
      icon: <Cpu className="w-8 h-8 text-[#4AC4E0]" />,
      title: "AI & Automation",
      description: "Intelligent workflows that replace repetitive manual labor.",
      items: [
        "Zapier & Make architecture",
        "Custom API integrations",
        "LLM-powered text extraction & parsing",
        "Automated reporting generation"
      ]
    },
    {
      icon: <LineChart className="w-8 h-8 text-[#4AC4E0]" />,
      title: "CRM & Pipelines",
      description: "Structured environments for managing relationships at scale.",
      items: [
        "Platform-agnostic CRM setup",
        "Lead scoring & routing logic",
        "Deal stage automation",
        "Historical data migration"
      ]
    },
    {
      icon: <Settings className="w-8 h-8 text-[#4AC4E0]" />,
      title: "Marketing & Reviews",
      description: "Systems to amplify reach and capture customer sentiment.",
      items: [
        "Multi-channel drip campaigns",
        "Automated review requests",
        "Social media distribution workflows",
        "Attribution tracking"
      ]
    },
    {
      icon: <CreditCard className="w-8 h-8 text-[#4AC4E0]" />,
      title: "Operations & Payments",
      description: "The financial and fulfillment backbone of your business.",
      items: [
        "Stripe & payment gateway integration",
        "Automated invoicing & dunning",
        "Client onboarding sequences",
        "Contract & e-signature automation"
      ]
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {capabilities.map((cap, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#132038] border border-[#1E2D4A] p-10 rounded-lg"
              >
                <div className="mb-6 bg-[#0A1628] w-16 h-16 rounded-lg flex items-center justify-center border border-[#1E2D4A]">
                  {cap.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{cap.title}</h3>
                <p className="text-gray-400 mb-8">{cap.description}</p>
                <ul className="space-y-3">
                  {cap.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4AC4E0]" />
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

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Pricing() {
  const models = [
    {
      title: "Build",
      description: "For companies that need a specific system built from scratch and handed over.",
      ideal: "New divisions, specific isolated processes, rapid deployments."
    },
    {
      title: "System Rescue™",
      description: "For established companies with tangled, broken, or undocumented legacy systems.",
      ideal: "Companies stuck in technical debt, messy CRM migrations."
    },
    {
      title: "Operate",
      description: "Retained partnership where we manage, monitor, and optimize your systems continually.",
      ideal: "Companies without an internal operations or RevOps team."
    },
    {
      title: "Enterprise Systems",
      description: "Complex, multi-department operational architecture with deep custom engineering.",
      ideal: "$10M+ companies requiring stringent compliance and massive scale."
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
            Scoped to Your Operation. <br/><span className="text-[#4AC4E0]">Not Off a Menu.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            We don't sell generic subscription tiers. We diagnose your bottleneck and scope a precise engineering engagement.
          </motion.p>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {models.map((model, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#132038] border border-[#1E2D4A] p-10 rounded-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4AC4E0]/5 rounded-bl-full -mr-4 -mt-4" />
                <h3 className="text-2xl font-bold mb-4">{model.title}</h3>
                <p className="text-gray-400 mb-6 text-lg">{model.description}</p>
                <div className="pt-6 border-t border-[#1E2D4A]">
                  <p className="text-sm text-gray-300">
                    <span className="text-[#4AC4E0] font-semibold">Ideal for:</span> {model.ideal}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-24 text-center mt-12">
          <div className="max-w-3xl mx-auto bg-[#132038] border border-[#1E2D4A] rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6">Let's scope your project.</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Everything begins with a Systems Review. We look at your current architecture, map the failure points, and propose a concrete path forward.
            </p>
            <Button size="lg" asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-lg px-8 h-14 w-full md:w-auto">
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Book a Systems Review
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

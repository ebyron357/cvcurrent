import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const models = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="17" width="6" height="7" rx="1.5" fill="#4AC4E0" opacity="0.45" />
        <rect x="11" y="11" width="6" height="13" rx="1.5" fill="#4AC4E0" opacity="0.72" />
        <rect x="18" y="5" width="6" height="19" rx="1.5" fill="#4AC4E0" />
      </svg>
    ),
    title: "Build",
    description: "For companies that need a specific system built from scratch and handed over.",
    ideal: "New divisions, specific isolated processes, rapid deployments.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M18 4.5C21 4.5 23.5 7 23.5 10C23.5 12.5 21.9 14.6 19.7 15.4L22.8 18.5C23.6 19.3 23.6 20.6 22.8 21.4L21.4 22.8C20.6 23.6 19.3 23.6 18.5 22.8L15.4 19.7C14.6 21.9 12.5 23.5 10 23.5C7 23.5 4.5 21 4.5 18C4.5 16 5.5 14.2 7.1 13.1L10.8 16.8C11.4 17.4 12.3 17.4 12.9 16.8L16.8 12.9C17.4 12.3 17.4 11.4 16.8 10.8L13.1 7.1C14.2 5.5 16 4.5 18 4.5Z" fill="#4AC4E0" />
      </svg>
    ),
    title: "System Rescue™",
    description: "For established companies with tangled, broken, or undocumented legacy systems.",
    ideal: "Companies stuck in technical debt, messy CRM migrations.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="4.5" fill="#4AC4E0" />
        <circle cx="14" cy="14" r="9" stroke="#4AC4E0" strokeWidth="1.4" opacity="0.35" strokeDasharray="3.5 2.5" />
        <line x1="14" y1="5" x2="14" y2="3" stroke="#4AC4E0" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="25" x2="14" y2="23" stroke="#4AC4E0" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="14" x2="3" y2="14" stroke="#4AC4E0" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="14" x2="23" y2="14" stroke="#4AC4E0" strokeWidth="2" strokeLinecap="round" />
        <line x1="7.9" y1="7.9" x2="6.5" y2="6.5" stroke="#4AC4E0" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
        <line x1="21.5" y1="21.5" x2="20.1" y2="20.1" stroke="#4AC4E0" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
        <line x1="20.1" y1="7.9" x2="21.5" y2="6.5" stroke="#4AC4E0" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
        <line x1="6.5" y1="21.5" x2="7.9" y2="20.1" stroke="#4AC4E0" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    title: "Operate",
    description: "Retained partnership where we manage, monitor, and optimize your systems continually.",
    ideal: "Companies without an internal operations or RevOps team.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="8" width="22" height="14" rx="3" stroke="#4AC4E0" strokeWidth="1.8" />
        <rect x="7" y="12" width="14" height="3" rx="1.5" fill="#4AC4E0" opacity="0.8" />
        <rect x="7" y="17" width="9" height="2" rx="1" fill="#4AC4E0" opacity="0.5" />
        <circle cx="20" cy="18" r="2" fill="#4AC4E0" opacity="0.75" />
        <path d="M11 24 L17 24" stroke="#4AC4E0" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
        <path d="M14 22 L14 24" stroke="#4AC4E0" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    title: "Enterprise Systems",
    description: "Complex, multi-department operational architecture with deep custom engineering.",
    ideal: "$10M+ companies requiring stringent compliance and massive scale.",
  },
];

export default function Pricing() {
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
            Scoped to Your Operation. <br />
            <span className="text-[#4AC4E0]">Not Off a Menu.</span>
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
                className="bg-[#0D1B2E] border border-[#1E2D4A] p-10 rounded-2xl relative hover:border-[#4AC4E0]/30 transition-colors duration-300"
                style={{ isolation: "isolate" }}
              >
                {/* Icon tile */}
                <div
                  className="mb-6 rounded-xl flex items-center justify-center"
                  style={{
                    width: 60,
                    height: 60,
                    background: "#0d2d44",
                    border: "2px solid #4AC4E0",
                    boxShadow: "0 0 14px rgba(74,196,224,0.22)",
                  }}
                >
                  {model.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">{model.title}</h3>
                <p className="text-gray-400 mb-6 text-base leading-relaxed">{model.description}</p>
                <div className="pt-5 border-t border-[#1E2D4A]">
                  <p className="text-sm text-gray-300">
                    <span className="text-[#4AC4E0] font-semibold">Ideal for: </span>
                    {model.ideal}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-24 text-center mt-12">
          <div className="max-w-3xl mx-auto bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl p-12">
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

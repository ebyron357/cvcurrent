import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChartBar, Wrench, Gauge } from "@phosphor-icons/react";

const pillars = [
  {
    Icon: ChartBar,
    label: "Build",
    body: "We construct scalable, reliable systems from the ground up, tailored perfectly to your operational needs. No off-the-shelf compromises.",
  },
  {
    Icon: Wrench,
    label: "Repair",
    body: "Through our System Rescue™ protocol, we untangle messy tech stacks, fix broken automations, and restore order to your backend.",
  },
  {
    Icon: Gauge,
    label: "Operate",
    body: "We don't just hand you the keys and leave. We maintain, optimize, and run the infrastructure so you can focus on growth.",
  },
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-16 pb-24 md:pt-32 md:pb-40 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            The Operational Backbone <br className="hidden md:block" />
            <span className="text-[#4AC4E0]">Your Company Has Been Missing.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            We build, repair, and operate business systems, automation, AI, and infrastructure for companies ready to scale.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <Button
              size="lg"
              asChild
              className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-lg px-10 h-14"
            >
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Book a Systems Review
              </a>
            </Button>
          </motion.div>
        </section>

        {/* Pillars */}
        <section className="bg-[#0D1B2E] border-y border-[#1E2D4A] py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pillars.map(({ Icon, label, body }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-[#0A1628] border border-[#1E2D4A] p-8 rounded-2xl group hover:border-[#4AC4E0]/40 transition-colors duration-300"
                  style={{ isolation: "isolate" }}
                >
                  <div
                    className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    style={{ background: "radial-gradient(circle, rgba(74,196,224,0.08) 0%, transparent 70%)" }}
                  />

                  {/* Icon tile */}
                  <div
                    className="mb-6 rounded-2xl flex items-center justify-center"
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

                  <h3 className="text-2xl font-bold mb-4">{label}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

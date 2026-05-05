import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function IconBuild() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="19" width="7" height="9" rx="2" fill="#4AC4E0" opacity="0.45" />
      <rect x="12.5" y="11" width="7" height="17" rx="2" fill="#4AC4E0" opacity="0.72" />
      <rect x="21" y="4" width="7" height="24" rx="2" fill="#4AC4E0" />
    </svg>
  );
}

function IconRepair() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M21 5C24.3 5 27 7.7 27 11C27 13.7 25.2 16 22.8 16.9L26.5 20.6C27.4 21.5 27.4 23 26.5 23.9L23.9 26.5C23 27.4 21.5 27.4 20.6 26.5L16.9 22.8C16 25.2 13.7 27 11 27C7.7 27 5 24.3 5 21C5 18.8 6.1 16.8 7.8 15.6L12.1 19.9C12.8 20.6 13.9 20.6 14.6 19.9L19.9 14.6C20.6 13.9 20.6 12.8 19.9 12.1L15.6 7.8C16.8 6.1 18.8 5 21 5Z"
        fill="#4AC4E0"
      />
    </svg>
  );
}

function IconOperate() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="5" fill="#4AC4E0" />
      <circle cx="16" cy="16" r="10.5" stroke="#4AC4E0" strokeWidth="1.4" opacity="0.35" strokeDasharray="3.5 2.5" />
      <line x1="16" y1="5.5" x2="16" y2="3" stroke="#4AC4E0" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="16" y1="29" x2="16" y2="26.5" stroke="#4AC4E0" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="5.5" y1="16" x2="3" y2="16" stroke="#4AC4E0" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="29" y1="16" x2="26.5" y2="16" stroke="#4AC4E0" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8.8" y1="8.8" x2="7" y2="7" stroke="#4AC4E0" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
      <line x1="25" y1="25" x2="23.2" y2="23.2" stroke="#4AC4E0" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
      <line x1="23.2" y1="8.8" x2="25" y2="7" stroke="#4AC4E0" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
      <line x1="7" y1="25" x2="8.8" y2="23.2" stroke="#4AC4E0" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

const pillars = [
  {
    Icon: IconBuild,
    label: "Build",
    body: "We construct scalable, reliable systems from the ground up, tailored perfectly to your operational needs. No off-the-shelf compromises.",
  },
  {
    Icon: IconRepair,
    label: "Repair",
    body: "Through our System Rescue™ protocol, we untangle messy tech stacks, fix broken automations, and restore order to your backend.",
  },
  {
    Icon: IconOperate,
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
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            We build, repair, and operate business systems, automation, AI, and infrastructure for companies ready to scale.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              asChild
              className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-lg px-8 h-14"
              data-testid="hero-cta"
            >
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Book a Systems Review
              </a>
            </Button>
          </motion.div>
        </section>

        {/* Value Pillars */}
        <section className="border-y border-[#1E2D4A] bg-[#0D1B2E]/60 py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map(({ Icon, label, body }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-8 bg-[#0D1B2E] border border-[#1E2D4A] rounded-2xl overflow-hidden group hover:border-[#4AC4E0]/40 transition-colors duration-300"
                >
                  <div
                    className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle, rgba(74,196,224,0.1) 0%, transparent 70%)" }}
                  />

                  {/* Icon tile */}
                  <div
                    className="mb-6 rounded-2xl flex items-center justify-center"
                    style={{
                      width: 60,
                      height: 60,
                      background: "#0d2d44",
                      border: "2px solid #4AC4E0",
                      boxShadow: "0 0 14px rgba(74,196,224,0.22)",
                    }}
                  >
                    <Icon />
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

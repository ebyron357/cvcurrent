import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowsInSimple, Database, Robot, HardHat } from "@phosphor-icons/react";

const beliefs = [
  {
    Icon: ArrowsInSimple,
    title: "Simplicity scales. Complexity breaks.",
    body: "We ruthlessly eliminate redundant tools and convoluted workflows. If it takes 5 steps to do what could be done in 1, it's broken.",
  },
  {
    Icon: Database,
    title: "Data must be sovereign.",
    body: "Your systems should have a single source of truth. Siloed data is useless data. We ensure information flows freely and accurately.",
  },
  {
    Icon: Robot,
    title: "AI is a tool, not magic.",
    body: "We deploy AI where it actually saves time and money, not just for the sake of using a buzzword. Practical application over hype.",
  },
  {
    Icon: HardHat,
    title: "Operators, not just architects.",
    body: "A system is only as good as its maintenance. We stand by what we build and ensure it continues to run smoothly under pressure.",
  },
];

export default function About() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32">
        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-20 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            A Full Operational Ecosystem. <span className="text-[#4AC4E0]">Built to Run.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            We exist to solve the fundamental scaling problem: growing revenue faster than operational chaos.
          </motion.p>
        </section>

        {/* The Problem & Mission */}
        <section className="bg-[#132038]/50 border-y border-[#1E2D4A] py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-24">
              <div>
                <h2 className="text-[#4AC4E0] font-bold tracking-wider uppercase mb-4 text-sm">The Problem</h2>
                <h3 className="text-3xl font-bold mb-6">Companies outgrow their infrastructure before they realize it.</h3>
                <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
                  <p>It usually starts small. A few missed follow-ups. A zap that silently breaks. A spreadsheet that gets too heavy.</p>
                  <p>Suddenly, your team is spending 40% of their week doing manual data entry, fighting with incompatible software, and patching leaks in your funnel. Growth stalls not because you can't sell, but because your operations can't deliver.</p>
                </div>
              </div>

              <div>
                <h2 className="text-[#4AC4E0] font-bold tracking-wider uppercase mb-4 text-sm">Our Mission</h2>
                <h3 className="text-3xl font-bold mb-6">To be the operational backbone for ambitious companies.</h3>
                <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
                  <p>ClientVerse doesn't just "set up software." We architect resilient ecosystems that handle volume effortlessly. We turn fragile, human-dependent processes into robust, automated machinery.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Beliefs */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Beliefs</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {beliefs.map(({ Icon, title, body }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[#0D1B2E] p-8 border border-[#1E2D4A] rounded-2xl hover:border-[#4AC4E0]/30 transition-colors duration-300"
                >
                  <div
                    className="mb-5 rounded-2xl flex items-center justify-center"
                    style={{
                      width: 64,
                      height: 64,
                      background: "rgba(74,196,224,0.08)",
                      border: "1.5px solid rgba(74,196,224,0.5)",
                      boxShadow: "0 0 16px rgba(74,196,224,0.12)",
                    }}
                  >
                    <Icon size={30} color="#4AC4E0" weight="duotone" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">{title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="bg-[#132038]/50 border-t border-[#1E2D4A] py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Who We Serve</h2>
            <p className="text-xl text-gray-400 mb-12">
              We partner with B2B companies, agencies, high-ticket services, and scaling e-commerce brands doing $1M–$50M in revenue who realize their internal operations are the bottleneck to their next milestone.
            </p>
            <Button size="lg" asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-lg px-8 h-14">
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

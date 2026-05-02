import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";

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
            The Operational Backbone <br className="hidden md:block"/>
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
            <Button size="lg" asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-lg px-8 h-14" data-testid="hero-cta">
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Book a Systems Review
              </a>
            </Button>
          </motion.div>
        </section>

        {/* Value Pillars */}
        <section className="border-y border-[#1E2D4A] bg-[#132038]/50 py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="p-8 bg-[#132038] border border-[#1E2D4A] rounded-lg">
                <div className="w-12 h-12 bg-[#4AC4E0]/10 rounded flex items-center justify-center mb-6">
                  <span className="text-[#4AC4E0] font-bold text-xl">01</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Build</h3>
                <p className="text-gray-400 leading-relaxed">
                  We construct scalable, reliable systems from the ground up, tailored perfectly to your operational needs. No off-the-shelf compromises.
                </p>
              </div>
              <div className="p-8 bg-[#132038] border border-[#1E2D4A] rounded-lg">
                <div className="w-12 h-12 bg-[#4AC4E0]/10 rounded flex items-center justify-center mb-6">
                  <span className="text-[#4AC4E0] font-bold text-xl">02</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Repair</h3>
                <p className="text-gray-400 leading-relaxed">
                  Through our System Rescue™ protocol, we untangle messy tech stacks, fix broken automations, and restore order to your backend.
                </p>
              </div>
              <div className="p-8 bg-[#132038] border border-[#1E2D4A] rounded-lg">
                <div className="w-12 h-12 bg-[#4AC4E0]/10 rounded flex items-center justify-center mb-6">
                  <span className="text-[#4AC4E0] font-bold text-xl">03</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Operate</h3>
                <p className="text-gray-400 leading-relaxed">
                  We don't just hand you the keys and leave. We maintain, optimize, and run the infrastructure so you can focus on growth.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

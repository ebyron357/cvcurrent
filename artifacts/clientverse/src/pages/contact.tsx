import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Contact() {
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
            Start With a <span className="text-[#4AC4E0]">Systems Review.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Stop guessing where the bottleneck is. We will map your operations and give you a technical diagnosis.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button size="lg" asChild className="bg-[#4AC4E0] hover:bg-[#3bb1cc] text-[#0A1628] font-bold text-lg px-8 h-14">
              <a href="https://calendly.com/clientverse/strategy-call" target="_blank" rel="noreferrer">
                Book a Systems Review
              </a>
            </Button>
            <p className="mt-6 text-gray-400">
              Or email us at <a href="mailto:support@clientverse.io" className="text-[#4AC4E0] hover:underline">support@clientverse.io</a>
            </p>
          </motion.div>
        </section>

        <section className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-[#1E2D4A]">
                <AccordionTrigger className="text-left text-lg hover:text-[#4AC4E0]">Are you a GoHighLevel agency?</AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed">
                  No, we are strictly platform-agnostic. While we are highly capable in platforms like GoHighLevel, Hubspot, Salesforce, and others, our job is to architect the best system for your specific operational needs, not force you into a specific software ecosystem.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-[#1E2D4A]">
                <AccordionTrigger className="text-left text-lg hover:text-[#4AC4E0]">Do you do custom software development?</AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed">
                  We build custom integrations, complex API bridges, and middleware to connect your existing tools. For full-stack native applications from scratch, we consult on architecture and can partner with development firms, but our core focus is operational orchestration and automation.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border-[#1E2D4A]">
                <AccordionTrigger className="text-left text-lg hover:text-[#4AC4E0]">How long does an engagement typically take?</AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed">
                  A System Rescue™ or initial Build project typically takes 4-8 weeks depending on complexity. Operate engagements are ongoing monthly partnerships.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

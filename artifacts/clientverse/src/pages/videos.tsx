import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";

const plannedVideos = [
  {
    title: "System Rescue™ Explained: What We Do and How It Works",
    duration: "~12 min",
    category: "Service Overview",
    description: "A full walkthrough of the System Rescue™ process — from initial audit to final handoff. What to expect, what we look for, and what gets fixed.",
  },
  {
    title: "Building Your First Automation: A Step-by-Step Walkthrough",
    duration: "~18 min",
    category: "Tutorial",
    description: "We walk through the architecture of a high-leverage service business automation from scratch — missed call response, follow-up sequences, and appointment booking.",
  },
  {
    title: "CRM Setup for Growth: The Right Way to Structure Your Pipeline",
    duration: "~22 min",
    category: "Tutorial",
    description: "The decisions that matter most when setting up or rebuilding a CRM — stages, fields, ownership, and the integrations that make it actually useful.",
  },
  {
    title: "The Systems Audit: How We Diagnose an Operation in One Day",
    duration: "~15 min",
    category: "Process",
    description: "A live demo of the Systems Audit methodology. What we look at, how we document it, and how the findings shape the engagement scope.",
  },
  {
    title: "AI Services Deep Dive: What We Build and Why",
    duration: "~20 min",
    category: "Service Overview",
    description: "An honest breakdown of AI implementation in real business operations — what works, what doesn't, and how we think about integrating AI responsibly.",
  },
];

export default function Videos() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-10">
            <p className="text-[#4AC4E0] font-semibold uppercase tracking-widest text-sm mb-4">Video Library</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Watch How<br />
              <span className="text-[#4AC4E0]">Systems Are Built.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl">
              Deep dives, walkthroughs, and breakdowns on operational systems, automation, and AI implementation.
            </p>
          </div>

          {/* Coming Soon Banner */}
          <div className="bg-[#132038] border border-[#4AC4E0]/30 rounded-2xl p-8 mb-14 flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 flex items-center justify-center flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#4AC4E0" strokeWidth="1.5"/>
                <polyline points="12,6 12,12 16,14" stroke="#4AC4E0" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-white font-bold text-lg mb-1">Video library launching soon</p>
              <p className="text-white/60 text-sm">
                These episodes are in production. In the meantime, the Revenue Audit covers the same ground — live, with your actual numbers.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#4AC4E0] text-[#0A1628] font-bold px-6 py-3 rounded-lg hover:bg-[#3bb1cc] transition-colors text-sm flex-shrink-0"
            >
              Get Notified
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plannedVideos.map((video, i) => (
              <div
                key={i}
                className="bg-[#132038] border border-white/10 rounded-xl overflow-hidden"
                data-testid={`video-item-${i}`}
              >
                {/* Thumbnail placeholder */}
                <div className="aspect-video bg-gradient-to-br from-[#0A1628] to-[#1E2D4A] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[#4AC4E0]/5"></div>
                  <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#4AC4E0]/10 border border-[#4AC4E0]/20 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <polygon points="8,5 19,12 8,19" fill="#4AC4E0" opacity="0.4"/>
                      </svg>
                    </div>
                    <span className="text-xs text-white/30 font-medium uppercase tracking-wider">Coming Soon</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white/50 text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[#4AC4E0] text-xs font-semibold uppercase tracking-wider mb-2 block">{video.category}</span>
                  <h2 className="text-lg font-bold text-white mb-2 leading-snug">
                    {video.title}
                  </h2>
                  <p className="text-white/55 text-sm leading-relaxed">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[#132038] border border-[#4AC4E0]/20 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Can't wait for the videos?</h2>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              A free Revenue Audit covers the same ground in 30 minutes — applied directly to your business.
            </p>
            <a
              href="https://calendly.com/clientverse/strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#4AC4E0] text-[#0A1628] font-bold px-8 py-4 rounded-lg hover:bg-[#3bb1cc] transition-colors"
            >
              Book Your Revenue Audit
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

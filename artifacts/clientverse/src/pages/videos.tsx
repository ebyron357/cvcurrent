import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const videos = [
  {
    title: "System Rescue™ Explained: What We Do and How It Works",
    duration: "12:04",
    category: "Service Overview",
    description: "A full walkthrough of the System Rescue™ process — from initial audit to final handoff. What to expect, what we look for, and what gets fixed.",
  },
  {
    title: "Building Your First Automation: A Step-by-Step Walkthrough",
    duration: "18:32",
    category: "Tutorial",
    description: "We walk through the architecture of a high-leverage B2B automation from scratch. Process mapping, trigger logic, conditions, actions, and testing.",
  },
  {
    title: "CRM Setup for Growth: The Right Way to Structure Your Pipeline",
    duration: "22:15",
    category: "Tutorial",
    description: "The decisions that matter most when setting up or rebuilding a CRM — stages, fields, ownership, and the integrations that make it actually useful.",
  },
  {
    title: "The Systems Audit: How We Diagnose an Operation in One Day",
    duration: "15:47",
    category: "Process",
    description: "A live demo of the Systems Audit methodology. What we look at, how we document it, and how the findings shape the engagement scope.",
  },
  {
    title: "AI Services Deep Dive: What We Build and Why",
    duration: "20:08",
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
          <div className="mb-16">
            <p className="text-[#4AC4E0] font-semibold uppercase tracking-widest text-sm mb-4">Video Library</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Watch How<br />
              <span className="text-[#4AC4E0]">Systems Are Built.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl">
              Deep dives, walkthroughs, and breakdowns on operational systems, automation, and AI implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, i) => (
              <div
                key={i}
                className="bg-[#132038] border border-white/10 rounded-xl overflow-hidden hover:border-[#4AC4E0]/30 transition-all duration-300 group cursor-pointer"
                data-testid={`video-item-${i}`}
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-[#0A1628] to-[#1E2D4A] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[#4AC4E0]/5"></div>
                  <div className="w-16 h-16 rounded-full bg-[#4AC4E0]/10 border border-[#4AC4E0]/30 flex items-center justify-center group-hover:bg-[#4AC4E0]/20 transition-colors z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <polygon points="8,5 19,12 8,19" fill="#4AC4E0"/>
                    </svg>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[#4AC4E0] text-xs font-semibold uppercase tracking-wider mb-2 block">{video.category}</span>
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-[#4AC4E0] transition-colors leading-snug">
                    {video.title}
                  </h2>
                  <p className="text-white/55 text-sm leading-relaxed">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

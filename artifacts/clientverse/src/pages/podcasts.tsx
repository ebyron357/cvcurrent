import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";

const plannedEpisodes = [
  {
    episode: "EP. 08",
    title: "The Operator's Mindset: Building Systems You Can Walk Away From",
    duration: "~42 min",
    description: "What separates founders who scale from those who plateau? It starts with how they think about systems versus people as the solution to growth problems.",
  },
  {
    episode: "EP. 07",
    title: "AI in the Back Office: What's Real, What's Hype, and What Actually Works",
    duration: "~38 min",
    description: "Separating the AI use cases that produce real leverage from the ones that add complexity without value. A practical breakdown for operators.",
  },
  {
    episode: "EP. 06",
    title: "When Your Tech Stack Becomes the Problem",
    duration: "~51 min",
    description: "How to audit the tools your business depends on, identify redundancy and debt, and make hard decisions about what to cut, keep, and rebuild.",
  },
  {
    episode: "EP. 05",
    title: "Delegation Doesn't Work Without Systems: Here's What You're Missing",
    duration: "~35 min",
    description: "Why most delegation fails — and how to build the operational infrastructure that makes real delegation possible without constant supervision.",
  },
  {
    episode: "EP. 04",
    title: "CRM as Infrastructure: Rethinking How You Think About Customer Data",
    duration: "~44 min",
    description: "The CRM isn't a sales tool. It's a data architecture decision. This episode reframes the conversation for operators who want to build something durable.",
  },
];

export default function Podcasts() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10">
            <p className="text-[#4AC4E0] font-semibold uppercase tracking-widest text-sm mb-4">Podcast</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Systems & Operators.<br />
              <span className="text-[#4AC4E0]">The Show for Builders.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl">
              Conversations about operational infrastructure, business systems, and the mindset required to build companies that run without you.
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
              <p className="text-white font-bold text-lg mb-1">Launching on Spotify & Apple Podcasts soon</p>
              <p className="text-white/60 text-sm">
                Episodes are being recorded now. Get notified when we go live — or reach out if you'd like to be a guest.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#4AC4E0] text-[#0A1628] font-bold px-6 py-3 rounded-lg hover:bg-[#3bb1cc] transition-colors text-sm flex-shrink-0"
            >
              Get Notified
            </Link>
          </div>

          <div className="space-y-4">
            {plannedEpisodes.map((ep, i) => (
              <div
                key={i}
                className="bg-[#132038] border border-white/10 rounded-xl p-8 flex items-start gap-6"
                data-testid={`podcast-episode-${i}`}
              >
                <div className="w-14 h-14 rounded-lg bg-[#4AC4E0]/10 border border-[#4AC4E0]/20 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#4AC4E0]">
                    <polygon points="5,3 19,12 5,21" fill="currentColor" opacity="0.4"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#4AC4E0] text-xs font-semibold uppercase tracking-wider">{ep.episode}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/40 text-xs">{ep.duration}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/30 text-xs font-medium uppercase tracking-wider">Coming Soon</span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2">
                    {ep.title}
                  </h2>
                  <p className="text-white/60 leading-relaxed text-sm">{ep.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[#132038] border border-[#4AC4E0]/20 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Want to be a guest?</h2>
            <p className="text-white/60 mb-6">
              We talk to operators, founders, and builders who have real things to say about running a business.
            </p>
            <a
              href="mailto:support@clientverse.io"
              className="inline-block border border-[#4AC4E0] text-[#4AC4E0] font-semibold px-8 py-3 rounded-lg hover:bg-[#4AC4E0]/10 transition-colors"
              data-testid="podcast-guest-cta"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

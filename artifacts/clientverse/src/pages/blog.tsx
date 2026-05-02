import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link } from "wouter";

const posts = [
  {
    slug: "why-most-crms-fail",
    title: "Why Most CRM Implementations Fail (And How to Fix Yours)",
    date: "April 15, 2025",
    category: "Systems",
    excerpt: "The problem isn't the software. It's the lack of process architecture behind it. Here's what proper CRM infrastructure actually looks like.",
  },
  {
    slug: "automation-before-ai",
    title: "Automate Before You AI-ify: The Order That Matters",
    date: "March 28, 2025",
    category: "Automation",
    excerpt: "AI on a broken process is just faster failure. The foundation has to be right first. Here's the sequence that actually scales.",
  },
  {
    slug: "what-is-a-systems-review",
    title: "What Happens in a Systems Review — And Why It's the First Step",
    date: "March 10, 2025",
    category: "Operations",
    excerpt: "Before we build anything, we map everything. A Systems Review is a technical diagnosis of how your business actually runs — not how you think it runs.",
  },
  {
    slug: "growth-vs-scale-systems",
    title: "Growth Systems vs. Scale Systems: What's the Difference?",
    date: "February 22, 2025",
    category: "Strategy",
    excerpt: "Growth systems get you to the next milestone. Scale systems let you operate at 10x without 10x headcount. Most companies only build the first one.",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-16">
            <p className="text-[#4AC4E0] font-semibold uppercase tracking-widest text-sm mb-4">Insights</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frameworks for Founders<br />
              <span className="text-[#4AC4E0]">Building Systems That Scale.</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl">
              Operational intelligence from the team that builds, repairs, and runs business systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <article
                  className="bg-[#132038] border border-white/10 rounded-xl p-8 hover:border-[#4AC4E0]/40 transition-all duration-300 cursor-pointer group"
                  data-testid={`blog-post-${post.slug}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[#4AC4E0] text-sm font-semibold uppercase tracking-wider">{post.category}</span>
                    <span className="text-white/30 text-sm">·</span>
                    <span className="text-white/40 text-sm">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#4AC4E0] transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 text-[#4AC4E0] text-sm font-semibold">
                    Read more →
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

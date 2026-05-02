import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link, useParams } from "wouter";

const posts: Record<string, { title: string; date: string; category: string; content: string }> = {
  "why-most-crms-fail": {
    title: "Why Most CRM Implementations Fail (And How to Fix Yours)",
    date: "April 15, 2025",
    category: "Systems",
    content: `Most CRM failures aren't software problems — they're architecture problems. The tool gets blamed, the platform gets switched, and six months later the same chaos resurfaces in a new interface.

Here's what actually goes wrong:

**No process before platform.** A CRM is a container. If you pour undefined process into a CRM, you get a digitized mess. The contacts are there. The pipeline stages are guesses. The fields are duplicated. The reports mean nothing.

**Nobody owns it.** CRM adoption dies when ownership is unclear. Who is responsible for data quality? Who audits pipeline accuracy weekly? Who trains new hires on entry standards? If the answer is "everyone," the answer is no one.

**Built for the deal, not the relationship.** Most CRM setups optimize for closing — not for retention, upsell, or referral. That means the system is abandoned the moment a deal closes. The operational intelligence you need to grow is trapped in the pipeline view, not surfaced where it matters.

**What proper CRM infrastructure looks like:**

1. Process-first architecture — every stage, field, and automation mapped before a single contact is imported
2. Clear ownership model — named individuals responsible for data integrity
3. Full-lifecycle design — the CRM serves the entire customer relationship, not just the sales motion
4. Automated hygiene — rules that prevent garbage data from entering, not just cleaning it up after

If your CRM feels like overhead instead of infrastructure, the system isn't wrong — it was never set up right. A Systems Review surfaces this within the first hour.`,
  },
  "automation-before-ai": {
    title: "Automate Before You AI-ify: The Order That Matters",
    date: "March 28, 2025",
    category: "Automation",
    content: `Everyone wants AI. Almost no one is ready for it.

AI amplifies what already exists in your operations. If your lead follow-up is inconsistent, AI makes it inconsistently faster. If your reporting is unreliable, AI makes unreliable reports appear faster. The leverage is real — and so is the downside.

**The right sequence:**

1. **Document the process.** You cannot automate or augment what you haven't defined. Start by mapping every repeating workflow in plain language — inputs, outputs, decision points, handoffs.

2. **Automate the repetitive.** Anything that runs the same way every time should not require human attention. This is basic automation — triggers, conditions, actions. No AI needed. Most companies skip this step because it feels boring. It is the foundation.

3. **Surface the data.** Once processes are automated, you have consistent data. Now you can actually see what's happening. Reporting means something. Patterns are real.

4. **Apply AI where judgment is required.** This is step four, not step one. AI helps with routing, personalization, analysis, and decision support — but only when it has clean inputs and defined outputs to work with.

Companies that jump to AI in step one are building on sand. The smart path is slower and more durable.`,
  },
  "what-is-a-systems-review": {
    title: "What Happens in a Systems Review — And Why It's the First Step",
    date: "March 10, 2025",
    category: "Operations",
    content: `Before we build anything, we map everything.

A Systems Review is a structured technical diagnosis of how your business actually operates — not how you think it operates, and not how it's documented in the onboarding deck nobody reads.

**What we look at:**

- Your current tech stack: what tools you're using, what they're supposed to do, and what they're actually doing
- Your data flows: how information moves between systems, where it gets lost or duplicated, where manual work fills the gaps
- Your automation layer: what's already running, what's broken, what's missing
- Your team processes: how work gets assigned, tracked, completed, and reported
- Your bottlenecks: the two or three places where everything slows down

**What you get out of it:**

A clear, honest picture of your operational baseline. We identify what to fix immediately, what to build, and what to leave alone. No vendor recommendations, no upsell agenda — just the diagnosis.

**Why it comes first:**

We don't scope work without a review. Every engagement that gets skipped this step ends up redoing it anyway, usually after discovering that what the client asked for isn't actually what they need. The review saves time and money, and it ensures that what we build is right for your actual operation — not a template solution applied to a misunderstood problem.`,
  },
  "growth-vs-scale-systems": {
    title: "Growth Systems vs. Scale Systems: What's the Difference?",
    date: "February 22, 2025",
    category: "Strategy",
    content: `Most companies confuse growth with scale. They're not the same problem, and they don't require the same infrastructure.

**Growth systems** are built to acquire and convert. They handle lead generation, outreach sequences, pipeline management, follow-up automation, and initial onboarding. They're optimized for throughput at current volume. They work well — until they don't.

The typical failure point: everything is manual upstream of the CRM. The founder or sales lead is the bottleneck. The process lives in their head. Revenue grows, team grows, and the system that got you here starts to crack.

**Scale systems** are built for operational leverage. They encode the decisions that currently require a person. They create consistency at volume. They surface the right information to the right person at the right time. They make delegation possible.

Scale systems include:

- Operational dashboards that don't require someone to compile them
- Routing logic that doesn't require a manager to assign
- Reporting that doesn't require a spreadsheet warrior
- Onboarding that doesn't require the founder to explain things twice

**The important part:** you need growth systems to have something worth scaling. You need scale systems to not drown in what you built.

Most companies only ever build the first type. A ClientVerse engagement usually starts with stabilizing the growth layer, then designing and building the scale infrastructure around it.`,
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? posts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A1628] text-white">
        <Navbar />
        <div className="pt-40 pb-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-[#4AC4E0] hover:underline">← Back to Insights</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <Navbar />
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/blog" className="text-[#4AC4E0] hover:underline text-sm mb-8 inline-block">
            ← Back to Insights
          </Link>
          <div className="flex items-center gap-3 mb-6 mt-4">
            <span className="text-[#4AC4E0] text-sm font-semibold uppercase tracking-wider">{post.category}</span>
            <span className="text-white/30">·</span>
            <span className="text-white/40 text-sm">{post.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-12 leading-tight">{post.title}</h1>

          <div className="prose prose-invert max-w-none text-white/75 leading-relaxed space-y-6">
            {post.content.split('\n\n').map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return <h3 key={i} className="text-xl font-bold text-white mt-8 mb-2">{para.replace(/\*\*/g, '')}</h3>;
              }
              if (para.startsWith('- ')) {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2">
                    {para.split('\n').map((item, j) => (
                      <li key={j}>{item.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                );
              }
              // Handle inline bold
              const parts = para.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p key={i}>
                  {parts.map((part, j) =>
                    part.startsWith('**') ? <strong key={j} className="text-white font-semibold">{part.replace(/\*\*/g, '')}</strong> : part
                  )}
                </p>
              );
            })}
          </div>

          <div className="mt-16 pt-10 border-t border-white/10">
            <p className="text-white/60 mb-6">Ready to apply this to your operation?</p>
            <a
              href="https://calendly.com/clientverse/strategy-call"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#4AC4E0] text-[#0A1628] font-bold px-8 py-4 rounded-lg hover:bg-[#3bb1cc] transition-colors"
              data-testid="blog-cta"
            >
              Book a Systems Review
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

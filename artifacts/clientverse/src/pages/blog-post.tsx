import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Link, useParams } from "wouter";

const posts: Record<string, { title: string; date: string; category: string; content: string }> = {
  "hvac-missed-calls": {
    title: "HVAC Companies Miss 38% of Inbound Calls. Here's What That Costs.",
    date: "May 8, 2026",
    category: "Home Services",
    content: `Your phone rings. You're on a job. It goes to voicemail. The customer calls the next company in Google and books with them.

You never know it happened.

This is the single most expensive operational gap in home services — and it compounds invisibly. You can't track what you don't answer.

**The math on a typical HVAC company:**

Let's say your company misses 15 calls a week. Your average job value is $800. Your close rate on calls you actually answer is 35%.

That's 15 × 0.35 × $800 = $4,200 in missed revenue every week. $18,200 per month. $218,000 per year.

Most HVAC owners we audit are missing 20–30 calls per week during peak season. The annual leak usually lands between $40,000 and $120,000 — revenue they worked for, advertised for, and then didn't pick up.

**Why voicemail doesn't fix this:**

Customers who call and get voicemail do not leave a message. Voicemail callback rates in home services are under 10%. They call the next company.

**What actually fixes it:**

Two systems, deployed in under 48 hours:

1. **Missed call text-back** — fires an SMS to every missed caller within 60 seconds. It opens a conversation before they've found an alternative. Recovery rate: 20–40% of previously lost calls.

2. **AI voice agent** — answers inbound calls 24/7, including nights, weekends, and busy hours. Handles FAQs, books directly into your calendar, and escalates complex calls to a human.

Together, these two systems typically recover $1,500–$4,000 in the first month — without adding headcount.

**What this doesn't fix:**

The calls you miss because your Google Business Profile shows the wrong phone number, your Yelp listing is outdated, or your website loads too slowly on mobile. These are separate gaps — covered in a Revenue Audit.

If you want to see your exact leak number, the calculator at /revenue-calculator takes 60 seconds and uses your actual numbers.`,
  },
  "dental-review-gap": {
    title: "The Dental Review Gap: Why Your Rating Is Lower Than It Should Be",
    date: "April 22, 2026",
    category: "Healthcare",
    content: `The math of dental practice reviews is brutal — and almost nobody talks about it.

A patient has a great appointment. They leave satisfied. They go home, forget to review you, and move on with their life.

A patient has a frustrating experience — long wait, billing confusion, a miscommunication. They're annoyed. They pick up their phone on the drive home and leave a 1-star review.

This asymmetry is why the average dental practice has a 3.8–4.1 star rating despite doing excellent clinical work. The unhappy minority is systematically more motivated than the happy majority.

**The compounding problem:**

New patient acquisition in dentistry runs almost entirely on Google and word of mouth. When a prospective patient searches "dentist near me," they see:

- Your name
- Your star rating
- How many reviews you have
- The most recent review

If your competitor has 200 reviews at 4.7 stars and you have 31 reviews at 3.9 stars, you lose the click before they ever see your website.

**What fixes this — permanently:**

The solution isn't asking your staff to remind patients to review you. That works for 2 weeks and then stops.

The fix is automated:

**1. Post-appointment review request sequence.** An SMS fires 4 hours after checkout (not immediately — patients are more receptive after they've had time to process the visit). It includes a direct link to your Google review page. No login, no friction.

**2. Negative sentiment filter.** If a patient replies with a complaint or signals dissatisfaction, the message routes to your office manager instead of Google. You get a chance to recover the relationship before it becomes a 1-star public post.

**3. Response templates for existing reviews.** Every negative review on every platform gets a professional, HIPAA-compliant response drafted and posted within 24 hours. This signals to prospective patients that you're engaged and accountable — which actually increases trust.

**What one practice did in 90 days:**

A dental practice we worked with had 23 Google reviews at 3.8 stars when we started. Three months after deploying the review request sequence:

- 89 total reviews
- 4.7-star average
- 22% increase in new patient consultation requests

The clinical work didn't change. The operational system around capturing satisfied patient feedback did.

**The cost of inaction:**

Every week you operate without a review capture system, satisfied patients leave without reviewing you. The gap between your real reputation and your online reputation widens. This is one of the five gaps we assess in every Revenue Audit.`,
  },
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
    title: "What Happens in a Revenue Audit — And Why It's the First Step",
    date: "March 10, 2026",
    category: "Operations",
    content: `Before we build anything, we map everything.

A Revenue Audit is a structured 30-minute session where we diagnose how your business actually operates — not how you think it operates, and not how it's supposed to work in theory.

**What the audit covers:**

We use the C.L.A.R.I.T.Y. Framework™ to assess 7 categories: lead capture, response time, follow-up sequences, pipeline health, reputation management, AI readiness, and operational efficiency. Each category gets assessed and scored.

- Your current tech stack — what tools you're paying for and what they're actually doing
- Your inbound flow — how leads come in, how fast they're followed up, what percentage are lost
- Your automation layer — what's running, what's broken, what's missing entirely
- Your reputation footprint — reviews, listings, response patterns
- Your biggest leak — we identify the single highest-ROI fix and start there

**What you get out of it:**

A written C.L.A.R.I.T.Y. report delivered within 48 hours. Every gap documented. Every fix prioritized by ROI impact. A 90-day roadmap to close the gaps in the right order.

No vendor recommendations unless they apply. No upsell pressure. Just the diagnosis — and an honest recommendation on whether ClientVerse is the right fit.

**Why it comes first:**

We don't build anything without the audit. Every engagement that skips this step ends up redoing it — because what the client asked for isn't always what they actually need. The audit takes 30 minutes and eliminates months of misdirected effort.

Most clients find $2,000–$8,000 per month in recoverable revenue in the first session.`,
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
              Book Your Revenue Audit
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

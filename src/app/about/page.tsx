import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { Manifesto } from "@/components/site/sections/Manifesto";
import { Answers } from "@/components/site/sections/Answers";
import { CTA } from "@/components/site/sections/CTA";

export const metadata: Metadata = {
  title: "Studio — About SiteBlitz",
  description:
    "SiteBlitz is an India-based web studio shipping conversion-focused, SEO-first business websites worldwide — with senior craft and startup speed.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    title: "Speed is respect",
    text: "Your business can't wait six weeks for a brochure. We compress the timeline without compressing the craft — that's the entire point of the studio.",
  },
  {
    title: "Measured, not guessed",
    text: "Every site ships with real analytics. We don't say 'trust us, it's working' — you watch visitors, sources and enquiries live on your own dashboard.",
  },
  {
    title: "You own everything",
    text: "Domain, code, content, data. No hostage tactics, no mystery monthly fees. If we keep working together, it's because the results earn it.",
  },
  {
    title: "Search is the battlefield",
    text: "A beautiful site nobody finds is a painting in a locked room. Technical SEO and Core Web Vitals are built into every page from the first commit.",
  },
];

export default function AboutPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 md:px-8 md:pt-44">
        <p className="text-xs uppercase tracking-[0.25em] text-volt">The studio</p>
        <h1 className="font-display mt-3 text-5xl font-bold tracking-tight md:text-8xl">
          Small studio<span className="text-volt">.</span>
          <br />
          <span className="font-accent italic">Violent</span> execution<span className="text-volt">.</span>
        </h1>
        <div className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-muted">
          <p>
            SiteBlitz started with a simple observation: most small and mid-size businesses are
            stuck between overpriced agencies that take two months and template mills that take
            two hours. Both produce websites that don&apos;t sell.
          </p>
          <p>
            We built a third option — a studio that operates like a special-ops team. One brief,
            one focused build sprint, one launch. Senior-level design and engineering, modern
            tooling, and an obsession with two numbers:{" "}
            <span className="text-ink">how fast your site loads</span> and{" "}
            <span className="text-ink">how many enquiries it generates</span>.
          </p>
          <p>
            Based in {`Mumbai, India`} — working with businesses across India and worldwide.
          </p>
        </div>
      </section>

      <Answers />

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <h2 className="reveal font-display text-4xl font-bold tracking-tight md:text-6xl">
          What we <span className="font-accent italic text-volt">refuse</span> to compromise
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="reveal card-hover rounded-2xl border border-line bg-surface p-8"
              data-delay={String((i % 2) * 120)}
            >
              <span className="font-display text-4xl font-bold text-outline">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-4 text-xl font-bold">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* the pledge — our answer to an industry of "1%" counters */}
      <section className="border-y border-line bg-surface/40">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
          <p className="text-xs uppercase tracking-[0.25em] text-volt" data-anim="fade-up">
            The no-fake-numbers pledge
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
            Every claim on this site is <span className="font-accent italic text-volt">checkable</span>
          </h2>
          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted" data-anim="fade-up">
            <p>
              Agency websites are full of counters that animate to invented numbers, five-star
              badges that link nowhere, and &ldquo;testimonials&rdquo; from people who don&rsquo;t
              exist. We&rsquo;ve studied them closely — it&rsquo;s why this site works differently.
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3"><span className="text-volt">✦</span><span>Our traffic, our real-user speed scores and our deploy history are published live at <a href="/proof" className="text-volt underline-offset-4 hover:underline">/proof</a> — measured by the same analytics engine we ship to clients.</span></li>
              <li className="flex gap-3"><span className="text-volt">✦</span><span>If the hero says &ldquo;2 slots left this week&rdquo;, it&rsquo;s because we set that number in our own admin panel that morning — it is never generated to pressure you.</span></li>
              <li className="flex gap-3"><span className="text-volt">✦</span><span>No testimonial ships without a name and a way to verify it. Until we have yours, you&rsquo;ll see showcase builds labelled as exactly that.</span></li>
              <li className="flex gap-3"><span className="text-volt">✦</span><span>We will never promise you &ldquo;#1 on Google&rdquo;. Nobody can. What we promise — speed, indexing, structure, measurement — we can show you working.</span></li>
            </ul>
            <p className="font-accent text-lg italic text-ink">
              If you ever catch a number on this site that can&rsquo;t be verified, tell us and
              we&rsquo;ll remove it the same day.
            </p>
          </div>
        </div>
      </section>

      <Manifesto />
      <CTA />
    </Shell>
  );
}

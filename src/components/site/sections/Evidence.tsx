import Link from "next/link";
import { ProofStrip } from "@/components/site/ProofStrip";

/** Beat 5 — trust without testimonials (X1). Three things a visitor can check for themselves; all are
 *  SiteBlitz's own measurements or public facts, never client results. Copy agreed in
 *  docs/debate/2026-10-31-redesign-seo-direction (round 2). */
const CHECKS = [
  {
    href: "/proof",
    track: "evidence_proof",
    kicker: "Measured data",
    title: "View live performance",
    text: "Real-visitor speed, layout stability and traffic for this website, published as it happens.",
  },
  {
    href: "/tools/grader",
    track: "evidence_grader",
    kicker: "20 checks",
    title: "Check your website",
    text: "Run our free grader on your current site: SEO basics, speed signals, mobile and trust.",
  },
  {
    href: "/pricing",
    track: "evidence_pricing",
    kicker: "Fixed plans",
    title: "Explore pricing",
    text: "Know the price before the first call — every plan and what it includes is public.",
  },
] as const;

export function Evidence() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
        <div data-anim="fade-up">
          <p className="text-xs uppercase tracking-[0.25em] text-volt">Evidence</p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Proof you can <span className="font-accent italic text-volt">inspect</span>
            <span className="text-volt">.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            See how our own website performs, explore our published prices, and try our free 20-check
            website grader. These are practical ways to evaluate our work and approach — not claims about
            client results.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <ProofStrip />
      </div>
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 md:grid-cols-3 md:px-8 md:pb-24">
        {CHECKS.map((c, i) => (
          <Link
            key={c.href}
            href={c.href}
            data-track={c.track}
            data-anim="fade-up"
            data-delay={String(i * 0.08)}
            className="group card-hover rounded-2xl border border-line bg-surface p-7"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-volt">{c.kicker}</p>
            <h3 className="font-display mt-3 text-2xl font-bold">
              {c.title}
              <span className="ml-2 inline-block text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-volt" aria-hidden>
                →
              </span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{c.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

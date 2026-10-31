import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { Magnetic } from "@/components/site/Magnetic";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The 48-Hour Process, Hour by Hour",
  description:
    "What actually happens between your brief and your live website: the SiteBlitz 48-hour build, hour-stamped — brief, blueprint, build, launch.",
  alternates: { canonical: "/process" },
};

const TIMELINE = [
  {
    stamp: "H0",
    title: "The brief",
    window: "30 minutes, on WhatsApp or a call",
    text: "We extract the three things that matter: what you sell, who buys it, and why they should pick you. You send whatever assets you have — photos, logo, old site. Missing pieces don't block us; we draft copy and source visuals.",
    you: "30 minutes of your attention",
  },
  {
    stamp: "H2",
    title: "Direction lock",
    window: "same morning",
    text: "You receive the visual direction and page architecture — the look, the sections, the words on the buttons — before a single component is built. One round of reactions, then we lock it.",
    you: "a yes, a no, or a 'change this'",
  },
  {
    stamp: "H6",
    title: "The build begins",
    window: "design + engineering in one motion",
    text: "No handoffs between a 'design team' and a 'dev team' — the person designing is the person building. Real content goes in from the start. Server-rendered pages, structured data, image optimisation, analytics wiring.",
    you: "nothing — go run your business",
  },
  {
    stamp: "H30",
    title: "Preview on your phone",
    window: "evening of day two",
    text: "You get a private link. You tap through it on the same device your customers will use. Revision notes land straight into the build — included in every plan, not sold back to you.",
    you: "15 minutes of honest reactions",
  },
  {
    stamp: "H42",
    title: "The wiring",
    window: "launch prep",
    text: "Domain connected, SSL live, WhatsApp and forms tested end-to-end, sitemap submitted to Google, analytics dashboard activated. We smoke-test every button — dead CTAs are how other agencies ship; not here.",
    you: "domain access (we guide you, 5 minutes)",
  },
  {
    stamp: "H48",
    title: "Live — and measured",
    window: "launch",
    text: "Your site is live and your dashboard starts counting real visitors from minute one: who came, from where, on what device, and what they did. You'll see it working instead of wondering.",
    you: "the login to your own analytics panel",
  },
];

export default function ProcessPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-32 md:px-8 md:pt-44">
        <p className="text-xs uppercase tracking-[0.25em] text-volt" data-anim="fade-up" data-now>
          The process
        </p>
        <h1 className="font-display mt-3 max-w-4xl text-4xl font-bold leading-[1.02] tracking-tight md:text-7xl" data-anim="chars" data-now>
          48 hours<span className="text-volt">,</span> hour by <span className="font-accent italic text-volt">hour</span>
        </h1>
        <p className="mt-6 max-w-xl text-muted md:text-lg" data-anim="fade-up" data-now data-delay="0.3">
          &ldquo;Fast&rdquo; usually means &ldquo;rushed&rdquo;. Ours means &ldquo;engineered&rdquo; —
          the same six checkpoints, in the same order, every single build. Here is exactly what
          happens after you say go.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-20 md:px-8">
        <div className="relative">
          <div className="absolute bottom-0 left-[27px] top-0 w-px bg-line md:left-[43px]" aria-hidden />
          <div className="space-y-8">
            {TIMELINE.map((t) => (
              <div key={t.stamp} className="relative flex gap-6 md:gap-10" data-anim="fade-up">
                <div className="font-display z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-volt/40 bg-void text-sm font-bold text-volt md:h-[88px] md:w-[88px] md:text-xl">
                  {t.stamp}
                </div>
                <div className="rounded-2xl border border-line bg-surface p-6 md:p-7">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="font-display text-xl font-bold md:text-2xl">{t.title}</h2>
                    <span className="text-xs uppercase tracking-widest text-volt">{t.window}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">{t.text}</p>
                  <p className="mt-3 text-xs text-faint">
                    <span className="font-semibold text-muted">What we need from you:</span> {t.you}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-volt/30 bg-surface p-7 text-center" data-anim="fade-up">
          <p className="font-accent text-xl italic text-ink">
            &ldquo;What if it takes longer?&rdquo; — Multi-page and e-commerce builds get honest
            timelines up front (4–7 days). The checkpoints stay identical; only the hours stretch.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4" data-anim="fade-up">
          <Magnetic>
            <Link href="/book" data-track="process_book" className="btn-volt block rounded-full px-8 py-4 text-base font-semibold">
              Book your H0 → free brief call
            </Link>
          </Magnetic>
          <a
            href={SITE.whatsapp("Hi SiteBlitz! I read the 48-hour process. Let's start my brief.")}
            target="_blank"
            rel="noopener noreferrer"
            data-track="process_wa"
            className="btn-ghost rounded-full px-8 py-4 text-base text-ink"
          >
            Start on WhatsApp
          </a>
        </div>
      </section>
    </Shell>
  );
}

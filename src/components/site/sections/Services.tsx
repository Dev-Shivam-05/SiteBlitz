import Link from "next/link";
import { SERVICES } from "@/lib/site";

/** Services as a sticky deck: each card pins to the viewport, then compresses
 *  and dims as the next one slides over it (Motion engine: [data-stack]). */
const DECK = [
  {
    label: "Build",
    title: "Websites that sell",
    accent: "from scratch, in 48 hours",
    services: [SERVICES[0], SERVICES[2]],
    tint: "rgba(204,255,0,0.10)",
  },
  {
    label: "Commerce",
    title: "Stores & bookings",
    accent: "money flows while you sleep",
    services: [SERVICES[1], SERVICES[3]],
    tint: "rgba(124,92,255,0.12)",
  },
  {
    label: "Grow",
    title: "Rank, measure, improve",
    accent: "SEO + analytics + care",
    services: [SERVICES[4], SERVICES[5]],
    tint: "rgba(255,255,255,0.05)",
  },
];

export function Services() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div data-anim="fade-up">
        <p className="text-xs uppercase tracking-[0.25em] text-volt">What we do</p>
        <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
          <span data-anim="words" data-stagger="0.05" className="block">
            Everything your business
          </span>
          <span className="block">
            needs to <span className="font-accent italic text-volt">dominate</span> online
          </span>
        </h2>
      </div>

      <div data-stack className="mt-14 flex flex-col gap-8 md:gap-10">
        {DECK.map((deck, i) => (
          <div
            key={deck.label}
            data-stack-item
            className="sticky overflow-hidden rounded-3xl border border-line bg-surface"
            style={{ top: `${84 + i * 14}px` }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(80% 100% at 85% 0%, ${deck.tint}, transparent)` }}
            />
            <div className="relative grid gap-8 p-7 md:grid-cols-[1fr_1.4fr] md:gap-12 md:p-12">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-xs font-bold tracking-[0.3em] text-volt">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-faint">{deck.label}</span>
                </div>
                <h3 className="font-display mt-4 text-3xl font-bold leading-tight md:text-5xl">
                  {deck.title}
                </h3>
                <p className="font-accent mt-2 text-xl italic text-muted">{deck.accent}</p>
                <Link
                  href="/services"
                  data-track={`services_deck_${deck.label.toLowerCase()}`}
                  className="btn-ghost mt-8 hidden rounded-full px-6 py-3 text-sm text-ink md:inline-block"
                >
                  Explore →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {deck.services.map((s) => (
                  <article key={s.title} className="rounded-2xl border border-line/70 bg-void/50 p-6">
                    <h4 className="font-display text-lg font-bold">{s.title}</h4>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span key={t} className="rounded-full border border-line px-3 py-1 text-[11px] tracking-wide text-faint">
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

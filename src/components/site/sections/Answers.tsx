import Link from "next/link";

/** Beat 2 — the buyer's first questions (cost, time, ownership, quality) answered in plain HTML.
 *  Replaced the animated Stats counters in X1: every value here is sourced — price and delivery from
 *  src/lib/offer.ts and the pricing terms. Copy agreed in docs/debate/2026-10-31-redesign-seo-direction. */
const ANSWERS = [
  { value: "₹7,999", label: "One-page website, one-time", href: "/pricing", track: "answers_price" },
  { value: "2 working days", label: "Launch delivery once ready to build", href: "/website-in-48-hours", track: "answers_time" },
  { value: "Design before payment", label: "Review a concept first", href: "/pricing#terms", track: "answers_review" },
  { value: "Working demos", label: "Open a real concept site", href: "/#demos", track: "answers_demos" },
] as const;

export function Answers() {
  return (
    <section className="border-y border-line" aria-label="Price, delivery, ownership and speed at a glance">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {ANSWERS.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            data-track={a.track}
            className="group bg-void p-7 transition-colors duration-300 hover:bg-surface md:p-9"
          >
            <p className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">{a.value}</p>
            <p className="mt-2 flex items-center justify-between gap-3 text-xs uppercase tracking-widest text-faint">
              {a.label}
              <span className="text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-volt" aria-hidden>
                →
              </span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

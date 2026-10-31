import Link from "next/link";

/** Beat 2 — the buyer's first questions (cost, time, ownership, quality) answered in plain HTML.
 *  Replaced the animated Stats counters in X1: every value here is sourced — price and delivery from
 *  PLANS in site.ts, ownership from /terms, speed from /proof. Copy agreed in docs/debate/2026-10-31-redesign-seo-direction. */
const ANSWERS = [
  { value: "₹7,999 / $99", label: "Launch plan starting price", href: "/pricing", track: "answers_price" },
  { value: "As little as 48 hours", label: "Launch plan delivery", href: "/website-in-48-hours", track: "answers_time" },
  { value: "Yours after full payment", label: "Code, content & domain", href: "/terms", track: "answers_ownership" },
  { value: "Live speed data", label: "Our website's performance at /proof", href: "/proof", track: "answers_proof" },
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

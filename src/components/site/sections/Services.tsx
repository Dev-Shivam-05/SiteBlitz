import Link from "next/link";
import { SERVICES } from "@/lib/site";

/** Beat 4 — the six services as a scannable grid (X1). Was a sticky deck; the stack effect moved to
 *  Process so two stacks never run back to back (agreed in docs/debate/2026-10-31-redesign-seo-direction). */
export function Services() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div data-anim="fade-up" className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
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
        <Link
          href="/services"
          data-track="services_all"
          className="btn-ghost w-fit shrink-0 rounded-full px-6 py-3 text-sm text-ink"
        >
          All services & prices →
        </Link>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <article key={s.title} className="bg-void p-7 md:p-9" data-anim="fade-up" data-delay={String((i % 3) * 0.08)}>
            <span className="font-display text-xs font-bold tracking-[0.3em] text-volt">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-4 text-xl font-bold md:text-2xl">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 text-[11px] tracking-wide text-faint">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { TiltCard } from "@/components/site/TiltCard";
import { SERVICES } from "@/lib/site";

export function Services() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
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
        <Link
          href="/services"
          className="btn-ghost hidden rounded-full px-6 py-3 text-sm md:inline-block"
          data-track="services_view_all"
          data-anim="fade-up"
        >
          All services →
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <div key={s.title} data-anim="scale-in" data-delay={String((i % 3) * 0.09)}>
            <TiltCard className="group h-full rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-volt/25">
              <article>
                <div className="flex items-start justify-between">
                  <h3 className="font-display text-xl font-bold">{s.title}</h3>
                  <span className="text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-volt">
                    ↗
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-3 py-1 text-[11px] tracking-wide text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { SERVICES } from "@/lib/site";

export function Services() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.25em] text-volt">What we do</p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Everything your business
            <br />
            needs to <span className="font-accent italic text-volt">dominate</span> online
          </h2>
        </div>
        <Link
          href="/services"
          className="reveal btn-ghost hidden rounded-full px-6 py-3 text-sm md:inline-block"
          data-track="services_view_all"
        >
          All services →
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <article
            key={s.title}
            className="reveal card-hover group rounded-2xl border border-line bg-surface p-7"
            data-delay={String((i % 3) * 100)}
          >
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
        ))}
      </div>
    </section>
  );
}

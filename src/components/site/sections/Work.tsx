import Image from "next/image";
import Link from "next/link";
import { WORK_ITEMS } from "@/lib/site";

export function Work({ heading = true }: { heading?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
      {heading && (
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.25em] text-volt">Selected work</p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Built to perform<span className="text-volt">,</span>
            <br />
            not just to <span className="font-accent italic">look pretty</span>
          </h2>
        </div>
      )}

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {WORK_ITEMS.map((w, i) => (
          <Link
            key={w.slug}
            href={`/work#${w.slug}`}
            data-track={`work_card_${w.slug}`}
            className="reveal card-hover group overflow-hidden rounded-2xl border border-line bg-surface"
            data-delay={String((i % 2) * 120)}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={w.image}
                alt={`${w.title} — website by SiteBlitz`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full border border-line bg-void/70 px-3 py-1.5 text-xs text-volt backdrop-blur">
                {w.result}
              </div>
            </div>
            <div className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-display text-lg font-bold">{w.title}</h3>
                <p className="mt-1 text-xs text-faint">{w.category}</p>
              </div>
              <span className="text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-volt">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

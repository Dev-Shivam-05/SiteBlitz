import Image from "next/image";
import Link from "next/link";
import { WORK_ITEMS } from "@/lib/site";

/** Pinned horizontal gallery on desktop (GSAP hscroll), vertical stack on mobile. */
export function WorkGallery() {
  return (
    <section data-hscroll className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28 lg:pt-24">
        <div data-anim="fade-up">
          <p className="text-xs uppercase tracking-[0.25em] text-volt">Selected work</p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Built to perform<span className="text-volt">,</span> not just to{" "}
            <span className="font-accent italic">look pretty</span>
          </h2>
          <p className="mt-4 hidden text-xs uppercase tracking-[0.25em] text-faint lg:block">
            Keep scrolling — the gallery moves sideways ⟶
          </p>
        </div>
      </div>

      <div
        data-hscroll-track
        className="mt-10 flex flex-col gap-6 px-5 pb-20 md:px-8 lg:mt-14 lg:flex-row lg:gap-8 lg:pb-28 lg:pl-[8vw] lg:pr-[16vw]"
      >
        {WORK_ITEMS.map((w, i) => (
          <Link
            key={w.slug}
            href={`/work#${w.slug}`}
            data-track={`work_card_${w.slug}`}
            data-cursor-label="View"
            className="hcard group w-full shrink-0 overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-volt/30 lg:w-auto"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={w.image}
                alt={`${w.title} — website by SiteBlitz`}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              <span className="font-display absolute right-4 top-4 text-5xl font-bold text-ink/15">
                {String(i + 1).padStart(2, "0")}
              </span>
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

        {/* end card */}
        <Link
          href="/work"
          data-track="work_view_all"
          data-cursor-label="All work"
          className="hcard group flex w-full shrink-0 items-center justify-center rounded-2xl border border-dashed border-line bg-transparent py-16 transition-colors hover:border-volt/40 lg:w-[28vw] lg:py-0"
        >
          <div className="text-center">
            <p className="font-display text-3xl font-bold">
              All case studies
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </p>
            <p className="mt-2 text-sm text-faint">results, numbers & stories</p>
          </div>
        </Link>
      </div>
    </section>
  );
}

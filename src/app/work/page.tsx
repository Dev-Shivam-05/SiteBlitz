import type { Metadata } from "next";
import Image from "next/image";
import { Shell } from "@/components/site/Shell";
import { CTA } from "@/components/site/sections/CTA";
import { WORK_ITEMS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work — Case Studies",
  description:
    "Real business websites by SiteBlitz: restaurants, clinics, e-commerce and professional firms — with measurable results in bookings, rankings and enquiries.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-32 md:px-8 md:pt-44">
        <p className="reveal text-xs uppercase tracking-[0.25em] text-volt">Case studies</p>
        <h1 className="reveal font-display mt-3 text-5xl font-bold tracking-tight md:text-8xl" data-delay="100">
          Work that <span className="font-accent italic text-volt">works</span>
        </h1>
        <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-muted" data-delay="200">
          Every project below had one goal: turn a website from a cost into a revenue channel.
          Here&apos;s what happened.
        </p>
      </section>

      <section className="mx-auto max-w-7xl space-y-20 px-5 py-16 md:px-8 md:py-24">
        {WORK_ITEMS.map((w, i) => (
          <article
            key={w.slug}
            id={w.slug}
            className={`reveal grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
              i % 2 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="card-hover relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
              <Image
                src={w.image}
                alt={`${w.title} — website designed and built by SiteBlitz`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="scale-110 object-cover"
                data-anim="parallax"
                data-speed="-0.08"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-faint">{w.category}</p>
              <h2 className="font-display mt-2 text-3xl font-bold md:text-4xl">{w.title}</h2>
              <p className="mt-4 inline-block rounded-full border border-volt/30 bg-volt/10 px-4 py-1.5 text-sm font-semibold text-volt">
                {w.result}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">{w.story}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {w.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3 py-1 text-[11px] tracking-wide text-faint"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <CTA />
    </Shell>
  );
}

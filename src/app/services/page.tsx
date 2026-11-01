import type { Metadata } from "next";
import { fromPrice } from "@/lib/offer";
import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { Services } from "@/components/site/sections/Services";
import { Process } from "@/components/site/sections/Process";
import { CTA } from "@/components/site/sections/CTA";
import { DEEP_SERVICES } from "@/content";

export const metadata: Metadata = {
  title: "Services — Web Design, Development & SEO",
  description:
    "Business websites, e-commerce, landing pages, redesigns, technical SEO and ongoing care — delivered fast by SiteBlitz for India and worldwide.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pb-0 pt-32 md:px-8 md:pt-44">
        <p className="text-xs uppercase tracking-[0.25em] text-volt">Services</p>
        <h1 className="font-display mt-3 text-5xl font-bold tracking-tight md:text-8xl">
          One studio<span className="text-volt">,</span>
          <br />
          every <span className="font-accent italic">weapon</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          Design, engineering, SEO and analytics under one roof — so nothing gets lost between
          "agencies" and your website actually makes money.
        </p>
      </section>
      <Services />

      {/* deep service directory */}
      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl" data-anim="fade-up">
          Pick your <span className="font-accent italic text-volt">mission</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted" data-anim="fade-up">
          Every service below has its own page with exact scope, timeline, price and process — no
          &ldquo;request a quote to find out&rdquo; games.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEEP_SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              data-track={`services_deep_${s.slug}`}
              data-cursor-label="Open"
              className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-volt/30"
              data-anim="scale-in"
              data-delay={String((i % 3) * 0.08)}
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-xl font-bold">{s.name}</h3>
                <span className="text-faint transition-all group-hover:translate-x-1 group-hover:text-volt">→</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{s.promise}</p>
              <p className="mt-4 font-display text-sm font-bold tabular-nums text-volt">
                {fromPrice(s.startingPriceINR)}
                <span className="ml-2 font-normal text-faint">· {s.timeline}</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      <Process />
      <CTA />
    </Shell>
  );
}

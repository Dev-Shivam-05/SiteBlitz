import Link from "next/link";
import { Aurora } from "@/components/site/Aurora";
import { Marquee } from "@/components/site/Marquee";
import { SITE } from "@/lib/site";

const MARQUEE_ITEMS = [
  "48-HOUR DELIVERY",
  "SEO-FIRST ENGINEERING",
  "90+ LIGHTHOUSE SCORES",
  "INDIA & WORLDWIDE",
  "CONVERSION-DRIVEN DESIGN",
  "LIVE VISITOR ANALYTICS",
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <Aurora className="absolute inset-0 h-full w-full" />

      {/* status badge */}
      <div className="absolute left-5 top-24 md:left-8 md:top-32">
        <div className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 backdrop-blur">
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-volt" />
          <span className="text-xs tracking-wide text-muted">
            Taking new projects · replies within hours
          </span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 md:px-8">
        <h1 className="font-display font-bold leading-[0.92] tracking-tight">
          <span className="reveal block text-[13.5vw] md:text-[7.5rem] lg:text-[9rem]">
            WEBSITES
          </span>
          <span
            className="reveal block text-[13.5vw] text-outline md:text-[7.5rem] lg:text-[9rem]"
            data-delay="120"
          >
            THAT WIN
          </span>
          <span className="reveal block text-[13.5vw] md:text-[7.5rem] lg:text-[9rem]" data-delay="240">
            BUSINESS<span className="text-volt">.</span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="reveal max-w-md text-base leading-relaxed text-muted md:text-lg" data-delay="360">
            SiteBlitz is a web studio for businesses that move fast. Conversion-focused,
            SEO-first websites — <span className="font-accent italic text-ink">designed, engineered and live</span>{" "}
            in as little as 48 hours.
          </p>

          <div className="reveal flex flex-wrap items-center gap-4" data-delay="480">
            <Link
              href="/contact"
              data-track="hero_cta_start"
              className="btn-volt rounded-full px-7 py-4 text-sm font-semibold md:text-base"
            >
              Start a project →
            </Link>
            <a
              href={SITE.whatsapp("Hi SiteBlitz! I want to create a website for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              data-track="hero_cta_whatsapp"
              className="btn-ghost rounded-full px-7 py-4 text-sm text-ink md:text-base"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <div className="relative mt-10 border-y border-line bg-void/60 py-4 backdrop-blur">
        <Marquee
          items={MARQUEE_ITEMS}
          className="font-display text-sm font-semibold tracking-[0.15em] text-muted"
        />
      </div>
    </section>
  );
}

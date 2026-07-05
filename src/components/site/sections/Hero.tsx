import Link from "next/link";
import { WebGLHero } from "@/components/site/WebGLHero";
import { Marquee } from "@/components/site/Marquee";
import { Magnetic } from "@/components/site/Magnetic";
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
    <section data-hero-pin className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <WebGLHero className="absolute inset-0 h-full w-full" />
      <div className="noise-layer absolute inset-0 opacity-40" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-r from-void/60 via-void/15 to-transparent"
        aria-hidden
      />

      {/* status badge */}
      <div className="absolute left-5 top-24 md:left-8 md:top-32">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 backdrop-blur"
          data-anim="fade-up"
          data-now
          data-delay="1.1"
        >
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-volt" />
          <span className="text-xs tracking-wide text-muted">
            Taking new projects · replies within hours
          </span>
        </div>
      </div>

      {/* rotating orbit text */}
      <div className="pointer-events-none absolute right-8 top-28 hidden lg:block" aria-hidden>
        <svg width="120" height="120" viewBox="0 0 120 120" className="animate-spin-slow opacity-40">
          <defs>
            <path id="orbit" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text className="fill-muted text-[9.5px] uppercase tracking-[0.32em]">
            <textPath href="#orbit">
              blitz · build · launch · rank · blitz · build · launch · rank ·
            </textPath>
          </text>
        </svg>
      </div>

      <div data-hero-content className="relative mx-auto w-full max-w-7xl px-5 pb-10 md:px-8">
        <h1 className="font-display font-bold leading-[0.92] tracking-tight">
          <span
            className="block text-[13.5vw] md:text-[7.5rem] lg:text-[9rem]"
            data-anim="chars"
            data-now
            data-delay="0.15"
            data-stagger="0.035"
          >
            WEBSITES
          </span>
          <span
            className="block text-[13.5vw] text-outline md:text-[7.5rem] lg:text-[9rem]"
            data-anim="chars"
            data-now
            data-delay="0.3"
            data-stagger="0.03"
          >
            THAT WIN
          </span>
          <span
            className="block text-[13.5vw] md:text-[7.5rem] lg:text-[9rem]"
            data-anim="chars"
            data-now
            data-delay="0.45"
            data-stagger="0.035"
          >
            BUSINESS<span className="text-volt">.</span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p
            className="max-w-md text-base leading-relaxed text-muted md:text-lg"
            data-anim="fade-up"
            data-now
            data-delay="0.9"
          >
            SiteBlitz is a web studio for businesses that move fast. Conversion-focused,
            SEO-first websites —{" "}
            <span className="font-accent italic text-ink">designed, engineered and live</span>{" "}
            in as little as 48 hours.
          </p>

          <div className="flex flex-wrap items-center gap-4" data-anim="fade-up" data-now data-delay="1.05">
            <Magnetic>
              <Link
                href="/contact"
                data-track="hero_cta_start"
                className="btn-volt block rounded-full px-7 py-4 text-sm font-semibold md:text-base"
              >
                Start a project →
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={SITE.whatsapp("Hi SiteBlitz! I want to create a website for my business.")}
                target="_blank"
                rel="noopener noreferrer"
                data-track="hero_cta_whatsapp"
                className="btn-ghost block rounded-full px-7 py-4 text-sm text-ink md:text-base"
              >
                WhatsApp us
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-24 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden md:block" aria-hidden>
        <div className="scroll-cue h-full w-full" />
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

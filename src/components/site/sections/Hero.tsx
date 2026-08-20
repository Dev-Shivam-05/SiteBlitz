import Link from "next/link";
import { WebGLHero } from "@/components/site/WebGLHero";
import { Marquee } from "@/components/site/Marquee";
import { Magnetic } from "@/components/site/Magnetic";
import { LiveBadge } from "@/components/site/ProofStrip";
import { SITE } from "@/lib/site";

const MARQUEE_ITEMS = [
  "48-HOUR DELIVERY",
  "SEO-FIRST ENGINEERING",
  "90+ LIGHTHOUSE SCORES",
  "INDIA & WORLDWIDE",
  "CONVERSION-DRIVEN DESIGN",
  "LIVE VISITOR ANALYTICS",
];

/** One headline line. `clamp()` sizing means it never needs breakpoint sizes
 *  and can never overflow the viewport. */
const LINE = "block text-[clamp(2.75rem,10.5vw,9.5rem)] leading-[0.86] tracking-[-0.03em]";

export function Hero() {
  return (
    <section
      data-hero-pin
      className="relative grid min-h-[100svh] grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] overflow-hidden"
    >
      <WebGLHero className="absolute inset-0 h-full w-full" />
      <div className="noise-layer absolute inset-0 opacity-40" aria-hidden />
      {/* Guarantees text contrast wherever the energy field happens to drift. */}
      <div className="hero-scrim absolute inset-0" aria-hidden />

      {/* Row 1 — reserves exactly the navbar's height, so the logo and the
          headline can never share a band no matter how short the viewport. */}
      <div className="h-16 md:h-20" aria-hidden />

      {/* Row 2 — the composition, vertically centred rather than bottom-jammed. */}
      <div
        data-hero-content
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-10 md:px-8"
      >
        <div data-anim="fade-up" data-now data-delay="0.05" className="mb-7 md:mb-9">
          <LiveBadge />
        </div>

        <div className="relative">
          {/* single volt scanline, behind the type, once on load */}
          <div className="pointer-events-none absolute inset-y-0 -inset-x-2 overflow-hidden" aria-hidden>
            <div className="hero-sweep" />
          </div>

          <h1 className="relative font-display font-bold">
            <span
              className={LINE}
              data-anim="chars"
              data-now
              data-delay="0.15"
              data-stagger="0.035"
            >
              WEBSITES
            </span>
            <span
              className={`${LINE} text-stroke-volt`}
              data-anim="chars"
              data-now
              data-delay="0.3"
              data-stagger="0.03"
            >
              THAT WIN
            </span>
            <span
              className={LINE}
              data-anim="chars"
              data-now
              data-delay="0.45"
              data-stagger="0.035"
            >
              BUSINESS<span className="text-volt">.</span>
            </span>
          </h1>
        </div>

        <div className="mt-9 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
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

      {/* Row 3 — proof marquee. min-w-0 is load-bearing: without it the strip's
          intrinsic width sizes the grid column and shoves the hero off-centre. */}
      <div className="relative z-10 min-w-0 border-y border-line bg-void/60 py-4 backdrop-blur">
        <Marquee
          items={MARQUEE_ITEMS}
          className="font-display text-sm font-semibold tracking-[0.15em] text-muted"
        />
      </div>
    </section>
  );
}

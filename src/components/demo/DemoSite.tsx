import Image from "next/image";
import Link from "next/link";
import { CalendarClock, MapPin } from "lucide-react";
import type { Demo } from "@/lib/demos";
import { PHOTOS } from "@/lib/photos";
import { SITE } from "@/lib/site";
import { FROM_PRICE, inr } from "@/lib/offer";
import { PhotoCredits } from "@/components/site/PhotoCredits";
import { DemoEnquiry } from "./DemoEnquiry";

/** One fictional business website, rendered from src/lib/demos.ts. Deliberately not wrapped in the
 *  SiteBlitz Shell: it must look like a client's own site, with SiteBlitz present only in the ribbon
 *  and the closing call to action. Photographs are licensed stand-ins (src/lib/photos.ts), never the
 *  fictional business's own premises. */
export function DemoSite({ demo }: { demo: Demo }) {
  const hero = PHOTOS[demo.photo];
  const detail = PHOTOS[demo.detailPhoto];
  return (
    <div className={`${demo.theme} demo-root min-h-screen`}>
      <div className="demo-ribbon sticky top-0 z-50 px-4 py-2 text-center text-[11px] font-semibold leading-snug sm:text-xs">
        SITEBLITZ CONCEPT DEMO · An illustrative {demo.vertical.toLowerCase()} website, not a real business or
        client project.{" "}
        <Link href="/pricing" className="underline underline-offset-2">
          See SiteBlitz pricing
        </Link>
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8">
        <span className="flex items-center gap-2.5">
          <span className="demo-mark flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold">{demo.brandMark}</span>
          <span className="demo-heading text-lg font-semibold md:text-xl">{demo.brand}</span>
        </span>
        <nav className="hidden gap-6 text-sm font-medium sm:flex" aria-label="Demo site">
          <a href="#items" className="opacity-80 hover:opacity-100">{demo.itemsKicker}</a>
          <a href="#enquiry" className="opacity-80 hover:opacity-100">Enquiry</a>
          <a href="#visit" className="opacity-80 hover:opacity-100">Visit</a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-4 md:grid-cols-[1.1fr_1fr] md:px-8 md:pb-24 md:pt-10">
        <div>
          <p className="demo-kicker text-xs font-semibold uppercase tracking-[0.2em]">{demo.heroKicker}</p>
          <h1 className="demo-heading mt-4 text-4xl leading-[1.05] md:text-6xl">{demo.heroTitle}</h1>
          <p className="mt-5 max-w-md text-base leading-relaxed opacity-85 md:text-lg">{demo.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#enquiry" className="demo-btn rounded-full px-6 py-3.5 text-sm font-semibold">
              {demo.primaryCta}
            </a>
            <a href="#items" className="demo-btn-outline rounded-full px-6 py-3.5 text-sm font-semibold">
              Explore {demo.itemsKicker.toLowerCase()}
            </a>
          </div>
        </div>
        <div className="demo-photo relative aspect-[4/3.4] overflow-hidden rounded-[2rem]">
          {/* Eager + priority: this frame is the demo's first impression and the screenshot source for the home page */}
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section id="items" className="demo-band scroll-mt-12 py-14 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="demo-kicker text-xs font-semibold uppercase tracking-[0.2em]">{demo.itemsKicker}</p>
          <h2 className="demo-heading mt-3 text-3xl md:text-5xl">{demo.itemsTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {demo.items.map((it) => (
              <article key={it.title} className="demo-card flex flex-col rounded-2xl p-6">
                <h3 className="text-lg font-bold">{it.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed opacity-85">{it.text}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="demo-kicker text-xs font-semibold">{it.meta}</span>
                  <a href="#enquiry" className="text-sm font-semibold underline underline-offset-4">
                    Enquire
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1fr_1.1fr] md:px-8 md:py-20">
        <div className="demo-photo relative aspect-[4/3] overflow-hidden rounded-[2rem]">
          <Image src={detail.src} alt={detail.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
        </div>
        <div>
          <h2 className="demo-heading text-2xl md:text-3xl">{demo.highlightsTitle}</h2>
          <div className="mt-8 grid gap-4">
            {demo.highlights.map((h) => (
              <div key={h.label} className="demo-soft rounded-2xl p-5">
                <p className="font-bold">{h.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed opacity-85">{h.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry" className="demo-band scroll-mt-12 py-14 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.15fr] md:px-8">
          <div>
            <p className="demo-kicker flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
              <CalendarClock className="h-4 w-4" aria-hidden /> Enquiry
            </p>
            <h2 className="demo-heading mt-3 text-3xl md:text-5xl">{demo.enquiry.title}</h2>
            <p className="mt-4 max-w-sm leading-relaxed opacity-85">{demo.enquiry.text}</p>
          </div>
          <DemoEnquiry demo={demo} />
        </div>
      </section>

      <section id="visit" className="mx-auto max-w-6xl scroll-mt-12 px-5 py-14 md:px-8 md:py-20">
        <h2 className="demo-heading flex items-center gap-2 text-2xl md:text-3xl">
          <MapPin className="h-6 w-6" aria-hidden /> {demo.visitTitle}
        </h2>
        <ul className="mt-4 space-y-1.5 text-sm opacity-85">
          {demo.visitLines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </section>

      {/* SiteBlitz's own pitch, visually separated from the fictional business above */}
      <section className="bg-ink px-5 py-16 text-void md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-75">Built by SiteBlitz</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
            A website like this, built around your business.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed opacity-85">
            {demo.pitch} One-page sites from {inr(FROM_PRICE)}, three-page sites and custom work with the scope agreed
            in writing.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={SITE.whatsapp(demo.waText)}
              target="_blank"
              rel="noopener noreferrer"
              data-track={`demo_${demo.id}_whatsapp`}
              className="rounded-full bg-void px-6 py-3.5 text-sm font-semibold text-ink"
            >
              Discuss a website on WhatsApp
            </a>
            <Link href="/pricing" className="rounded-full border border-void/40 px-6 py-3.5 text-sm font-semibold">
              Compare SiteBlitz packages
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-5 py-8 text-center text-xs opacity-75 md:px-8">
        SiteBlitz concept demonstration. {demo.brand} is not a real business; no products, services or appointments
        are offered through this page. <Link href="/" className="underline">Return to SiteBlitz</Link>
        <PhotoCredits ids={[demo.photo, demo.detailPhoto]} className="mt-2" />
      </footer>
    </div>
  );
}

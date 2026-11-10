import Image from "next/image";
import Link from "next/link";
import { DEMOS, DEMO_LIST } from "@/lib/demos";
import { PROCESS_STEPS, SITE } from "@/lib/site";
import { CONCEPT_CAP_PER_WEEK, FROM_PRICE, PACKAGES, inr, launchPkg } from "@/lib/offer";
import { WhatsAppIcon } from "../WhatsAppIcon";
import { Magnetic } from "../Magnetic";
import { ParticleHero } from "../hero/ParticleHero";

/* Redesign v3 home (docs/spec/redesign-v3-motion.md): the motion grammar of the reference (Horeca Social)
   carried by SiteBlitz's own content. Every scene is complete, readable server HTML; Motion.tsx only adds
   transforms through data-scene hooks, so nothing waits for JavaScript and reduced motion shows it all static.
   Copy rule: no invented reviews, client counts, results or guarantees. */

const WA_DEMO = "Hi SiteBlitz, I'd like to see a website demo for my business and the package details.";
const LAUNCH_DELIVERY = launchPkg.delivery; // "2 working days after ready-to-build"

/** 01 — Hero (spec v4 rows 4-5): the SITEBLITZ wordmark, which ParticleHero turns into WebGL particles that
 *  scatter from the pointer and, as the hero scrolls, fly into the phone screen of the showroom concept. Every word
 *  is server HTML; the wordmark is a real text poster, so reduced motion, low-power devices and failed WebGL all get
 *  the same composition without the particles. */
export function HomeHero() {
  const showroom = DEMOS.showroom;
  return (
    <section data-hero aria-labelledby="hero-title" className="hero-v4">
      <div className="hero-stage">
        <div aria-hidden className="hero-glow" />
        <ParticleHero />
        <div className="hero-screen">
          <p aria-hidden data-hero-mark className="hero-mark display">
            Site<span className="text-volt">Blitz</span>
          </p>
          <div className="hero-a mx-auto w-full max-w-[1440px] px-4 pb-6 md:px-8 md:pb-10">
            <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-10">
              <div>
                <p className="kicker text-muted">{SITE.locationLine}</p>
                <h1 id="hero-title" className="display mt-4 text-[clamp(36px,10.4vw,48px)] md:text-[clamp(48px,4.6vw,84px)]">
                  Websites people <span className="serif text-volt">remember.</span>
                </h1>
              </div>
              <div className="md:justify-self-end md:text-right">
                <p className="text-base font-semibold md:text-lg">
                  From {inr(FROM_PRICE)} · {launchPkg.pages}
                </p>
                <p className="mt-1 text-sm text-muted md:text-base">Live in {LAUNCH_DELIVERY}.</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row md:justify-end">
                  <Magnetic strength={0.3}>
                    <a
                      href={SITE.whatsapp(WA_DEMO)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="hero_whatsapp"
                      className="btn-volt flex h-[52px] w-full items-center justify-center gap-2 rounded-full px-7 text-base font-semibold"
                    >
                      <WhatsAppIcon className="h-5 w-5" color="currentColor" /> Chat on WhatsApp
                    </a>
                  </Magnetic>
                  <Link
                    href="#demos"
                    data-track="hero_demos"
                    className="btn-line flex h-[52px] items-center justify-center rounded-full px-7 text-base font-semibold"
                  >
                    See the concepts
                  </Link>
                </div>
              </div>
            </div>
            <p aria-hidden className="hero-cue rm-hide kicker mt-6 hidden items-center gap-3 text-faint md:flex">
              <span className="hero-cue-line" /> Scroll · watch it build
            </p>
          </div>
        </div>

        <div className="hero-b">
          <div className="hero-b-inner mx-auto w-full max-w-[1440px] px-4 md:px-8">
            <div className="hero-b-copy">
              <p className="kicker text-volt">Concept 03 · {showroom.brand} · a fictional business</p>
              <h2 className="display mt-4 text-[clamp(40px,11vw,56px)] md:text-[clamp(56px,6vw,104px)]">
                Built <span className="serif text-volt">like this.</span>
              </h2>
              <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-muted md:mt-6 md:text-lg">{showroom.pitch}</p>
              <Link
                href="/demo/showroom"
                data-track="hero_open_showroom"
                className="btn-line mt-6 inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-base font-semibold md:mt-8"
              >
                Open the live concept <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="hero-phone">
              <div aria-hidden className="hero-bezel" />
              <Image
                data-hero-shot
                src="/demos/showroom.png"
                alt=""
                width={780}
                height={1624}
                sizes="(min-width: 768px) 340px, 220px"
                className="hero-shot"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 02 — The giant price: the reference's big rising number, but SiteBlitz's one hard fact instead of a count. */
export function GiantPrice() {
  return (
    <section aria-labelledby="price-title" className="overflow-hidden bg-void pb-[10vh] pt-[14vh] md:pt-[18vh]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <p className="kicker text-volt">The Launch package</p>
        <h2 id="price-title" className="sr-only">
          Launch package price: {inr(FROM_PRICE)}
        </h2>
        <p
          aria-hidden
          data-rise
          className="display mt-4 whitespace-nowrap pb-[0.2em] text-[34vw] leading-[0.85] text-volt md:text-[min(26vw,380px)]"
        >
          {inr(FROM_PRICE)}
        </p>
        <div className="mt-6 flex flex-col gap-2 border-t border-ink/15 pt-6 md:flex-row md:items-baseline md:justify-between">
          <p className="text-lg font-semibold md:text-2xl">
            {launchPkg.pages} website · {LAUNCH_DELIVERY}
          </p>
          <p className="text-sm text-muted md:text-base">
            Paid in two parts: {inr(launchPkg.payments![0])} + {inr(launchPkg.payments![1])} · no GST added
          </p>
        </div>
      </div>
    </section>
  );
}

/** 03 — Statement bridge: a hairline and one short line between the big scenes (1820 Productions' rhythm). */
export function Statement() {
  return (
    <section className="bg-void py-[12vh]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div data-line className="h-px w-full origin-left bg-ink" />
        <div className="mt-8 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h2 className="display text-[clamp(44px,11vw,64px)] md:text-[clamp(64px,6.4vw,104px)]">
            Your website should make enquiries easy.
          </h2>
          <p className="max-w-[42ch] text-base leading-relaxed text-muted md:text-lg">
            Customers should understand what you offer, see what it costs and reach you on WhatsApp in a few taps.
            That is what every SiteBlitz page is built around.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Card grounds alternate like the reference's stacked service cards: ink, vermilion, raised ivory. */
const CARD_THEME = [
  { card: "bg-ink text-void", sub: "text-void/80", btn: "btn-volt", frame: "bg-void/10" },
  { card: "bg-volt text-surface", sub: "text-surface/90", btn: "btn-ivory", frame: "bg-ink/15" },
  { card: "bg-raised text-ink", sub: "text-muted", btn: "btn-volt", frame: "bg-ink/8" },
] as const;

/** 04 — Demo stack: the three concept demos as cards that stack as you scroll (CSS sticky; Motion.tsx scales
 *  the card underneath). Each card links to the live, clearly labelled concept site. */
export function DemoStack() {
  return (
    <section id="demos" data-wa="demos" aria-labelledby="demos-title" className="scroll-mt-20 bg-void pb-[12vh] pt-[6vh]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <p className="kicker text-volt">Concept demos · fictional businesses</p>
        <div className="mt-4 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h2 id="demos-title" className="display text-[clamp(44px,11vw,64px)] md:text-[clamp(64px,6.4vw,104px)]">
            Concept sites for three trades.
          </h2>
          <p className="max-w-[44ch] text-base leading-relaxed text-muted md:text-lg">
            Each one is a working website for a made-up business. Open it on your phone, tap through it and try the
            enquiry: that is the standard your own site is built to.
          </p>
        </div>

        <div data-demo-stack className="mt-12 flex flex-col gap-[8vh] md:mt-16">
          {DEMO_LIST.map((d, i) => {
            const t = CARD_THEME[i % CARD_THEME.length];
            return (
              <article
                key={d.id}
                data-demo-card
                aria-labelledby={`demo-${d.id}-title`}
                className={`demo-card-v3 sticky top-[72px] grid grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-[20px] md:top-[96px] md:grid-cols-[5fr_7fr] md:grid-rows-1 md:rounded-[28px] ${t.card}`}
              >
                <div className="order-2 flex flex-col p-6 md:order-1 md:p-12">
                  <p className={`kicker ${t.sub}`}>
                    Concept {String(i + 1).padStart(2, "0")} · {d.brand}
                  </p>
                  <h3 id={`demo-${d.id}-title`} className="display mt-3 text-[clamp(40px,10vw,56px)] md:mt-5 md:text-[clamp(56px,5.4vw,88px)]">
                    {d.vertical}
                  </h3>
                  <p className={`mt-3 max-w-[38ch] text-base leading-relaxed md:mt-5 md:text-lg ${t.sub}`}>{d.pitch}</p>
                  <div className="mt-5 md:mt-auto md:pt-8">
                    <Link
                      href={`/demo/${d.id}`}
                      data-track={`demos_open_${d.id}`}
                      className={`${t.btn} inline-flex h-[52px] items-center justify-center rounded-full px-7 text-base font-semibold`}
                    >
                      View live concept
                    </Link>
                  </div>
                </div>
                <div className={`order-1 flex items-start justify-center overflow-hidden px-6 pt-6 md:order-2 md:items-center md:p-10 ${t.frame}`}>
                  {/* Phone: the 390 px capture; desktop: the 1440 px capture in a browser frame */}
                  <div className="demo-shot w-full max-w-[300px] overflow-hidden rounded-t-[18px] md:hidden">
                    <Image
                      src={`/demos/${d.id}.png`}
                      alt={`${d.vertical} concept website on a phone`}
                      width={780}
                      height={1624}
                      sizes="300px"
                      loading="eager"
                      className="block h-auto w-full"
                    />
                  </div>
                  <div className="demo-shot hidden w-full overflow-hidden rounded-[14px] bg-surface shadow-2xl md:block">
                    <div className="flex h-8 items-center gap-1.5 border-b border-line px-3" aria-hidden>
                      <span className="h-2.5 w-2.5 rounded-full bg-line" />
                      <span className="h-2.5 w-2.5 rounded-full bg-line" />
                      <span className="h-2.5 w-2.5 rounded-full bg-line" />
                      <span className="ml-3 truncate text-xs text-muted">siteblitz · /demo/{d.id}</span>
                    </div>
                    <Image
                      src={`/demos/${d.id}-desktop.webp`}
                      alt={`${d.vertical} concept website on a laptop`}
                      width={1440}
                      height={900}
                      sizes="(min-width: 768px) 52vw, 1px"
                      loading="eager"
                      className="block h-auto w-full"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** 05 — Type wipe: one word grows until its vermilion fills the screen (the reference's "VIBES" moment). */
export function TypeWipe() {
  return (
    <section data-scene="wipe" aria-labelledby="wipe-title" className="wipe-scene relative">
      <h2 id="wipe-title" className="sr-only">
        Make your business visible online
      </h2>
      <div data-wipe-stage className="wipe-stage sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <p aria-hidden data-wipe-word className="display whitespace-nowrap text-[26vw] leading-none md:text-[22vw]">
          Visible.
        </p>
      </div>
    </section>
  );
}

/** 06 — Packages: a sticky rail of the three packages beside their full details (PX PUSH's package focus).
 *  Every price, split and term is static HTML from offer.ts; Motion.tsx only marks the package in view. */
export function Packages() {
  return (
    <section id="pricing" data-wa="pricing" aria-labelledby="pricing-title" className="scroll-mt-20 bg-void pb-[14vh] pt-[12vh]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <p className="kicker text-volt">Packages</p>
        <div className="mt-4 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h2 id="pricing-title" className="display text-[clamp(44px,11vw,64px)] md:text-[clamp(64px,6.4vw,104px)]">
            Three ways to start.
          </h2>
          <p className="max-w-[44ch] text-base leading-relaxed text-muted md:text-lg">
            Fixed prices with no GST added. The pages, the timeline and what is not included are written down before
            you pay anything.
          </p>
        </div>

        <div data-rail className="mt-12 md:mt-16 md:grid md:grid-cols-[38fr_62fr] md:gap-12">
          <nav aria-label="Packages" className="hidden md:sticky md:top-[104px] md:block md:self-start">
            <ol className="flex flex-col gap-3">
              {PACKAGES.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#pkg-${p.id}`}
                    data-rail-row={p.id}
                    className="rail-row flex h-[112px] items-center justify-between gap-4 rounded-[20px] border border-line bg-surface px-7"
                  >
                    <span>
                      <span className="display block text-[40px]">{p.name}</span>
                      <span className="rail-sub text-sm text-muted">{p.pages}</span>
                    </span>
                    <span className="display text-[40px]">{p.priceInr ? inr(p.priceInr) : "Quote"}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-6">
            {PACKAGES.map((p) => (
              <article
                key={p.id}
                id={`pkg-${p.id}`}
                data-rail-panel={p.id}
                aria-labelledby={`pkg-${p.id}-title`}
                className="pkg-panel scroll-mt-28 rounded-[20px] border border-line bg-surface p-6 md:min-h-[65svh] md:rounded-[28px] md:p-12"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 id={`pkg-${p.id}-title`} className="display text-[36px] md:text-[56px]">
                    {p.name}
                  </h3>
                  <span className="rounded-full bg-raised px-3 py-1 text-sm font-semibold">{p.pages}</span>
                  {p.recommended && (
                    <span className="rounded-full bg-volt px-3 py-1 text-sm font-semibold text-surface">Most complete</span>
                  )}
                </div>
                <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg">{p.tagline}</p>
                <p className="display mt-6 pb-[0.12em] text-[42px] text-volt md:text-[96px]">{p.priceInr ? inr(p.priceInr) : "By quote"}</p>
                <p className="mt-1 text-sm text-muted">
                  {p.priceInr ? "One-time build price · no GST added" : "Priced to the agreed scope"}
                </p>
                <p className="mt-4 text-base font-semibold">{p.delivery}</p>
                <ul className="mt-6 grid gap-2.5 md:grid-cols-2">
                  {p.includes.map((f) => (
                    <li key={f} className="flex gap-2.5 text-base text-ink">
                      <span className="mt-0.5 font-semibold text-volt" aria-hidden>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                {p.payments && (
                  <p className="mt-6 rounded-xl bg-raised px-4 py-3 text-sm leading-relaxed text-ink">
                    Pay {inr(p.payments[0])} after you approve the design and scope, {inr(p.payments[1])} after you
                    approve the finished site.
                  </p>
                )}
                <a
                  href={SITE.whatsapp(
                    p.priceInr
                      ? `Hi SiteBlitz, I'm interested in the ${p.name} website (${inr(p.priceInr)}). My business is: `
                      : "Hi SiteBlitz, I need a custom website quote. My business is: "
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track={`pricing_whatsapp_${p.id}`}
                  className={`mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-base font-semibold ${
                    p.recommended ? "btn-volt" : "btn-ghost text-ink"
                  }`}
                >
                  <WhatsAppIcon className="h-5 w-5" color="currentColor" />
                  {p.priceInr ? `Ask about ${p.name}` : "Request a custom quote"}
                </a>
              </article>
            ))}
            <p className="text-sm text-muted">
              Prices cover the website build. Domain, hosting, renewals and optional maintenance are written in your
              quotation before you pay.{" "}
              <Link href="/pricing#terms" className="font-semibold text-volt underline-offset-4 hover:underline">
                See the full terms
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 07 — Four steps: each step lights up and draws its line as it arrives (1820's statement rhythm). */
export function Process() {
  return (
    <section id="how" data-wa="process" aria-labelledby="how-title" className="scroll-mt-20 bg-raised py-[14vh]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <p className="kicker text-volt-dim">How it works</p>
        <h2 id="how-title" className="display mt-4 max-w-[16ch] text-[clamp(44px,11vw,64px)] md:text-[clamp(64px,6.4vw,104px)]">
          Four steps. You approve before you pay.
        </h2>
        <ol data-steps className="mt-12 grid gap-10 md:mt-16 md:grid-cols-4 md:gap-8">
          {PROCESS_STEPS.map((s) => (
            <li key={s.n} data-step className="step">
              <div data-step-line className="h-[3px] w-full origin-left bg-ink" />
              <p className="step-n display mt-5 text-[52px] md:text-[96px]">{s.n}</p>
              <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
              <p className="kicker mt-2 text-muted">{s.time}</p>
              <p className="mt-3 text-base leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 08 — The promise: scattered letters assemble on scroll (the reference's "NOTHING BUT THE TRUTH"); the
 *  qualifier is plain text from the first frame, never animated in. */
export function ConceptPromise() {
  return (
    <section data-wa="concept" aria-labelledby="promise-title" className="overflow-hidden bg-void py-[16vh]">
      <div className="mx-auto max-w-[1440px] px-4 text-center md:px-8">
        <h2
          id="promise-title"
          data-scatter
          className="display mx-auto max-w-[12ch] text-[clamp(44px,13vw,54px)] md:max-w-none md:text-[clamp(88px,8.4vw,120px)]"
        >
          See it before you pay
        </h2>
        <p className="mx-auto mt-8 max-w-[56ch] text-base leading-relaxed text-muted md:text-lg">
          Qualified businesses can review a personalised homepage concept before the first payment, subject to weekly
          availability ({CONCEPT_CAP_PER_WEEK} concepts a week). It is a design preview, not a finished website.
        </p>
        <a
          href={SITE.whatsapp("Hi SiteBlitz, I'd like to ask about a homepage concept for my business. My business is: ")}
          target="_blank"
          rel="noopener noreferrer"
          data-track="promise_whatsapp"
          className="btn-volt mt-8 inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-base font-semibold"
        >
          <WhatsAppIcon className="h-5 w-5" color="currentColor" /> Ask about a concept
        </a>
      </div>
    </section>
  );
}

/** 10 — The close: the ground turns ink as it arrives and runs straight into the footer. */
export function Close() {
  return (
    <section data-close data-wa="close" aria-labelledby="close-title" className="close-scene py-[16vh]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <p className="kicker close-kicker">Start here</p>
        <h2 id="close-title" className="display mt-4 text-[clamp(44px,13vw,54px)] md:text-[clamp(88px,8.4vw,120px)]">
          Let&apos;s build your website.
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="close-sub max-w-[52ch] text-base leading-relaxed md:text-lg">
            Tell us what your business does and what customers should be able to do. We reply with the matching
            concept demo, the price and the next step. No pressure to buy.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE.whatsapp(WA_DEMO)}
              target="_blank"
              rel="noopener noreferrer"
              data-track="final_whatsapp"
              className="btn-volt inline-flex h-14 items-center justify-center gap-2 rounded-full px-8 text-lg font-semibold"
            >
              <WhatsAppIcon className="h-5 w-5" color="currentColor" /> Chat on WhatsApp
            </a>
            <Link
              href="/pricing"
              className="close-ghost inline-flex h-14 items-center justify-center rounded-full border-[1.5px] px-8 text-lg font-semibold"
            >
              Pricing &amp; terms
            </Link>
          </div>
        </div>
        <p className="close-sub mt-10 text-sm">
          Replies {SITE.replyHours} · {SITE.locationLine}
        </p>
      </div>
    </section>
  );
}

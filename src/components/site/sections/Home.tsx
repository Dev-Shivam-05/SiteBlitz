import Image from "next/image";
import Link from "next/link";
import { DEMO_LIST } from "@/lib/demos";
import { PHOTOS } from "@/lib/photos";
import { PROCESS_STEPS, SITE } from "@/lib/site";
import { FROM_PRICE, inr, launchPkg } from "@/lib/offer";
import { PricingPlans } from "./PricingPlans";
import { WhatsAppIcon } from "../WhatsAppIcon";

/* Redesign v3 home (docs/spec/redesign-v3-motion.md): the motion grammar of the reference (Horeca Social)
   carried by SiteBlitz's own content. Every scene is complete, readable server HTML; Motion.tsx only adds
   transforms through data-scene hooks, so nothing waits for JavaScript and reduced motion shows it all static.
   Copy rule: no invented reviews, client counts, results or guarantees. */

const WA_DEMO = "Hi SiteBlitz, I'd like to see a website demo for my business and the package details.";
const LAUNCH_DELIVERY = launchPkg.delivery; // "2 working days after ready-to-build"

/** 01 — Hero: a full-bleed shop photograph, the offer on a solid ink panel, the concept phone on the photo. */
export function HomeHero() {
  const photo = PHOTOS.heroShop;
  return (
    <section data-scene="hero" className="relative h-[100svh] min-h-[640px] md:min-h-[720px]">
      <div data-hero-frame className="hero-frame absolute inset-0 overflow-hidden bg-ink">
        <Image src={photo.src} alt={photo.alt} fill priority sizes="100vw" className="object-cover" />
        {/* The concept phone: decorative (the same demo is linked, with its disclosure, further down) */}
        <div
          aria-hidden
          className="phone-frame absolute right-4 top-[88px] w-[118px] overflow-hidden sm:w-[150px] md:bottom-[10vh] md:right-[8vw] md:top-auto md:w-[clamp(220px,22vw,320px)]"
        >
          <Image
            src="/demos/showroom.png"
            alt=""
            width={780}
            height={1624}
            sizes="(min-width: 768px) 22vw, 150px"
            className="block h-auto w-full"
          />
        </div>
      </div>

      <div
        data-hero-words
        className="absolute inset-x-3 bottom-3 rounded-[20px] bg-ink p-6 text-void sm:inset-x-4 sm:bottom-4 md:inset-x-auto md:bottom-12 md:left-8 md:max-w-[min(760px,58vw)] md:rounded-[28px] md:p-12"
      >
        <p className="kicker text-void/75">{SITE.locationLine}</p>
        <h1 className="display mt-4 text-[clamp(50px,14vw,72px)] md:text-[clamp(88px,8.6vw,132px)]">
          Websites.
          <br />
          {/* volt on ink is 3.38:1, allowed here only because the headline is >= 50 px (AA large text) */}
          <span className="text-volt">From {inr(FROM_PRICE)}.</span>
        </h1>
        <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-void/85 md:text-lg">
          Mobile-first websites for salons, coaching classes and showrooms.
        </p>
        <p className="mt-2 text-sm font-semibold text-void">
          Launch: {launchPkg.pages} · {LAUNCH_DELIVERY}.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={SITE.whatsapp(WA_DEMO)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="hero_whatsapp"
            className="btn-volt flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-base font-semibold"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" /> Chat on WhatsApp
          </a>
          <Link
            href="#demos"
            data-track="hero_demos"
            className="btn-line flex h-[52px] items-center justify-center rounded-full px-7 text-base font-semibold"
          >
            View live concepts
          </Link>
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

export function DemoShowcase() {
  return (
    <section id="demos" className="scroll-mt-20 border-y border-line bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-volt">See it working</p>
        <h2 className="font-display mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-5xl">
          Don&apos;t just imagine your website. Explore one.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Interactive concept websites that show the design and customer experience we build. They are sample
          projects, not websites made for paying clients.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {DEMO_LIST.map((d) => (
            <Link
              key={d.id}
              href={`/demo/${d.id}`}
              data-track={`demos_open_${d.id}`}
              className="card-hover group flex flex-col overflow-hidden rounded-3xl border border-line bg-void"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-raised">
                {/* Eager: three small optimised images are the proof a buyer came for; native lazy
                    loading never fired for them in headless QA, so the section doesn't bet on it. */}
                <Image
                  src={`/demos/${d.id}.png`}
                  alt={`${d.vertical} concept demo`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  loading="eager"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-void">
                  Concept demo
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold">{d.vertical}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{d.pitch}</p>
                <span className="mt-5 text-sm font-semibold text-volt">Explore the {d.vertical.split(" ")[0].toLowerCase()} demo →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 md:px-8 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-volt">How it works</p>
      <h2 className="font-display mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-5xl">
        A clear process, before any payment.
      </h2>
      <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((s) => (
          <li key={s.n} className="rounded-3xl border border-line bg-surface p-6">
            <p className="font-display text-sm font-extrabold text-volt">{s.n}</p>
            <h3 className="font-display mt-3 text-lg font-bold">{s.title}</h3>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-faint">{s.time}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
      <a
        href={SITE.whatsapp("Hi SiteBlitz, I'd like to discuss a website for my business.")}
        target="_blank"
        rel="noopener noreferrer"
        data-track="how_whatsapp"
        className="btn-volt mt-8 inline-block rounded-full px-7 py-3.5 text-sm font-semibold"
      >
        Discuss your website
      </a>
    </section>
  );
}

export function HomePricing() {
  return (
    <section id="pricing" className="scroll-mt-20 border-y border-line bg-raised/60 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-volt">Pricing</p>
        <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
          Clear prices. Work agreed in writing.
        </h2>
        <div className="mt-10">
          <PricingPlans headingLevel="h3" />
        </div>
      </div>
    </section>
  );
}

const COMPARE_ROWS = [
  ["Who builds it?", "You", "Depends on the person", "The SiteBlitz team"],
  ["Scope and timeline", "You manage them", "Agreed individually", "Written before payment"],
  ["See the design first?", "Templates only", "Varies", "Concept for your business"],
  ["Domain ownership", "Depends on setup", "Must be agreed", "Your own account (recommended)"],
  ["Ongoing costs", "Platform + domain plans", "Depends on arrangement", "Disclosed before you buy"],
  ["Support", "Depends on plan", "Depends on agreement", "Defined in the project terms"],
] as const;

export function Compare() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-volt">Choose what fits</p>
      <h2 className="font-display mt-3 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">
        Different ways to get a website. Pick the right one for you.
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        A website builder suits you if you want to design it yourself. A freelancer may suit you if their process
        and availability fit. SiteBlitz is a defined service with working demos, a written scope and a review step.
        We don&apos;t claim every business needs us.
      </p>
      <div className="mt-8 overflow-x-auto rounded-3xl border border-line bg-surface">
        <table className="w-full min-w-[620px] text-left text-sm">
          <caption className="sr-only">Comparison of website options</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="p-4 font-semibold text-faint">What matters</th>
              <th scope="col" className="p-4 font-semibold">DIY builder</th>
              <th scope="col" className="p-4 font-semibold">Freelancer</th>
              <th scope="col" className="bg-volt/10 p-4 font-bold text-volt">SiteBlitz</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map(([label, a, b, c]) => (
              <tr key={label} className="border-b border-line last:border-0">
                <th scope="row" className="p-4 font-semibold">{label}</th>
                <td className="p-4 text-muted">{a}</td>
                <td className="p-4 text-muted">{b}</td>
                <td className="bg-volt/[0.06] p-4 font-medium">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="bg-ink px-5 py-16 text-void md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
          Let&apos;s see what a website could look like for your business.
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed opacity-85">
          Tell us what your business does. We&apos;ll share a relevant working demo and explain the options, price and
          next steps. No pressure to buy.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={SITE.whatsapp(WA_DEMO)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="final_whatsapp"
            className="rounded-full bg-void px-7 py-4 text-base font-semibold text-ink"
          >
            Start a WhatsApp conversation
          </a>
          <Link href="#demos" className="rounded-full border border-void/40 px-7 py-4 text-base font-semibold">
            Explore our demos
          </Link>
        </div>
        <p className="mt-6 text-xs opacity-75">Replies {SITE.replyHours} · {SITE.locationLine}</p>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { DEMO_LIST } from "@/lib/demos";
import { PROCESS_STEPS, SITE } from "@/lib/site";
import { businessPkg, inr, launchPkg } from "@/lib/offer";
import { DemoSwitcher } from "../DemoSwitcher";
import { PricingPlans } from "./PricingPlans";

/* Home page sections, in the psychology-led order agreed in
   docs/debate/2026-11-01-ads-psychology-redesign/03_chatgpt.md: what it is and what it costs ->
   see it working -> how buying works -> price and terms -> honest comparison -> questions -> next step.
   Copy rule: no invented reviews, client counts, results or guarantees. */

const WA_DEMO = "Hi SiteBlitz, I'd like to see a website demo for my business and the package details.";

export function HomeHero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-24 md:grid-cols-[1.15fr_1fr] md:px-8 md:pb-24 md:pt-32">
      <div>
        <p className="text-sm font-medium text-muted">{SITE.locationLine}</p>
        <h1 className="font-display mt-4 text-[2.35rem] font-extrabold leading-[1.05] tracking-tight md:text-6xl">
          Websites that help customers understand your business<span className="text-volt"> — and get in touch.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Professional, mobile-friendly websites for local businesses. See working demos, know the price upfront,
          and review a homepage concept for your own business before you pay.
        </p>
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-faint">One page</dt>
            <dd className="font-display text-2xl font-extrabold">{inr(launchPkg.priceInr as number)}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-faint">Three pages</dt>
            <dd className="font-display text-2xl font-extrabold">{inr(businessPkg.priceInr as number)}</dd>
          </div>
          <div className="self-end text-sm text-muted">One-time · no GST added · custom work by quote</div>
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={SITE.whatsapp(WA_DEMO)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="hero_whatsapp"
            className="btn-volt rounded-full px-7 py-4 text-center text-base font-semibold"
          >
            Chat on WhatsApp
          </a>
          <Link href="#demos" data-track="hero_demos" className="btn-ghost rounded-full px-7 py-4 text-center text-base font-semibold text-ink">
            Explore working demos
          </Link>
        </div>
        <p className="mt-5 text-sm text-muted">
          No invented reviews. No guaranteed rankings. Real demos, a written scope, and you approve the design before
          paying.
        </p>
      </div>
      <DemoSwitcher />
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
                <Image
                  src={`/demos/${d.id}.png`}
                  alt={`${d.vertical} concept demo`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
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

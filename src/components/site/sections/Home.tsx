import Image from "next/image";
import Link from "next/link";
import { DEMOS, DEMO_LIST } from "@/lib/demos";
import { PHOTOS, type PhotoId } from "@/lib/photos";
import { PROCESS_STEPS, SITE } from "@/lib/site";
import { CONCEPT_CAP_PER_WEEK, EXCLUSIONS, FROM_PRICE, PACKAGES, inr, launchPkg } from "@/lib/offer";
import { WhatsAppIcon } from "../WhatsAppIcon";
import { Magnetic } from "../Magnetic";
import { ParticleHero } from "../hero/ParticleHero";

/* Redesign v4 home (docs/spec/redesign-v4-showcase.md). Every scene is complete, readable server HTML; the WebGL
   hero and Motion.tsx only add transforms through data-* hooks, so reduced motion shows everything static.
   Copy rule: no invented reviews, client counts, results or guarantees; prices and terms come from offer.ts. */

const WA_DEMO = "Hi SiteBlitz, I'd like to see a website demo for my business and the package details.";
const LAUNCH_DELIVERY = launchPkg.delivery; // "2 working days after ready-to-build"

/** A hand-drawn volt stroke that Motion.tsx draws as its section scrolls in ([data-draw]); fully drawn when static. */
function Stroke({ d, viewBox, className }: { d: string; viewBox: string; className: string }) {
  return (
    <svg aria-hidden viewBox={viewBox} preserveAspectRatio="none" fill="none" className={`stroke-draw ${className}`}>
      <path data-draw d={d} pathLength={100} stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

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
                Built <span className="serif whitespace-nowrap text-volt">like this.</span>
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

/** 02 — Statement: the promise in giant mixed type, a volt stroke drawn under its key word, and the explanation
 *  tinting word by word as you read down. */
export function Statement() {
  return (
    <section className="relative bg-void py-[16vh] md:py-[22vh]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <p className="kicker text-volt">What every page is for</p>
        <h2 className="display mt-6 max-w-[14ch] text-[clamp(40px,10.5vw,60px)] md:text-[clamp(64px,7.2vw,132px)]">
          Your website should make{" "}
          <span className="relative inline-block">
            enquiries
            <Stroke
              viewBox="0 0 300 24"
              d="M4 15 C 60 5, 120 3, 182 9 S 268 21, 296 7"
              className="absolute -bottom-[0.14em] left-0 h-[0.22em] w-full text-volt"
            />
          </span>{" "}
          <span className="serif text-volt">easy.</span>
        </h2>
        <p
          data-anim="words-scrub"
          className="ml-auto mt-12 max-w-[32ch] text-2xl font-semibold leading-snug md:mt-20 md:text-[2.6rem] md:leading-[1.15]"
        >
          Customers should understand what you offer, see what it costs and reach you on WhatsApp in a few taps. That is
          what every SiteBlitz page is built around.
        </p>
      </div>
    </section>
  );
}

/** 03 — The giant price: SiteBlitz's one hard fact set huge, rising out of its section with a volt loop drawn round it. */
export function GiantPrice() {
  return (
    <section aria-labelledby="price-title" className="relative overflow-hidden bg-void pb-[14vh] pt-[6vh]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <p className="kicker text-volt">The Launch package</p>
        <h2 id="price-title" className="sr-only">
          Launch package price: {inr(FROM_PRICE)}
        </h2>
        <div className="relative mt-8 inline-block md:mt-10">
          <p aria-hidden data-rise className="display whitespace-nowrap pb-[0.08em] text-[22vw] leading-[0.86] md:text-[min(20vw,290px)]">
            {inr(FROM_PRICE)}
          </p>
          <Stroke
            viewBox="0 0 600 220"
            d="M 300 16 C 520 8, 596 70, 586 120 C 574 188, 420 212, 280 206 C 118 200, 10 168, 16 108 C 22 50, 150 14, 336 22"
            className="absolute -inset-x-[5%] -inset-y-[16%] h-[132%] w-[110%] text-volt"
          />
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 md:mt-14 md:flex-row md:items-baseline md:justify-between">
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

/* 04 drift collage: each frame floats at its own speed (data-drift, Motion.tsx) round the sticky heading.
   Positions are % of the section; frames marked `desk` are hidden on phones to keep the collage readable. */
interface Frame {
  kind: "desk" | "phone" | "photo";
  id: string;
  left: string;
  top: string;
  w: string;
  speed: number;
  front?: boolean;
  desk?: boolean;
}
const FRAMES: readonly Frame[] = [
  { kind: "desk", id: "salon", left: "3%", top: "4%", w: "w-[62vw] md:w-[30vw]", speed: 0.5 },
  { kind: "phone", id: "coaching", left: "70%", top: "3%", w: "w-[26vw] md:w-[11vw]", speed: -0.35, front: true },
  { kind: "photo", id: "salonInterior", left: "55%", top: "22%", w: "w-[18vw]", speed: 0.25, desk: true },
  { kind: "phone", id: "salon", left: "7%", top: "44%", w: "w-[24vw] md:w-[10vw]", speed: -0.55, front: true },
  { kind: "desk", id: "showroom", left: "62%", top: "50%", w: "w-[30vw]", speed: 0.6, desk: true },
  { kind: "photo", id: "coachingClassroom", left: "24%", top: "68%", w: "w-[48vw] md:w-[19vw]", speed: 0.3 },
  { kind: "phone", id: "showroom", left: "84%", top: "34%", w: "w-[10vw]", speed: -0.7, front: true, desk: true },
  { kind: "desk", id: "coaching", left: "2%", top: "80%", w: "w-[26vw]", speed: 0.2, desk: true },
  { kind: "photo", id: "showroomInterior", left: "56%", top: "82%", w: "w-[40vw] md:w-[22vw]", speed: 0.45 },
];

function FrameArt({ f }: { f: Frame }) {
  if (f.kind === "photo") {
    const p = PHOTOS[f.id as PhotoId];
    return <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 768px) 22vw, 48vw" className="block h-auto w-full" />;
  }
  if (f.kind === "phone")
    return (
      <Image src={`/demos/${f.id}.png`} alt="" width={780} height={1624} sizes="(min-width: 768px) 11vw, 26vw" className="block h-auto w-full" />
    );
  return (
    <Image src={`/demos/${f.id}-desktop.webp`} alt="" width={1440} height={900} sizes="(min-width: 768px) 30vw, 62vw" className="block h-auto w-full" />
  );
}

/** 04 — Drift: the concept captures and trade photographs float past at different speeds round one sticky heading. */
export function DriftCollage() {
  return (
    <section id="demos" data-wa="demos" aria-labelledby="demos-title" className="drift scroll-mt-20">
      {FRAMES.map((f, i) => (
        <div
          key={i}
          data-drift={f.speed}
          className={`drift-frame ${f.w} ${f.front ? "z-[3]" : "z-[1]"} ${f.desk ? "hidden md:block" : ""} ${
            f.kind === "phone" ? "rounded-[18px] md:rounded-[22px]" : "rounded-[12px] md:rounded-[16px]"
          }`}
          style={{ left: f.left, top: f.top }}
        >
          <FrameArt f={f} />
        </div>
      ))}
      <div className="drift-stage">
        <div className="mx-auto max-w-[1440px] px-4 text-center md:px-8">
          <p className="kicker text-volt">Concept demos · fictional businesses</p>
          <h2 id="demos-title" className="display mx-auto mt-5 max-w-[12ch] text-[clamp(44px,12vw,64px)] md:text-[clamp(72px,8.6vw,156px)]">
            Concept sites for <span className="serif whitespace-nowrap text-volt">three trades.</span>
          </h2>
          <p className="drift-copy mx-auto mt-6 max-w-[44ch] text-base leading-relaxed text-ink/85 md:text-lg">
            Each one is a working website for a made-up business. Open it on your phone, tap through it and try the
            enquiry: that is the standard your own site is built to.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Pixel heights of public/demos/{id}-full.webp (960 px wide), so next/image reserves the right box. */
const DEMO_FULL_HEIGHT: Record<string, number> = { salon: 2158, coaching: 2158, showroom: 2158 };

/** 05 — The concept wall: three large cards that rise in while the section holds; hovering a card scrolls through
 *  the whole concept site inside it (cursor: VIEW), and a click or tap opens the live demo. */
export function ConceptWall() {
  return (
    <section data-hall aria-labelledby="hall-title" className="hall bg-void">
      <div className="hall-stage">
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 id="hall-title" className="display text-[clamp(40px,11vw,60px)] md:text-[clamp(56px,5.6vw,100px)]">
              Three concepts. <span className="serif whitespace-nowrap text-volt">Live now.</span>
            </h2>
            <p className="max-w-[36ch] text-base text-muted md:text-right">
              <span className="hidden md:inline">Hover a card to scroll through the site. </span>Open one and try it on your
              phone.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
            {DEMO_LIST.map((d, i) => (
              <Link
                key={d.id}
                href={`/demo/${d.id}`}
                data-hall-card
                data-cursor="view"
                data-track={`demos_open_${d.id}`}
                className="hall-card group block"
              >
                <div className="hall-screen">
                  <Image
                    src={`/demos/${d.id}.png`}
                    alt={`${d.vertical} concept website on a phone`}
                    width={780}
                    height={1624}
                    sizes="92vw"
                    className="hall-phone block h-auto w-full md:hidden"
                  />
                  <Image
                    src={`/demos/${d.id}-full.webp`}
                    alt={`${d.vertical} concept website, the whole page`}
                    width={960}
                    height={DEMO_FULL_HEIGHT[d.id] ?? 2158}
                    sizes="(min-width: 768px) 31vw, 1px"
                    className="hall-scroll hidden h-auto w-full md:block"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="kicker text-faint">Concept {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="display mt-2 text-[1.6rem] md:text-[1.9rem]">{d.vertical}</h3>
                    <p className="mt-1 text-sm text-muted">{d.brand} · a fictional business</p>
                  </div>
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-lg transition-all duration-300 group-hover:-rotate-45 group-hover:border-volt group-hover:bg-volt group-hover:text-void"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PANEL_THEME = {
  launch: { panel: "bg-surface border border-line", sub: "text-muted", price: "text-ink", chip: "bg-raised", btn: "btn-volt", tick: "text-volt" },
  business: { panel: "bg-volt text-void", sub: "text-void/75", price: "text-void", chip: "bg-void/10", btn: "btn-dark", tick: "text-void" },
  custom: { panel: "bg-raised border border-line", sub: "text-muted", price: "text-ink", chip: "bg-surface", btn: "btn-line", tick: "text-volt" },
} as const;

/** 06 — Packages: a sideways track of colour panels (Motion.tsx [data-htrack]: the section holds while the track
 *  slides, and a mouse can drag it). Before the scene is built, under reduced motion and on short screens the panels
 *  simply stack. Every price, split and term is static HTML from offer.ts. */
export function Packages() {
  return (
    <section id="pricing" data-wa="pricing" data-htrack aria-labelledby="pricing-title" className="pk scroll-mt-20 bg-void">
      <div className="pk-stage">
        <div data-htrack-rail data-cursor="drag" className="pk-rail">
          <div className="pk-intro">
            <p className="kicker text-volt">Packages</p>
            <h2 id="pricing-title" className="display mt-5 text-[clamp(44px,12vw,60px)] md:text-[clamp(64px,6.4vw,112px)]">
              Three ways <span className="serif whitespace-nowrap text-volt">to start.</span>
            </h2>
            <p className="mt-6 max-w-[38ch] text-base leading-relaxed text-muted md:text-lg">
              Fixed prices with no GST added. The pages, the timeline and what is not included are written down before
              you pay anything.
            </p>
            <p aria-hidden className="pk-hint kicker mt-8 hidden items-center gap-3 text-faint">
              <span className="hero-cue-line" /> Scroll or drag
            </p>
          </div>

          {PACKAGES.map((p) => {
            const t = PANEL_THEME[p.id];
            return (
              <article key={p.id} id={`pkg-${p.id}`} aria-labelledby={`pkg-${p.id}-title`} className={`pk-panel ${t.panel}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 id={`pkg-${p.id}-title`} className="display text-[34px] md:text-[48px]">
                    {p.name}
                  </h3>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${t.chip}`}>{p.pages}</span>
                  {p.recommended && <span className="rounded-full bg-void px-3 py-1 text-sm font-semibold text-volt">Most complete</span>}
                </div>
                <p className={`mt-3 max-w-[44ch] text-base leading-relaxed ${t.sub}`}>{p.tagline}</p>
                <p className={`display mt-5 pb-[0.06em] text-[44px] md:text-[clamp(56px,5vw,88px)] ${t.price}`}>
                  {p.priceInr ? inr(p.priceInr) : "By quote"}
                </p>
                <p className={`text-sm ${t.sub}`}>{p.priceInr ? "One-time build price · no GST added" : "Priced to the agreed scope"}</p>
                <p className="mt-3 text-base font-semibold">{p.delivery}</p>
                <ul className="mt-5 grid gap-2 lg:grid-cols-2">
                  {p.includes.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[15px] leading-snug">
                      <span className={`font-semibold ${t.tick}`} aria-hidden>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                {p.payments && (
                  <p className={`mt-5 text-sm leading-relaxed ${t.sub}`}>
                    Pay {inr(p.payments[0])} after you approve the design and scope, {inr(p.payments[1])} after you approve the
                    finished site.
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
                  className={`${t.btn} mt-6 inline-flex h-[52px] items-center justify-center gap-2 self-start rounded-full px-7 text-base font-semibold md:mt-auto`}
                >
                  <WhatsAppIcon className="h-5 w-5" color="currentColor" />
                  {p.priceInr ? `Ask about ${p.name}` : "Request a custom quote"}
                </a>
              </article>
            );
          })}

          <aside aria-label="Not included in the price" className="pk-panel pk-terms border border-line">
            <p className="kicker text-volt">Written in your quotation</p>
            <h3 className="display mt-4 text-[30px] md:text-[40px]">Not in the price</h3>
            <ul className="mt-5 space-y-2.5 text-[15px] leading-snug text-ink/85">
              {EXCLUSIONS.slice(0, 5).map((e) => (
                <li key={e} className="flex gap-2.5">
                  <span aria-hidden className="text-faint">
                    –
                  </span>
                  {e}
                </li>
              ))}
            </ul>
            <Link
              href="/pricing#terms"
              className="btn-line mt-6 inline-flex h-[52px] items-center justify-center self-start rounded-full px-7 text-base font-semibold md:mt-auto"
            >
              See the full terms
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

/** 07 — Four steps on one volt path that draws itself; each number lights up as it arrives. */
export function Process() {
  return (
    <section id="how" data-wa="process" aria-labelledby="how-title" className="scroll-mt-20 bg-void py-[16vh]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <p className="kicker text-volt">How it works</p>
        <h2 id="how-title" className="display mt-5 max-w-[15ch] text-[clamp(40px,10.5vw,60px)] md:text-[clamp(64px,6.4vw,112px)]">
          Four steps. <span className="serif whitespace-nowrap text-volt">You approve</span> before you pay.
        </h2>
        <div className="relative mt-14 md:mt-20">
          <Stroke
            viewBox="0 0 1000 120"
            d="M 0 60 C 80 4, 170 4, 250 60 S 420 116, 500 60 S 670 4, 750 60 S 920 116, 1000 60"
            className="absolute inset-x-0 top-0 hidden h-[120px] w-full text-volt md:block"
          />
          <Stroke
            viewBox="0 0 40 1000"
            d="M 20 0 C 38 120, 2 250, 20 375 S 38 620, 20 750 S 2 900, 20 1000"
            className="absolute bottom-0 left-0 top-0 h-full w-10 text-volt md:hidden"
          />
          <ol className="grid gap-12 pl-14 md:grid-cols-4 md:gap-8 md:pl-0 md:pt-[150px]">
            {PROCESS_STEPS.map((s) => (
              <li key={s.n} data-step className="step">
                <p className="step-n display text-[64px] leading-none md:text-[104px]">{s.n}</p>
                <h3 className="mt-4 text-xl font-semibold md:text-2xl">{s.title}</h3>
                <p className="kicker mt-2 text-volt">{s.time}</p>
                <p className="mt-3 max-w-[34ch] text-base leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** 08 — The promise: scattered letters assemble on scroll; the qualifier is plain text from the first frame. */
export function ConceptPromise() {
  return (
    <section data-wa="concept" aria-labelledby="promise-title" className="promise relative overflow-hidden bg-void py-[18vh]">
      <div className="relative mx-auto max-w-[1440px] px-4 text-center md:px-8">
        <h2
          id="promise-title"
          data-scatter
          className="display mx-auto max-w-[11ch] text-[clamp(44px,12.5vw,60px)] md:max-w-none md:text-[clamp(80px,8vw,150px)]"
        >
          See it <span className="serif text-volt">before</span> you pay
        </h2>
        <p className="mx-auto mt-10 max-w-[56ch] text-base leading-relaxed text-muted md:text-lg">
          Qualified businesses can review a personalised homepage concept before the first payment, subject to weekly
          availability ({CONCEPT_CAP_PER_WEEK} concepts a week). It is a design preview, not a finished website.
        </p>
        <Magnetic strength={0.3} className="mt-9">
          <a
            href={SITE.whatsapp("Hi SiteBlitz, I'd like to ask about a homepage concept for my business. My business is: ")}
            target="_blank"
            rel="noopener noreferrer"
            data-track="promise_whatsapp"
            className="btn-volt inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-base font-semibold"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" /> Ask about a concept
          </a>
        </Magnetic>
      </div>
    </section>
  );
}

/** 10 — The close: the ground turns volt as it arrives (Motion.tsx toggles .is-lit) and runs into the footer. */
export function Close() {
  return (
    <section data-close data-wa="close" aria-labelledby="close-title" className="close-scene py-[16vh] md:py-[20vh]">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <p className="kicker close-kicker">Start here</p>
        <h2 id="close-title" className="display mt-5 text-[clamp(52px,15vw,72px)] md:text-[clamp(96px,11vw,200px)]">
          Let&apos;s build <span className="serif">yours.</span>
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="close-sub max-w-[52ch] text-base leading-relaxed md:text-lg">
            Tell us what your business does and what customers should be able to do. We reply with the matching concept
            demo, the price and the next step. No pressure to buy.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Magnetic strength={0.3}>
              <a
                href={SITE.whatsapp(WA_DEMO)}
                target="_blank"
                rel="noopener noreferrer"
                data-track="final_whatsapp"
                className="close-cta inline-flex h-14 w-full items-center justify-center gap-2 rounded-full px-8 text-lg font-semibold"
              >
                <WhatsAppIcon className="h-5 w-5" color="currentColor" /> Chat on WhatsApp
              </a>
            </Magnetic>
            <Link
              href="/pricing"
              className="close-ghost inline-flex h-14 items-center justify-center rounded-full border-[1.5px] px-8 text-lg font-semibold"
            >
              Pricing &amp; terms
            </Link>
          </div>
        </div>
        <p className="close-sub mt-12 text-sm">
          Replies {SITE.replyHours} · {SITE.locationLine}
        </p>
      </div>
    </section>
  );
}

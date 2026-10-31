

---

## Claude Code - 2026-10-31 18:12 UTC - 01_claude.md - attachments: none

name: siteblitz-transformation-debate
use_when: SiteBlitz website / admin transformation decisions after the D1 audit — creative direction, motion storyboard, conversion flow, admin priorities — debated with Claude Code through the /debate skill.

<!-- v1.1 (2026-10-31): replaces v1.0's fixed 3-round protocol and 7-part output with per-point verdicts that match the
/debate skill (≤7 agenda points, 25 KB context, ≤10 rounds). v1.0 is kept unchanged next to this file. -->

You are an independent, demanding reviewer for SiteBlitz, a Mumbai web studio that sells conversion-focused websites
delivered in 48 hours to 4 days. You combine brand strategy, interaction and motion design, UX and conversion, analytics,
privacy/security and senior Next.js architecture. Your job is to improve decisions, not to agree.

You are talking to Claude Code, which has the real repository open and pastes the evidence below. Treat that evidence as
the only facts; anything missing is unknown. Ask for a file by path if you need it.

Hard rules:
- Truthful marketing: SiteBlitz has no verified client results or testimonials yet. Never propose invented reviews, client
  names, numbers or case studies. Trust comes from the live /proof page, the real process, commitments the owner can meet,
  the free grader tool and clearly labelled concept studies.
- Stack-native: Next.js App Router, Tailwind v4 tokens, declarative GSAP via data-anim, server components first, heavy work
  deferred. Every motion idea needs a mobile version, a reduced-motion version and a performance cost.
- Privacy: no covert tracking, fingerprinting or "browsing history" ideas; legal points are "check with counsel".
- Accessibility WCAG 2.2 AA; CWV p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.

How to answer:
- Answer every agenda point by number: "agree", "disagree because …", or "need data: …".
- Be concrete: exact copy, exact section order, exact motion (what moves, trigger, duration, easing, pin length), exact
  token values. Name real reference sites by URL and say what to take from each and what not to copy.
- Accept good choices in one line; do not manufacture disagreement.
- End every reply with the list of points still open.

<project_context>
<file path="E:/Temp/SiteBlitz/docs/debate/2026-10-31-redesign-seo-direction/evidence.md">
# Evidence pack (read from the repo by Claude Code, 2026-10-31)

- Business: SiteBlitz, Mumbai web studio, founded 2024. Plans: Launch ₹7,999/$99 (48 h), Growth ₹14,999/$189 (4 days), Scale ₹24,999/$329. Services: business sites, e-commerce & booking (from ₹24,999), landing pages (₹7,999), project rescue (₹14,999), SEO & GEO (₹9,999), care plans (₹2,499/mo).
- Process (site.ts): Brief 30 min → Blueprint same day → Build 24-48 h → Blitz launch day.
- Truth status (docs/audit/claims-register.md): the 4 former "case studies" were AI mockups showing other brands/lorem ipsum, with no evidence; 5 named testimonials had no provenance. Tonight (C1) all were withdrawn; work is now 4 labelled "concept studies". There are ZERO verified client results or reviews.
- Real trust assets: /proof page + ProofStrip (live visitors, real-user LCP/CLS/INP from first-party RUM, last deploy time); free website grader tool (/tools/grader, 20 checks); public fixed prices + scope calculator; FAQ "if we can't land a direction you love, you don't pay"; terms: client owns code, content, domain on full payment; WhatsApp-first contact with fallback.
- Pages: /, /work, /services + 6 deep service pages, /pricing, /process, /proof, /about, /contact, /book, /tools/grader, /for/{restaurants,clinics,law-firms,boutiques}, /blog + 6 posts (website cost India, must-haves 2026, speed & revenue, GBP + local SEO, landing page vs website, GEO explained), legal pages.
- SEO now: Next.js SSR/SSG, sitemap.ts, robots (disallow /admin, /api), FAQPage + Service + WebSite JSON-LD, OG image route, public/llms.txt (still says "every claim verifiable" and "showcase builds with stated results" — must be fixed). Root keywords meta: "website development India", "business website design", "fast website delivery"... Domain: siteblitz.vercel.app (no custom domain in production; email [REDACTED] suggests siteblitz.in exists — unverified).
- Production is a 113-day-old deployment; v2-redesign (this work) reaches production only at release.
- Design system: dark "void" #0a0a0c, ink #f5f5f0, volt #ccff00 accent, violet #7c5cff; fonts Bricolage (display), Grotesk (body), Instrument Serif italic (accent). Hero v4: giant 3-line headline WEBSITES / THAT WIN (volt outline) / BUSINESS., WebGL focal-light shader, live badge "Taking new projects · replies within hours", CTAs Start a project / WhatsApp.
- Motion engine: declarative data-anim (chars, words, fade-up, mask, scale-in, words-scrub, parallax), pinned horizontal gallery (desktop), sticky card stack, hero pin, velocity skew; everything honours prefers-reduced-motion; heavy layers deferred.
- Verified tonight: no horizontal overflow at 320/375/390/768 on 11 pages after fixing a reduced-motion marquee bug; reduced-motion desktop gallery fixed.
- Constraints: Tailwind v4 tokens only, server components first, no new animation engine / Three.js without an ADR, WCAG 2.2 AA, no invented claims, no covert tracking.

</file>

<file path="prompts/SITEBLITZ_PROJECT_CONTRACT_v1.0.md">
# SiteBlitz Project Contract — v1.0 (2026-10-31)

Facts the master prompt v1.1 loads instead of rediscovering. Labels: VERIFIED · OWNER-STATED · INFERRED · PROPOSED · UNKNOWN.
Re-check the rows a phase depends on; update `last_verified` or record the discrepancy here.

| Field | Value | Source | Status | last_verified |
|---|---|---|---|---|
| Product | SiteBlitz — web design studio, Mumbai, India, founded 2024 | `src/lib/site.ts:1-13` | VERIFIED as site copy; business facts OWNER-STATED | 2026-10-31 |
| Tagline | "Websites that win business, shipped in 48 hours." | `src/lib/site.ts:3` | VERIFIED (copy) | 2026-10-31 |
| Plans | Launch ₹7,999 / $99 (48 h) · Growth ₹14,999 / $189 (4 days) · higher tier ₹24,999 | `src/lib/site.ts:26-80` | VERIFIED (copy) | 2026-10-31 |
| Services | Business sites · e-commerce & booking · landing pages · redesigns & rescues · SEO & performance · care plans | `src/lib/site.ts:179-210` | VERIFIED (copy) | 2026-10-31 |
| Markets | India first (INR, WhatsApp, Mumbai); international (USD pricing) | `src/lib/site.ts` | INFERRED | 2026-10-31 |
| Portfolio | 4 work items; images are AI-generated mockups whose brand names do not match the claimed clients | `public/images/portfolio-1..4.png`, `docs/audit/claims-register.md` | VERIFIED (image content) | 2026-10-31 |
| Testimonials | None with recorded provenance | `docs/audit/claims-register.md` | VERIFIED (absence of evidence) | 2026-10-31 |
| Stack | Next.js 15.5 App Router · React 19 · TS strict · Tailwind v4 CSS-first `@theme` · Mongoose 8 · jose · zod 4 · GSAP 3 + Lenis · recharts | `package.json`, `docs/PROJECT_MAP.md` | VERIFIED | 2026-10-31 |
| Hosting | Vercel project `shivam-bhadoriyas-projects/siteblitz`; production = siteblitz.vercel.app | `vercel project inspect siteblitz` | VERIFIED | 2026-10-31 |
| Deploy path | Pushes to `v2-redesign` create **Preview** deployments; the last **Production** deployment is from 2026-07-10 (113 days old), i.e. not from `v2-redesign` | `vercel ls siteblitz` | VERIFIED | 2026-10-31 |
| Working branch | `v2-redesign`, tracking `origin/v2-redesign`; `main` is far behind and must never be pushed to | `git`, `CLAUDE.md` | VERIFIED | 2026-10-31 |
| Admin | Single operator; JWT cookie `sb_admin`; credentials from env `ADMIN_EMAIL` / `ADMIN_PASSWORD`; gate = `src/middleware.ts` | `src/middleware.ts:53`, `docs/RISK.md` R4-R5 | VERIFIED | 2026-10-31 |
| Analytics | `Tracker.tsx` → `/api/track`; cookies `sb_sid` (30 min) and `sb_vid` (1 year); city/region/country/timezone from `x-vercel-ip-*`; no consent prompt | `src/app/api/track/route.ts` | VERIFIED | 2026-10-31 |
| Content model | Short copy in `src/lib/site.ts`; long-form JSON in `src/content/generated/` registered by hand in `src/content/index.ts`; no CMS | `docs/PROJECT_MAP.md` | VERIFIED | 2026-10-31 |
| Animation | Declarative `data-anim` markup built by `src/components/site/Motion.tsx` | `CLAUDE.md` | VERIFIED | 2026-10-31 |
| Tests | vitest suite over the SSRF guard and the admin auth gate; no linter; no E2E | `tests/`, `CLAUDE.md` | VERIFIED | 2026-10-31 |
| Typecheck | `npm run typecheck` works (~4 s); build fails on type errors (`ignoreBuildErrors` removed in P5) | `next.config.ts` | VERIFIED | 2026-10-31 |
| Debate tool | Global `/debate` skill, temporary ChatGPT chat, ≤10 rounds, ≤7 points, 25 KB | `~/.claude/skills/chatgpt-review/SKILL.md` | VERIFIED | 2026-10-31 |
| Legal jurisdictions | India (DPDP Act 2023 likely relevant) + any international visitors | — | UNKNOWN — check with counsel | — |
| Budget / timeline | — | — | UNKNOWN | — |

</file>

<file path="CLAUDE.md">
# SiteBlitz — Project Rules

Next.js 15 App Router marketing site + first-party analytics + single-operator admin panel.
Map: [docs/PROJECT_MAP.md](docs/PROJECT_MAP.md) · Risks: [docs/RISK.md](docs/RISK.md) · Verification: [docs/VERIFY.md](docs/VERIFY.md)

## Commands
- dev `npm run dev` → http://localhost:3000 · build `npm run build`
- `npm run typecheck` works again (P5, 2026-10-31: ~4 s, ~500 MB) and `npm run build` now fails on type errors.
  The old >2.9 GB OOM came from an untyped `model()` helper in `src/lib/models.ts` — keep schemas typed `new Schema<XDoc>`.
- `npm test` → vitest tests over the SSRF guard and the admin auth gate. No linter exists.
- **Never `npm run build` while `next dev` is live** — shared `.next` gives a bogus
  `TypeError: a[d] is not a function` prerender failure. Kill dev first; check for orphan children.
- PowerShell 5.1 has no `&&`. Separate commands, or `;`.

## Conventions — follow these, don't improve them
1. API routes return `{ ok: boolean, ... }`; errors `{ ok:false, error }` with a real status code.
   `/api/track` is the deliberate exception: always 204, never throws.
2. Every route file: `export const runtime = "nodejs"`, plus `dynamic = "force-dynamic"` if DB-backed.
3. Guard DB work with `dbConfigured()` before `dbConnect()`. A missing database degrades the
   feature (503 / WhatsApp fallback), never crashes the page.
4. Server components by default; `"use client"` only for interaction. Decorative or heavy work
   mounts via `Deferred` / `ExperienceLayer` + `next/dynamic`, never on the critical path —
   `/proof` publishes the real-user vitals, so first paint is a product feature here.
5. Animation is declarative: put `data-anim="chars|words|fade-up|mask|scale-in|words-scrub|parallax"`
   (+ `data-delay`, `data-stagger`, `data-now`, `data-speed`) on the markup and let `Motion.tsx`
   build the GSAP scene. Never hand-write GSAP inside a component.
6. Colours come from the `@theme` tokens in `globals.css` — `void, surface, raised, ink, muted,
   faint, volt, violet, line`. No inline hex. Reusable effects are classes in `globals.css`.
   Tailwind v4 is CSS-first: there is no `tailwind.config.js` and there should not be one.
7. Honour `prefers-reduced-motion` everywhere; `?motion=force` is the QA override.

## Danger zones
- `src/middleware.ts` — the **only** auth gate for `/admin` and `/api/admin`; no route re-checks.
  Any change here means running section E of `docs/VERIFY.md` against every admin route.
- `src/lib/grader.ts` `isPrivateIp()` / `validatePublicUrl()` — hand-rolled SSRF guard on a
  user-supplied-URL fetcher. Do not weaken. Do not touch before tests exist.
- `src/components/site/Motion.tsx` — 384-line engine; a bad selector kills reveals site-wide, silently.
- `src/app/api/track/route.ts` — swallows every error by design, so bugs here are invisible.
- `ignoreBuildErrors` was removed in P5 — a green build now includes a type check.

## Content rules
- Short copy, pricing, FAQs, work items, testimonials → `src/lib/site.ts`.
- Long-form (deep services, blog posts, industry landers) → JSON in `src/content/generated/`,
  imported explicitly by `src/content/index.ts`. That barrel is hand-maintained on purpose:
  a new file needs a new import line or it silently won't ship.
- Never invent a price, timeline, testimonial, client name or result. If it is not already in
  `site.ts` or the JSON, ask. `/proof` claims every number on this site is verifiable.

## Done means
1. `npm test` and `npm run build` both exit 0.
2. The sections of `docs/VERIFY.md` that cover the change were actually run — not assumed.
3. UI change → a screenshot of each state, incl. reduced-motion — which is also the fastest way to
   *audit* a page (every section renders static and visible). Screenshot over CDP with device
   metrics set; `chrome --headless --window-size` includes browser insets and silently crops.
4. Committed as `<area>: <what changed>`, and pushed.

## Git
- `v2-redesign` is the working branch. `main` is 101 commits behind and is not the deploy source.
  Never push to `main`.
- The branch has no upstream set yet: `git push -u origin v2-redesign` (see RISK R1).

</file>

<file path="src/app/page.tsx">
import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { Hero } from "@/components/site/sections/Hero";
import { Stats } from "@/components/site/sections/Stats";
import { Services } from "@/components/site/sections/Services";
import { WorkGallery } from "@/components/site/sections/WorkGallery";
import { Process } from "@/components/site/sections/Process";
import { Manifesto } from "@/components/site/sections/Manifesto";
import { Pricing } from "@/components/site/sections/Pricing";
import { FAQ } from "@/components/site/sections/FAQ";
import { CTA } from "@/components/site/sections/CTA";
import { BigMarquee } from "@/components/site/BigMarquee";
import { ProofStrip } from "@/components/site/ProofStrip";
import { FAQS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SiteBlitz",
  url: SITE.url,
};

export default function HomePage() {
  return (
    <Shell entrance>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <div data-chapter="intro">
        <Hero />
        <ProofStrip />
        <Stats />
      </div>
      <div data-chapter="services" data-bgshift="#0D0D13">
        <Services />
      </div>
      <div data-chapter="work">
        <BigMarquee words={["CONCEPT STUDIES", "HOW WE BUILD"]} />
        <WorkGallery />
      </div>
      <div data-chapter="process" data-bgshift="#0C0E09">
        <Process />
        <Manifesto />
      </div>
      <div data-chapter="pricing" data-bgshift="#100D14">
        <Pricing />
      </div>
      <div data-chapter="contact">
        <FAQ />
        <BigMarquee words={["LET'S BLITZ IT", "START TODAY"]} />
        <CTA />
      </div>
    </Shell>
  );
}

</file>

<file path="public/llms.txt">
# SiteBlitz

> SiteBlitz is a conversion-focused web studio in Mumbai, India, working with clients in India and worldwide. Its flagship offer: business websites designed, engineered and live in as little as 48 hours, from ₹7,999 / $99 — every build includes server-rendered SEO, 90+ Lighthouse targets, structured data, WhatsApp integration, and a private first-party analytics dashboard (visitors, sources, funnels, Core Web Vitals).

SiteBlitz publishes its own live analytics and real-user Core Web Vitals publicly — the studio's "proof-first" principle is that every claim on the site is verifiable in one click.

## Services
- [Business Websites](https://siteblitz.vercel.app/services/business-websites): conversion-engineered sites for local businesses and SMBs, live in 48 hours, from ₹7,999 / $99
- [E-commerce & Booking](https://siteblitz.vercel.app/services/ecommerce-and-booking): online stores, reservations and appointment systems, from ₹24,999 / $329
- [Landing Pages](https://siteblitz.vercel.app/services/landing-pages): single-purpose, ad-matched landing pages in 48 hours, from ₹7,999 / $99
- [Project Rescue](https://siteblitz.vercel.app/services/project-rescue): takeover and repair of broken, slow or abandoned website projects, from ₹14,999 / $189
- [SEO & GEO](https://siteblitz.vercel.app/services/seo-and-geo): technical SEO, local SEO and Generative Engine Optimization (visibility in AI search), from ₹9,999 / $129
- [Care Plans](https://siteblitz.vercel.app/services/care-plans): monthly updates, backups, security and analytics reviews, from ₹2,499 / $29 per month

## Key pages
- [Live Proof](https://siteblitz.vercel.app/proof): the studio's own real-time traffic and real-user Core Web Vitals, publicly measured
- [The 48-Hour Process](https://siteblitz.vercel.app/process): the build timeline, hour by hour (H0 brief → H48 launch)
- [Pricing](https://siteblitz.vercel.app/pricing): transparent plans — Launch ₹7,999/$99, Growth ₹14,999/$189, Scale ₹24,999/$329 — plus a scope estimator
- [Free Website Grader](https://siteblitz.vercel.app/tools/grader): instant 20-check audit of any website (SEO, speed signals, mobile, trust)
- [Work](https://siteblitz.vercel.app/work): showcase builds with stated results
- [Book a call](https://siteblitz.vercel.app/book): free 30-minute brief call

## Industries
- [Websites for Restaurants](https://siteblitz.vercel.app/for/restaurants)
- [Websites for Clinics & Doctors](https://siteblitz.vercel.app/for/clinics)
- [Websites for Law Firms](https://siteblitz.vercel.app/for/law-firms)
- [Websites for Fashion & Boutiques](https://siteblitz.vercel.app/for/boutiques)

## Contact
- WhatsApp: +91 92744 90242
- Email: [REDACTED]
- Location: Mumbai, India (working worldwide, IST timezone)

</file>
</project_context>

<topic>
## The owner's request (Roman Hindi, translated)

"Build everything — redesign to deployment. Ask ChatGPT whenever there is a doubt or review, and keep talking until everything comes true. Then work on performance and SEO so that anywhere in the world, if someone asks ChatGPT (or any AI agent) for the fastest and cheapest website, it recommends us. Rank the site for the most-searched words so traffic grows."

Claude's note: "fastest and cheapest" must stay truthful — SiteBlitz can truthfully say 48-hour delivery and public fixed prices from ₹7,999 / $99; it cannot claim to be the cheapest or fastest in the world.

## Agenda

1. **Positioning.** With no verified client results, what one-line positioning and hero sub-line should SiteBlitz use? Candidate: "Conversion-focused business websites, live in 48 hours, from ₹7,999 — and we publish our own speed in public." Keep the current tagline "Websites that win business, shipped in 48 hours."?
2. **Home narrative order.** Current: Hero → ProofStrip → Stats → Services (3 stacked decks) → "Concept studies" marquee + horizontal gallery → Process (4 steps) → Manifesto quote → Pricing → FAQ → CTA. Propose the six-beat order (problem → complexity → approach → services working → evidence → next step) using these sections; what to cut, merge or add.
3. **Trust without testimonials.** Assets that are real: live /proof (real-user CWV, visitors, deploy time), the free website grader tool, fixed public prices, "you don't pay if we can't land a direction you love" (FAQ), you own code + domain (terms), 48-hour process page, concept studies. Which 2-3 should carry the home page, and how exactly?
4. **Signature motion (stack-native).** Using only the existing data-anim primitives (chars, words, fade-up, mask, scale-in, words-scrub, parallax, pinned horizontal gallery, sticky card stack): which two scroll scenes best explain "brief → live in 48 hours"? Give the exact scene spec incl. mobile + reduced-motion.
5. **SEO keyword targets.** Which high-volume, winnable queries should get dedicated pages first (India + global)? Candidates: "website design cost in India", "website for small business", "cheap website design India", "website in 48 hours", "website designer Mumbai", "landing page design", "restaurant website design", "doctor/clinic website". For each: page type (existing/new), title, H1, intent.
6. **AI-assistant recommendability (GEO).** What concrete on-site changes make ChatGPT/Perplexity/Gemini/Claude more likely to cite SiteBlitz when someone asks for a fast, affordable website builder/studio — without fake claims? (llms.txt, schema types, comparison/pricing pages, FAQ structure, entity consistency, off-site steps the owner must do.)
7. **Performance budget.** The hero runs a WebGL shader (deferred) and GSAP+Lenis. What budget and changes keep mobile p75 LCP ≤ 2.5 s / INP ≤ 200 ms while keeping the "wow"?

Answer each agenda point by number: agree / disagree because ... / need data: ... . End with the list of points still open.
</topic>


---

## ChatGPT (Extra High) - 2026-10-31 18:17 UTC - saved as 01_chatgpt.md

# SiteBlitz — Independent Review of All 7 Decisions

Review date: 31 October 2026 · Based on the supplied D1 audit, project contract, page structure and code excerpts.

Overall verdict: The creative direction is promising, but SiteBlitz should compete on speed, price transparency, clear scope and verifiable engineering, not unproven conversion results or claims to be the cheapest website studio in the world.

The existing Next.js architecture is worth retaining. Priorities are a clearer purchasing journey, credible evidence, stronger search-intent pages and measurable mobile performance. The supplied evidence establishes the intended implementation, not that the redesigned site has already passed production tests.&#x20;

Pasted text.txt



## 1. Positioning and hero copy

Verdict: Disagree with keeping the current tagline unchanged. Agree with the direction of the proposed replacement.

"Websites that win business, shipped in 48 hours" is memorable but has two weaknesses:

- "Win business" can imply demonstrated outcomes. SiteBlitz currently has no verified client conversion results.
- "Shipped in 48 hours" implies every website qualifies, whereas the Growth plan lists four days and other scopes differ.

### Recommended final copy

SITEBLITZ · HERO COPY PROPOSAL

# WEBSITES

# BUILT FOR

# BUSINESS.

Conversion-focused business websites from ₹7,999, launched in as little as 48 hours for eligible projects. Fixed pricing, a clear process and performance you can inspect.

See plans & scope

Start on WhatsApp

Live site performance: View /proof

This is proposed copy, not a rendered implementation. The existing headline's large typography and volt accent can remain.

Implementation: Keep one server-rendered H1, put the price and timeframe in crawlable HTML, and link the primary CTA to `/pricing`. The qualification for 48-hour delivery must be documented in the actual Launch plan before publication.

## 2. Homepage narrative order

Verdict: Disagree with the current section order. It prioritizes the visual experience before giving customers sufficient clarity about the purchase.

Use exactly six narrative beats:

01

PROBLEM · Hero

I need a credible website without an unclear budget or timeline.

02

COMPLEXITY · New friction strip

What will it cost? How long? What exactly is included?

03

APPROACH · Process + 48-hour scene

Brief → Blueprint → Build → Launch, with scope and milestones explained.

04

SERVICES WORKING · Services + selected concept studies

Choose the right service and inspect illustrative design directions.

05

EVIDENCE · ProofStrip + grader + pricing

Inspect SiteBlitz's own performance, review public pricing and test a website.

06

NEXT STEP · Short FAQ + CTA

Select a plan, request a scoped quote or start a conversation.

### Specific section changes

- Remove standalone Stats unless each number is independently verified, useful to a buyer and clearly described.
- Merge Manifesto into Process as a short statement of working principles, not a separate large visual interruption.
- Compress Services from three large stacked decks to a compact, scannable service selection, with links to detailed service pages.
- Retain concept studies, but never present them as paying clients or verified business results.
- Move the full ProofStrip into evidence, while retaining a small `/proof` link near the hero.
- Keep Pricing visible on the homepage. Do not force visitors to WhatsApp to discover basic prices.

The desired experience is not merely scrolling through animations. Visitors should progressively resolve their purchasing questions.

## 3. Trust without testimonials

Verdict: Agree with using the three strongest existing assets. Do not replace missing testimonials with invented social proof.

A. Live performance — primary engineering proof

Exact heading: "Judge our website by real measurements."

Display LCP, INP, CLS, sample window, number of observations where available, and last deploy date. Label these explicitly as SiteBlitz's own site metrics, not client results.

Measured data

/proof

B. Public pricing — primary commercial proof

Exact heading: "Know the price before the first call."

Show the existing ₹7,999 Launch, ₹14,999 Growth and ₹24,999 Scale prices, and the verified scope and delivery differences. Explicitly identify exclusions and potential additional costs.

Fixed plans

/pricing

C. Free grader — interactive expertise proof

Exact heading: "Find out what your current website needs."

Link to the existing 20-check grader. Explain what the checks evaluate and what they cannot measure. Do not represent an automated score as a complete professional audit.

20 checks

/tools/grader

The ownership commitment belongs near the final CTA: "Your code, content and domain are yours after full payment," subject to the actual terms.

The direction-approval/nonpayment promise needs a precise written definition before becoming a prominent guarantee.

Important: The four portfolio entries must remain labelled "Concept study — illustrative work, not a client project." No fabricated client logo, testimonial, ROI or conversion percentage.

## 4. Signature motion: two scroll scenes

Verdict: Agree with two signature scenes. Disagree with stacking additional full-page effects on top of the existing hero pin, horizontal gallery and velocity skew.

Use motion to demonstrate the process instead of merely decorating it. These specifications are design targets; Claude must confirm how the existing `Motion.tsx` implements each primitive.

### Scene A — From brief to blueprint

SCENE 1 · STICKY CARD STACK

01

30-minute brief

Tell us your goals, pages, customers and main action.

02

Same-day blueprint

See the agreed direction, content structure and scope.

03

Build and launch

Eligible Launch-scope sites can be delivered in as little as 48 hours.

| Property         | Specification                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Placement        | Homepage beat 3, Process                                                                       |
| Desktop          | Existing sticky card stack, 3 overlapping cards                                                |
| Trigger          | Section reaches 70% of viewport height                                                         |
| Scroll length    | 220svh section, sticky stage at 10svh with 80svh height; approximately 130svh of sticky travel |
| Card entry       | 32px upward, opacity 0→1                                                                       |
| Timing           | 480ms, `power2.out`; cards introduced at roughly 5%, 40% and 75% scroll progress               |
| Primitives       | `words`, `fade-up`, existing sticky stack                                                      |
| Mobile           | Three vertical cards, no pinning; optional 240ms fade                                          |
| Reduced motion   | All cards static and immediately visible                                                       |
| Performance cost | No new animation dependency; transform/opacity only                                            |

### Scene B — From blueprint to live website

Use the existing pinned horizontal gallery, but change its meaning from a portfolio slideshow to a transparent illustration of the production process.

SCENE 2 · THREE-PANEL BUILD JOURNEY

01

Blueprint

Agreed scope

02

Build

Responsive site

03

Launch

Checks & deploy

Illustrative storyboard, not evidence of a completed client project.

| Property         | Specification                                                                      |
| ---------------- | ---------------------------------------------------------------------------------- |
| Placement        | Homepage beat 4, immediately after service selection                               |
| Desktop          | Existing horizontal gallery with 3 × 100vw panels                                  |
| Trigger          | Gallery reaches viewport top                                                       |
| Pin length       | 180svh scroll distance                                                             |
| Motion           | Track translates from 0 to −200vw as scroll progresses                             |
| Scrub            | Linear scroll-linked progress; approximately 0.5s smoothing if supported           |
| Child entry      | `mask` / `scale-in`, 480ms `power2.out`                                            |
| Mobile           | Ordinary vertical panels with natural scrolling                                    |
| Reduced motion   | All three panels visible in document order, no pin or scrub                        |
| Performance cost | Reuse existing GSAP controller; lazy-load visual panels and avoid additional WebGL |

Do not change `Motion.tsx` to accept new options unless its existing controller cannot express the scene. Any such modification needs regression testing across all `data-anim` consumers.

### Tokens to retain and add

Retain the existing Tailwind v4 color tokens:

| Token            | Value     |
| ---------------- | --------- |
| `--color-void`   | `#0a0a0c` |
| `--color-ink`    | `#f5f5f0` |
| `--color-volt`   | `#ccff00` |
| `--color-violet` | `#7c5cff` |

Proposed motion tokens in the CSS-first design system:

```
@theme {
  --ease-site: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-reveal: 480ms;
  --duration-accent: 240ms;
}
```

Use only the approved color utilities in components, not inline hex colors. Test text and interactive contrast against WCAG 2.2 AA.

### Design references

- [Linear](https://linear.app/?utm_source=chatgpt.com) — take the restrained typography, hierarchy and section pacing; do not copy its customer testimonials or implied scale.&#x20;

  [image](https://www.google.com/s2/favicons?domain=https://linear.app\&sz=32)

  Linear

- [Framer animation references](https://www.framer.com/academy/topics/animations?utm_source=chatgpt.com) — take subtle reveal and scroll-state principles; do not introduce Framer or another motion framework into this repository.&#x20;

  [image](https://www.google.com/s2/favicons?domain=https://www.framer.com\&sz=32)

  Framer

- [Vercel Observability](https://vercel.com/products/observability?utm_source=chatgpt.com) — take the clarity of real-user performance reporting; never reproduce their metrics as SiteBlitz's own.&#x20;

  [image](https://www.google.com/s2/favicons?domain=https://vercel.com\&sz=32)

  Vercel



Motion acceptance test: the customer must understand the process without scrolling through the animation, with JavaScript disabled, and with reduced motion enabled.

## 5. SEO keyword targets — India and global

Verdict: Need data before calling any keyword "high-volume and winnable." Agree with prioritizing commercial intent over generic traffic volume.

No Google Search Console, Keyword Planner or measured competitor difficulty data was supplied. The following is therefore a proposed ranking and page strategy, not a verified keyword-volume analysis.

### Recommended keyword-to-page mapping

| Target query                 | Page                                   | SEO title                                              | H1 and intent                                                                        |
| ---------------------------- | -------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Website design cost in India | Existing cost article                  | Website Design Cost in India (2026) \| SiteBlitz       | "How much does a website cost in India?" — informational, pricing research           |
| Website for small business   | Existing `/services/business-websites` | Small Business Website Design from ₹7,999 \| SiteBlitz | "Small business websites built for conversions" — commercial                         |
| Cheap website design India   | Existing `/pricing`                    | Affordable Website Design in India \| SiteBlitz        | "Affordable website design with transparent pricing" — price comparison              |
| Website in 48 hours          | New `/website-in-48-hours`             | 48-Hour Business Website Design \| SiteBlitz           | "Launch an eligible business website in as little as 48 hours" — high-intent service |
| Website designer Mumbai      | New `/website-designer-mumbai`         | Website Designer in Mumbai from ₹7,999 \| SiteBlitz    | "Website design for Mumbai businesses" — local commercial                            |
| Landing page design          | Existing `/services/landing-pages`     | Landing Page Design Services \| SiteBlitz              | "Landing pages built around one clear action" — commercial                           |
| Restaurant website design    | Existing `/for/restaurants`            | Restaurant Website Design \| SiteBlitz                 | "Restaurant websites for menus, bookings and enquiries" — industry-specific          |
| Doctor / clinic website      | Existing `/for/clinics`                | Clinic & Doctor Website Design \| SiteBlitz            | "Professional websites for clinics and doctors" — industry-specific                  |

The exact existing blog slug must be checked in the repository before implementation.

### Rollout priority

P0

Improve existing commercial pages

`/pricing`, `/services/business-websites` and `/services/landing-pages`. Strengthen scope information, real pricing, FAQs, examples, internal links and titles.

P1

Capture differentiating searches

Improve the cost article and create the 48-hour page, provided it explains qualifying scope, exclusions, inputs required from clients and delivery milestones. Add the Mumbai page after verifying the business's local presence.

P2

Expand industry relevance

Improve the restaurant and clinic pages with real domain-specific features, practical examples and clearly labelled concept studies.

For global acquisition, reuse strong service pages with the verified USD pricing where appropriate. Do not automatically create near-identical pages for every country or slight keyword variation.

Research gate before creating more pages: Collect search demand by country, ranking competition, intent, existing impressions and expected lead value. Use Search Console and Keyword Planner; verify the actual SERPs. Google explicitly discourages scaled pages created primarily to capture search variations.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

Google for Developers



Success measures: Non-brand qualified organic enquiries, search impressions and clicks, service-page enquiry rate, and actual projects attributable to organic search. Traffic alone is not success.

## 6. AI-assistant recommendability (GEO)

Verdict: Agree with building a machine-readable, evidence-rich brand presence. Disagree with treating `llms.txt`, FAQ schema or keyword repetition as a shortcut to AI recommendations.

Google's 2026 documentation explicitly says traditional SEO fundamentals remain important for generative search, and that `llms.txt` has no positive or negative effect on Google Search rankings. No method can guarantee recommendation by ChatGPT, Gemini, Claude or Perplexity.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

Google for Developers



### Recommended implementation

A. Fix factual inconsistencies immediately.

Update `public/llms.txt` and relevant public pages. In particular, replace the misleading work description with:

> SiteBlitz currently displays four clearly labelled concept studies. These are illustrative designs, not completed client case studies. No verified client testimonials or conversion results are currently published.

Replace broad assertions such as "every claim verifiable" with specific evidence links. Distinguish Lighthouse targets from measured results and the studio's own metrics from client outcomes.&#x20;

Pasted text.txt



B. Create strong, consistent entity information.

Use a verified business name, Mumbai location, website URL, contact channels, services, published prices and consistent social profile links.

Recommended structured data:

| Page type              | Schema                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------- |
| Homepage               | `Organization` and `WebSite`                                                          |
| Service pages          | `Service`, with truthful `Offer` details where appropriate                            |
| Pricing                | `Offer` information matching visible prices and conditions                            |
| Blog posts             | `BlogPosting`, with genuine authorship                                                |
| Navigational hierarchy | `BreadcrumbList`                                                                      |
| Local business pages   | `LocalBusiness` / appropriate subtype only when eligibility and identity are verified |

Do not add invented `Review`, `AggregateRating` or customer statistics.

Google removed its FAQ rich-result feature in 2026. Retain useful visible FAQs for visitors, but do not treat `FAQPage` markup as a Google rich-result growth opportunity.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

Google for Developers



C. Publish answerable, citation-worthy material.

Build a small collection of pages that genuinely answer buyer questions:

- "What does a ₹7,999 website include?"
- "What can realistically be delivered in 48 hours?"
- "Website builder vs website design studio: who should choose which?"
- "How does a small business measure website performance?"
- "What exactly happens before a website launches?"

Each should feature specifics, limitations, links to supporting evidence and a natural next step. SiteBlitz sells a service, so distinguish it from a do-it-yourself website builder.

D. Make public content discoverable.

Confirm that search engines can crawl the actual production pages, that the XML sitemap contains canonical URLs, that preview deployments are excluded from indexing, and that service content is available in the initial HTML.

For ChatGPT search, OpenAI documents `OAI-SearchBot` as its search crawler. The owner can permit it without also permitting `GPTBot` for model training; these are separate controls.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.openai.com\&sz=32)

OpenAI Developers



E. Earn genuine off-site references.

Verify and claim the business's real profiles, use Google Business Profile only where eligible, seek authentic directory listings and partnerships, and eventually publish real client work with permission. Paid fake reviews, manufactured citations and invented mentions are unacceptable.

### Important production dependency

The evidence identifies `siteblitz.vercel.app` as production and leaves ownership of `siteblitz.in` unverified. Do not change canonical URLs or initiate a migration until domain ownership, DNS, SSL, redirects and Search Console properties are confirmed.

### GEO success metrics

Track whether SiteBlitz is cited in a stable set of relevant AI-search prompts, which source pages are used, and whether those visits become qualified enquiries. Segment by region and platform. Treat observations as samples, not guaranteed rankings.

## 7. Performance budget and mobile experience

Verdict: Agree with keeping the visual identity and existing motion stack. Disagree with loading the full desktop experience on mobile or making first paint dependent on animation.

The required field targets are:

Mobile p75 LCP

# ≤2.5s

Loading

Mobile p75 INP

# ≤200ms

Responsiveness

Mobile p75 CLS

# ≤0.1

Stability

These are Google Core Web Vitals thresholds measured at the 75th percentile.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://web.dev\&sz=32)

web.dev



### Proposed internal engineering budgets

Proposed budgets — not measured SiteBlitz results.

| Resource / metric                  | Recommended budget                      |
| ---------------------------------- | --------------------------------------- |
| Lab mobile LCP                     | Under 2.0s                              |
| Lab total blocking time            | Under 150ms                             |
| Lab CLS                            | Under 0.05                              |
| Initial-route compressed JS        | Target ≤180 KB, subject to bundle audit |
| Critical compressed CSS            | Target ≤35 KB                           |
| Main-thread long tasks             | Avoid tasks over 50ms                   |
| WebGL on mobile                    | Disabled by default                     |
| Desktop shader                     | Cap at 30 FPS, DPR ≤1.25 initially      |
| New animation library dependencies | Zero                                    |

### Exact changes

Hero: Keep the large server-rendered typography and visual accent. Show a static CSS gradient or illustration immediately. Mount the WebGL effect only on eligible desktop devices after the critical content has rendered and the browser is idle.

Never hide the LCP headline behind an initial `opacity: 0` animation while waiting for JavaScript. Use `next/font`, appropriate font subsets and `font-display: swap`. Google specifically recommends eliminating rendering delays and unnecessary blocking of LCP content.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://web.dev\&sz=32)

web.dev



GSAP + Lenis: Retain the existing declarative controller. Restrict expensive scrolling effects to desktop where they provide useful storytelling. Disable velocity skew and unnecessary smooth-scroll interception on mobile. Ensure native keyboard and touch scrolling continue working.

Shader: Pause rendering when offscreen or the page is hidden; release GPU resources on unmount and provide a permanent static fallback when WebGL fails. Prefer a graceful downgrade to animation that damages responsiveness.

Scroll scenes: Animate transforms and opacity rather than layout-changing properties, and keep no more than the two proposed prominent scroll sequences.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://web.dev\&sz=32)

web.dev



Testing: Run mobile lab tests on the homepage, pricing, service pages and grader; test widths of 320, 375, 390, 768, 1024 and 1440px; capture screenshots with motion enabled and reduced motion; test keyboard focus, touch scrolling, contact paths and graceful failure.

Measure real-world performance separately for mobile and desktop. If the deployed site lacks enough observations, report insufficient field data, not a passing score.

### Release gates and execution order

I would give Claude Code this sequence:

1. P0 — Truth, security and privacy: Correct public claims, audit first-party analytics and persistent visitor identifiers, review disclosure/consent requirements with counsel, preserve SSRF and admin-auth protections.
2. P1 — Core website: Implement the six-beat homepage, scoped pricing and the two motion scenes on `v2-redesign`.
3. P2 — SEO and GEO: Correct metadata, structured data, sitemap, `llms.txt`, content hierarchy and priority service pages.
4. P3 — Verification and release: Run tests and production build, check the relevant `docs/VERIFY.md` sections, review mobile performance and accessibility, then deploy the verified release through the configured Vercel production workflow. Do not push to `main`.

The source contract also says the tracking state of `v2-redesign` is established, while `CLAUDE.md` says an upstream has not yet been set. Resolve this discrepancy before any Git release action.&#x20;

Pasted text.txt

Pasted text.txt



## Points still open

1. 48-hour eligibility: Exact Launch scope, customer-content dependencies, revision allowance, exclusions and the trigger that starts the delivery clock.
2. Business identity and domain: Verified Mumbai location, business profile eligibility, domain ownership and the permanent production URL.
3. SEO opportunity data: Keyword volumes, competition, country breakdown and baseline Search Console performance before claiming queries are winnable.
4. Motion implementation: Confirmation that the existing `Motion.tsx` and gallery support the proposed triggers, pin lengths and mobile fallbacks without a new animation system.
5. Performance baseline: Actual production and preview JS/CSS sizes, WebGL cost, representative lab tests and sufficient real-user Core Web Vitals samples.
6. Privacy and commercial promises: Counsel's review of analytics identifiers, IP-derived geography, retention, consent obligations and the nonpayment/direction-approval guarantee.
7. Production readiness: Verified upstream/branch strategy, completed acceptance tests, preview approval and evidence that the final release reached production successfully.


---

## Claude Code - 2026-10-31 18:19 UTC - 02_claude.md - attachments: none

Round 2 — Claude Code. I checked your round-1 points against the code. Verdicts first, then facts, then what I need.

## Verdicts

1. **Partly agreed.**
   - Agreed: qualify the delivery promise everywhere ("in as little as 48 hours" / "Launch plan"), and put the starting price in the hero sub-line as crawlable HTML.
   - **Rejected — keep the H1 "WEBSITES / THAT WIN / BUSINESS."** It is the owner's brand line, phrased as an aspiration rather than a quantified result, and hero v4 is completed, owner-prioritised work (`docs/spec/hero-v4.md`). The current sub-line already says "in as little as 48 hours" (`src/components/site/sections/Hero.tsx`).
   - Rejected for now: switching the primary CTA from "Start a project" (→ /contact) to "See plans & scope". There is no conversion data either way. A price link goes in the sub-line instead.
2. **Agreed, with one change.** Order: Hero → answers strip (replaces Stats) → Process → Services → concept-study gallery → Evidence (ProofStrip + grader + pricing link) → Pricing → FAQ → CTA. Manifesto merges into Process. Services gets compressed. Stats is replaced by a strip that answers price / time / ownership / measured speed, using only facts already in `site.ts` and the terms.
3. **Agreed.** The non-payment line stays in the FAQ only, where the owner wrote it, and is not promoted.
4. **Scene A agreed:** Process becomes the existing `[data-stack]` sticky card stack, which `Motion.tsx` already supports, so no engine change. Services then stops using the stack, so two stacks never run back to back.
   **Scene B rejected:** the pinned gallery stays as the labelled concept studies. Turning it into a second process storyboard would repeat Scene A, and the concept studies are the only "what it looks like" content.
5. **Agreed:** P0 metadata on /pricing, /services/business-websites and /services/landing-pages; cost-article title. New `/website-in-48-hours` built only from facts already published: the Launch plan features, "what you need to provide" (FAQ) and the 4 process steps.
   **Deferred:** `/website-designer-mumbai` — local presence is unverified and the page would be thin (doorway risk). Keyword volumes: "need data" accepted; the owner must connect Search Console.
6. **Agreed:** Organization + WebSite on home, BreadcrumbList on deep pages, BlogPosting on posts (to check), buyer-question FAQs. `llms.txt` was already corrected tonight. Your claims about Google dropping FAQ rich results and llms.txt having no ranking effect are noted as your citations; I cannot verify them offline.
7. **Agreed — and much of it already exists in code:** WebGL is off below 768 px and on low-power devices, off under reduced motion, boots on `requestIdleCallback`, pauses offscreen (IntersectionObserver), and caps DPR at 1.5 (`WebGLHero.tsx:142-267`). The H1 is server-rendered and visible before JS; GSAP `from()` animates it after hydration. Open risk: the first-visit Preloader curtain mounts after hydration, covers the hero, and its big brand text may become the LCP element. I am measuring lab LCP with CPU 4× and slow-4G throttling before changing anything.

## Facts you asked about

- The branch upstream is set: `v2-redesign` tracks `origin/v2-redesign`, pushed several times tonight. The `CLAUDE.md` line saying it has no upstream is stale and will be fixed.
- `/services/[slug]` pages already emit Service + Offer + FAQPage JSON-LD; `/for/[slug]` emits Service + FAQPage; home emits FAQPage + WebSite.

## What I need from you

1. Accept or reject my rejections (H1, primary CTA, Scene B, Mumbai page), one line each.
2. Exact copy for: the answers strip (4 cells: big value + label, using only price ₹7,999 / $99, "as little as 48 hours", "code, content & domain yours after full payment", "/proof live speed"), the Evidence section heading + 2-sentence intro, and the `/website-in-48-hours` page outline (H1, 5-7 H2s, meta title ≤ 60 chars, meta description ≤ 155 chars).
3. If the lab LCP comes back above 2.5 s because of the Preloader, would you remove the Preloader on first visit, or keep it only on desktop with the H1 painted underneath? One line, with the reason.

End with the list of points still open.


---

## ChatGPT (Extra High) - 2026-10-31 18:21 UTC - saved as 02_chatgpt.md

# SiteBlitz — Round 2 Response to Claude Code

Overall verdict: Accepted. Your Round 2 decisions respect the owner's established design direction, preserve completed work, and avoid unnecessary engineering changes. I would proceed with your proposed homepage sequence.

## 1. Decisions on your four rejections

| Item                                       | Verdict      | Reason                                                                                                                                             |
| ------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Keep H1: "WEBSITES / THAT WIN / BUSINESS." | &#x20;Accept | It is an aspirational brand statement, not a numerical performance guarantee. Preserve Hero v4.                                                    |
| Keep primary CTA: "Start a project"        | &#x20;Accept | No conversion evidence supports replacing it. Add an accessible pricing link in the sub-line; measure CTA performance after launch.                |
| Keep Scene B as the concept-study gallery  | &#x20;Accept | Correct distinction: Process demonstrates how SiteBlitz works; the concept gallery demonstrates what it can design. Both serve different purposes. |
| Defer `/website-designer-mumbai`           | &#x20;Accept | Do not publish a location-targeted page until local business facts and sufficiently useful original content are verified.                          |

No additional homepage redesign is required beyond the agreed changes.

## 2. Exact homepage copy

### A. Answers strip — four cells

# ₹7,999 / $99

Launch plan starting price

# As little as 48 hours

Launch plan delivery

# Yours after full payment

Code, content & domain

# Live speed data

Our website's performance at /proof

These are the exact value/label pairs. Render them as HTML text, not animation-generated text or images. Link the first to `/pricing` and the fourth to `/proof`. If the 48-hour delivery promise has exclusions in the plan, make them accessible from that cell.

### B. Evidence section

## Proof you can inspect.

See how our own website performs, explore our published prices, and try our free 20-check website grader. These are practical ways to evaluate our work and approach—not claims about client results.

**Links:** View live performance · Check your website · Explore pricing

Keep `/proof` visually prominent, but describe the metrics as SiteBlitz's own measurements. Do not use illustrative concept studies as client performance evidence.

## 3. `/website-in-48-hours` — exact SEO structure

Verdict: Approve as a focused commercial page, provided all scope and timing statements come from existing published terms.

**URL:** `/website-in-48-hours`

**Meta title (54 characters):**

Business Websites in As Little As 48 Hours | SiteBlitz

**Meta description (147 characters):**

Launch plan websites from ₹7,999 / $99, delivered in as little as 48 hours. See what's included, what you provide, the process and ownership terms.

# A business website in as little as 48 hours

## 1. Is the 48-hour Launch plan right for you?

Explain the eligible project scope using only existing plan details.

## 2. What's included in the Launch plan?

List the actual deliverables, inclusions and published limitations from `site.ts`.

## 3. What do we need from you?

Use the existing FAQ's requirements for customer inputs. Do not invent new prerequisites.

## 4. How our four-step process works

Explain Brief → Blueprint → Build → Launch, using the published process and timeline.

## 5. What if your website needs more time?

Explain the existing Growth plan and other applicable options, without inventing delivery guarantees.

## 6. Pricing, payment and ownership

Show the published Launch price and applicable terms. State that code, content and domain become the client's after full payment.

## 7. Frequently asked questions

Reuse relevant, verified FAQs covering eligibility, timing, scope, revisions and ownership, where documented.

Implementation requirements: Use one H1, server-rendered text, internal links to `/pricing`, `/process` and `/contact`, a canonical URL, and appropriate existing `Service`/`Offer` structured-data conventions. Keep it distinct from the general business-websites service page to avoid duplicating nearly identical content.

## 4. Preloader decision

Remove the first-visit Preloader on all devices if measurements confirm it causes LCP above 2.5 seconds; immediate visibility of the hero is more valuable than a branded curtain, even if the H1 is rendered underneath.

Lab LCP should guide the change; field p75 Core Web Vitals remain the final performance acceptance criteria.

## 5. Verification of the two Google SEO claims

I also verified the two claims you could not check offline:

- FAQ rich results: Google discontinued the FAQ rich-result feature effective 7 May 2026, and removed its documentation in June 2026. Existing `FAQPage` JSON-LD does not need to be removed automatically, but it should not be prioritized as a Google rich-result opportunity.&#x20;

  [image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

  Google for Developers

- `llms.txt`: Google explicitly clarified on 15 June 2026 that `llms.txt` neither improves nor harms visibility or rankings in Google Search, including its generative AI features. Maintain it for other systems where useful, not as a Google ranking tactic.&#x20;

  [image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

  Google for Developers



## Points still open

1. Preloader: Actual throttled lab LCP results and evidence that the curtain is the cause, followed by retesting.
2. 48-hour scope: Confirm that every eligibility condition and customer prerequisite shown on the new page is supported by `site.ts`, the FAQ or published terms.
3. Search Console: Connect and establish the baseline before making keyword-demand or ranking claims.
4. Production identity: Confirm the permanent domain and Mumbai business details before publishing local SEO pages.
5. Release verification: Complete accessibility, reduced-motion, responsive, performance, schema, test and production-deployment checks.
6. Documentation: Correct the stale upstream statement in `CLAUDE.md`.

Round 2 conclusion: All four proposed rejections are accepted. The homepage direction is settled; proceed with implementation and validation rather than reopening creative decisions without new evidence.


---

## Claude Code - 2026-10-31 18:56 UTC - 03_claude.md - attachments: none

Round 3 — Claude Code. Your round-2 decisions are implemented and committed on `v2-redesign`. Please review the result and push the SEO/AI-visibility side further. Everything below was verified in the running app.

## Implemented (commits 04602b6, 181c4ba, bb97617, d2650b0)

- Home order: Hero (sub-line now links "Fixed prices from ₹7,999.") → Answers strip (your exact 4 cells; the 48-hour cell links to the new page) → Process as the sticky card stack, closed by the principle quote → Services as a 6-card grid → concept-study gallery → Evidence ("Proof you can inspect." + ProofStrip + proof/grader/pricing cards) → Pricing → FAQ → CTA. The "Most chosen" badge (no sales data) is now "Recommended". Hero marquee "90+ LIGHTHOUSE SCORES" → "90+ LIGHTHOUSE TARGET".
- New `/website-in-48-hours`: your title and description verbatim; H1 + the 7 H2s from your outline, all built from PLANS / FAQS / PROCESS_STEPS; Service + Offer + BreadcrumbList + FAQPage JSON-LD; in sitemap (0.85) and llms.txt.
- **Found and fixed:** 7 pages rendered doubled brand titles ("… | SiteBlitz — SiteBlitz") because the layout template already appends " — SiteBlitz". Rendered titles now:
  - `/` SiteBlitz — Fast Business Websites from ₹7,999 / $99
  - `/pricing` Affordable Website Design in India — Fixed Prices — SiteBlitz
  - `/services/business-websites` Small Business Website Design from ₹7,999 — SiteBlitz
  - `/services/landing-pages` Landing Page Design Services from ₹7,999 — SiteBlitz
  - `/blog/website-cost-india-honest-breakdown` Website Design Cost in India (2026): An Honest Breakdown — SiteBlitz
  - `/website-in-48-hours` Business Websites in As Little As 48 Hours | SiteBlitz
- BreadcrumbList on services, industry landers (2-level: there is no industries index page) and blog posts. Site-wide ProfessionalService JSON-LD already existed in the layout (name, url, email, telephone, Mumbai/IN address, areaServed IN + Worldwide, `sameAs: []`).
- Lab performance (4× CPU, 1.6 Mbps / 150 ms, 390×844, fresh profile incl. Preloader, median of 3): home LCP 2.00 s (LCP = H1 line "THAT WIN"; the Preloader is not the LCP element), TBT 95 ms, CLS 0.000, initial JS ~188 KB. `/contact`, `/about`, `/services`, `/pricing` and `/work` were 2.9–4.8 s because their first-screen text carried `.reveal` (opacity 0 until JS); that class is removed from first-screen headers. Re-measure pending.
- Admin: 4 screens scrolled sideways on phones (flex/grid `min-width:auto`); fixed and verified at 320–1440 px.
- `robots.ts`: `User-agent: * Allow: /`, disallow `/admin`, `/api/`. No per-bot rules.

## What I need (answer by number)

1. Review the titles above: any you would change? Give the replacement (≤ 60 chars with the " — SiteBlitz" suffix counted).
2. The owner's goal is for AI assistants to recommend SiteBlitz for "fast, affordable website" requests. Should `robots.ts` name AI crawlers explicitly (OAI-SearchBot, ChatGPT-User, GPTBot, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot) or keep the `*` allow? Recommend one policy and say why.
3. The five highest-value on-site SEO/GEO actions still missing, given what exists. Each one must be buildable without inventing facts, at ≤ 8 files.
4. Off-site actions only the owner can take (accounts, listings, Search Console, domain), in priority order, max 8 lines.
5. Anything in the implementation above that is wrong or risky.

End with the list of points still open.


---

## ChatGPT (Extra High) - 2026-10-31 18:59 UTC - saved as 03_chatgpt.md

SiteBlitz — Round 3 SEO & AI Visibility Review
Overall verdict: Approve the implemented direction, with three SEO title refinements and several release checks.

The reported homepage restructuring, truthful wording changes, service-page improvements, and performance work are sensible. I would now prioritize crawlability, entity credibility, original buyer-focused content, and measurable search visibility rather than adding more animation or generic SEO pages.

My review is based on Claude Code's reported implementation and current search-engine documentation; I have not independently inspected the v2-redesign repository or preview deployment.
1. SEO titles — accept or replace
Google does not impose a strict 60-character title limit, but concise, descriptive titles are preferable. I have followed your requested 60-character maximum, counting the brand suffix. 

Google for Developers

Page	Verdict	Recommended rendered title	Characters
/	Keep	SiteBlitz — Fast Business Websites from ₹7,999 / $99	52
/pricing	Change	Affordable Website Design in India — Prices — SiteBlitz	55
/services/business-websites	Keep	Small Business Website Design from ₹7,999 — SiteBlitz	53
/services/landing-pages	Keep	Landing Page Design Services from ₹7,999 — SiteBlitz	52
/blog/website-cost-india-honest-breakdown	Change	Website Design Cost in India (2026): Guide — SiteBlitz	54
/website-in-48-hours	Minor change	Business Websites in as Little as 48 Hours — SiteBlitz	54

The pricing title currently has 61 characters; the cost article has 68. The replacement for the 48-hour page simply standardizes the brand separator.

Implementation rule: When using the layout's title.template, supply only the page-specific title. Use title.absolute for intentional exceptions. Validate the rendered <title>, not just the metadata object.

Also verify that titles, visible H1s and Open Graph titles accurately describe the same page.
2. AI crawlers — keep wildcard access
Verdict: Keep User-agent: * with the existing exclusions. Do not add individual AI crawler Allow rules.

The recommended policy is:
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://YOUR-CANONICAL-DOMAIN/sitemap.xml


Use the actual verified production canonical URL, not the placeholder.
Why this is preferable
The wildcard allows legitimate search and AI discovery crawlers without a brittle list that must be maintained whenever providers add or rename agents.
Crawler	Function	Recommendation
OAI-SearchBot	ChatGPT Search discovery	Allow via *
ChatGPT-User	User-requested ChatGPT retrieval	Do not block
GPTBot	OpenAI model-training crawling	Leave allowed under current open policy
PerplexityBot	Perplexity search discovery	Allow via *
Claude-SearchBot, Claude-User	Claude search and user retrieval	Allow via *
ClaudeBot	Anthropic training-related crawling	Leave allowed under current policy
Google-Extended	Google control for Gemini training and certain grounding uses	Leave allowed
Applebot-Extended	Apple's model-training control	Leave allowed
CCBot	Common Crawl public web dataset	Leave allowed

OpenAI explicitly separates OAI-SearchBot from GPTBot, while Anthropic distinguishes its search, user and training bots. Google-Extended is a control token, not an independent crawler, and does not influence Google Search rankings. 

OpenAI Developers+4

Important distinction: Allowing training crawlers is not a documented requirement for appearing in AI-search results. If the owner later wants to restrict AI training, that can be done selectively while preserving search access. For now, I recommend the simplest open policy because the public content is intended for broad discovery.

One technical reason not to add redundant bot-specific groups: specific groups do not automatically inherit * exclusions. An explicit OAI-SearchBot: Allow / group could unintentionally omit the /admin/ and /api/ restrictions. 

Google for Developers

Two crawler checks that matter more than adding bot names
- Verify that Vercel security, firewall and bot protection actually permit legitimate crawler requests, including published OAI-SearchBot IP ranges. Robots permission does not override a 403 or CAPTCHA challenge. 
  
  OpenAI Help Center
- Confirm that production public pages return HTTP 200, visible SSR content, correct canonicals and no unintended noindex. Ensure preview deployments cannot become competing indexed copies.
Also ensure /robots.txt contains the absolute sitemap URL. The Next.js robots.ts metadata route supports this directly. 

Next.js

3. Five highest-value remaining on-site SEO/GEO actions
These are the five changes I would authorize next. Each is independently buildable within your eight-file limit, using existing project facts. File paths are suggested implementation locations and should be checked against the repository.
P0
1. Establish one canonical, indexable production identity

Up to 5 files

Audit SITE.url, metadataBase, canonicals, sitemap, robots.ts, and preview indexing. Ensure preview deployments do not compete with production in search results.

Files: src/lib/site.ts, src/app/layout.tsx, src/app/sitemap.ts, src/app/robots.ts, next.config.ts.

Acceptance: All public pages use the same canonical host, preview responses are protected against indexing, and sitemap URLs resolve correctly. Do not change the domain until ownership is confirmed.



P0
2. Consolidate the entity/schema graph

Up to 4 files

The site-wide ProfessionalService node and homepage Organization node need a shared identity. Use consistent @id references such as SITE.url/#organization and SITE.url/#website.

Remove sameAs: [] until verified external profiles exist. Remove unverified physical address fields. Preserve legitimate Service, Offer, BreadcrumbList and BlogPosting data, and represent INR/USD prices accurately.

Files: src/app/layout.tsx, src/app/page.tsx, src/lib/site.ts, and optionally one shared SEO helper.

Acceptance: No contradictory organization identities, no unsupported business facts, and relevant JSON-LD passes syntax and applicable schema validation. Google recommends truthful organization identity information. 

Google for Developers




P1
3. Turn pricing into an answer-first purchasing guide

Up to 4 files

Strengthen /pricing and /website-in-48-hours with a clear Launch / Growth / Scale comparison: published inclusions, timeline differences, customer responsibilities, documented exclusions, revision terms where specified, and ownership conditions.

Files: src/app/pricing/page.tsx, src/app/website-in-48-hours/page.tsx, src/lib/site.ts, existing shared Pricing component.

Acceptance: Visitors can identify the suitable plan and documented conditions without contacting sales. All information is sourced from existing plans, FAQs and terms.



P1
4. Publish one genuinely useful comparison guide

Up to 5 files

New URL: /compare/website-builder-vs-studio

Proposed H1: Website Builder vs Design Studio: Which Should You Choose?

Compare DIY convenience, skills required, available customization, handoff, ownership and maintenance. Explain when a DIY builder is the better option; use SiteBlitz's verified plans and process only. Do not invent competitor prices or performance results.

Files: new page, src/app/sitemap.ts, public/llms.txt, pricing page, existing dynamic service-page route.

Acceptance: Original decision-making content that addresses a distinct buying question and links meaningfully to relevant services.



P1
5. Make proof interpretable and contextually connected

Up to 6 files

Expand /proof with a concise methodology: what is measured, measurement window, sample size, field versus lab data, and what the numbers do not prove. Explain the grader's scope and limitations.

Add contextual links from the home, service and relevant blog pages to pricing, process, the 48-hour page and proof—not repetitive site-wide keyword blocks.

Candidate files: /proof page, grader page, ProofStrip.tsx, homepage, dynamic service-page route and dynamic blog-page route.

Acceptance: Each metric has a clear interpretation and limitation; relevant pages offer helpful next-reading links. If field samples are insufficient, explicitly say so rather than asserting a passing p75 result.



Google's current AI-search guidance supports this priority: indexed, useful, accessible content is the foundation for appearing in AI Overviews and AI Mode. There is no separate mandatory GEO schema or technical shortcut. 

Google for Developers

Do not add more generic keyword landing pages until there is evidence that they satisfy distinct user intent.
4. Off-site actions requiring the owner
In priority order:
1. Domain: Verify ownership of the preferred SiteBlitz domain and authorize the permanent production host, HTTPS and redirects.
2. Google Search Console: Verify the domain property, submit the sitemap, inspect important URLs and establish a performance baseline.
3. Google AI visibility: Review the Search Console generative-AI performance reports, rolled out worldwide by 31 August 2026. 
   
   Google for Developers
4. Bing Webmaster Tools: Verify site ownership, submit the canonical sitemap and monitor indexing.
5. Real profiles: Verify the official LinkedIn company page and other genuine business profiles, with consistent business name, contact details and URL.
6. Google Business Profile: Create or verify one only if SiteBlitz actually meets Google's in-person customer-contact eligibility; online-only businesses are not eligible. 
   
   Google Business Profile Help
7. Earned credibility: Obtain real client-project permissions when available, publish genuine results and secure relevant references from actual partners, customers or professional organizations.
No purchased fake reviews, manufactured backlinks or mass-generated location pages.
5. Implementation risks and corrections
Priority	Finding	Required action
High	Five non-home pages previously recorded 2.9–4.8s lab LCP.	Re-measure after removing first-screen .reveal. Do not declare performance complete before results.
High	Site-wide ProfessionalService contains an address while local presence remains unverified.	Verify it against actual business facts or remove unsupported physical-location fields.
Medium	Production is separate from the actively developed branch.	Check production canonicals, indexing and performance after release—not only preview.
Medium	The 48-hour page derives from existing pricing, FAQ and process content.	Ensure the page has distinctive eligibility guidance rather than becoming a near-duplicate service page.
Medium	First-visit Preloader still exists.	Keep for now: measured homepage LCP is 2.00s. Verify accessibility, content visibility and real-user effects separately.
Medium	FAQPage and sitemap priority are receiving implementation attention.	Keep truthful FAQs, but Google no longer displays FAQ rich results; Google also ignores sitemap priority. Neither warrants further optimization work.  Google for Developers+1
Medium	Existing tracking uses persistent identifiers and location-derived data.	Complete privacy, disclosure and retention review with counsel before relying on tracking for growth analysis.
Low	"90+ LIGHTHOUSE TARGET" replaces an unsupported results claim.	Accept, provided the target is genuine and clearly distinguished from measured performance.

One further update: Google announced a planned shared AI-training control on 30 October 2026, with support targeted for 2027. Do not implement that future signal as a present-day SEO technique. 

Google for Developers

Success metrics to establish after production launch
Metric	What to measure
Indexation	Important canonical pages indexed and eligible for snippets
Traditional organic	Non-brand impressions, clicks and qualified enquiries
Google AI visibility	AI-search impressions and associated traffic where reported
ChatGPT referrals	Sessions with utm_source=chatgpt.com and resulting enquiries  OpenAI Help Center
AI citation presence	A repeatable sample of commercial prompts across ChatGPT, Gemini, Perplexity and Claude
Business outcome	Qualified leads and paying projects originating from organic or AI-search traffic

For the last two, record measurement methods and limitations; AI citation frequency is not a guaranteed or official ranking score.

Points still open
1. Performance: Post-fix measurements for /contact, /about, /services, /pricing and /work; production mobile p75 remains unverified.
2. Canonical identity: Owner-confirmed permanent domain, redirects and preview-indexing controls.
3. Entity facts: Verification of the physical address and any public business profiles used in structured data.
4. Search Console and Bing: Account verification, sitemap submission and actual indexing evidence.
5. Content quality: Review of the 48-hour page for distinctiveness; confirm exact published plan exclusions and ownership conditions before extending pricing content.
6. Structured data: Validate the consolidated organization graph and existing Offer/Service markup.
7. Privacy: Review tracking, retention and required notices with counsel.
8. Release: npm test, npm run build, applicable docs/VERIFY.md checks, responsive/reduced-motion screenshots and confirmation of a successful production deployment.
Round 3 conclusion: The design direction is settled, the reported homepage lab result is encouraging, and no crawler allowlist expansion is needed. The next meaningful growth step is a verified production identity plus credible, useful, indexable buying information.

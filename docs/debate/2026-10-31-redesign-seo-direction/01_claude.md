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

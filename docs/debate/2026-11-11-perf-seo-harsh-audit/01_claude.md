name: siteblitz-seo-multipage
use_when: SiteBlitz marketing site (Next.js 15, dark v4 "showcase" theme) - information architecture for a real multi-page site, keyword research and page-to-keyword mapping for website-development searches in India and Gujarat, brand-name #1 including misspellings, AI-answer-engine visibility, Core Web Vitals, and where motion is still missing - with honest limits on what can be guaranteed.

<!-- v1.0 (2026-11-10), written by Claude Code at the owner's request by merging the SEO / GEO / quality-rater
hats of seo-ai-search-local-tutor with the SiteBlitz rules of siteblitz-transformation-debate. Edit freely. -->

You are a blunt senior reviewer with four hats at once:
1. Technical SEO lead who has ranked small Indian service businesses against aggregators (Justdial, Sulekha,
   IndiaMART, Clutch, GoodFirms, DesignRush) and big agencies: crawlability, canonicals, sitemaps, internal
   linking, URL design, title/H1/meta writing, schema.org, Core Web Vitals on cheap Android phones over 4G.
2. Keyword researcher for the Indian market: what people really type into Google, Brave and Bing when they
   need a website (English, Hinglish, Hindi in Roman script, Gujarati), search intent per query, which
   queries a new small studio can realistically win and which belong to directories or ads.
3. Generative-engine-optimisation (GEO) practitioner: how ChatGPT search, Gemini, Perplexity, Copilot and
   Google AI Overviews choose and cite sources; entity building (one consistent name, place, phone, sameAs),
   llms.txt, answer-shaped content, third-party corroboration.
4. Search-quality rater who knows Google's spam policies: doorway pages, scaled content, keyword stuffing,
   self-serving review markup, fake locations - and what gets a small site penalised.

You are talking to Claude Code, an AI coding agent with the real SiteBlitz repository, a browser and a terminal
open. It pastes the evidence below. Treat that evidence as the only facts; anything missing is unknown. Ask for a
file by path if you need it.

Facts that are fixed (do not argue them):
- SiteBlitz is a small web studio based in Gujarat, India (the founder works from South Gujarat). Never place it
  in Mumbai or any other city, and never propose an office or address that does not exist.
- No verified client results, reviews or testimonials exist yet. Never propose invented reviews, ratings, client
  names, numbers or case studies. Trust comes from working demo sites (clearly labelled fictional concepts),
  upfront prices, the real process and the free website grader tool.
- Stack: Next.js 15 App Router, server components first, Tailwind v4 tokens, declarative GSAP via data-* hooks,
  heavy work deferred, one dark brand (void #0A0A0C, ink #F5F5F0, volt #CCFF00, Mona Sans / Instrument Serif /
  DM Sans). The new pages must continue this theme, not replace it.
- Every motion idea needs a phone version, a reduced-motion version and a performance cost. Targets: WCAG 2.2 AA,
  CWV p75 LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1.

Your job: challenge Claude's plan, find what it missed, and propose better options with reasons.
- Answer every agenda point by its number: "agree", "disagree because ...", or "need data: <what>".
- Be concrete: exact page list and URLs, exact <title> / H1 / meta description, exact target query per page,
  exact schema fields, exact internal links, exact steps outside the site (Google Search Console, Bing Webmaster
  Tools, Google Business Profile, directories) - no generic advice.
- For keywords, say where your demand estimate comes from (a named tool, Google autocomplete, People Also Ask,
  your own knowledge) and how sure you are. Claude will cross-check with live searches.
- Separate what is achievable (brand name #1 incl. common misspellings, sitelinks, long-tail and city + service
  queries, AI citations) from what is not (guaranteed #1 for "website development", outranking ads and
  directories in months) and say so plainly.
- Reject any tactic that breaks Google's policies or invents facts (fake reviews, doorway city pages, keyword
  stuffing, hidden text with misspellings, Wikipedia/Wikidata entries without notability).
- Accept good choices in one line; do not manufacture disagreement.
- End every reply with the list of points still open.

<project_context>
<file path="docs/debate/2026-11-11-perf-seo-harsh-audit/evidence.md">
# Evidence pack - round 1 (read from the repository on 2026-11-11, branch v2-redesign @ 2997d46)

## Deployment state
- NOT deployed. Branch is 36 commits ahead of origin; no domain bought (`siteblitz.in` pending owner); production URL
  falls back to `https://siteblitz.vercel.app` (`src/lib/site.ts:6`, `NEXT_PUBLIC_SITE_URL` unset). Vercel Hobby plan
  today (non-commercial terms - owner plans Vercel Pro or Netlify). No Search Console property, no Bing WMT, no Google
  Business Profile, no backlinks, no reviews, no field (CrUX) data. A Google verification meta token exists in layout.
- The older v1 site is live at the vercel.app URL; everything below describes the unreleased v4 build.

## Stack and page weight drivers
- Next.js 15.5 App Router, React 19, server components first, Tailwind v4. Dependencies: gsap 3.15, lenis 1.3, cobe
  (globe), recharts (admin only), lucide-react, mongoose/jose/zod (server).
- Fonts via `next/font/google`, self-hosted: Mona Sans variable (wdth axis, latin + latin-ext, `display: swap`),
  DM Sans 400/600 (`display: optional`, chosen after a swap reflow gave lab CLS 0.17), Instrument Serif 400 normal +
  italic (`display: swap`).
- Shell on every public page: inline Preloader (pure CSS sheet, 0-100 counter + bar, lifts at 1.2 s on the FIRST page
  of a browser session only; `aria-hidden`; page underneath is painted the whole time), Navbar, Footer, WhatsApp pill
  (fixed), `ExperienceLayer` -> idle-deferred dynamic import of `Motion.tsx` (GSAP + ScrollTrigger + SplitText + Lenis,
  ~384-line scene engine driven by data-* attributes).
- Home hero: `ParticleHero` - writes scroll progress to a CSS var; after idle it lazy-loads a WebGL particle engine
  (20,000 particles desktop / 6,000 phone) unless reduced motion or a low-power device; static poster/wordmark fallback.
  Home has 10 scenes (hero -> statement -> giant price -> drifting captures -> concept wall -> packages track -> steps ->
  concept promise -> FAQ -> close). Images through `next/image` (AVIF/WebP by Next), demo PNG/WebP captures.
- First-party analytics: `<Tracker/>` client beacon to `/api/track` (always 204).
- Headers (`next.config.ts`): nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy; `/images/*` immutable
  1 year; `compress: true`; no CSP, no HSTS set in code (Vercel adds HSTS on its domains).

## SEO implementation
- 38 URLs in the sitemap: home, work, services (+6 service pages), pricing, process, about (Studio), contact, faq (18 Qs),
  proof, book, website-in-48-hours, tools/grader, blog (+7 English guides, 1 Roman-Hindi guide paired by hreflang
  en / hi-Latn), 4 industry landers `/for/*`, research hub + Gujarat study + Surat sub-page + India study (CSV routes),
  privacy, terms, refunds. Demo sites `/demo/*` are noindex (fictional concepts).
- One route registry (`src/lib/pages.ts`, `routes.ts`) feeds nav, footer (links every indexable page), sitemap (real
  lastmod dates, not build time), llms.txt / llms-full.txt (generated).
- `pageMeta()` gives each page its own canonical (no root canonical), title, description, OG; per-route OG image cards.
- JSON-LD as one @graph per page: Organization (+ alternateName "Site Blitz"), WebSite, WebPage, BreadcrumbList,
  Service, FAQPage, Dataset (research), BlogPosting.
- robots.ts: allow all, disallow /admin and /api/; named groups for Googlebot, Bingbot, Google-Extended, GPTBot,
  OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Applebot(-Extended),
  DuckDuckBot, YandexBot; `host` + sitemap lines.
- `<html lang="en-IN">`; viewport `width=device-width, initial-scale=1, viewport-fit=cover`; themeColor #0a0a0c;
  `manifest.ts` present; favicon.svg.
- Home title "SiteBlitz — Gujarat-based Website Design & Development Studio"; pricing title "Website Price in India:
  ₹7,999 & ₹17,999 Plans".

## Previous session's own measurements (to be re-run now, not trusted)
- `scripts/seo-audit.mjs` against `next start`: 38 sitemap URLs, 41 internal links, 0 problems (200, one canonical =
  sitemap URL, one h1, unique titles/descriptions <= 160 chars, JSON-LD @id references resolve, og:image is a PNG).
- `scripts/vitals.mjs` (CDP, 390x844, 4x CPU, ~1.6 Mbps / 150 ms RTT, fresh profile, median of 3): LCP 1.1-1.5 s on
  every measured page, CLS 0.000-0.03, TBT 120-530 ms (research hub highest - big tables; machine under load).
- Screenshots at 1440 / 390 / 320 of 17 pages: no horizontal overflow, no console errors.
- No Lighthouse run, no INP measurement, no Rich Results Test (needs a public URL), no real low-end phone test.

## What Claude Code can run locally
Chrome 157 headless over CDP (throttling, device metrics, tracing, coverage), `npx lighthouse` (mobile + desktop),
curl / node fetch, the repo scripts above, the scratch production server. Not available without a deploy: PageSpeed
Insights, CrUX field data, Search Console, Rich Results Test, real Googlebot fetch.

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
- On Windows, stopping the background `npm run dev` / `npm start` shell **leaves the `next` child alive on :3000**
  (bit three times on 2026-10-31: a stale server answered every check, a new dev silently took :3001).
  After stopping, list `node.exe` processes whose command line contains `E:TempSiteBlitz
ode_modules` and stop those PIDs.
- Visual QA: `node scripts/shoot.mjs --pages /,/work --widths 320,375,1440 [--rm] [--full] [--cookie sb_admin=<jwt>]`
  (flags horizontal overflow + console errors). Lab perf: `node scripts/vitals.mjs --pages / --runs 3` against `npm start`.
  Git Bash needs `MSYS_NO_PATHCONV=1` or `/` page args get rewritten to Windows paths.
- PowerShell 5.1 has no `&&`. Separate commands, or `;`.
- `shoot.mjs --full` prints the viewport size, but the PNG is full height; `--dpr 2` for crisp assets,
  `--eval "<js>"` (async allowed) to inspect or click in the real browser. Native `loading="lazy"` images
  never loaded in headless shots; images that are the proof (demo cards) use `loading="eager"`.
- Start/stop servers as background tasks and stop them with TaskStop; broad `Stop-Process` patterns are blocked.
  A stale `.next` can fail the build with `ENOENT edge-runtime-webpack.js`: re-run `npm run build` (deleting `.next` is blocked).
- `node_modules` can be missing on this device: `npm ci` first. Marketing captures (`public/demos/*`) come from
  `next start`: dev mode stamps the "N" indicator into screenshots.
- Under machine load (AnyDesk), three tests that import routes in `beforeAll` hit vitest's 10 s hook timeout;
  `npx vitest run --hookTimeout 60000` tells slow from broken. Lab TBT is not comparable then either.
- Photos: Unsplash and Codrops sit behind bot checks — do not bypass. Licensed stand-ins come from Wikimedia
  Commons via the design skill's `photos.mjs search`; credit each in `src/lib/photos.ts` (footer line).
- Scroll scenes: `node scripts/frames.mjs --page / --width 1440 --at "[data-hall]:0.5,#pricing:0.3" [--hover sel]
  [--eval js] [--cookie ..]` shoots one Chrome session at many scroll positions (pinned/sticky scenes; real-mouse hover).
- Admin with data: start the scratch mongod + `next start -p 3100` (see E2E line below), then `node scripts/e2e-seed.mjs`
  runs VERIFY section E 1-6, seeds 12 QA leads and 8 visits through the real API and prints the admin cookie.
- Reference sites: `docs/debate/2026-11-10-motion-reference/tools/ref-scroll.mjs --url <site> --name x [--w 390]`
  scrolls a live site with real wheel events and probes GSAP/Lenis/WebGL/fonts/bytes; tile frames with ffmpeg.
- GSAP rounds px values (`autoRound`): sub-pixel props such as `strokeDashoffset` need `autoRound: false`.
  `overflow: hidden` on an ancestor kills `position: sticky` (it becomes the scroll container): use `overflow: clip`.
  With Lenis on, `scrollIntoView` does not move the page in tests: use `window.__lenis.scrollTo(y, {immediate:true})`.
- E2E without touching production: run the cached `~/.cache/mongodb-binaries/mongod-x64-win32-8.2.6.exe` on a
  scratch dbpath and port, then `next start` with `MONGODB_URI` and test-only `ADMIN_*`, `JWT_SECRET`, `CRON_SECRET` env.

## Search and inner pages (learned 2026-11-11, SEO-0..8)
- A new public page is registered in `src/lib/pages.ts` (or derived in `src/lib/routes.ts`); `tests/seo.test.ts` fails
  if a registered URL has no page, a footer link 404s or an indexable page is unreachable. Metadata comes from
  `pageMeta()` in `src/lib/seo.ts`; structured data from its node builders (never hand-written JSON-LD).
- Rendered check: `node scripts/seo-audit.mjs --base http://localhost:3100` against `next start` (canonicals, h1,
  unique titles/descriptions, JSON-LD ids, OG images, every internal link).
- Inner-page heroes use `PageHero`; `.ph-soft` must stay transform-only (an opacity fade made hero figures the late LCP
  element, 2.8-3.4 s). Hero text lines of 16-17 characters at most on long headings, or the display font re-wraps on load.
- A wide table needs its scroll box `relative` (an sr-only `<caption>` escaped and widened the page) and grid children
  `[&>*]:min-w-0`. The body font is `display: optional` on purpose (swap reflow gave CLS 0.17).
- Research pages: every figure is a "URL retained after filtering" (the extract keeps one filtered URL per record);
  never "has a website" or "own website". Data comes from `E:\SiteBlitz-World-Business-Data` via scratch scripts in
  `E:	mp\_sb_research`; counts only, no business names.

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
   faint, volt, violet, warm, line`. No inline hex. Reusable effects are classes in `globals.css`.
   Since 2026-11-10 (D15) the site and the admin share **redesign v4 "showcase"** (`docs/spec/redesign-v4-showcase.md`):
   void #0a0a0c, ink #f5f5f0, volt #ccff00 (text on volt is void), Mona Sans 800 at 125% width (`.display`) with
   Instrument Serif italic accent words (`.serif`) and DM Sans text. `[data-theme="dark"]` on the admin layout is only a
   scope hook now; the root tokens are the same set.
   `--color-warm` fails text contrast: fills and decoration only.
   Tailwind v4 is CSS-first: there is no `tailwind.config.js` and there should not be one. Custom CSS outside a
   layer beats every utility: put helper classes in `@layer components` (`.btn-volt`'s unlayered
   `position: relative` silently overrides the `fixed` utility).
   v4 scenes are data-* hooks built in `Motion.tsx`: `data-draw` (volt strokes, pathLength 100), `data-rise`,
   `data-drift`, `data-hall`, `data-htrack` (adds `.is-track` only when every panel fits), `data-step`, `data-scatter`,
   `data-close` (`.is-lit`). The hero is NOT in Motion.tsx: `hero/ParticleHero.tsx` runs its own rAF, writes `--p` on
   `[data-hero]` for the CSS, and lazy-loads the WebGL engine `hero/particles.ts` (static poster fallback).
   Every scene is its own `schedule()` task and runs through `ctx.add`, or it leaks across client navigations.
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
- **Prices, payment splits, delivery terms, inclusions/exclusions → `src/lib/offer.ts` only.** Every page
  reads from it; `tests/offer.test.ts` fails if a withdrawn price ($ prices, ₹14,999/₹24,999), "Mumbai",
  an indexing guarantee or an unguarded `SITE.email` reappears in public copy.
- Short copy, FAQs, process steps, work items → `src/lib/site.ts`. Location is "Gujarat-based" (truthful);
  the founder's name/photo never appear. `SITE.emailLive` stays false until the mailbox is send/receive tested.
- Demo sites (`src/lib/demos.ts`, `/demo/*`) are FICTIONAL: noindex, permanent disclosure ribbon, enquiry is
  simulated and collects nothing. Never add a real address, phone, review or result to a demo.
- Ads live in `marketing/ads/` (sources + `render.mjs`); re-render, never hand-edit exports.
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
- `v2-redesign` tracks `origin/v2-redesign`. Pushes create Vercel **Preview** deployments only; production is a
  separate step (`docs/DEPLOY.md`).

</file>
</project_context>

<topic>
# Topic - harsh performance + SEO audit of the current SiteBlitz site

## The owner's words (Roman Hindi / Hindi, translated)
"Run a /debate round. Mainly ask ChatGPT: the current SiteBlitz site was redesigned by another session - how much
performance and, mainly, SEO power does it have? Rate it out of 100. Use ChatGPT to get test cases and points, and also
take your own points separately and test them. Rate out of 100. I want totally real and harsh testing - harsh meaning a
level of testing so strict that no website could deliver that SEO and performance. In mobile view, in anything - I want
100 out of 100 in everything. Tell me the current rating and what all the issues are. Use ChatGPT in an extraordinary
way, but do proper testing of performance and SEO."

## How this round works
- Round 1 (this message): you give the rubric, the harsh test cases with exact pass thresholds, and a provisional
  score from the evidence. Claude Code then runs your test cases AND its own independent test list against a local
  production build (`next build` + `next start`, Chrome headless over CDP, Lighthouse mobile, the project's own
  vitals / SEO-audit / screenshot scripts) and comes back with measured numbers.
- Round 2+: you score against the measurements; Claude checks every claim against the code.
- The site is NOT deployed yet (no domain bought, no Search Console, no field data, no backlinks). Say how that should
  be scored instead of pretending it does not matter.

## Agenda
1. Scoring rubric: how to score Performance /100 and SEO /100 harshly and honestly (weights, lab vs field, on-page
   technical SEO vs real-world "SEO power" for a site with no domain, no deploy, no backlinks yet).
2. Harsh mobile performance test cases with exact pass thresholds stricter than Lighthouse's green band
   (low-end Android, slow 4G / 3G, 4-6x CPU, INP from real interactions, JS / font / image byte budgets, WebGL hero,
   preloader, Lenis + GSAP main-thread cost, bfcache, caching headers).
3. Harsh technical SEO test cases with exact pass criteria (crawl, render without JS, status codes, redirects,
   trailing slash, soft 404, canonicals, hreflang, sitemap, robots, structured data validity, internal link depth,
   anchor text, title / description pixel width, headings, image alt, OG).
4. Mobile-view checks (320-414 px): tap targets, font sizes, overflow, mobile-first content parity, intrusive
   interstitials (the 1.2 s first-visit preloader), sticky elements covering content.
5. Specific risks in this build: first-visit preloader, WebGL particle hero, Lenis smooth scroll, GSAP scenes,
   `display: optional` body font, 10-scene home page, research pages with big tables.
6. Your provisional score now (Performance /100, SEO /100, mobile /100) from the evidence below, and exactly which
   measurements would move it up or down.
7. What "100/100 in everything" can and cannot mean here - which targets are achievable in code and which depend on
   things outside the code (domain, hosting, Search Console, backlinks, field data).

## Output wanted
- For 2-4: a numbered test list (P1..Pn, S1..Sn, M1..Mn). Each test: what to measure, the exact tool or method that
  Claude can run locally (CDP, Lighthouse CLI, curl, a script), the pass threshold, and its weight in the score.
  Make it harsher than PageSpeed Insights, but every test must be measurable and tied to a real ranking or user effect
  (no vanity checks).
- Answer each agenda point by number: agree / disagree because ... / need data: ... . End with the list of points
  still open.
</topic>

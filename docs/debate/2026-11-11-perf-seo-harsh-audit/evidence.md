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

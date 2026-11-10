# Evidence - checked by Claude Code on 2026-11-10 in E:\Temp\SiteBlitz (branch v2-redesign)

## What is live vs local
- Production `https://siteblitz.vercel.app` = the OLD v2 build: multi-page, nav "01 Work /work, 02 Services /services,
  03 Pricing /pricing, 04 Proof /proof, 05 Studio /about, 06 Contact /contact", footer adds /process, /blog, /book,
  /for/{restaurants,clinics,law-firms,boutiques}, /tools/grader. H1 "WEBSITES THAT WIN BUSINESS." (old copy).
- Local v4 "showcase" (unreleased, 19 commits not pushed): new dark brand, but `NAV_LINKS` in `src/lib/site.ts:24` is
  `/#demos "Live demos", /#how "How it works", /pricing "Pricing", /#faq "FAQs"` -> three of four links scroll the home,
  so the site feels single-page. The 10 home scenes: particle hero (WebGL, wordmark flies into a concept phone),
  statement, giant Rs 7,999, drift collage, concept wall (demo captures), sideways packages track, process path,
  "see it before you pay", FAQ, volt close.
- 20 public routes already exist; the inner pages only took the v4 tokens/fonts and keep old copy ("Violent
  execution", "dominate online"). `data-anim` hooks per page: about 3, services 3, blog 4, process 6, proof 17,
  /services/[slug] 13, /for/[slug] 11, /website-in-48-hours 7, work 0, pricing 0, contact 0.

## Current titles (`metadata.title`, template "%s - SiteBlitz")
- / : "Business Websites from Rs 7,999 - SiteBlitz, Gujarat" (root default)
- /about "Studio - About SiteBlitz" (description says "India-based ... worldwide")
- /services "Services - Web Design, Development & SEO"; /services/{business-websites, landing-pages,
  ecommerce-and-booking, seo-and-geo, care-plans, project-rescue}
- /pricing "Website Prices & Terms - One Page Rs 7,999, Three Pages Rs 17,999"
- /process "The 48-Hour Process, Hour by Hour"; /website-in-48-hours "Business Websites in as Little as 48 Hours"
- /work "Work - Concept Studies"; /proof "Live Proof - Real Numbers, Publicly Measured"
- /contact "Start a Project - Contact"; /book "Book a Free 30-Minute Brief Call"; /tools/grader "Free Website Grader"
- /for/{restaurants|clinics|law-firms|boutiques} "<X> Website Design India | Live in 48 Hours"
- /blog + 7 posts: website cost India 2026, GBP + website local SEO, landing page vs website, builder vs studio,
  small-business website must-haves 2026, website speed and revenue, GEO explained.
- /demo/[vertical] = fictional demo sites, `robots: noindex` (FD-45). Legal: /privacy /terms /refunds.

## Technical SEO state
- Root JSON-LD: `ProfessionalService` name "SiteBlitz", telephone, address = addressRegion "Gujarat" + "IN" only,
  areaServed "IN", priceRange, no sameAs, no alternateName, no logo. Home adds WebSite + FAQPage JSON-LD.
- Service / blog / lander pages already emit some JSON-LD; no BreadcrumbList anywhere.
- `src/app/sitemap.ts`: every URL gets `lastModified: new Date()` (build time), priorities 0.3-1.0.
- `robots.ts` allows all, disallows /admin and /api/. `public/llms.txt` exists. `opengraph-image.tsx` = one OG image
  for the whole site. `meta keywords` list exists (ignored by Google). Google site-verification meta present.
- Canonical base = `NEXT_PUBLIC_SITE_URL` or `https://siteblitz.vercel.app`.

## Brand and domain facts
- siteblitz.in and siteblitz.co.in were unregistered on 2026-11-09 (NIXI RDAP); siteblitz.com registered since 2001
  by someone else; a French company named "SiteBlitz" (same business: websites) owns siteblitz.ai, getsiteblitz.com,
  trysiteblitz.com. Trademark search not done. No Google Business Profile, no social profiles verified yet.
- Web search (US index) for "siteblitz" today returns StackBlitz, the Craft CMS "Blitz" plugin, SiteBlob, Blitzweb
  - no SiteBlitz page at all. Google India autocomplete returns "siteblitz" only as itself; misspellings get nothing.
- Host: Vercel Hobby (founder decision pending, D12). Prices Rs 7,999 / Rs 17,999 / custom pending approval (D11).

## Performance (lab, `next start`, mobile 4x CPU)
- `/` LCP 1.28 s, CLS 0.001, TBT 364 ms (was 748 before deferring the scenes). `/pricing` LCP 1.17 s, TBT 114 ms.
- Every page loads: first-visit CSS preloader (<= 1.2 s), desktop cursor, magnetic buttons, volt page curtain,
  glass header, Lenis smooth scroll on desktop, GSAP via `Motion.tsx` (714 lines). Fonts: Mona Sans (variable,
  latin + latin-ext), DM Sans 400/600, Instrument Serif.

## Fixed rules (from the project CLAUDE.md)
- Location wording "Gujarat-based" (FD-22, truthful). Founder works from South Gujarat; no city is named today.
- Never invent prices, timelines, testimonials, client names or results; prices only from `src/lib/offer.ts`.
- Demo sites are fictional: noindex, disclosure ribbon. `/proof` publishes the site's own real-user vitals.
- Long-form content = JSON in `src/content/generated/`, imported in `src/content/index.ts`.
- Motion is declarative (`data-anim`, `data-draw`, `data-rise`, `data-drift`, `data-htrack`, `data-step` ...) built by
  `Motion.tsx`; reduced motion honoured everywhere.

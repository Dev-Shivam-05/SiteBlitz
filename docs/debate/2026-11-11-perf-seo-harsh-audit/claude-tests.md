# Claude Code's independent test list (written before reading ChatGPT's round-1 reply)

Harsh bar = stricter than PageSpeed Insights green. Every test runs against the local production build
(`next build` + `next start -p 3100`), Chrome 157 headless over CDP.

## Performance (mobile first)
- C-P1 Lighthouse mobile (simulated Moto G Power, 4x CPU, slow 4G) Performance score, median of 3, on 12 pages. Pass: 100.
- C-P2 Lab LCP <= 1.2 s (Lighthouse + CDP observer). C-P3 TBT <= 50 ms. C-P4 CLS <= 0.01 incl. a full scroll of the page.
- C-P5 INP: real taps (menu, FAQ accordion, buttons, links) at 4x and 6x CPU. Pass: every interaction <= 100 ms.
- C-P6 First-load JS (compressed) on home <= 100 KB; unused JS <= 20 %. C-P7 Total first-view bytes <= 500 KB; fonts <= 100 KB.
- C-P8 Rendering mode per route (static vs dynamic from the build table) and server response time.
- C-P9 Cache headers: `/_next/static` immutable; HTML cacheable at the edge; images long-lived.
- C-P10 bfcache eligible (back/forward restores instantly).
- C-P11 Scroll smoothness: long animation frames / dropped frames while scrolling the home page at 4x CPU (Lenis + GSAP + WebGL).
- C-P12 Worst case: 6x CPU + slow 3G (400 kbps, 400 ms RTT): FCP and LCP.

## SEO
- C-S1 Lighthouse SEO score on every sitemap URL. Pass: 100.
- C-S2 Re-run `scripts/seo-audit.mjs` (canonical, h1, unique title/desc, JSON-LD @id, OG, internal links).
- C-S3 No-JS parity: raw HTML contains the H1, body copy and all nav/footer links (what a non-rendering crawler sees).
- C-S4 Status codes: unknown URL -> real 404 (not soft); `/services/xyz` -> 404; trailing slash and uppercase -> one redirect
  to the canonical; query strings do not change the canonical.
- C-S5 Title <= 60 chars (~580 px), description 120-160 chars, no truncation of the brand.
- C-S6 Structured data per Google's required/recommended fields (Organization logo, BreadcrumbList, BlogPosting image/
  author/datePublished, Dataset name/description/license); no rich-result types Google no longer shows treated as wins.
- C-S7 hreflang reciprocal + self-reference (+ x-default).
- C-S8 Click depth <= 3 from home for every sitemap URL; no orphans; descriptive anchor text.
- C-S9 Images: alt on content images, empty alt on decorative ones, width/height set. C-S10 Exactly one h1, no skipped levels.
- C-S11 robots.txt + sitemap validity; sitemap only lists 200, canonical, indexable URLs.
- C-S12 Content depth: visible word count per page; pages under 300 words flagged as thin; near-duplicate titles/H1s.
- C-S13 Canonical host: canonicals and sitemap point at the real production host.
- C-S14 Lighthouse Accessibility and Best Practices (contrast, names, console errors). Pass: 100.
- C-S15 Off-page / real search presence: domain, Search Console, backlinks, Business Profile, brand SERP.

## Mobile view
- C-M1 Tap targets >= 48x48 px or 8 px apart (Lighthouse target-size + DOM scan). C-M2 Body text >= 16 px; nothing under 12 px.
- C-M3 No horizontal overflow at 320 / 360 / 375 / 390 / 412 / 414 px.
- C-M4 First-visit preloader: does it cover main content after a search click (Google's intrusive interstitial guidance)?
- C-M5 Fixed UI (navbar + WhatsApp pill) share of a 360x640 screen. C-M6 Reduced-motion: every section visible.

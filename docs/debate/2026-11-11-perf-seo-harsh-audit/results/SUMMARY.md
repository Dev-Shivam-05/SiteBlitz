# Measured results - SiteBlitz v4 harsh performance / SEO / mobile audit - 2026-11-11

Build: branch `v2-redesign` @ `2997d46` (tree clean apart from untracked debate folders), Next 15.5.20, React 19, Node 26.7.0,
Chrome 157 headless, Lighthouse 12.8.2 (benchmarkIndex 2000), Windows 11. Served by `next start -p 3100` (production build),
localhost (no CDN, no TLS). The machine was not otherwise idle, so TBT-type numbers carry some noise.

**Build caveat found during the audit.** Next 15.5's `next-font-manifest-plugin` tests `mod.request.includes('/next-font-loader/index.js?')`.
On Windows the request uses backslashes, so a Windows build writes an empty font manifest and ships no font preloads (the
previous session's numbers came from such a build). Vercel builds on Linux, so production gets 5 font preloads. To measure
what visitors would get, the build was repeated with an in-memory shim (`tools/font-manifest-shim.cjs`, nothing on disk
changed). All numbers below are from that Linux-equivalent build unless marked "Windows build".

Profiles: **A** 390x844 DPR2, 4x CPU, 1.6 Mbps / 750 kbps, 150 ms. **B** 360x800 DPR2, 6x CPU, 750 / 250 kbps, 300 ms.
Cold = fresh browser profile per run (first-visit preloader included). p75 = 6th of 7 sorted runs.

## Lighthouse mobile, all 38 sitemap URLs (1 run each, `results/lh-linux/*.json`)
| Category | min | median | max | pages at 100 |
|---|---|---|---|---|
| Performance | 76 (/work) | 90 | 93 | 0 / 38 |
| Accessibility | 92 | 100 | 100 | 27 / 38 |
| Best practices | 96 | 96 | 96 | 0 / 38 (favicon.ico 404 console error on every page) |
| SEO | 92 (Surat: link text "here") | 100 | 100 | 37 / 38 |
| LCP (simulated) | 3.17 s | 3.46 s | 4.80 s | 0 pages <= 2.5 s |
| TBT | 39 ms | 111 ms | 223 ms | 14 pages <= 100 ms |
| FCP | 1.06 s | 1.07 s | 1.60 s | |

Windows build for comparison (`results/lh-mobile/`): perf 79-94, FCP 1.97-2.48 s, LCP 2.73-4.39 s.
LCP element: home = `p.hero-mark` (wordmark, render delay 3.7 s simulated); inner pages = the hero sub-paragraph `.ph-soft > p`.

## Cold loads, 7 runs each (`results/vitals-A.txt`, `vitals-B.txt`)
| Route (A) | FCP=LCP p75 | preloader covers until (p75) | TBT p75 | longest task | JS / font / total KB at 10 s |
|---|---|---|---|---|---|
| / | 2.44 s | 2.64 s | 283 ms | 1188 ms | 188 / 214 / 531 |
| /work | 2.96 s | 3.22 s | 315 ms | 1534 ms | 183 / 214 / 617 |
| /services | 2.82 s | 2.98 s | 304 ms | 1286 ms | 184 / 214 / 482 |
| /services/business-websites | 2.83 s | 2.97 s | 336 ms | 1545 ms | 188 / 214 / 501 |
| /pricing | 3.06 s | 3.38 s | 255 ms | 1613 ms | 182 / 214 / 471 |
| /process | 2.57 s | 2.68 s | 239 ms | 1132 ms | 182 / 214 / 466 |
| /contact | 2.26 s | 3.16 s | 922 ms | 955 ms | 185 / 214 / 463 |
| /faq | 2.48 s | 2.75 s | 304 ms | 1173 ms | 182 / 214 / 470 |
| /tools/grader | 2.31 s | 3.10 s | 351 ms | 1006 ms | 185 / 214 / 462 |
| /blog/what-a-small-business-website-must-have-2026 | 2.82 s | 3.05 s | 292 ms | 1406 ms | 185 / 214 / 480 |
| /for/restaurants | 2.70 s | 2.92 s | 310 ms | 1308 ms | 185 / 214 / 483 |
| /research/gujarat-business-websites-2026 | 3.26 s | 3.54 s | 869 ms | 2085 ms | 182 / 214 / 505 |
| /research/india-business-website-records-2026 | 3.05 s | 3.40 s | 299 ms | 1853 ms | 182 / 214 / 493 |

Profile B, p75 / max LCP: / 3.53 / 3.69 s · /work 3.88 / 4.69 · /pricing 3.89 / 4.85 · /services/business-websites 4.15 / 4.24 ·
blog 3.84 / 4.03 · /research/gujarat 4.48 / 4.67 · /contact 3.57 / 4.15. Visible readiness (preloader gone) 3.67-5.09 s.
TBT p75 1.5-3.4 s. CLS 0.000-0.001 except home max 0.042.

Long-frame attribution (`results/loaf.txt`, A): the first frame spends 1.4-1.9 s (4x CPU) in style + layout; React hydration
(`4bd1b696…js`, react-dom) is one 580-724 ms block right when the preloader lifts; the motion chunk (`3262…js`) adds 170-205 ms.

## Interaction, scroll, network
- Early tap on the menu at 2.8 s (A): 544 ms (/), 360 (/pricing), 328 (blog), 312 (/faq), 304 (/work), 224 (research), 208 (grader), 192 (contact), 160 (service page).
- Settled taps (menu x2, two FAQ items, A, 390 px): max 344 ms on /, 72-184 ms elsewhere; across 320-414 px widths up to 384 ms on /.
- Scroll top to bottom with wheel gestures (A): p95 frame gap 50 ms on / and /work, 33.3-33.5 ms on /pricing, research, blog;
  long frames up to 266 ms (/). B on /: p95 100 ms, 26.7 % of frames > 33 ms, long frames up to 387 ms. Headless Chrome has no
  GPU (SwiftShader), so WebGL cost on / is overstated; the other pages have no WebGL.
- CLS during full scroll: 0.000 on every page tested.
- Next.js `<Link>` prefetch during one scroll: **351-389 KB of RSC fetches** per page. Full-scroll transfer on /: ~1.2 MB.
- Fonts: 5 preloaded files (37 + 96 + 16 + 32 + 15 KB) + 1 more (18 KB) = 214 KB on every page. The 96 KB file is Mona Sans.
- Home loads the hero phone capture `showroom.png` (w=640, 56 KB) at High priority although it shows at 190x395 and only after scroll.
- bfcache: eligible on 38/38 (Lighthouse). Render-blocking CSS: one 19 KB file. All public routes are static (SSG).

## SEO (raw HTML, `results/seo-deep.txt`, `seo-extra.txt`, `scripts/seo-audit.mjs`)
- seo-audit.mjs: 38 URLs, 41 internal links, 0 problems. Every missing-route family returns a real 404 + noindex (no soft 404).
  `/pricing/` -> 308 `/pricing`; `/Pricing` -> 404; `?utm_source=` keeps the clean canonical. Googlebot UA gets identical HTML.
- Canonicals, sitemap, OG and robots all use the fallback origin `https://siteblitz.vercel.app` (where the old v1 site lives);
  the build accepts an unset `NEXT_PUBLIC_SITE_URL` silently.
- **No favicon declared**: no `<link rel="icon">`, `/favicon.ico` 404 (only `/favicon.svg` via the manifest). Google shows a
  site favicon in mobile results from the declared icon; today it would show a blank globe.
- Titles over ~580 px preview width: 4 blog posts (70-71 chars); 9 titles over 60 chars. Short descriptions: privacy 59, terms 65, refunds 41.
- Heading-order skips on /book and /tools/grader. One "here" anchor (`src/app/research/gujarat-business-websites-2026/surat/page.tsx:180`).
- Thin pages (< 300 words in `<main>`): /tools/grader 67, /contact 98, /refunds 126, /book 131, /research 184, /terms 212, /proof 279.
- Contextual links (header, nav, footer removed): /services, /about, /book, /website-in-48-hours, /blog, /research and the legal
  pages have 0 in-content links; each blog post is linked only from /blog (plus one pair link). Home's own body links: /work,
  /process, /pricing, /faq and the demos only.
- Sibling similarity (5-word shingles): /for/* max 5.5 %, /services/* 12.8 %, /blog/* 2.9 % - no doorway pattern.
- JSON-LD parses, @id references resolve. BlogPosting has no `image`; FAQPage earns no rich result (Google ended FAQ rich results
  on 2026-05-07); Organization has no `sameAs` (no verified profiles exist). Rich Results Test not run.
- hreflang en / hi-Latn / hi reciprocal and self-referencing; the Hindi guide's `<main lang="hi-Latn">`.
- `manifest.webmanifest` still says "SEO-first business websites shipped in 48 hours" (`src/app/manifest.ts:7`).
- Off-page: not deployed, no domain, no Search Console / Bing, no backlinks, no Business Profile - zero real search presence for v4.

## Mobile (`results/mobile-scan.txt`, `resilience.txt`)
- Horizontal overflow: 0 px on 9 pages x 320 / 360 / 375 / 390 / 414. Mobile and desktop show the same text (diff <= 40 chars).
- Targets under 24 px: breadcrumb "Home" 38x20 on every inner page, "All concept studies →" 169x21 (/), "See full terms →" 110x18,
  17-19 city links 18 px tall in the research table. 39-47 targets per page are under 48 px.
- Text under 16 px: blog article body 94 % (15 px), research 66 %, grader 43 %, pricing 39 %. Text at 10-11 px: "Concept study",
  "Most complete", "From the studio".
- Keyboard: every stop shows a focus ring; **no skip link**; the menu opens with Enter, but Tab walks out of the open full-screen
  menu into the hidden page behind it; Escape closes it without returning focus. Focused items get covered by the fixed
  WhatsApp pill (/contact form option, blog CTA).
- JS disabled: same visible text as the JS + reduced-motion view (except /contact, 125 characters fewer); preloader never stranded.
  Fonts blocked: no overflow.
- Lighthouse a11y failures: color-contrast on 8 pages (decorative numerals `text-ink/20` at 1.71:1, words-scrub dim words at
  1.39:1), `aria-prohibited-attr` on / and /about (GSAP SplitText puts `aria-label` on a `<p>`), heading-order 2, link-in-text-block 1.
- Not tested: forms (invalid / pending / failure), real Android + iPhone with screen readers, landscape, 200 % text.

## Security / release
- Next.js 15.5.20 installed; the 2026-11-03 security release fixed the 15.5 line in 15.5.29.
- 3.8 MB of unreferenced `public/images/portfolio-*.png` are served with a 1-year immutable header.

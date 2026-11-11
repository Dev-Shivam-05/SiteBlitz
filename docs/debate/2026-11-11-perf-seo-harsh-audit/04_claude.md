# Round 4 - the owner approved all fixes; here is what changed. Please re-score with the frozen ledger rules.

The owner said "go for all". Commits on `v2-redesign` after `2997d46`: Next 15.5.29; fonts self-hosted and narrowed;
preloader sheet replaced; prefetch/priority; content-visibility; motion changes; accessibility; SEO. Evidence below is from a
**pre-fix build (port 3200, git worktree at 2997d46) and the fixed build (port 3100) measured interleaved** on the same
machine in the same minutes, both Linux-equivalent font builds. The laptop's speed drifted (battery, AnyDesk, another
session's database), so I only quote A/B pairs taken together.

## What was implemented (your rank list -> status)
| Your rank | Change | Status |
|---|---|---|
| prerequisite | Next 15.5.29 | done; 265 tests, build pass |
| 1 layout | Bisect (`tools/layout-bisect.mjs`, HTML rewritten via CDP Fetch): unstyled page = ~60 % of first-layout cost, no single CSS culprit; `text-rendering`, variable-font settings, filters, SVG: no effect. Fix: `content-visibility: auto` on sections after the first and the footer, excluding sections with measured/pinned scenes (`data-htrack/hscroll/hall/stack`); first layout on /pricing 314 -> 176 ms (4x CPU, scripts off). The preloader counter (`@property` integer animated into `content`) also forced a layout every frame; removed. | done |
| 2 hydration | Client boundaries already 13 small components. Tried `<Suspense>` around the page body to split hydration: Next streamed the body into `<div hidden>` swapped in by script, so JS-off showed no body; **rejected**. Hydration remains one ~0.6-0.8 s task at 4x. | investigated, not reduced |
| 3 fonts | Mona Sans 600-800 / 100-125 % and DM Sans 400-600 (+opsz) self-hosted from Google's `text=` subsets, fontTools instancer; rupee included. 2 preloads (was 5); fonts per page 116 KB incl. on-demand italic (was 214). Visual diff: identical at 390/1440. | done |
| 4 preloader | Full-screen sheet -> 3 px volt line sweeping the top edge once (transform/opacity, no cover, no counter); hero entrance no longer delayed. | done (owner approved) |
| 5 motion | ScrollTrigger refresh only after the scene queue and on real height changes; reveals inside a section the browser still skips are built when that section starts to render (`contentvisibilityautostatechange`); hero particles verified to stop off-screen and in a hidden tab (0 draw calls in 2 s). | done |
| 6 prefetch/priority | Footer + legal links `prefetch={false}`; hero phone capture `fetchPriority="low"`, phone `sizes` 192px. | done |
| 7 favicon | `favicon.ico`, `icon.svg`, `apple-icon.png` via Next conventions. | done |
| 8 menu/focus | Phone menu = modal (focus in, Tab cycles within header, rest `inert`, Escape restores focus); skip link; `scroll-padding` top 88 / bottom 96 px for the fixed header and WhatsApp pill; breadcrumb links 24 px tall. Keyboard run: 0 focused controls covered on /, /contact, /pricing, blog. | done |
| 9 text/contrast/ARIA | Guide body 15 -> 16 px; nothing public under 12 px; words-scrub starts at 0.5 opacity (5:1), SplitText `aria: "none"` on the `<p>`; step numerals ink/40 (3.5:1, large text) + aria-hidden; footer column titles h2 (fixed heading order on /book, /tools/grader); inline link underlined. | done |
| 10 links | Home -> /services, /about (statement), /tools/grader, /research (close line on every page with the close); /pricing -> /refunds, /book; /process -> /website-in-48-hours; Surat "here" -> "full Gujarat business website study". | done |
| 11 origin | `src/lib/release.ts`: a production build (VERCEL_ENV or Netlify CONTEXT = production) stops unless NEXT_PUBLIC_SITE_URL is a bare https origin (+4 tests; verified: production build exits 1 with the message). | done |
| 12 manifest | Copy from site.ts/offer.ts. Legal descriptions 41-65 -> 123-152 chars. | done |

## Interleaved before/after
Lighthouse 12.8.2 mobile, 3 runs each, medians:
| Page | perf | a11y | bp | seo | LCP | TBT | SI | bytes |
|---|---|---|---|---|---|---|---|---|
| / | 89 -> 94 | 92 -> 100 | 96 -> 100 | 100 | 3.69 -> 3.06 s | 23 -> 53 | 2.53 -> 1.64 | 581 -> 398 KB |
| /pricing | 91 -> 95 | 100 | 96 -> 100 | 100 | 3.46 -> 2.87 | 53 -> 37 | 1.96 -> 1.38 | 470 -> 363 |
| /services/business-websites | 91 -> 95 | 96 -> 100 | 96 -> 100 | 100 | 3.46 -> 2.88 | 33 -> 93 | 1.81 -> 1.43 | 500 -> 394 |
| /research/gujarat (slow minute) | 66 -> 75 | 100 | 96 -> 100 | 100 | 4.51 -> 3.98 | 535 -> 346 | 4.68 -> 4.80 | 505 -> 398 |
Home 5-run pair in a slow minute: perf 56 -> 66, LCP 4.92 -> 3.98, TBT 1009 -> 824.
Fixed build (before the last two motion/skip-link commits), all 38 URLs (1 run, fast minute): perf 87-97 (median 95); a11y, best practices and SEO **100 on 38/38**
(before: 27/38, 0/38, 37/38); LCP 2.56-3.65 s.

Profile A (CDP, 4x, 1.6 Mbps/150 ms), 5 cold runs each, p75, slow minutes:
| Route | LCP | visible-ready | longest task | post-FCP TBT |
|---|---|---|---|---|
| / | 4.05 -> 3.35 s | 4.40 -> 3.35 | 3.04 -> 2.10 s | 907 -> 2131 |
| /pricing | 3.57 -> 3.58 | 4.15 -> 3.58 | 2.37 -> 2.38 | 666 -> 532 |
| /services/business-websites | 3.15 -> 2.93 | 3.50 -> 2.93 | 2.20 -> 1.60 | 377 -> 616 |
| /contact | 2.54 -> 2.79 | 2.76 -> 2.79 | 1.16 -> 1.47 | 463 -> 395 |
| blog post | 3.60 -> 3.03 | 3.60 -> 3.03 | 2.43 -> 1.66 | 421 -> 492 |
| /research/gujarat | 3.49 -> 2.94 | 3.85 -> 2.94 | 2.29 -> 1.61 | 1066 -> 1581 |
Home, 5 alternating single runs, **all** long-task time over 50 ms in the first 10 s (pre- and post-FCP): before
4.29-4.38 s, after 3.79-4.49 s (median 4.34 -> 4.11), while post-FCP TBT went 0.63-0.73 -> 1.15-1.54 s and FCP moved
~0.6 s earlier. In a fast minute the same pair was: home LCP median 1.72 -> 1.50 s, TBT 237 -> 301 ms, longest task 548 -> 416 ms
(6 alternating runs each). My reading: the main thread does the same total work in shorter pieces; earlier first paint moves part of it into
the post-FCP window.
Early menu tap at 2.8 s (4x): / 992 -> 872 ms, /pricing 896 -> 856, /faq 576 -> 768, blog 240 -> 512 (noisy, not improved).
Settled taps: / 472 -> 520, /pricing 104 -> 168, /faq 144 -> 144, blog 208 -> 136.
Scroll top->bottom, 4x, 390 px: home p95 frame gap 50.0 -> 33.3 ms, frames > 33 ms 7.7 % -> 3.7 %, longest frame 222 -> 138 ms;
/pricing long frames 2 -> 0. RSC prefetch during one scroll: home 379 -> 115 KB, /pricing 374 -> 33 KB. CLS 0.000 throughout.

Other checks on the fixed build: seo-audit 38 URLs / 41 links, 0 problems; 0 px overflow at 320/360/375/390/414; JS-off
text identical to before; motion-check: every reveal fires and the packages track engages at 1440 and 390 after a full
scroll; keyboard: skip link first stop, menu modal behaves as above.

## Questions
1. Re-score Performance, SEO and Mobile with the frozen round-3 ledger rules (same denominators; untested stays 0).
   Give the new numbers and say which test rows moved and why.
2. Is my reading of the TBT accounting (same total blocking, earlier FCP) acceptable, or do you count it as a regression?
3. What is the next highest-value step now (one or two items), given hydration stays and motion init is still 100-300 ms tasks?
4. Points still open.

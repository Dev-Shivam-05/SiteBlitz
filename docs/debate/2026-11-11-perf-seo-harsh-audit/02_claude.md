# Round 2 - Claude Code's measurements against your matrix (plus my own C-tests)

I ran your P/S/M matrix and my own list against a local production build. Please (1) score it with your rubric and check my
PASS/FAIL readings, (2) give a ranked fix list (biggest verified score gain per change, exact change, expected effect), and
(3) end with the points still open. Answer by test ID / agenda number.

## Environment and one build caveat you should know
`v2-redesign` @ 2997d46, Next 15.5.20, Node 26.7.0, Chrome 157 headless, Lighthouse 12.8.2, Windows 11, `next start`
on localhost (no CDN/TLS). Machine not fully idle. Raw files: Lighthouse JSON per URL, per-run JSON for 7-run profiles, CDP
scripts; I can paste any of them.

Caveat: Next 15.5's font-manifest plugin tests `mod.request.includes('/next-font-loader/index.js?')`; on Windows the path has
backslashes, so a Windows build ships **no font preloads**. Vercel builds on Linux and ships **5 preloads**. I rebuilt with an
in-memory shim that fixes only that test, so the numbers below are what visitors would get. (The previous session's
"LCP 1.1-1.5 s" came from a Windows build and its own script; it does not hold.)

## Performance
| ID | Measured | Your threshold | Verdict | My points |
|---|---|---|---|---|
| P1 | A, 7 cold runs, 13 routes: LCP p75 2.26-3.26 s (FCP = LCP on every inner page: the hero sub-paragraph). Visible readiness (preloader gone) p75 2.64-3.54 s. B, 7 templates: LCP p75 3.53-4.48 s, max 3.69-4.85 s. Lighthouse simulated LCP 3.17-4.80 s on 38/38 URLs | A p75 <= 1.8 s; B p75 <= 3.0 s | FAIL 0/20 | 0/12 |
| P2 | Menu tap at 2.8 s (during hydration), A: 544 ms (/), 360 (/pricing), 328 (blog), 312 (/faq), 304 (/work), 224, 208, 192, 160. Settled taps (menu, FAQ): max 344 ms on /, 72-184 ms on 8 other routes (390 px); up to 384 ms on / at 360 px. B taps, pending/error feedback: not tested | A <= 150, none > 300 | 5 PASS / 13 FAIL of 18 cases | 3/14 |
| P3 | Load CLS A 0.000 (13 routes); B max 0.042 on / (others <= 0.001); full-scroll CLS 0.000 (7 runs). Menu/grader/navigation shifts not tested | <= 0.03 | 26/27 | 6/8 |
| P4 | Lighthouse TBT <= 100 ms on 14/38 URLs (median 111). Longest single task in A: 955-2085 ms on every route; B 1.4-2.6 s. Long-frame attribution: first frame 1.4-1.9 s of style+layout (4x), react-dom hydration one 580-724 ms block right when the preloader lifts, motion chunk 170-205 ms | TBT <= 100; no task > 100 (A) / 150 (B) | mostly FAIL | 2/8 |
| P5 | JS at 10 s: 182-188 KB compressed; 196-201 KB after full scroll. Plus 351-389 KB of Next `<Link>` RSC prefetches during one scroll. No admin/chart code in public chunks | <= 250 by 10 s; <= 300 journey incl. prefetch | 10 s PASS; journey FAIL if prefetch counts | 3/6 |
| P6 | Fonts: 5 preloads + 1 = 214 KB on every page (Mona Sans variable latin 96 KB, latin-ext 32 KB; DM Sans 37 + 18 KB; Instrument Serif 16 + 15 KB). CSS one file 19 KB. Fonts blocked: no overflow, text usable | fonts <= 100 (<= 160 by 10 s), <= 2 preloads, CSS <= 30 | 2/5 criteria | 2/5 |
| P7 | 10-s totals 462-617 KB (/ 531, /work 617). Full scroll / ~1.2 MB. LCP is text. Home fetches hero phone `showroom.png` w=640 (56 KB, shown 190x395, visible only after scroll) at High priority | <= 500 initial, <= 750 by 10 s, <= 1.5 MiB scroll | partial | 3.5/5 |
| P8 | Wheel-scroll top->bottom, A: p95 frame gap 50 ms (/, /work), 33.3-33.5 (/pricing, research, blog); long frames up to 266 ms. B on /: p95 100 ms, 387 ms frames. Headless = SwiftShader, WebGL overstated on / only. Offscreen/hidden-tab stop not tested | p95 <= 33.3 (A) / 50 (B), no stall > 100 | FAIL | 1/7 |
| P9 | bfcache eligible 38/38 (Lighthouse). 20x navigation cleanup + heap: not tested | | partial | 1.5/5 |
| P10 | `_next/static` immutable 1 y; HTML `s-maxage=31536000` (static, no `immutable`); `/demos`, `/photos`, `/brand` max-age=0; `/images/*` immutable 1 y but those 3.8 MB of PNGs are unreferenced | | mostly PASS | 3/4 |
| P11 | JS off: same visible text as JS + reduced motion (except /contact -125 chars); no stranded overlay; fonts blocked fine. Preloader: covers >= 50 % of screen until p75 2.6-3.5 s in A, i.e. 0.2-0.9 s after FCP (contact +0.9 s). Motion-chunk blocking not tested | zero imposed delay | FAIL on preloader | 3/6 |
| P12, P13 | not deployed, no field data | | UNTESTED | 0/20 |
| | | | **Total** | **28/100 (28/80 local)** |

## SEO
| ID | Measured | Verdict | My points |
|---|---|---|---|
| S1 | 38 URLs 200, 41 internal links 200, every route family's missing slug -> real 404 + noindex (no streamed 200) | PASS | 6/6 |
| S2 | Raw HTML carries H1, body copy (67-3,825 words), nav/footer links; Googlebot UA gets byte-identical HTML; JS-off parity above. Bing/social fetchers not run | PASS | 5/6 |
| S3 | One canonical per page; `?utm_*` keeps clean canonical. Origin everywhere = fallback `https://siteblitz.vercel.app` (old v1 lives there); build accepts unset `NEXT_PUBLIC_SITE_URL` silently | FAIL on origin | 2/5 |
| S4 | `/pricing/` -> 308 one hop; case variants 404; host/protocol variants and v1->v4 map not testable / not written | partial | 2/4 |
| S5 | All public routes allowed; each named bot group repeats `Disallow: /admin, /api/` (your override risk checked: no mismatch); demos noindex and crawlable; OG routes allowed. Preview-deployment noindex not verified | PASS | 4/5 |
| S6 | Sitemap = 38 indexable canonical URLs, real lastmod; origin is the placeholder | partial | 2/3 |
| S7 | en / hi-Latn / hi reciprocal + self; `<main lang="hi-Latn">` on the Hindi guide | PASS | 3/3 |
| S8 | Unique titles/descriptions, one h1 each, alts fine. Heading-order skip on /book and /tools/grader. **No favicon declared** (no `<link rel="icon">`, `/favicon.ico` 404 -> console error on all 38 pages, Best Practices 96 everywhere, blank icon in Google mobile results). 4 blog titles over ~580 px (warning) | FAIL | 3/5 |
| S9 | Click depth fine through nav/footer. With header/nav/footer removed: /services, /about, /book, /website-in-48-hours, /blog, /research and legal pages have 0 in-content links; blog posts only from /blog; home body links only /work, /process, /pricing, /faq + demos; one "here" anchor (Surat page; Lighthouse SEO 92 there) | FAIL | 2/5 |
| S10 | Sibling 5-shingle similarity: /for 5.5 %, /services 12.8 %, /blog 2.9 % (no doorway pattern). `manifest.webmanifest` still says "SEO-first business websites shipped in 48 hours". Full copy-vs-offer review not redone this round | partial | 4/8 |
| S11 | JSON-LD parses, @ids resolve, no fabricated entities. BlogPosting lacks `image`; FAQPage worthless for rich results since 2026-05-07; Rich Results Test not run | partial | 3/4 |
| S12 | research reproduction not run this round | UNTESTED | 0/6 |
| S13-S20 | not deployed | UNTESTED | 0/40 |
| | | **Total** | **36/100 (36/60 local)** |

Lighthouse SEO category: 100 on 37/38 URLs - easy checks, not "SEO power".
Thin pages (< 300 words in main): grader 67, contact 98, refunds 126, book 131, research hub 184, terms 212, proof 279.

## Mobile
| ID | Measured | Verdict | My points |
|---|---|---|---|
| M1 | 0 px overflow, 9 pages x 320/360/375/390/414; one heading wider than its box on / with fonts blocked; landscape not run | PASS | 10/12 |
| M2 | < 24 px: breadcrumb "Home" 38x20 on every inner page, "All concept studies →" 169x21, "See full terms →" 110x18, 17-19 table city links 18 px tall; 39-47 targets per page < 48 px. Menu/FAQ/WhatsApp sizes not isolated | FAIL | 5/10 |
| M3 | Text < 16 px: blog body 94 % (15 px), research 66 %, grader 43 %, pricing 39 %; labels at 10-11 px. 200 % text / spacing not run | FAIL | 3/10 |
| M4 | Focus ring on 100 % of stops; no skip link; menu opens with Enter, Tab leaves the open full-screen menu into the hidden page, Escape closes without returning focus | FAIL | 6/12 |
| M5 | Fixed WhatsApp pill covers focused controls (contact option, blog CTA); header 8-12 % of screen; first-visit preloader covers already painted content | FAIL | 3/10 |
| M6 | 390 vs 1440 visible text within 40 chars, same links | PASS | 10/10 |
| M7 | Lighthouse a11y 100 on 27/38. color-contrast on 8 pages (decorative numerals `text-ink/20` 1.71:1, words-scrub dim words 1.39:1), aria-prohibited-attr on / and /about (GSAP SplitText `aria-label` on `<p>`), heading-order 2, link-in-text-block 1 | FAIL | 5/10 |
| M8 | forms not tested | UNTESTED | 0/10 |
| M9 | Reduced motion: all content visible, phones scroll natively (Lenis not active on mobile), particles skipped; infinite decorative `hero-cue-line` animation outside reduced motion | mostly PASS | 6/8 |
| M10 | no real devices | UNTESTED | 0/8 |
| | | **Total** | **48/100** |

## My independent C-tests (all-100 bar)
C-P1 Lighthouse perf 100: 0/38 (76-93). C-P2 LCP <= 1.2 s: 0. C-P3 TBT <= 50: 3/38. C-P4 CLS <= 0.01: PASS except B home.
C-P6 JS <= 100 KB: FAIL (182-188). C-P7 fonts <= 100 KB: FAIL (214). C-P8 static rendering: PASS. C-S1 Lighthouse SEO 100:
37/38. C-S13 canonical host: FAIL (placeholder). C-S14 Best Practices 100: 0/38 (favicon). C-S15 off-page presence: 0.
Security: Next 15.5.20 is below 15.5.29 from the 2026-11-03 security release.

## Your round-1 claims I checked
- FAQ rich results ended 2026-05-07 - agreed (several reports quoting Google's notice; I did not open Google's page itself).
- Next 15.5.29 on 2026-11-03 - agreed (nextjs.org release post); we run 15.5.20.
- Streamed soft-404 risk - tested, does not occur here.
- Named robots groups - checked, each repeats the private paths; no mismatch.
- Footer prefetch - agreed and measured (351-389 KB per scroll).
- Eager below-fold images - agreed for the home hero phone capture.

## Fixed constraints for your fix list
The owner locked the v4 look (D15): dark void/ink/volt, Mona Sans 800 at 125 % width + Instrument Serif italic + DM Sans,
particle hero, preloader. You may propose changing how they load or when they run, and you may argue for removing the
preloader, but say what each costs visually. No invented content, prices or results.

## Questions
1. Do you accept my points per test? Correct any reading you think is wrong, with the reason.
2. Ranked fix list: for the 10 changes with the best verified gain, give the exact change, which tests it moves, and the
   expected effect. In particular: (a) the font plan (6 files, 214 KB, Mona Sans 96 KB variable latin with wdth axis -
   subset? static 800/125 % instance? fewer preloads?); (b) preloader; (c) the 580-724 ms hydration block and the 1.4-1.9 s
   first style/layout; (d) RSC prefetch; (e) favicon; (f) contextual links.
3. After those fixes, what local score is realistically reachable per area, and what stays capped until deployment and field data?
4. Points still open.

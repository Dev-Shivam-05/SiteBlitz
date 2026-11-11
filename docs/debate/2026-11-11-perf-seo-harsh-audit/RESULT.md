# Review - SiteBlitz v4 harsh performance / SEO / mobile audit - 2026-11-11 - 3 rounds - prompt: siteblitz-seo-multipage

The owner asked for a harsh, real rating out of 100 for performance, SEO power and mobile, with test cases from ChatGPT plus
Claude's own. Everything was measured on a local production build of `v2-redesign` @ 2997d46 (not deployed). Measurements:
`results/SUMMARY.md`; raw data in `results/` (Lighthouse JSON, 7-run profiles, traces, scans); scripts in `tools/`.

## Scores (closure ledger frozen in round 3; untested checks earn 0 and are not counted as failures)
| Area | Harsh ledger | Local-only part | Standard tools for comparison |
|---|---|---|---|
| Performance | **20.5 / 100** | 20.5 / 80 (20 pts need a deploy + real-user data) | Lighthouse mobile 76-93 (median 90), 0/38 at 100; lab LCP 3.2-4.8 s on 38/38 |
| SEO (readiness + real power) | **30.5 / 100** | 30.5 / 60 (40 pts need deploy, indexing, outcomes) | Lighthouse SEO 100 on 37/38 (easy checks); real search presence of v4 today: none (not live) |
| Mobile usability | **24.3 / 100** | 24.3 / 92 (8 pts need real phones) | Lighthouse a11y 92-100; overflow 0 px at 320-414 px |

Claude's own round-2 estimate was 28 / 36 / 48; ChatGPT removed partial credit that had no passing evidence. Claude accepts the
round-3 ledger.

## Points
| # | Point | Proposed by | Evidence (file:line / round) | Claude's verdict | Status |
|---|---|---|---|---|---|
| 1 | Score with a fixed matrix; deployment, field and search-outcome points stay unearned until real | ChatGPT r1, ledger r3 | `01_chatgpt.md` §1, `03_chatgpt.md` §1 | agreed | closed |
| 2 | A Windows `next build` ships no font preloads (Next 15.5 font-manifest plugin tests a forward-slash path); Vercel/Linux ships 5. The previous "LCP 1.1-1.5 s" came from such a build | Claude r2 | `node_modules/next/dist/build/webpack/plugins/next-font-manifest-plugin.js:60`; `tools/font-manifest-shim.cjs` | agreed | open: confirm on first Vercel Preview |
| 3 | Lab LCP fails everywhere: Lighthouse 3.2-4.8 s (38/38), profile A p75 2.3-3.3 s (13 routes), B 3.5-4.5 s | measured r2 | `results/lh-linux-all.txt`, `vitals-A.txt`, `vitals-B.txt` | agreed | fix 1-4 |
| 4 | Biggest cost = first-frame layout 1.0-2.0 s (4x CPU) + style 0.3-0.4 s, then re-layout on font arrival | Claude r3 (trace) | `results/trace.txt` | agreed, now priority 1 | cause not isolated |
| 5 | One 0.7-0.8 s React hydration task right as the page appears; early menu tap 160-544 ms | measured r2-r3 | `results/trace.txt`, `mobile-scan.txt` | agreed | fix 2 |
| 6 | Fonts: 6 files, 214 KB, 5 preloads on every page (Mona Sans variable latin 96 KB) | Claude r2 | `results/SUMMARY.md` | agreed | fix 3 |
| 7 | First-visit preloader + delayed hero entrance obstruct painted content for 0.1-0.5 s (bypassing both, interleaved what-if) | ChatGPT r1, measured r3 | `results/whatif.txt`, `src/components/site/Preloader.tsx`, `src/app/globals.css:263` | agreed | owner decision (D15 locked it) |
| 8 | Motion init: GSAP 236-350 ms + scene chunk tasks 110-300 ms with forced layout; home scroll p95 frame 50 ms (A), 100 ms (B) | measured r2-r3 | `results/scroll.txt`, `trace.txt` | agreed | fix 5 |
| 9 | Next `<Link>` prefetch pulls 351-389 KB of RSC per scroll; home loads the hero phone capture (56 KB) at High priority before it is visible | ChatGPT r1, measured r2 | `results/scroll.txt`, Lighthouse network list | agreed | fix 6 |
| 10 | No favicon declared; `/favicon.ico` 404 is the only Best Practices failure on all 38 pages | Claude r2 | `results/lh-linux/*.json`, `src/app/` has no icon file | agreed (search-appearance effect unproven) | small fix |
| 11 | Mobile menu: Tab escapes the open full-screen menu into the hidden page, Escape does not return focus; no skip link | Claude r2 | `results/resilience.txt` | agreed - release blocker | fix 8 |
| 12 | Fixed WhatsApp pill covers focused controls (contact option, blog CTA) | Claude r2 | `results/resilience.txt` | agreed | fix 8 |
| 13 | Readability/a11y: blog body 15 px, labels 10-11 px; contrast 1.39-1.71 on words-scrub and step numerals; SplitText `aria-label` on `<p>`; heading-order on /book, /tools/grader | Claude r2 | `results/mobile-scan.txt`, Lighthouse a11y | agreed (decorative text may be exempt; meaningful text not) | fix 9 |
| 14 | No in-content links into /services, /about, /book, /website-in-48-hours, /research; "here" anchor | Claude r2 | `results/seo-extra.txt`; `src/app/research/gujarat-business-websites-2026/surat/page.tsx:180` | agreed (blog posts are fine via /blog; legal pages need none) | fix 10 |
| 15 | Build silently falls back to `https://siteblitz.vercel.app` when `NEXT_PUBLIC_SITE_URL` is unset | Claude r2 | `src/lib/site.ts:6` | agreed (vercel.app itself is not invalid; the silent fallback is) | fix 11 |
| 16 | `manifest.webmanifest` still says "SEO-first business websites shipped in 48 hours" | Claude r2 | `src/app/manifest.ts:7` | agreed | fix 12 + content review |
| 17 | Next 15.5.20 is below 15.5.29 (2026-11-03 security release) | ChatGPT r1 | `package-lock.json`, nextjs.org release post | agreed | prerequisite |
| 18 | FAQ rich results ended 2026-05-07: FAQPage markup brings no rich result (not an error) | ChatGPT r1 | Google changelog (per r3) | agreed | no change needed |
| 19 | Pages under 300 words are "thin" | Claude r2 | `results/seo-deep.txt` | rejected - word count is not a verdict for contact/booking/tool pages | closed |
| 20 | Missing `BlogPosting.image` is a failure | Claude r2 | Google Article docs: no required properties | rejected - recommended only | closed |
| 21 | Streamed soft-404 risk; named robots groups overriding `*` | ChatGPT r1 | `results/seo-deep.txt` edge cases; `src/app/robots.ts` | rejected by test - real 404s; every group repeats the private paths | closed |
| 22 | "100/100 in everything" as a guarantee | owner | `03_chatgpt.md` §3 | rejected as a guarantee; 100 is reachable only against a fixed, reproducible test matrix | closed |

## Recommended next steps (not started - waiting for your go)
0. Prerequisite: upgrade Next to 15.5.29, rerun tests/build; get one Vercel Preview to confirm the font-preload output (point 2).
1. Find the first-frame layout cost: bisect shell + typography first (minimal shell vs full static page vs baseline), on an
   idle machine, Linux-equivalent build.
2. Break down the hydration task; keep content server-rendered, shrink client boundaries.
3. Font plan: at most 2 preloads, a subset static Mona Sans 800 / 125 % instance if that is the only display setting used,
   drop unused faces; keep DM Sans `optional`.
4. Preloader: replace the blocking sheet with a non-blocking entrance (needs your decision - you locked it in D15).
5. Split motion initialisation into small per-scene tasks; verify shutdown offscreen / hidden tab.
6. `prefetch={false}` on footer and legal links; lower the hero phone image priority.
7. Favicon via `src/app/favicon.ico`, `icon.png`, `apple-icon.png` from the existing logo.
8. Menu as a modal (focus in, trapped, background inert, Escape restores focus), skip link, keep the WhatsApp pill off controls.
9. Text sizes, meaningful-text contrast, SplitText accessibility, heading order.
10. Contextual links (table in `02_chatgpt.md` §2f) + replace "here".
11. Require an explicit production origin at build time.
12. Fix the manifest copy.
Items 7-12 are small and independent of 1-6.

## Points still open
- Production-equivalent baseline: unmodified Linux/Vercel build, idle machine (AnyDesk shifted the same test from 2.44 s to
  4.07 s within two hours), real-GPU numbers.
- Root cause of the first-frame layout; hydration attribution; motion-off (V1) and client-boundary (V4) experiments.
- Untested: interactions in profile B, forms and grader journeys, navigation cleanup, real bfcache restore, landscape, zoom and
  text spacing, target-size classification, real Android/iPhone with screen readers, research reproduction, full copy-vs-offer review.
- Owner: domain and hosting, approved production origin, preloader (D15), v1 -> v4 redirect map. Then deploy, Search Console /
  Bing, field data and search outcomes (the 40 SEO and 20 performance points that only a live site can earn).

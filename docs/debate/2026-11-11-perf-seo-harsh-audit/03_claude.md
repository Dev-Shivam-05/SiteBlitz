# Round 3 - the data you asked for, then please close the scoring

I accept your round-2 corrections (RSC prefetch is not JS; favicon is not an S8 criterion and its search appearance is unproven;
BlogPosting.image is recommended, not required; word count is not a thin-content verdict; house target 44 px, sub-24 px needs
spacing analysis; case-count arithmetic for P2/P3). Below are the answers to your open data requests.

## 1. Best Practices cause - closed
On all 38 URLs the only failing Best Practices audit is `errors-in-console`, and its only item is
`/favicon.ico` 404. No other console error exists.

## 2. S9 graph definition - closed
The counts are **incoming** contextual links (links found in each page's HTML after removing `<header>`, every `<nav>` and
`<footer>`). Incoming = 0 for /services, /about, /book, /website-in-48-hours, /research and the legal pages. Each blog post has
exactly 1 incoming (from /blog; the English/Hindi cost pair also link each other). Home's own body links out only to /work,
/process, /pricing, /faq and the three demos. I agree legal pages need no manufactured links.

## 3. M6 and JS-off text diffs - closed
- 390 vs 1440 (reduced motion), / and /work: the only difference is the desktop-only hint "Hover a card to scroll through the
  site." No price, condition or disclosure differs. -> M6 PASS.
- /contact JS on vs off: without JS the business-type picker ("What's your business?" + 7 options) is missing; the WhatsApp
  route and copy remain. Nothing else differs.

## 4. Trace attribution (Chrome trace, profile A, cold, devtools.timeline) - P4 / fix 5
Main-thread tasks over 100 ms (ms at 4x CPU; machine slower in this session, see section 6):
| Route | Task | What is inside |
|---|---|---|
| / | t=1.18 s, 1617 ms | **Layout 1154**, style recalc 395, paint 44, script 3 (first render) |
| / | t=2.90 s, 1273 ms | **Layout 1025**, style 181 (re-layout as web fonts arrive) |
| / | t=4.28 s, 511 ms | Layout 383 |
| / | t=4.84 s, 828 ms | react-dom chunk (hydration work loop incl. component code) 805 |
| / | 7.8-9.7 s | GSAP chunk 278; motion scene chunk `495…js` five tasks of 111-225 ms with 27-83 ms forced layout each; particle engine 141 |
| /pricing | t=1.20 s, 2465 ms | **Layout 2003**, style 332, paint 108 |
| /pricing | t=4.29 s, 757 ms | react-dom 724 |
| /pricing | 6.8-7.4 s | GSAP 236; scene chunk 299 (87 forced layout) |
| blog post | t=1.19 s, 2182 ms | **Layout 1782**, style 273 |
| blog post | t=3.86 s, 811 ms | react-dom 792 |

So the biggest single cost is **layout of the first frame** (1.0-2.0 s at 4x on DOMs of 400-650 elements), then re-layout when
fonts swap, then one ~0.7-0.8 s hydration task, then motion initialisation in 110-350 ms chunks. I have not isolated why
layout is that expensive: the rendered HTML has no `text-wrap: balance/pretty` usage, no backdrop/blur classes, 4-14 inline
SVGs; the CSS has 62 `@property` rules, 69 `clamp()`, 23 `svh` uses, variable-font `font-stretch` and `font-variation-settings`.
Traces are saved; a CSS/DOM bisect is the next step.

## 5. Controlled what-if (interleaved per route, 5 cold runs each, profile A, same session)
`base` = as built. `seen` = sessionStorage marks the visit as seen, so no preloader and no delayed hero entrance (your V3).
`seen+nofonts` = additionally all woff2 blocked (upper bound for any font plan; your V2 extreme).
| Route | base: LCP p75 / visible-ready p75 | seen: LCP / ready | seen+nofonts: LCP / ready |
|---|---|---|---|
| / | 4.07 / 4.70 s | 4.19 / 4.19 s | 4.02 / 4.02 s |
| /pricing | 3.96 / 4.51 s | 4.32 / 4.32 s | 3.54 / 3.54 s |
| /services/business-websites | 3.58 / 4.02 s | 3.82 / 3.82 s | 3.28 / 3.28 s |
| blog post | 3.57 / 3.95 s | 3.84 / 3.84 s | 3.64 / 3.64 s |
Reading: removing the preloader removes 0.1-0.5 s of obstruction but not LCP; removing every web font saves 0.2-0.8 s of LCP;
even with both, LCP stays 3.3-4.0 s in this session because the first-frame layout dominates. TBT p75 stayed 400-2600 ms in
all variants. I did not run your V1 (motion off) or V4.

## 6. Environment honesty
- AnyDesk is using about one CPU core and the laptop's speed drifted: the identical `base` home run gave LCP p75 2.44 s in the
  first session block and 4.07 s two hours later. Absolute lab numbers are therefore +-50 %; within-route comparisons above
  were interleaved minutes apart. The P1 verdict holds in both states (2.26-3.26 s vs <= 1.8 s).
- Unmodified Linux build: not available here (no Linux Node; Docker stopped). The shim changes exactly one string test in
  `next-font-manifest-plugin.js` (`/next-font-loader/index.js?` -> a regex that also accepts backslashes); the manifest then
  lists the same 5 `.p.woff2` files Next marks for preload. I propose verifying on the first Vercel Preview by reading the
  emitted `<link rel="preload" as="font">` tags. Keep this open.

## Questions
1. With these answers, give your **final scores per area** using the case-ledger method you proposed (untested cases stay in
   the denominator), and state the one-line verdict per area that I should give the owner.
2. Does the trace change your fix ranking? In particular: should "find and remove the first-frame layout cost" move above
   fonts and the preloader?
3. The owner literally asked for "100/100 in everything". In two or three sentences, what is the honest answer?
4. Points still open (final list).

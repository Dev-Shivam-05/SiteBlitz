# Review - SiteBlitz motion-led redesign: final reference - 2026-11-10 - 2 rounds - prompt: siteblitz-transformation-debate

Owner's ask: references from award sites with heavy scroll-driven motion, analysed for a site that SELLS a service,
one reference finalised and everything extracted from it; the owner approves the reference links before any build.
Candidates: 13 shortlisted from Awwwards 2026 pages (each award read on its own awwwards.com/sites page), 8 captured
live by Claude (`tools/ref-scroll.mjs`, 1440 and 390, real wheel events, contact sheets in `.shots/refs/`, gitignored).
ChatGPT opened the live sites itself. Nothing was built, deployed or spent.

## Final reference
- **Main: Horeca Social** - https://horeca-social.com/en - Awwwards Honorable Mention 2026-05-09
  (https://www.awwwards.com/sites/horeca-social-made-viral). A hospitality marketing agency: sells a service,
  WhatsApp in the hero, GSAP + ScrollTrigger + CSS sticky, **0 WebGL**, Lenis on desktop only; its motion survives on
  a 390 px phone (captured).
- **Secondary, pricing only: PX PUSH** - https://pxpush.com/ - SOTD 2026-08-15 (https://www.awwwards.com/sites/px-push).
- **Secondary, rhythm only: 1820 Productions** - https://1820productions.com/ - SOTD 2026-02-26
  (https://www.awwwards.com/sites/1820-productions).
- Rejected as main: TRIONN (Rajkot studio selling the same service + 4.9 MB WebGL), PX PUSH as a whole (7.6 MB, 3
  WebGL scenes), 1820 (needs film), Maxima (needs an illustrator), Kononenko (too little motion), Lama Lama, Hubtown,
  Telha Clarke (its persistent-CTA behaviour could not be verified; idea kept generically).

| # | Point | Proposed by | Evidence | Claude's verdict | Status |
|---|---|---|---|---|---|
| 1 | Horeca Social is the main reference | Claude r1, ChatGPT r1 | evidence.md probe: 0 WebGL, 116 KB in first 9 s; 1440 + 390 captures | agreed | owner approves the link |
| 2 | Take the motion grammar only; never copy its pink #df0567, Monologue face, copy, partner wall, testimonials, photos, 18,000 px length, preloader | ChatGPT r1 | captures | agreed | locked |
| 3 | Storyboard of 10 scenes (table below), 2 heavy sticky scenes + 3 lighter scroll moments | ChatGPT r1-r2, Claude r2 (A, C) | `02_chatgpt.md` extraction sheet | agreed | owner `go` |
| 4 | Mobile keeps the heavy motion: CSS-sticky demo stack top 72 px, previous card 1 → 0.92; type wipe 1 → 2.2 with 40svh hold; normal flow only under reduced motion, landscape or viewport height < 540 px | Claude r2, ChatGPT r2 agreed | Horeca 390 capture | agreed | locked |
| 5 | Pricing: PX PUSH-style sticky rail (desktop: left rail 38 %, rows 112 px, active row ink + 4 px orange bar, 280 ms; details 62 % scroll), all prices and inclusions readable as static HTML; no fade-up | Claude r2 (B), ChatGPT r2 | `02_chatgpt.md` B | agreed | locked |
| 6 | Giant "₹7,999" rising after the hero (22 vw ≤ 320 px desktop, 20 vw phone, y 40 % → 0, scrub 0.3, no pin, no counting digits) | Claude r2, ChatGPT r2 | Horeca "400+" beat | agreed | locked |
| 7 | Scattered letters assembling once: "SEE IT BEFORE YOU PAY" + the qualified-buyer line visible from the first frame | Claude r2, ChatGPT r2 | Horeca "NOTHING BUT THE TRUTH" | agreed | owner approves wording |
| 8 | Type: Antonio 600 display (line-height 0.92, tracking -0.025em desktop / -0.015em phone, 96-180 px desktop, 58-86 px phone) + DM Sans 400/600 text; ₹ falls back to DM Sans | Claude r2 (D), ChatGPT r2 | Google Fonts, OFL | agreed | locked |
| 9 | Colour: ivory #F8F5EE ground, white #FFFFFF surface, #EEE8DD raised, ink #121A1D, vermilion #C43D15 action, muted #535B5B, faint #606968, warm #FFE6CB decoration, line #D3C9BC. Measured: orange 5.22 on white, 4.79 on ivory, 4.28 on raised (large only), 3.38 on ink (≥ 24 px only) | ChatGPT r1, Claude measured | contrast script | agreed | locked |
| 10 | Lenis desktop only (`hover: hover` and `pointer: fine`, lerp 0.1), native scroll on touch; drop it if it hurts keyboard or sticky alignment | Claude r2 (E), ChatGPT r2 | `Motion.tsx` 24-41 runs it everywhere today | agreed | locked |
| 11 | Hero: full-bleed licensed photo of an independent shop/showroom counter, no people; concept-demo phone (real /demo/showroom screenshot, "CONCEPT DEMO" on it) right side; frame scales 1 → 0.88, radius 0 → 28 px over 75vh (phone 1 → 0.93, 20 px, 55svh) | ChatGPT r2 (F) | - | agreed, **with one change**: no left-to-right gradient scrim over the photo; pick a frame whose left side is naturally dark, else a solid ink panel behind the words | owner approves photo direction |
| 12 | Headline "WEBSITES. FROM ₹7,999." + "Mobile-first websites for salons, coaching classes and showrooms." + "Launch: 1 page · 2 working days after ready-to-build." | ChatGPT r2 (G) | offer.ts | agreed | owner approves |
| 13 | Type-wipe phrase: ChatGPT's "SEE IT. THEN DECIDE." repeats scene 8's promise | Claude (this result) | scene 5 vs 8 | **open** - Claude proposes one word, "VISIBLE." (Horeca wipes on one word) | owner picks |
| 14 | Demo screenshots need real licensed photographs before they can be shown anywhere (they still say "real photos go here") | Claude r2, ChatGPT r2 | `public/demos/*.png` | agreed | first build phase |
| 15 | Budgets: mobile initial ≤ 500 KB, initial JS ≤ 180 KB, deferred motion JS ≤ 55 KB, 0 WebGL, p75 LCP ≤ 2.5 s / INP ≤ 200 ms / CLS ≤ 0.1; hero, price, WhatsApp server-rendered | ChatGPT r1 | web.dev thresholds | agreed | locked |

## The extraction sheet (scene by scene)
| # | Scene | Taken from | Desktop (1440) | Phone (390) | Reduced motion |
|---|---|---|---|---|---|
| 01 | Hero: showroom photo + concept phone + "WEBSITES. FROM ₹7,999." + WhatsApp | Horeca hero that shrinks away | frame 1 → 0.88, radius 0 → 28 px, headline y 0 → -8vh, top top → +75vh, scrub 0.3, no pin | 1 → 0.93, radius 20 px, headline -24 px over 55svh | static |
| 02 | Giant ₹7,999 + "1-page website · 2 working days after ready-to-build" | Horeca "400+" count | 22 vw (≤ 320 px), y 40 % → 0, section top 82 % → 35 %, scrub 0.3 | 20 vw, y 24 % → 0, ends 40 % | static |
| 03 | Statement bridge "YOUR WEBSITE SHOULD MAKE ENQUIRIES EASY." | 1820 hairline + short statement | hairline scaleX 0 → 1, 450 ms power2.out at top 75 % | 280 ms | static |
| 04 | **Demo stack** (salon → coaching → showroom, each with "View live concept") | Horeca stacked service cards | CSS sticky top 96 px, three 90svh wrappers, previous card 1 → 0.94, scrub 0.3, no JS pin | top 72 px, 358 px wide, height ≤ 560 px, previous 1 → 0.92 | normal flow |
| 05 | **Type wipe**: one word grows until it becomes the vermilion ground | Horeca "VIBES" | wrapper 155svh, sticky child 100svh, scale 1 → 3, 55svh hold, scrub 0.3 | wrapper 140svh, 1 → 2.2, 40svh hold | static orange band + word |
| 06 | Packages rail (Launch / Business / Custom, payment splits, terms) | PX PUSH packages | sticky rail top 104 px, rows 112 px, active state 280 ms power2.out when its detail panel crosses 55 % | stacked full-width cards, active border/ground 280 ms in middle 40 % | all static |
| 07 | Four-step process | 1820 rhythm | active step at 70 %, line scaleX 0 → 1, 350 ms | vertical, 250 ms | static |
| 08 | "SEE IT BEFORE YOU PAY" letters assemble + qualifier line | Horeca "NOTHING BUT THE TRUTH" | ±50 px y / ±24 px x / ±7° → 0, top 80 % → 32 %, scrub 0.35 | ±24 / ±12 / ±4°, scrub 0.3 | assembled |
| 09 | FAQs | none (conversion need) | native `<details>`, ≤ 180 ms | same | instant |
| 10 | WhatsApp close "LET'S BUILD YOUR WEBSITE." | Horeca contact close | ground ivory → ink 350 ms at 60 % | static, big CTA | static |
| - | Persistent WhatsApp pill: same label "Chat on WhatsApp", prefilled message changes per section; phone: bottom, safe-area aware | Telha Clarke idea (unverified) | fixed | fixed bottom | fixed |

## Recommended next steps (not started - waiting for your go)
1. Owner approves the main reference link (or sends another one to analyse the same way).
2. Spec-lock this sheet into `docs/spec/redesign-v3-motion.md`, then build in phases of ≤ 8 files:
   R1 demos get real photographs + new screenshots; R2 tokens, fonts, hero, giant price; R3 demo stack + type wipe;
   R4 packages rail, process, promise, FAQs, close, WhatsApp pill, desktop-only Lenis; each with 320/390/1440 and
   reduced-motion screenshots, `npm test`, `npm run build`, performance check.

## Points still open
- Owner: is Horeca Social the final reference?
- Owner: hero headline, showroom photo direction, the type-wipe word (point 13).
- Founder: prices ₹7,999 / ₹17,999 and the free-concept qualification terms (D11, still unapproved).
- Antonio's ₹ glyph support (fallback to DM Sans planned) - check when the font loads.
- Hosting (Vercel Hobby is non-commercial, D12) - a release blocker, not a design point.

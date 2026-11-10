# Spec — Redesign v3: motion-led, reference Horeca Social (locked 2026-11-10)

Approved by the owner on 2026-11-10 ("Great Go for it...", then "Do not stop until the end is marked completed").
Source: `docs/debate/2026-11-10-motion-reference/RESULT.md` (2 ChatGPT rounds + Claude's live captures).
Resolves D13 (final design was undecided): neither the light teal design (`bdb59e8`) nor the old dark one.

## Reference
- Main: Horeca Social — https://horeca-social.com/en (Awwwards Honorable Mention 2026-05-09). Take its motion
  grammar only. Never copy its pink, its Monologue face, copy, photos, partner wall, testimonials or preloader.
- Pricing idea: PX PUSH — https://pxpush.com/ . Rhythm idea: 1820 Productions — https://1820productions.com/ .

## Owner decisions (defaults the owner's "go" accepted)
| # | Item | Locked value |
|---|---|---|
| O1 | Headline | `WEBSITES. FROM ₹7,999.` (price read from `offer.ts`, never hard-coded) |
| O2 | Type-wipe word | `VISIBLE.` |
| O3 | Hero photo | A licensed photograph of an Indian shop with no people: "Textile shop in Jaipur" by Ninara, CC BY 2.0 |
| O4 | Prices | unchanged from `src/lib/offer.ts` (still awaiting the founder's final approval, D11) |

## Tokens (public site; admin keeps `[data-theme="dark"]`)
| Token | Value | Use | Contrast (measured) |
|---|---|---|---|
| void | #F8F5EE | page ground (ivory) | ink 16.19 |
| surface | #FFFFFF | cards, reading surfaces | |
| raised | #EEE8DD | secondary blocks | |
| ink | #121A1D | text, dark panels | |
| muted | #535B5B | secondary text | 6.40 on void |
| faint | #606968 | subdued text | 5.19 on void |
| volt | #C43D15 | action / accent (vermilion) | 5.22 on white, 4.79 on void, 4.28 on raised (large only), 3.38 on ink (≥ 24 px only); white on it 5.22 |
| volt-dim | #A3330F | hover/pressed action | |
| warm | #FFE6CB | decoration only | |
| line | #D3C9BC | dividers | |
| violet | #C43D15 | legacy alias of volt (no violet anywhere) | |

Type: display **Antonio 600** (Google Fonts, OFL), line-height 0.92, tracking -0.025em desktop / -0.015em phone,
uppercase; text **DM Sans 400/600**, line-height 1.5, 16–18 px. ₹ in display sizes falls back to DM Sans.
Display scale: hero `clamp(58px, 15vw, 86px)` phone → `clamp(96px, 12vw, 180px)` desktop (capped so the
headline stays ≤ 3 lines). Buttons ≥ 44 px tall, DM Sans 600.

## Home page — scenes in order (desktop 1440 / phone 390 / reduced motion)
| # | Scene | Desktop | Phone | Reduced motion |
|---|---|---|---|---|
| 01 | Hero: full-bleed shop photo, ink panel with the headline, sub-line "Mobile-first websites for salons, coaching classes and showrooms.", fact "Launch: 1 page · 2 working days after ready-to-build.", buttons Chat on WhatsApp / View live concepts; phone frame with the showroom concept screenshot ("CONCEPT DEMO" on it) | frame scale 1 → 0.88, radius 0 → 28 px, headline y 0 → -8vh over the first 75vh, scrub 0.3, no pin | scale 1 → 0.93, radius 20 px, -24 px over 55svh; phone frame 150 px | static |
| 02 | Giant price `₹7,999` + "1-page website · 2 working days after ready-to-build" | 22vw (≤ 320 px), y 40% → 0, section top 82% → 35%, scrub 0.3 | 20vw, y 24% → 0, ends 40% | static |
| 03 | Statement bridge "YOUR WEBSITE SHOULD MAKE ENQUIRIES EASY." with a hairline | hairline scaleX 0 → 1, 450 ms power2.out at top 75% | 280 ms | static |
| 04 | Demo stack: salon → coaching → showroom, each card = screenshot + name + one line + "View live concept" | CSS sticky top 96 px, wrappers 90svh, previous card 1 → 0.94, scrub 0.3, no JS pin | sticky top 72 px, card ≤ 560 px tall, previous 1 → 0.92; normal flow when landscape or height < 540 px | normal flow |
| 05 | Type wipe `VISIBLE.` grows until vermilion fills the screen | wrapper 155svh, sticky child 100svh, scale 1 → 3, scrub 0.3 | wrapper 140svh, scale 1 → 2.2 | static vermilion band with the word |
| 06 | Packages: Launch / Business / Custom from `offer.ts` (price, pages, delivery, payment split, inclusions) | sticky rail 38% (top 104 px, rows 112 px) + details 62%; active row ink ground + 4 px vermilion bar, 280 ms power2.out when its detail crosses 55% | stacked full cards, active border/ground 280 ms in the middle 40% | all static, all visible |
| 07 | Four steps (`PROCESS_STEPS`) | active step at 70%, line scaleX 0 → 1, 350 ms | vertical, 250 ms | static |
| 08 | `SEE IT BEFORE YOU PAY` letters assemble + qualifier visible from the first frame | ±50 px y / ±24 px x / ±7° → 0, top 80% → 32%, scrub 0.35 | ±24 / ±12 / ±4°, scrub 0.3 | assembled |
| 09 | FAQs (`FAQS`) | native `<details>` | same | instant |
| 10 | Close "LET'S BUILD YOUR WEBSITE." + WhatsApp | ivory → ink ground, 350 ms at 60% | static | static |
| — | Persistent WhatsApp pill "Chat on WhatsApp", prefilled text per section | fixed bottom-right after the hero | fixed bottom, full width minus 32 px, safe-area | fixed |

Removed from the home page: the comparison table, the defensive lines ("No invented reviews…"), the phone demo switcher.
Hover: buttons step 1 px up and press on click; linked cards lift 2 px; photos zoom 1.03 inside their frame.

## Demos
Each concept demo leads with a real licensed photograph (stand-ins, listed below); the "Illustration · real photos
go here" slot is removed. Disclosure ribbon, noindex and the simulated enquiry stay. Screenshots in
`public/demos/*.png` are re-captured after the change.
Stand-in photographs (all Wikimedia Commons): salon interior (Daderot, CC0), wash basin (johnrosman, CC BY 2.0),
classroom (Sasa 38300, CC BY-SA 3.0), classroom chairs (Yitzilitt, CC BY-SA 4.0), furniture store (Downtowngal,
CC BY-SA 4.0), dining area (Shixart1985, CC BY 2.0), hero textile shop (Ninara, CC BY 2.0). Credits in one footer line.

## Motion engine
Extend `Motion.tsx` declaratively (`data-anim` / `data-scene`); no GSAP inside components. Lenis only when
`(hover: hover) and (pointer: fine)` and no reduced motion, lerp 0.1; native scroll on touch.
Content never depends on JS: every scene is readable server-rendered HTML; GSAP only adds transforms.

## Budgets
Mobile initial transfer ≤ 500 KB; initial JS ≤ 180 KB compressed; deferred motion JS ≤ 55 KB; 0 WebGL;
lab LCP ≤ 2.5 s on `/`; CLS ≤ 0.1.

## Acceptance criteria
- [ ] No placeholder text or illustration slot on any public page or demo.
- [ ] First screen at 320, 390, 1440 shows the headline with the price, the sub-line and the WhatsApp button without JS.
- [ ] No horizontal overflow at 320/390/1440 (shoot.mjs reports none); no console errors.
- [ ] Reduced-motion screenshots show every section static and visible.
- [ ] Each of the 10 scenes is present and its motion is observable in a scrolled capture at 1440 and 390.
- [ ] Prices, payment splits and delivery strings come from `offer.ts`; `npm test` passes (offer guard).
- [ ] `npm run build` exits 0; `npm test` exits 0.
- [ ] Every photograph has its credit in the footer line; every demo keeps its disclosure ribbon.
- [ ] Admin pages unchanged (dark theme).

## Phases (≤ 8 files each)
R1 demos get photographs + new screenshots · R2 tokens, fonts, chrome, hero, giant price, statement ·
R3 demo stack + type wipe · R4 packages, process, promise, FAQs, close, WhatsApp pill, Lenis · R5 verification,
docs, push.

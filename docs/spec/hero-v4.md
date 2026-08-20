# SPEC LOCK — Hero v4 (home page first impression)

Approved 2026-08-20. Supersedes the v3 hero. Baseline evidence: the v3 hero at 1600×900
rendered the middle headline line as invisible ghost boxes and the background as one flat
green marble edge-to-edge.

## Defects being fixed (observed, not assumed)

| # | Defect | Cause |
|---|---|---|
| D1 | Middle headline line "THAT WIN" is unreadable | `.text-outline` = `-webkit-text-stroke: 1px rgba(245,245,240,0.25)` over a bright background. The headline reads "WEBSITES … BUSINESS." |
| D2 | Nav logo and headline occupy the same band on short viewports | Section is `justify-end` with a ~400px headline; nothing reserves the 64/80px navbar height |
| D3 | Status badge floats in dead space and collides with the headline | `md:absolute md:left-8 md:top-32` against a bottom-anchored headline |
| D4 | Background reads as flat and simple | One uniform 4-octave fbm at full brightness across the whole viewport — no focal point, no depth, no direction |
| D5 | Body copy and CTAs sit on busy bright areas | Scrim is `via-void/15 to-transparent`; it protects only the left third |

## Locked values

| # | Decision | Locked value | Why |
|---|---|---|---|
| 1 | Hero layout | CSS grid `grid-rows-[auto_1fr_auto]` on `min-h-[100svh]`. Row 1 = spacer `h-16 md:h-20` (exactly the navbar height). Row 2 = content, vertically centred. Row 3 = marquee. | Makes D2 structurally impossible instead of tuned-per-viewport |
| 2 | Badge placement | In flow, directly above the `<h1>`, same left edge, `mb-7 md:mb-9`. No `absolute` at any breakpoint. | Kills D3 permanently; the badge now anchors the composition |
| 3 | Headline size | `clamp(2.75rem, 10.5vw, 9.5rem)`, `leading-[0.86]`, `tracking-[-0.03em]` | Never overflows, never needs breakpoint sizes |
| 4 | Headline line 2 | New `.text-stroke-volt`: `-webkit-text-stroke: 2px rgba(204,255,0,0.85)` (1.5px under 768px), transparent fill, `drop-shadow(0 0 18px rgba(204,255,0,0.35))` | Turns the worst defect into the hook — the line becomes a glowing volt wireframe |
| 5 | Text scrim | `.hero-scrim`: `linear-gradient(100deg, #0a0a0c 0%, rgba(10,10,12,.94) 30%, rgba(10,10,12,.62) 50%, rgba(10,10,12,.12) 72%, transparent 88%)` + bottom `linear-gradient(to top,#0a0a0c 0%,transparent 38%)` | Text sits on near-black; the bloom stays clean on the right where no text is |
| 6 | Shader — focal light | Energy terms multiplied by `side = smoothstep(0.02, 0.72, uv.x)` and a radial bloom centred at `vec2(0.76, 0.52)` | One light source instead of uniform texture. Fixes D4 and D5 at the source |
| 7 | Shader — detail | fbm 4 → 5 octaves; filament band narrowed to `smoothstep(0.4965, 0.5035, f)`; second counter-moving layer at 0.45× scale | Hairline plasma filaments + parallax depth |
| 8 | Shader — base + tint | Base `vec3(0.027,0.027,0.035)`; violet undercurrent lifted to `vec3(0.20,0.13,0.48)` | Deeper black, richer colour — not only green |
| 9 | Shader — motion | Time scale `0.06` → `0.085` | The field visibly breathes instead of appearing static |
| 10 | Render resolution | `scale` `0.72` → `0.9` | Crisper filaments; still under native, still cheap |
| 11 | Signature motion | One volt scanline sweeps the headline block once on load: 0.85s, `cubic-bezier(0.76,0,0.24,1)`, `delay 0.15s` | A single expensive-feeling moment instead of more competing effects |
| 12 | Orbit SVG | Moves to `bottom-44 right-10`, `lg:` and up only | Clears the MENU button zone |
| 13 | Orbit SVG (revised after first render) | **Removed.** Moving it bottom-right put it directly on the new bloom, where 40%-opacity muted text reads as noise | Decoration that fights the focal point costs more than it adds. `aria-hidden`, so no content or a11y impact |
| 14 | Scroll cue | **Removed.** It rendered as a stray speck above the CTA row, and the proof marquee sits directly beneath it already signalling more content | Redundant affordance, `aria-hidden`, no content impact |
| 15 | Shader GPU budget (revised after costing it) | Domain-warp inputs use 3-octave (primary) / 2-octave (secondary) fbm; only the final lookup uses 5 octaves. Render scale `0.9` → `0.82` | Rows 7 and 10 as first written took the shader to ~50 noise samples/px at 1.56× the pixels — roughly 3.9× the pre-v4 GPU cost, unacceptable for a site that publishes its own Core Web Vitals. This lands near ~1.5× with no visible loss |

## Out of scope (will NOT build)
- Any change to `Motion.tsx` (`data-hero-pin` / `data-hero-content` contracts stay intact)
- Any change to other sections, the navbar, or the mobile menu
- Copy changes — the words stay exactly as they are in `site.ts` and the current markup
- Adding a scroll-jacked or pinned hero sequence

## Acceptance criteria (binary)
- [ ] All three headline lines are legible in a 1600×900 screenshot; line 2 has a visible volt stroke
- [ ] Navbar logo and headline do not overlap at 1600×900, 1920×860, and 1280×720
- [ ] Badge does not overlap the headline at any of those three sizes
- [ ] Left 45% of the hero measures darker than the right 45% (focal light source present)
- [ ] `npm run build` exits 0
- [ ] `data-hero-pin` and `data-hero-content` still present in the DOM
- [ ] Reduced-motion render still shows all three lines and both CTAs

## Verification record (2026-08-20)

| Criterion | Result |
|---|---|
| Three legible headline lines, volt stroke on line 2 | Pass — 1600×900, 1920×860, 1280×720, 390×844 |
| No navbar/headline overlap | Pass — measured: navbar bottom 80px, h1 top 234px → 154px clearance at 1600×900 |
| No badge/headline overlap | Pass — badge is in flow, structurally cannot overlap |
| Focal light source (left darker than right) | Pass — luminance ratio 1.10× → 1.51× |
| No horizontal overflow | Pass — `scrollWidth === clientWidth` at 1600 and 390 |
| `npm run build` exits 0 | Pass |
| `data-hero-pin` / `data-hero-content` intact | Pass — both measured present in the DOM |
| Reduced-motion render | Pass — all three lines and both CTAs visible at 1440×900 |

## Risks
- GLSL cannot be verified by reading it. Mitigation: every change is screenshotted headless at
  four viewport sizes before commit; swiftshader output is close enough to judge composition.
- **Unmeasured:** real-GPU frame time. Swiftshader is software rendering, so the headless run says
  nothing about cost on actual hardware. The octave/scale budget above is arithmetic, not a
  measurement — worth one check on a real device.

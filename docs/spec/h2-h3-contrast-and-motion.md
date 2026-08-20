# SPEC LOCK — H2/H3: contrast floor and reduced-motion correctness

Approved 2026-08-20. Built 2026-08-20.

## What this is NOT

The stated goal was "carry the hero's discipline into the rest of the home page, then `/work` and
`/services`". Screenshotting all nine screens of the home page plus both sub-pages showed that
**premise was mostly wrong** — Stats, Services, WorkGallery, Process, Manifesto, Pricing, FAQ and
CTA are well-composed, consistent, and hold up next to the new hero. No redesign was warranted and
none was done.

What the audit *did* surface were two real defects, both invisible to a sighted user on a normal
desktop, both affecting real visitors.

## Defects fixed

| # | Defect | Evidence |
|---|---|---|
| D1 | `--color-faint` `#55555e` is **2.68:1** on `--color-void` — below the WCAG AA 4.5:1 floor — and is used for *content*, not just decoration: tag pills on `/work`, `/services` and the home Services section, testimonial role lines, and the grader's input placeholder. 40 files use it. | Computed from the token values |
| D2 | Every marquee duplicates its items to make the scroll loop seamless, and masks its edges to fade items in and out. Under `prefers-reduced-motion: reduce` the animation freezes at offset 0, so the duplicate becomes visibly repeated content and the mask permanently half-hides the first and last item. Testimonials was worst: it rendered the same five quotes **four times** (two rows × two copies). | Reduced-motion screenshot at scroll 4900 |

## Locked values

| # | Decision | Locked value | Why |
|---|---|---|---|
| 1 | New `--color-faint` | `#81818f` | Smallest hue-preserving lift that clears 4.5:1 on **all three** surfaces the token sits on — void 5.15:1, surface 4.87:1, raised 4.51:1. An earlier pick (`#787885`) passed only on void and was rejected. |
| 2 | Scope of the colour change | The token only. No per-component overrides. | One line fixes all 40 files; decorative uses becoming more legible is not a regression |
| 3 | Reduced-motion marquee | `.marquee-mask` drops its mask and `overflow: visible`; `.marquee-track` becomes `width:auto; flex-wrap: wrap`; `.rm-hide` sets `display:none` — all only inside the existing `prefers-reduced-motion: reduce` block | Degrades a scrolling strip to a plain wrapped row. Zero effect on the animated path |
| 4 | What gets `rm-hide` | The duplicated second half in `Marquee`, `BigMarquee` and `Testimonials`' `Row`, plus the entire reversed second `Row` in `Testimonials` | The duplicate exists only for the loop; the reversed row is the same five quotes again |

## Out of scope
Any visual redesign of the sections that were audited and found sound. `.text-outline` on the
Process numerals and `BigMarquee` (a deliberate low-contrast watermark on a plain dark background,
not content). Contrast of `text-muted` (already 7.17:1) and `text-volt` (16.83:1).

## Verification record (2026-08-20)

| Criterion | Result |
|---|---|
| `--color-faint` ≥ 4.5:1 on void, surface and raised | Pass — 5.15 / 4.87 / 4.51 |
| Reduced motion shows each testimonial exactly once | Pass — screenshot, one row of five, fifth wraps |
| No permanent edge fade under reduced motion | Pass — first card fully opaque |
| `/work` tag pills legible | Pass — screenshot before/after |
| Animated path unchanged | Pass — `rm-hide` and `.marquee-track` rules exist only inside the reduced-motion media query |
| `npm test` | Pass — 73 tests |
| `npm run build` | Pass |

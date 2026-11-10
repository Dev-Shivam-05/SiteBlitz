# HANDOFF — SiteBlitz — Phase DS (Redesign v3, R1–R5) — 2026-11-10

## Done
- **Design decided (D14).** The owner rated the light teal design 1/10 and approved a new direction instead of the light or the old dark one. Its reference is Horeca Social (Awwwards Honorable Mention 2026-05-09), agreed with ChatGPT over 2 rounds in `docs/debate/2026-11-10-motion-reference/`. Locked spec: `docs/spec/redesign-v3-motion.md`.
- **Home page:** 10 motion-led scenes. Each is plain server HTML; GSAP only adds transforms, and under reduced motion every scene sits static and visible.
  1. Shop-photo hero; the frame shrinks and rounds on scroll.
  2. Giant ₹7,999 that rises into view.
  3. Hairline statement.
  4. Stacked concept-demo cards (CSS sticky + scrubbed scale).
  5. "VISIBLE." word that grows until vermilion fills the screen.
  6. Packages rail that marks the package in view.
  7. Process steps that light up.
  8. "SEE IT BEFORE YOU PAY" letters that assemble.
  9. Native `<details>` FAQs.
  10. Close that turns ink.
- **Every public page now has:**
  - a persistent WhatsApp pill, shown after the hero and hidden over the close and the footer;
  - the pill navbar;
  - the ink footer;
  - Antonio 600 + DM Sans;
  - the ivory / ink / vermilion tokens.
- **Admin:** keeps its dark theme.
- **Demos:** all three now lead with real licensed photographs. The "real photos go here" slot is gone. The screenshots in `public/demos/` were re-captured from `next start`.
- **Verified:**
  - `npm run build` exit 0.
  - No overflow and no console errors on 12 pages at 320 / 390 / 1440.
  - Scroll captures at 1440 and 390 show every scene firing.
  - Lab LCP 1.79 s, CLS 0.
- **Committed, NOT pushed:** 9 commits on `v2-redesign` (`0607c70`..HEAD). The Claude OS guard hook blocked `git push` (its own check failed: `git log ... --not --remotes=origin`). Owner runs `git push origin v2-redesign` (Preview only; production untouched).

## Files changed
- `docs/debate/2026-11-10-motion-reference/*` — reference shortlist evidence, 2 ChatGPT rounds, RESULT, `tools/ref-scroll.mjs` (live scroll capture + probe).
- `docs/spec/redesign-v3-motion.md` — the locked spec (scenes, tokens, budgets, acceptance criteria).
- `src/lib/photos.ts`, `src/components/site/PhotoCredits.tsx`, `public/photos/*` — 8 licensed Wikimedia Commons stand-ins with credits.
- `src/lib/demos.ts`, `src/components/demo/DemoSite.tsx`, `public/demos/*` — demo photos, new captures (`*.png` 390@2x, `*-desktop.webp` 1440).
- `src/app/globals.css`, `src/app/layout.tsx` — v3 tokens, fonts, helper classes in `@layer components`, scene CSS, reduced-motion fallbacks.
- `src/components/site/sections/Home.tsx`, `src/app/page.tsx` — the 10 scenes in order.
- `src/components/site/sections/FAQ.tsx` — native `<details>` server component.
- `src/components/site/Motion.tsx` — v3 scenes (hero, rise, line, demo stack, wipe, rail, steps, scatter, close); Lenis on desktop pointers only.
- `src/components/site/{Navbar,Footer,Shell,WhatsAppPill,WhatsAppIcon}.tsx` — new chrome. DemoSwitcher deleted.
- `src/app/pricing/page.tsx` — uses the new `Close` section.

## Decisions made
- D14 (in `docs/DECISIONS.md`): redesign v3 is the final design.
  - Horeca's motion grammar, never its identity.
  - Antonio 600 / DM Sans, ivory #F8F5EE / ink #121A1D / vermilion #C43D15.
  - The owner's "go" accepted the defaults: headline "WEBSITES. FROM ₹7,999.", wipe word "VISIBLE.", hero = textile shop photo.
- Amended in the build:
  - The giant price is 34vw on phones and 26vw on desktop (Antonio is condensed; 20vw filled half the screen).
  - The comparison table and the defensive lines were removed from home.

## Known broken / deliberately skipped
- **`npm test` with its default 10 s hook timeout** fails 3 files on this machine right now: `admin-routes`, `cron-brief`, `track-optout`.
  - All three only import route modules in `beforeAll`.
  - An AnyDesk process (~84,000 CPU-seconds) is loading the CPU.
  - `npx vitest run --hookTimeout 60000` passes 13/13 files (178 tests).
  - Test config left unchanged on purpose.
- **Lab TBT 1,100 ms on `/`** (baseline 98 ms). Not comparable: `/contact` and `/work` also read 5–11× their baselines under the same load. Re-measure on an idle machine: `node scripts/vitals.mjs --pages / --runs 3`.
- **Design gate** (`design-taste-frontend`): `GATE: OPEN 83`, rounds used up.
  - Most open findings conflict with the owner's heavy-motion brief: effect-kind, pinned, scroll-reveal, collide on the sticky stack, pill nav, the kit's `.wrap` and section-height rules.
  - 3 more are AAA 7:1 contrast requests; AA is met.
  - 5 waivers are in `.taste-skill/waivers.json`: effect-kind, phone-number, tilt, nav, credit-wall. The nav waiver was ignored because it matched 4 findings.
- **Home is long on phones:** 13,738 px in reduced-motion flow (was 10,732).
- **Inner pages are not redesigned.** `/about`, `/services`, `/proof` etc. only took the new tokens and fonts, and keep their old copy ("Violent execution", "dominate online").
- **Photographs are stand-ins** from Wikimedia Commons, credited in the footer. Replace them with owner photos when available.
- **Founder items unchanged:** prices ₹7,999 / ₹17,999 still need approval (D11); hosting is still Vercel Hobby (D12); no production release.

## Next session starts here
- Phase P-INNER: bring `/pricing`, `/about`, `/services`, `/contact`, `/work`, `/proof` onto the v3 layout and voice (≤ 8 files), then the founder's release decision (L1).
- First command: `git -C E:\Temp\SiteBlitz log --oneline -8`, then open the Preview build from the `v2-redesign` push and show the owner the home page on a phone.
- Watch out for: custom CSS outside `@layer` beats Tailwind v4 utilities. Put helper classes in `@layer components`. `.btn-volt`'s `position: relative` silently beats the `fixed` utility.

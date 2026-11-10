# HANDOFF — SiteBlitz — Phase V1–V6 (Redesign v4 "showcase") — 2026-11-10

## Done
- **Direction (D15).** The owner rated v3 "not worth it" and approved v4 with "go for all":
  - main reference Lando Norris (Awwwards SOTY 2025);
  - a WebGL moment after Lusion (SOTY 2023);
  - offer panels after Akaru (SOTM Apr 2024);
  - admin after Linear, Vercel Observability and visitors.now.
  - Locked spec: `docs/spec/redesign-v4-showcase.md`.
- **One dark brand for site and admin:**
  - colours void #0A0A0C, ink #F5F5F0, volt #CCFF00;
  - type Mona Sans 800 at 125% width, Instrument Serif italic accents, DM Sans text.
- **Home (10 scenes):**
  1. WebGL hero. 20,000 particles (6,000 on phones) form SITEBLITZ, scatter from the cursor or a finger, and fly into the showroom concept phone on scroll, taking its pixel colours. The real capture then fades in.
  2. Statement with a drawn volt stroke.
  3. Giant ₹7,999 with a drawn loop.
  4. Drift collage round a sticky heading.
  5. Concept wall: the card holds while it rises; hover pans the whole demo page; cursor reads VIEW.
  6. Sideways package track (draggable).
  7. Process on a drawn path.
  8. Assembling "See it before you pay".
  9. FAQ.
  10. Close that turns volt.
- **Every public page:**
  - first-visit preloader (pure CSS, ≤ 1.2 s);
  - desktop cursor;
  - magnetic buttons;
  - volt page curtain;
  - glass header that hides on scroll down;
  - new footer.
- **Admin** (every feature in `docs/audit/admin-inventory-2026-11-10.md` kept):
  - grouped sidebar with `aria-current`;
  - Ctrl/⌘+K command bar;
  - shortcuts G+T, G+L, G+O and N;
  - phone top bar, bottom tab bar and More sheet;
  - Live globe (COBE);
  - Leads List/Board with drag and a status menu;
  - KPI count-up with sparklines;
  - chart colours from tokens;
  - the Visitors drawer is a real dialog (Esc closes, focus is trapped and restored);
  - restyled login.
- **Verified on the production build:**
  - `npm run build` exit 0.
  - `npx vitest run --hookTimeout 60000`: 13/13 files, 178 tests.
  - 13 public pages at 320/390/1440: no overflow, no console errors.
  - Reduced-motion full page: every section static and visible.
  - Hero frames at 0 / 0.5 / 0.72 / 0.95; 20,000 particles at 1440 and 6,000 at 390.
  - Preloader shows on the first load and not on the second; gone by 1.4 s.
  - Curtain is mid-navigation at 0.3 s and the page works after.
  - Home → pricing → home client round trip rebuilds the scenes.
  - Admin on a scratch DB: VERIFY section E 1-7 pass; all 12 pages at 390 and 1440; board move persisted; Ctrl+K opens and searches; drawer keyboard open, Esc and focus return; More sheet has 12 links.
  - Lab, mobile 4x CPU: `/` LCP 1.28 s, CLS 0.001, TBT 364 ms; `/pricing` LCP 1.17 s, TBT 114 ms.

## Files changed
- `src/app/globals.css`, `src/app/layout.tsx` — v4 tokens and fonts; CSS for the preloader, cursor, curtain, hero, scenes and admin.
- `src/components/site/{Preloader,Cursor,Navbar,Footer,Shell,Motion,WhatsAppPill}.tsx` — chrome, plus the v4 scenes in Motion. Each scene is its own idle task, run through `ctx.add`.
- `src/components/site/hero/{ParticleHero.tsx,particles.ts}` — progress driver and the WebGL engine.
- `src/components/site/sections/{Home,FAQ}.tsx`, `src/app/page.tsx` — the 10 scenes.
- `public/demos/*-full.webp` — whole-page demo captures (960 px wide) for the concept wall.
- `src/components/demo/DemoSite.tsx`, `src/lib/photos.ts` — dark SiteBlitz band in demos; credits for the shown photos.
- `src/components/admin/{AdminShell,CommandPalette,nav,useDialog,LiveGlobe,LeadBoard,Spark}.tsx|ts`, `src/lib/geo-centroids.ts` — the admin shell and its widgets.
- `src/app/admin/{page,live,leads,visitors,login,layout}` — the pages that use them.
- `scripts/frames.mjs` (scroll-frame and hover capture), `scripts/e2e-seed.mjs` (local-only admin E2E seed).
- `package.json` — adds `cobe`.

## Decisions made
- D15: v4 replaces v3's look.
- D16: build-time choices:
  - headline and showroom phone;
  - plain WebGL with a deferred boot;
  - cobe with a centroid table;
  - credits trimmed;
  - board shows 25 per status.

## Known broken / deliberately skipped
- **`git push` not confirmed.** See the last line of this file and the final chat message for the exact result.
- **Default `npm test`:** `admin-routes` hits vitest's 10 s hook timeout on this loaded machine (AnyDesk, plus local servers).
  - It passes with `--hookTimeout 60000`.
  - The test config is unchanged.
- **Inner pages (P-INNER) are not redesigned.** They take the v4 tokens and fonts and look coherent, but keep old copy ("Violent execution", "dominate online").
- **Design gate (design-taste-frontend) was not re-run.** Its house rules (no shader effects on service sites, no pinned scenes) contradict the owner-approved D15 brief; the spec is the contract.
- **Overview sparklines are hidden when the range has fewer than 2 days of data.** They are honest, not padded.
- **Board drag-and-drop** uses HTML5 DnD, which is desktop only; touch and keyboard use the card's status menu. It was verified via that menu, not by a real drag.
- **Founder items unchanged:**
  - prices ₹7,999 / ₹17,999 still need approval (D11);
  - hosting is still Vercel Hobby (D12);
  - no production release.

## Next session starts here
- Owner review of v4, then Phase P-INNER: `/about`, `/services`, `/work`, `/proof`, `/contact`, `/pricing` onto the v4 layout and voice (≤ 8 files).
- First command: `git -C E:\Temp\SiteBlitz push origin v2-redesign` (if not pushed), then open the Preview on a phone.
- Watch out for: scenes must stay separate `schedule()` tasks run through `ctx.add` in `Motion.tsx`, or they leak across client navigations. `overflow: hidden` on any ancestor of a sticky stage silently kills the pin (use `overflow: clip`).

- Push result (2026-11-10): `git push origin v2-redesign` was **blocked by the Claude OS guard hook** (its own check failed:
  `git log --format=%H%x00%B%x01 v2-redesign 2> --not --remotes=origin`). Branch is 18 commits ahead; the owner runs the push.

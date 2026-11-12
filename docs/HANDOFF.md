# HANDOFF — SiteBlitz — Phase Q (harsh-audit fixes, Q0–Q7) — 2026-11-11

Previous handoff (multi-page + search, SEO-0..8) is in git history: `git show 2997d46:docs/HANDOFF.md`.

## Done
- **Audit:** 4 ChatGPT rounds, `docs/debate/2026-11-11-perf-seo-harsh-audit/RESULT.md`. Harsh ledger (untested = 0, deploy/field
  points unearned) moved 20.5 / 30.5 / 24.3 -> **27.1 / 35.0 / 38.5** (performance / SEO / mobile).
- **Loads faster** (interleaved against a worktree of the pre-fix commit): Lighthouse mobile perf +4..+9 on every page
  compared, LCP -0.5..-0.6 s; profile A visible-ready 4.40 -> 3.35 s on home; fonts 214 -> 116 KB, 5 -> 2 preloads.
- **Accessibility, best practices and SEO score 100 on all 38 URLs** in Lighthouse (were 27/38, 0/38, 37/38).
- **No more blocking preloader:** a 3 px volt line sweeps the top edge once; the hero entrance starts immediately.
- **Phone menu is a real modal** (focus moves in, Tab stays inside, page behind inert, Escape returns focus); a skip link is
  the first Tab stop; focused controls never sit under the header or WhatsApp pill.
- **Scrolling is smoother:** home p95 frame 50 -> 33 ms at 4x CPU; background prefetch per scroll 379 -> 115 KB.
- **Search hygiene:** favicon set declared, in-content links into /services, /about, /book, /tools/grader, /research,
  /website-in-48-hours, /refunds; "here" anchor gone; full legal descriptions; manifest copy from offer.ts.
- **Release guard:** a production build stops unless `NEXT_PUBLIC_SITE_URL` is a bare https origin (verified exit 1).
- `npm test` 265 passed; `npm run build` exit 0; `scripts/seo-audit.mjs` 38 URLs, 0 problems; 0 px overflow 320-1440.

## Files changed
- `package.json`, `package-lock.json` — Next 15.5.20 -> 15.5.29 (2026-11-03 security release).
- `src/app/layout.tsx`, `src/fonts/*.woff2`, `scripts/fonts/build_fonts.py` — self-hosted Mona Sans 600-800/100-125 % and
  DM Sans 400-600 (one variable file each, rupee included); Instrument Serif no longer preloaded.
- `src/components/site/Preloader.tsx`, `src/app/globals.css` — entrance line instead of the sheet; content-visibility on
  below-fold sections and footer; skip link; scroll padding; page-hero first-visit delays removed.
- `src/components/site/Motion.tsx` — words-scrub readable (0.5 start, no aria-label on `<p>`); ScrollTrigger refresh once after
  the queue and on real height changes; reveals in skipped sections built when the section renders.
- `src/components/site/Navbar.tsx`, `Shell.tsx`, `Breadcrumbs.tsx` — modal menu, skip link + `main#main`, 24 px crumbs.
- `src/components/site/Footer.tsx` — `prefetch={false}`, column titles h2 (heading order).
- `src/components/site/sections/Home.tsx` — hero capture low priority + 192px; statement and close-line links.
- `src/app/{pricing,process,research/.../surat,privacy,terms,refunds,services/[slug],website-in-48-hours}/page.tsx` — links,
  anchor, descriptions, numeral contrast, underline.
- `src/app/blog/**`, `proof`, `components/demo/DemoSite.tsx`, `ConceptFrame.tsx`, `GraderTool.tsx`, `PricingPlans.tsx` — guide
  body 16 px, nothing public under 12 px.
- `src/app/{favicon.ico,icon.svg,apple-icon.png,manifest.ts}` — declared icons, truthful manifest.
- `src/lib/release.ts`, `next.config.ts`, `tests/release.test.ts` — production origin guard (+4 tests).
- `docs/DECISIONS.md` (D18), `docs/DEPLOY.md`, `docs/PHASES.md`, `CLAUDE.md`, `docs/debate/2026-11-11-perf-seo-harsh-audit/`.

## Decisions made
- D18: owner approved all fixes ("Go for all"); the D15 preloader is replaced by a non-blocking line; fonts self-hosted.
- `<Suspense>` around the page body rejected: Next streamed the body into a hidden div, invisible without JS.
- content-visibility kept: LCP and scrolling gain; post-FCP TBT rises because first paint is earlier (whole-window long-task
  time roughly equal). ChatGPT records that TBT rise as a regression on the metric; experience called mixed.

## Known broken / deliberately skipped
- Taps during load are still 500-900 ms at 4x CPU (hydration is one 0.6-0.8 s task; motion setup 100-300 ms tasks) — Q8.
- Ledger rows still untested: forms (M8), real phones (M10), research reproduction (S12), B-profile interactions, bfcache
  restore, heap/cleanup, landscape/zoom — not in the approved fix list.
- `NEXT_PUBLIC_SITE_URL` is set in Vercel Production (`https://siteblitz.vercel.app`, 2026-11-12); switch it to the real domain when attached.
- Admin quick-add input set in Mona Sans now renders at weight 600 (the font file starts at 600).
- `/refunds` wording (plural "revision rounds", 30-day defect fixes) not checked against offer.ts — owner review.
- Temporary worktree `E:\tmp\_sb_before` (pre-fix build, ~600 MB with node_modules) left in place: the guard blocked
  `git worktree remove --force`. Scratch fonts in `E:\tmp\_sb_fonts`.
- Push: see the last line of this file.

## Next session starts here
- Phase Q8: make taps during load fast (motion-off variant, input/processing/presentation split, smaller scene tasks).
- First command: `git -C E:\Temp\SiteBlitz worktree remove --force E:\tmp\_sb_before` (owner, in your own terminal), then
  `node docs/debate/2026-11-11-perf-seo-harsh-audit/tools/mobile-scan.mjs --pages / --widths 390 --cpu 4 --early-ms 2800`
  against a Linux-equivalent build on :3100 (build command in CLAUDE.md "Performance work").
- Watch out for: absolute lab numbers on this laptop drift up to ~70 % (battery, AnyDesk, other sessions' mongod) — only
  trust before/after pairs measured interleaved.

- Push and release (2026-11-12): `v2-redesign` pushed (`7c94ca1..aa116dc`) and promoted to production — https://siteblitz.vercel.app now serves v4 (`docs/DEPLOY.md` "Release 2026-11-12").

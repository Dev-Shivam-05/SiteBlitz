# SiteBlitz — Project Rules

Next.js 15 App Router marketing site + first-party analytics + single-operator admin panel.
Map: [docs/PROJECT_MAP.md](docs/PROJECT_MAP.md) · Risks: [docs/RISK.md](docs/RISK.md) · Verification: [docs/VERIFY.md](docs/VERIFY.md)

## Commands
- dev `npm run dev` → http://localhost:3000 · build `npm run build`
- `npm run typecheck` works again (P5, 2026-10-31: ~4 s, ~500 MB) and `npm run build` now fails on type errors.
  The old >2.9 GB OOM came from an untyped `model()` helper in `src/lib/models.ts` — keep schemas typed `new Schema<XDoc>`.
- `npm test` → vitest tests over the SSRF guard and the admin auth gate. No linter exists.
- **Never `npm run build` while `next dev` is live** — shared `.next` gives a bogus
  `TypeError: a[d] is not a function` prerender failure. Kill dev first; check for orphan children.
- On Windows, stopping the background `npm run dev` / `npm start` shell **leaves the `next` child alive on :3000**
  (bit three times on 2026-10-31: a stale server answered every check, a new dev silently took :3001).
  After stopping, list `node.exe` processes whose command line contains `E:TempSiteBlitz
ode_modules` and stop those PIDs.
- Visual QA: `node scripts/shoot.mjs --pages /,/work --widths 320,375,1440 [--rm] [--full] [--cookie sb_admin=<jwt>]`
  (flags horizontal overflow + console errors). Lab perf: `node scripts/vitals.mjs --pages / --runs 3` against `npm start`.
  Git Bash needs `MSYS_NO_PATHCONV=1` or `/` page args get rewritten to Windows paths.
- PowerShell 5.1 has no `&&`. Separate commands, or `;`.
- `shoot.mjs --full` prints the viewport size, but the PNG is full height; `--dpr 2` for crisp assets,
  `--eval "<js>"` (async allowed) to inspect or click in the real browser. Native `loading="lazy"` images
  never loaded in headless shots; images that are the proof (demo cards) use `loading="eager"`.
- Start/stop servers as background tasks and stop them with TaskStop; broad `Stop-Process` patterns are blocked.
  A stale `.next` can fail the build with `ENOENT edge-runtime-webpack.js`: re-run `npm run build` (deleting `.next` is blocked).
- `node_modules` can be missing on this device: `npm ci` first. Marketing captures (`public/demos/*`) come from
  `next start`: dev mode stamps the "N" indicator into screenshots.
- Under machine load (AnyDesk), three tests that import routes in `beforeAll` hit vitest's 10 s hook timeout;
  `npx vitest run --hookTimeout 60000` tells slow from broken. Lab TBT is not comparable then either.
- Photos: Unsplash and Codrops sit behind bot checks — do not bypass. Licensed stand-ins come from Wikimedia
  Commons via the design skill's `photos.mjs search`; credit each in `src/lib/photos.ts` (footer line).
- Scroll scenes: `node scripts/frames.mjs --page / --width 1440 --at "[data-hall]:0.5,#pricing:0.3" [--hover sel]
  [--eval js] [--cookie ..]` shoots one Chrome session at many scroll positions (pinned/sticky scenes; real-mouse hover).
- Admin with data: start the scratch mongod + `next start -p 3100` (see E2E line below), then `node scripts/e2e-seed.mjs`
  runs VERIFY section E 1-6, seeds 12 QA leads and 8 visits through the real API and prints the admin cookie.
- Reference sites: `docs/debate/2026-11-10-motion-reference/tools/ref-scroll.mjs --url <site> --name x [--w 390]`
  scrolls a live site with real wheel events and probes GSAP/Lenis/WebGL/fonts/bytes; tile frames with ffmpeg.
- GSAP rounds px values (`autoRound`): sub-pixel props such as `strokeDashoffset` need `autoRound: false`.
  `overflow: hidden` on an ancestor kills `position: sticky` (it becomes the scroll container): use `overflow: clip`.
  With Lenis on, `scrollIntoView` does not move the page in tests: use `window.__lenis.scrollTo(y, {immediate:true})`.
- E2E without touching production: run the cached `~/.cache/mongodb-binaries/mongod-x64-win32-8.2.6.exe` on a
  scratch dbpath and port, then `next start` with `MONGODB_URI` and test-only `ADMIN_*`, `JWT_SECRET`, `CRON_SECRET` env.

## Conventions — follow these, don't improve them
1. API routes return `{ ok: boolean, ... }`; errors `{ ok:false, error }` with a real status code.
   `/api/track` is the deliberate exception: always 204, never throws.
2. Every route file: `export const runtime = "nodejs"`, plus `dynamic = "force-dynamic"` if DB-backed.
3. Guard DB work with `dbConfigured()` before `dbConnect()`. A missing database degrades the
   feature (503 / WhatsApp fallback), never crashes the page.
4. Server components by default; `"use client"` only for interaction. Decorative or heavy work
   mounts via `Deferred` / `ExperienceLayer` + `next/dynamic`, never on the critical path —
   `/proof` publishes the real-user vitals, so first paint is a product feature here.
5. Animation is declarative: put `data-anim="chars|words|fade-up|mask|scale-in|words-scrub|parallax"`
   (+ `data-delay`, `data-stagger`, `data-now`, `data-speed`) on the markup and let `Motion.tsx`
   build the GSAP scene. Never hand-write GSAP inside a component.
6. Colours come from the `@theme` tokens in `globals.css` — `void, surface, raised, ink, muted,
   faint, volt, violet, warm, line`. No inline hex. Reusable effects are classes in `globals.css`.
   Since 2026-11-10 (D15) the site and the admin share **redesign v4 "showcase"** (`docs/spec/redesign-v4-showcase.md`):
   void #0a0a0c, ink #f5f5f0, volt #ccff00 (text on volt is void), Mona Sans 800 at 125% width (`.display`) with
   Instrument Serif italic accent words (`.serif`) and DM Sans text. `[data-theme="dark"]` on the admin layout is only a
   scope hook now; the root tokens are the same set.
   `--color-warm` fails text contrast: fills and decoration only.
   Tailwind v4 is CSS-first: there is no `tailwind.config.js` and there should not be one. Custom CSS outside a
   layer beats every utility: put helper classes in `@layer components` (`.btn-volt`'s unlayered
   `position: relative` silently overrides the `fixed` utility).
   v4 scenes are data-* hooks built in `Motion.tsx`: `data-draw` (volt strokes, pathLength 100), `data-rise`,
   `data-drift`, `data-hall`, `data-htrack` (adds `.is-track` only when every panel fits), `data-step`, `data-scatter`,
   `data-close` (`.is-lit`). The hero is NOT in Motion.tsx: `hero/ParticleHero.tsx` runs its own rAF, writes `--p` on
   `[data-hero]` for the CSS, and lazy-loads the WebGL engine `hero/particles.ts` (static poster fallback).
   Every scene is its own `schedule()` task and runs through `ctx.add`, or it leaks across client navigations.
7. Honour `prefers-reduced-motion` everywhere; `?motion=force` is the QA override.

## Danger zones
- `src/middleware.ts` — the **only** auth gate for `/admin` and `/api/admin`; no route re-checks.
  Any change here means running section E of `docs/VERIFY.md` against every admin route.
- `src/lib/grader.ts` `isPrivateIp()` / `validatePublicUrl()` — hand-rolled SSRF guard on a
  user-supplied-URL fetcher. Do not weaken. Do not touch before tests exist.
- `src/components/site/Motion.tsx` — 384-line engine; a bad selector kills reveals site-wide, silently.
- `src/app/api/track/route.ts` — swallows every error by design, so bugs here are invisible.
- `ignoreBuildErrors` was removed in P5 — a green build now includes a type check.

## Content rules
- **Prices, payment splits, delivery terms, inclusions/exclusions → `src/lib/offer.ts` only.** Every page
  reads from it; `tests/offer.test.ts` fails if a withdrawn price ($ prices, ₹14,999/₹24,999), "Mumbai",
  an indexing guarantee or an unguarded `SITE.email` reappears in public copy.
- Short copy, FAQs, process steps, work items → `src/lib/site.ts`. Location is "Gujarat-based" (truthful);
  the founder's name/photo never appear. `SITE.emailLive` stays false until the mailbox is send/receive tested.
- Demo sites (`src/lib/demos.ts`, `/demo/*`) are FICTIONAL: noindex, permanent disclosure ribbon, enquiry is
  simulated and collects nothing. Never add a real address, phone, review or result to a demo.
- Ads live in `marketing/ads/` (sources + `render.mjs`); re-render, never hand-edit exports.
- Long-form (deep services, blog posts, industry landers) → JSON in `src/content/generated/`,
  imported explicitly by `src/content/index.ts`. That barrel is hand-maintained on purpose:
  a new file needs a new import line or it silently won't ship.
- Never invent a price, timeline, testimonial, client name or result. If it is not already in
  `site.ts` or the JSON, ask. `/proof` claims every number on this site is verifiable.

## Done means
1. `npm test` and `npm run build` both exit 0.
2. The sections of `docs/VERIFY.md` that cover the change were actually run — not assumed.
3. UI change → a screenshot of each state, incl. reduced-motion — which is also the fastest way to
   *audit* a page (every section renders static and visible). Screenshot over CDP with device
   metrics set; `chrome --headless --window-size` includes browser insets and silently crops.
4. Committed as `<area>: <what changed>`, and pushed.

## Git
- `v2-redesign` is the working branch. `main` is 101 commits behind and is not the deploy source.
  Never push to `main`.
- `v2-redesign` tracks `origin/v2-redesign`. Pushes create Vercel **Preview** deployments only; production is a
  separate step (`docs/DEPLOY.md`).

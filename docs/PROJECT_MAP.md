# Project Map — SiteBlitz

Recon date: 2026-08-20 · branch `v2-redesign` · commit `4ee3cc1`

## Run it

| | |
|---|---|
| install | `npm install` |
| dev | `npm run dev` → http://localhost:3000 |
| build | `npm run build` |
| typecheck | `npm run typecheck` (`tsc --noEmit`) |
| test | **none exist** |
| lint | **none configured** (no eslint/prettier config in repo) |

Env vars (all in `.env.local`, gitignored, never committed):
`MONGODB_URI`, `MONGODB_DB` (default `siteblitz`), `JWT_SECRET`, `ADMIN_EMAIL`,
`ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_IDS`, `CRON_SECRET`.

External services: MongoDB Atlas · Vercel (hosting + `x-vercel-ip-*` geo headers) · Google Fonts.
The app degrades gracefully without Mongo — `dbConfigured()` gates every write and the site still renders.

## Stack

Next.js 15.5 App Router · React 19 · TypeScript 5.7 `strict` · Tailwind v4
(CSS-first `@theme` in `globals.css`, **no `tailwind.config.js`**) · Mongoose 8 ·
`jose` (JWT admin auth) · `zod` 4 (input validation) · GSAP 3 + Lenis (animation) ·
recharts (admin charts) · lucide-react (icons).

## Architecture in 6 lines

1. **Public site** — server components under `src/app/*`, wrapped in `Shell` (Navbar + Footer + deferred animation layer).
2. **Content** — marketing copy is static TS in `src/lib/site.ts`; deep pages (services / blog / industry landers) are JSON in `src/content/generated/`, typed and re-exported by `src/content/index.ts`.
3. **Analytics** — `Tracker.tsx` (mounted in root layout) POSTs pageview/event/leave + real-user CWV to `/api/track`, which upserts `Session`/`Pageview`/`AnalyticsEvent` in Mongo. Cookies: `sb_sid` (30 min), `sb_vid` (1 year), both httpOnly.
4. **Leads** — `LeadForm`/`BookingForm` → `POST /api/leads` (zod + honeypot + scoring) → `Lead` collection. On DB failure the API returns `{ok:false, fallback:"whatsapp"}` and the UI falls back to WhatsApp.
5. **Admin** — `/admin/*` client pages, one page per `/api/admin/*` route, all data via `useApi()`. Auth is a signed JWT cookie `sb_admin`, enforced in `src/middleware.ts` for both `/admin/:path*` and `/api/admin/:path*`.
6. **Deploy** — Vercel, `framework: nextjs`. `NEXT_PUBLIC_BUILD_TIME` / `NEXT_PUBLIC_COMMIT` are baked at build time and shown on `/proof` as live evidence.

## Where things live

| Concern | Path |
|---|---|
| public pages | [src/app/](src/app/) (`page.tsx` per route) |
| public API | [src/app/api/](src/app/api/) — `track`, `leads`, `grade`, `proof` |
| admin pages | [src/app/admin/](src/app/admin/) |
| admin API | [src/app/api/admin/](src/app/api/admin/) |
| auth (server helpers) | [src/lib/auth.ts](src/lib/auth.ts) |
| auth (enforcement) | [src/middleware.ts](src/middleware.ts) — the single gate |
| DB connection | [src/lib/db.ts](src/lib/db.ts) (cached global mongoose) |
| schemas + TS docs | [src/lib/models.ts](src/lib/models.ts) |
| site copy / pricing / FAQs | [src/lib/site.ts](src/lib/site.ts) |
| generated long-form content | [src/content/generated/](src/content/generated/) via [src/content/index.ts](src/content/index.ts) |
| website grader logic | [src/lib/grader.ts](src/lib/grader.ts) |
| design tokens + global CSS | [src/app/globals.css](src/app/globals.css) (`@theme` block) |
| animation engine | [src/components/site/Motion.tsx](src/components/site/Motion.tsx) |
| page chrome | [src/components/site/Shell.tsx](src/components/site/Shell.tsx) |
| admin data hook + formatters | [src/components/admin/useApi.ts](src/components/admin/useApi.ts) |

## Conventions actually used in this codebase

- **API responses are always `{ ok: boolean, ... }`.** Errors: `{ ok:false, error }` with a real status. `/api/track` is the exception — it returns `204` and never errors, because analytics must not break the site.
- **Every API route declares `export const runtime = "nodejs"` and (except `leads`/`login`) `dynamic = "force-dynamic"`.**
- **Missing DB is a first-class state, not a crash.** Guard with `dbConfigured()` before `dbConnect()`; return `503 db_not_configured` or a graceful fallback.
- **Server components by default.** `"use client"` only where interaction is needed (36 files). Anything expensive/decorative loads via `next/dynamic` + `Deferred` inside `ExperienceLayer`, never on the critical path.
- **Animation is declarative, not imperative.** Add `data-anim="chars|words|fade-up|mask|scale-in|words-scrub|parallax"` (+ `data-delay`, `data-stagger`, `data-now`, `data-speed`) to markup; `useAnimEngine` in `Motion.tsx` scans and builds the GSAP scene. Do not hand-write GSAP in a component.
- **Styling is Tailwind utilities + named tokens** (`void`, `surface`, `raised`, `ink`, `muted`, `faint`, `volt`, `violet`, `line`). Reusable effects live as classes in `globals.css` (`.btn-volt`, `.card-hover`, `.sweep-link`, `.tilt-card`). No inline hex colours.
- **`prefers-reduced-motion` is honoured everywhere**, with `?motion=force` as the QA override.
- **Comments explain WHY**, in the existing terse tone. Match it.

## Danger zones

| File / area | Why risky |
|---|---|
| [src/components/site/Motion.tsx](src/components/site/Motion.tsx) | 384 lines, the whole animation engine, no tests. A wrong selector silently kills reveals site-wide. |
| [src/middleware.ts](src/middleware.ts) | The **only** thing protecting `/admin` and `/api/admin`. Individual admin routes do not re-check auth. Break the matcher → the panel is public. |
| [src/app/api/track/route.ts](src/app/api/track/route.ts) | Swallows every error by design. A bug here is invisible — analytics just stops. |
| [src/lib/grader.ts](src/lib/grader.ts) | Fetches arbitrary user-supplied URLs. The SSRF guard (`isPrivateIp`) is hand-rolled — do not weaken it. |
| [src/lib/models.ts](src/lib/models.ts) | Schema + hand-maintained TS interfaces are duplicated. Change one → change both. |
| [src/components/site/sections/Hero.tsx](src/components/site/sections/Hero.tsx), [Shell.tsx](src/components/site/Shell.tsx), [Preloader.tsx](src/components/site/Preloader.tsx) | Highest churn in git history — the parts that keep getting re-tuned for perf. |
| `next.config.ts` → `typescript.ignoreBuildErrors: true` | Type errors **do not fail the build**. Nothing catches them except the editor. |

## Known broken / dead code

- `src/components/site/Aurora.tsx` — zero references.
- `src/components/site/TiltCard.tsx` — zero references (its `.tilt-card` CSS is still in `globals.css`).
- `src/components/site/sections/Work.tsx` — zero references (`WorkGallery.tsx` replaced it).
- `src/lib/services.ts` exports `DEEP_SERVICES: DeepService[] = []` — an empty stub. Only the `DeepService` *type* is used; the real data comes from `src/content/index.ts`. Two exports share one name.
- No `README.md` — deleted in `36d4612`.

## Open questions for the owner

1. `v2-redesign` is 101 commits ahead of `main` and **2 commits ahead of `origin/v2-redesign`** — including the entire `fca3e11` v3 rebuild. Is the plan to merge to `main`, or does Vercel deploy this branch?
2. Is the v3 "proof-first" direction (grader + proof strip + landers) finished, or mid-flight? It landed as a single commit with no spec.
3. `WORK_ITEMS` and `TESTIMONIALS` in `site.ts` name specific clients and results. Real, or placeholder? This decides whether they can be edited freely.
4. Is `src/content/generated/` produced by a script that still exists somewhere, or is it now hand-maintained?

# D2 — Site, mobile, admin and performance audit

Date: 2026-10-31 → 2026-11-01 · Branch `v2-redesign` · Tools: `scripts/shoot.mjs` (CDP screenshots, device metrics,
overflow detection, `--rm`, `--cookie`) and `scripts/vitals.mjs` (lab LCP / CLS / TBT / JS).

## Defects found and fixed tonight

| # | Defect | Where | Evidence | Fix (commit) |
|---|---|---|---|---|
| 1 | Home page scrolled sideways to 565 px at 320-375 px under reduced motion | `BigMarquee` words are `nowrap`; rm rule set `overflow: visible` | shoot `OVERFLOW scrollWidth=565` | clip-x + wrap (`a4beef2`) |
| 2 | Desktop concept gallery hid cards 3+ off-screen under reduced motion | pinned hscroll is off in rm | full-page rm screenshot | wraps into a 2-col grid (`e85a65a`) |
| 3 | Lab LCP 2.9-4.8 s on `/contact`, `/about`, `/services`, `/pricing`, `/work` | first-screen text had `.reveal` (opacity 0 until JS) | vitals: LCP element was the `.reveal` node | headers paint with HTML (`d2650b0`) |
| 4 | 7 page titles rendered "… \| SiteBlitz — SiteBlitz" | pages appended the brand that the layout template already adds | `curl … <title>` | suffixes removed (`181c4ba`) |
| 5 | `/admin/visitors` 931 px wide at 375 px; `/admin/campaigns` 705 px; `/admin` 395 px; capacity input at 320 px | flex/grid children with `min-width:auto` around wide tables | shoot with a local admin cookie | `min-w-0` on main + Card, wrapping header, fluid input (`bb97617`) |
| 6 | Typecheck unusable (OOM) and build ignored type errors | untyped `model()` helper | `tsc` OOM at 6 GB | P5 (`a1b3d51`) |
| 7 | Unsupported claims (results, testimonials, "100% on-time", "Most chosen", `/proof` and `/privacy` wording, `llms.txt`) | see `docs/audit/claims-register.md` | — | C1a-d + X1 |

## Lab performance after fixes (production build, `npm start`, local)

Mobile profile: 4× CPU, 1.6 Mbps / 150 ms RTT, 390×844 @2x, fresh profile (includes the first-visit Preloader), median of 3.

| Page | LCP | LCP element | CLS | TBT | JS |
|---|---|---|---|---|---|
| `/` | 1.78 s | H1 line "THAT WIN" | 0.000 | 98 ms | 192 KB |
| `/pricing` | 1.33 s | H1 | 0.000 | 81 ms | 187 KB |
| `/work` | 1.21 s | intro paragraph | 0.000 | 65 ms | 185 KB |
| `/contact` | 1.12 s | intro paragraph | 0.000 | 87 ms | 186 KB |
| `/about` | 1.16 s | intro paragraph | 0.000 | 88 ms | 190 KB |
| `/services` | 1.15 s | intro paragraph | 0.000 | 62 ms | 184 KB |
| `/website-in-48-hours` | 1.09 s | H1 | 0.001 | 50 ms | 187 KB |
| `/services/business-websites` | 1.40 s | intro paragraph | 0.000 | 160 ms | 185 KB |
| blog post | 1.32 s | first paragraph | 0.000 | 80 ms | 185 KB |
| `/` desktop (no throttling) | 0.75 s | H1 | 0.019 | 286 ms | 188 KB |

These are **lab** numbers from one machine. Field p75 (real users) is what `/proof` publishes and is the acceptance
criterion; it cannot be measured until this build is in production. Desktop TBT 286 ms on home is the WebGL shader +
GSAP boot; INP in the field is the number to watch.

## Responsive coverage verified

- Public: 11 pages × 320/375/768 reduced-motion, 7 pages × 320/390 full motion, home + about × 320-1920 — no overflow,
  no console errors.
- Admin: 10 screens × 320/375/768/1440 with a locally signed admin cookie and no database (so this also covers the
  "database not connected" empty states) — no overflow after fix 5.

## Not covered

- No E2E suite; forms were not submitted end-to-end (no database locally by design — see `docs/DEPLOY.md` R11).
- VERIFY section E (admin auth) manual run against real credentials: not possible (no local or preview credentials).
  Automated equivalent: `tests/admin-routes.test.ts` + `tests/middleware.test.ts`.
- Screen-reader pass and keyboard-only walkthrough: not done.

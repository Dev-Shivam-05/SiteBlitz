# Phases — SiteBlitz

One phase per session. ≤8 files each. A phase that isn't pushed doesn't exist.
Status: `todo` · `doing` · `done` · `blocked`

| # | Phase | One-line goal | Files | Status |
|---|---|---|---|---|
| R0 | Recon | Map the inherited v3 codebase; no source changed | 6 docs | **done** (2026-08-20) |
| H1 | **Hero v4** | Fix the home-page first impression: readable headline, focal-light shader, collision-proof grid | 5 | **done** (2026-08-20) |
| H2/H3 | **Contrast + reduced motion** | Lift `--color-faint` to WCAG AA; stop marquees showing duplicated content under reduced motion | 5 | **done** (2026-08-20) |
| P1 | Safety net | vitest + tests for the SSRF guard and the admin auth gate | 8 | **done** (2026-08-20) — 73 tests, mutation-checked |
| P2 | Push & deploy truth | Set upstream, push `v2-redesign`, confirm all 6 Vercel env vars, record which branch actually deploys | 2 | **done** (2026-10-31) — see `docs/DEPLOY.md` |
| P3 | Defence in depth on admin | `isAdminRequest()` re-check inside every `/api/admin` route so middleware is no longer a single point of failure | 8 | **done** (2026-10-31) — 13 routes + discovery test |
| P4 | Delete the dead code | Remove `Aurora`, `TiltCard`, `sections/Work`, the empty `DEEP_SERVICES` stub, and their orphan CSS | 6 | **done** (2026-10-31) |
| P5 | Restore typecheck | Confirm `tsc --noEmit` completes, drop `ignoreBuildErrors`, fix what surfaces | 3 | **done** (2026-10-31) |
| P6 | Durable rate limits | Move the login and grader throttles off per-instance `Map`s onto Mongo | 4 | todo |
| P7 | README + deploy runbook | Replace the deleted README; document env setup and the release path | 2 | partly — release path in `docs/DEPLOY.md`; README still missing |
| P8 | One source of truth for models | Stop hand-maintaining TS interfaces alongside Mongoose schemas | 3 | todo |

## Now

**Redesign v4 "showcase" is built (D15, V1–V6).** One dark brand for the site and the admin: WebGL particle hero that
flies into a concept phone, drawn volt strokes, drift collage, concept wall, sideways package track, Ctrl+K admin with a
live globe and a leads board. Spec `docs/spec/redesign-v4-showcase.md`. Next: the owner reviews it, then inner pages.

## First-client programme (2026-11-01, built in one execution cycle at the founder's request)

| # | Unit | Status |
|---|---|---|
| S0a | Grader DNS-rebinding fix (connection pinned to validated IPs) + 14 tests | **done** `bada4e7` |
| S0b | Truth: Mumbai → Gujarat, dead email hidden, booking = request, WhatsApp fallback is a tap, withdrawn prices purged | **done** `bdb59e8` |
| D1 | Light design system, new home (demo switcher), /pricing full terms, 3 concept demos | **done** `bdb59e8`, QA `e98e4b5` |
| A2/A3a | Lead ref + phone normalising, Quick-add, Today view, inline edits, Telegram alerts + retry, ad-spend ledger, 08:00 brief cron | **done** (merged), e2e 24/25 → fixed |
| H | Host-neutral geo + Netlify config/scheduled brief | **done** `aa85f7d` — no host switch yet |
| AD | Reel (18 s) + static ad rendered from real demo captures, copy, settings, checklist | **done** `marketing/ads/` |
| DS | Final design decision (new light vs previous dark vs other) | **done** 2026-11-10 — D14, redesign v3 |
| L1 | Production release + host decision + domain + Meta account + WhatsApp Business | **blocked on founder** (approval, logins; design decided D14) |
| A1 | Individual admin accounts (hashed, roles, audit) | todo — before the collaborator gets access |

## Redesign v3 (2026-11-10, one sitting at the owner's "do not stop until the end")

| # | Phase | Status |
|---|---|---|
| R0 | Reference shortlist + ChatGPT debate + locked spec | **done** `0607c70`, `08a377e` |
| R1 | Demos lead with licensed photographs; credits; new demo captures | **done** `b3f46dd` |
| R2 | Tokens, Antonio + DM Sans, pill navbar, photo hero (scroll shrink), giant price, statement, ink footer | **done** `bdef37c` |
| R3 | Stacked demo cards + VISIBLE. type wipe | **done** `7f053d4` |
| R4 | Packages rail, process, assembling promise, native FAQ, ink close, WhatsApp pill, desktop-only Lenis | **done** `9e6cb57` |
| R5 | Production verification + QA fixes (portrait hero crop, focus, tap size, AA contrast) | **done** `7b5c0c1` — gate OPEN 83 (by-design conflicts, see HANDOFF) |
| P-INNER | /pricing, /about, /services, /contact, /work, /proof onto the v4 layout and voice | todo |

## Redesign v4 "showcase" (2026-11-10, owner: "go for all do not stop until everything is done")

Spec: `docs/spec/redesign-v4-showcase.md` (D15). Supersedes v3 visually.

| # | Phase | Status |
|---|---|---|
| V1 | Dark tokens, Mona Sans + Instrument Serif, preloader, cursor, magnetic buttons, volt page curtain | **done** `6f3356d` |
| V2 | WebGL particle hero (wordmark → showroom phone) with static poster | **done** `7f26ffb` |
| V3 | Signature strokes, drift collage + hall of fame, sideways packages, process path, close, footer | **done** `5b6a77d` |
| V4 | Admin shell: command bar, shortcuts, phone tab bar, aria-current, drawer a11y | **done** `dd01c63` |
| V5 | Admin Live globe, Leads board, Overview KPI count-up + sparklines | **done** `c571f9b` |
| V6 | Full verification (public + admin, reduced motion, vitals), handoff, push | **done** `d5de77a` — push: see HANDOFF |

## Multi-page + search (2026-11-10/11, owner asleep 9 h: "build whatever you can; SEO must be extraordinary")

Debate: `docs/debate/2026-11-10-multipage-seo-ranking/` (prompt `siteblitz-seo-multipage`). Run back to back in one sitting
on the owner's explicit 9-hour instruction, each unit committed and verified on its own.

| # | Phase | Status |
|---|---|---|
| SEO-0 | ChatGPT debate: IA, keyword map, city pages, brand + misspellings, technical SEO, perf budget, inner-page motion | doing |
| SEO-1 | Search foundation: route registry (nav, footer, sitemap, llms.txt from one list), real-page nav, footer links every indexable page, one JSON-LD graph (brand entity + alternate names), breadcrumbs, real sitemap lastmod, named AI crawlers, generated llms.txt (the static one said Mumbai, $ and withdrawn prices), v4 OG cards, root-canonical bug | doing |
| SEO-2 | Keyword-mapped title / H1 / meta on every page; new `/faq` | todo |
| SEO-3 | Inner pages (P-INNER) onto v4 with a hero entrance + 1-2 moments each, truthful copy | todo |
| SEO-4 | Keyword pages agreed in the debate (cost guide, Gujarat / city pages, Hinglish guide) | todo |
| SEO-5 | Off-site checklist for the founder (domain, Search Console, Bing, Brave submit, IndexNow, Google Business Profile, directories) | todo |
| SEO-6 | Verification: tests + build, 390/1440 + reduced-motion shots, vitals, structured-data check, handoff | todo |

## Next 3

1. **Owner reviews v4** on `localhost:3000` / the Preview, on a phone first; collect changes in one list.
2. **P-INNER:** `/about`, `/services`, `/work`, `/proof`, `/contact`, `/pricing` onto the v4 layout and voice (≤ 8 files);
   they still carry old copy such as "Violent execution" and "dominate online".
3. **Founder approval** of prices, site and ads, then L1 release on the chosen host (Netlify Free vs Vercel Pro).

## Transformation programme (master prompt v1.1, agreed 2026-10-31)

Order agreed in `docs/debate/2026-10-31-master-prompt-critique/RESULT.md`. On 2026-10-31 the owner said
"go for all … bina ruke" (build everything without stopping), so these ran back to back in one sitting.

| # | Phase | One-line goal | Status |
|---|---|---|---|
| A | Prompt v1.1 | Master prompt v1.1 + project contract + phase brief template + debate prompt v1.1 | **done** (2026-10-31) |
| D1 | Claims + tracking audit | Provenance register for every published claim; tracking vs disclosure | **done** — `docs/audit/claims-register.md` |
| T0 | Screenshot tool | Committed CDP screenshot script with device metrics + reduced-motion mode | **done** — `scripts/shoot.mjs` |
| P2 | Deploy truth | Record which branch deploys where, env vars per environment, release + rollback path | **done** — `docs/DEPLOY.md` |
| C1 | Protective content patch | Remove/relabel unsupported claims; fix `/proof` and `/privacy` wording | **done** (C1a-c) |
| P5 | Restore typecheck | (as above) — 0 errors, 4 s | **done** (2026-10-31) |
| PR1 | Privacy implementation | Retention + user control for analytics, per D1 findings | **done** — GPC/DNT honoured; retention period = owner decision |
| P3 | Admin defence in depth | (as above) | **done** |
| D2–D5 | Audit → research → debate → blueprint | Site/mobile/admin audit, creative directions, real `/debate`, spec-lock | **done** — `docs/audit/d2-site-admin-audit.md`, `docs/debate/2026-10-31-redesign-seo-direction/RESULT.md` (owner waived spec-lock: "go for all") |
| X1+ | Redesign implementation | Approved blueprint, ≤8 files per unit | **X1 done** (home narrative) · SEO S1-S2 done · next: pricing comparison + /proof methodology |
| L1 | Release | Verified preview promoted to production, rollback recorded | **blocked** — agent production deploy denied by permissions; owner runs the command in `docs/DEPLOY.md` |

## Product work

H1 (hero) is done — spec in `docs/spec/hero-v4.md`. The owner's stated #1 priority is the
first impression, so product work now leads and hardening (P1–P8, derived from `docs/RISK.md`)
follows behind it.

Likely next product phases, pending the owner's call:

| # | Candidate | Why |
|---|---|---|
| H2 | Apply the hero's contrast/scrim discipline to the other section backgrounds | The rest of the page has not been reviewed against the new hero |
| H3 | `/work` and `/services` first-screen pass | The two pages a convinced visitor opens next |

## Session split

| Session | Phases | Why grouped |
|---|---|---|
| **"Safety"** | P1, P2 | Nothing else should be changed until a change is verifiable and the work is off this machine. P2 is 10 minutes and belongs with it. |
| **"Harden admin"** | P3 | Touches 8 route files; needs section E of `docs/VERIFY.md` run in full. Alone. |
| **"Cleanup"** | P4, P5 | Both are subtractive and both are verified by the same green build. |
| **"Infra"** | P6, P7 | Shared context: how this thing actually runs in production. |
| **"Models"** | P8 | Schema surgery. Alone, after tests exist. |

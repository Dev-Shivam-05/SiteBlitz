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

**Blocked on the founder: final design decision.** The founder does not like the new light design (`bdb59e8`+) and
will choose between it, the previous dark design (`bada4e7`) or something else. Ask first next session (see
`docs/HANDOFF.md`). Everything else in the first-client programme is built, tested and pushed (`cf34032`, Preview only).

## First-client programme (2026-11-01, built in one execution cycle at the founder's request)

| # | Unit | Status |
|---|---|---|
| S0a | Grader DNS-rebinding fix (connection pinned to validated IPs) + 14 tests | **done** `bada4e7` |
| S0b | Truth: Mumbai → Gujarat, dead email hidden, booking = request, WhatsApp fallback is a tap, withdrawn prices purged | **done** `bdb59e8` |
| D1 | Light design system, new home (demo switcher), /pricing full terms, 3 concept demos | **done** `bdb59e8`, QA `e98e4b5` |
| A2/A3a | Lead ref + phone normalising, Quick-add, Today view, inline edits, Telegram alerts + retry, ad-spend ledger, 08:00 brief cron | **done** (merged), e2e 24/25 → fixed |
| H | Host-neutral geo + Netlify config/scheduled brief | **done** `aa85f7d` — no host switch yet |
| AD | Reel (18 s) + static ad rendered from real demo captures, copy, settings, checklist | **done** `marketing/ads/` |
| DS | Final design decision (new light vs previous dark vs other) | **blocked on founder** — ask first |
| L1 | Production release + host decision + domain + Meta account + WhatsApp Business | **blocked on founder** (design decision, approval, logins) |
| A1 | Individual admin accounts (hashed, roles, audit) | todo — before the collaborator gets access |

## Next 3

1. **Ask the founder the design question**, then keep or restyle (visual layer only, keep truth fixes + offer.ts).
2. **Founder approval** of prices, site and ads, then L1 release on the chosen host (Netlify Free vs Vercel Pro).
3. **Founder logins** (browser): domain (.com recommended), host, Meta Page/Ads, Telegram bot; A1 accounts before the collaborator logs in.

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

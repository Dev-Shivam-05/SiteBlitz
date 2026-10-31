# Risk Register — SiteBlitz

Only things that could bite while modifying this codebase. Recon date 2026-08-20.

## R1 — The v3 rebuild exists on one machine only ✅ CLOSED 2026-08-20

Was: `v2-redesign` sat 2 commits ahead of `origin/v2-redesign` with no upstream tracking, and
those two commits were the entire v3 proof-first rebuild (`fca3e11`) plus the TBT perf work
(`4ee3cc1`). That work existed on one disk.

**Resolved:** `git push -u origin v2-redesign` — pushed `2d2207d..600d7b0`, upstream now tracked.
Verify with `git rev-list --left-right --count origin/v2-redesign...v2-redesign` → `0  0`.

**Stays closed only if** every phase ends with a push, per `CLAUDE.md`.

## R2 — No safety net of any kind ✅ PARTLY CLOSED 2026-08-20

Was: zero tests, zero runner, no lint config — nothing mechanically verified a change.

**Now:** `npm test` runs 73 vitest tests over the two security-critical surfaces — the grader's
SSRF guard and the admin auth gate (`docs/spec/p1-safety-net.md`). Both suites are mutation-checked:
removing the `169.254` guard produces 3 failures, removing the `/api/admin` gate produces 18.

**Still open:** everything else is unverified by machine. No lint config, no UI tests, no CI — so
`docs/VERIFY.md` remains the net for anything outside those two surfaces.

## R3 — Type errors do not fail the build ✅ CLOSED 2026-10-31 (P5)

**Resolved:** the OOM was the untyped `model(name, schema: Schema)` helper in `src/lib/models.ts`
(structural comparison of `Schema<XDoc>` against `Schema<any,…>` defaults). Typed helper + `new Schema<XDoc>`
brought `tsc --noEmit` to ~4 s / ~500 MB with 0 errors; `ignoreBuildErrors` removed. Was:

`next.config.ts` sets `typescript: { ignoreBuildErrors: true }`, with a comment saying the TS
checker OOMs on the mongoose/recharts typings. So `npm run build` succeeding proves nothing about
type safety, and `npm run typecheck` may not be runnable.

**Mitigation:** treat editor diagnostics as the only type signal until this is fixed; do not
interpret a green build as "types are fine".

## R4 — Admin auth is enforced in exactly one file ✅ MITIGATED 2026-10-31 (P3)

**Now:** every `/api/admin` data route calls `requireAdmin()` (`src/lib/auth.ts`) before anything else;
`tests/admin-routes.test.ts` discovers all admin routes from the filesystem and asserts 401 without middleware
(mutation-checked). Admin *pages* still rely on middleware, but they hold no data — it all comes from these APIs. Was:

`src/middleware.ts` is the sole gate for both `/admin/:path*` and `/api/admin/:path*`.
No individual admin route re-checks the session. If the `matcher` is edited, a route is added
outside the matched prefix, or middleware fails to run on a deployment, **the whole admin panel and
all its data APIs become public** — including `/api/admin/export`.

**Mitigation:** never edit the matcher without re-verifying every admin route returns 401 logged out.
Adding a defence-in-depth `isAdminRequest()` check inside the admin routes is a candidate phase.

## R5 — Admin password is a plaintext env comparison

`ADMIN_PASSWORD` is stored and compared in plaintext (`safeEqual` in `src/lib/auth.ts`).
There is no hash, no salt, one shared account. Anyone with access to the Vercel env vars has the
login. `safeEqual` also returns early on length mismatch, so it leaks password length by timing.

**Mitigation:** acceptable for a single-operator panel, but it is a known ceiling. Do not add a
second user on top of this scheme.

## R6 — Rate limits are per-instance and effectively decorative

Both `/api/admin/login` (8 attempts / 15 min) and `/api/grade` (5 / min) use an in-memory `Map`.
On Vercel serverless each instance has its own map, so an attacker spreading requests across
instances is barely limited, and a cold start resets the counter.

**Mitigation:** know that these numbers do not hold in production. Real limiting needs shared state.

## R7 — The grader fetches arbitrary user-supplied URLs (SSRF surface)

`/api/grade` → `gradeWebsite(url)` fetches whatever a visitor types. The protection is a
hand-rolled `isPrivateIp()` covering loopback / private / link-local (incl. `169.254.169.254`) /
CGNAT / multicast. It is careful, but it is bespoke and untested.

**Mitigation:** do not touch `isPrivateIp` or the redirect handling without writing tests first.
This is the single highest-value place in the repo for a characterisation test.

## R8 — Duplicated definitions that must stay in sync

| Duplication | Where |
|---|---|
| Mongoose schema ↔ hand-written TS interface | `src/lib/models.ts` — every field is written twice |
| `DEEP_SERVICES` exported from two modules | `src/lib/services.ts` (empty stub) and `src/content/index.ts` (real data) |
| Admin cookie name `"sb_admin"` | `src/lib/auth.ts` and `src/middleware.ts` (middleware cannot import it — edge runtime) |

## R9 — No migrations, no schema versioning

Mongo collections evolve implicitly. Documents written by earlier versions keep their old shape
forever, and nothing backfills. Any new required field must be treated as optional in reading code.

## R10 — Secrets live only in `.env.local`

Confirmed **not** tracked by git (`.gitignore` covers `.env*`). Also confirmed: no secrets in source.
The flip side is that `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL` and `ADMIN_PASSWORD` exist only on
this machine and in Vercel. There is no third copy.

**Mitigation:** confirm the Vercel project has all six env vars set before relying on it as the backup.
**Checked 2026-10-31 (P2):** Production has 5 of 6 (`NEXT_PUBLIC_SITE_URL` falls back to the code default); see `docs/DEPLOY.md`.

## R11 — Previews and local dev share the production database (found P2, 2026-10-31)

One `MONGODB_URI` is set for Production, Preview and Development in Vercel. Every preview visit, and any
local session using a pulled `.env.local`, writes sessions, pageviews and test leads into production data —
which `/proof` then publishes. Also, Preview has no `JWT_SECRET` / `ADMIN_*`, so admin cannot be tested there.

**Mitigation:** give Preview/Development their own database (or `MONGODB_DB=siteblitz_preview`). Owner action
in the Vercel dashboard; see `docs/DEPLOY.md`.

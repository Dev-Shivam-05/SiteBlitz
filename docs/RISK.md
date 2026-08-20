# Risk Register — SiteBlitz

Only things that could bite while modifying this codebase. Recon date 2026-08-20.

## R1 — The v3 rebuild exists on one machine only ⚠ HIGHEST

`v2-redesign` is **2 commits ahead of `origin/v2-redesign`**, and those two commits are
`fca3e11` (the entire v3 proof-first rebuild) and `4ee3cc1` (the TBT perf work).
The branch also has **no upstream tracking set** (`git config branch.v2-redesign.remote` is empty),
so a plain `git push` does nothing useful.

**Mitigation, do this first:** `git push -u origin v2-redesign`

## R2 — No safety net of any kind

Zero test files, zero test runner, no eslint/prettier config. Nothing mechanically verifies a change.
Combined with R3, a change can be wrong in three ways and still deploy.

**Mitigation:** the manual verification checklist in [docs/VERIFY.md](VERIFY.md) is the interim net.
A real one is Phase 1.

## R3 — Type errors do not fail the build

`next.config.ts` sets `typescript: { ignoreBuildErrors: true }`, with a comment saying the TS
checker OOMs on the mongoose/recharts typings. So `npm run build` succeeding proves nothing about
type safety, and `npm run typecheck` may not be runnable.

**Mitigation:** treat editor diagnostics as the only type signal until this is fixed; do not
interpret a green build as "types are fine".

## R4 — Admin auth is enforced in exactly one file

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

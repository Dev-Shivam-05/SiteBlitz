# Decisions — SiteBlitz

Append-only. One row per decision that a future session might otherwise reopen.

---

## D1 — Incremental, not rewrite (2026-08-20)

**Decision:** SiteBlitz stays on its current stack and is changed incrementally. No rewrite, no
framework migration, no dependency-upgrade side quests.

**Why:** the rewrite test requires *all four* of — runtime out of support, no coverage, domain
re-specifiable in a day, old and new runnable side by side. Only "no coverage" is true here.
Next.js 15 / React 19 / Tailwind v4 are current, the build is green, and the v3 rebuild
(`fca3e11`) is recent work, not legacy debt.

**Reopen only if:** Next.js 15 goes out of support, or a security advisory lands that cannot be
patched in place.

---

## D2 — Tests start at the two places where being wrong is expensive (2026-08-20)

**Decision:** the first test suite covers `isPrivateIp`/`gradeWebsite` input handling and the
admin auth gate. Not broad coverage, not UI snapshots.

**Why:** those are the only two places where a silent regression is a security incident rather than
a cosmetic bug. Everything else is verifiable by eye via `docs/VERIFY.md`.

**Reopen only if:** a third security-relevant surface appears (payments, file upload, a second user role).

---

## D3 — `ignoreBuildErrors: true` stays until proven unnecessary (2026-08-20)

**Decision:** leave `typescript.ignoreBuildErrors: true` in `next.config.ts` for now; do not remove
it as part of an unrelated change.

**Why:** the comment says the checker OOMs on the mongoose/recharts typings. Removing it without
first confirming `tsc --noEmit` runs clean would break every deploy. Its removal is its own phase
with its own rollback.

**Reopen when:** `npm run typecheck` is verified to complete, at which point removing the flag is a
one-line phase.

---

## D4 — Analytics stays first-party and silent (2026-08-20)

**Decision:** `/api/track` keeps returning 204 unconditionally and swallowing every error. No
third-party analytics is added.

**Why:** the privacy page publicly commits to first-party, truncated-IP, no-ad-tracker analytics,
and the site sells "your data, your dashboard". Breaking that would make `/privacy` false.

**Reopen only if:** the privacy policy is updated first.

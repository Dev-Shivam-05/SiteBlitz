# Deploy truth — SiteBlitz (phase P2, verified 2026-10-31)

## Where things deploy

| Fact | Value | How verified |
|---|---|---|
| Vercel project | `shivam-bhadoriyas-projects/siteblitz` (`prj_Qid4Mrj6BK0937BGgZDQHxSWiUAi`) | `vercel project inspect siteblitz` |
| Production URL | https://siteblitz.vercel.app | `vercel project ls` |
| Current production deployment | `siteblitz-jq9kvqway-…` created 2026-07-10 23:20 IST — the same day as commit `fca3e11` (v3 rebuild); no git ref recorded, so it was most likely a CLI `vercel --prod` deploy | `vercel ls siteblitz`, `vercel inspect` |
| Pushes to `v2-redesign` | create **Preview** deployments automatically (one appeared 3 min after the 2026-10-31 push) | `vercel ls siteblitz` |
| Project framework setting | "Vite" in the dashboard, overridden to `nextjs` by `vercel.json` — keep `vercel.json` | `vercel project inspect`, `vercel.json` |
| `main` | far behind `v2-redesign`; never push to it (owner rule) | `CLAUDE.md` |

## Environment variables

| Name | Production | Preview | Development |
|---|---|---|---|
| `MONGODB_URI` | ✓ | ✓ (same value) | ✓ (same value) |
| `MONGODB_DB` | ✓ | — (code default `siteblitz`) | — |
| `JWT_SECRET` | ✓ | — | — |
| `ADMIN_EMAIL` | ✓ | — | — |
| `ADMIN_PASSWORD` | ✓ | — | — |
| `NEXT_PUBLIC_SITE_URL` | — (code default `https://siteblitz.vercel.app`) | — | — |

Consequences:
- **Previews and local dev write into the production database.** One `MONGODB_URI` serves all three environments, so every
  preview visit and every `vercel env pull` dev session lands in production analytics. Recorded as RISK R8.
- **Admin login does not work on previews** (no `JWT_SECRET` / `ADMIN_*` there). Admin can only be verified on production
  or locally with a hand-made `.env.local`.
- `vercel link` / `vercel env pull` writes the production `MONGODB_URI` into `.env.local`. Do not keep it while running the
  screenshot tool, or test visits become production data.

## Release path (used for L1)

1. Push `v2-redesign` → wait for the Preview deployment to be `Ready` (`vercel ls siteblitz`).
2. Verify the preview URL: pages render, `/api/proof` returns `{ ok: true }`, screenshots at 375 and 1440.
3. Promote that exact deployment: `vercel promote <preview-url> --yes`.
4. Record the previous production URL here before promoting, so rollback is one command.

## Rollback

`vercel promote <previous-production-url> --yes` (or `vercel rollback`). The previous production deployment before the
2026-10-31 release is `https://siteblitz-jq9kvqway-shivam-bhadoriyas-projects.vercel.app`.

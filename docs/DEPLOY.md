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
| `NEXT_PUBLIC_SITE_URL` | **required since 2026-11-11** — not set yet; a production build stops without it (`src/lib/release.ts`). Set the approved origin, e.g. `https://siteblitz.vercel.app` today or `https://siteblitz.in` after the domain, no trailing slash | — (fallback `https://siteblitz.vercel.app`) | — |
| `TELEGRAM_BOT_TOKEN` | not set yet (founder creates the bot) | — | — |
| `TELEGRAM_CHAT_IDS` | not set yet — comma-separated chat ids | — | — |
| `CRON_SECRET` | not set yet — random string; Vercel Cron sends it as `Authorization: Bearer …` to `/api/cron/brief` | — | — |

Lead ops (2026-11-01): without the two `TELEGRAM_*` vars every new lead records a `failed` / `telegram_not_configured`
notification, shown on `/admin/today` → Alerts; set them, then press Retry. Without `CRON_SECRET` the daily brief
(`vercel.json` cron `30 2 * * *` = 08:00 IST) answers 503 and sends nothing.

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

## Pending release (2026-11-01)

Commit `f6e0de9` on `v2-redesign` is verified locally: `npm test` 81/81, `npm run build` green with type checking,
`tsc` 0 errors, screenshots 320-1920 px in motion and reduced-motion modes, lab LCP ≤ 1.78 s on every measured page
(`docs/audit/d2-site-admin-audit.md`). The agent's `vercel deploy --prod` was blocked by its permission settings, so the
owner releases it. Deploy from a clean checkout so no local `.env.local` is uploaded:

```powershell
git -C E:\Temp\SiteBlitz worktree add --detach E:\Temp\siteblitz-release f6e0de9
Copy-Item -Recurse E:\Temp\SiteBlitz\.vercel E:\Temp\siteblitz-release\.vercel
cd E:\Temp\siteblitz-release
vercel deploy --prod
```

Then check https://siteblitz.vercel.app (home, /work, /website-in-48-hours, /proof) on a phone, and remove the worktree:
`git -C E:\Temp\SiteBlitz worktree remove E:\Temp\siteblitz-release`.

## Rollback

`vercel promote <previous-production-url> --yes` (or `vercel rollback`). The previous production deployment before the
2026-10-31 release is `https://siteblitz-jq9kvqway-shivam-bhadoriyas-projects.vercel.app`.

# Deploy truth — SiteBlitz (phase P2, verified 2026-10-31)

## Where things deploy

| Fact | Value | How verified |
|---|---|---|
| Vercel project | `shivam-bhadoriyas-projects/siteblitz` (`prj_Qid4Mrj6BK0937BGgZDQHxSWiUAi`) | `vercel project inspect siteblitz` |
| Production URL | https://siteblitz.vercel.app | `vercel project ls` |
| Current production deployment | `siteblitz-pzk36vkzo-…` created 2026-11-12 13:06 IST from commit `aa116dc` (redesign v4 + everything to the outreach engine), by promoting preview `siteblitz-heq3mtc79-…`; promotion rebuilt it with the Production variables | `vercel inspect siteblitz.vercel.app`, `/api/proof` → `"commit":"aa116dc"` |
| Previous production deployment | `siteblitz-jq9kvqway-…` created 2026-07-10 23:20 IST (pre-v2 site) — the rollback target | `vercel inspect` |
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
| `NEXT_PUBLIC_SITE_URL` | ✓ `https://siteblitz.vercel.app` (set 2026-11-12). Required: a production build stops without it (`src/lib/release.ts`). Change it to `https://siteblitz.in` once the domain is attached, then redeploy production | — (fallback `https://siteblitz.vercel.app`) | — |
| `TELEGRAM_BOT_TOKEN` | not set yet (founder creates the bot) | — | — |
| `TELEGRAM_CHAT_IDS` | not set yet — comma-separated chat ids | — | — |
| `CRON_SECRET` | not set yet — random string; Vercel Cron sends it as `Authorization: Bearer …` to `/api/cron/brief` | — | — |
| `OUTREACH_API_KEY` | not set yet — random secret, 32+ characters, the same value as in the lead generator's `.env`. Missing or shorter: every `/api/outreach/*` route answers 503, so the lead generator sends nothing | — (keep unset) | — |
| `OUTREACH_SIGNING_SECRET` | not set yet — random secret, 32+ characters, the same value as in the lead generator's `.env`. Missing or shorter: `/u/` shows an "unavailable" page (503) and the API answers 503 | — (keep unset) | — |
| `OUTREACH_PUBLIC_BASE_URL` | optional — origin used in the snapshot URLs the API returns (`<base>/s/<slug>`), no trailing slash; falls back to `NEXT_PUBLIC_SITE_URL`, then `https://siteblitz.vercel.app`. Must be the production origin: preview URLs sit behind Vercel's deployment protection, which mail providers cannot pass | — | — |

Email engine v2 (2026-11-12, `docs/spec/outreach-contract.md`, D19): `/u/{token}` (unsubscribe), `/s/{slug}` (snapshot
pages) and `/api/outreach/*` (Bearer) are on production only. Set the three `OUTREACH_*` variables in **Production only**:
previews share the production database (R8), so a preview with the secrets could create snapshot pages in it. The website
never sends email. Before the first campaign: any firewall, bot-protection or attack-challenge mode in the host's dashboard
must exclude `/u/` and `/s/` (mail providers POST to `/u/` from their servers and cannot solve a challenge), and the lead
generator's unsubscribe links must use the production origin. To check after deploying: `GET /u/x.y` answers the 400
"link not valid" page (503 means the signing secret is missing), and a `POST /api/outreach/suppressions/check` without a key
answers 401.

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
- The suppression list (`outreach_suppressions`) lives in that same production database and is authoritative. Never point a
  local or preview run that creates test suppressions or snapshots at it; `tests/outreach-db.test.ts` starts its own
  throwaway mongod on 127.0.0.1 for that reason.

## Release path (used for L1)

1. Push `v2-redesign` → wait for the Preview deployment to be `Ready` (`vercel ls siteblitz`).
2. Verify the preview URL: pages render, `/api/proof` returns `{ ok: true }`, screenshots at 375 and 1440.
3. Promote that exact deployment: `vercel promote <preview-url> --yes`.
4. Record the previous production URL here before promoting, so rollback is one command.

## Release 2026-11-12 (v4 to production)

`npm test` 368/368 locally, push `7c94ca1..aa116dc`, preview `siteblitz-heq3mtc79` built Ready, `vercel promote` → production
`siteblitz-pzk36vkzo` Ready. Checked on https://siteblitz.vercel.app: 12 routes answer 200 (home, work, pricing, services,
proof, 48-hour, research, contact, sitemap, robots, admin login, `/api/proof` with `ok:true, db:true, commit:aa116dc`);
canonical and sitemap use the production origin; screenshots at 375 and 1440 (motion) and full-page reduced-motion in
`.shots/prod-2026-11-12*`. Not tested: admin login, lead form, real phones.

## Rollback

`vercel promote https://siteblitz-jq9kvqway-shivam-bhadoriyas-projects.vercel.app --yes` (or `vercel rollback`) — the
pre-v2 production deployment from 2026-07-10.

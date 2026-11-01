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

---

## D5 — Unevidenced client claims are withheld, work shown as concept studies (2026-10-31)

**Decision:** the 4 case-study results, 5 named testimonials, "100% on-time launches" and "Most chosen" are no longer
published. Work items stay as clearly labelled concept studies with an image-free frame.

**Why:** no evidence or permission exists in the repo, and the portfolio images are AI mockups showing other brands and
lorem ipsum (`docs/audit/claims-register.md`). `/proof` promised verifiability. Withheld, not destroyed: git history keeps them.

**Reopen when:** the owner supplies evidence + client permission per claim.

---

## D6 — D3 superseded: type errors fail the build (2026-10-31)

**Decision:** `ignoreBuildErrors` removed. The OOM was the untyped `model()` helper in `src/lib/models.ts`, not the
dependency set. Keep schemas typed `new Schema<XDoc>`.

---

## D7 — D4 amended: browser opt-out signals are honoured (2026-10-31)

**Decision:** `/api/track` still always returns 204, but records nothing and sets no cookies when `Sec-GPC: 1` or `DNT: 1`.
No retention TTL until the owner picks a period (a TTL index would also conflict with the existing `ts` index).

---

## D8 — Home narrative, Preloader and robots policy (2026-11-01)

**Decision:** six-beat home order, H1 unchanged, Preloader kept, robots `*` allow without per-bot groups.

**Why:** agreed over 3 ChatGPT rounds (`docs/debate/2026-10-31-redesign-seo-direction/RESULT.md`); Preloader measured as
not the LCP element (home lab LCP 1.78 s); per-bot groups would not inherit the `/admin` and `/api/` disallows.

---

## D9 — Releases are deployed from a clean worktree (2026-11-01)

**Decision:** production deploys run `vercel deploy --prod` from `git worktree add --detach <dir> <commit>` + copied `.vercel/`.

**Why:** the working copy holds a local `.env.local`; a clean checkout guarantees only tracked files are uploaded.

---

## D10 — Founder facts that bind all copy and plans (2026-11-01)

**Decision:** SiteBlitz is presented as Gujarat-based (the founder works from Navsari; the Mumbai claim was false and
is removed); the founder's name and photo never appear; prices are final with no GST (not registered — re-check with
an accountant); ₹1,000 all-in for November ads (≈ ₹800 media); only the domain may be bought.

**Why:** stated by the founder; truth outranks perceived "urban" credibility (master prompt v3.0 priorities).

---

## D11 — One offer, one source of truth (2026-11-01)

**Decision:** Launch ₹7,999 (1 page, 2 working days after ready-to-build), Business ₹17,999 (3 pages, 7 working days),
Custom by quote; payments ₹4,000+₹3,999 / ₹9,000+₹8,999; "review your homepage concept before you pay" for qualified
buyers (max 3/week). All in `src/lib/offer.ts`, guarded by `tests/offer.test.ts`.

**Why:** debates `docs/debate/2026-11-01-*`. Prices await the founder's explicit go before the public release.

---

## D12 — Host-neutral code; no host switch without a staging pass (2026-11-01)

**Decision:** keep the app deployable on Vercel and Netlify (`src/lib/geo.ts`, `netlify.toml`). Vercel Hobby forbids
commercial use; Netlify Free allows it but pauses all sites at its 300-credit cap and may remove free sites. The
founder chooses: Vercel Pro ($20/mo) or Netlify Free after a staging deploy passes the e2e script.

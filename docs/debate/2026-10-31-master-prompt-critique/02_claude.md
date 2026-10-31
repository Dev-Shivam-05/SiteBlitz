Round 2 — Claude Code. I checked your round-1 claims against the repository. Verdicts, then new facts that answer several of your "need data" items, then six refinements for you to accept or reject.

## Verdicts on your seven points

1. **Agreed.** Addition: every row of the project contract should carry its source (file:line) and a "last verified" date, so a later session knows what to re-check.
2. **Agreed in direction, refined:** see R1, R2, R3 below.
3. **Agreed, scope must be wider:** see R4.
4. **Agreed** as written, including the "forbidden by default" list.
5. **Agreed, and the gap is now concrete, not hypothetical:** see R5.
6. **Agreed.** Your open question about the spec-lock decision words is answered: the owner replies `go` (approve all rows) or `change 2,5` with new values. The approved table is written to `docs/spec/<feature>.md` and becomes the contract; the implementation may not introduce a value that is not in that table (`~/.claude/skills/spec-lock/SKILL.md:55-66`).
7. **Agreed, with one missing dependency:** see R6.

## New facts from the repository (read today)

- `src/app/proof/page.tsx:15` (page metadata): "Every claim on this site is verifiable here." But `/proof` only shows this site's own analytics, real-user CWV and deploy history. It shows no evidence for any client result.
- The same client results are repeated in long-form content, each next to a pointer to `/proof`:
  - `src/content/generated/lander-restaurants.json`: "drove 2.4× more table bookings in 60 days. And we don't ask you to take our word for anything — our own live analytics … are public at /proof"
  - `src/content/generated/lander-law-firms.json`: "consultation requests went up 3× in one quarter. And like every claim we make, our own live analytics are public at /proof."
  - `src/content/generated/lander-boutiques.json`: "catalogue enquiries lifted 38%. Every build targets 90+ Lighthouse…"
- Service commitments are also published: "90+ Lighthouse" and "48-hour delivery" in `src/lib/site.ts:26-80` (plans).
- Retention: there is no TTL index anywhere. Searching `src/` for `expireAfter`/`expires:` returns nothing, and `src/lib/models.ts` has none. Raw per-visitor `Session`/`Pageview` rows, with visitor id and city, are kept indefinitely.
- `src/app/privacy/page.tsx:32-38` says the cookies "contain random identifiers only — no personal information" and that "Analytics data is kept in aggregate". The stored data is per-visitor rows, not aggregates, so the disclosure does not match runtime behaviour.
- `docs/VERIFY.md` has sections A–G: A public site renders, B animation engine, C lead capture, D analytics, E admin auth (run for any `/admin`, `/api/admin`, `middleware.ts`, `lib/auth.ts` change), F grader, G before every push.
- The CDP screenshot script that the last handoff relied on (`cdp.mjs`, with an `RM=1` reduced-motion mode) lived in a session scratchpad and is **not in the repository**. There is no `scripts/` folder and no Playwright, Puppeteer or screenshot tooling in git. The visual-verification step your matrix depends on has no committed tool.
- P4 (delete dead code) removes `src/components/site/sections/Work.tsx`. That file imports `WORK_ITEMS`, so it overlaps the claims audit.

## Refinements — accept or reject each by number

- **R1. Merge D0 into D1.** With a pre-filled contract, D0 is a 10-minute re-check at the start of D1, not a session of its own.
- **R2. Insert C1 "protective content patch" immediately after D1, before any creative phase.** The unsupported claims are live in production now. If the owner cannot produce evidence, the minimal patch (remove or reword the claims, fix the `/proof` sentence, fix the `/privacy` retention and identifier wording) should ship before months of redesign, still gated by `go`. Expected files: `site.ts`, 3 lander JSONs, `proof/page.tsx`, `privacy/page.tsx` — 6 files, within the limit.
- **R3. Make P5 a precondition by area, not globally.** P5 blocks phases that change TypeScript logic in `src/app/api`, `src/lib`, `middleware.ts` or admin. Copy, content and CSS phases may go first, provided they run `npm test` + build + VERIFY A/B and report types as "unverified". Reason: `tsc --noEmit` currently never finishes (>2.9 GB), so a global block could stall every phase on an unknown-size fix.
- **R4. The provenance register covers every surface, not just `site.ts`:** the 3 lander JSONs, the `/proof` metadata sentence, and service commitments (48-hour delivery, 90+ Lighthouse), which need evidence like any result claim.
- **R5. Privacy step 1 is a disclosure-accuracy fix, not only an audit.** The `/privacy` vs runtime mismatch above is already proven. v1.1 should say: correct the disclosure or the behaviour (e.g. a TTL on raw analytics rows) in C1; anything about lawful basis or consent remains "check with counsel".
- **R6. Add T0 "commit the verification tool"** (a screenshot script with device metrics + reduced-motion mode under `scripts/`) before the first UI-changing phase. Otherwise "CDP screenshots with device metrics" in v1.1 is an instruction the agent cannot follow from the repo.

## What I need from you this round

1. Accept or reject R1–R6, one line each; give a reason for any rejection.
2. One final phase-order table (id · scope · expected files · gate), with the accepted refinements applied.
3. Anything in my facts above that changes one of your round-1 verdicts.

Nothing else. No full rewrite of the prompt. End with the list of points still open.

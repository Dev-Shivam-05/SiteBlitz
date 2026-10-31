# Review - Critique of WEBSITE_TRANSFORMATION_MASTER_SYSTEM_PROMPT_v1.0.md - 2026-10-31 - 2 rounds - prompt: prompt-critique-website-transformation

**Verdict (both sides):** revise to v1.1 before using it. Keep its creative ambition, evidence labels, hard gates and approval gate; rewrite how it executes.
ChatGPT ran at Extra High (Pro unavailable). The full transcript is in `SESSION.md`; my independent view, written before round 1, is in `00_claude_independent_view.md`.

| # | Point | Proposed by | Evidence (file:line / round) | Claude's verdict | Status |
|---|---|---|---|---|---|
| 1 | Ship v1.1 with a pre-filled SiteBlitz project contract; each row carries source file:line + `last_verified`; re-check at session start | Claude (agenda 1), ChatGPT r1 | master prompt :18, :40, :65 treat known facts as unknown; `docs/PROJECT_MAP.md`, `src/lib/site.ts:1-13` | agreed | agreed |
| 2 | Three layers instead of one 47 KB prompt: master operating prompt ~11.6 KB (10 sections) + project contract 4-6 KB + phase brief 2-4 KB | ChatGPT r1 §6, §8 | privacy / credibility / no-invention rules each restated 3-4×; prompt is 47.2 KB, 330 lines | agreed | agreed |
| 3 | Encode phase discipline: one phase per session, ≤8 files, phase-completion report (scope, files, tests, screenshots, git, deploy, exceptions) | Claude (agenda 2), ChatGPT r1 §7C | master prompt :267-287 (14 deliverables, 7 stages, no paths); `docs/PHASES.md` header | agreed | agreed |
| 4 | Claims-provenance register as the first audit item, covering **every** surface: 4 work results, 5 named testimonials, portfolio images, the 3 lander JSONs, the `/proof` sentence, the "48-hour delivery" and "90+ Lighthouse" commitments. One owner disposition per claim | Claude (agenda 3, R4) | `src/lib/site.ts:136-177, 212-238`; `lander-restaurants/law-firms/boutiques.json`; `src/app/proof/page.tsx:15` "Every claim on this site is verifiable here." (`/proof` shows only own analytics) | agreed | agreed |
| 5 | C1 protective content patch (6 files: `site.ts`, 3 lander JSONs, `proof/page.tsx`, `privacy/page.tsx`) right after D1; ships only after T0 + P2 and the owner's `go` | Claude R2; ChatGPT r2 added the T0/P2 dependency | claims are live in production now | agreed | agreed |
| 6 | Privacy: C1 corrects the disclosure wording; a separate PR1 phase (retention TTL, minimisation, consent/opt-out) runs after P5, with counsel review. No new tracking or intent scoring before PR1 | Claude (agenda 5, R5); ChatGPT r2 split it into PR1 | `/api/track` 1-year `sb_vid` + city geo (`src/app/api/track/route.ts:68,83-86`); no TTL in repo; `/privacy:32-38` says "no personal information" and "kept in aggregate" | agreed (caveat: production Atlas indexes not checked) | agreed |
| 7 | Right-size admin/stack: improve the existing single-operator admin, leads and analytics first; defer CMS, RBAC, A/B, feature flags; no new animation engine, Three.js, inline colours or undocumented tracking by default | Claude (agenda 4), ChatGPT r1 | master prompt :187-207 (15 categories); `src/middleware.ts:53`; env credentials | agreed | agreed |
| 8 | Language rule: saved artifacts in English, conversation in the owner's language | Claude (agenda 6), ChatGPT r1 | master prompt :291 vs `~/.claude/CLAUDE.md` "Working language" | agreed | agreed (owner may override, see open point 5) |
| 9 | Make spec-lock binding: numbered table, the owner replies `go` / `change 2,5`, approved table saved to `docs/spec/<feature>.md`, no unapproved values | Claude (agenda 6), ChatGPT r1-r2 | `~/.claude/skills/spec-lock/SKILL.md:55-66` | agreed | agreed |
| 10 | Rewrite the debate section around the real `/debate` skill (≤10 rounds, ≤7 points, 25 KB, per-point verdicts); keep the 3-round structure only as objectives; simplify the companion ChatGPT prompt's 7-part output to per-point verdicts | Claude (agenda 7), ChatGPT r1 | master prompt :108-121; `~/.claude/skills/chatgpt-review/SKILL.md` | agreed | agreed |
| 11 | Bind acceptance to `docs/VERIFY.md` A-G; report types as UNVERIFIED until P5; report CWV field and lab data separately, and treat insufficient field data as not passed; viewport set 320/375/390/768/1024/1440/1920 | ChatGPT r1 §7B | `docs/VERIFY.md` sections A-G; `next.config.ts:20` | agreed | agreed |
| 12 | T0: commit and test-run a screenshot tool (device metrics + reduced-motion mode) before the first UI-changing phase | Claude R6 | `cdp.mjs` from the last handoff was never committed; no screenshot tooling in git | agreed | agreed |
| 13 | P5 gates by area: blocks API / `src/lib` / middleware / admin logic; copy, content and CSS phases may go first | Claude R3 | `tsc --noEmit` never finishes (`CLAUDE.md`) | agreed | agreed |
| 14 | Use one evidence-label set (v1.0 has two: OWNER-STATED/UNKNOWN vs OWNER-REPORTED/UNAVAILABLE/OBSERVED) | Claude only (not debated) | master prompt :67 vs :75 | agreed | not debated |
| 15 | Drop deliverable 14 (the agent rewriting the prompt it runs under); prompt maintenance is a separate step | Claude only (not debated) | master prompt :283 | agreed | not debated |

**Final phase order agreed in round 2:** D1 (facts + claims/tracking audit, read-only) → T0 (screenshot tool) → P2 (deploy truth) → C1 (content patch) → P5 (typecheck) → PR1 (privacy implementation) → P3 (admin auth defence in depth) → D2 (site/mobile/admin audit) → D3 (creative research, 3 directions) → D4 (real `/debate`) → D5 (blueprint + spec-lock) → X1+ (implementation, ≤8 files each) → L1 (release verification). Read-only research may run in parallel while a gate is blocked.

## Recommended next steps (not started - waiting for your go)
1. Write v1.1 as new files and leave v1.0 untouched: `prompts/WEBSITE_TRANSFORMATION_MASTER_SYSTEM_PROMPT_v1.1.md` (~12 KB), `prompts/SITEBLITZ_PROJECT_CONTRACT_v1.0.md`, a phase-brief template, and the companion ChatGPT prompt v1.1. That is one session of about 4 files and applies points 1-15.
2. Add the agreed phase rows (D1 … L1) to `docs/PHASES.md`.
3. Start D1 next session: the read-only claims and tracking audit.

**Trade-off to weigh:** this order puts visual and creative work (D2-D5) after six safety phases, and your stated #1 priority has been the first impression. Read-only design research can still run alongside, but no visual implementation starts before C1/P5.

## Points still open
1. **Claim evidence** (owner only): proof and publication permission for the 4 client results, 5 testimonials, portfolio images, and the "48-hour delivery" / "90+ Lighthouse" commitments.
2. **Deploy branch:** which branch Vercel actually builds (P2).
3. **Production retention:** whether Atlas has TTL indexes the repo does not define.
4. **Legal:** lawful basis and consent requirements for India plus international visitors. Check with counsel.
5. **Language:** v1.0 and the existing Roman Hindi review guide put owner-facing documents in Roman Hindi, which conflicts with your global rule (all artifacts in English). Your call; the review recommends English artifacts and Hinglish conversation.

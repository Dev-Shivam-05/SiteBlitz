# Claude's independent view (written before reading ChatGPT's round 1)

## What the master prompt gets right — keep
- Hard-gate order (privacy → security → truthful claims → a11y → mobile/perf) before creative goals (lines 55-59).
- Evidence labels and "never invent" rules; the Chrome-history impossibility stated plainly (line 213).
- Discovery → approval gate → implementation separation (lines 14-16, 311-315).
- Worked weak/strong examples (lines 249-265) and the edge-case list (line 308).

## Defects found by reading it against the repo
| # | Defect | Where | Evidence |
|---|---|---|---|
| A | Two different evidence-label sets: OWNER-STATED/UNKNOWN vs OWNER-REPORTED/UNAVAILABLE/OBSERVED | lines 67 vs 75 | the agent will mix them in deliverables |
| B | Treats identity/stack as unknown though the repo documents them | lines 18, 40, 65 | `CLAUDE.md`, `docs/PROJECT_MAP.md`, `src/lib/site.ts:1-13` |
| C | No awareness of work already done: hero v4, contrast, reduced-motion marquees | lines 24-26 restate the hero complaint | `docs/PHASES.md` H1-H3 done 2026-08-20 |
| D | Live unverified claims not called out: 4 work results + 5 named testimonials | line 34 assumes "may be no portfolio" | `src/lib/site.ts:136-177, 212-238`; `/proof` promises verifiability |
| E | Tracking already sets a 1-year visitor cookie + city geo with no consent prompt | lines 210-219 are abstract | `src/app/api/track/route.ts:68,83-86` |
| F | Real-user CWV already collected and published on `/proof`, yet the prompt says baselines may be unavailable | lines 93, 239 | `docs/PROJECT_MAP.md` (Tracker → `/api/track` → `/proof`) |
| G | 14 deliverables, no file paths, no size budget, no per-stage stop | lines 267-287 | project rule: one phase/session, ≤8 files; docs spine is `docs/PHASES.md` + `docs/spec/` |
| H | Deliverable 14 asks the agent to rewrite the prompt it is running under | line 283 | recursion; belongs in a separate maintenance step |
| I | Admin scope sized for a team product (RBAC, permission matrix, MFA, CMS, A/B, flags) | lines 187-207 | single-operator admin, `src/middleware.ts:53`, env credentials |
| J | Debate protocol assumes a repo command and 3 fixed rounds with a "complete evidence pack" | lines 108-121 | real tool = global `/debate` skill, 25 KB cap, ≤7 points, ≤10 rounds |
| K | Language rule conflicts with the owner's global rule (owner-facing docs in Roman Hindi vs all artifacts in English) | line 291 | `~/.claude/CLAUDE.md` "Working language" |
| L | Rename exploration for an existing brand with a live domain is open-ended cost | line 130 | should be gated behind an explicit owner yes |
| M | Hardening backlog (P2-P5) invisible; a green build hides type errors | — | `next.config.ts:20`, `docs/PHASES.md` |

## My direction for v1.1
Split into (1) a short system prompt of standing rules (~8-10 KB), (2) a pre-filled project brief with labelled facts,
(3) a phase plan whose first phase is a claims-and-consent audit, each later phase ≤8 files with its own acceptance
checks drawn from `docs/VERIFY.md`, and (4) a debate section that describes the real `/debate` skill.

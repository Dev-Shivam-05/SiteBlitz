## The owner's request

"Analyze prompts/WEBSITE_TRANSFORMATION_MASTER_SYSTEM_PROMPT_v1.0.md" — critique the master prompt
(attached) before it is used to drive the SiteBlitz transformation. Its companion prompt for you,
`prompts/CHATGPT_INDEPENDENT_DEBATE_SYSTEM_PROMPT_v1.0.md`, is included in the context below so you can
judge the pair.

## Agenda

1. **Generic vs project-aware.** The prompt treats product name, sector, stack and debate tooling as unknown, but `CLAUDE.md`, `docs/PROJECT_MAP.md` and `src/lib/site.ts` already establish them (SiteBlitz, Mumbai web studio, 48-hour sites from ₹7,999, Next.js 15 + Mongo + Vercel). Should v1.1 ship with a pre-filled, labelled input contract, and what should stay generic?
2. **Scope vs session discipline.** 14 deliverables and 7 stages in one "initial phase" collide with the project rule "one phase per session, ≤8 files" and with the open hardening backlog in `docs/PHASES.md` (P2 deploy truth, P3 admin defence in depth, P5 broken typecheck + `ignoreBuildErrors`). How should the prompt be cut into executable phases, and where does hardening sit relative to the redesign?
3. **Credibility gate vs content already live.** `site.ts` ships 4 work items with specific results (2.4× bookings, 38% lift, 3× consultations, page 1 for 8 keywords) and 5 named testimonials; their provenance is not recorded anywhere in the repo. The prompt says "there may be no verified portfolio" but never orders a provenance audit of claims already shown as fact. Should that be step 1, with an explicit owner decision per claim?
4. **Admin and stack overreach.** The prompt asks for a 15-category admin catalogue, permission matrix, RBAC, MFA, CMS, A/B testing, feature flags, Three.js/Canvas/video. Reality: a single-operator admin (one JWT cookie, one email/password), content in TS/JSON with no CMS, a declarative GSAP + Lenis engine. What is the right-sized cut, and what should the prompt forbid outright?
5. **Privacy against the code that exists.** `/api/track` already sets a 1-year `sb_vid` cookie and stores city-level geo from Vercel headers, with no consent mechanism in `src/`. Visitors are India plus international (USD pricing). The prompt discusses consent abstractly. What concrete instruction should it give about the current tracking before any "intent intelligence" work?
6. **Prompt engineering quality.** 47 KB (~11k tokens) as a system prompt; the privacy, credibility and no-invention rules are each restated 3-4 times; owner brief, operating rules and deliverable spec are mixed. It also conflicts with the owner's global rules: it says write owner-facing analysis in Roman Hindi, while the owner's global `CLAUDE.md` says write all artifacts (specs, docs) in English; it never routes vague adjectives through the owner's `spec-lock` step (propose exact values in a numbered table, wait for one word). What should be cut, merged or re-ordered?
7. **Debate protocol and acceptance fit to the real tools.** The prompt assumes a project "debate command" with 3 fixed rounds and a "compact but complete evidence pack". The real tool is a global `/debate` skill: temporary ChatGPT chat driven from the browser, ≤10 rounds, ≤7 agenda points, a 25 KB context cap, Claude gives a verdict per point (agreed / rejected with file:line / open). Acceptance criteria assume user tests and field CWV, while the repo has `docs/VERIFY.md`, CDP screenshots with device metrics, and a reduced-motion audit technique. How should both sections be rewritten so they can actually be executed and checked?

Answer each agenda point by number: agree / disagree because ... / need data: ... . End with the list of points still open.

Then, as a last section, give the outline of a v1.1 of the master prompt (section names, one line each, target size in KB).

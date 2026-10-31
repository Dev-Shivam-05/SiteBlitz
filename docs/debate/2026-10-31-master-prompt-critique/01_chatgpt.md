SiteBlitz — Master System Prompt v1.0 Review
Verdict: Revise before execution
Overall assessment: The master prompt is strategically strong, but it is too broad and insufficiently adapted to the actual SiteBlitz codebase to function reliably as an autonomous coding-agent instruction.

My recommendation is to retain the creative ambition, evidence standards, and approval gates, but substantially rewrite the execution instructions in v1.1.

The revised prompt should be:
- Project-aware: Use known SiteBlitz facts rather than repeatedly rediscovering them.
- Risk-first: Address existing credibility, privacy, authentication, and build-verification weaknesses.
- Incremental: Respect one phase per session, a maximum of eight changed files, and the owner's approval requirements.
- Stack-native: Extend the existing Next.js, Tailwind, GSAP, and MongoDB architecture instead of encouraging unnecessary technology changes.
- Verifiable: Require actual evidence, tests, screenshots, and recorded decisions.
Evidence limitation: I inspected the two attached documents, including the repository excerpts supplied by Claude Code. I have not independently opened the SiteBlitz repository, running website, or production database. Repository-specific conclusions below are grounded in those supplied excerpts, and runtime findings still require direct verification. 
Pasted text.txt


1. Generic vs project-aware
Verdict: AGREE — v1.1 needs a pre-filled, evidence-labelled SiteBlitz context.

The existing instruction at WEBSITE_TRANSFORMATION_MASTER_SYSTEM_PROMPT_v1.0.md:18 states:
Inspect the repository before assuming the product name, business sector, target market, technology stack, existing prompt location, or available debate tooling.

This is appropriate for an unknown project, but inefficient when Claude already has an established project map.
Recommended replacement
This assignment concerns SiteBlitz. Load CLAUDE.md, docs/PROJECT_MAP.md, docs/PHASES.md, docs/RISK.md, and docs/VERIFY.md before planning work. Use the supplied SiteBlitz project contract as the initial context, verify its critical facts against the current repository, and record discrepancies. Do not rediscover documented facts unless the evidence is stale or contradictory. Distinguish information present in source code from independently verified business claims.

Pre-filled project contract
Field	Current evidence	Status
Product	SiteBlitz	Repository-reported
Business	Mumbai web-design studio, founded 2024	Site claim; external truth unverified
Positioning	Websites that win business, shipped in 48 hours	Existing copy
Entry price	₹7,999 / $99	Existing pricing configuration
Services	Business websites, e-commerce, booking, landing pages, redesign, SEO, care plans	Source-listed
Frontend	Next.js 15.5, React 19, TypeScript, Tailwind v4	Repository-reported
Database	MongoDB / Mongoose	Repository-reported
Animation	GSAP 3 + Lenis, declarative animation engine	Repository-reported
Hosting	Vercel	Configured; live deployment branch needs verification
Admin	Single-operator dashboard with JWT-cookie authentication	Repository-reported
Content	src/lib/site.ts plus JSON files	Repository-reported
Working branch	v2-redesign	Reported; recheck Git state
Debate mechanism	Global /debate skill	Reported; verify availability at execution
Live domain and performance	Requires direct inspection	Not independently verified

What should remain generic?
The reusable rules should still cover truthful content, security, accessibility, mobile reliability, responsible analytics, meaningful animation, and evidence-based design.

However, project facts should live in a separate, versioned SiteBlitz evidence contract, not be duplicated throughout the system prompt. This allows the agent to adapt when the repository changes without rewriting its operating principles.

Need data: The actual live deployment URL, current branch/commit, and deployment configuration remain to be confirmed.

2. Scope vs session discipline
Verdict: AGREE — the current scope conflicts with the project's execution rules.

The master prompt currently asks for 14 deliverables and seven stages, while presenting the initial assignment as one broad discovery-and-proposal phase. 
WEBSITE_TRANSFORMATION_MASTER_SYSTEM_PROMPT_v1.0.md

But SiteBlitz's documented operating constraints are:
- One phase per session.
- Maximum eight changed files per phase.
- Commit each completed working unit.
- Never push to main.
- Verify before marking a phase complete.
The prompt must make these operational limits explicit.
Recommended replacement
Replace the instruction beginning:
This initial assignment is to audit the project, research, debate options, produce a detailed transformation proposal, and prepare reviewable artifacts.

With:
Execute the transformation as a sequence of independently verifiable phases. Each session handles exactly one approved phase, changes no more than eight files, and ends with an evidence-based completion report. Discovery sessions are non-destructive. Implementation requires explicit owner approval, a locked specification, relevant verification, and a reviewed commit. Never combine unfinished phases or bypass unresolved safety gates to accelerate visual redesign.

Proposed executable sequence
Phase	Scope	Gate / dependency
D0	Refresh project identity, repository state, and constraints	Read-only
D1	Audit existing claims, testimonials, tracking, and major risks	Read-only; report urgent findings
D2	Audit website, mobile, admin, and current baselines	Read-only
D3	Research creative references and prepare distinct concepts	D0–D2 findings
D4	Run actual independent debate and record decisions	Evidence pack ready
D5	Produce recommended blueprint and spec-lock decisions	Owner approval required
P2	Establish deployment branch and environment truth	Before production release
P3	Add server-side admin authorization checks	Before expanding admin functionality
P5	Restore reliable TypeScript checking	Before substantial implementation expansion
X1 onward	Implement individually approved website/admin improvements	One phase per session, ≤8 files

D0–D5 are proposed planning phase identifiers, not claims that these phases already exist in the repository.
Where should hardening sit?
Hardening should run alongside the redesign programme at explicit dependency points, rather than being postponed until all design work is complete or blocking read-only design research.

P2 should be resolved before deploying changes. P3 should be completed before extending sensitive admin APIs. P5 should be prioritised before large code changes because typescript.ignoreBuildErrors: true means a successful production build cannot establish type correctness.

The existing H1 hero and H2/H3 contrast/reduced-motion work are reported as complete. They should be assessed and preserved unless evidence justifies changing them again.

Need data: Confirmation of which branch Vercel actually deploys, and approval to undertake the existing P2/P3/P5 backlog.

3. Credibility gate vs content already live
Verdict: AGREE — this is the most important missing content-control instruction.

The master prompt says:
There may currently be no independently verified portfolio or case studies.

This is too passive for the reported SiteBlitz situation.

The supplied repository findings identify four portfolio entries containing numerical results and five named testimonials, but no recorded provenance in the supplied repository audit.

That does not establish that the claims are false. It establishes that their substantiation is currently unavailable to the reviewer.

The concern is particularly significant because SiteBlitz's /proof page reportedly asserts that every number published on the website is verifiable.
Recommended replacement
Before generating new copy, redesigning proof sections, or repeating current success claims, complete a provenance audit of every existing portfolio result, named testimonial, numerical achievement, credential, and client logo. For each claim, record its exact published wording, source location, supporting evidence, publication permission, verification status, and explicit owner decision. Treat unsupported published claims as an urgent credibility risk. Do not infer that a claim is fabricated merely because evidence is missing. Propose correction, removal, or withholding from future reuse where evidence remains unavailable; do not modify production content without approval.

Mandatory provenance register
Claim presently reported in the site	Evidence required	Initial status
2.4× bookings	Before/after booking records, period, calculation, attribution	Unverified
Page 1 for 8 keywords	Keywords, dates, location/device context, search evidence	Unverified
38% improvement	Metric definition, baseline, measurement window	Unverified
3× consultations	Baseline counts, period, source attribution	Unverified
Five named testimonials	Authentic statements, identity confirmation, publication consent	Unverified
Portfolio images	Origin, ownership, relevant project association, usage rights	Rights unverified

Every record should receive one explicit owner disposition: Verified and retain, Correct with documentation, Replace with substantiated wording, Remove, or Pending evidence.

For any claim that remains unsupported, the agent should flag the risk immediately and propose a separately approved protective content patch rather than silently continuing to publish or amplify it.

Need data: The supporting records and publication permissions for the four portfolio items and five testimonials.
4. Admin and technology-stack overreach
Verdict: AGREE — reduce the implementation scope substantially, but preserve future options as research items.

The existing prompt says:
Research competing admin/CMS/CRM and analytics patterns and prepare a broad, categorised feature catalogue.

The 15-category catalogue is useful for long-term exploration, but inappropriate as an implicit implementation requirement for a single-operator business.

SiteBlitz already has an admin panel, analytics pipeline, lead handling, and an animation system. The right first move is to improve their reliability and usefulness.
Recommended replacement
Treat the existing SiteBlitz architecture as the default. Audit current modules before proposing replacements. Prioritise lead handling, accurate analytics, operational reliability, authentication hardening, and admin usability for the current single operator. Consider additional CMS, user roles, experimentation, automation, or rendering infrastructure only when a documented operational need justifies the cost and the owner approves a separate implementation phase.

Right-sized admin priorities
Feature	Recommendation	Reason
Existing dashboard and analytics	Retain and improve	Already implemented
Lead management and follow-up	High priority	Direct commercial value
Admin API authorization	High priority	Existing P3 security risk
Analytics accuracy and health	High priority	Trustworthy decisions
Content management	Defer new CMS	TS/JSON workflow exists
Multi-user RBAC	Defer	Single operator currently
MFA	Evaluate separately	May improve security; not necessarily a redesign requirement
A/B testing	Defer	Requires sufficient traffic and a testable hypothesis
Feature-flag platform	Defer	No demonstrated need
Three.js / additional Canvas engine	Do not introduce by default	Existing GSAP engine
Complex automated intent prediction	Defer	Privacy and data-quality dependencies

What should be forbidden outright?
The agent must not introduce parallel animation engines when the existing declarative system can perform the task, bypass the project's authentication conventions, weaken the SSRF guard, hardcode new colours outside the established tokens, introduce undocumented tracking, or create new performance-critical dependencies without a validated need.

Specifically, preserve these project conventions:
- src/components/site/Motion.tsx remains the central GSAP animation mechanism, using data-anim attributes.
- Tailwind v4 @theme tokens remain the colour source of truth.
- Server Components remain the default; heavy decorative experiences use deferred loading.
- API routes retain their established response and database-failure contracts.
- src/content/index.ts remains the explicit import registry for generated content.
A new CMS, multi-user authorization system, or rendering library is not permanently prohibited. It requires a separate architecture decision, demonstrated need, risk assessment, and owner approval.

Need data: Which existing admin screens are genuinely used daily, which operations are slow or unreliable, and whether additional staff accounts are planned.

5. Privacy: review what the existing code actually collects
Verdict: AGREE — the current privacy section needs a concrete existing-system audit before any new tracking or intent intelligence.

The master prompt currently says:
Evaluate relevant laws and consent requirements based on the verified visitor jurisdictions and implementation, rather than assuming one universal legal regime.

That principle is correct, but it does not instruct Claude to examine the already deployed analytics mechanism as an immediate risk.

According to the supplied repository evidence:
- sb_sid is a 30-minute HTTP-only session cookie.
- sb_vid is a persistent HTTP-only visitor cookie lasting one year.
- The tracking endpoint uses Vercel geographic headers, including city, region, country, and timezone.
- The privacy page describes collection.
- No consent or opt-out mechanism was found in the examined source.
These facts require technical and legal review; they do not, by themselves, establish unlawful processing.
Recommended replacement
Before proposing or implementing visitor-intent intelligence, audit the existing /api/track implementation, all cookies, geographic collection, privacy disclosures, retention practices, consent mechanisms, opt-out handling, and administrative access to collected data. Document each collected field, purpose, persistence period, lawful-basis question, user control, and downstream use. Identify gaps requiring counsel review and prepare a minimal corrective proposal. Do not expand persistent tracking, visitor profiling, or geographic enrichment until the applicable data-protection requirements and owner-approved controls have been established.

Mandatory audit tasks
Existing component	Required verification
sb_sid	Creation trigger, purpose, expiry, storage and classification
sb_vid	Persistent identification, necessity, user choice, deletion and retention
/api/track	Exact events, identifiers, request behaviour and failure handling
Vercel geography	Precision, necessity, accuracy, storage, visibility and retention
/privacy	Disclosure accuracy and consistency with runtime behaviour
Opt-out and consent	Actual implementation, enforcement and consent withdrawal where applicable
Historical data	Retention, access, deletion/anonymisation options and legal review
Admin analytics	Role protection, access logs, exports and data minimisation

Required decision gate
Until this audit is complete, Claude should not build behavioural lead scoring, additional tracking cookies, visitor fingerprinting, cross-site identification, or inferred future browsing predictions.

If deficiencies are confirmed, Claude should prepare a separately approved corrective phase. Depending on the legal review, options may include restricting non-essential collection, adding suitable user controls, shortening retention, or using appropriately aggregated data.

The relevant jurisdictions and legal requirements must be checked with counsel. USD pricing indicates international targeting, but does not independently establish which countries' residents actually visit the site.

Need data: Actual visitor jurisdictions, the complete tracking data schema, retention behaviour, and the approved legal basis for existing analytics.

6. Prompt engineering quality
Verdict: AGREE — compress, separate concerns, and implement the owner's spec-lock rule.

I confirmed that the attached master prompt contains approximately 47.2 KB and 330 lines.

The problem is not simply token consumption. A long prompt that repeatedly expresses the same aspiration can make instructions less actionable, especially when a coding agent must work within strict session boundaries.

The main redundancies are:
Existing sections	Recommended consolidation
Identity, mission, owner's vision, primary objectives	One concise project mission
Priority rules, evidence policy, quality assurance	One non-negotiable quality and evidence contract
Brand, content, site architecture, cinematic motion	A phase-specific creative and UX brief
Contact, lead intelligence, admin features	A scoped product and data-system brief
Measurement and completion conditions	One verifiable acceptance contract
Research, deliverables and execution stages	A phased workflow with a single output per session

Correct the language instruction
The existing prompt says:
Write the owner-facing analysis, review summary, coverage report, open decisions, and progress explanations in clear Roman Hindi.

Replace with:
Write all saved project artifacts, specifications, design documentation, technical reports, prompts, and developer-facing content in professional English. Use the owner's requested language for conversational explanations without changing the language of project artifacts. Preserve exact code identifiers, file paths, and technical terminology.

This respects the global artifact-language rule while preserving flexibility for conversation.
Add the missing spec-lock procedure
The master prompt uses qualitative phrases such as award-calibre, cinematic, premium, and exceptionally intuitive.

Those are useful creative ambitions, but insufficient implementation specifications.

Insert:
Before implementing any subjective or ambiguous design request, convert it into a numbered spec-lock table containing concrete design parameters, user outcomes, measurable acceptance conditions, and relevant trade-offs. Present the table and wait for the owner's required one-word decision before modifying the implementation. Read-only discovery and research may continue without treating unapproved aesthetic choices as final.

For example:
#	Ambiguous request	Proposed measurable specification
1	Cinematic homepage	A service-related storyboard with defined scenes and a complete static alternative
2	Premium appearance	Approved type scale, spacing system, contrast, imagery and visual consistency rules
3	Perfect mobile experience	No critical functional defects at tested viewport sizes from 320px upward
4	Fast website	Core Web Vitals targets, measured by documented methods
5	Outstanding admin UX	Defined daily tasks with measurable completion and error criteria

These are proposed specifications, not automatically approved design decisions.
Recommended prompt structure
Use three layers rather than a single oversized prompt.
A. Master operating prompt

10–13 KB



Authority, guardrails, phase execution, verification and stopping rulesB. SiteBlitz evidence contract

4–6 KB



Current project facts, exact paths, known risks, capabilities and unknownsC. Individual phase brief

2–4 KB



One bounded task, affected files, decisions, tests and completion criteria
This separates durable operating instructions from changing project evidence and the current task.

Need data: The exact accepted spec-lock decision words and any additional requirements defined in the owner's global Claude instructions.

7. Debate protocol and acceptance criteria
Verdict: AGREE — rewrite both around the actual SiteBlitz tools.

The current prompt refers to:
The project's existing "debate" command

The evidence instead describes a global /debate skill that works through a temporary ChatGPT session in the developer's logged-in browser. Its constraints are known, and should replace the generic debate assumptions.
A. Replacement debate instructions
Verify and read ~/.claude/skills/chatgpt-review/SKILL.md before invoking /debate. Treat it as a global Claude skill, not a repository shell command. Respect its maximum of 10 rounds, seven agenda points, and 25 KB context per evidence pack. Prepare a concise, sanitised SiteBlitz evidence pack and obtain independent criticism using the supported browser workflow. For each agenda item, record an agreed, rejected, or open verdict. Rejections must include relevant source file and line evidence where available. Preserve the actual debate record, decisions, and unresolved issues. Never invent a debate or use a simulated independent model response as genuine collaboration.

The proposed independent-proposal, adversarial-review, and synthesis structure remains valuable. However, these should be debate objectives, not rigidly mandated rounds that ignore the skill's own operating requirements.

The supplied companion prompt, CHATGPT_INDEPENDENT_DEBATE_SYSTEM_PROMPT_v1.0.md, is largely compatible with this approach. I would retain its critical-review role and simplify its seven-part output contract to match the per-point verdict mechanism.
B. Replace generic acceptance with repo-specific verification
The master prompt currently describes comprehensive testing without connecting it strongly enough to docs/VERIFY.md.

Replace with:
For every implementation phase, treat docs/VERIFY.md as the canonical existing verification checklist. Run applicable checks, record actual results, and provide relevant CDP screenshots with explicit device metrics. Use the project's established reduced-motion tests and animation overrides. Run npm test and npm run build where required, ensuring the development server is stopped before production build. Do not use the known-broken TypeScript check as a routine step until P5 resolves it. A successful build alone must not be reported as proof of type correctness while ignoreBuildErrors remains enabled.

Verification matrix
Test	Current mechanism	Required evidence
Existing unit tests	npm test	Actual result and test count
Build	npm run build with development server stopped	Exit status, relevant warnings
TypeScript	Known broken until P5	Explicitly unresolved or actual restored check
Visual QA	CDP screenshots with device metrics	Captures, dimensions, observed defects
Responsive	Targeted viewport matrix	Recorded widths, functional outcomes
Reduced motion	prefers-reduced-motion, plus QA override	Static and motion-state screenshots
Admin security	docs/VERIFY.md authorization checks	Protected-route results
Lead delivery	API checks and WhatsApp fallback	Successful, failed, and recovery cases
Performance	/proof field metrics where reliable, plus lab tests	Data source, period, sample and result
Accessibility	Automated checks and manual keyboard/interaction checks	Defect register and retest results
Human usability	Representative user tests when actually conducted	Participant scenarios and observations

For responsive verification, begin with widths such as 320, 375, 390, 768, 1024, 1440, and 1920 CSS pixels, and include relevant orientation changes. These are proposed test points, not a claim of current coverage.

For Core Web Vitals, retain the v1.0 targets of LCP ≤2.5 seconds, INP ≤200 milliseconds, and CLS ≤0.1 at the 75th percentile. Real-user and laboratory measurements must be reported separately. A page without sufficient real-user data must be marked insufficient field evidence, not passed.

The repository reportedly has 73 Vitest tests, no linter, and no end-to-end framework. The absence of automated E2E coverage should be made visible in each relevant release assessment rather than hidden behind a green build.
C. Required phase-completion report
Every phase should conclude with this compact, auditable record:
Field	Required answer
Phase	Exact approved phase identifier
Scope	Planned vs completed
Files	Actual files changed; maximum eight
Tests	Commands executed and outcomes
Visual verification	Screenshot evidence and viewport details
Security/privacy impact	Findings and outstanding risks
Git state	Branch, commit, push status
Deployment state	Deployed, not deployed, or unverified
Exceptions	Failures, skipped checks and reasons
Next step	Specific dependency or owner decision

No task should be marked complete merely because an agent generated code or because its best-looking screenshot appears satisfactory.

Need data: Direct inspection of the complete docs/VERIFY.md, the active /debate skill instructions, the current build/test results, and actual /proof field-data coverage.

8. Proposed v1.1 master prompt outline
The final section — a suggested compact structure for the next version.
Target master prompt

Excluding the separate evidence contract and phase brief

~11.6 KB













Approximately 75% smaller than the current 47.2 KB document.
#	Section name	Purpose	Target
1	identity_authority_scope	Define SiteBlitz mission, instruction precedence, permissions and approval boundaries.	0.8 KB
2	verified_project_contract	Load known stack, paths, conventions, completed work, risks and unknowns.	1.4 KB
3	nonnegotiable_quality_gates	Consolidate privacy, security, truthful marketing, accessibility, responsiveness and performance.	1.2 KB
4	phase_execution_and_spec_lock	Enforce one phase per session, ≤8 files, numbered specifications and owner decisions.	1.4 KB
5	evidence_and_provenance	Establish source hierarchy, audit existing public claims and define evidence requirements.	1.1 KB
6	website_experience_and_motion	Guide brand, content, conversion, responsive UX and stack-native cinematic storytelling.	1.4 KB
7	admin_analytics_and_leads	Improve existing admin and lead systems; require privacy review before new intelligence.	1.4 KB
8	independent_debate_protocol	Define the actual /debate workflow, context limits, verdicts and records.	0.8 KB
9	verification_acceptance_release	Bind implementation to docs/VERIFY.md, tests, screenshots, risk gates and deploy truth.	1.4 KB
10	reporting_completion_stop	Require evidence-based phase reporting, decisions, versioning and an explicit stop condition.	0.7 KB
	Total		11.6 KB

Final recommendation
Proceed with v1.1, not execution of the current v1.0 as-is.

The transformation strategy should preserve the existing project's strengths rather than initiate another broad redesign without first establishing the reliability of published claims, analytics, deployment, and security.

I would prioritise the following sequence: credibility and privacy assessment; deployment verification; tightly scoped product and experience proposals; authentic independent debate; owner-approved specifications; then implementation in small, tested increments. Admin authorization and TypeScript hardening should be completed before their respective dependent work.
Points still open
1. P0 credibility: Are the four portfolio results, five testimonials, images, and marketing commitments supported by original evidence and publication permission?
2. P0 privacy: What are the current lawful bases, retention obligations, jurisdictional requirements, and approved controls for visitor tracking? Check with counsel.
3. P2 deployment: Which Git branch and commit actually reach production, and is v2-redesign correctly configured?
4. P3 authentication: What exact admin endpoints lack independent authorization checks, and what regression coverage is required?
5. P5 type checking: What causes tsc --noEmit to fail to complete, and how will the build gate be restored?
6. Owner workflow: What are the exact global spec-lock decision words, and which administrative tasks matter most in daily operation?
7. Debate and acceptance: Has the current /debate skill contract been reread, and are docs/VERIFY.md and the existing screenshot procedures sufficient for the next approved phase?
8. Creative decision: Which of the proposed experience directions should be locked for implementation after the evidence-led audit and debate?
No repository changes, production updates, or debate invocation were performed as part of this review.

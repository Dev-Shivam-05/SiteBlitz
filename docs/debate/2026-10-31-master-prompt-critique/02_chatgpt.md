## 1. Verdicts on R1–R6

1\. R1 — ACCEPT. Merge D0 into D1. Every project-contract entry must include `source (file:line)`, `last_verified`, and evidence status. Recheck critical facts at the start of each relevant session.

2\. R2 — ACCEPT, with sequencing dependency. C1 becomes the first corrective content phase after D1. Complete T0 and P2 before shipping C1 so its changes can be visually verified and safely deployed. Require owner `go`; preserve supported claims and remove or correct only unsupported or misleading wording.

3\. R3 — ACCEPT. P5 is an area-specific prerequisite, not a global blocker. Content-only edits to `site.ts`, JSON, and CSS may proceed with existing verification; TypeScript application logic, API, middleware, and admin changes require P5. Until then, report type safety as UNVERIFIED.

4\. R4 — ACCEPT. Audit every published claim across `site.ts`, generated JSON, `/proof`, testimonials, imagery, and service commitments, including 48-hour delivery and 90+ Lighthouse. Record evidence, source, publication permission, and owner disposition per claim.

5\. R5 — ACCEPT, with implementation separation. C1 must correct the demonstrated privacy-disclosure mismatch. Technical retention changes, consent controls, and tracking behaviour belong in a separate urgent privacy-remediation phase because they affect application logic and require legal review. A corrected disclosure alone does not establish privacy compliance.

6\. R6 — ACCEPT. Add T0 before C1 because visible copy changes can affect layout. Commit a reproducible screenshot tool supporting explicit device metrics and reduced-motion mode. Verify that it runs successfully, rather than merely committing a script.

## 2. Final phase order for v1.1

| ID  | Scope                                                                                                                           | Expected files                                                            | Gate                                                                                 |
| --- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| D1  | Merge D0: refresh project facts, evidence inventory, complete claims/provenance audit, document tracking and disclosure defects | 1–2 audit/contract documents                                              | Read-only; source, line, date, evidence status required                              |
| T0  | Restore and commit repeatable CDP screenshot tooling, including device metrics and reduced-motion mode                          | `scripts/cdp.mjs`, verification instructions; 1–3 files                   | Owner approval; successful screenshot test                                           |
| P2  | Verify deployment branch, upstream, environment configuration, and safe release procedure                                       | Existing P2 scope; approximately 2 files                                  | Deployment path confirmed before C1 release                                          |
| C1  | Protective content patch: unsupported claims, misleading `/proof` references, inaccurate privacy disclosure                     | `site.ts`, 3 lander JSONs, `proof/page.tsx`, `privacy/page.tsx` — 6 files | Owner `go`; `npm test`, build, VERIFY A/C/G as applicable, visual review             |
| P5  | Restore reliable TypeScript verification and remove `ignoreBuildErrors`                                                         | Existing P5 scope; approximately 3 files                                  | Working typecheck plus tests and build                                               |
| PR1 | Correct privacy implementation: retention controls, data minimisation, consent/opt-out requirements as applicable               | Determine after D1; target ≤8 files                                       | P5; counsel review for legal requirements; owner `go`                                |
| P3  | Implement defense-in-depth authorization for admin API routes                                                                   | Existing P3 scope; ≤8 files                                               | P5, VERIFY E, regression tests                                                       |
| D2  | Complete public-site, mobile, admin, content, and performance audit                                                             | 1–2 audit documents                                                       | Evidence-backed; screenshots and reproducible defects                                |
| D3  | Research creative benchmarks, conversion patterns, and three distinct design directions                                         | 1–2 research documents                                                    | Verified sources and comparison criteria                                             |
| D4  | Execute the genuine `/debate` workflow; record disagreements, verdicts and decisions                                            | 1–2 debate artifacts                                                      | Verified skill, ≤7 agenda points per pack, 25 KB context cap                         |
| D5  | Produce the proposed brand, website, motion, contact, analytics and admin blueprint                                             | 1–3 specification documents                                               | `spec-lock`: `go` or `change 2,5` with replacement values                            |
| X1+ | Approved website/admin implementation, one bounded phase at a time                                                              | ≤8 files per session                                                      | Approved `docs/spec/<feature>.md`, dependency gates, tests and relevant verification |
| L1  | Release verification, monitoring and measured iteration                                                                         | Release record and relevant reports                                       | Functional, visual, accessibility, security, performance and rollback checks         |

Execution clarification: This is the preferred order, not a prohibition against continuing read-only research while P5 or counsel review is blocked. No dependent code implementation may bypass its gate.

C1 is limited to the six identified content files. If D1 discovers additional affected surfaces, split the corrective work rather than exceeding eight files. PR1 remains a separate corrective priority and must precede any new behavioural-intelligence development.

## 3. Changes to my round-1 verdicts

No round-1 verdict is reversed. The new evidence strengthens three conclusions and adds a concrete dependency.

| Original point      | Updated conclusion                                                                                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3 — Credibility     | Escalate from a missing provenance process to an existing published-claims verification risk. `/proof` does not substantiate client outcomes, despite wording that suggests otherwise.                            |
| 5 — Privacy         | Escalate from a required audit to a confirmed source-code/disclosure mismatch. No repository-defined TTL was found; verify production database indexes before asserting the complete runtime retention behaviour. |
| 7 — Verification    | Add T0 as a prerequisite. The previously described screenshot procedure is not reproducible from committed repository tooling.                                                                                    |
| 2 and 6 — Execution | Make phase gates and `spec-lock` binding: the owner-approved numbered table becomes the implementation contract, and unapproved values cannot be introduced.                                                      |

## Points still open

1. Claim evidence: Owner dispositions for the four client results, five testimonials, portfolio imagery, 48-hour delivery, and 90+ Lighthouse commitments.
2. C1 wording: Exact approved replacements for unsupported claims and `/proof` and `/privacy` statements.
3. Privacy implementation: Production MongoDB index/retention verification, applicable lawful basis and consent requirements, and counsel review.
4. Deployment: Confirmation of the actual Vercel deployment branch, environment readiness, and release path.
5. T0: Selection and successful verification of the committed screenshot tooling.
6. P5: Root cause and remediation scope for the non-terminating TypeScript check.
7. Admin: Confirmation of which current workflows justify future expansion beyond the single-operator model.
8. Creative direction: Selection through documented research, actual debate, and owner-approved `spec-lock`.

Round-2 conclusion: Accept R1–R6, with the sequencing and scope qualifications above. The next master prompt should encode these decisions without reopening settled questions.

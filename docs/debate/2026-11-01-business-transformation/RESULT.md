# Review - SiteBlitz whole-business transformation - 2026-11-01 - 7 rounds - prompt: SiteBlitz_AI_CoFounder_Debate_Master_Prompt_v3.0.xml

ChatGPT ran in a temporary chat with "Extra High" effort (Pro unavailable). It reported itself as GPT-6; the UI does not
show the model name, so this is self-reported. The full exchange is in `NN_claude.md` / `NN_chatgpt.md` (round 1 also
carried 5 screenshots in `screens/`). No implementation, deployment, spending or outreach happened. Every row below is
**agreed in debate, not approved**: each needs the founder's go.

| # | Point | Proposed by | Evidence (file:line / round) | Claude's verdict | Status |
|---|---|---|---|---|---|
| FD-01 | Remove the fabricated claims still live in production; reword 4 unprovable commitments; remove the dead `hello@siteblitz.in`; "Request a call" booking semantics; explicit WhatsApp fallback that keeps form data | Claude r1 + ChatGPT r1 | live HTML "Nikhil Verma" ×8; `/api/proof` commit `4ee3cc1` (2026-07-10); `siteblitz.in` NXDOMAIN (Google DNS); `LeadForm.tsx:82-87`; `BookingForm.tsx:49,73` | agreed | agreed - P0 |
| FD-01b | Grader SSRF: DNS-rebinding TOCTOU; pin the connection to the validated IP | Claude r4, escalated to P0 by ChatGPT r5 | `src/lib/grader.ts:75,114` (lookup, then fetch re-resolves); `/tools/grader` returns 200 in production | agreed | agreed - P0 |
| FD-02 | Separate Preview database and credentials; confirm Vercel plan (Hobby is non-commercial) and Atlas tier/backups | Claude r1, ChatGPT r2/r5 | RISK R11; Vercel scope is personal, plan not visible from the CLI | agreed | founder action |
| FD-03 | Telegram lead alerts with a `Notification` record, retry, and reconciliation by lead ID; then owner / next action / search / Today | Claude r5, refined by ChatGPT r5 | no notification code in `src/`; `admin/leads/page.tsx:63-74` ignores PATCH result | agreed | agreed |
| FD-04 | Two hashed admin accounts + roles + critical audit events before the collaborator gets access | Claude r5 | `src/lib/auth.ts` plaintext env compare (RISK R5) | agreed | agreed |
| FD-05/06 | Test 15 coaching institutes vs 15 independent clinics; the founder picks the primary ICP from qualified conversations and payments | ChatGPT r2, Claude r3 | Round 2 ICP matrix; law firms out (BCI Rule 36), restaurants deprioritised | agreed | founder choice after test |
| FD-07/08 | Test offer: ₹17,999, 3 pages, 7 working days from "ready to build", 1 revision; Scale becomes a quotation; no unlimited revisions; no default pilot discount; founder sets a contribution floor | ChatGPT r2/r6 | First-3-project model: **+₹1,661 to −₹6,338 per project** at ₹500/h incl. template + sales time (arithmetic re-checked, r7) | agreed | founder approves price/GST |
| FD-09/10 | Demo-led + founder-accountable, light design (canvas #FAF9F5, ink #182B36, teal #006B60); remove WebGL hero, marquees and preloader from buyer paths; equal coaching/clinic landing variants; static labelled demo first | Claude r3 + ChatGPT r3 | contrast re-computed 13.87 / 6.42 / 5.70; warm accent #E7B877 is 1.73:1, so fill only | agreed | founder approves direction + public identity |
| FD-11 | Acquisition: warm introductions and in-person first; partners without paid referral fees initially; cold email on hold (domain + legal review); no cold calls without compliance check; Google Maps for discovery only; Places prospecting blocked | Claude r4 + ChatGPT r4 | GBP eligibility, Maps Platform terms, TRAI, WhatsApp policy (sources in r2/r4) | agreed | agreed |
| FD-12 | Build a focused CRM in the existing admin; payments (Razorpay links), GST invoicing and calendar stay external; HubSpot free is the fallback if A2/A3a slip | Claude r5 + ChatGPT r5 | estimate: A1-A4 22-34 h implementation, ~2.5 h founder review | agreed | agreed |
| FD-13 | Ad command center LATER: native UIs, then CSV spend import, then read API, then gated writes. Spec must use the new access models | ChatGPT r5 corrections | Google Ads developer tokens sunset 2026-09-09; Meta "Marketing API Access Tier" since 2026-05-04 - both verified by Claude via web search | agreed | agreed |
| FD-14 | Care plan optional and time-capped, never compulsory | ChatGPT r2 | - | agreed | agreed |
| FD-15 | Day 7/14/30/45/60/90 funnel diagnostics; a missed threshold triggers investigation, not an automatic pivot | Claude r6, refined by ChatGPT r6 | - | agreed | agreed |
| FD-16 | Deployment, spending, production changes and outreach each need a separate approval | prompt v3.0 | - | agreed | agreed |

**Agreed build sequence** (each unit about 8 files or fewer; tests and screenshots at 320/390/1440; commit + push; production only with approval):
- **S0a** grader IP-pinning + DNS-rebinding test.
- **S0b** public truth and contact fixes (split into sub-units if it exceeds 8 files).
- **F1** founder sets up the Preview DB and confirms the plan and tier.
- **L1** founder-approved release, with a monitored lead path.
- **A2** Telegram alerts.
- **A3a** leads/Today (single owner).
- **D1** shared light landing template + coaching/clinic content + static demo.
- **A1** accounts before the collaborator gets access.
- **Later:** A3b history, A4 prospect register, A5 quote references, A6 projects, A7 reporting, wider restyle.

## Recommended next steps (not started - waiting for your go)
1. **S0a + S0b**: Claude builds and tests them on `v2-redesign`. No production change.
2. **F1 + L1**: you set up the Preview DB in Vercel, then approve the production release once the gates pass.
3. **A2 + A3a**: lead alerts and the Today view.
4. **D1**: light landing template and static demo, after you pick the design direction.
5. **You, in parallel this week**: confirm your hours, locality and GST status; start the 15/15 conversations through warm introductions and in-person visits.

## Points still open (founder only)
- Weekly hours for selling and delivery, and who builds client sites.
- Operating locality (the site says Mumbai: confirm).
- GST registration / legal entity; minimum contribution per project; any pilot discount.
- Vercel plan (Hobby or Pro) and Atlas tier/backups.
- Domain + mailbox purchase, or keep WhatsApp/phone as the only channel for now.
- Design direction and whether your name, face and city appear on the site.
- Who checks leads daily until Telegram alerts are live.

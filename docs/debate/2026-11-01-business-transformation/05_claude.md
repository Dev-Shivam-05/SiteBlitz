# Claude Code: Round 4 verdicts, then Round 5

## Round 4: per-point verdicts

All points agreed, with these notes:

- **D-036, email on hold until a legal and deliverability review: agreed.** Warm introductions, in-person visits and
  replies to genuine enquiries come first.
- **D-044, Places prospecting blocked: agreed.**
- **Deduplication as match signals plus human review: agreed.** Merge history is kept.
- **Development boundary table: agreed and adopted as a rule.** No lead-engine automation before the first paying
  projects. For the first 30 prospects, the register is a small admin table.
- **Grader SSRF, checked in code (`src/lib/grader.ts`):**
  - Every DNS answer is resolved and checked (`lookup(..., {all:true})`).
  - Redirects are followed manually, at most 5, and each hop is re-validated.
  - **Residual risk (VERIFIED by reading the code):** `fetch` re-resolves DNS after the check, so a DNS-rebinding
    window remains (time-of-check vs time-of-use). Before the grader is used on prospects, pin the connection to the
    validated IP (a custom `lookup`/agent). This is now backlog item S-1.
- **D-034 to D-047: agreed as PROPOSED.**

## Round 5: admin, CRM, APIs, feasibility

Answer Q5.1-5.5. Claude's positions:

**C20. Build vs buy.** Build a *focused* CRM inside the existing admin; buy or integrate everything around it.

Reasons to build the core:
- Leads already land in Mongo.
- The admin shell, design and auth already exist.
- The founder explicitly wants one system.
- An external CRM adds a sync point and a second login for 2 people.

Integrate instead of building:
- **Scheduling:** a Google Calendar appointment schedule (NEXT).
- **Mail:** a mailbox provider for the domain, plus a transactional email API once the domain exists.
- **Payments:** Razorpay payment links, created by hand and then recorded.
- **GST invoices:** an accounting or invoicing tool. SiteBlitz should never build tax invoicing.

The risk is that the build delays selling. Mitigation: phase A1-A3 below is the whole NOW scope.

**C21. Minimum admin, in order:**
- **A1, accounts (NOW).** A `User` collection for the 2 people.
  - Hashed passwords (argon2id or bcrypt).
  - Roles `owner` and `collaborator`.
  - Per-user sessions.
  - An `AuditLog` for every mutation.

  The env account becomes the bootstrap owner only. This also closes RISK R5 (plaintext, shared login).
- **A2, lead alert (NOW).** A Telegram bot message to both users on every new lead. It is free, instant, needs no
  domain, and the founder already uses Telegram elsewhere.
  - A `Notification` record stores status, attempts and error.
  - Retry with backoff.
  - The admin shows "alerts failed" in the Operations section.

  Email alerts are added once the domain exists. WhatsApp Cloud API alerts are LATER (templates and Meta business
  verification).
- **A3, pipeline (NOW).** Lead gains:
  - `owner`, `nextAction`, `nextActionAt`, `valueEstimate` and `lostReason`;
  - the attribution fields from your C19 table;
  - an `Activity` timeline (status changes, notes, outreach events);
  - search, and a **Today** view (new / due today / overdue).

  Every mutation waits for the server's confirmation before the UI shows success.
- **A4, Prospect register + Suppression (NOW, small):** the provenance model from Round 4, cut to the fields needed
  for 30 records.
- **A5, Quote (NEXT):**
  - line items, GST mode, status (draft / sent / accepted / declined) and validity date;
  - a printable view;
  - the payment is recorded against a Razorpay link reference.
- **A6, Customer + Project (NEXT):** milestones, a content-received date (this starts the 7-day clock), the launch
  acceptance checklist, and handover/ownership records.
- **Analytics (LATER):** collapse the 8 screens into 2, Traffic and Pages/Funnel.

**C22. Entity chain:** `Prospect → Lead → Opportunity(Quote) → Customer → Project → Payment`. Two collections run
alongside the whole chain: `Activity`, which links to any of these records, and `Suppression`, which every outreach
checks. `User`, `AuditLog` and `Notification` are infrastructure.

**C23. Ads command center.** Agree it is LATER; please verify against the official docs:
- **Google Ads API:** OAuth `adwords` scope; a developer token that starts at test-account access, with Basic access
  only after an application review; GAQL reporting; campaign create and pause are possible once access is granted.
- **Meta Marketing API:** an app, business verification, and `ads_read` / `ads_management` permissions. App Review /
  Advanced Access is needed beyond the developer's own accounts.

My position for the order of work:
- **NEXT:** read-only spend import (manual CSV first, then the API read) into the CRM, so CAC is computed from real
  spend.
- **LATER:** writes (draft, launch, pause) behind an approval gate with spend caps, and only once a paid channel has
  proven repeatable.

At ₹3-5k test budgets, the native ad UIs are sufficient.

**C24. Operations and cost.**
- Preview and dev get their own database (a founder action in Vercel).
- Backups: check whether the Atlas tier includes them. If it does not, run a scheduled `mongodump` to private storage.
- Monitoring: error tracking plus a daily "alerts sent vs leads created" check.
- Durable rate limits: backlog P6.
- DNS-rebinding fix: S-1.

Monthly cost, a PLANNING ESTIMATE you should verify:
- domain about ₹1k a year;
- one mailbox, low;
- Vercel Pro $20 if needed for commercial use;
- Atlas free tier, or about $50+ for a tier with backups;
- Telegram free.

Give the integration feasibility matrix with operation, authentication, permission, freshness, failure mode, approval
gate and verification, citing official docs with dates. Challenge A1-A4 if any of it does not earn its place before the
first sale. End with the D-log and OPEN POINTS.

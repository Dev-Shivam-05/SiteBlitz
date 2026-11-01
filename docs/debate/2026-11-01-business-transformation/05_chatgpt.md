# SiteBlitz × Claude Code — Round 5

Round 5 of 7 · Admin, CRM, APIs and technical feasibility

Date: 1 November 2026\
Model: GPT-6\
Status: Architecture and commercial recommendations only. No implementation, deployment, purchases or external actions authorized.

## Executive verdict

AGREE with Claude's overall build-versus-buy strategy, but DISAGREE with treating all A1–A4 features as equally necessary before the first customer.

SiteBlitz should own its core customer records and sales workflow while integrating established services for email, scheduling, payments, invoicing and advertising.

The priority must remain:

Capture a genuine inquiry → notify the responsible person → follow up reliably → quote → collect payment → deliver the project.

A functional two-person CRM is valuable. Building an elaborate mini-SaaS before the first sale is not.

### My recommended decisions

| Area                      | Decision                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| Core CRM                  | Build a small workflow within existing Next.js and MongoDB                                      |
| Authentication            | Secure the existing admin immediately; use individual accounts before two-person production use |
| Notifications             | Telegram is a reasonable first channel, with durable retry and recovery                         |
| Lead pipeline             | Build NOW, but only the fields that support daily sales execution                               |
| Prospect register         | Small manual table for the first 30; no automated enrichment                                    |
| Quotes and payments       | Manual external tools first, with references recorded in CRM                                    |
| Customer/project tracking | Small operational records when the first project is sold                                        |
| Google Ads / Meta         | Native advertising interfaces first; manual CSV reporting if needed                             |
| Security                  | Separate environments, verify backups, fix grader DNS-rebinding risk before prospect use        |
| Long-term rule            | Every module must justify its cost against revenue, reliability or legal/security requirements  |

### Two important corrections to Claude's API assumptions

Google Ads developer tokens were sunset on September 9, 2026.

Google's current documentation says new integrations obtain API access through a Google Cloud project. The levels are now Test → Explorer → Basic → Standard. Explorer supports production accounts with a 2,880-operations-per-day limit; new developers no longer require the old developer-token onboarding process. OAuth scope `https://www.googleapis.com/auth/adwords` remains relevant.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

Google for Developers+2



Meta changed its Marketing API access-tier terminology in May 2026.

The old Ads Management Standard Access feature is now called Marketing API Access Tier, with Limited and Full tiers. This is distinct from the `ads_read` and `ads_management` permissions. Permission approval and higher API-tier qualification must be evaluated separately.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.meta.com\&sz=32)

Meta Horizon OS Developers



These are significant corrections to C23. Claude should update its future integration specification rather than implementing the older authorization assumptions.

## Q5.1 — Minimum founder-operated admin

### C21 verdict: AGREE with the features, CHANGE the implementation sequence

The proposed A1–A4 scope contains four separate objectives: securing access, ensuring lead delivery, managing follow-ups and managing prospect research.

They are not equally urgent.

My recommendation is to build the smallest system that prevents a real customer opportunity from being lost, while completing necessary security remediation before broadening access.

### Revised priorities

| Phase                   | Claude's proposal                                                        | My verdict                        | Required scope                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| A1 — Accounts           | User collection, roles, hashed passwords, individual sessions, audit log | NOW, security-focused             | Two identities, secure authentication, server-enforced permissions, essential audit logging; no elaborate user-management system |
| A2 — Notifications      | Telegram alerts, persistent notification, retry                          | P0 — NOW                          | Reliable lead-to-alert flow, failure reporting and reconciliation                                                                |
| A3 — Pipeline           | Lead ownership, next action, value, search, Today                        | NOW                               | Today view, owner, status, next action, searchable leads and chronological history                                               |
| A4 — Prospect register  | Prospect and suppression model                                           | NOW-LITE                          | Manual records for 30 businesses, provenance, permission state and suppression                                                   |
| A5 — Quotes             | Structured line items, tax modes, printable quotes                       | NEXT                              | Initially record a manually created quote link, value, version and status                                                        |
| A6 — Customers/projects | Content received, milestones, acceptance and handover                    | NEXT, triggered by first customer | Start minimal tracking when a project is sold, not after three projects                                                          |

I would not block customer discovery while implementing a complete account-management or quotation system. However, existing shared credentials and plaintext password comparison must be addressed before granting a collaborator independent production access.

### A1 — Authentication and authorization

AGREE with individual accounts. NEED EVIDENCE that building custom authentication is the quickest secure approach.

OWASP recommends modern adaptive password hashing such as Argon2id and secure session management; plaintext password storage is unsuitable.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://cheatsheetseries.owasp.org\&sz=32)

OWASP Cheat Sheet Series



The minimum requirements are:

| Requirement                                | Acceptance test                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------------ |
| Separate owner and collaborator identities | Each user has independently revocable access                                         |
| Secure authentication                      | Passwords are appropriately hashed, or authentication uses a vetted managed provider |
| Server-side authorization                  | A collaborator cannot execute owner-only operations by modifying a browser request   |
| Secure sessions                            | Secure, HttpOnly cookies; expiry, revocation and logout verified                     |
| Login-abuse protection                     | Repeated unsuccessful login attempts are throttled                                   |
| Auditability                               | Business-critical writes show actor, action, target and timestamp                    |
| Bootstrap migration                        | Environment-based bootstrap cannot become an indefinite shared backdoor              |

A shared `ADMIN_PASSWORD` environment variable is not the same as storing passwords in a database, but comparing the plaintext secret directly still creates unnecessary operational and security exposure.

I disagree with building a large audit subsystem for every minor admin interaction immediately. Audit authentication, permission changes, lead ownership/status, suppression, quotes, payments and other consequential mutations first. Expand coverage as the admin becomes more capable.

A managed identity provider should be compared with extending the existing system; buying authentication does not necessarily require a second visible login for the operators.

### A2 — Telegram notification architecture

AGREE that Telegram is a reasonable initial notification channel. DISAGREE that it can simply be labeled "free and instant" as a reliability guarantee.

Telegram's Bot API supports `sendMessage`, and ordinary bot messages are generally free within service limits. However, users must first initiate a bot conversation or add it to an appropriate chat. Successful API submission is not proof that the recipient read the message.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://core.telegram.org\&sz=32)

Telegram+2



For a two-person team, the notification should initially contain:

> New SiteBlitz enquiry — SB-000123\
> Type: Coaching website\
> Received: 10:42 AM IST\
> Open securely in admin

The example is illustrative, not a real lead.

Do not routinely transmit full customer contact details, medical context or complete inquiry content through Telegram. Send a secure admin reference instead.

### Recommended event lifecycle

Lead committed to MongoDB

Unique ID · source · timestamp

Notification intent recorded

One record per event, recipient and channel

&#x20;API accepted

Store Telegram message reference; do not claim human acknowledgment

&#x20;Send failed

Store error, retry eligibility and next attempt

Reconciliation and Today view

Identify missing alerts · recover failures · assign human follow-up

An important technical requirement is the gap between writing a `Lead` and creating its `Notification`. If one succeeds and the other fails, the system must recover the missing notification.

Claude should choose either a supported atomic outbox design or a simpler documented reconciliation mechanism. All retries should be idempotent wherever possible.

Vercel scheduling constraint: Hobby cron jobs are limited to daily execution, while Pro supports schedules as frequent as once per minute. Vercel also warns that cron invocations can overlap or be delivered more than once. Therefore, do not assume a reliable minute-level retry system on an unconfirmed hosting plan.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://vercel.com\&sz=32)

Vercel+1



P0 acceptance: A real test lead creates one persistent lead record, a notification record for each intended recipient, an observable send outcome and a recoverable failure path. Notifications must not disappear silently.

### A3 — Pipeline: the minimum useful screen

## SiteBlitz / Today

Proposed UI

New

Awaiting review

Due

Today's actions

Overdue

Needs attention

| Leads       | Search, owner, current status, source, next action            |
| ----------- | ------------------------------------------------------------- |
| Lead detail | Contact methods, requirements, history, notes and follow-up   |
| Prospects   | Small reviewed register; no automated prospect collection     |
| Operations  | Failed alerts, delivery errors, service health, backup status |

Concept only. No live customer information or operational counts are represented.

For each lead, minimum actionable fields are `ownerId`, `status`, `nextAction`, `nextActionAt`, `source`, `lastContactAt` and a short history.

`valueEstimate`, `lostReason` and more detailed attribution can be introduced when useful rather than forcing an operator to complete unnecessary fields at initial capture.

The admin should prioritize actions that are due over counts that are interesting but do not change what the founder does today.

Acceptance test: Each user can find an assigned lead, contact the prospect, set the next action and see the updated record. Simulated API failure must leave the record unchanged and show an intelligible error.

### A4 — Prospect register: keep it intentionally small

I accept Claude's 30-business register, but it does not need a full enrichment platform.

Initially, store business identity, independently sourced contact channel, source URL/date, relevant observation, reviewer, consent/eligibility status, suppression state and review outcome.

Human review should remain mandatory for ambiguous duplicates. Preserve merge history.

Important: A `Prospect` does not become a `Lead` simply because its website has a defect or its score is high.

Also, S-1 must be reconsidered as an urgent security matter. The reported DNS rebinding gap is not merely a future prospect-grader issue: if the current URL grader is publicly accepting untrusted addresses, the vulnerability already has a reachable attack surface. Either disable that fetching functionality temporarily or remediate and test it before continued public use. This should not wait for acquisition automation.

## Q5.2 — Build versus buy

### C20 verdict: AGREE with a focused CRM, but the economic argument must include engineering labor

SiteBlitz already has a lead database and admin application. That creates a genuine advantage for extending the existing implementation.

But the existence of an admin shell does not make future development free.

### Current alternatives

| Option                      | Public pricing / operating cost                                                    | Strengths                                                                      | Limitations                                                          | Recommendation                              |
| --------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------- |
| Focused internal CRM        | Existing infrastructure plus development, maintenance and security labor           | Single workflow, direct lead access, tailored customer lifecycle, data control | Engineering time, reliability responsibility, testing                | Preferred if tightly scoped                 |
| HubSpot CRM                 | Free tools support up to 2 users and 1,000 contacts                                | Fast to operate, established pipeline capabilities                             | Second system, data transfer/integration, feature and upgrade limits | Strong fallback                             |
| Bigin by Zoho CRM           | Express listed at ₹400/user/month, billed annually in India, plus applicable taxes | Compact sales pipeline, existing task functionality                            | License cost, vendor workflow, separate application                  | Reasonable low-cost alternative             |
| Spreadsheet/manual register | Low direct cost                                                                    | Fastest setup for first 30 prospects                                           | Weak concurrent workflow, auditability and reminders                 | Suitable only for initial prospect research |

HubSpot's official pricing confirms a two-user free tier. Zoho's official Bigin pricing confirms the ₹400/user/month annually billed Express price.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.hubspot.com\&sz=32)

HubSpot+1



For two Bigin users, that is ₹9,600 per year before applicable taxes at the published annually billed rate.

At an illustrative ₹500/hour value of founder/developer time, that equals roughly 19 hours of labor.

The comparison exposes the economic risk in building an extensive custom CRM before customers exist.

### My decision rule

Build the internal CRM only when the scope stays limited to lead receipt, ownership, next actions, notification recovery and a basic history.

If Claude's estimate for a secure usable A1–A3 implementation becomes materially larger than the effort to adopt an established CRM, reconsider the buy option instead of continuing solely to preserve the "one system" goal.

Alternative: Move all existing lead storage to an external CRM immediately.

Why it currently loses: It requires migration or synchronization of SiteBlitz's current lead flow, introduces another operational system and may not integrate cleanly with the existing admin.

Trade-off: Building preserves direct control and consistent UX but creates a permanent maintenance responsibility.

Validation: Claude must provide comparable engineering-hour estimates for both approaches, including initial setup, connection to the public form, access control, notifications, backup and ongoing maintenance.

Confidence: MEDIUM. The preferred architecture is reasonable, but the development economics have not yet been measured.

## Q5.3 — Advertising command center and API feasibility

### C23 verdict: AGREE with deferring writes, but separate reporting from campaign control

The current SiteBlitz admin reportedly labels a traffic-source screen "Campaigns." That does not establish a Google Ads or Meta advertising connection.

For the first ₹3,000–₹5,000 advertising experiment, native advertising interfaces are enough.

A custom API integration would add OAuth management, permissions, reporting discrepancies, retry logic, account reconciliation and operational risk before its value is demonstrated.

### Recommended evolution

NOW — Native advertising tools

Manual

Campaigns configured and managed directly in Google Ads or Meta Ads Manager when separately authorized.

NEXT — Verified spend reporting

Manual CSV import, reporting period, currency, account ID and CRM revenue reconciliation.

LATER — Read-only API integration

Authorized account access, verified reporting, synchronization logs and freshness indicators.

FUTURE — Campaign writes

Draft, launch, pause and budget operations only with tested platform permissions and recorded approvals.

### Google Ads API — verified capability

The current API supports GAQL reporting and campaign mutations through appropriate resource services. The new Cloud-project access model supports production calls at Explorer access, subject to the applicable restrictions and the actual user's ad-account privileges.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

Google for Developers+2



Important: Having API access does not mean SiteBlitz has permission to operate any particular ad account. Google account authorization, API project access and the account-level ability to make changes are separate requirements.

For reporting, the minimum useful fields include account, campaign, currency, reporting period, cost, clicks, impressions, conversion metric definitions and last successful sync.

Do not interpret an API-reported conversion as confirmed SiteBlitz revenue. The CRM must separately record actual paying customers.

### Meta Marketing API — verified capability

Meta's official Marketing API resources support querying advertising insights and creating/updating campaign-related objects with appropriate authorization.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.postman.com\&sz=32)

Postman API Network+2



For SiteBlitz:

- `ads_read` is the appropriate permission to investigate for reporting.
- `ads_management` is relevant for authorized campaign management.
- Managing third-party accounts can require additional permission approval and access review.
- Marketing API Access Tier eligibility is separate from permission grants.

The current official Meta Postman guide still contains older Standard/Advanced terminology in some sections. The May 4, 2026 platform announcement is the more recent source for the renamed Marketing API Access Tier.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.postman.com\&sz=32)

Postman API Network+1



Neither API should be treated as connected until SiteBlitz demonstrates a successful authorized call against its intended account.

### Rules for any future advertising writes

A campaign change must never be described as successful simply because an API request returned without a transport error.

Future controls should require a named authorized account, approved campaign parameters, explicit currency and maximum financial exposure, an approval record, platform response and independent state readback.

For uncertain or failed writes, the system must display the uncertainty instead of retrying blindly and possibly creating duplicate campaigns.

Alternative: Build a single admin that creates, edits and optimizes Google and Meta campaigns automatically.

Why it loses now: It would create an expensive integration and financial control surface before SiteBlitz has proven that paid acquisition is profitable.

Validation: Manual spend reports must reconcile with native platforms first. Only then test read-only integrations. Writes require a separate security and business case.

Recommendation confidence: HIGH.

## Integration feasibility matrix

Official vendor documentation reviewed 1 November 2026. "Available" means the provider supports the operation; it does not mean SiteBlitz has configured, authorized or successfully tested it.

### Customer and operating integrations

| Integration / phase                | Operation                                                 | Authentication and permission                                                                           | Freshness and failure mode                                                                   | Approval gate and verification                                                                      |
| ---------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Telegram — NOW                     | Send new-lead alerts to two users                         | Bot token, authorized chat IDs; recipients initiate interaction with bot                                | Event-triggered attempt; API outage, blocked chat, rate limits or retry delay                | Founder approves bot and recipients; verify two test messages, failed-send state and retry          |
| Domain email — NEXT                | Receive customer messages and send transactional receipts | Mailbox login; separate restricted sending API key and verified sending domain                          | Send acceptance and delivery are different; DNS failure, bounce, spam filtering              | Founder approves domain/provider; test inbound reply, authenticated send, bounce and delivery event |
| Google Calendar — NEXT             | Provide genuine appointment booking page                  | Founder signs into Google account; appointment schedule availability and entitlement determine features | Provider controls actual availability; conflicts, disabled link or timezone errors possible  | Founder approves schedule and hours; book, reschedule and check calendar                            |
| Razorpay — NOW manual              | Generate payment links and inspect payment status         | Merchant dashboard credentials; later API credentials/webhook secret                                    | Dashboard reflects provider state; partial payment, failed payment, delayed webhook possible | Founder approves charges; reconcile genuine payment ID, amount, bank settlement and CRM record      |
| External invoice tool — NOW manual | Generate legally appropriate quote/invoice                | Authorized accounting user; GST settings and tax permissions where relevant                             | Manual; incorrect tax treatment, duplicate invoice or mismatched payment                     | Founder/accountant approves configuration; reconcile invoice, payment and ledger                    |
| Atlas backups — NOW                | Snapshot, export and restore                              | Atlas project privileges, or restricted backup credentials                                              | Depends on cluster tier and backup schedule; restore or snapshot may fail                    | Founder approves tier/retention; restore to isolated environment and compare data                   |
| Preview environment — NOW          | Isolated database and test secrets                        | Vercel project access, separately scoped database credentials                                           | Configuration applies through deployments; accidental production access is critical failure  | Founder approves environment changes; verify test writes cannot touch production                    |

Supporting official documentation: Telegram&#x20;

[image](https://www.google.com/s2/favicons?domain=https://core.telegram.org\&sz=32)

Telegram

; transactional-email events&#x20;

[image](https://www.google.com/s2/favicons?domain=https://resend.com\&sz=32)

Resend

; Google appointment schedules&#x20;

[image](https://www.google.com/s2/favicons?domain=https://support.google.com\&sz=32)

Google Calendar Help

; Razorpay payment-link states&#x20;

[image](https://www.google.com/s2/favicons?domain=https://axisbank-docs.razorpay.com\&sz=32)

Axis Bank Docs

; Zoho Books India tax configuration&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.zoho.com\&sz=32)

Zoho Books

; MongoDB backups&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.mongodb.com\&sz=32)

MongoDB Docs+1

.



### Advertising integrations

| Integration / phase        | Operation                                              | Authentication and permission                                                                 | Freshness and failure mode                                                              | Approval gate and verification                                                                  |
| -------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Manual spend CSV — NEXT    | Import advertising spend and reconcile CRM outcomes    | Authenticated SiteBlitz owner; no advertising API credentials                                 | Snapshot as of export date; duplicate rows, currency mistakes, incomplete periods       | Founder approves import; totals match native platform report                                    |
| Google Ads API — LATER     | Read campaign metrics; possibly mutate campaigns later | Google OAuth with `adwords` scope, Cloud-project API access and appropriate ad-account rights | Queried reporting period; quotas, revoked authorization, delayed or revised conversions | Founder approves connection; readback matches Google Ads; writes require new approval           |
| Meta Marketing API — LATER | Read Insights; possibly create/pause/edit later        | Meta app, user/system-user token, ad-account access; `ads_read`/`ads_management` as required  | Reporting may be revised; token expiry, permission denial, API limits                   | Founder approves connection; reconcile native reports; verify any approved write in Ads Manager |

Sources: Google authorization and access&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.google.com\&sz=32)

Google for Developers+2

; Meta API official examples and permissions&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.postman.com\&sz=32)

Postman API Network+2

.



For all integrations, Claude should record the account/environment identity, provider operation, permission actually granted, last successful verification, failure behavior and current implementation status.

## Q5.4 — Security, operations and actual cost

### C24 verdict: AGREE, with important cost and backup corrections

The proposed infrastructure cost estimate is useful as a starting point, but newer MongoDB options change the comparison.

### MongoDB Atlas: updated pricing and backup findings

| Atlas option   | Official listed cost    | Backup situation                                                                                  | Suitability                                              |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| M0 Free        | $0                      | Optional daily backups are currently in a limited private preview, up to $3/month where available | Testing and very small workloads, subject to constraints |
| Flex           | $8–$30/month            | Automatic daily snapshots, last eight retained                                                    | Worth evaluating for low-traffic production              |
| Dedicated M10+ | Starts around $60/month | Configurable cloud-backup options with additional charges possible                                | Later, if workload or recovery requirements justify it   |

MongoDB's current free-cluster backup page specifically describes a private-preview backup subscription, while some general backup documentation still describes M0 as having no backups. Do not assume the feature is enabled for SiteBlitz without inspecting its Atlas project.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.mongodb.com\&sz=32)

MongoDB Docs+3



This means Claude's planning assumption that an Atlas tier with backups necessarily costs $50+ per month is outdated.

Recommendation: Evaluate Flex as a lower-cost option rather than upgrading directly to dedicated M10. Its daily snapshot schedule also means the business must understand possible data loss since the last backup.

Backups are only credible if restore procedures work. A successful `mongodump` command alone is not proof that the complete system can be recovered. MongoDB also warns that certain dumps without oplog coordination may not represent a single consistent point in time during concurrent writes.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.mongodb.com\&sz=32)

MongoDB Docs



### Proposed monthly operating cost

USD amounts are vendor-listed. INR domain figure is only a planning assumption. Prices exclude applicable taxes and unmeasured variable usage.

| Cost component                       | Planning amount                                             |
| ------------------------------------ | ----------------------------------------------------------- |
| Domain                               | Approximately ₹1,000/year — verify exact domain and renewal |
| Commercial Vercel Pro                | $20/month for the base plan, with $20 included usage credit |
| MongoDB M0                           | $0; backup preview availability unknown                     |
| MongoDB Flex alternative             | $8–$30/month                                                |
| Domain mailbox                       | Unknown until vendor and plan selected                      |
| Telegram bot messaging for two users | Normally $0 within ordinary limits                          |
| Transactional email                  | Provider/volume dependent                                   |
| Payment processing                   | Per actual merchant agreement and payment method            |
| Monitoring and backup storage        | Depends on selected services and retention                  |

Vercel's official Pro price is $20 per month and includes $20 of usage credit; usage, additional developer seats or taxes can change the final invoice. Hobby remains for non-commercial use.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://vercel.com\&sz=32)

Vercel



ILLUSTRATIVE INFRASTRUCTURE BASELINE

# $28–$50/month

Vercel Pro base plan plus Atlas Flex only.

This is not an all-inclusive SiteBlitz operating budget. Domain, mailbox, tax, additional provider usage, monitoring, advertising and labor are excluded.

A critical commercial implication: if SiteBlitz cannot justify even this infrastructure spend while pursuing its first three customers, moving to a more suitable commercial hosting configuration or temporarily simplifying the architecture deserves consideration.

### Production versus preview isolation

I support Claude's plan to set a separate `MONGODB_DB=siteblitz_preview`, but recommend more than a database-name change.

Use separate credentials with database-specific privileges, separate application secrets, explicit environment identification and test records that cannot be mistaken for customers.

A separate cluster gives stronger isolation, but may be unnecessary for this scale if database access is correctly restricted.

Acceptance: A preview submission must create zero production records, and preview credentials must be unable to write to production even if the database name is mistakenly supplied.

### Security controls by priority

| Security control                                      | Priority                    | Acceptance                                                                             |
| ----------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------- |
| S-1 DNS rebinding remediation for public grader       | P0 if publicly reachable    | Tested network binding and address validation; block untrusted URL fetching until safe |
| Individual admin authentication and server-side roles | P0 before two-person access | Unauthorized role operation rejected                                                   |
| Preview/production isolation                          | P0 before form testing      | No production mutation possible with preview credentials                               |
| Secret storage and rotation                           | P0                          | Secrets never appear in client bundles, logs or source                                 |
| Backup and restore                                    | P0/P1                       | Isolated restoration succeeds                                                          |
| Lead/notification recovery                            | P0                          | Missed alerts become visible and retryable                                             |
| Public form abuse protection                          | P1                          | Rate-limiting/anti-abuse controls tested                                               |
| Sensitive mutation auditing                           | P1                          | Actor and action recoverable without exposing unnecessary personal data                |
| Privacy retention and deletion procedures             | P1                          | Stored customer data follows documented policy                                         |

S-1 amendment: Because the public grader reportedly accepts visitor-submitted URLs, the confirmed DNS time-of-check/time-of-use weakness cannot automatically be left in a low-priority future prospecting backlog. Claude should verify whether that vulnerable path is currently deployed and reachable, and either remediate it or disable it pending remediation.

### Monitoring: measure business failures, not just server uptime

The minimum health view should track:

| Measurement                         | Why it matters                                   |
| ----------------------------------- | ------------------------------------------------ |
| Leads successfully persisted        | Actual opportunities captured                    |
| Notifications recorded and accepted | Whether the founder is likely to know about them |
| Leads with missing/failed alerts    | Silent sales-loss risk                           |
| New leads with no owner             | Accountability gap                               |
| Overdue follow-ups                  | Sales execution risk                             |
| Failed admin mutations              | Potential data loss or false success             |
| Last backup and restore test        | Recovery readiness                               |
| Last production deployment          | Truth about what is live                         |

The "alerts sent versus leads created" daily check is useful, but matching aggregate counts is insufficient. Reconcile by lead ID and intended recipient; otherwise duplicated alerts can conceal missing ones.

## Q5.5 — Admin architecture and entity model

### C22 verdict: AGREE with the entity chain, but keep Opportunity and Quote separate

Claude proposes:

`Prospect → Lead → Opportunity(Quote) → Customer → Project → Payment`

This is understandable, but it introduces three possible data-model mistakes.

First: Not every Lead originates from an outbound Prospect. A visitor can submit the contact form without previously existing in the prospect database.

Second: One Opportunity can have several quotations or revisions. An Opportunity should not be identical to one Quote.

Third: A Customer may have several Projects, and each Project may have multiple invoices, advances, balances or refunds. Payment should not be a single terminal stage.

### Proposed entity architecture

Prospect (optional) or Direct Inquiry

Researched business or visitor-submitted request

Lead

Contact, source, owner and follow-up

Opportunity

Qualified requirement, value estimate and decision stage

Quote / Proposal versions

Scope, exclusions, price, GST mode, acceptance status

Customer + Project

Agreed delivery, content receipt, milestones, QA, handover

Invoice reference + Payment transactions

Advance, final balance, provider references, refunds and reconciliation

Shared controls across the lifecycle

Users

Activities

Audit logs

Notifications

Suppression

Source attribution

The model should not create every collection immediately. This is a target architecture showing how data can grow without conflating commercial stages.

### Minimum data-entity rules

| Rule                                               | Reason                                                                            |
| -------------------------------------------------- | --------------------------------------------------------------------------------- |
| A lead can exist without a Prospect                | Supports organic inquiries                                                        |
| An Opportunity can have multiple Quote versions    | Supports revisions and negotiation                                                |
| Accepted quote does not automatically mean "paid"  | Prevents inflated revenue reporting                                               |
| A Customer can have multiple Projects              | Supports repeat business                                                          |
| A Project can have multiple payment events         | Supports 50% advance and final payment                                            |
| Payment-link issued ≠ payment received             | Keeps financial reporting truthful                                                |
| Activity and AuditLog are distinct                 | Customer interaction history differs from internal administrative change evidence |
| Suppression is checked before promotional outreach | Prevents unwanted contact                                                         |
| Source provenance remains attached                 | Supports reliable attribution and review                                          |

### Proposed operating workflows

| User action                       | System behavior                                               | Success criterion                                      |
| --------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| New inquiry received              | Save lead, create alert intent, assign review status          | Visible lead and actionable notification               |
| Founder accepts lead              | Assign owner and next action                                  | Clear responsible person and follow-up date            |
| Prospect declines                 | Record reason and any applicable suppression                  | No inappropriate further contact                       |
| Customer requests a quote         | Record external quote reference and proposed amount           | Traceable written offer                                |
| Customer accepts and pays         | Verify payment from provider; create customer/project records | Paid project, not merely an accepted quote             |
| Client sends all approved content | Record `contentReceivedAt` and scope approval                 | Delivery clock can begin accurately                    |
| Project launched                  | Verify acceptance, ownership and handover                     | Completed deliverables and documented responsibilities |
| Customer requests maintenance     | Record separately accepted plan                               | No silently imposed recurring charge                   |

### Avoid duplicate sources of truth

For the early phase, Razorpay or the bank is authoritative for payment events, the accounting system for tax invoices, the actual calendar provider for confirmed appointments, and MongoDB for SiteBlitz's CRM workflow.

Do not let an admin field overwrite a provider-backed fact without an explicit reconciliation record.

## Recommended development sequence for Claude

The project should retain the prior convention of independently verifiable phases, generally touching about eight files or fewer when practical. Coherent safety-critical changes may require more.

| Phase                      | Scope                                                                                | Prerequisite                              | Acceptance                                             |
| -------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------ |
| S0 — Safe environment      | Preview DB isolation, secret review, public grader remediation                       | Founder environment access                | Isolated tests and no unsafe public URL fetching       |
| A1 — Secure access         | Individual identities, hashed credentials or managed auth, owner/collaborator checks | S0                                        | Permission and session tests pass                      |
| A2 — Reliable alerts       | Telegram notifications, persistent status, retries, reconciliation                   | Safe lead test environment                | Success, failure, retry and duplicate scenarios pass   |
| A3a — Usable leads         | Search, status, owner, follow-up date                                                | A1/A2                                     | Operators can act on every new inquiry                 |
| A3b — Today + history      | Due/overdue work, interactions and error feedback                                    | A3a                                       | Two-user end-to-end workflow passes                    |
| A4 — Manual prospects      | Source-linked 30-record table, suppression, human deduplication                      | Access control and approved source policy | Evidence remains traceable, suppressed contact blocked |
| A5 — Quote references      | External quote URL, value, version and status                                        | First real qualified sales opportunity    | Quote traced without duplicating tax logic             |
| A6 — Projects              | Client content received, milestones, acceptance and handover                         | First paid project                        | Seven-day clock has a verified start point             |
| A7 — Reporting             | Revenue, cost, acquisition source; optional ad CSV                                   | Real customer/spend data                  | Reconciliation with provider records                   |
| A8 — Advanced integrations | Calendar, advertising APIs, richer CRM and automation                                | Proven need and explicit approval         | Provider-backed integration tests                      |

No phase is complete merely because a component renders. Claude should record tests, screenshots where relevant, environment, commit, deployment status and known failure cases.

## Consolidated Claude C20–C24 verdicts

| Claude position                                      | Verdict                          | My amendment                                                                                                         |
| ---------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| C20 — Build focused CRM, integrate surrounding tools | AGREE conditionally              | Compare development labor against inexpensive ready-made CRMs; do not let the custom build delay selling             |
| C21 A1 — Individual accounts                         | AGREE                            | Secure minimal authentication and critical audit events first; avoid an oversized identity system                    |
| C21 A2 — Telegram alerts                             | AGREE                            | Use minimal payloads, persistent delivery state, reconciliation and a retry design compatible with actual hosting    |
| C21 A3 — Pipeline                                    | AGREE                            | Prioritize owner, due date, history, search and Today before extra commercial fields                                 |
| C21 A4 — Prospect register                           | AGREE with NOW-LITE              | Manual 30-record source register, suppression and review; no enrichment engine                                       |
| C21 A5/A6 — Quotes and projects NEXT                 | AGREE with clarification         | Manual quotes/payments first; introduce minimal project tracking at the first paid sale                              |
| C22 — Entity chain                                   | PARTIALLY AGREE                  | Separate Opportunity from Quote; allow direct Leads, repeat Projects and multiple Payments                           |
| C23 — Google/Meta advertising APIs LATER             | AGREE                            | Update Google's 2026 Cloud-project access model and Meta's renamed tier system                                       |
| C24 — Operations and monthly costs                   | AGREE, with corrections          | Atlas Flex with backups is cheaper than the assumed dedicated tier; verify actual Vercel plan and restore capability |
| S-1 — Grader DNS rebinding in backlog                | DISAGREE with deferral if public | Publicly reachable untrusted URL fetching makes this an immediate security remediation candidate                     |

## Round 5 decision log

All decisions remain subject to founder approval for implementation and material operational changes.

| ID    | Decision                                                                              | Status   | Owner                | Validation / approval                                            |
| ----- | ------------------------------------------------------------------------------------- | -------- | -------------------- | ---------------------------------------------------------------- |
| D-048 | Build a focused CRM in the existing stack, with an external CRM fallback              | PROPOSED | Claude + Founder     | Compare effort and running cost; approval required               |
| D-049 | Add individual authenticated admin users and server-enforced roles                    | PROPOSED | Claude               | Unauthorized-access tests; approval required                     |
| D-050 | Record and reconcile critical administrative changes                                  | PROPOSED | Claude               | Audit-log tests; approval required                               |
| D-051 | Use Telegram as an initial alert channel with persistent state                        | PROPOSED | Claude + Founder     | Two-recipient test and failure recovery; approval required       |
| D-052 | Prioritize Today, ownership, due dates and searchable lead history                    | PROPOSED | Claude               | Two-person workflow test; approval required                      |
| D-053 | Keep first 30 prospects in a small, manual, provenance-aware register                 | PROPOSED | Claude               | Source and suppression audit; approval required                  |
| D-054 | Keep tax invoicing and payment processing external                                    | PROPOSED | Founder + Accountant | Invoice/payment reconciliation; approval required                |
| D-055 | Separate Opportunity, Quote, Customer, Project and Payment entities logically         | PROPOSED | Claude               | Data model and lifecycle tests; approval required                |
| D-056 | Use Google Calendar's provider-backed scheduling rather than custom booking initially | PROPOSED | Founder              | Availability/confirmation test; approval required                |
| D-057 | Import advertising spend manually before building APIs                                | PROPOSED | Founder + Claude     | Native-platform reconciliation; approval required                |
| D-058 | Update Google Ads specification for the September 2026 access-model changes           | PROPOSED | Claude               | Current documentation and authorized test; no API connection yet |
| D-059 | Update Meta specification for the May 2026 tier changes                               | PROPOSED | Claude               | Permissions/tier review and authorized test; no connection yet   |
| D-060 | Defer advertising writes behind explicit financial approval gates                     | PROPOSED | Founder              | Controlled API/readback tests; approval required                 |
| D-061 | Isolate preview credentials and databases                                             | PROPOSED | Founder + Claude     | No preview-to-production writes; approval required               |
| D-062 | Evaluate Atlas Flex and verified backup restoration                                   | PROPOSED | Founder + Claude     | Actual tier, bill and restore test; approval required            |
| D-063 | Escalate S-1 to P0 if the unsafe grader path is public                                | PROPOSED | Claude               | Reproduction and remediation verification; approval required     |
| D-064 | Keep the CRM release limited to what helps win and deliver the first projects         | PROPOSED | Founder + Claude     | Scope, labor and first-sale impact review; approval required     |

## OPEN POINTS

| Item                 | Information needed                                                                   | Accountable party    |
| -------------------- | ------------------------------------------------------------------------------------ | -------------------- |
| Hosting plan         | Confirm whether personal Vercel scope is Hobby or Pro                                | Founder              |
| MongoDB cluster      | Actual tier, current backup availability and recovery objective                      | Founder / Claude     |
| Admin access         | Who needs login now; whether a managed auth option is acceptable                     | Founder              |
| Telegram             | Approval to create bot, confirm two recipients and notification privacy expectations | Founder              |
| Working email        | Domain registration and verified mailbox/send provider                               | Founder              |
| CRM effort           | Hours to complete A1–A3 versus ready-made CRM setup                                  | Claude               |
| First real quote     | What business name, tax status and invoice process are legally applicable            | Founder / Accountant |
| Demo/grader exposure | Is vulnerable URL fetching currently reachable in production?                        | Claude               |
| Ad accounts          | Do actual Google Ads or Meta ad accounts exist and who controls them?                | Founder              |
| Financial controls   | What spending threshold and approval process would govern future ad actions?         | Founder              |
| Operational capacity | Who checks new leads, failed alerts and overdue follow-ups each working day?         | Founder              |

### Principal official sources

Accessed 1 November 2026. Current documentation takes precedence over older tutorials where they conflict.

| Subject                       | Official source                                                                                                                                                                                                                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google Ads API access changes | [Google developer-token sunset](https://developers.google.com/google-ads/api/docs/api-policy/developer-token?utm_source=chatgpt.com); [API access levels](https://developers.google.com/google-ads/api/docs/api-policy/access-levels?hl=en\&utm_source=chatgpt.com)                                                                                            |
| Google Ads authorization      | [OAuth scope and token behavior](https://developers.google.com/google-ads/api/docs/oauth/internals?utm_source=chatgpt.com)                                                                                                                                                                                                                                     |
| Meta API tier changes         | [Meta announcement, May 2026](https://developers.meta.com/blog/updates-to-ads-management-standard-access-feature/?utm_source=chatgpt.com)                                                                                                                                                                                                                      |
| Meta API capabilities         | [Meta official Marketing API examples](https://www.postman.com/meta/facebook-marketing-api/overview?utm_source=chatgpt.com)                                                                                                                                                                                                                                    |
| Telegram                      | [Bot API](https://core.telegram.org/bots/api?utm_source=chatgpt.com)                                                                                                                                                                                                                                                                                           |
| Calendar                      | [Google appointment schedules](https://support.google.com/calendar/answer/11608416?hl=en\&utm_source=chatgpt.com)                                                                                                                                                                                                                                              |
| Payments                      | [Razorpay Payment Links APIs](https://github.com/razorpay/markdown-docs/blob/master/payments/payment-links/apis.md?utm_source=chatgpt.com)                                                                                                                                                                                                                     |
| MongoDB costs and backups     | [Atlas Flex costs](https://www.mongodb.com/docs/atlas/billing/atlas-flex-costs/?utm_source=chatgpt.com); [Flex backups](https://www.mongodb.com/docs/atlas/backup/cloud-backup/flex-cluster-backup/?utm_source=chatgpt.com); [Free cluster backup preview](https://www.mongodb.com/docs/atlas/backup/cloud-backup/free-cluster-backup/?utm_source=chatgpt.com) |
| Hosting                       | [Vercel pricing](https://vercel.com/pricing?trk=public_profile__reactions-text\&utm_source=chatgpt.com); [Cron limits](https://vercel.com/docs/cron-jobs/usage-and-pricing?utm_source=chatgpt.com)                                                                                                                                                             |
| Authentication                | [OWASP password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html?utm_source=chatgpt.com)                                                                                                                                                                                                                              |

## Round 5 conclusion — Handoff to Claude Code

I accept the architecture direction but recommend a smaller implementation boundary.

The first version of the operational admin should be able to answer:

Who contacted SiteBlitz? Who is responsible? What happens next? Was the action saved? Has the customer paid?

Everything else should justify its engineering cost.

Three matters are especially important before closing this round:

First: A secure, reliable lead pipeline matters more than decorative analytics, but authentication and alert infrastructure must not become an open-ended development project.

Second: Integrations should be implemented against current provider rules and actual granted permissions. Google Ads' developer-token sunset and Meta's access-tier changes must be incorporated into the technical specification.

Third: The confirmed DNS-rebinding gap deserves immediate evaluation because it may affect an already-public feature, not merely a future prospect-enrichment system.

Round 5 disposition: Broad agreement on the build-versus-integrate approach, phased CRM, native advertising tools and external finance systems. The disputed points are the exact amount of pre-sale CRM development and whether S-1 is an immediate production security blocker.

Proceed to Round 6 — Adversarial stress test and 90-day pre-mortem. That round should assume SiteBlitz still has no paying customers after 90 days and aggressively challenge the market choice, price, delivery assumptions, acquisition process, admin build and operating costs before finalizing the roadmap.

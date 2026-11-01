# SiteBlitz × Claude Code — Final Round 4

November 1, 2026 · AI marketing operations, infrastructure and first-customer launch

## Executive verdict

AGREE with the direction. CHANGE the implementation order and simplify the initial automation.

SiteBlitz has a clear commercial objective:

NOVEMBER 2026 TARGET

Paying customers

# 1

Ad spend ceiling

# ₹1,000

Recurring tool budget

# ₹0

The customer target is an objective, not a forecast or guarantee. The advertising cap includes applicable tax and charges; the domain purchase is a separately approved expense.

My five key decisions:

1. Keep Claude Code as the development and planning brain, not a continuously running autonomous marketing director.
2. Use WhatsApp Business + a minimal CRM, not 23–41 AI agents or paid communication APIs.
3. Use Netlify Free as the first hosting candidate, with staging verification and usage monitoring.
4. Do not require all three demos before advertising. Require an honest, functioning demo appropriate to the ad, a working homepage, correct pricing, contact flow and payment terms.
5. Launch the commercial minimum before the automation extras. A first paying customer matters more than an elaborate Telegram dashboard.

## 1. Attack on A — the ₹0 AI marketing architecture

### A1. Knowledge layer

AGREE, WITH ONE ARCHITECTURAL CHANGE

The proposed `knowledge/` structure is useful, particularly for maintaining the agreed packages, multilingual scripts, banned claims and customer qualification criteria.

However, a folder of Markdown files is not automatically a single source of truth.

If pricing exists separately in `site.ts`, an advertisement, a WhatsApp quick reply and a Markdown document, contradictions can still occur.

Recommendation: Use a canonical, machine-readable commercial configuration for prices, payment milestones, delivery terms and inclusions. The website and reusable scripts should derive values from it where practical; tests should detect mismatches in other published text.

Keep `knowledge/` for guidance such as brand voice, objections, qualification policy, consent handling and banned claims. These should be loaded into relevant Claude development sessions, not automatically embedded in public site responses.

The acceptance test is simple: change a test price in the central configuration and confirm every generated display or dependent test catches the change.

### A2. Quick-add lead form

AGREE — HIGH PRIORITY

This is the most commercially valuable automation in the proposed system.

I would make the minimum required fields: contact name or business name, contact method, source, stage and next action. Business type can be a short selection; the note field should be optional.

Do not force a founder to type an existing WhatsApp number twice or copy a complete conversation. Allow the next-action date to default to today and provide duplicate detection based on normalized contact details.

The 10-second target is a usability test, not a verified capability. Ask the founder to enter five realistic leads on a phone and measure the time and error rate.

An operationally sound Quick-add form matters more than an attractive admin dashboard.

### A3. Telegram interrupts

AGREE, BUT REDUCE INITIAL SCOPE

The proposed interrupt list mixes three different problems:

| Interrupt                  | Initial approach                                                     |
| -------------------------- | -------------------------------------------------------------------- |
| New website enquiry        | Telegram notification with lead reference and retry/failure tracking |
| Follow-up due              | CRM Today view first; optional Telegram digest                       |
| Three-concept weekly cap   | Simple database counter and visible warning                          |
| Advertising spend near cap | Manual daily ledger plus founder-controlled ad-account limit         |

The advertising warning has a critical flaw: manually entered spend cannot stop Meta from spending money. A Telegram alert based on yesterday's numbers is not a financial protection mechanism.

Use the campaign's native budget controls and direct Ads Manager checks as the primary protection. Telegram is supplemental.

For the initial release, only the web-lead alert deserves real-time automation. The rest can be displayed in the CRM until the team has demonstrated reliable daily usage.

### A4. Daily morning brief and scheduled functions

AGREE — NETLIFY HAS NATIVE SUPPORT

Netlify's official documentation confirms that Scheduled Functions are available on all pricing plans, including Free.

They run as serverless functions and consume metered compute resources. They have a 30-second execution limit and run automatically only for published deployments, not ordinary branch previews.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://docs.netlify.com\&sz=32)

Netlify Docs+1



Therefore, there is no need to introduce GitHub Actions solely because Netlify Free supposedly lacks scheduled jobs.

Preferred implementation: A small daily scheduled function that queries the CRM, sends a minimal summary to Telegram, records its execution result and does not invoke an LLM.

For 8:00 AM IST, configure the equivalent of 02:30 UTC if the scheduler uses UTC.

The brief should contain no unnecessary customer phone numbers, chat transcripts or financial account information.

### A5. Netlify credit correction

Netlify's current credit-based documentation confirms:

| Usage                                      | Credits        |
| ------------------------------------------ | -------------- |
| Free monthly allowance                     | 300            |
| Production deployment                      | 15             |
| Deploy Preview or branch deployment itself | 0              |
| Web bandwidth                              | 20 per GB      |
| Web requests                               | 2 per 10,000   |
| Function compute                           | 10 per GB-hour |

Preview deployments are free to create, but traffic, web requests, function compute and other metered usage can still consume credits.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://docs.netlify.com\&sz=32)

Netlify Docs+1



This is an important distinction from Claude's concern that every preview deploy necessarily costs another 15 credits.

A 190 KB JavaScript bundle is not the total page-transfer cost. Measurements must include images, fonts, HTML, CSS, API traffic, server rendering and actual requests.

### A6. Meta API and AI scoring

AGREE — DEFER BOTH

I support manual ad-spend entry for the first ₹1,000 test and deferring Meta Marketing API integration.

I also support omitting LLM-based lead scoring, paid scraping, voice agents and autonomous outreach. A few qualification questions and a human conversation are more explainable at this stage.

The first automation goal should be preventing missed leads, not predicting intent from tiny datasets.

## 2. Attack on B — domain, email, payment identity and hosting

### B1. Domain availability

NEED VERIFICATION

Claude's statement that `siteblitz.in` is likely available because it returned NXDOMAIN is not sufficient evidence for purchase.

A registered domain can lack working DNS records. ICANN's registration guidance distinguishes registration status from DNS operation.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.icann.org\&sz=32)

ICANN+1



Decision: Check registrar availability and renewal pricing, as well as the registered-name or trademark conflict risk, before purchase. The founder should own the registrar account and keep renewal credentials secure.

### B2. Free email forwarding is not a complete business mailbox

DISAGREE WITH THE PROPOSED TWO-WAY EMAIL ASSUMPTION

Cloudflare Email Routing can forward incoming mail to a Gmail inbox, but it does not provide ordinary outbound sending or replies from the routed custom-domain address.

Cloudflare explicitly states that replying to a forwarded message sends from the destination address, not from the original custom-domain address.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developers.cloudflare.com\&sz=32)

Cloudflare Email Service docs



Gmail's Send mail as feature has separate requirements, including SMTP configuration for applicable business-domain addresses. A forwarding-only address does not automatically satisfy them.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://support.google.com\&sz=32)

Gmail Help



Correct zero-mailbox plan:

Use WhatsApp Business as the primary sales channel. A dedicated Gmail account with the display name “Team SiteBlitz” can be used for legitimate outbound correspondence, subject to testing what recipients actually see.

Once `siteblitz.in` is registered, incoming forwarding to that mailbox may be configured and tested. Do not advertise `hello@siteblitz.in` as a fully functional two-way business address unless incoming delivery, replies and sender identity are confirmed.

If genuine domain-address sending becomes commercially essential, a supported mail service is a future expense for founder approval, not something to disguise with DNS records.

### B3. Anonymity versus legal payment identity

AGREE WITH CLAUDE

The founder can remain unnamed on the public website while providing their legitimate legal payment identity to customers.

However, the legal recipient should be disclosed before the customer sends money, not discovered only when the UPI app displays an unfamiliar name.

The quotation and receipt should make the relationship between the SiteBlitz trading name and the actual payee understandable.

If SiteBlitz is not a separately registered legal entity, the agreement must not imply that it is an incorporated company. The correct contracting identity, invoicing position and applicable taxes should be verified with an accountant or legal adviser.

I retain the approved payment schedule:

| Package  | Initial payment   | Final payment     |
| -------- | ----------------- | ----------------- |
| Launch   | ₹4,000            | ₹3,999            |
| Business | ₹9,000            | ₹8,999            |
| Custom   | Written quotation | Written quotation |

### B4. Hosting decision

AGREE — NETLIFY FREE FIRST

Netlify's official Free-plan announcement explicitly allows commercial projects. Its current pricing specifies a 300-credit monthly hard limit, and the site can pause when that limit is exhausted.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.netlify.com\&sz=32)

Netlify+1



That makes it a plausible zero-subscription-cost option, with an uptime risk the founder must understand.

The necessary staging tests are more important than a generic framework compatibility claim. They must include:

- Next.js route rendering and middleware; secure admin access and session behavior.
- MongoDB connections, separate preview data, form persistence and failed-submission recovery.
- The SSRF grader repair or temporary isolation of the grader.
- Working domain, HTTPS, WhatsApp URLs, redirects and the actual lead path.
- Function executions, bandwidth, credits, deployment rollback and new geography attribution behavior.

The current Netlify Next.js adapter supports App Router, SSR, route handlers and middleware, but documents implementation differences. Therefore, I cannot declare the existing application compatible without testing it.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://docs.netlify.com\&sz=32)

Netlify Docs



Rollback correction: A rollback to the old Vercel Hobby production site is not a satisfactory ongoing commercial fallback. Preserve a known-good, truthfully worded deployment on a commercially permitted host. Netlify documents that rolling back to a previous production deploy does not consume a new production-deploy credit, but successful recovery must be tested.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://docs.netlify.com\&sz=32)

Netlify Docs



### B5. GitHub Actions fallback

Use Netlify Scheduled Functions first.

GitHub Actions is an acceptable backup, but not a guaranteed exactly-on-time scheduler. GitHub documents delayed or dropped scheduled jobs during high load. Standard hosted runners are free for public repositories; private repositories are subject to account allowances and potential charges.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://docs.github.com\&sz=32)

GitHub Docs+1



Do not make the SiteBlitz source repository public just to obtain a free cron without separately assessing exposed code and configuration. Secrets must never be committed.

### B6. The ₹1,000 advertising control needs one numerical correction

The lifetime campaign budget should not be entered as ₹1,000 if applicable GST is charged on top of media spend.

Assuming 18% GST and no other charges:

| Allocation                  | Amount |
| --------------------------- | ------ |
| Planned maximum media spend | ₹800   |
| Estimated GST at 18%        | ₹144   |
| Unallocated safety buffer   | ₹56    |
| Maximum planned exposure    | ₹1,000 |

A lifetime media budget of approximately ₹800 is safer than ₹847.46, which leaves almost no room for billing variation.

Meta describes lifetime budgets as a total ad-delivery spending cap, unlike daily average budgets. The final account settings and actual billing treatment still require verification.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.publicnow.com\&sz=32)

PublicNow



The CRM's manual spend field should distinguish media spend from estimated total including tax. Set warnings before approaching the cap and require direct Ads Manager verification. A manually updated dashboard cannot enforce the limit.

## 3. Attack on C — the 14-day implementation plan

The plan is directionally correct, but its execution order is too crowded.

The greatest risk is that Claude spends days building a morning brief, Telegram alerts, the third demo and secondary-page styling while the founder still cannot reliably demonstrate a working product and collect payment.

The proper order is:

First: Security, truthful public content and permitted hosting

Second: Actual demo, homepage and commercial terms

Third: WhatsApp, lead capture, quotation and payment readiness

Fourth: Approved ₹800-media experiment

Fifth: Telegram summaries, third demo and secondary-page improvements

### Should advertising wait for all three demos?

No. But the advertisement must match what actually exists.

My release rule is:

| Situation                                                         | Decision                                                          |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| Salon demo, homepage and pricing ready; critical trust gates pass | May launch a salon-relevant ad without waiting for all three      |
| Salon and coaching demos ready; critical trust gates pass         | May launch the proposed broader service-business ad               |
| Only salon demo ready but broad ad promises several demos         | Revise the copy and demo offer before launch                      |
| Third showroom demo unfinished                                    | Do not delay a truthful, otherwise ready campaign solely for this |
| Hosting, WhatsApp, trust or payment path broken                   | Do not launch paid advertising                                    |

For the already selected broad Hinglish creative, I prefer two working demos—salon and coaching—before launch, but this is an optimization recommendation rather than a compulsory three-demo gate.

The homepage switcher must show only functioning demo destinations. Do not display unfinished demos as working.

Also, do not let the founder use old concept demonstrations during in-person visits until they have been checked for fictional results and clearly labeled.

## 4. Revised 14-day execution plan

November 2–15, 2026 · Proposed schedule, not a guarantee of development completion

| Dates     | Claude Code — Development                                                                                                              | Founder — Commercial work                                                                        | Exit gate                                              |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Nov 2–3   | Repair or isolate the grader; correct false public claims, location, dead contact paths and booking wording; establish Netlify staging | Check and purchase domain; configure WhatsApp Business; verify Meta account and payment settings | Safe, truthful staging environment                     |
| Nov 4–5   | Implement light design system, homepage, pricing/terms and salon demo in separate testable phases                                      | Approve copy and terms; review actual demo on phone; begin approved in-person conversations      | Working salon experience and truthful commercial offer |
| Nov 6–7   | Complete coaching demo; implement minimum lead capture and secure Quick-add, or a protected manual fallback                            | Test demo with real owners; test three qualification questions; record objections and leads      | Working sales path and reliable lead register          |
| Nov 8     | Run security, mobile, deployment, hosting-credit, DNS and end-to-end checks                                                            | Review production screenshots, payee identity, sample quote, terms and final ad                  | Written production-release decision                    |
| Nov 9–10  | Deploy only after approval; verify domain and monitor live errors                                                                      | Separately approve advertisement and budget; launch Hinglish Meta-to-WhatsApp ad                 | Real production verification and campaign launch       |
| Nov 11–13 | Address proven conversion defects; add showroom demo, alerts or digest only if core path is stable                                     | Reply to leads, demonstrate, quote and follow up; respect three-concept weekly cap               | Recorded qualified opportunities                       |
| Nov 14–15 | Check lead integrity, operational failures, hosting credits and customer feedback                                                      | Review actual results and loss reasons                                                           | Interim commercial scorecard                           |

Critical calendar correction: A campaign launched on November 9–10 will not complete seven full days until approximately November 16–17. The November 15 review must therefore be treated as an interim checkpoint, not the final seven-day advertising verdict.

The schedule must not be rescued by skipping security or truth checks. If the P0 gates are unfinished, reduce nonessential functionality or postpone advertising.

### Minimum release checklist

Pre-launch verification tracker

0 / 14

Public trust

No fabricated results, false location or misleading production claims

Working domain with HTTPS, valid contact and truthful commercial identity

Approved package prices, exclusions, ownership and refund terms

Technical reliability

Commercially permitted hosting verified on production

Lead and admin paths tested; database environments separated

Grader SSRF issue repaired or affected functionality disabled safely

Credits, rollback and failed-form behavior tested

Sales

At least one working demo genuinely matches the advertisement

WhatsApp opens the correct account on a real phone

Quote and payment process explains the legal payee

Lead ownership, next action and opt-out handling work

Advertising

Founder approves exact creative, audience and spending

Media budget accounts for taxes within ₹1,000 all-in

Source recording and daily spend checks are ready

Release blocked pending 14 unverified checklist items. Marking items here does not change the actual project or authorize deployment.

### Implementation discipline

For Claude, I retain the previous approximately eight-files-per-phase convention where practical, with type checks, tests, screenshots, commits and deployment-state records.

A phase is complete only when its functionality has been tested. Avoid a single commit that simultaneously redesigns the homepage, rewrites pricing, changes authentication and migrates the hosting environment.

The minimum test sequence should include phone and desktop widths, actual WhatsApp navigation, a sample form submission, a failed database request, a lead being saved, quote delivery, and a restore from a known-good deployment.

## 5. Consolidated decision register — FD-17 through FD-47

The following collapses the 31 original decision IDs into ten operational decisions. Earlier alternatives are superseded where noted.

| Decision IDs              | Consolidated final decision                                                                                                   | Debate status                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| FD-17, 18, 44             | ₹1,000 all-in advertising experiment, Meta-to-WhatsApp first, Hinglish creative first; Gujarati alternative                   | Agreed                                           |
| FD-19, 26, 33             | Industry demo before personalization; three concepts or nine hours per week initially; free-concept-first assurance           | Agreed; supersedes two-concept cap               |
| FD-20, 43, 46             | ₹7,999 Launch, ₹17,999 Business, Custom by quote; ₹4,000/₹3,999 and ₹9,000/₹8,999 payment splits; transparent costs           | Pricing founder-approved; contracts pending      |
| FD-21, 25, 27             | Broad South Gujarat service-business test, matched demo in chat; sector research continues without delaying launch            | Agreed; supersedes mandatory pre-ad 15/15 test   |
| FD-22, 28, 29             | Truthful Gujarat identity, no public founder photo/name; legal payment identity disclosed; Udyam only after eligibility check | Agreed                                           |
| FD-23, 30, 31, 32         | WhatsApp-led selling, human qualification, minimum CRM, recorded follow-ups and consent; internal 15-minute response target   | Agreed                                           |
| FD-24, 34                 | Netlify Free staging-first migration; deliberate production releases and resource monitoring                                  | Agreed conditionally on technical tests          |
| FD-35, 47                 | Trust, infrastructure, sales, spending and founder-approval gates precede advertising                                         | Agreed                                           |
| FD-36, 37, 38, 40, 41, 42 | Home/pricing/demos first; outcome-led Hero A, light design, live switcher, accessibility, English-first site                  | Agreed                                           |
| FD-39, 45                 | Salon, coaching and showroom demos, clearly labeled, no real-client data, no actual submissions                               | Agreed; third demo not an ad-launch prerequisite |

Status interpretation: These are agreed debate recommendations and founder-approved directions where specifically stated. They do not constitute permission for Claude to spend money, deploy production changes, contact prospects or launch ads.

### Decisions intentionally rejected or deferred

A 23–41-agent marketing team, paid LLM APIs, voice agents, automated intent scores, full multilingual website, native ad-control dashboard and immediate restyling of the remaining long-form pages are all deferred.

They may become useful after observed customer volume justifies their cost and complexity. They are not necessary to obtain the first paying customer.

## 6. One-page founder action sheet

# SITEBLITZ — FIRST PAYING CUSTOMER CAMPAIGN

**Campaign period:** November 2–30, 2026\
**Business objective:** Secure the first paying website customer.\
**Advertising objective:** Test whether a ₹1,000 all-in Meta campaign can generate a paying customer.

## 1. The offer we are selling

**SiteBlitz — Professional business websites**

- Launch: ₹7,999 — one page, target two working days after ready-to-build.
- Business: ₹17,999 — three pages, target seven working days after ready-to-build.
- Custom: Individually quoted.

Show a working industry demo first. Offer a free personalized homepage concept only to qualified businesses, initially limited to three concepts or nine total hours per week.

Payment for Business: ₹9,000 after concept/scope/agreement approval, then ₹8,999 after staging acceptance and before final launch or handover.

No guaranteed sales, Google rankings, or customer enquiries.

## 2. What the founder must prepare

**November 2–3**

- Verify and buy the SiteBlitz domain under an account the founder controls.
- Configure WhatsApp Business with the SiteBlitz identity, greeting, away message and quick replies.
- Verify the real legal payment recipient, prepare accurate receipt details and confirm applicable tax obligations.
- Prepare the Meta advertising account; do not start spending.
- Approve “South Gujarat” or “Navsari, Gujarat” as the public location wording.

**November 4–8**

- Review the homepage, pricing page and actual demos on a phone.
- Approve the final quotation and agreement.
- Conduct short conversations with local business owners and record their objections.
- Verify that the website, WhatsApp and lead register work before approving production release.

## 3. Advertising plan

**Channel:** Meta click-to-WhatsApp\
**Creative:** Hinglish, working website demonstration\
**Audience:** Local service businesses across the selected South Gujarat area\
**Budget:** Approximately ₹800 media, ₹144 assumed GST and ₹56 contingency, subject to account verification\
**Campaign duration:** Aim for seven days, within the approved spending limit

Do not launch until the final advertisement, business contact, demo, hosting and budget controls have been separately approved.

## 4. Sales process

Ad or introduction → WhatsApp → qualify business outcome, authority, budget and timing → show matching demo → personalized concept if qualified → written quotation → deposit → build → staging approval → final payment → launch.

Respond promptly during the intended 9 AM–9 PM IST coverage period. The 15-minute human-response target is internal until measured.

Follow up on days 1, 3 and 7 only where permission exists and the customer has not declined.

## 5. What to record every day

- Advertising media spend and estimated tax-inclusive total.
- New conversations and source.
- Qualified buyers.
- Demos and personalized concepts delivered.
- Concepts' actual working hours.
- Quotations issued.
- Deposits received.
- Follow-ups due and reasons customers did not proceed.

**Primary success metric:** At least one genuine paying customer with an accepted project scope.

Separately identify whether that customer came from paid advertising or free outreach. Do not attribute an organic sale to the ad campaign.

## 6. Final decision rule

**If customers buy:** Fulfill the work successfully, collect real evidence and evaluate whether the acquisition process can repeat profitably.

**If qualified buyers engage but do not buy:** Improve the offer, trust, objections and closing process before increasing advertising spend.

**If no qualified buyers respond:** Review creative, audience, campaign delivery and source data. Do not automatically raise the budget.

**If a technical, trust or spending-control gate fails:** Stop or postpone the campaign.

**Founder approvals still required:** Domain purchase, legal contracting details, production deployment, final ad creative, audience, actual advertising spend and any future paid tools.

## 7. Final open items and accountability

Only a few matters remain unresolved at the planning level.

| Open matter                           | Accountable owner    | Required resolution                                                       |
| ------------------------------------- | -------------------- | ------------------------------------------------------------------------- |
| Domain availability and renewal       | Founder              | Confirm registration status and purchase terms                            |
| Legal identity, GST and receipts      | Founder / accountant | Correct contracting and billing information                               |
| Working two-way email                 | Founder / Claude     | Choose tested Gmail/forwarding workflow; do not misrepresent capabilities |
| Netlify compatibility and free limits | Claude               | Staging test results and recovery plan                                    |
| Existing grader security              | Claude               | Fixed with tests or isolated from public use                              |
| Demo functionality                    | Claude               | Actual working routes and test evidence                                   |
| Advertising spend enforcement         | Founder              | Account-level verification of lifetime media budget and actual billing    |
| Public release and ad launch          | Founder              | Explicit, separate approval                                               |

The founder does not need to decide on future paid AI tools, advanced Meta integrations, multilingual website support, or an expanded marketing-agent workforce now.

## 8. Is the follow-up debate complete?

YES — PLANNING COMPLETE

I consider the four-round SiteBlitz follow-up debate complete.

We have reached a coherent, testable operating plan covering the advertising offer, sales psychology, multilingual WhatsApp scripts, buyer objections, pricing and guarantees, public redesign, working demos, free-tier architecture, operational tracking and launch schedule.

There is one important distinction:

| Workstream                                | Status                                        |
| ----------------------------------------- | --------------------------------------------- |
| Commercial positioning and pricing        | Agreed; package prices founder-approved       |
| Sales scripts and objection handling      | Drafts adopted for founder use                |
| Homepage, demo and pricing specifications | Agreed for implementation                     |
| AI marketing architecture                 | Simplified and agreed                         |
| Infrastructure migration                  | Decision made; technical verification pending |
| Website implementation                    | Not verified as completed                     |
| Production publication                    | Not authorized by this debate                 |
| Meta campaign                             | Not launched or authorized by this debate     |
| First paying customer                     | Not yet achieved                              |

### Final instruction for Claude Code

The next phase is implementation, not another strategic debate.

Build and verify the smallest complete customer-acquisition system first. Keep the founder's approved offer and truthful brand representation consistent. Do not divert development time toward elaborate automation while the core customer journey remains incomplete.

The finish line is not a beautiful SiteBlitz website or an impressive AI marketing diagram. It is a real customer who understands the offer, trusts the business, pays the agreed amount and receives the promised work.

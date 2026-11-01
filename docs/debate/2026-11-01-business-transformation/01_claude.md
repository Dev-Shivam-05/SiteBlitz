<?xml version="1.0" encoding="UTF-8"?>
<siteblitz_debate_prompt version="3.0" status="DRAFT_AWAITING_FOUNDER_APPROVAL" audience="ChatGPT_GPT-6">

  <purpose>
    This is the project-specific operating prompt for ChatGPT in an evidence-driven debate with Claude Code about transforming SiteBlitz from a zero-revenue web studio into a trusted, differentiated, profitable, and repeatable business. It governs strategy, product experience, acquisition, sales operations, administration, integrations, technical priorities, and implementation decisions. It is NOT a narrow website-design review, a fictional role-play, or authorization to execute external actions.
  </purpose>

  <activation_and_model_policy>
    <approval_gate>Do not use this draft to start a debate until the founder explicitly approves this version. Drafting, reviewing, and approving the prompt are distinct from authorizing implementation, deployment, spending, or outreach. Once approval is established, Claude Code may invoke its actual /debate skill and provide the opening agenda and evidence. ChatGPT begins Round 1 only after receiving that opening message. Do not simulate an unavailable debate command or invent a conversation with another agent.</approval_gate>
    <model_selection>Before starting, the operator should select GPT-6 in ChatGPT with Pro-level reasoning if that combination is genuinely available; otherwise use GPT-6 with Extra High reasoning. If neither configuration is accessible, disclose the limitation before proceeding. A prompt cannot independently change or verify the selected model or the UI's reasoning setting: do not claim that it has done so.</model_selection>
    <scope_control>Approval to debate authorizes research, critique, planning, and decisions for founder review; it does not authorize contacting customers, buying tools, launching advertisements, changing production data, or deploying the site. Such actions require separate explicit permission. Keep founder-controlled decisions visible.</scope_control>
  </activation_and_model_policy>

  <mission_and_definition_of_success>
    <mission>Think and decide as accountable members of the founding leadership team, without pretending to legally own the business. Your objective is not to make a prettier website. It is to create the strongest evidence-based, operationally feasible plan for obtaining SiteBlitz's first three paying customers and establishing a repeatable path to profitable acquisition, delivery, retention, and referrals.</mission>
    <north_star>Optimize the complete journey: discover an appropriate buyer → earn trust → capture and acknowledge the inquiry → qualify the opportunity → book a real conversation → present a credible offer → close and collect payment → deliver excellent work → obtain legitimate proof → earn repeat business and referrals.</north_star>
    <failure_definition>A debate fails if it produces an attractive design, broad feature inventory, unrealistic growth forecast, or impressive documentation without an executable route to actual customers. It also fails if proposed admin controls are merely mock interfaces, if fabricated social proof survives in production, or if a proposed capability is treated as delivered without verification.</failure_definition>
    <business_success>Success requires a credible first-customer acquisition plan, honest offer and unit economics, differentiated and usable customer journeys, a founder-operable minimum CRM, prioritized growth experiments, testable technical decisions, and a measurable implementation roadmap. Actual revenue remains an outcome to validate, never a guaranteed result.</business_success>
  </mission_and_definition_of_success>

  <roles_and_collaboration>
    <role name="ChatGPT" responsibility="commercial_strategic_adversarial_co_lead">Own the quality of ideal-customer segmentation, positioning, service offers, pricing, lead-generation strategy, conversion, sales process, customer lifecycle, competitive research, and economic consequences. Challenge Claude's engineering choices when they delay sales or create unnecessary complexity. Critique your own preferred commercial recommendations as rigorously as Claude's.</role>
    <role name="Claude_Code" responsibility="product_technical_execution_co_lead">Own direct inspection of the repository, runtime, tests, browser, architecture, implementation constraints, and verification of changes. Challenge unsupported market claims and bring concrete code or runtime evidence into debate. Claude is the coordinator for the actual /debate skill and the implementation handoff.</role>
    <role name="Founder" responsibility="final_decision_maker">Own brand direction, acceptable commercial risk, budgets, legal/business representations, production publication, advertising expenditure, customer contact, and other consequential approvals. The founder and one trusted collaborator are the intended users of the eventual admin system.</role>
    <collaboration_rules>Challenge specific assertions, not personalities. Agree promptly when evidence warrants it; do not manufacture conflict. For a disagreement, state the issue, best evidence, alternative, trade-off, and a test or fact that could resolve it. Never treat consensus as proof. If a proposal is premature, preserve it in the future backlog rather than silently deleting the founder's ambition.</collaboration_rules>
    <information_boundary>ChatGPT can use only the context and tools actually provided to it. Claude's access to the repository or browser does not grant ChatGPT direct access. When code, screenshots, logs, commits, or external facts are needed, request precise evidence from Claude. Do not state that you personally inspected a resource you did not access.</information_boundary>
  </roles_and_collaboration>

  <source_context date="2026-11-01" provenance="founder_supplied_prior_audit">
    <interpretation>These are claims from the supplied SiteBlitz draft, not fresh verification performed merely by reading this prompt. "Reported verified" means its author said they checked repository, runtime, or external evidence on the stated date. Revalidate material, time-sensitive, or contradictory claims. Preserve founder statements and unknowns as separate categories.</interpretation>
    <business>
      <fact status="REPORTED_VERIFIED_SITE_COPY">Brand: SiteBlitz, presenting as a web design studio for conversion-focused small-business websites; site copy says Mumbai, India, and founded in 2024. Actual business location, history, and claims require founder confirmation.</fact>
      <fact status="FOUNDER_STATED">Business is being managed as a zero-sales startup. No client, invoice, or payment records were found in the reviewed repository; this does not independently prove the absence of records elsewhere.</fact>
      <fact status="REPORTED_VERIFIED_SITE_COPY">Published packages: Launch ₹7,999 / US$99 (one page, 48 hours, one revision); Growth ₹14,999 / US$189 (up to five pages, four days, three revisions); Scale ₹24,999 / US$329 (up to ten pages plus integrations, seven days). Listed services include business websites, e-commerce and booking, landing pages, redesign/rescue, SEO/performance, and care plans.</fact>
      <fact status="UNCONFIRMED_COMMITMENT">Site claims include 48-hour delivery, 90+ Lighthouse performance, 24/7 WhatsApp support, and guaranteed indexing. No evidence is supplied that the founder can consistently fulfill these promises.</fact>
      <fact status="REPORTED_VERIFIED_SITE_COPY">Public contact path: +91 92744 90242. Listed email: hello@siteblitz.in. A single DNS check reportedly returned NXDOMAIN for the email domain on 2026-11-01; recheck before treating it as an ongoing failure.</fact>
    </business>
    <trust_and_production>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">No independently verifiable client work or testimonials. Four earlier case studies reportedly used AI-created mockups with other brand names, placeholder content, and unsupported performance results; the corrected preview now labels them concept studies with wireframes.</fact>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">Production at siteblitz.vercel.app was reportedly still serving a 2026-07-10 build on 2026-11-01 with withdrawn testimonials and unsupported case-study results. The safer revision had not been released. This is a high-priority credibility issue, subject to fresh verification and founder-authorized deployment.</fact>
    </trust_and_production>
    <technical_stack>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">Next.js 15 App Router, React 19, strict TypeScript, Tailwind CSS v4, MongoDB with Mongoose, and Vercel; GSAP animation and a WebGL hero. Eighty-one unit tests reportedly cover security-critical components; no end-to-end test suite was recorded.</fact>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">Public routes include home, services and six service detail pages, pricing, work, proof, process, about, contact with a three-step form, booking, blog, three industry landing-page groupings covering restaurants/clinics/law firms/boutiques as reported, a 48-hour-offer page, and a free website-grading tool. Verify actual route inventory rather than assuming every named category has a dedicated page.</fact>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">Visual identity: dark surfaces, acid-green accent, oversized typography, WebGL hero, and marquees. The founder strongly dislikes the current result. Lab-only mobile LCP was reported at or below 1.78 seconds on measured pages; no real-user performance conclusion follows from that result.</fact>
    </technical_stack>
    <lead_capture_and_admin>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">Contact and booking forms submit through /api/leads with validation, honeypot, rule-based score, and MongoDB persistence; a database failure triggers a WhatsApp handoff. Test whether that fallback reliably preserves context and actually completes the customer's intent.</fact>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">Booking accepts a selected day and time slot but has no connected calendar or verified availability; the choice is stored as lead text and WhatsApp confirmation is promised. No genuine calendar booking should be claimed.</fact>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">No founder notification fires for a newly submitted lead via email, WhatsApp, Telegram, or webhook. Treat this as a critical conversion-operations gap until retested.</fact>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">Admin has ten screens: eight traffic/analytics views, one grader-runs list, and one basic leads list. The screen named campaigns displays UTM/referrer traffic, NOT Google Ads or Meta advertising accounts.</fact>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">The leads screen has five status filters, basic status changes and notes, and call/WhatsApp/email links. It lacks lead search, owner assignment, follow-up dates, deal value, proposals, tasks, reminders, client/project records, and visible failed-update feedback.</fact>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">Admin access uses one shared environment-based login with a plaintext comparison; no separate collaborator account, role permissions, or audit trail.</fact>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">Analytics is first-party; there is no reported Google Analytics or ad pixel integration. The site honors GPC/DNT; /proof shows first-party traffic and real-user Core Web Vitals. Preview environments share the production database, which requires risk review.</fact>
      <fact status="REPORTED_VERIFIED_PREVIOUS_AUDIT">The website grader fetches a visitor-submitted URL using an SSRF guard, scores the site, and may retain an email. It is a potential component for a future, permission-compliant lead-intelligence system, not an already functioning autonomous lead engine.</fact>
    </lead_capture_and_admin>
    <capacity_and_governance>
      <fact status="KNOWN_TEAM_UNKNOWN_RESOURCES">Founder plus one trusted collaborator. Development capacity, service-delivery capacity, skills, advertising budget, tool budget, company registration, and GST position were not established in the supplied audit.</fact>
      <fact status="REQUIRES_LEGAL_VERIFICATION">India is an initial market; USD packages indicate international ambition. Relevant Indian privacy, consumer, tax, communication, and platform rules must be checked using current authoritative sources, with material legal questions referred to qualified counsel.</fact>
      <fact status="WORKFLOW_REPORTED">Claude's existing development rhythm is approximately one phase per session, typically touching no more than eight files, with tests, phone/desktop screenshots, commits, and pushes. Treat that as a planning constraint, not a reason to split a necessary coherent change irresponsibly.</fact>
    </capacity_and_governance>
  </source_context>

  <previous_work_postmortem>
    <reported_actions>On 2026-10-31, the prior agent reportedly removed unsupported claims in a preview, restored type-checking, hardened admin access, respected browser privacy signals, reordered the home page, adjusted SEO metadata, added a landing page and blog post, corrected mobile overflow on several admin screens, and wrote audits.</reported_actions>
    <reported_omissions>It reportedly did not deliver a visibly transformative design, a substantive CRM/admin upgrade, an authorized production release, or a commercial plan covering customer demand, offers, acquisition, selling, and fulfillment. Two earlier ChatGPT debates largely discussed prompt critique, homepage order, and SEO—not the path to customers.</reported_omissions>
    <diagnostic_hypotheses>Test whether the work over-optimized readily testable technical tasks while neglecting founder-visible quality and commercial impact; whether the assignment was wrongly framed as a website rather than a business; whether completion criteria were unclear; and whether the removal of false proof lacked a replacement strategy. Hypotheses must not be presented as proven root causes without evidence.</diagnostic_hypotheses>
    <audit_rule>For each material failure, provide observed behavior, source or reproducible test, customer/revenue impact, severity, confidence, root-cause hypothesis, recommended remedy, and a pass/fail acceptance test. Classify each existing asset as KEEP, FIX, REPLACE, REMOVE, or VERIFY FIRST.</audit_rule>
  </previous_work_postmortem>

  <decision_principles>
    <priority>Truth, legal compliance, security, and trust outrank growth shortcuts. Real customer value and conversion outrank visual novelty. Reliability and founder usability outrank decorative dashboards. Startup economics and reversibility outrank premature architecture. Differentiated design remains essential, but only if it enhances clarity, trust, or conversions.</priority>
    <build_buy_integrate>Do not default to custom-building everything. Compare building, buying, integrating, and manually operating each capability by cost, setup time, control, user experience, maintainability, vendor constraints, and time to revenue. Retain Next.js/MongoDB/Vercel unless a concrete alternative has better documented economics or solves a serious limitation.</build_buy_integrate>
    <evidence_labels>For material claims use VERIFIED FACT, DIRECT OBSERVATION, REASONED HYPOTHESIS, PLANNING ESTIMATE, UNKNOWN, or PROPOSED ACTION; attach HIGH, MEDIUM, or LOW confidence where a recommendation is made. A fact from the prior handoff remains REPORTED PRIOR-AUDIT until independently checked.</evidence_labels>
    <sources>Research competitors, acquisition practices, API access, pricing, privacy rules, and relevant benchmarks using current official documentation and credible public sources. Cite URLs and access dates where possible. Do not claim access to private competitor metrics, company revenue, customer data, or proprietary processes. Learn transferable principles without cloning protected designs or identities.</sources>
    <numbers>Never invent clients, case studies, testimonials, conversion rates, CPC, CAC, ROAS, delivered project counts, margins, or guaranteed outcomes. Where financial inputs are unavailable, display assumptions, a sensitivity range, the underlying formula, and the fastest test that would replace the assumption with observed data.</numbers>
    <focus>Prioritize near-term opportunities without deleting the full founder vision. Separate NOW, NEXT, LATER, and REJECTED WITH REASON. A sophisticated feature is not valuable merely because it can be built.</focus>
  </decision_principles>

  <debate_protocol maximum_rounds="10" core_rounds="7">
    <round_execution>Complete seven thematic rounds. Use up to three additional rounds only for evidence-based unresolved disagreements or material discoveries. Do not add rounds to fill a quota. Claude provides its agenda and evidence; ChatGPT answers each numbered question directly and responds to every unresolved objection from the preceding Claude message.</round_execution>
    <answer_contract>For each agenda question provide: DECISION or RECOMMENDATION; EVIDENCE and confidence; one meaningful ALTERNATIVE and why it loses; COMMERCIAL/UX/TECHNICAL TRADE-OFF; and HOW TO VALIDATE. Explicitly distinguish a founder decision from something the agents can determine. Be concise on settled issues and detailed on material risks.</answer_contract>
    <challenge_contract>Label responses to Claude's claims AGREE, DISAGREE BECAUSE, or NEED EVIDENCE. When disagreeing, propose a falsifiable test or decision rule. Attack your own strongest recommendation at least once in each relevant round. Do not disclose private chain-of-thought; provide inspectable reasoning summaries, calculations, and sources.</challenge_contract>
    <decision_log>At the end of each round propose records in the format: D-### | decision | status (PROPOSED/AGREED/DISPUTED/BLOCKED) | accountable owner | evidence | validation | founder approval needed (yes/no). Include a compact OPEN POINTS section; avoid re-arguing settled points without new information.</decision_log>
    <tool_failure>If browsing, repository evidence, an API specification, or direct verification is unavailable, say what is blocked, provide conditional recommendations, and assign a concrete verification request to Claude. Never simulate external access or successful tool actions.</tool_failure>
  </debate_protocol>

  <round_agendas>
    <round number="1" name="Truth audit and first-sale blockers">
      <question id="1.1">Recheck the highest-risk public credibility failures: old production testimonials/case-study claims, invalid email DNS, unsupported performance and delivery promises, and confusing project proof. What requires immediate remediation?</question>
      <question id="1.2">Audit the actual lead journey, booking flow, notifications, admin workflows, and public UX. What is broken versus merely visually disliked? What could lose a sale this week?</question>
      <question id="1.3">Classify current assets, including the grader, /proof, industry landing pages, existing packages, current stack, and analytics, as KEEP/FIX/REPLACE/REMOVE/VERIFY FIRST.</question>
      <question id="1.4">Rank likely constraints on the first sale: customer demand, trust, offer, pricing, proof, reachability, follow-up, delivery capacity, and founder sales time. Name the evidence needed to resolve uncertainty.</question>
      <required_output>P0 risk register; verified failure inventory; immediate customer-path repairs; source/uncertainty table.</required_output>
    </round>

    <round number="2" name="Market, offer, pricing, and first three sales">
      <question id="2.1">Compare at least three plausible customer segments: Indian local businesses (including relevant restaurant, clinic, legal, retail or service niches), businesses with weak or missing websites, international small businesses, and white-label agency partners where applicable. Evaluate urgency, willingness to pay, acquisition cost, reachability, sales cycle, competition, and delivery effort.</question>
      <question id="2.2">Stress-test ₹7,999/US$99, ₹14,999/US$189, and ₹24,999/US$329 against actual scope, revision risk, support promises, delivery capacity, payment fees, taxes, and contribution margin per founder-hour. Explicitly identify any assumptions.</question>
      <question id="2.3">Recommend one primary ideal-customer profile, one backup, a defensible differentiated offer, realistic delivery commitment, and whether care plans or subscriptions should be sold now or later.</question>
      <question id="2.4">Create a concrete first-three-paying-customers strategy, including honest methods to produce early portfolio proof, example outreach positioning, where the initial prospects can be sourced legally, and what happens after the first affirmative reply.</question>
      <required_output>ICP comparison matrix; offer and pricing decision; unit-economics model; first-three-sales playbook.</required_output>
    </round>

    <round number="3" name="Distinctive brand, public UI/UX, and conversion">
      <question id="3.1">Critique the dark/acid-green/WebGL/marquee design based on screenshots, customer fit, visual clarity, distinctiveness, accessibility, performance, and founder feedback; do not infer that a fast LCP proves good UX.</question>
      <question id="3.2">Propose two or three genuinely distinct visual and positioning directions, with design principles, representative homepage messaging, trust treatment, typography/imagery guidance, mobile-first layout, and specific pros/cons. Recommend one with explicit acceptance criteria.</question>
      <question id="3.3">Design complete customer journeys from landing page to inquiry, trustworthy portfolio, honest proof, consultation, proposal, and follow-up. Replace fictional testimonials with real demos clearly labeled as concepts, transparent process, founder credibility, verified grader evidence, and ultimately permissioned client case studies.</question>
      <question id="3.4">Define actual booking semantics, acknowledgment and response expectations, form recovery behavior, mobile and accessibility test cases, and founder-admin UX standards. Recommend what to simplify or remove.</question>
      <required_output>Comparative design directions; selected design system; page-level conversion architecture; usability acceptance tests for desktop and phone.</required_output>
    </round>

    <round number="4" name="Acquisition experiments and lawful lead intelligence">
      <question id="4.1">Rank founder-led outreach supported by credible website audits, Google Business Profile/local discovery where eligibility is verified, SEO, helpful content, partnerships, directories, referrals, and small capped Search/Meta advertising experiments. Explain the order for a near-zero budget.</question>
      <question id="4.2">For each promising channel give the target customer, offer, landing page or asset, funnel, budget or resource cap, attribution, leading KPI, paying-customer metric, test duration, and explicit stop/pivot criteria. Do not invent benchmark outcomes.</question>
      <question id="4.3">Design the minimum viable lead-discovery system: approved public data sources; respecting search/listing API licenses, crawling restrictions and privacy; detection of concrete website problems; company match and deduplication; explainable scoring; source URLs and timestamps; and export to CRM.</question>
      <question id="4.4">Separate OBSERVED DEFECT from INFERRED NEED from VERIFIED BUYING INTENT. Define human-reviewed, relevant outreach, contact-permission checks, response management, and unsubscribe/suppression handling. Compare manual research, rules, and LLM assistance for cost and accuracy.</question>
      <required_output>Prioritized growth experiment board; lead-discovery data flow and scoring rubric; safeguards and success metrics.</required_output>
    </round>

    <round number="5" name="Founder-operated admin, CRM, APIs, and technical feasibility">
      <question id="5.1">Specify the minimum operational admin: new-lead alert, searchable pipeline, lead ownership for two users, follow-up tasks, overdue reminders, interaction history, simple proposal/quote workflow, customer records, and delivery tracking. Design end-to-end workflows and recovery states, not decorative pages.</question>
      <question id="5.2">Compare building a focused CRM inside existing Next.js/MongoDB against integrating an established CRM. Provide ongoing cost, vendor lock-in, setup effort, operator experience, failure points, and upgrade path.</question>
      <question id="5.3">Define an honest advertising command center. Investigate Google Ads and Meta Marketing APIs separately: account linking, authorized scopes, developer tokens/app approval, supported reads and writes, reporting freshness, campaign drafts, budget approvals, launches, pauses, audit logs, cost limits, and safe native-platform fallbacks. Do not promise unavailable APIs or automatic approval.</question>
      <question id="5.4">Cover individual admin accounts, role-based access, secure secret handling, audit trails, backups, production/preview data separation, lead notifications, real scheduling, business email deliverability, Indian payments/invoicing/GST verification, monitoring, privacy and operating expense.</question>
      <question id="5.5">Produce a practical admin information architecture and data-entity map connecting acquisition source → lead → owner/task → proposal → customer → project → payment → outcome. Define which modules are NOW/NEXT/LATER.</question>
      <required_output>Admin user journeys and screens; build-vs-buy decision; integrations feasibility matrix; basic data model; security and implementation acceptance tests.</required_output>
    </round>

    <round number="6" name="Adversarial stress test and 90-day pre-mortem">
      <question id="6.1">Assume SiteBlitz still has zero customers after 90 days. Identify the five most plausible commercial and operational causes and the earliest warning indicators.</question>
      <question id="6.2">Attack the chosen ICP, offer, pricing, channel mix, design direction, lead scoring, CRM architecture, and integration assumptions. Identify where either AI is using optimistic assumptions or building ahead of demand.</question>
      <question id="6.3">Simulate failure cases: disconnected database, missed lead notifications, duplicate prospects, misleading portfolio content, calendar conflicts, unapproved ad expenditure, blocked API permissions, privacy complaints, and unreliable delivery promises.</question>
      <question id="6.4">Recommend specific cuts, reversals, safeguards, and pivot triggers. Preserve viable long-term differentiators in a backlog rather than implementing everything immediately.</question>
      <required_output>Pre-mortem, assumption risk ranking, mitigations, pivot triggers, and revised priority order.</required_output>
    </round>

    <round number="7" name="Decisions, roadmap, and founder-ready handoff">
      <question id="7.1">Consolidate agreed decisions and unresolved disputes with evidence, owner, expected commercial impact, and a validation method. Escalate genuinely founder-only choices.</question>
      <question id="7.2">Write immediate 48-hour and 7-day actions, then a 30/60/90-day plan across FIRST REVENUE, CORE PRODUCT/OPERATIONS, GROWTH INFRASTRUCTURE, and ADVANCED DIFFERENTIATORS.</question>
      <question id="7.3">Size development into independently verifiable phases, normally no more than about eight files per phase where practical; name dependencies, estimated effort, acceptance tests, screenshot/browser checks, and deployment approval gates.</question>
      <question id="7.4">Create a KPI scorecard distinguishing visits → inquiries → qualified leads → consultations → proposals → paying customers → revenue → gross profit, plus response time, delivery success, customer satisfaction, and real-user experience.</question>
      <question id="7.5">Provide a concise founder action sheet: the initial buyer type, priced offer, source of honest proof, first prospect-discovery approach, initial outreach method, next critical admin fixes, resource needs, and decisions requiring approval.</question>
      <required_output>Founder-ready operating plan, decision log, prioritized technical backlog, experiment board, scorecard, and explicit open questions.</required_output>
    </round>
  </round_agendas>

  <cross_cutting_requirements>
    <commercial_research>Look at credible Indian and international web studios, productized services, relevant no-code/DIY substitutes, freelancers, and white-label partners. Evaluate pricing and positioning from public evidence. Distinguish observable marketing from unknowable commercial results.</commercial_research>
    <performance_and_quality>Define meaningful checks for core user journeys, responsive interfaces, contrast, keyboard access, form errors, Core Web Vitals, event instrumentation, SEO discoverability, and accessibility. Test in browsers at desktop and phone widths after implementation. Do not confuse lab metrics with actual visitor satisfaction.</performance_and_quality>
    <integrations>Advertising controls, analytics, notifications, appointment booking, payment and lead-discovery integrations must use real supported APIs or clearly marked manual handoffs. For each, document available operation, authentication, permissions, data freshness, failure behavior, approval gate, and verification mechanism.</integrations>
    <legal_and_ethics>Respect relevant Indian laws, privacy obligations, platform terms, robots restrictions, WhatsApp Business rules, and applicable anti-spam/telecom norms. Do not bypass authentication, harvest private personal data, or send unapproved mass messages. Require human approval for every initial outbound contact and for paid or irreversible actions. Flag legal interpretation for qualified counsel.</legal_and_ethics>
    <production_truth>Never treat a preview build as deployed. Record environment, version or commit, test outcome, and whether changes are implemented, tested, staged, or in production. Prioritize removal of misleading live claims through an approved release.</production_truth>
    <two_person_reality>Keep the operating model simple enough for a founder and one collaborator. Show what can be run manually, what can be integrated cheaply, what deserves automation, and what would exceed current delivery capacity. Treat unknown resources as unknown.</two_person_reality>
  </cross_cutting_requirements>

  <illustrative_quality_examples>
    <example case="campaigns">Wrong: "The admin already has a campaign manager." Correct: "The existing campaigns view reportedly groups UTM/referrer traffic; there is no verified Google Ads or Meta account connection. A real ad manager requires verified account access, supported API operations, approvals, and confirmed state changes."</example>
    <example case="lead_intent">Wrong: "This business has a slow website, so it needs our services and will buy." Correct: "A slow page is an observed signal if measured reliably. The inferred business need remains uncertain; qualify with customer fit, economic impact, public indicators, and a respectful, approved inquiry."</example>
    <example case="booking">Wrong: "The booking system works because it saves a chosen slot." Correct: "The system captures a preference but does not verify calendar availability or send a dependable confirmation; call it a request until scheduling is implemented and tested."</example>
    <example case="commercial_forecast">Wrong: "₹10,000 in ads will produce ten clients." Correct: "Model a budget-capped test with declared assumptions, observe qualified inquiries and closed sales, and decide whether to continue based on real acquisition economics."</example>
  </illustrative_quality_examples>

  <required_final_deliverables>
    <deliverable id="1">Verified failure-and-remediation register, including founder-visible UI/UX and admin problems.</deliverable>
    <deliverable id="2">Cited competitive opportunity matrix with observable lessons and differentiation options.</deliverable>
    <deliverable id="3">Primary and secondary ICPs, offer, pricing, unit economics, and first-three-customers playbook.</deliverable>
    <deliverable id="4">Brand and design direction, design-system principles, page-level journeys, customer trust plan, and measurable UX standards.</deliverable>
    <deliverable id="5">Channel-ranked acquisition and SEO experiment plan with spend caps, attribution, and stop rules.</deliverable>
    <deliverable id="6">Lawful lead-intelligence architecture, evidence-based scoring, data lineage, and approved outreach process.</deliverable>
    <deliverable id="7">Founder-operable minimum CRM and admin specification, including future advertising management and API feasibility.</deliverable>
    <deliverable id="8">Architecture, integration, privacy, security, reliability, and operational cost decisions.</deliverable>
    <deliverable id="9">48-hour, 7-day, and 30/60/90-day implementation and market-validation roadmap with owners and tests.</deliverable>
    <deliverable id="10">Consolidated decisions, conflicts, unknowns, founder approvals, and KPI scorecard.</deliverable>
  </required_final_deliverables>

  <completion_and_stop_condition>
    <completion>Declare the DEBATE complete only when the ten deliverables are covered to an actionable level, critical assumptions are visible, alternatives have been challenged, important facts have sources or verification requests, and each near-term phase has an accountable owner and a measurable acceptance condition. A founder must know exactly what to do first, how much is at risk, and how success or failure will be detected.</completion>
    <not_completion>The debate is NOT complete merely because seven rounds occurred, both agents agreed, a beautiful redesign was proposed, or a large future feature backlog exists.</not_completion>
    <implementation_boundary>Any subsequent coding and operational execution is a separate authorized phase. Report what has been proposed versus actually built and tested. Do not promise background execution or completed outcomes before they exist.</implementation_boundary>
    <start_instruction>AFTER founder approval and receipt of Claude Code's opening agenda, start Round 1. Until then, remain in DRAFT_AWAITING_FOUNDER_APPROVAL state.</start_instruction>
  </completion_and_stop_condition>

</siteblitz_debate_prompt>

<project_context>
<file path="E:/Temp/SiteBlitz/docs/debate/2026-11-01-business-transformation/evidence.md">
# Evidence: fresh checks by Claude Code, 2026-11-01 (IST morning)

Labels: VERIFIED = checked by command/code/live URL today. HYPOTHESIS = not yet tested.

## Live production (siteblitz.vercel.app)
- VERIFIED: `/api/proof` → `builtAt 2026-07-10T17:50Z`, commit `4ee3cc1`, i.e. NOT the corrected `v2-redesign` build.
- VERIFIED: live home HTML contains "Nikhil Verma" ×8, "Spice Route" ×4, "Most chosen" ×1 (withdrawn fabricated testimonial / case study / badge).
- VERIFIED traffic (first-party, from `/api/proof`): **5 visitors and 56 pageviews in the last 7 days**; daily sessions in Oct: 1, 4, 4, 7, 2, 1, then 53 on 2026-10-31 (agent testing; previews write to the production DB) and 3 on 11-01. Real-user vitals: 13 samples, LCP 936 ms, CLS 0.009, INP 172 ms. **The site has essentially no organic or paid traffic.**
- VERIFIED: `/proof` and the home "proof strip" publish these live numbers to visitors (e.g. "5 visitors this week").

## Domain and email
- VERIFIED: `siteblitz.in` → NXDOMAIN from the local resolver AND Google DNS (`dns.google/resolve`, Status 3, authority = .in registry). The domain is not registered/delegated. `[REDACTED]` (published on /contact, footer, schema) cannot receive email.
- VERIFIED: no custom domain; the brand lives on `siteblitz.vercel.app`.

## Lead path (code)
- VERIFIED: `/api/leads` = zod validation + honeypot + rule-based score (`scoreLead`) → Mongo `Lead`. Needs phone or email.
- VERIFIED: on DB failure the form calls `window.open(wa.me…)` **after an awaited fetch** and then shows the success state (`LeadForm.tsx:82-87`). HYPOTHESIS: popup blockers (esp. iOS Safari) can block this, so the visitor sees "done" while nothing was sent. Needs a device test.
- VERIFIED: `/book` = day + slot picker; stored as lead text "Requested brief call: <day> at <slot> IST"; goal field "Booked brief call"; prefilled WhatsApp text says "I just booked a brief call". No calendar, no availability check, no confirmation message is sent by the system.
- VERIFIED: no notification of any kind on a new lead (no email/SMS/WhatsApp/Telegram/webhook code in `src/`).

## Admin (code)
- VERIFIED nav: Overview, Live, Visitors, Leads, Grader, Funnel, Pages, Campaigns, Audience, Activity: 8 of 10 are traffic analytics for a site with ~1 visitor/day.
- VERIFIED Leads: list of 25/page, filter by `new|contacted|qualified|won|lost`, status `<select>`, append note, tel/wa/mailto links. No search, owner, next-follow-up date, value, proposal, task, customer, project, payment.
- VERIFIED: status/note PATCH ignores the HTTP result (`admin/leads/page.tsx:63-74`); a failure is silent.
- VERIFIED auth: one account, `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars, plaintext compare, JWT cookie. No users collection, roles or audit log.

## Public UX (screenshots attached: home 1440 + 390, work 1440, pricing 1440, contact 390)
- OBSERVED: hero = huge "WEBSITES / THAT WIN / BUSINESS." on black with an acid-green WebGL smoke; looks like many dark "agency" templates.
- OBSERVED: `/work` heading "Work that works" directly above "They are concepts, not client projects"; cards are empty grey wireframes.
- OBSERVED: `/pricing` stacks two headers ("PRICING / Honest numbers, zero surprises" then "PRICING / Agency quality, without the agency invoice"); no price visible in the first desktop viewport.
- OBSERVED: `/contact` = 3-step brief + WhatsApp + email cards (the email card points at the dead domain).

## Content inventory
- VERIFIED: 6 service pages, 4 industry landers (restaurants, clinics, law firms, boutiques), 7 blog posts, `/website-in-48-hours`, `/tools/grader`.

## Unknown (founder only)
Team hours and skills, who delivers sites, budget, any real past work, legal entity/GST, domain ownership intent, India-only vs international.

## Model note
ChatGPT UI shows effort "Extra High"; the model name is not displayed in this UI, so GPT-6 cannot be confirmed by Claude.

</file>

<file path="src/lib/site.ts">
export const SITE = {
  name: "SiteBlitz",
  tagline: "Websites that win business, shipped in 48 hours.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://siteblitz.vercel.app",
  email: "[REDACTED]",
  phone: "+91 92744 90242",
  phoneRaw: "[REDACTED]",
  whatsapp: (text: string) =>
    `https://wa.me/[REDACTED]?text=${encodeURIComponent(text)}`,
  city: "Mumbai",
  country: "India",
  founded: 2024,
} as const;

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/proof", label: "Proof" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Contact" },
] as const;

export type Currency = "INR" | "USD";

export const PLANS = [
  {
    id: "launch",
    name: "Launch",
    priceINR: 7999,
    priceUSD: 99,
    blurb: "A razor-sharp single page that makes your business look established and gets the phone ringing.",
    delivery: "48-hour delivery",
    features: [
      "Conversion-focused one-page site",
      "Mobile-first, blazing fast (90+ Lighthouse)",
      "On-page SEO + Google indexing setup",
      "WhatsApp & call integration",
      "Contact form with lead capture",
      "1 revision round",
    ],
    highlight: false,
  },
  {
    id: "growth",
    name: "Growth",
    priceINR: 14999,
    priceUSD: 189,
    blurb: "A multi-page presence engineered to rank locally and convert visitors into enquiries on autopilot.",
    delivery: "4-day delivery",
    features: [
      "Up to 5 custom-designed pages",
      "Local SEO + Google Business sync",
      "Analytics dashboard included",
      "Lead management panel",
      "Blog / updates section",
      "Speed & Core Web Vitals tuning",
      "3 revision rounds",
    ],
    highlight: true,
  },
  {
    id: "scale",
    name: "Scale",
    priceINR: 24999,
    priceUSD: 329,
    blurb: "The full weapon: custom features, integrations and a growth engine your competitors can't copy.",
    delivery: "7-day delivery",
    features: [
      "Up to 10 pages + custom features",
      "E-commerce / booking integrations",
      "Advanced analytics & funnels",
      "CRM / WhatsApp automation hooks",
      "Content & copywriting assistance",
      "Priority support, 30-day care plan",
      "Unlimited revisions (fair use)",
    ],
    highlight: false,
  },
] as const;

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Brief",
    time: "30 minutes",
    text: "One focused call or WhatsApp chat. We extract what your business does best and who needs to hear it.",
  },
  {
    n: "02",
    title: "Blueprint",
    time: "Same day",
    text: "You get a visual direction and page architecture before we write a single line of code. No surprises.",
  },
  {
    n: "03",
    title: "Build",
    time: "24–48 hours",
    text: "Design and engineering happen in one motion. Real content, real SEO, real speed — not a template dressed up.",
  },
  {
    n: "04",
    title: "Blitz",
    time: "Launch day",
    text: "Domain, hosting, analytics, search indexing — wired and verified. You watch the first visitors arrive live.",
  },
] as const;

export const FAQS = [
  {
    q: "How can you deliver a real website in 48 hours?",
    a: "Because we've productised the process. A focused brief, a battle-tested design system, and senior execution with modern tooling — no agency bureaucracy, no six-week email chains. Speed is engineering, not a shortcut.",
  },
  {
    q: "What do I need to provide?",
    a: "Your business details, any photos or brand assets you have, and 30 minutes for the brief. Missing content? We draft professional copy for you and generate placeholder visuals until you replace them.",
  },
  {
    q: "Will my website show up on Google?",
    a: "Yes — properly. Every build ships with technical SEO: server-rendered pages, structured data, sitemap, fast Core Web Vitals, and Search Console submission. Ranking positions take time, but indexing and a healthy foundation are guaranteed.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Absolutely. We work remotely with clients worldwide — pricing is available in INR and USD, and we operate async-friendly with clear communication over WhatsApp or email.",
  },
  {
    q: "What happens after launch?",
    a: "You own everything — domain, code, content. Growth and Scale plans include a live analytics dashboard so you can see every visitor, and our care plan covers updates. No hostage-taking, no forced monthly fees.",
  },
  {
    q: "What if I don't like the design?",
    a: "You see the visual direction before the build starts, and every plan includes revisions. In the rare case we can't land a direction you love, you don't pay. Simple.",
  },
] as const;

/**
 * Concept studies — how SiteBlitz would build for a sector. NOT client projects: SiteBlitz has no
 * client case study with recorded evidence and permission yet (docs/audit/claims-register.md).
 * Publish a real case study here only with the client's permission and numbers that can be shown.
 */
export const WORK_ITEMS = [
  {
    slug: "restaurant",
    title: "Restaurant one-pager",
    category: "Concept study · Restaurants",
    goal: "From a hungry phone visitor to a booked table in three taps.",
    stack: ["One-page", "Reservations", "Local SEO"],
    story:
      "Menu, hours, map and a booking button in the first scroll — on a phone, on patchy 4G. Everything on the page pushes towards one action: reserving a table. Local search markup tells Google exactly what you serve and where.",
  },
  {
    slug: "clinic",
    title: "Clinic multi-page site",
    category: "Concept study · Healthcare",
    goal: "One page per treatment, so patients find the exact answer they searched for.",
    stack: ["Multi-page", "Appointments", "Content SEO"],
    story:
      "Patients search for a treatment and an area, not a clinic name. A calm, trust-first build with a page per service, structured data and appointment capture answers that search directly — without the competitor's ads in between.",
  },
  {
    slug: "fashion",
    title: "Boutique storefront",
    category: "Concept study · Fashion & retail",
    goal: "Editorial photography that still loads fast on a mid-range Android phone.",
    stack: ["E-commerce", "Lookbook", "Performance"],
    story:
      "Beautiful catalogues fail when they take ten seconds to load. Responsive, compressed imagery, a lookbook that streams in as you scroll, and an enquiry or checkout path that is never more than one tap away.",
  },
  {
    slug: "law",
    title: "Law firm authority site",
    category: "Concept study · Legal",
    goal: "Every practice-area page leads to one discreet consultation request.",
    stack: ["Authority site", "Lead capture", "Speed"],
    story:
      "In law, credibility is the product. Clear practice-area pages that answer real questions, a quiet and fast design, and a consultation path that respects how sensitive the first contact is.",
  },
] as const;

export const SERVICES = [
  {
    title: "Business Websites",
    text: "Conversion-engineered sites for restaurants, clinics, firms and local businesses. Designed to rank, built to sell.",
    tags: ["48h delivery", "SEO-ready", "Lead capture"],
  },
  {
    title: "E-commerce & Booking",
    text: "Storefronts and booking systems that feel effortless on a phone — because that's where your customers are.",
    tags: ["Payments", "Catalogues", "Reservations"],
  },
  {
    title: "Landing Pages",
    text: "Single pages with one job: turn ad clicks into enquiries. Built for campaigns, measured to the click.",
    tags: ["A/B ready", "Ad-friendly", "Fast"],
  },
  {
    title: "Redesigns & Rescues",
    text: "Slow, dated or invisible on Google? We rebuild on a modern stack and migrate your SEO without losing rankings.",
    tags: ["Migration", "Speed", "Recovery"],
  },
  {
    title: "SEO & Performance",
    text: "Technical SEO, Core Web Vitals, structured data and local search. The unglamorous work that prints results.",
    tags: ["Audits", "Schema", "Local SEO"],
  },
  {
    title: "Care & Growth",
    text: "Monthly updates, analytics reviews and iteration. Your site keeps getting sharper while you run the business.",
    tags: ["Updates", "Analytics", "Support"],
  },
] as const;

</file>

<file path="docs/audit/claims-register.md">
# D1 — Claims-provenance and tracking audit

Date: 2026-10-31 · Branch `v2-redesign` · Read-only phase · Labels: VERIFIED · OWNER-STATED · INFERRED · UNKNOWN

## Headline findings

1. **The four "case studies" are not evidenced as client work, and their images are AI-generated mockups that show
   different brands.** VERIFIED by opening each image:
   - `portfolio-1.png` (shown as "Spice Route Kitchen") shows a site for "NOCTURNE BISTRO" with garbled menu text.
   - `portfolio-2.png` (shown as "Meadow Health Clinic") shows "Sprenahn Medical Clinic" with *lorem ipsum* body text.
   - `portfolio-4.png` (shown as "Verma & Associates") shows "LOGO LAW FRMD" and garbled text.
   No client brief, contract, analytics export, permission or URL exists anywhere in the repo. The results attached to them
   (2.4×, page 1 for 8 keywords, 38%, 3×, "11 seconds") have no recorded source.
2. **The same client stories are repeated in 15 long-form JSON files**, often in the first person ("When we rebuilt …",
   "a fashion label we work with"), and several sit next to "every claim we make … is public at /proof".
3. **`/proof` claims more than it shows.** `src/app/proof/page.tsx:15` says "Every claim on this site is verifiable here."
   `/proof` shows this site's own traffic, real-user Core Web Vitals and deploy time — nothing about client results.
4. **Five named testimonials have no provenance.** They name people tied to the four unevidenced clients
   (e.g. "Adv. Nikhil Verma, Managing Partner, Delhi" ↔ "Verma & Associates").
5. **`/privacy` does not match runtime behaviour** (see Tracking below).

Owner disposition is pending for every row. Under the owner's "go for all" (2026-10-31), the agreed rule applies:
unsupported claims are withheld from publication (C1) until evidence is supplied. Nothing is deleted from history;
every removed sentence is recoverable from git.

## Register

| # | Claim (published wording) | Where | Evidence | Status | C1 action |
|---|---|---|---|---|---|
| 1 | "Spice Route Kitchen … 2.4× more table bookings in 60 days" | `site.ts:136-145`; lander-restaurants; post-google-business-profile…; post-what-a-small-business…; post-why-website-speed…; service-ecommerce-and-booking | none; image shows another brand | UNSUPPORTED | withhold |
| 2 | "Meadow Health Clinic … first page of Google for 8 local keywords" | `site.ts:146-155`; lander-clinics; post-generative-engine…; post-google-business-profile…; post-landing-page-vs-website…; post-what-a-small-business…; service-seo-and-geo | none; image shows lorem ipsum | UNSUPPORTED | withhold |
| 3 | "Noir Atelier … 11 seconds → 38% lift in catalogue enquiries" | `site.ts:156-165`; lander-boutiques; post-landing-page-vs-website…; post-website-cost-india…; post-what-a-small-business…; post-why-website-speed…; service-ecommerce-and-booking; service-landing-pages; service-project-rescue | none | UNSUPPORTED | withhold |
| 4 | "Verma & Associates … consultation requests up 3× in one quarter" | `site.ts:166-175`; lander-law-firms; post-landing-page-vs-website…; post-what-a-small-business…; service-business-websites | none; image shows "LOGO LAW FRMD" | UNSUPPORTED | withhold |
| 5 | Portfolio images 1-4 presented as "website by SiteBlitz" | `WorkGallery.tsx`, `work/page.tsx`, landers, services | AI-generated mockups with garbled / lorem text | VERIFIED not client work | remove from display |
| 6 | Five named testimonials | `site.ts:212-238`, `sections/Testimonials.tsx` | none | UNSUPPORTED | withhold |
| 7 | "100% On-time launches" | `sections/Stats.tsx:8` | no delivery records | UNSUPPORTED | replace |
| 8 | "Every claim on this site is verifiable here." | `proof/page.tsx:15` | `/proof` shows own analytics only | INACCURATE | reword |
| 9 | "Real business websites by SiteBlitz … with measurable results" (meta) | `work/page.tsx:9-11` | — | UNSUPPORTED | reword |
| 10 | "48-hour delivery" / "Fastest full delivery 48h" | `site.ts:3, 33`; `Stats.tsx:6` | the owner's offer | OWNER-STATED commitment | keep |
| 11 | "Mobile-first, blazing fast (90+ Lighthouse)" / "90+ Lighthouse performance" | `site.ts` plans; `Stats.tsx:7` | a build target the owner sells | OWNER-STATED commitment | keep (owner to confirm) |
| 12 | "24/7 WhatsApp support" | `Stats.tsx:9` | — | OWNER-STATED commitment | keep (owner to confirm) |
| 13 | "indexing and a healthy foundation are guaranteed" | `site.ts:120` | — | OWNER-STATED commitment | keep (owner to confirm) |
| 15 | "Most chosen" badge on the Growth plan | `sections/Pricing.tsx:58` | no sales data | UNSUPPORTED | replaced with "Recommended" (X1) |
| 14 | Live visitor count, weekly visitors, real-user LCP/CLS, last deploy | `ProofStrip.tsx`, `/proof` | first-party data from `/api/proof` | VERIFIED mechanism | keep |

## Tracking vs disclosure

| Item | Runtime behaviour (VERIFIED) | `/privacy` says | Gap |
|---|---|---|---|
| `sb_sid` | httpOnly, 30-min idle session id (`api/track/route.ts:61`) | "a short-lived session cookie" | none |
| `sb_vid` | httpOnly, **1-year** visitor id (`api/track/route.ts:68`) | "an anonymous visitor cookie" | duration not disclosed |
| Geography | city, region, country, timezone from Vercel headers stored per session (`route.ts:83-86`); IP truncated to /24 before storage (`route.ts:33-35`) | "approximate location (country/city derived from IP)", "IP addresses are truncated" | none (corrected 2026-10-31: first draft wrongly said undisclosed) |
| Retention | no TTL index in `src/lib/models.ts` or anywhere in `src/`; raw per-session/pageview rows kept indefinitely (production Atlas indexes not checked) | "Analytics data is kept in aggregate" | **inaccurate** |
| Content | random ids + page paths + referrer/UTM + device + vitals | "random identifiers only — no personal information" | partly inaccurate: a persistent id + city is pseudonymous personal data under most regimes (check with counsel) |
| User control | no opt-out, no Do-Not-Track / Global Privacy Control handling | "You may request deletion" | no self-serve control |

C1 corrects the wording; PR1 adds the behaviour (retention + honouring a browser opt-out signal).

## Not checked (and why)

- Production MongoDB indexes and env vars — no production credentials used in this audit.
- Whether the current **production** deployment (2026-07-10) carries the same claims — it predates `v2-redesign`
  but was built from the same lineage; the C1 patch reaches production only at release (L1).

</file>

<file path="docs/audit/d2-site-admin-audit.md">
# D2 — Site, mobile, admin and performance audit

Date: 2026-10-31 → 2026-11-01 · Branch `v2-redesign` · Tools: `scripts/shoot.mjs` (CDP screenshots, device metrics,
overflow detection, `--rm`, `--cookie`) and `scripts/vitals.mjs` (lab LCP / CLS / TBT / JS).

## Defects found and fixed tonight

| # | Defect | Where | Evidence | Fix (commit) |
|---|---|---|---|---|
| 1 | Home page scrolled sideways to 565 px at 320-375 px under reduced motion | `BigMarquee` words are `nowrap`; rm rule set `overflow: visible` | shoot `OVERFLOW scrollWidth=565` | clip-x + wrap (`a4beef2`) |
| 2 | Desktop concept gallery hid cards 3+ off-screen under reduced motion | pinned hscroll is off in rm | full-page rm screenshot | wraps into a 2-col grid (`e85a65a`) |
| 3 | Lab LCP 2.9-4.8 s on `/contact`, `/about`, `/services`, `/pricing`, `/work` | first-screen text had `.reveal` (opacity 0 until JS) | vitals: LCP element was the `.reveal` node | headers paint with HTML (`d2650b0`) |
| 4 | 7 page titles rendered "… \| SiteBlitz — SiteBlitz" | pages appended the brand that the layout template already adds | `curl … <title>` | suffixes removed (`181c4ba`) |
| 5 | `/admin/visitors` 931 px wide at 375 px; `/admin/campaigns` 705 px; `/admin` 395 px; capacity input at 320 px | flex/grid children with `min-width:auto` around wide tables | shoot with a local admin cookie | `min-w-0` on main + Card, wrapping header, fluid input (`bb97617`) |
| 6 | Typecheck unusable (OOM) and build ignored type errors | untyped `model()` helper | `tsc` OOM at 6 GB | P5 (`a1b3d51`) |
| 7 | Unsupported claims (results, testimonials, "100% on-time", "Most chosen", `/proof` and `/privacy` wording, `llms.txt`) | see `docs/audit/claims-register.md` | — | C1a-d + X1 |

## Lab performance after fixes (production build, `npm start`, local)

Mobile profile: 4× CPU, 1.6 Mbps / 150 ms RTT, 390×844 @2x, fresh profile (includes the first-visit Preloader), median of 3.

| Page | LCP | LCP element | CLS | TBT | JS |
|---|---|---|---|---|---|
| `/` | 1.78 s | H1 line "THAT WIN" | 0.000 | 98 ms | 192 KB |
| `/pricing` | 1.33 s | H1 | 0.000 | 81 ms | 187 KB |
| `/work` | 1.21 s | intro paragraph | 0.000 | 65 ms | 185 KB |
| `/contact` | 1.12 s | intro paragraph | 0.000 | 87 ms | 186 KB |
| `/about` | 1.16 s | intro paragraph | 0.000 | 88 ms | 190 KB |
| `/services` | 1.15 s | intro paragraph | 0.000 | 62 ms | 184 KB |
| `/website-in-48-hours` | 1.09 s | H1 | 0.001 | 50 ms | 187 KB |
| `/services/business-websites` | 1.40 s | intro paragraph | 0.000 | 160 ms | 185 KB |
| blog post | 1.32 s | first paragraph | 0.000 | 80 ms | 185 KB |
| `/` desktop (no throttling) | 0.75 s | H1 | 0.019 | 286 ms | 188 KB |

These are **lab** numbers from one machine. Field p75 (real users) is what `/proof` publishes and is the acceptance
criterion; it cannot be measured until this build is in production. Desktop TBT 286 ms on home is the WebGL shader +
GSAP boot; INP in the field is the number to watch.

## Responsive coverage verified

- Public: 11 pages × 320/375/768 reduced-motion, 7 pages × 320/390 full motion, home + about × 320-1920 — no overflow,
  no console errors.
- Admin: 10 screens × 320/375/768/1440 with a locally signed admin cookie and no database (so this also covers the
  "database not connected" empty states) — no overflow after fix 5.

## Not covered

- No E2E suite; forms were not submitted end-to-end (no database locally by design — see `docs/DEPLOY.md` R11).
- VERIFY section E (admin auth) manual run against real credentials: not possible (no local or preview credentials).
  Automated equivalent: `tests/admin-routes.test.ts` + `tests/middleware.test.ts`.
- Screen-reader pass and keyboard-only walkthrough: not done.

</file>
</project_context>

<topic>
# Opening message from Claude Code: Round 1

**Approval:** the founder approved prompt v3.0 on 2026-11-01 ("Use … v3.0.xml prompt that is the update version now go
for it"). Treat the prompt as ACTIVE for this debate. The approval covers debate only: no implementation, deployment,
spending or outreach.

**Model:** the ChatGPT UI shows reasoning effort "Extra High". It does not show the model name, so Claude cannot
confirm GPT-6. If you can state your model, do; otherwise say it is unknown.

**Agenda (one theme per round):** 1 Truth audit and first-sale blockers · 2 Market, offer, pricing, first three sales ·
3 Brand, UI/UX, conversion · 4 Acquisition and lawful lead intelligence · 5 Admin/CRM/ads APIs/feasibility ·
6 Pre-mortem · 7 Decisions and roadmap. Rounds 8-10 are kept for disputes.

The attached `evidence.md` holds today's fresh checks; they supersede the "reported" labels in the prompt where they
overlap. Also attached: `site.ts` (all copy, plans, FAQs), the claims register, the site/admin audit, and 5 screenshots.

## Round 1: Truth audit and first-sale blockers

Answer Q1.1-1.4 under the answer contract, and respond to each of Claude's positions below with AGREE / DISAGREE
BECAUSE / NEED EVIDENCE.

**Claude's opening positions (attack them):**

C1. **P0 this week, in this order:**
  (a) The founder approves a production release, so the fabricated testimonial, results and "Most chosen" leave the live
      site. This is a one-command release of a build that has already been tested.
  (b) Remove `[REDACTED]` everywhere until a real domain and mailbox exist, or buy the domain. A studio selling
      websites without its own domain is itself a trust failure.
  (c) A new-lead alert to the founder's phone. Nothing alerts anyone today, and the site promises "replies within hours".
  (d) Unconfirmed commitments ("24/7 WhatsApp support", "indexing guaranteed", "90+ Lighthouse", "48 h") are each
      confirmed by the founder, or reworded with preconditions.

C2. **Broken vs disliked.**
  - *Broken:* lead alerting, the dead email, booking that says "booked" without being a booking, silent admin update
    failures, possibly the WhatsApp fallback (untested), and preview traffic polluting the production numbers that /proof
    publishes.
  - *Disliked:* the visual style.

  The "broken" items lose sales. The style matters less than proof.

C3. **Asset classification.**
  - Grader: KEEP and extend, as the core of prospect audits.
  - `/proof`: FIX, because publishing "5 visitors this week" hurts trust more than it helps. Show method and build
    quality, not traffic, until traffic is meaningful.
  - Industry landers: VERIFY FIRST, since there is no demand data.
  - Packages: VERIFY FIRST (Round 2).
  - Stack and first-party analytics: KEEP.
  - The 8 admin analytics screens: REMOVE or collapse into one, and spend that effort on the CRM.

C4. **First-sale constraint ranking (hypothesis):**
  1. Reachability. The site has about 1 visitor a day, so inbound cannot produce a sale; customers must be found outbound.
  2. Proof. There is no real work at all.
  3. Founder sales time and follow-up discipline.
  4. Offer clarity.
  5. Price.

  Demand for small-business websites in India is probably not the constraint. Evidence that would settle this: the
  founder's weekly hours, any real past work, and the reply rate from the first 30 hand-researched, founder-approved
  outreach attempts.

End with the decision log (D-001 onward) and OPEN POINTS.
</topic>

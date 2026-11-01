# Claude Code: Round 3 verdicts, then Round 4

## Round 3: per-point verdicts

- **Correction to C11: accepted.** The mobile hero does show "Fixed prices from ₹7,999" and a CTA (my own screenshot
  confirms it). The real deficit is buyer-relevant proof.
- **Palette: verified, with one problem.** I recomputed the contrast ratios: ink on canvas 13.87, white on teal 6.42,
  muted on canvas 5.70, all correct. **The warm accent #E7B877 on canvas is 1.73:1.** That fails even the 3:1 UI
  minimum, so it may only be a fill behind ink text (8.01:1) or pure decoration, never text, an icon or a focus ring.
- **D-027, equal assets for both segments: agreed.** Implementation: one shared landing-page template with two content
  files, and one shared demo component with two content sets. The extra cost is content, not engineering.
- **D-028, simulation first: agreed.** The demo is a client-side simulation with fixed sample data and a permanent
  "Simulated: nothing is sent" label. The real lead flow is proven separately by the P0 tests.
- **Read-only admin pages: agreed.** The rule becomes "every admin page supports a named decision".
- **D-023 to D-033: agreed as PROPOSED.** The founder chooses the brand direction.

## Round 4: acquisition and lawful lead intelligence

Answer Q4.1-4.4. Claude's positions:

**C16. Channel order for a near-zero budget:**
1. Warm network and in-person visits in one locality. The only cost is founder time, and it gives the richest
   objections.
2. Referral partners who already sell to these owners: chartered accountants, coaching-software or clinic-software
   vendors, printers, local associations. Offer a disclosed referral fee.
3. Founder-written, one-to-one email to the enquiry address a business publishes on its own website. This needs:
   - a real person as sender;
   - one specific, verified observation about their site;
   - an opt-out line;
   - no more than 10 emails a day, each approved by the founder.

   **Blocker:** this needs a working domain mailbox first (P0). Legal basis in India: "check with counsel".
4. SiteBlitz's own Google Business Profile, but only if it is eligible (real address or service-area verification;
   verify the current guidelines).
5. A small capped Google Search test, only after the landing pages and conversion tracking exist. Proposed: a
   founder-set cap of ₹3-5k, 14 days, high-intent queries only. Stop if there are 0 qualified enquiries at the cap.
   Meta comes later.
6. Paid directory listings (Justdial/Sulekha-type): VERIFY FIRST. Costs and lead quality are unknown.
7. SEO and content: keep the existing pages and add the two vertical pages. Expect nothing inside 90 days.

**C17. A minimum lead-discovery system that is semi-manual, not a crawler.** Add a `Prospect` record in the admin:
- name, category, locality, website, source URL + date for every field, contact path + its source;
- verified defects: a single grader fetch of their public homepage, recorded with timestamp, user agent, robots.txt
  checked, and a stored evidence screenshot;
- reviewer notes, score and status.

Deduplication uses the normalised domain, then phone (E.164), then name + locality.

**Rubric (explainable, rule-based, 100 points):**
- *Fit, 0-40:* segment match, locality, independent rather than chain.
- *Evidence of need, 0-40:* one weighted line per verified defect (no website, broken site, not mobile-usable, no
  enquiry path, SSL/expiry problems, very slow), each linked to its evidence.
- *Contactability, 0-20:* only a published business enquiry channel counts.

Intent tiers are explicit and never inferred upward: `observed_defect`, then `inferred_need`, then `verified_interest`.
Only `verified_interest` means a human reply that shows interest.

An LLM only drafts the personal note, which the founder edits. It never scores.

**Later automation:** discovery through the Google Places API, storing only `place_id`, which Maps Platform terms
allow, and fetching details fresh on view. Verify the current Places caching terms.

**C18. Suppression and logging.**
- A global suppression list (domain, email, phone) is checked before any send.
- Every outreach event is logged with who approved it.
- One opt-out ends all contact with that business.

**C19. Attribution.**
- UTM parameters per campaign or channel on every link, not per person (keeps the privacy promise).
- Revenue attribution happens in the CRM: lead → `source` → won/lost, recorded by hand at qualification.

Give each experiment its full card: target, offer, asset, funnel, cap, attribution, leading KPI, paid-customer metric,
duration, stop/pivot rule. Cite the GBP eligibility rules, Places caching terms and any Indian email or anti-spam rule
you rely on. End with the D-log and OPEN POINTS.

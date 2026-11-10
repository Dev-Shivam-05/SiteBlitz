# Round 5 - your round-4 corrections are applied; please review the India page (SEO-8) before the owner sees it

## Round 4 applied
- Classes renamed everywhere (pages, chart labels, CSV headers, Dataset variableMeasured, OG cards, llms.txt):
  "Low-reuse website URL", "Shared-host or locator-pattern URL", "Directory/marketplace URL only", "No URL recorded in the
  website field". Your definition sentence is on both pages.
- Implementation-true method text: our extract keeps ONE website URL per record (the first that is not a social profile
  or a common listing page; Google/Justdial/Practo/Zomato links are dropped when the extract is built), so "no URL in the
  website field" includes records whose only links were social/listing. Host frequency = distinct study records with that
  host across all 93,948 records, computed before any split. Locator patterns published (singleinterface.com; hosts
  beginning nearme./store./stores./location./locations./branch./branches./pin.). Your outcome labels used; precedence
  sentence added. "Percentages are calculated from the counts before rounding" added; Surat says differences are
  descriptive within the selected records, not estimates for all businesses.
- IndexNow: two unchanged runs gave 0 changes once the live /proof page hashes metadata only.
- Perf found by measurement: an opacity fade on hero figures made them the late LCP element (2.8-3.4 s); now transform
  only (1.1-1.3 s). Body-font swap re-wrapped long hero paragraphs (CLS 0.17); DM Sans is now display: optional (0.00).

## New: /research/india-business-website-records-2026 (your Q3.2), built and audited locally
- Population: India extract (4,673,948 place records) -> same 17 activity-defined trades, no brand recorded:
  1,323,078 records. Principal measure: any website URL recorded = 32.4 % (none 67.6 %). Classes as secondary:
  low-reuse 21.5 %, shared/locator 10.1 %, directory 0.8 %. Host frequency computed ONCE nationally (7,308 hosts in 3+).
- States: raw state values folded into the 36 states/UTs (Orissa->Odisha, Uttaranchal->Uttarakhand,
  Pondicherry->Puducherry, "Jammu and Kashmir (State)"/"Jammu Kashmir"/"j&k"->J&K, Daman & Diu + Dadra and Nagar
  Haveli -> the merged UT, spelling variants). 30,209 records from 319 other raw values (district names such as Sikar or
  Visakhapatnam, typos, foreign, missing) are counted in the India total and in no state, and the page says so.
  Because variants are merged, Gujarat has 5 more records here than in the Gujarat study; the page says that too, and
  says a state's low-reuse share is not comparable with the single-state study (national vs state host frequency).
- One page, states as table rows with anchors (no per-state pages). Rows under 1,000 records are greyed "few records".
  The lead names highest/lowest only among states with >= 10,000 records: "Delhi and Karnataka records carry one most
  often, Assam and Madhya Pradesh least." (Delhi 40.9 % of 63,435; Karnataka 40.3 % of 94,108; Assam 23.4 % of 16,157;
  Madhya Pradesh 26.4 % of 48,885.) Chandigarh shows 93.3 % on 120 records and is greyed.
- Title "India Business Website Records by State, 2026 — SiteBlitz"; H1 "How often do business listings in India carry
  a website link?"; Dataset JSON-LD; CSV (state x trade counts); CC BY 4.0.

## Questions
Q1. Approve the India page for launch after the owner reads it, or name the exact blocker.
Q2. Is naming the two highest and two lowest states (>= 10,000 records) in the lead acceptable, given trade-mix and
mapping-completeness differences? If not, give the replacement sentence.
Q3. Is the unclear-state bucket (2.3 % of records) handled acceptably, or should those records also be left out of the
India total?

Answer Q1-Q3: agree / disagree because ... / need data. End with the list of points still open.

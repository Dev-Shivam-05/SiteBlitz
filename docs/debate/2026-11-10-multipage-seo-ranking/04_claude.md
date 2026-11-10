# Round 4 - your round-3 corrections applied; approve or block, then the next assets

## What changed (built and committed locally, nothing deployed)
- D1: trades are defined by activity only. pizza_restaurant, indian_grocery_store and organic_grocery_store are back.
  Each record has one Overture category, so each record is counted once (a test asserts trades sum to the total).
  Population named on the page as "listing records with no brand recorded", never "independent businesses".
- Four classes, one per record: own website URL (host used by at most one other trade record) / shared or chain URL
  (host used by 3+ records, or a chain store-locator host such as singleinterface.com, stores.*, nearme.*: "branches,
  franchises or duplicate listings, a flag rather than proof") / directory or marketplace URL (indiamart, justdial,
  oyorooms, g.page, zomato, practo, ...) / no URL recorded. Builder tenants keep their own host (name.blogspot.com).
  The page also states the rule misjudges both ways (a family business with 3 branches; a chain with 2 records).
- Result: 93,948 records; own 22.5 %, shared/chain 7.0 %, directory 0.5 %, no URL 70.0 %. Restoring the three
  sub-categories moved the own share by 0.1 point because their chain URLs now land in the shared class.
- Live check re-run on the new frame (own class, 21,157 records), unit = listing record, seed 20261111, one GET,
  10 s, no retry, 2026-11-11 00:10 IST. Outcomes defined on the page: ok (2xx) 28, no DNS 18, timeout 5, refused
  401/403/429 4, other 4xx 2, connection failed 2, parked/for-sale page 1. Worded with your sentence: "This describes one
  run from one connection. It does not estimate how many Gujarat businesses have a working website." The "upper bound"
  sentence is gone; your replacement ("A recorded URL does not establish ... not verified website ownership or
  availability") is on the page.
- D2: /research/gujarat-business-websites-2026/surat built with your title, H1 and meta; Surat vs REST of Gujarat (counts
  subtracted, then shares), differences in points, "not tested for statistical significance", your three-line note.
  Surat: 16,697 records, 25.0 % own; rest of Gujarat 77,251 records, 22.0 % own. Selected rows (Surat own | rest own | pts):
  Clothing & boutiques 4,232 | 32.9 % | 16.7 % of 8,469 | +16.2 ; Jewellery 796 | 38.2 % | 23.1 % | +15.1 ;
  Coaching 430 | 41.2 % | 36.3 % | +4.8 ; Real estate 949 | 28.0 % | 33.9 % | -5.9 ; Interior designers 221 | 40.3 % | 45.7 % | -5.5 ;
  Furniture & hardware 636 | 19.0 % | 24.0 % | -5.0 ; Restaurants 2,079 | 13.2 % | 14.4 % | -1.1 ; Mobile 932 | 11.4 % | 10.3 % | +1.1.
  The page prints only the widest gap above and below, with no explanation of why.
- D3: landing pages now say "A one-page landing page within the Launch package is Rs 7,999 ... requirements outside the
  package are priced by written quote", plus an FAQ listing the Launch inclusions.
- D4: home title now "SiteBlitz — Gujarat-based Website Design & Development Studio".
- Roman-Hindi guide: your replacement copy used as written (metadata, sections, six questions, FAQ). The English guide got
  the same factual fixes (no "cheap quote deletes three lines", no "client-side rendering never ranks", the Rs 3,000 FAQ
  rewritten as an example). Pair kept as hreflang en / hi-Latn / hi, reciprocal (tested).
- R3: your off-site steps are now docs/SEO-LAUNCH-CHECKLIST.md; your IndexNow script is in scripts/indexnow.mjs (one
  change: home URL may be written with or without a trailing slash), plus scripts/indexnow-manifest.mjs which fetches the
  live sitemap and hashes title + description + canonical + text of <main> + JSON-LD per page. Both were dry-run against
  the current live site (30 of 30 URLs hashed, 30 changed vs {}, nothing submitted). Key file public/<32-hex>.txt.

## Questions
Q1. With these changes, approve publishing the hub and the Surat page at launch (after the owner reads them), or name
the exact remaining blocker.

Q2. The Surat clothing (+16.2) and jewellery (+15.1) gaps are the most quotable numbers. May the Surat page or a press
note lead with them, and in exactly which words, given the shared-host rule and listing coverage limits?

Q3. We hold the same Overture extract for all of India (4.67 M place records, every state) and the world. Name at most
three further assets that would most increase non-brand search visibility and AI citations for this studio within 3-6
months WITHOUT creating scaled or doorway content (e.g. an India state table on the same method; a yearly re-run with a
change log; a free "is my business listing showing my website?" checker that reads public listing data for one business
at a time). For each: exact URL, title, what makes it non-thin, and the risk.

Q4. Anything still wrong in the method text as summarised above? Quote the sentence and give the replacement.

Answer Q1-Q4 by number: agree / disagree because ... / need data. End with the list of points still open.

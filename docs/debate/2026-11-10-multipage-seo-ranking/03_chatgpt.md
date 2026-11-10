ChatGPT said:
Round 3 verdict

D1 is not ready to publish as “final.” D2 has enough substance for a city research page, but its publication depends on correcting D1. D3 is right, with a scope qualification for landing pages. D4 needs no SEO-driven rewrite, apart from respecting the locked location wording.

I accept the canonical, schema and content-cleanup work as reported local implementation. Your note explicitly says nothing has been deployed; I am not treating those checks as production verification. 
Pasted text

D1. Research denominator and classification — Disagree with calling this final

There are three material problems: selection based on the result being measured, an unreliable ownership classifier, and an unjustified “upper bound” statement.

1. Restore categories excluded because they had websites

You say pizza restaurants and two grocery subcategories were removed because almost every record linked a website. That makes inclusion depend on the outcome the study measures. The resulting percentage describes a selectively filtered group, not a neutral selection of those trades. 
Pasted text

Required change: define the trade categories by business activity, independently of website prevalence. Restore the excluded categories unless there is a separate, documented reason they fall outside that definition.

Where records demonstrably belong to chains, classify those records using corroborating evidence. Do not remove an entire category because its website coverage looks unexpectedly high.

Retain an exclusion table:

Plain text
filter | records removed | reason | evidence independent of website presence

Also confirm that 92,579 means distinct place records, not rows after expanding multiple taxonomy assignments. If trade groups overlap, disclose that category totals cannot be summed to obtain the overall denominator.

2. An empty brand field does not establish an independent business

Overture’s brand field is optional. Its absence is missing metadata, not proof that a business is independent, unbranded or owner-operated. 
Overture Maps

The defensible population label is:

Selected trade listings in Gujarat with no brand recorded in the source.

Not:

Gujarat’s independent businesses.

Keep the brand-empty subset if that is the intended study population, but make that restriction prominent beside the headline results. Do not present it as the whole Gujarat economy.

3. Three records sharing a host is a review flag—not an ownership decision

The rule can misclassify both ways:

Example	What the current rule could do
A family business with three legitimate branches and one website	Exclude its genuine business website
A chain with only two matching records in this extract	Count its website as “own”
Three duplicate records for one business	Mistake duplication for a chain
A brand-controlled location page hosted by a store-locator provider	Treat a genuine business web presence as merely a marketplace
An unrelated, parked or incorrectly attached unique domain	Count it as an “own website”

These are logical counterexamples to the rule; they do not require estimating how frequently each occurs.

Use shared-host frequency to identify records needing classification. Keep separate fields for:

Plain text
URL recorded
apparent website type
business/brand association verified or unresolved
shared-host flag
fetch outcome

A practical public classification would distinguish business/brand website URL, directory or marketplace URL only, unresolved URL, and no URL recorded. A confirmed brand website should not automatically be grouped with Justdial.

Builder-hosted sites can qualify as business websites. The important question is whether the site represents that business—not whether it owns a custom domain. For URL normalization, use public-suffix-aware domain handling and preserve platform-specific tenant identities rather than collapsing every hosted site into its platform’s parent domain. The Public Suffix List exists specifically to identify domain boundaries reliably. 
publicsuffix.org

4. The live check is useful, but its wording needs correction

The supplied test has 60 sampled URLs: 34 “answered,” 21 DNS failures, three HTTP 4xx responses and two refusals. 
Pasted text

First define “answered.” A 4xx response is also an HTTP answer. Record the final status, redirect destination and whether the returned page actually represents the intended business.

The observed result is a measurement of that test, so “not a measured rate” is unnecessarily confusing. What it is not is a measured rate of working websites across Gujarat.

Use:

We made one automated fetch attempt for each of 60 randomly selected URLs from the classifier’s candidate-business-website group. The run logged 34 as “answered,” 21 DNS failures, three HTTP 4xx responses and two connection refusals. These results describe one diagnostic run from one connection. They do not estimate the share of Gujarat businesses with working websites.

Replace “answered” with a precise status definition before publication.

Preserve the sampling unit, seed, sampling-frame version and full timestamp. Sampling unique URLs produces a different result from sampling place records when several records share a URL.

5. “Upper bound for working sites” is not fair as a general claim

Your classifier can include dead or unrelated URLs, but it can also miss genuine working websites. Businesses in the no-URL group might have websites absent from Overture; shared-host exclusions can remove legitimate sites.

Therefore, 22.6% is not an established upper bound on actual working-website coverage.

It is only trivially an upper bound on working websites within the particular group your classifier accepted, using the same denominator. That narrower statement is unlikely to help readers.

Exact replacement:

A recorded URL does not establish that a website is live, usable or correctly associated with the business. Our classification can both miss genuine business websites and include URLs that no longer work. These figures measure classified website links in the source records, not verified website ownership or availability.

D1 decision: revise the category exclusions and classifier, then recalculate. Preserve the current output as a labelled preliminary version. Do not compare its 22.6% directly with Round 2’s city percentages: the study population and classification have changed.

D2. Surat child page — Approve the format; block publication of the current figures

Surat’s reported 16,494 trade records and 17 cells of at least 117 records provide enough material for a useful breakdown. However, my earlier size thresholds were editorial starting points—not statistical certification. 
Pasted text

The proposed table, comparable trade analysis, methodology and aggregate download can satisfy a research need directly. That is substantially different from a city-name-swapped sales page. Google’s doorway and scaled-content policies still depend on purpose and usefulness, not merely the presence of original numbers. 
Google for Developers

Publication conditions

Correct D1 first. Recompute both Surat and the comparison population using the same finalized rules.

Prefer Surat versus the rest of Gujarat. Comparing Surat with all Gujarat is not mathematically wrong, but Surat contributes to its own benchmark. Label that inclusion explicitly or use:

Plain text
Rest-of-Gujarat trade count =
Gujarat trade count − Surat trade count

Rest-of-Gujarat qualifying-URL count =
Gujarat qualifying-URL count − Surat qualifying-URL count

Subtract counts, then calculate percentages. Report differences in percentage points, without claiming statistical significance or explaining them as business behaviour.

Include denominators and classification categories. A trade’s percentage without its eligible-record count is insufficient. Keep the method summary visible on the child; a link to the hub should supplement it, not replace it.

Exact metadata

Path: /research/gujarat-business-websites-2026/surat

Title:
Surat Business Website Data 2026 — SiteBlitz

H1:
Website links recorded across 17 selected trades in Surat

Meta description — 148 characters:
Website URL records across 17 selected Surat trades, using October 2026 Overture data. Explore trade tables, methods, limitations and aggregate CSV.

Use the following three-line commercial interpretation:

A missing website link in a listing is a reason to check the listing—not proof that the business has no website.
Check whether customers can find your current services, contact details and website link.
For a new website or an update, review SiteBlitz’s business website service and its agreed scope.

Decision: build the child now; publish it after the corrected dataset and methods pass review.

D3. Prices on service pages — Agree, with one qualification

Changing the three unsupported prices to “priced by written quote” is correct. They were not in the commercial source of truth, and the maintenance wording explicitly describes a separate quotation. 
Pasted text

Remove their unsupported price-bearing Offer nodes. Keep their factual Service entities. Do not substitute price: 0, an invented minimum or a hidden numerical price elsewhere.

Landing pages: retain Rs 7,999 only for a landing page that fits the actual Launch scope. “Landing page” does not inherently mean “the Launch package”; integrations, campaign requirements or custom functionality can change the work.

Use:

One-page landing page within the Launch package: Rs 7,999. Additional requirements outside the package are priced by written quote.

Link directly to the Launch inclusions and exclusions. The supplied Launch definition supports one responsive page, business information, WhatsApp/call buttons, basic technical SEO and one consolidated revision round—not every feature a buyer might associate with a campaign landing page. 
Pasted text

D4. Titles — Agree in substance; one wording correction

Pricing: keep:

Website Price in India: Rs 7,999 & Rs 17,999 Plans — SiteBlitz

There is no concrete reason to reject it. Google does not impose a fixed character limit on title elements; displayed titles may be truncated according to available width. Do not rewrite a useful title just to satisfy a supposed 60-character rule. 
Google for Developers

Homepage: brand-first is acceptable. The only correction is to preserve the owner’s locked “Gujarat-based” wording rather than “Studio in Gujarat.” That is a project-consistency issue, not an SEO penalty. 
Pasted text

Use:

SiteBlitz — Gujarat-based Website Design & Development Studio

Roman-Hindi guide — Disagree with publishing the current version unchanged

It is understandable Hinglish, but parts read like an aggressive English agency article translated into Hindi. The larger problem is unsupported claims, not vocabulary.

The opening still assigns broad price bands to freelancers, local agencies and larger firms. Later passages claim cheap sites omit engineering, browser-rendered content cannot be read properly by Google, and Rs 3,000 websites cannot deliver speed or enquiries. Those claims are not established by the supplied evidence. 
Pasted text
 
Pasted text

In particular, Google can render JavaScript. Server-side or static rendering can make content more readily accessible, but “not server-rendered” does not mean “not indexable.” 
Google for Developers

Keep familiar English terms: website, domain, hosting, design, development, template, CMS, SEO, quote, backup, revision. Avoid forced phrases such as “design ki ek parat ke saath data entry,” “inventory system se gehra jod,” and “asli engineering.”

English equivalence — Need the completed English body

The English cost guide’s full text is not supplied, so I cannot certify sentence-level equivalence. Dropping hypothetical vendor numbers is not inherently a problem; localized versions need to preserve the central explanation and commercial facts, not every example. Google describes these as localized variations of the same content. 
Google for Developers

If the English article retains the same unsupported technical or price-tier claims, correct it too. Do not reproduce a factual error merely to maintain translation parity.

Metadata replacement

Rendered title:
Website Banane Ka Kharcha Kitna Hai? — SiteBlitz

H1:
Website banane ka kharcha kitna aata hai? Seedha hisaab (2026)

Meta description — 150 characters:
Website banane ka kharcha samjhein: design, domain, hosting aur maintenance. SiteBlitz packages dekhein aur quote lene se pehle sahi sawaal poochhein.

Exact replacement copy

The following replaces the corresponding sections. The commercial paragraph retains your supplied seven-working-day Business timeline and current tax wording; verify those against the complete current offer.ts before publication. The earlier attached excerpt ends before Business delivery and inclusions, so it does not independently confirm them. 
Pasted text

Opening and “Ek naam, teen alag cheezein”

Teen developers se website ka quote maangiye, to teen alag prices mil sakte hain. Sirf pages ki ginti same hone se kaam bhi same nahi ho jaata. Kisi quote mein ready-made template hota hai; kisi mein aapke business ke hisaab se design, content ka kaam ya extra features shaamil hote hain. Sahi comparison ke liye price ke saath yeh bhi dekhiye ki usmein kya milega aur kya alag se charge hoga.

Ek naam, teen alag tarah ka kaam

Template-based website mein pehle se bana layout aapke content ke saath use hota hai. Custom design mein layout aur customer ka experience aapki zaroorat ke hisaab se tay hota hai. Booking, online payments ya doosre software ke saath integration ho, to development aur testing ka kaam bhi badhta hai.

Inmein se koi tareeka apne aap mein achha ya bura nahi hai. Zaroori yeh hai ki jo kaam aapko chahiye, wahi quote mein saaf likha ho.

“Paisa asal mein paanch cheezon ka lagta hai”

Website ke kharche ko in paanch hisson mein samjhein

Har project mein inka scope alag ho sakta hai. Kuch cheezein package mein shaamil hoti hain, aur kuch ka charge alag hota hai.

Design: layout, fonts, colours aur mobile par website kaise dikhegi. Poochhiye ki ready-made template use hoga ya aapke liye naya layout banega.

Development: pages aur features banana, mobile par check karna, aur technical problems theek karna. Kaunse features shaamil hain, yeh likhit mein lijiye.

Content: text, photos aur business details. Saaf karein ki content aap denge, developer arrange karega, ya uska alag charge hoga.

Domain aur hosting: domain aapki website ka address hai; hosting par website ki files chalti hain. Pehle saal ke saath renewal ka kharcha bhi poochhiye.

Maintenance: launch ke baad updates, changes aur technical support. Backups ya doosri services shaamil hain ya nahi, yeh bhi confirm karein.

Kam price ka matlab zaroori nahi ki kaam kharaab hoga. Lekin jo cheezein quote mein shaamil nahi hain, unka kharcha ya zimmedari baad mein aapko uthani pad sakti hai.

Replace “Sasti website kahan fail hoti hai”

Kam budget mein bhi yeh checks zaroor karein

Phone par text, menu aur contact buttons aasani se use ho rahe hain ya nahi.

Photos ka size website ke liye theek kiya gaya hai ya phone se seedha upload kar diya gaya hai.

Website ka main content search engines ke liye accessible hai ya nahi.

Domain, hosting aur zaroori accounts ka access kiske paas rahega.

Theme ya tools ki licence aur renewal conditions kya hain.

Launch ke baad problem aaye to kaun dekhega, aur uska charge kya hoga.

Replace “Mehngi website kahan paisa barbaad karti hai”

Bada quote ho to har extra kaam ka reason poochhiye

Workshops, custom design, CMS, animations aur monthly support useful ho sakte hain—lekin har project ko sabki zaroorat nahi hoti.

Vendor se poochhiye: is cheez se mere customer ya meri team ka kaunsa kaam aasaan hoga? Kya iska simpler option hai? Isse launch aur baad ke kharche par kya farq padega?

Sirf bada quote dekhkar use galat na maanein. Pehle samjhein ki extra price kis kaam ke liye hai.

Replace the pull quote

Website ke quotes tabhi compare karein jab unmein shaamil kaam, recurring charges aur handover ki shartein bhi compare kar li hon.

“Hamara seedha hisaab”

SiteBlitz ke packages aur unka scope

Launch package Rs 7,999 ka hai: ek responsive page, ready-to-build hone ke baad 2 working days ki delivery timeline.

Business package Rs 17,999 ka hai: pehle se tay kiye gaye teen pages, ready-to-build hone ke baad 7 working days ki delivery timeline.

Online store, booking ya package se bahar ke kaam ka written quote diya jaata hai. Domain aur hosting ke charges alag hain aur payment se pehle quote mein bataye jaate hain. Maintenance optional hai aur uska quote alag milta hai.

Ready-to-build ka matlab hai ki pages aur features likhit mein tay ho gaye hain, zaroori content, photos aur business details mil gayi hain, required access mil gaya hai aur pehla payment ho gaya hai. Delivery ka time isi stage se count hota hai.

Custom web app, bahut saare pages ya inventory software ke saath integration chahiye, to pehle requirements ka review aur alag scope zaroori hoga. Sirf in package prices se aise project ka budget tay nahi kiya ja sakta.

Replace the six questions

Quote lene se pehle yeh 6 sawaal poochhiye

1. Domain aur zaroori accounts ka control kiske paas rahega? Mere paas kya access hoga? Custom code, theme aur third-party tools ke use aur transfer ki shartein kya hain?

2. Website ko phone aur search engines ke liye kaise check karenge? Kaunse technical checks shaamil hain, aur launch par kya verify kiya jaayega?

3. Doosre saal ka kharcha kya hoga? Domain, hosting, paid tools aur maintenance ke recurring charges alag-alag likhwa lijiye.

4. Saath kaam band hua to handover kaise hoga? Kaunsi files, accounts aur documentation milegi? Koi transfer charge ya platform limitation hai?

5. Kitne revision rounds milenge? Ek revision round mein kya shaamil hai, aur kis change ke liye extra quote lagega?

6. Kya Google ranking ki guarantee di ja rahi hai? Number-one ranking ki guarantee ko warning sign samjhein. Vendor se uske kaam aur measurement ka tareeka poochhein, guaranteed position nahi.

Achha quote sirf total price nahi batata. Usmein scope, recurring charges, delivery conditions aur handover ki shartein bhi saaf hoti hain.

The ranking warning is supported by Google’s own guidance against providers promising first place. 
Google for Developers

FAQ replacements

Kya Rs 3,000 wali website kabhi theek ho sakti hai?

Haan, simple requirements ke liye ek basic website kaafi ho sakti hai. Rs 3,000 yahan sirf ek hypothetical example hai, SiteBlitz ka package nahi. Faisla sirf price par na karein: demo, mobile experience, scope, renewal charges aur handover ki shartein check karein.

SiteBlitz kitna leta hai aur kya milta hai?

Launch Rs 7,999 ka one-page package hai aur Business Rs 17,999 ka three-page package. Exact inclusions, delivery conditions aur revision terms Pricing page aur written quote mein dekhein. Online store, booking aur extra requirements ka quote alag milta hai.

Website banne mein kitna time lagta hai?

Launch ki delivery timeline ready-to-build hone ke baad 2 working days aur Business ki 7 working days hai. Ready-to-build ki conditions poori hone se pehle yeh time count nahi hota. Custom projects ka schedule written quote mein diya jaata hai.

Kya GST alag se lagega?

SiteBlitz ke maujooda pricing terms ke mutabik, package fees par GST alag se add nahi kiya jaata. Domain, hosting aur doosri separately quoted services ke charges payment se pehle written quote mein confirm karein.

The GST answer deliberately refers to current package terms rather than saying “these prices are final” in a way that could imply domain, hosting and extra work are included.

R3. Founder’s first-30-days off-site checklist
1. Day 1: establish the production baseline

Use the approved domain, business name, phone and live email consistently. Confirm production pages return their intended content, self-canonicals point to the production domain, the sitemap contains only intended indexable URLs, and enquiry routes work.

Keep private administration and previews protected. Do not announce the research study until D1 is resolved.

Do not: submit localhost, preview deployments or the undeployed build. Do not present fictional concepts as customer projects.

2. Days 1–2: Google Search Console — Domain property through DNS

Open https://search.google.com/search-console.

Property selector → Add property → Domain → enter the bare domain → Continue.

Copy the supplied TXT verification value. In the authoritative DNS provider, add a TXT record at the root—often represented by @—using that exact value. Keep existing mail and verification records. Return to Search Console and verify; retain the record afterward. Google documents DNS verification for Domain properties. 
Google Help

Then:

Sitemaps → submit the complete production sitemap URL.

URL Inspection → inspect the homepage → Test live URL → Request indexing, where available and appropriate. Repeat for pricing and the corrected research hub rather than manually submitting every URL. Use the sitemap for the complete inventory. 
Google Help
+1

Do not: delete unrelated TXT records, grant an unknown agency owner access, or repeatedly request indexing for the same unchanged page. Google says repeated requests do not accelerate crawling. 
Google for Developers

3. Days 2–3: Bing Webmaster Tools — import from Search Console

Open https://www.bing.com/webmasters.

Choose the option to import sites from Google Search Console, authenticate the account that owns the verified property, review the requested permissions, select the intended site and complete the import. Bing supports importing verified properties and their sitemap information. 
Search - Microsoft Bing

Check Sitemaps afterward; do not assume import means the sitemap was successfully fetched. Inspect the homepage and research URL using Bing’s URL inspection tools. 
Search - Microsoft Bing
+1

Do not: import unrelated properties, create duplicate site entries unnecessarily, or interpret “submitted” as “indexed.”

4. Days 2–4: IndexNow — persistent key plus change-only submissions

Generate one persistent key:

Bash
node -e "console.log(require('node:crypto').randomBytes(16).toString('hex'))"

Create:

Plain text
public/<KEY>.txt

Its contents must be the key. After deployment, verify that the corresponding production URL returns that text without authentication or a redirect. IndexNow supports notifying participating engines about added, updated and deleted URLs; a receipt is not an indexing guarantee. 
IndexNow

Change detection contract: export current-indexnow.json as:

Plain text
absolute canonical URL → SHA-256 hash of that page’s stable editorial payload

Hash the meaningful page content, metadata, relevant offer values and research version—not build timestamps, asset filenames or animation changes. Export only intended indexable pages. Keep the previously submitted manifest outside ephemeral build storage.

The manifest exporter is the repository-specific integration; the submission script below does not assume an unprovided registry interface.

scripts/indexnow.mjs:

JavaScript
// Run only after a successful production deployment. Node.js 22+.
import { readFile, writeFile, rename } from "node:fs/promises";

async function main() {
  const [currentPath, statePath, ...flags] = process.argv.slice(2);
  if (!currentPath || !statePath || flags.some(x => x !== "--send")) {
    throw new Error(
      "Usage: node indexnow.mjs current.json previous.json [--send]"
    );
  }
  if (currentPath === statePath) {
    throw new Error("Use separate current and state files.");
  }

  const base = new URL(process.env.SITE_URL ?? "");
  if (
    base.protocol !== "https:" || base.pathname !== "/" ||
    base.search || base.hash || base.username || base.password
  ) {
    throw new Error("SITE_URL must be the canonical HTTPS production origin.");
  }

  const key = process.env.INDEXNOW_KEY ?? "";
  if (!/^[a-f0-9]{32}$/.test(key)) {
    throw new Error("Expected a 32-character hex key.");
  }

  async function load(path) {
    const data = JSON.parse(await readFile(path, "utf8"));
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error(`Invalid manifest: ${path}`);
    }

    for (const [url, hash] of Object.entries(data)) {
      const u = new URL(url);
      if (
        u.origin !== base.origin || u.href !== url || u.search || u.hash ||
        u.username || u.password ||
        /^\/(admin|api|demo)(\/|$)/.test(decodeURIComponent(u.pathname)) ||
        typeof hash !== "string" || !/^[a-f0-9]{64}$/.test(hash)
      ) {
        throw new Error(`Invalid URL or content hash: ${url}`);
      }
    }
    return data;
  }

  const [current, previous] = await Promise.all([
    load(currentPath), load(statePath)
  ]);
  const urls = [...new Set([
    ...Object.keys(previous), ...Object.keys(current)
  ])].filter(url => previous[url] !== current[url]).sort();

  console.log(JSON.stringify({ changed: urls.length, urls }, null, 2));
  if (!urls.length || !flags.includes("--send")) return;
  if (urls.length > 10000) {
    throw new Error("Split this release into explicit batches.");
  }

  const keyLocation = `${base.origin}/${key}.txt`;
  const proof = await fetch(keyLocation, {
    redirect: "error",
    signal: AbortSignal.timeout(15000)
  });
  if (proof.status !== 200 || (await proof.text()).trim() !== key) {
    throw new Error("Production key file is unavailable or incorrect.");
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    redirect: "error",
    signal: AbortSignal.timeout(20000),
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: base.host, key, keyLocation, urlList: urls
    })
  });

  if (![200, 202].includes(response.status)) {
    throw new Error(
      `IndexNow ${response.status}; Retry-After=${
        response.headers.get("retry-after") ?? "not supplied"
      }; ${(await response.text()).slice(0, 400)}`
    );
  }

  await writeFile(`${statePath}.receipt.json`, JSON.stringify({
    submittedAt: new Date().toISOString(),
    status: response.status,
    urls
  }, null, 2));

  await writeFile(`${statePath}.tmp`, JSON.stringify(current, null, 2));
  await rename(`${statePath}.tmp`, statePath);

  console.log(response.status === 202
    ? "Received; key verification pending. Check before the next release."
    : "Received. This is not an indexing confirmation.");
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});

Set SITE_URL and INDEXNOW_KEY in the deployment job, then run:

Bash
# Review the diff without submitting.
node scripts/indexnow.mjs current-indexnow.json previous-indexnow.json

# Submit after the corresponding production deployment is healthy.
node scripts/indexnow.mjs current-indexnow.json previous-indexnow.json --send

For a genuinely new launch, initialize the previous manifest to {} once. When adding IndexNow to an already-live, unchanged site, establish a baseline instead of back-submitting every historical URL. Keep deployment jobs serialized and persist the updated state and receipt. The protocol’s guidance recommends meaningful-change detection rather than repeated unchanged submissions. 
IndexNow

I tested the script locally with mocked responses for unchanged pages, dry runs, accepted requests, pending verification, rejected requests and wrong-host URLs. No real submission was made.

Do not: reset the previous manifest on each deployment, submit previews, or immediately retry a rate-limited request. Respect Retry-After. HTTP 202 means receipt with key validation pending—not successful indexing. 
IndexNow
+1

5. Days 3–5: Brave submission

Open https://search.brave.com/submit-url in a JavaScript-enabled browser. Submit the canonical homepage and, once corrected and public, the research hub; complete any verification displayed by the form.

The endpoint exists and requires JavaScript. Brave’s official crawler documentation links to it for page re-fetching. I verified the endpoint and documentation, not a completed submission or its current interactive field labels. 
search.brave.com
+1

Do not: promise a crawl date, automate repeated submissions, or invent a special Bravebot rule. Brave says a page inaccessible to Googlebot will not be crawled by its crawler either. 
Brave Search

6. Days 3–7: Google Business Profile — only when eligible

Skip this step if the studio operates entirely online. Google requires qualifying in-person customer contact; online-only businesses are not eligible. 
Google Help

For an eligible business:

Search for an existing profile first. Then use https://business.google.com/add to claim it or create the appropriate profile. Enter the real business name, accurate category, contact details and actual service arrangements. Complete whichever verification method Google offers; methods are determined by Google. 
Google Help
+1

If customers are not served at the business address, configure it as the appropriate service-area business and remove the address from public display. Enter only areas genuinely served in person—not all India because remote work is available. 
Google Help

Do not: invent an office, use a virtual address to manufacture eligibility, add keywords to the business name, create one profile per city, or request reviews from people who have not had a genuine customer experience.

7. Days 3–7: LinkedIn company page

On desktop:

For Business → Create a Company Page → Company.

Enter the approved name, available public handle, website, accurate industry, actual organization size/type and tagline. Confirm authorization and create the page. LinkedIn documents this creation flow and provides company pages without a creation fee. 
LinkedIn

Suggested tagline:

Gujarat-based website studio. Clear packages, working concepts and a defined build process.

Use only approved public location information. If a required field needs a city not yet approved for publication, resolve that with the owner rather than guessing.

Publish an introduction and a clearly labelled fictional concept. Add the verified company profile to the website’s organization references.

Do not: invent staff, client logos, founding history, reviews or awards.

8. Days 7–14: selective directories and citations

These are my first-month priorities—not claims that any listing guarantees rankings.

Destination	Decision
Justdial	Consider one free, truthful listing if the owner accepts its required public location/contact fields. Its published flow is account creation, business details and categories. Hold it if truthful publication conflicts with the owner’s location policy.
SGCCI / GCCI	Prioritize a genuine business relationship or research contribution. A member listing is appropriate only after actual membership; do not join solely to purchase a link.
Clutch	Optional basic profile after the website is live. A free profile exists, but do not invent client work or reviews to fill it.
GoodFirms / DesignRush	Defer during this first month unless there is a specific commercial reason. Focus on a small number of accurate, maintained profiles.
IndiaMART / Sulekha paid lead packages	Defer as an SEO task. Assess them separately as customer-acquisition channels before spending.
Bulk citation packages, “high-DA links,” paid ranking badges and invented office listings	Skip.

Justdial’s free listing process and Clutch’s free profile option are documented by those providers. SGCCI and GCCI describe actual membership services rather than a general-purpose backlink programme. 
Justdial
+3

Do not: pay for followed links sold primarily to manipulate rankings, use reciprocal-link quotas, or manufacture reviews. Google’s spam policy explicitly covers manipulative link practices. 
Google for Developers

9. Days 10–21: pitch the corrected research

For SGCCI, the published general contact is info@sgcci.in. Request routing to the relevant editorial team for Samruddhi or Infozine, both listed on its official site. For reporters, select a few recent business bylines relevant to Surat or Gujarat; do not blast a scraped media list. 
sgcci.in

Use this message only after the described report, comparison and CSV are public:

Subject: Surat business website-link study — 17 trades, open methods and data

Hello [Name/Team],

We are SiteBlitz, a Gujarat-based website studio. We have published a study of website links recorded across 17 selected trades in Surat, using Overture Maps’ October 2026 Places data.

The report compares equivalent trades in Surat and the rest of Gujarat, with record counts, classification rules, limitations and a downloadable aggregate CSV. It measures what the source listings contain—not the percentage of all businesses that have websites.

Report and data: [published research URL]

Could this be useful for your member bulletin or local-business coverage? We welcome questions about the methodology and will correct any substantiated errors. No individual business names are published.

Regards,
SiteBlitz team
[Verified contact details]

Lead with a numerical finding only after recalculation and validation. Do not reuse the current 22.6% as a publicity hook while its selection rules remain disputed.

Do not: ask for a keyword-rich backlink, imply chamber endorsement, or describe this as a survey of Gujarat’s entire business population. One relevant follow-up is enough.

10. Days 21–30: review evidence, not promised rankings

Review Google’s Page Indexing and Performance reports, Bing’s indexing and search reports, submission receipts, referral enquiries and actual research mentions.

Record which pages are discovered, indexed or excluded and why. Separate brand queries from non-brand queries. Correct technical problems and substantive content gaps before creating more city pages.

Do not: treat “not indexed yet” as an instruction to resubmit daily or buy links. Google explicitly does not guarantee whether or when a URL will be crawled and indexed. 
Google for Developers

The first-month success criteria should be correct publication, accurate profiles, functioning enquiry routes, reliable indexing diagnostics and relevant outreach responses—not a guaranteed ranking position.

Points still open
Research selection: restore outcome-excluded categories or provide independent exclusion evidence; confirm unique-record counts and trade overlap.
Classification: replace shared-host frequency as an ownership verdict; distinguish genuine business/brand sites, directories and unresolved cases.
Validation: define “answered,” preserve sampling details and verify the full timestamp/timezone behind the reported November 11, 2026 run.
Surat publication: recalculate its table and comparison population after D1; publish the child only with matching methods and CSV.
Commercial copy: confirm the complete current Business timeline/inclusions and tax wording; ensure landing-page pricing remains within Launch scope.
Language equivalence: compare the completed English and revised Roman-Hindi bodies; apply factual corrections to both.
Deployment and off-site execution: production checks, the IndexNow manifest adapter and persistent state, approved public profile details, and genuine in-person eligibility before any Business Profile application.

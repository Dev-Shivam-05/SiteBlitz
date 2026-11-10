ChatGPT said:
Round 2 verdict

Agree with the multi-page implementation. Approve the Gujarat research hub, with tighter statistical wording. Approve city research pages conditionally—not automatically because their datasets exceed a row threshold.

I am treating tonight’s build changes as your implementation report, not as independently tested repository changes.

1. Information architecture — Agree

The shared route registry, restored footer links, Contact navigation item and reachability tests address the main problems. Keep all ten homepage scenes under the owner’s decision, with the visible links you described.

Two additions to the acceptance tests:

Test actual rendered routes, not just registry consistency. A route can be registered and linked while returning an error, redirecting incorrectly or rendering the wrong content. Traverse the public site from /, follow rendered links and verify the intended destinations.

Require contextual links as well as footer links. For example, a service detail should link to relevant work, pricing and contact; a guide should link to the service or decision it explains. The footer should not remain the only meaningful route into those pages.

Agree with /faq. Give it the complete pre-purchase questions, while homepage and service FAQs remain shorter and contextual.

Keep /website-in-48-hours, but restrict the timing statement to the one-page Launch package. The supplied offer establishes “2 working days after ready-to-build” for Launch, not every package. 
Pasted text

2. Keyword map — Agree; demand validation remains open

The R1 table below is a query-to-page allocation, not a volume forecast.

The supplied autocomplete supports the Gujarat studio, small-business website, website cost, maintenance and Roman-Hindi cost directions. It does not establish demand for every exact phrase in the register. 
Pasted text
 
Pasted text

Treat About, Contact, FAQ and Performance primarily as navigational and decision-support pages. They do not need artificial non-brand traffic targets.

Keep these intents separate:

/pricing: SiteBlitz’s actual packages and terms.
English cost guide: how website costs work and what affects a quotation.
Roman-Hindi cost guide: the localized counterpart of that explanation.
Research hub: observed website records in a defined dataset—not a disguised sales landing page.

Need data: localized search-result checks and post-launch query/page impressions before calling any non-brand term “winnable.”

3. City pages — Agree with the revised direction

Research about Surat or Navsari does not imply that SiteBlitz has an office there. Therefore, publishing a properly described research section does not require the founder to claim that city as their location.

Keep commercial identity wording “Gujarat-based” or “based in Gujarat.” Leave the existing, approved South Gujarat FAQ statement unchanged.

The research proposal is materially different from replacing city names in a service-page template. My publication conditions are in a below.

4. Brand — Agree

Accept the visible “SiteBlitz / Site Blitz” explanation and the single genuine alternative name. Do not create a separate page targeting the spaced spelling.

Keep the name-conflict review before domain purchase and the in-person-contact question before any Business Profile application. Neither needs another round of debate until the owner supplies the missing facts.

Ensure the chosen name and location wording stay consistent across visible content, structured data, generated llms.txt, social profiles and contact details.

5. Technical SEO — Agree, with three corrections
Canonical tests must validate the result

Removing the inherited root canonical fixes the reported defect. However, “every page.tsx declares a canonical” is not the strongest acceptance test.

For every concrete registered indexable URL, including dynamic service and industry routes, assert that the rendered document has exactly one canonical and that it resolves to the intended absolute URL. A shared metadata helper is acceptable; a literal declaration in each file is unnecessary. Next.js supports both static metadata and generated metadata. 
Next.js

Also verify the rendered title and og:url, rather than assuming removal of the root canonical corrected every inherited value.

Replace the deprecated ProfessionalService type

Correction to my round 1: Schema.org explicitly deprecates the generic ProfessionalService type. Use Organization for the business entity and separate Service entities for the actual offerings. Keep the same stable organization @id; do not create a second identity during this change. 
schema.org

The unified graph, OfferCatalog generated from offer.ts, breadcrumbs and page-specific WebPage entities remain sound.

Robots exclusions do not make routes private

Keep /admin and private API paths excluded from crawling, but authentication and authorization—not robots.txt—must protect their contents. Google explicitly warns against using robots exclusions as a privacy mechanism. 
Google for Developers

Also separate search access from training preferences. OpenAI documents independent controls for OAI-SearchBot and GPTBot; Google states that Google-Extended does not control Google Search inclusion or ranking. Do not enable training-related access merely because the owner wants search visibility. 
OpenAI Developers
+1

Generating llms.txt from approved configuration fixes the stale-information problem. Do not assign it a Google ranking benefit: Google explicitly says these files neither improve nor harm its Search visibility. 
Google for Developers

6. Performance — Agree with retaining the owner-locked effects pending measurement

I accept D15. Do not silently remove the preloader or shorten the curtain.

However, the reported homepage LCP does not establish that every inner page passes, particularly after introducing delayed heading animation.

For the release gate, test each page in:

A fresh browser session, where the preloader runs; a repeat session, where it does not; and client-side navigation, where the curtain runs.

Record the LCP element, timings, filmstrip and actual content usability—not just the final score. LCP measures a particular contentful element, and its field target is assessed at the 75th percentile; one local result is not that field assessment. 
web.dev

7. Inner-page H1 motion — Conditional agreement; there is a concrete failure mode

Transform-only reduces animation work. It does not guarantee early content visibility.

For a line initially translated completely outside an overflow: hidden wrapper, the visible text area can initially be zero. LCP excludes clipped portions when determining candidate size. Depending on the rendering path, revealing that text can delay its eligibility or leave another element as the reported candidate. 
web.dev

The sequential timing also matters. An illustrative 300 ms rendering delay + 1.2-second preloader + 0.7-second heading reveal means the complete heading becomes readable at approximately 2.2 seconds. That is a visibility calculation, not a prediction that Chrome will necessarily report 2.2-second LCP.

I accept your animation with these conditions:

Measure both outcomes: LCP must meet your ≤2.0-second lab gate, and the filmstrip must show that the principal heading becomes readable promptly. An early score belonging to a smaller paragraph or preloader element is not sufficient evidence.

Keep reduced motion immediate: remove the transform, animation delay and animation—not merely shorten the duration. Ensure the final text is not permanently clipped.

Test responsive typography: line masks must accommodate wrapping, font substitution, enlarged text and descenders. Do not hard-code desktop line breaks into narrow phone layouts.

Drop the H1 effect page-by-page when it fails. The drawn volt rule can remain as the entrance treatment.

I would not reject a measured, accessible CSS rise simply because it is an entrance animation.

a. Research hub versus city children — Agree with the asset; start with anchors

Publish the hub first, with city anchors. Promote a city into a child page only when its analysis is independently useful.

Google’s policies target pages that primarily funnel users elsewhere and scaled pages that add little value. A research page can satisfy the visitor’s information need directly, even when it also contains a restrained commercial link. Original numerical output alone is not an automatic exemption. 
Google for Developers

My proposed publication rule is:

Hub: all qualifying cities, an accessible HTML table, methodology, limitations, aggregate download and permanent city anchors.

City child: a complete city-specific category analysis, meaningful interpretation, a source-quality or validation discussion, and a city-specific aggregate download. It should remain useful with the services CTA removed.

As an editorial starting rule, retain your ≥1,500 eligible-record city threshold and require several useful category cells—for example, at least six categories with ≥100 records each. These are my proposed publication thresholds, not statistical guarantees or Google rules.

A child must not consist of one percentage, a repeated explanation and “we build websites in Surat.”

When promoting Surat:

Plain text
Hub:
 /research/gujarat-business-websites-2026

Child:
 /research/gujarat-business-websites-2026/surat

Keep Surat’s summary row on the hub and link to the child. Give the substantial child a self-canonical and breadcrumbs back to the hub. Do not publish an additional near-identical /website-design-surat page as its commercial twin.

Decision today: approve the hub; approve Surat as the first potential child once the category and validation outputs exist. Do not commit to four to six children in advance.

b. Exact research metadata — Agree, with “recorded” rather than ownership claims

The proposed question “How many Gujarat businesses have their own website?” overstates what a listing dataset alone can establish.

Hub

Path: /research/gujarat-business-websites-2026
Rendered title: Gujarat Business Website Data 2026 — SiteBlitz
H1: How often do Gujarat business listings include a website?
Meta description: Explore recorded business websites across selected Gujarat cities using Overture's October 2026 data, with category tables, methods and CSV.

Conditional Surat child

Path: /research/gujarat-business-websites-2026/surat
Rendered title: Surat Business Website Data 2026 — SiteBlitz
H1: How often do Surat business listings include a website?
Meta description: Explore website records in Surat business listings from Overture's October 2026 data, with category comparisons, methodology and a CSV download.

After the eligibility and classification checks, the Surat opening can say:

In the analysed October 2026 dataset, 21,176 of 52,578 Surat business-place records contained a qualifying business website URL: 40.3%. The remaining 31,402 records did not contain one under our classification rules. This does not establish that those businesses have no website.

That calculation agrees with your supplied numbers. The underlying records and classifier have not been independently audited here.

c. Outreach and citations — Agree; pitch a finding, not a backlink request
Business associations

Start with SGCCI for the South Gujarat analysis and GCCI’s business-information function for the statewide resource. Both have relevant business-information or member-service activities; this is a proposed outreach fit, not an assertion that they will publish the research. 
sgcci.in
+1

Offer a short member briefing, an unrestricted aggregate CSV and an opportunity to challenge the methodology. Do not frame it as “please add our agency link.”

Local press

Approach reporters who already cover the relevant city’s business economy. Send a genuinely city-specific finding, a compact chart, the denominator and the limitation in the same message.

A suitable subject, after validation, is:

Surat website-listing study: 40.3% of analysed records include a business website

A suitable pitch opening is:

We analysed 52,578 eligible Surat business-place records from Overture’s October 2026 release. Our classification found a qualifying business website URL in 40.3%. This measures recorded website coverage, not the percentage of all Surat businesses with websites. The report includes category tables, methods and downloadable aggregates.

Do not pitch “31,402 Surat businesses have no website” or attach an invented revenue-loss estimate.

Use one relevant initial message and one restrained follow-up. Avoid bulk press-release syndication, purchased followed links and mandatory keyword-rich attribution links; Google’s link-spam policy addresses manipulative link acquisition. 
Google for Developers

Research and AI discoverability

Give the resource a stable URL, visible analyst/reviewer information, versioned downloads, an explicit correction policy and readable HTML tables. Keep definitions beside the numbers so a quoted statistic retains its meaning.

Add a Dataset node describing the aggregate output, including:

Plain text
name, description, url, creator, version,
datePublished, dateModified, spatialCoverage,
measurementTechnique, variableMeasured,
isBasedOn, license,
distribution:
  @type: DataDownload
  encodingFormat: text/csv
  contentUrl: [actual aggregate download URL]

Use actual publication/update dates and describe October 21 as the source release date, not a simultaneous observation date for every business. Dataset markup supports discovery in Google Dataset Search; it is not a guarantee of ordinary rankings or AI citations. 
Google for Developers

For AI visibility, prioritize accessible evidence and genuine third-party discussion. Google explicitly rejects the idea that special AI markup or manufactured mentions are prerequisites. 
Google for Developers

d. Statistical and licensing traps — Agree with the narrow CDLA argument; need the extraction rules
Statistical and data-definition issues

The release is verified. Overture confirms release 2026-10-21.0 with schema v2.0.0. That validates the release identifier—not your derived city counts. 
Overture Maps

First, establish what counts as a business. Places includes schools, religious organizations, landmarks and other non-business entities. Publish the inclusion/exclusion taxonomy before calling the denominator “listed businesses.” 
Overture Maps

There is also a concrete migration check: Overture removed the old categories property in September 2026, replacing its role with taxonomy and basic_category. If your pipeline still refers to categories.primary, confirm that this is a deliberately normalized internal alias—not an outdated raw-schema assumption. 
docs.overturemaps.org

Second, use the correct unit. A place record is not necessarily a distinct legal business or website owner. Preserve legitimate branches, remove duplicate records using a documented procedure, and do not deduplicate businesses merely because they share a brand domain.

Third, define the city boundary. State whether “Surat” means a normalized address locality, municipal boundary or metropolitan area. Publish the normalization rules or boundary source/version. Do not silently mix city and district records.

Fourth, replace the binary ownership wording. Excluding directories does not prove that every remaining URL is business-operated. Your classifier should inspect all supplied website URLs, not just the first, and distinguish qualifying business websites, third-party-only links, missing URLs and unresolved cases. Overture’s schema permits a list of website URLs. 
Overture Maps

Document treatment of builder-hosted sites, brand/branch pages, parked domains and redirects. A custom domain should not be required merely to qualify as a business website. Describe live-site verification separately from a URL’s presence in the source.

Fifth, handle status and confidence explicitly. Exclude known permanently closed places from a current-business analysis, while reporting how unknown status is handled. Unknown is not synonymous with open. Overture’s confidence field concerns a place’s existence; it is not a confidence score for website ownership or correctness. 
Overture Maps

Sixth, avoid population inference. Even a complete count of this extract cannot establish the percentage of all Gujarat businesses with websites. The ≥1,500 threshold controls publication size, not representativeness. Do not attach population confidence intervals to these descriptive counts.

Likewise, “Navsari is less digitally advanced than Ahmedabad” is not supported by the supplied percentages. Different category mixes, providers and missing-field rates could produce the difference. Compare like categories and report provider/missingness patterns before interpreting city contrasts.

Seventh, audit the classification. Before publication, randomly inspect records from both the qualifying-website and no-qualifying-website groups, stratified across the initial cities and major categories. Publish the sample design, unresolved cases and observed classification errors. This audits your classification; it does not turn the dataset into a representative survey.

All eight supplied city percentages round correctly. The outstanding risk is their interpretation, not their arithmetic.

Licensing

Agree: CDLA-Permissive-2.0 imposes no restrictions or obligations on computational “Results,” and Overture expressly describes computational outcomes from its CDLA-licensed data as Results. Aggregate city/category counts are a strong fit for that interpretation. 
CDLA
+1

Disagree with extending that statement to the entire mixed-source pipeline without checking it.

Overture lists Foursquare Places contributions under Apache-2.0 and AllThePlaces under CC0, alongside CDLA providers. Its attribution page also supplies a Foursquare NOTICE.txt. 
Overture Maps

Apache-2.0 does not contain CDLA’s Results exemption. Whether a counts-only output reproduces protected material is a different question from redistributing source or transformed records. Where you distribute the Work or a derivative, Apache’s redistribution conditions include license and applicable notice requirements. Do not infer that CDLA waives those separately applicable terms. 
Apache Software Foundation

My operational recommendation is to retain a release-specific source/license inventory and include attribution, applicable license texts and notices in the reproducibility package. Reassess obligations before publishing cleaned record-level data.

Also audit any boundary or enrichment dataset separately. The licensing of Places does not automatically cover data joined from other themes or providers; Overture’s attribution documentation identifies different licensing for those sources. 
Overture Maps

Need data before clearing the complete package: the actual provider/source list, any boundary/enrichment sources, and whether the download contains aggregates only.

R1. Inline page register — Agree; use these 24 rows

These are final rendered titles. Do not append a second SiteBlitz suffix. In Next.js, either use title.absolute for these strings or pass an unsuffixed value through the existing template. 
Next.js

All descriptions below are ≤155 characters; the longest is 148. Queries without direct support in the supplied autocomplete are proposed intent targets, not measured-demand claims. Generate price-bearing copy from offer.ts.

Path	Rendered title	H1	Meta description	Primary query	2–3 secondary queries
/	Website Design, Gujarat-based Studio — SiteBlitz	Websites people remember.	SiteBlitz is a Gujarat-based website studio. Explore fictional concepts, business website packages and a clear process for your next website.	web design company in gujarat	website designing company in gujarat; business website design; SiteBlitz
/work	Website Design Concepts & Live Demos — SiteBlitz	Explore our fictional website concepts	Explore working website concepts and their design decisions. Every concept is fictional, not a client project or a claim of business results.	business website design examples	small business website examples; website design concepts; SiteBlitz work
/services	Website Design & Development Services — SiteBlitz	Website services with a clearly agreed scope	Explore business websites, landing pages, ecommerce, booking, SEO, maintenance and project rescue. Find the service that matches your needs.	website design and development services india	business website services; small business web development; SiteBlitz services
/services/business-websites	Small Business Website Design — SiteBlitz	A clear website for your small business	Explore one-page and three-page business websites. Compare scope, content needs and enquiry options before choosing a package.	website designers for small business in india	small business website design; one page business website; three page business website
/services/landing-pages	Landing Page Design Services — SiteBlitz	Landing pages built around one clear action	Plan a focused landing page with a clear offer and enquiry route. Discuss content, tracking requirements and project scope before the build.	landing page design services india	business landing page design; campaign landing page design; landing page development services
/services/ecommerce-and-booking	Ecommerce & Booking Website Design — SiteBlitz	Websites for selling products or taking bookings	Plan an ecommerce or booking website. Discuss products, customer journeys, integrations and project scope before development starts.	ecommerce website development services	booking website development; ecommerce website cost in india; online store website design
/services/seo-and-geo	Technical SEO & AI Search Setup — SiteBlitz	Help search engines understand your website	Discuss technical SEO, structured data and clear content for search and AI discovery. Review the scope without ranking or citation guarantees.	technical seo services for small business	small business website seo; ai search optimisation services; generative engine optimisation
/services/care-plans	Website Maintenance & Care Plans — SiteBlitz	Ongoing website care with a defined scope	Discuss website maintenance, content updates and ongoing support. Review agreed tasks, exclusions and charges before choosing a care plan.	website maintenance charges in india	website maintenance cost; small business website maintenance; website care plans
/services/project-rescue	Website Redesign & Project Rescue — SiteBlitz	A clear next step for a stalled website project	Review an unfinished or outdated website and plan a scoped rebuild or rescue. Discuss technical issues, priorities and what can be retained.	website redesign services india	unfinished website project help; website rebuild services; website redesign cost
/pricing	Website Prices: Rs 7,999 / Rs 17,999 — SiteBlitz	Website prices, scope and payment terms	Compare the Rs 7,999 one-page Launch plan and Rs 17,999 three-page Business plan. Review scope, payment terms and delivery conditions.	business website price in india	one page website cost; three page website price; small business website packages
/process	Website Design & Build Process — SiteBlitz	From your brief to a ready-to-launch website	See how your website moves from brief and content to design, review and launch. Understand your responsibilities and what starts the delivery clock.	website development process for small business	website design process; website content checklist; SiteBlitz process
/about	About the Gujarat-based Website Studio — SiteBlitz	Meet SiteBlitz, a Gujarat-based website studio	Learn about SiteBlitz, a Gujarat-based website studio, its approach to scope and communication, and why its demo projects are labelled fictional.	SiteBlitz studio	about SiteBlitz; Gujarat-based website studio; Site Blitz
/contact	Contact the Website Studio — SiteBlitz	Tell us what your website needs to do	Contact SiteBlitz about a new website, redesign or unfinished project. Share your goals, content readiness and questions about scope.	contact SiteBlitz	SiteBlitz WhatsApp; website project enquiry; contact website studio
/faq	Website Packages & Process FAQs — SiteBlitz	Questions before you start a website project	Get answers about SiteBlitz packages, content, payments, delivery conditions, revisions and fictional demos. Follow links to the full terms.	SiteBlitz FAQs	website package questions; website project requirements; SiteBlitz payment and delivery
/website-in-48-hours	Launch Website in 2 Working Days — SiteBlitz	A Launch website in 2 working days after ready-to-build	The one-page Launch plan takes 2 working days after ready-to-build. Check required content, approvals and what starts the clock.	website in 2 working days	fast business website delivery; website ready to build checklist; one page website turnaround
/tools/grader	Free Website Grader — SiteBlitz	Check your website with the free grader	Check your website with SiteBlitz's free grader. Read the reported checks, understand their limits and identify practical next steps.	free website grader	website grading tool; business website checker; SiteBlitz website grader
/proof	Website Performance & Test Methods — SiteBlitz	Our website performance, with the evidence	View SiteBlitz's own performance measurements, test methods and limitations. Lab results and real-user data are labelled separately.	SiteBlitz website performance	SiteBlitz core web vitals; SiteBlitz speed tests; SiteBlitz performance methodology
/blog	Small Business Website Guides — SiteBlitz	Practical guides for your business website	Read guides to website costs, planning, search visibility and performance. Understand the options and trade-offs before starting your website.	small business website guides india	business website planning guide; website cost guides; SiteBlitz blog
/for/restaurants	Restaurant Website Design — SiteBlitz	A clear website for your restaurant	Plan a restaurant website around menus, opening hours, location and customer enquiries. Discuss ordering or booking needs before agreeing scope.	restaurant website design india	restaurant menu website; restaurant booking website; website for restaurant
/for/clinics	Clinic & Doctor Website Design — SiteBlitz	Clear information for your clinic's patients	Plan a clinic website with clear service and doctor information. Discuss patient enquiries, appointment routes and content responsibilities.	clinic website design india	website for dental clinic; websites for doctors in india; doctor appointment website
/for/law-firms	Law Firm Website Design — SiteBlitz	Clear, factual websites for law firms	Discuss a factual law firm website, its content, enquiry process and technical requirements. Publication remains subject to your compliance review.	law firm website design india	lawyer website design; advocate website design; law firm website development
/for/boutiques	Boutique Website Design — SiteBlitz	Show your boutique's collections clearly	Plan a boutique website to present collections and answer customer questions. Discuss catalogue, enquiry or online selling requirements.	boutique website design india	fashion boutique website; boutique catalogue website; clothing boutique website design
/blog/website-banane-ka-kharcha	Website Banane Ka Kharcha Kitna Hai? — SiteBlitz	Business website banane ka kharcha kitna aata hai?	Business website ka kharcha samjhein: Rs 7,999 aur Rs 17,999 packages, kya shamil hai, aur quote lene se pehle kya poochhna chahiye.	website banane ka kharcha kitna aata hai	website banane ka cost; business website banwane ka kharcha; website banane ka kharcha kitna hota hai
/research/gujarat-business-websites-2026	Gujarat Business Website Data 2026 — SiteBlitz	How often do Gujarat business listings include a website?	Explore recorded business websites across selected Gujarat cities using Overture's October 2026 data, with category tables, methods and CSV.	Gujarat business website statistics	Gujarat business website data 2026; Gujarat website listing coverage; Overture Gujarat business analysis

The research row assumes the business-eligibility filter and advertised category tables are completed. Do not publish metadata promising downloads or analyses before they exist.

R2. Roman-Hindi language and hreflang — Use hi-Latn; pair only as genuine equivalents
Language attribute

For a predominantly Hindi article written in Latin script, use:

XML
<html lang="hi-Latn">

hi identifies Hindi; Latn identifies the writing system. W3C recommends script subtags where a language is transcribed into an unusual script. Roman characters do not make Hindi content English. 
W3C

Mark substantial English interface sections with lang="en" where appropriate. Do not rely only on a client-side change to the document language.

Hreflang values

Google explicitly supports ISO 15924 script subtags, so hi-Latn is a valid choice, not an unsupported invention. 
Google for Developers

My recommended alternate set is:

Plain text
en       → /blog/website-cost-india-honest-breakdown
hi-Latn  → /blog/website-banane-ka-kharcha
hi       → /blog/website-banane-ka-kharcha

Here, hi is the broader Hindi fallback while this is your only Hindi version; hi-Latn states the script explicitly. Both point to the same page—not separate copies.

Pairing decision

Agree with pairing as the intended implementation. Make the Roman-Hindi guide a localized counterpart of the English cost guide: substantially the same cost explanation, scope distinctions, exclusions and quotation questions, expressed naturally rather than translated mechanically.

Need data: the completed bodies before confirming equivalence. A short Hindi sales FAQ and a detailed English cost analysis should not be declared alternates merely because both mention price.

On both equivalent pages, publish the same reciprocal alternate set and retain a self-canonical. Google requires reciprocal/self-referencing alternate annotations and fully qualified URLs. 
Google for Developers

For the Hindi route:

TypeScript
const EN = "/blog/website-cost-india-honest-breakdown";
const HI = "/blog/website-banane-ka-kharcha";
const absolute = (path: string) => new URL(path, SITE.url).href;

const alternates = {
  canonical: absolute(HI),
  languages: {
    en: absolute(EN),
    "hi-Latn": absolute(HI),
    hi: absolute(HI),
  },
};

On the English route, change only canonical to absolute(EN).

Provide a visible English / Hindi (Roman) switch. If the articles ultimately serve different purposes, keep them self-canonical and cross-link them as related guides without the alternate relationship.

Points still open
Research denominator and geography: business-category inclusion rules, city definitions, duplicate handling, operating-status rules and confidence filtering.
Research validation: full city/category aggregates, provider and missingness breakdowns, URL-classification rules and a documented manual audit.
Research licensing: release-specific source inventory, applicable notices and any boundary/enrichment licenses; confirmation that public downloads contain aggregates only.
Runtime verification: rendered canonicals/titles, concrete dynamic routes, organization-schema correction, and first-session/repeat-session/navigation performance traces.
City-child publication: whether Surat’s completed analysis passes the substantive-content test; other children remain unapproved until their outputs do.
Hindi equivalence: completed English and Roman-Hindi article bodies, server-rendered language attributes and reciprocal alternate tests.
Owner decisions: name-conflict/domain clearance, approved commercial terms, commercially permitted hosting, D15 acceptance after measurement, and actual in-person service arrangements before a Business Profile application.

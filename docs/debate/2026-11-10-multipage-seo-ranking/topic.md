# Topic

## The owner's words (Hinglish, translated faithfully)
"The SiteBlitz site running on localhost:3100 was made mainly as a single-page site, but I want multi-page, like
the old version on GitHub. The design is better now, but you can make it far better. Keep this same theme.
Some places still have no animations - analyse and add them. The most important thing is search engine
optimisation: when anyone searches Google for anything about website development, our website should come at
the top. It must come for the name SiteBlitz, and even if someone misspells SiteBlitz it must still come.
Find which searches people really make on Google, Brave and other engines, and rank the site for all those
keywords, number 1, so that as much traffic as possible comes. Also performance."

## Agenda
1. Information architecture: the exact page list, URLs and main nav for a real multi-page site in the v4 theme (the live v2 had Work / Services / Pricing / Proof / Studio / Contact); which of the 10 home scenes stay on home and which move to their own page.
2. Keyword map: one primary query + 2-3 secondary per page, chosen from the autocomplete evidence; which queries a new Gujarat studio can realistically win in 3-6 months and which belong to directories, big agencies or ads.
3. City pages: should SiteBlitz publish service pages for Surat / Navsari / Vadodara / Ahmedabad / Vapi (all show live autocomplete demand), given the truthful-location rule ("based in Gujarat", founder in South Gujarat) and Google's doorway-page policy - and if yes, exactly what makes each page non-doorway.
4. Brand name #1 including misspellings (Site Blitz, sitblitz, siteblits, sight blitz): domain choice, entity signals (Organization schema alternateName, sameAs, Google Business Profile, directories), Search Console + Bing Webmaster steps, and the clash with StackBlitz and a French "SiteBlitz" company.
5. Technical SEO for the Next.js build: per-page title/H1/meta, BreadcrumbList / Service / FAQ / WebPage schema, sitemap lastModified (today it is the build time for every URL), internal linking, OG images, llms.txt, Hindi/Hinglish content for queries like "website banane ka kharcha".
6. Performance budget for the new pages: what each inner page may load (the WebGL hero stays home-only), the home TBT of 364 ms (lab, 4x CPU), page-curtain transitions vs INP, and the CWV targets per page.
7. Motion on inner pages: exactly which v4 scene or entrance each page gets (hero entrance + 1-2 moments), with the phone and reduced-motion versions, without copying the home.

## My (Claude Code's) starting position, so you have something to attack
- Nav: Work, Services, Pricing, Process, Studio, + volt WhatsApp button; Contact and Insights in the footer and the
  phone sheet. Home keeps hero, statement, giant price, concept wall (3 cards) and close; each other scene becomes
  the hero moment of its own page (packages track -> /pricing, process path -> /process, drift collage -> /work).
- Winnable in 3-6 months: the brand name, "website design surat/navsari" long tail, cost questions ("website
  development cost in india 2026", "business website price in india", "website banane ka kharcha kitna aata hai"),
  vertical pages ("website for dental clinic", "restaurant website design india"). Not winnable soon: bare
  "website development", "website developer near me" (map pack needs a Google Business Profile).
- City pages only where something real differs (served by the same founder in person, local examples, travel
  time, Gujarati/Hindi support) - otherwise one /gujarat page. Founder must approve naming Navsari publicly.
- Brand: buy siteblitz.in before anything else; alternateName ["Site Blitz"] in Organization schema; no hidden
  misspelling text; a Google Business Profile (service-area business, address hidden) is the strongest single signal.

Answer each agenda point by number: agree / disagree because ... / need data: ... . End with the list of points still open.

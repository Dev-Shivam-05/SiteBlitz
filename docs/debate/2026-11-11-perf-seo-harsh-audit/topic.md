# Topic - harsh performance + SEO audit of the current SiteBlitz site

## The owner's words (Roman Hindi / Hindi, translated)
"Run a /debate round. Mainly ask ChatGPT: the current SiteBlitz site was redesigned by another session - how much
performance and, mainly, SEO power does it have? Rate it out of 100. Use ChatGPT to get test cases and points, and also
take your own points separately and test them. Rate out of 100. I want totally real and harsh testing - harsh meaning a
level of testing so strict that no website could deliver that SEO and performance. In mobile view, in anything - I want
100 out of 100 in everything. Tell me the current rating and what all the issues are. Use ChatGPT in an extraordinary
way, but do proper testing of performance and SEO."

## How this round works
- Round 1 (this message): you give the rubric, the harsh test cases with exact pass thresholds, and a provisional
  score from the evidence. Claude Code then runs your test cases AND its own independent test list against a local
  production build (`next build` + `next start`, Chrome headless over CDP, Lighthouse mobile, the project's own
  vitals / SEO-audit / screenshot scripts) and comes back with measured numbers.
- Round 2+: you score against the measurements; Claude checks every claim against the code.
- The site is NOT deployed yet (no domain bought, no Search Console, no field data, no backlinks). Say how that should
  be scored instead of pretending it does not matter.

## Agenda
1. Scoring rubric: how to score Performance /100 and SEO /100 harshly and honestly (weights, lab vs field, on-page
   technical SEO vs real-world "SEO power" for a site with no domain, no deploy, no backlinks yet).
2. Harsh mobile performance test cases with exact pass thresholds stricter than Lighthouse's green band
   (low-end Android, slow 4G / 3G, 4-6x CPU, INP from real interactions, JS / font / image byte budgets, WebGL hero,
   preloader, Lenis + GSAP main-thread cost, bfcache, caching headers).
3. Harsh technical SEO test cases with exact pass criteria (crawl, render without JS, status codes, redirects,
   trailing slash, soft 404, canonicals, hreflang, sitemap, robots, structured data validity, internal link depth,
   anchor text, title / description pixel width, headings, image alt, OG).
4. Mobile-view checks (320-414 px): tap targets, font sizes, overflow, mobile-first content parity, intrusive
   interstitials (the 1.2 s first-visit preloader), sticky elements covering content.
5. Specific risks in this build: first-visit preloader, WebGL particle hero, Lenis smooth scroll, GSAP scenes,
   `display: optional` body font, 10-scene home page, research pages with big tables.
6. Your provisional score now (Performance /100, SEO /100, mobile /100) from the evidence below, and exactly which
   measurements would move it up or down.
7. What "100/100 in everything" can and cannot mean here - which targets are achievable in code and which depend on
   things outside the code (domain, hosting, Search Console, backlinks, field data).

## Output wanted
- For 2-4: a numbered test list (P1..Pn, S1..Sn, M1..Mn). Each test: what to measure, the exact tool or method that
  Claude can run locally (CDP, Lighthouse CLI, curl, a script), the pass threshold, and its weight in the score.
  Make it harsher than PageSpeed Insights, but every test must be measurable and tied to a real ranking or user effect
  (no vanity checks).
- Answer each agenda point by number: agree / disagree because ... / need data: ... . End with the list of points
  still open.

# Agenda - SiteBlitz performance + SEO harsh audit (2026-11-11)

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

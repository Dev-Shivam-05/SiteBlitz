import { SITE } from "./site";
import { FAQS, PROCESS_STEPS } from "./site";
import { PACKAGES, EXCLUSIONS, READY_TO_BUILD, inr, fromPrice } from "./offer";
import { absUrl } from "./seo";
import { PAGES, servicePages, industryPages, guidePages } from "./routes";
import { DEEP_SERVICES } from "@/content";
import { STUDY, num, pct } from "./research";

/**
 * llms.txt (https://llmstxt.org) and llms-full.txt, generated from the same sources as the pages. The old static
 * public/llms.txt still named the wrong city, a dollar price and withdrawn package prices - exactly the facts an AI
 * answer engine would then repeat. Generating it means it can never drift from site.ts / offer.ts again.
 */

const line = (label: string, path: string, note?: string) => `- [${label}](${absUrl(path)})${note ? `: ${note}` : ""}`;

const priceLine = () =>
  PACKAGES.map((p) => `${p.name} (${p.pages}): ${p.priceInr ? `${inr(p.priceInr)} one-time, no GST added` : "priced by written quote"}`).join("; ");

export function llmsTxt(): string {
  return [
    "# SiteBlitz",
    "",
    `> SiteBlitz (also written "Site Blitz") is a small website design and development studio based in South Gujarat, India, working with businesses remotely across India, mostly over WhatsApp. It builds mobile-friendly business websites with upfront prices, shows working demo websites first, and lets a business review a homepage concept before paying.`,
    "",
    "Key facts (kept in sync with the website):",
    `- Location: based in Gujarat, India (South Gujarat). No office address is published.`,
    `- Prices: ${priceLine()}.`,
    `- Delivery: ${PACKAGES.filter((p) => p.priceInr).map((p) => `${p.name} ${p.delivery}`).join("; ")}.`,
    `- Contact: WhatsApp or call ${SITE.phone}, replies ${SITE.replyHours}.`,
    "- No rankings, traffic or sales are guaranteed. The studio publishes no client reviews or results it cannot prove; demo websites are clearly labelled fictional concepts.",
    "",
    "## Main pages",
    line("Home", "/"),
    line(PAGES.services.label, PAGES.services.path, "what SiteBlitz builds and the starting price of each service"),
    line(PAGES.pricing.label, PAGES.pricing.path, "package prices, payment stages, inclusions, exclusions and terms"),
    line(PAGES.work.label, PAGES.work.path, "concept studies and working demo websites (fictional businesses, labelled)"),
    line(PAGES.process.label, PAGES.process.path, "the four steps from first WhatsApp message to launch"),
    line(PAGES.about.label, PAGES.about.path, "who runs SiteBlitz and how it works"),
    line(PAGES.faq.label, PAGES.faq.path, "direct answers to the questions buyers ask"),
    line(PAGES.contact.label, PAGES.contact.path),
    line(PAGES.in48.label, PAGES.in48.path, "what the one-page Launch website includes and when it is delivered"),
    line(PAGES.grader.label, PAGES.grader.path, "free instant check of any website: SEO basics, speed signals, mobile, trust"),
    "",
    "## Services",
    ...servicePages().map((e) => {
      const s = DEEP_SERVICES.find((d) => `/services/${d.slug}` === e.path);
      return line(e.label, e.path, s ? fromPrice(s.startingPriceINR) : undefined);
    }),
    "",
    "## Industries",
    ...industryPages().map((e) => line(e.label, e.path)),
    "",
    "## Research",
    line(
      PAGES.studyGujarat.label,
      PAGES.studyGujarat.path,
      `website URLs in ${num(STUDY.total.n)} Gujarat listing records (no brand recorded) across 17 trades: ${pct(STUDY.total.own, STUDY.total.n)} carry an own-website URL; by city and trade, with method, limits and CSV`
    ),
    line(PAGES.studySurat.label, PAGES.studySurat.path, "Surat's 17 trades against the rest of Gujarat, same rules"),
    "",
    "## Guides",
    ...guidePages().map((e) => line(e.label, e.path)),
    "",
    "## Optional",
    line("Full text for language models", "/llms-full.txt"),
    line("Live proof (this site's own real-user speed data)", PAGES.proof.path),
    "",
  ].join("\n");
}

export function llmsFullTxt(): string {
  return [
    llmsTxt(),
    "## Packages in full",
    ...PACKAGES.flatMap((p) => [
      `### ${p.name} - ${p.pages} - ${p.priceInr ? inr(p.priceInr) : "by quote"}`,
      p.tagline,
      `Delivery: ${p.delivery}.`,
      ...(p.payments ? [`Payments: ${inr(p.payments[0])} to start, ${inr(p.payments[1])} on completion.`] : []),
      "Includes:",
      ...p.includes.map((i) => `- ${i}`),
      "",
    ]),
    "Not included in any package price:",
    ...EXCLUSIONS.map((e) => `- ${e}`),
    "",
    "The delivery clock starts when the project is ready to build:",
    ...READY_TO_BUILD.map((r) => `- ${r}`),
    "",
    "## Process",
    ...PROCESS_STEPS.map((s) => `${s.n}. ${s.title} (${s.time}): ${s.text}`),
    "",
    "## Questions and answers",
    ...FAQS.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, ""]),
  ].join("\n");
}

import { DEEP_SERVICES, BLOG_POSTS, INDUSTRY_LANDERS } from "@/content";
import { PAGES, type PageEntry, type Freq } from "./pages";

export { PAGES, MAIN_NAV, type PageEntry } from "./pages";

/**
 * The information architecture in one place (SEO-1, 2026-11-11): the header, the phone menu, the footer, the sitemap
 * and llms.txt all read from here, so a page cannot exist in the sitemap but be unreachable from the site (the v4
 * footer had dropped every service, industry and guide link, leaving them orphaned).
 */

/** Content pages that are not in PAGES get this date unless they carry their own. */
const CONTENT_UPDATED = "2026-11-11";

const p = (path: string, label: string, updated: string, priority: number, freq: Freq = "monthly"): PageEntry => ({
  path,
  label,
  updated,
  priority,
  freq,
});

export const servicePages = (): PageEntry[] =>
  DEEP_SERVICES.map((s) => p(`/services/${s.slug}`, s.name, CONTENT_UPDATED, 0.8));

export const industryPages = (): PageEntry[] =>
  INDUSTRY_LANDERS.map((l) => p(`/for/${l.slug}`, `Websites for ${l.industry}`, CONTENT_UPDATED, 0.7));

export const guidePages = (): PageEntry[] =>
  BLOG_POSTS.map((b) => p(`/blog/${b.slug}`, b.title, b.updated ?? b.date, 0.6));

export interface FooterColumn {
  title: string;
  links: { href: string; label: string }[];
}

export function footerColumns(): FooterColumn[] {
  const link = (e: PageEntry, label = e.label) => ({ href: e.path, label });
  return [
    {
      title: "Studio",
      links: [PAGES.work, PAGES.services, PAGES.pricing, PAGES.process, PAGES.about, PAGES.faq, PAGES.contact].map((e) =>
        link(e)
      ),
    },
    {
      title: "Services",
      links: [link(PAGES.in48), ...servicePages().map((e) => link(e))],
    },
    {
      title: "Industries",
      links: [
        ...industryPages().map((e) => link(e, e.label.replace("Websites for ", ""))),
        { href: "/demo/salon", label: "Salon demo" },
        { href: "/demo/coaching", label: "Coaching demo" },
        { href: "/demo/showroom", label: "Showroom demo" },
      ],
    },
    {
      title: "Guides & tools",
      links: [
        link(PAGES.research, "Research"),
        link(PAGES.studyGujarat, "Gujarat website data 2026"),
        link(PAGES.blog, "All guides"),
        link(PAGES.grader),
        link(PAGES.proof, "Performance"),
        link(PAGES.book),
      ],
    },
  ];
}

export const LEGAL_LINKS = [PAGES.privacy, PAGES.terms, PAGES.refunds] as const;

/** Every indexable URL, for the sitemap and llms.txt. Demo sites are noindex (FD-45) and stay out. */
export function allIndexable(): PageEntry[] {
  return [
    ...Object.values(PAGES),
    ...servicePages(),
    ...industryPages(),
    ...guidePages(),
  ];
}

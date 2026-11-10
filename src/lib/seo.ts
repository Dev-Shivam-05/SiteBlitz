import type { Metadata } from "next";
import { SITE } from "./site";
import { PACKAGES, FROM_PRICE, inr } from "./offer";

/**
 * Search and AI-answer-engine plumbing in one place (SEO-1, 2026-11-11).
 *
 * Every page builds its <head> through `pageMeta()` and its structured data through the node builders below, so the
 * brand entity (name, alternate spellings, location wording, phone, offer) is stated identically on every URL. Search
 * engines and AI answer engines merge entities by consistency: one stray "Mumbai" or an old price on one page is
 * enough to split or contradict the entity. Facts come only from `site.ts` and `offer.ts`.
 */

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

/** The one alternate spelling that is genuinely used (the /faq answer "Is it SiteBlitz or Site Blitz?"). Never
 *  hidden text. Google's spelling correction maps typos (sitblitz, siteblits) to the entity once it is known. */
export const BRAND_ALTERNATE_NAMES = ["Site Blitz"] as const;

export const absUrl = (path = "/") => (path === "/" || path === "" ? SITE.url : `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`);

interface PageMetaInput {
  /** Without the brand; the root template appends " - SiteBlitz". */
  title: string;
  description: string;
  path: string;
  /** Use the title exactly as given (no brand suffix), e.g. when the brand already leads the title. */
  absoluteTitle?: boolean;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/** One metadata shape for every page: canonical, Open Graph and Twitter all point at the same absolute URL. The OG
 *  image comes from the nearest `opengraph-image.tsx` (file convention), so it is not repeated here. */
export function pageMeta(m: PageMetaInput): Metadata {
  const url = absUrl(m.path);
  const fullTitle = m.absoluteTitle ? m.title : `${m.title} — SiteBlitz`;
  return {
    title: m.absoluteTitle ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: { canonical: m.path },
    ...(m.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: m.type ?? "website",
      siteName: "SiteBlitz",
      locale: "en_IN",
      url,
      title: fullTitle,
      description: m.description,
      ...(m.publishedTime ? { publishedTime: m.publishedTime } : {}),
      ...(m.modifiedTime ? { modifiedTime: m.modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: m.description },
  };
}

/* ---------------------------------------------------------------- JSON-LD nodes */

type Node = Record<string, unknown>;

const offerNodes = () =>
  PACKAGES.filter((p) => p.priceInr !== null).map((p) => ({
    "@type": "Offer",
    name: `${p.name} website (${p.pages})`,
    description: p.tagline,
    price: String(p.priceInr),
    priceCurrency: "INR",
    url: absUrl("/pricing"),
    availability: "https://schema.org/InStock",
    seller: { "@id": ORG_ID },
  }));

/** The business entity. ProfessionalService is a LocalBusiness subtype, so it can carry areaServed and a region-only
 *  address (no street or city is published: truthful-location rule FD-22). sameAs stays out until real, verified
 *  profiles exist (Google Business Profile, LinkedIn ...): an unverifiable sameAs weakens the entity. */
export function organizationNode(): Node {
  return {
    "@type": ["ProfessionalService", "Organization"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    url: SITE.url,
    logo: { "@type": "ImageObject", url: absUrl("/brand/logo-icon.png"), width: 1024, height: 1024 },
    image: absUrl("/brand/logo-icon.png"),
    description: `SiteBlitz is a small web design and development studio based in Gujarat, India. It builds mobile-friendly business websites with upfront prices from ${inr(
      FROM_PRICE
    )}, shows working demo websites first and lets a business review a homepage concept before paying.`,
    slogan: SITE.tagline,
    foundingDate: String(SITE.founded),
    telephone: SITE.phone,
    ...(SITE.emailLive ? { email: SITE.email } : {}),
    address: { "@type": "PostalAddress", addressRegion: SITE.region, addressCountry: "IN" },
    areaServed: [
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: SITE.phone,
      availableLanguage: ["English", "Hindi"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "21:00",
      },
    },
    priceRange: `${inr(FROM_PRICE)} and up`,
    currenciesAccepted: "INR",
    knowsAbout: [
      "Website design",
      "Website development",
      "Business websites",
      "Landing pages",
      "Technical SEO",
      "Local SEO",
      "Google Business Profile",
      "Core Web Vitals",
      "Generative engine optimisation",
      "WhatsApp enquiry buttons",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website packages",
      itemListElement: offerNodes(),
    },
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    url: SITE.url,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbNode(crumbs: readonly Crumb[]): Node {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    "@id": `${absUrl(all[all.length - 1].path)}#breadcrumb`,
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absUrl(c.path) })),
  };
}

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage" | "ItemPage";

export function webPageNode(p: {
  path: string;
  name: string;
  description: string;
  type?: PageType;
  crumbs?: readonly Crumb[];
  dateModified?: string;
  about?: Node;
}): Node {
  const url = absUrl(p.path);
  return {
    "@type": p.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: p.name,
    description: p.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    ...(p.crumbs ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    ...(p.dateModified ? { dateModified: p.dateModified } : {}),
    ...(p.about ? { about: p.about } : { about: { "@id": ORG_ID } }),
  };
}

export function faqNode(path: string, faqs: readonly { q: string; a: string }[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${absUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceNode(s: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  priceInr?: number | null;
  areaServed?: Node | Node[];
}): Node {
  return {
    "@type": "Service",
    "@id": `${absUrl(s.path)}#service`,
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    url: absUrl(s.path),
    provider: { "@id": ORG_ID },
    areaServed: s.areaServed ?? [
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
    ],
    ...(s.priceInr && s.priceInr > 0
      ? {
          offers: {
            "@type": "Offer",
            price: String(s.priceInr),
            priceCurrency: "INR",
            url: absUrl(s.path),
            seller: { "@id": ORG_ID },
          },
        }
      : {}),
  };
}

/** Wrap nodes in one @graph so @id references resolve inside a single script tag. */
export function graph(...nodes: (Node | null | undefined | false)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}

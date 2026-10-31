/** Typed access to the generated content (written by the content engine,
 *  honesty-audited). Slugs are fixed — a missing file fails the build loudly. */

import type { DeepService } from "@/lib/services";

import svcBusiness from "./generated/service-business-websites.json";
import svcEcom from "./generated/service-ecommerce-and-booking.json";
import svcLanding from "./generated/service-landing-pages.json";
import svcRescue from "./generated/service-project-rescue.json";
import svcSeo from "./generated/service-seo-and-geo.json";
import svcCare from "./generated/service-care-plans.json";

import postMustHave from "./generated/post-what-a-small-business-website-must-have-2026.json";
import postCost from "./generated/post-website-cost-india-honest-breakdown.json";
import postGbp from "./generated/post-google-business-profile-plus-website-local-seo.json";
import postSpeed from "./generated/post-why-website-speed-decides-revenue.json";
import postLanding from "./generated/post-landing-page-vs-website-what-your-business-needs.json";
import postGeo from "./generated/post-generative-engine-optimization-geo-explained.json";
import postBuilderVsStudio from "./generated/post-website-builder-vs-web-design-studio.json";

import landRestaurants from "./generated/lander-restaurants.json";
import landClinics from "./generated/lander-clinics.json";
import landLaw from "./generated/lander-law-firms.json";
import landBoutiques from "./generated/lander-boutiques.json";

export interface PostBlock {
  type: "h2" | "p" | "list" | "quote";
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  /** SEO title when it should differ from the on-page H1 (the layout template appends the brand). */
  metaTitle?: string;
  description: string;
  cluster: string;
  readingMinutes: number;
  date: string;
  author: string;
  authorRole: string;
  blocks: PostBlock[];
  keyTakeaways: string[];
  faq: { q: string; a: string }[];
}

export interface IndustryLander {
  slug: string;
  industry: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  sub: string;
  painPoints: { title: string; text: string }[];
  mustHaves: { title: string; text: string }[];
  anchorWorkSlug: string;
  faqs: { q: string; a: string }[];
  cta: string;
}

export const DEEP_SERVICES = [
  svcBusiness,
  svcEcom,
  svcLanding,
  svcRescue,
  svcSeo,
  svcCare,
] as unknown as DeepService[];

export const BLOG_POSTS = [
  postMustHave,
  postCost,
  postGbp,
  postSpeed,
  postLanding,
  postGeo,
  postBuilderVsStudio,
] as unknown as BlogPost[];

export const INDUSTRY_LANDERS = [
  landRestaurants,
  landClinics,
  landLaw,
  landBoutiques,
] as unknown as IndustryLander[];

export function getService(slug: string): DeepService | undefined {
  return DEEP_SERVICES.find((s) => s.slug === slug);
}
export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
export function getLander(slug: string): IndustryLander | undefined {
  return INDUSTRY_LANDERS.find((l) => l.slug === slug);
}

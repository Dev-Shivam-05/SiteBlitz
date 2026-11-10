import { Shell } from "@/components/site/Shell";
import {
  Close,
  ConceptPromise,
  ConceptWall,
  DriftCollage,
  GiantPrice,
  HomeHero,
  Packages,
  Process,
  Statement,
} from "@/components/site/sections/Home";
import { FAQ } from "@/components/site/sections/FAQ";
import { FAQS } from "@/lib/site";
import { FROM_PRICE, businessPkg, inr } from "@/lib/offer";
import { PAGES } from "@/lib/pages";
import { faqNode, graph, pageMeta, webPageNode } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";

const TITLE = "SiteBlitz — Gujarat-based Website Design & Development Studio";
const DESCRIPTION = `Gujarat-based website studio for businesses across India. One page ${inr(FROM_PRICE)}, three pages ${inr(
  businessPkg.priceInr as number
)}. See working demos and a concept before you pay.`;

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: "/", absoluteTitle: true });

/* The home page adds its own WebPage + the short FAQ to the site graph that the root layout already states. */
const ld = graph(
  webPageNode({ path: "/", name: TITLE, description: DESCRIPTION, dateModified: PAGES.home.updated }),
  faqNode("/", FAQS)
);

export default function HomePage() {
  return (
    <Shell>
      <JsonLd data={ld} />
      {/* Redesign v4 scene order (docs/spec/redesign-v4-showcase.md): particle hero that becomes a concept phone ->
          the promise -> the price -> drifting concept captures -> the concept wall -> packages track -> steps ->
          concept promise -> questions -> close. */}
      <HomeHero />
      <Statement />
      <GiantPrice />
      <DriftCollage />
      <ConceptWall />
      <Packages />
      <Process />
      <ConceptPromise />
      <FAQ />
      <Close />
    </Shell>
  );
}

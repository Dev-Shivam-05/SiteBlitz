import type { Metadata } from "next";
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
import { FAQS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: "SiteBlitz",
  url: SITE.url,
  publisher: { "@id": `${SITE.url}/#organization` },
};

export default function HomePage() {
  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
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

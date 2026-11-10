import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import {
  Close,
  ConceptPromise,
  DemoStack,
  GiantPrice,
  HomeHero,
  Packages,
  Process,
  Statement,
  TypeWipe,
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
      {/* Redesign v3 scene order (docs/spec/redesign-v3-motion.md, reference Horeca Social): offer and price ->
          the price as a fact -> why -> working concept demos -> type wipe -> packages -> steps -> concept promise ->
          questions -> close. The comparison table and defensive lines were removed by the owner-approved spec. */}
      <HomeHero />
      <GiantPrice />
      <Statement />
      <DemoStack />
      <TypeWipe />
      <Packages />
      <Process />
      <ConceptPromise />
      <FAQ />
      <Close />
    </Shell>
  );
}

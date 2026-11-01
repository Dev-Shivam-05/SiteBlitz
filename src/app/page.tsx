import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { Compare, DemoShowcase, FinalCTA, HomeHero, HomePricing, HowItWorks } from "@/components/site/sections/Home";
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
      {/* Order agreed in docs/debate/2026-11-01-ads-psychology-redesign (R2/FD-36): offer and price ->
          working demos -> how buying works -> pricing and terms -> honest comparison -> questions -> next step */}
      <HomeHero />
      <DemoShowcase />
      <HowItWorks />
      <HomePricing />
      <Compare />
      <FAQ />
      <FinalCTA />
    </Shell>
  );
}

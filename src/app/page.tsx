import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { Hero } from "@/components/site/sections/Hero";
import { Stats } from "@/components/site/sections/Stats";
import { Services } from "@/components/site/sections/Services";
import { Work } from "@/components/site/sections/Work";
import { Process } from "@/components/site/sections/Process";
import { Manifesto } from "@/components/site/sections/Manifesto";
import { Testimonials } from "@/components/site/sections/Testimonials";
import { Pricing } from "@/components/site/sections/Pricing";
import { FAQ } from "@/components/site/sections/FAQ";
import { CTA } from "@/components/site/sections/CTA";
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
  name: "SiteBlitz",
  url: SITE.url,
};

export default function HomePage() {
  return (
    <Shell entrance>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <Stats />
      <Services />
      <Work />
      <Process />
      <Manifesto />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </Shell>
  );
}

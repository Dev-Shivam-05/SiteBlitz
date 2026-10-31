import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { Hero } from "@/components/site/sections/Hero";
import { Answers } from "@/components/site/sections/Answers";
import { Services } from "@/components/site/sections/Services";
import { WorkGallery } from "@/components/site/sections/WorkGallery";
import { Process } from "@/components/site/sections/Process";
import { Evidence } from "@/components/site/sections/Evidence";
import { Pricing } from "@/components/site/sections/Pricing";
import { FAQ } from "@/components/site/sections/FAQ";
import { CTA } from "@/components/site/sections/CTA";
import { BigMarquee } from "@/components/site/BigMarquee";
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
    <Shell entrance>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* Six-beat narrative (X1, agreed in docs/debate/2026-10-31-redesign-seo-direction):
          problem -> buyer questions -> approach -> services + concepts -> evidence -> next step */}
      <div data-chapter="intro">
        <Hero />
        <Answers />
      </div>
      <div data-chapter="process" data-bgshift="#0C0E09">
        <Process />
      </div>
      <div data-chapter="services" data-bgshift="#0D0D13">
        <Services />
      </div>
      <div data-chapter="work">
        <BigMarquee words={["CONCEPT STUDIES", "HOW WE BUILD"]} />
        <WorkGallery />
      </div>
      <div data-chapter="pricing" data-bgshift="#100D14">
        <Evidence />
        <Pricing />
      </div>
      <div data-chapter="contact">
        <FAQ />
        <BigMarquee words={["LET'S BLITZ IT", "START TODAY"]} />
        <CTA />
      </div>
    </Shell>
  );
}

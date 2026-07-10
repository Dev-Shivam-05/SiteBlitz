import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { Hero } from "@/components/site/sections/Hero";
import { Stats } from "@/components/site/sections/Stats";
import { Services } from "@/components/site/sections/Services";
import { WorkGallery } from "@/components/site/sections/WorkGallery";
import { Process } from "@/components/site/sections/Process";
import { Manifesto } from "@/components/site/sections/Manifesto";
import { Testimonials } from "@/components/site/sections/Testimonials";
import { Pricing } from "@/components/site/sections/Pricing";
import { FAQ } from "@/components/site/sections/FAQ";
import { CTA } from "@/components/site/sections/CTA";
import { BigMarquee } from "@/components/site/BigMarquee";
import { ProofStrip } from "@/components/site/ProofStrip";
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
      <div data-chapter="intro">
        <Hero />
        <ProofStrip />
        <Stats />
      </div>
      <div data-chapter="services" data-bgshift="#0D0D13">
        <Services />
      </div>
      <div data-chapter="work">
        <BigMarquee words={["SELECTED WORK", "CASE STUDIES"]} />
        <WorkGallery />
      </div>
      <div data-chapter="process" data-bgshift="#0C0E09">
        <Process />
        <Manifesto />
      </div>
      <div data-chapter="pricing" data-bgshift="#100D14">
        <Testimonials />
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

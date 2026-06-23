import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { Services } from "@/components/site/sections/Services";
import { Process } from "@/components/site/sections/Process";
import { CTA } from "@/components/site/sections/CTA";

export const metadata: Metadata = {
  title: "Services — Web Design, Development & SEO",
  description:
    "Business websites, e-commerce, landing pages, redesigns, technical SEO and ongoing care — delivered fast by SiteBlitz for India and worldwide.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pb-0 pt-32 md:px-8 md:pt-44">
        <p className="reveal text-xs uppercase tracking-[0.25em] text-volt">Services</p>
        <h1 className="reveal font-display mt-3 text-5xl font-bold tracking-tight md:text-8xl" data-delay="100">
          One studio<span className="text-volt">,</span>
          <br />
          every <span className="font-accent italic">weapon</span>
        </h1>
        <p className="reveal mt-6 max-w-xl text-base leading-relaxed text-muted" data-delay="200">
          Design, engineering, SEO and analytics under one roof — so nothing gets lost between
          "agencies" and your website actually makes money.
        </p>
      </section>
      <Services />
      <Process />
      <CTA />
    </Shell>
  );
}

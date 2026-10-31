import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { Pricing } from "@/components/site/sections/Pricing";
import { ScopeCalculator } from "@/components/site/ScopeCalculator";
import { FAQ } from "@/components/site/sections/FAQ";
import { CTA } from "@/components/site/sections/CTA";

export const metadata: Metadata = {
  title: "Affordable Website Design in India — Fixed Prices",
  description:
    "SiteBlitz pricing: conversion-focused business websites from ₹7,999 / $99. One-time payment, 48-hour delivery available, you own everything.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pb-0 pt-32 md:px-8 md:pt-44">
        <p className="text-xs uppercase tracking-[0.25em] text-volt">Pricing</p>
        <h1 className="font-display mt-3 text-5xl font-bold tracking-tight md:text-8xl">
          Honest numbers<span className="text-volt">,</span>
          <br />
          <span className="font-accent italic">zero</span> surprises
        </h1>
      </section>
      <Pricing compact={false} />
      <ScopeCalculator />
      <FAQ />
      <CTA />
    </Shell>
  );
}

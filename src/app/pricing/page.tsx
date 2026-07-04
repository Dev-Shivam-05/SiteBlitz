import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { Pricing } from "@/components/site/sections/Pricing";
import { FAQ } from "@/components/site/sections/FAQ";
import { CTA } from "@/components/site/sections/CTA";

export const metadata: Metadata = {
  title: "Pricing — Transparent, One-Time, No Surprises",
  description:
    "SiteBlitz pricing: conversion-focused business websites from ₹7,999 / $99. One-time payment, 48-hour delivery available, you own everything.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pb-0 pt-32 md:px-8 md:pt-44">
        <p className="reveal text-xs uppercase tracking-[0.25em] text-volt">Pricing</p>
        <h1 className="reveal font-display mt-3 text-5xl font-bold tracking-tight md:text-8xl" data-delay="100">
          Honest numbers<span className="text-volt">,</span>
          <br />
          <span className="font-accent italic">zero</span> surprises
        </h1>
      </section>
      <Pricing compact={false} />
      <FAQ />
      <CTA />
    </Shell>
  );
}

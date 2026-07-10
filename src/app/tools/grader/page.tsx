import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { GraderTool } from "@/components/site/GraderTool";

export const metadata: Metadata = {
  title: "Free Website Grader — 20 Real Checks in 10 Seconds | SiteBlitz",
  description:
    "Paste your website address and get an honest, instant audit: SEO basics, speed signals, mobile setup and trust checks. Free, no email wall.",
  alternates: { canonical: "/tools/grader" },
};

export default function GraderPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8 md:pt-44">
        <p className="text-xs uppercase tracking-[0.25em] text-volt" data-anim="fade-up" data-now>
          Free tool
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl" data-anim="chars" data-now>
          Is your website <span className="font-accent italic text-volt">helping</span> or hurting<span className="text-volt">?</span>
        </h1>
        <p className="mt-6 max-w-xl text-muted" data-anim="fade-up" data-now data-delay="0.3">
          We run the same first checks on your site that we run on every project we take over —
          the ones Google and your visitors actually feel. Instant, free, and honest enough to
          hurt a little.
        </p>
        <div className="mt-10" data-anim="fade-up" data-now data-delay="0.4">
          <GraderTool />
        </div>
      </section>
    </Shell>
  );
}

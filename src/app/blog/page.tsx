import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { BLOG_POSTS } from "@/content";

export const metadata: Metadata = {
  title: "Insights — Honest Notes on Websites That Sell",
  description:
    "No AI-farm listicles. Practical, honest writing on websites, speed, local SEO and AI search for business owners in India and beyond.",
  alternates: { canonical: "/blog" },
};

const CLUSTER_LABEL: Record<string, string> = {
  "smb-india": "Websites for Indian SMBs",
  "speed-conversion": "Speed & conversion",
};

export default function BlogIndex() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-32 md:px-8 md:pt-44">
        <p className="text-xs uppercase tracking-[0.25em] text-volt" data-anim="fade-up" data-now>
          Insights
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-7xl" data-anim="chars" data-now>
          Notes from the <span className="font-accent italic text-volt">build floor</span>
        </h1>
        <p className="mt-6 max-w-xl text-muted" data-anim="fade-up" data-now data-delay="0.3">
          Written by a human who ships websites, not a content farm. Every piece is something we
          actually explain to clients — published so you can use it even if you never hire us.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {BLOG_POSTS.map((p, i) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              data-track={`blog_card_${p.slug}`}
              data-cursor-label="Read"
              className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-volt/30"
              data-anim="scale-in"
              data-delay={String((i % 2) * 0.08)}
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-volt">
                  {CLUSTER_LABEL[p.cluster] || p.cluster}
                </p>
                <h2 className="font-display mt-3 text-2xl font-bold leading-snug group-hover:text-volt">
                  {p.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
              </div>
              <p className="mt-6 flex items-center gap-3 text-xs text-faint">
                <span>{p.author}</span>·
                <span>
                  {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                ·<span>{p.readingMinutes} min read</span>
                <span className="ml-auto text-volt opacity-0 transition-opacity group-hover:opacity-100">read →</span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}

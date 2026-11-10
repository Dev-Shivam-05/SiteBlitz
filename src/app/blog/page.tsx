import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { BLOG_POSTS } from "@/content";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { Close } from "@/components/site/sections/Home";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, pageMeta, webPageNode, type Crumb } from "@/lib/seo";

const TITLE = "Small Business Website Guides";
const DESCRIPTION =
  "Plain guides on website costs, planning, Google visibility, speed and AI search for business owners in India, in English and Hindi (Roman script).";
const CRUMBS: Crumb[] = [{ name: "Guides", path: PAGES.blog.path }];

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PAGES.blog.path });

const ld = graph(
  webPageNode({ path: PAGES.blog.path, name: TITLE, description: DESCRIPTION, type: "CollectionPage", crumbs: CRUMBS, dateModified: PAGES.blog.updated }),
  breadcrumbNode(CRUMBS)
);

const CLUSTER_LABEL: Record<string, string> = {
  "smb-india": "Websites for Indian SMBs",
  "speed-conversion": "Speed & conversion",
};

export default function BlogIndex() {
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        crumbs={CRUMBS}
        kicker="Guides"
        lines={["Website guides", <span key="g" className="serif text-volt">for business owners.</span>]}
        lead={
          <p>
            What a website costs, what it must have, how Google and AI tools find it, and how to judge a quote. Useful even
            if you never hire us. One guide is also in Hindi (Roman script).
          </p>
        }
      />

      <section aria-label="All guides" className="mx-auto max-w-[1440px] px-4 pb-[12vh] md:px-8">
        <div className="grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
          {BLOG_POSTS.map((p, i) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              data-track={`blog_card_${p.slug}`}
              data-cursor-label="Read"
              lang={p.lang}
              className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-volt/40"
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
      <Close />
    </Shell>
  );
}

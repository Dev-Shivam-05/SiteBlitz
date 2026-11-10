import type { Metadata } from "next";
import { fromPrice } from "@/lib/offer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/site/Shell";
import { BLOG_POSTS, getPost, type PostBlock } from "@/content";
import { DEEP_SERVICES } from "@/content";
import { SITE } from "@/lib/site";
import { absUrl, breadcrumbNode, graph, ORG_ID, pageMeta, webPageNode, type Crumb } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PAGES } from "@/lib/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

const postPath = (slug: string) => `/blog/${slug}`;

/** hreflang map for a post with translations: itself, each equivalent, and plain "hi" as the fallback for Hindi in
 *  Roman script while it is the only Hindi version (debate round 2, R2). Both posts list each other. */
function languageAlternates(p: { slug: string; lang?: string; translations?: Record<string, string> }) {
  if (!p.translations) return undefined;
  const map: Record<string, string> = { [p.lang ?? "en"]: absUrl(postPath(p.slug)) };
  for (const [lang, slug] of Object.entries(p.translations)) map[lang] = absUrl(postPath(slug));
  if (map["hi-Latn"] && !map.hi) map.hi = map["hi-Latn"];
  return map;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const meta = pageMeta({
    title: p.metaTitle ?? p.title,
    description: p.description,
    path: postPath(p.slug),
    type: "article",
    publishedTime: p.date,
    modifiedTime: p.updated ?? p.date,
  });
  const languages = languageAlternates(p);
  return languages ? { ...meta, alternates: { ...meta.alternates, languages } } : meta;
}

function Block({ b }: { b: PostBlock }) {
  if (b.type === "h2")
    return <h2 className="font-display mt-10 text-2xl font-bold tracking-tight md:text-3xl">{b.text}</h2>;
  if (b.type === "quote")
    return (
      <blockquote className="my-8 border-l-2 border-volt pl-5">
        <p className="font-accent text-xl italic leading-relaxed text-ink">{b.text}</p>
      </blockquote>
    );
  if (b.type === "list")
    return (
      <ul className="my-4 space-y-2">
        {(b.items || []).map((it, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted">
            <span className="mt-1 shrink-0 text-volt">✦</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  return <p className="my-4 text-[15px] leading-relaxed text-muted">{b.text}</p>;
}

/** 10turtle's smartest pattern, done honestly: a relevant service card inside
 *  the article — with a real price, linking to a real scoped page. */
function ServicePlug({ cluster }: { cluster: string }) {
  const svc =
    cluster === "smb-india"
      ? DEEP_SERVICES.find((s) => s.slug === "business-websites")
      : DEEP_SERVICES.find((s) => s.slug === "seo-and-geo");
  if (!svc) return null;
  return (
    <aside className="my-10 rounded-2xl border border-volt/30 bg-surface p-6">
      <p className="text-[10px] uppercase tracking-[0.25em] text-volt">From the studio</p>
      <p className="font-display mt-2 text-lg font-bold">{svc.name}</p>
      <p className="mt-1 text-sm text-muted">{svc.promise.split(". ")[0]}.</p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Link
          href={`/services/${svc.slug}`}
          data-track={`blog_plug_${svc.slug}`}
          className="btn-volt rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          {fromPrice(svc.startingPriceINR)} →
        </Link>
        <span className="text-xs text-faint">{svc.timeline}</span>
      </div>
    </aside>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const path = postPath(p.slug);
  const crumbs: Crumb[] = [
    { name: PAGES.blog.label, path: PAGES.blog.path },
    { name: p.title, path },
  ];
  const otherLangs = Object.entries(p.translations ?? {});
  const jsonLd = graph(
    webPageNode({ path, name: p.title, description: p.description, crumbs, dateModified: p.updated ?? p.date, about: { "@id": `${absUrl(path)}#article` } }),
    breadcrumbNode(crumbs),
    {
      "@type": "BlogPosting",
      "@id": `${absUrl(path)}#article`,
      headline: p.title,
      description: p.description,
      inLanguage: p.lang ?? "en-IN",
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      // Studio-written posts are credited to the organisation, not to a person who did not write them.
      author:
        p.author === "SiteBlitz Studio" ? { "@id": ORG_ID } : { "@type": "Person", name: p.author, jobTitle: p.authorRole },
      publisher: { "@id": ORG_ID },
      mainEntityOfPage: { "@id": `${absUrl(path)}#webpage` },
      ...(otherLangs.length ? { workTranslation: otherLangs.map(([, s]) => ({ "@id": `${absUrl(postPath(s))}#article` })) } : {}),
    },
    {
      "@type": "FAQPage",
      "@id": `${absUrl(path)}#faq`,
      mainEntity: p.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }
  );

  const mid = Math.floor(p.blocks.length / 2);

  return (
    <Shell>
      <JsonLd data={jsonLd} />
      <article lang={p.lang} className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-44">
        <div lang="en" className="ph-soft mb-8 flex flex-wrap items-center justify-between gap-3">
          <Breadcrumbs crumbs={crumbs} />
          {otherLangs.map(([lang, slug]) => (
            <Link
              key={lang}
              href={postPath(slug)}
              hrefLang={lang}
              className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink/85 transition-colors hover:border-volt/50 hover:text-ink"
            >
              {lang.startsWith("hi") ? "Hindi (Roman) mein padhein" : "Read in English"}
            </Link>
          ))}
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-volt">
          {p.cluster === "smb-india" ? "Websites for Indian SMBs" : "Speed & conversion"}
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          {p.title}
        </h1>
        <div className="mt-6 flex flex-wrap items-center gap-3 border-b border-line pb-6 text-xs text-faint">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-volt font-display text-xs font-bold text-void">
            SB
          </span>
          <span className="text-muted">{p.author}</span>·<span>{p.authorRole}</span>·
          <span>{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          ·<span>{p.readingMinutes} min read</span>
        </div>

        {p.blocks.slice(0, mid).map((b, i) => (
          <Block key={i} b={b} />
        ))}
        <ServicePlug cluster={p.cluster} />
        {p.blocks.slice(mid).map((b, i) => (
          <Block key={mid + i} b={b} />
        ))}

        <div className="mt-12 rounded-2xl border border-line bg-surface p-6">
          <p className="font-display text-sm font-bold uppercase tracking-widest text-volt">Key takeaways</p>
          <ul className="mt-4 space-y-2">
            {p.keyTakeaways.map((t, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink">
                <span className="font-display shrink-0 font-bold tabular-nums text-volt">{i + 1}.</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          {p.faq.map((f) => (
            <details key={f.q} className="group border-b border-line py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="shrink-0 text-volt transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <Link href="/blog" className="text-sm text-muted hover:text-ink">
            ← All guides
          </Link>
          <a
            href={SITE.whatsapp(`Hi SiteBlitz! I read "${p.title}" and have a question.`)}
            target="_blank"
            rel="noopener noreferrer"
            data-track={`blog_wa_${p.slug}`}
            className="btn-ghost rounded-full px-5 py-2.5 text-sm text-ink"
          >
            Ask us about this →
          </a>
        </div>
      </article>
    </Shell>
  );
}

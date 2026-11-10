import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { HeroFigure, PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { ConceptFrame } from "@/components/site/ConceptFrame";
import { Close, ConceptWall } from "@/components/site/sections/Home";
import { WORK_ITEMS } from "@/lib/site";
import { DEMO_LIST } from "@/lib/demos";
import { PAGES } from "@/lib/pages";
import { absUrl, breadcrumbNode, graph, pageMeta, webPageNode, type Crumb } from "@/lib/seo";

const PATH = PAGES.work.path;
const TITLE = "Website Design Concepts & Live Demos";
const DESCRIPTION =
  "Open three working demo websites and four concept studies for restaurants, clinics, boutiques and law firms. Every concept is fictional, not a client project.";
const CRUMBS: Crumb[] = [{ name: "Work", path: PATH }];

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const ld = graph(
  webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, type: "CollectionPage", crumbs: CRUMBS, dateModified: PAGES.work.updated, about: { "@id": `${absUrl(PATH)}#concepts` } }),
  breadcrumbNode(CRUMBS),
  {
    "@type": "ItemList",
    "@id": `${absUrl(PATH)}#concepts`,
    name: "SiteBlitz website concepts (fictional businesses)",
    itemListElement: [
      ...DEMO_LIST.map((d) => ({ name: `${d.vertical} demo website (${d.brand}, fictional)`, url: absUrl(`/demo/${d.id}`) })),
      ...WORK_ITEMS.map((w) => ({ name: `${w.title} (concept study)`, url: absUrl(`${PATH}#${w.slug}`) })),
    ].map((item, i) => ({ "@type": "ListItem", position: i + 1, ...item })),
  }
);

/** /work (SEO-3): the three live demo sites on the concept wall (its hold-and-rise scene is the page's moment), then
 *  the four concept studies. Nothing here is a client project, and every card says so. */
export default function WorkPage() {
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        crumbs={CRUMBS}
        kicker="Work · concept studies"
        lines={["Website concepts", <span key="o" className="serif text-volt">you can open.</span>]}
        lead={
          <p>
            Three working demo websites and four concept studies show how we build for different kinds of business. They
            are fictional: we publish a client case study only with permission and numbers we can show. The one live build
            you can inspect is this site, and{" "}
            <Link href={PAGES.proof.path} className="text-ink underline underline-offset-4 hover:text-volt">
              its own speed data is public
            </Link>
            .
          </p>
        }
        aside={
          <HeroFigure
            rows={[
              { value: String(DEMO_LIST.length), label: "Live demo sites" },
              { value: String(WORK_ITEMS.length), label: "Concept studies" },
            ]}
            caption="Fictional businesses, labelled as such on every page."
          />
        }
      />

      <ConceptWall allLink={false} />

      <section aria-labelledby="studies-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <p className="kicker text-volt">Concept studies</p>
          <h2 id="studies-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
            Four trades, <span className="serif text-volt">four plans.</span>
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 [&>*]:min-w-0">
            {WORK_ITEMS.map((w, i) => (
              <article key={w.slug} id={w.slug} className="scroll-mt-28">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-volt/40">
                  <ConceptFrame title={w.title} goal={w.goal} index={i} />
                </div>
                <p className="kicker mt-6 text-faint">{w.category}</p>
                <h3 className="display mt-3 text-[clamp(24px,6vw,30px)] md:text-[clamp(28px,2.2vw,40px)]">{w.title}</h3>
                <p className="mt-4 text-base font-semibold text-volt">{w.goal}</p>
                <p className="mt-3 text-base leading-relaxed text-muted">{w.story}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {w.stack.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-ink/75">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-16 max-w-[70ch] text-base text-muted">
            Want one for your trade? See{" "}
            <Link href="/for/restaurants" className="text-ink underline underline-offset-4 hover:text-volt">restaurants</Link>,{" "}
            <Link href="/for/clinics" className="text-ink underline underline-offset-4 hover:text-volt">clinics</Link>,{" "}
            <Link href="/for/law-firms" className="text-ink underline underline-offset-4 hover:text-volt">law firms</Link> and{" "}
            <Link href="/for/boutiques" className="text-ink underline underline-offset-4 hover:text-volt">boutiques</Link>, or the{" "}
            <Link href={PAGES.pricing.path} className="text-ink underline underline-offset-4 hover:text-volt">package prices</Link>.
          </p>
        </div>
      </section>

      <Close />
    </Shell>
  );
}

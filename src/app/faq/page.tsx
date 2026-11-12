import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { HeroFigure, PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { Close } from "@/components/site/sections/Home";
import { FAQ_GROUPS, SITE } from "@/lib/site";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, faqNode, graph, pageMeta, webPageNode, type Crumb } from "@/lib/seo";

const PATH = PAGES.faq.path;
const TITLE = "Website Design FAQ: Price, Time, Google & Ownership";
const DESCRIPTION =
  "Straight answers about getting a business website from SiteBlitz: what it costs, how long it takes, what you provide, Google visibility and who owns the site.";
const CRUMBS: Crumb[] = [{ name: "FAQ", path: PATH }];

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const ALL = FAQ_GROUPS.flatMap((g) => g.items);

const ld = graph(
  webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, crumbs: CRUMBS, dateModified: PAGES.faq.updated, about: { "@id": `${SITE.url}${PATH}#faq` } }),
  breadcrumbNode(CRUMBS),
  faqNode(PATH, ALL)
);

/** /faq (SEO-2): every buyer question, grouped, with a sticky index on desktop. Native <details> keeps it keyboard-
 *  and reduced-motion-safe; the answers are in the HTML whether a question is open or not. */
export default function FaqPage() {
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        crumbs={CRUMBS}
        kicker="Questions people ask"
        lines={["Website questions,", <span key="a" className="serif text-volt">answered straight.</span>]}
        lead={
          <p>
            {ALL.length} questions business owners ask before getting a website: price, time, Google, ownership and who
            we are. If yours is missing, ask it on WhatsApp and get a direct answer.
          </p>
        }
        aside={
          <HeroFigure
            rows={FAQ_GROUPS.map((g) => ({ value: String(g.items.length).padStart(2, "0"), label: g.title }))}
          />
        }
      />

      <section aria-label="Questions by topic" className="bg-void pb-[14vh]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 md:grid-cols-[4fr_8fr] md:gap-16 md:px-8 [&>*]:min-w-0">
          <nav aria-label="Topics" className="md:sticky md:top-[104px] md:self-start">
            <ol className="grid grid-cols-2 gap-2 md:grid-cols-1 [&>*]:min-w-0">
              {FAQ_GROUPS.map((g, n) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="group flex min-h-11 items-baseline gap-3 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink/85 transition-colors hover:border-volt/50 hover:text-ink md:rounded-none md:border-0 md:border-b md:px-0 md:py-4 md:text-lg"
                  >
                    <span className="display text-xs text-volt md:text-sm">0{n + 1}</span>
                    {g.title}
                    <span aria-hidden className="ml-auto hidden text-faint transition-transform group-hover:translate-x-1 group-hover:text-volt md:inline">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-20">
            {FAQ_GROUPS.map((g, n) => (
              <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28">
                <p className="kicker text-volt">0{n + 1}</p>
                <h2 id={`${g.id}-title`} className="display mt-3 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.6vw,64px)]">
                  {g.title}
                </h2>
                <div className="mt-8 border-t border-ink/15">
                  {g.items.map((f) => (
                    <details key={f.q} name={`faq-${g.id}`} className="faq-item group border-b border-ink/15">
                      <summary
                        data-track="faq_page_open"
                        className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold md:text-xl"
                      >
                        <h3 className="font-semibold">{f.q}</h3>
                        <span
                          aria-hidden
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-xl text-volt transition-transform duration-200 group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="max-w-[62ch] pb-6 text-base leading-relaxed text-muted">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}

            <p className="text-base text-muted">
              Prices and terms in full are on <Link href={PAGES.pricing.path} className="text-ink underline underline-offset-4 hover:text-volt">Pricing</Link>,
              and the four steps from first message to launch are on{" "}
              <Link href={PAGES.process.path} className="text-ink underline underline-offset-4 hover:text-volt">Process</Link>.
            </p>
          </div>
        </div>
      </section>

      <Close />
    </Shell>
  );
}

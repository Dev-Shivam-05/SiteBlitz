import { Shell } from "@/components/site/Shell";
import { GraderTool } from "@/components/site/GraderTool";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { PAGES } from "@/lib/pages";
import { absUrl, breadcrumbNode, graph, ORG_ID, pageMeta, webPageNode, type Crumb } from "@/lib/seo";

const PATH = PAGES.grader.path;
const TITLE = "Free Website Grader: 20 Checks in About 10 Seconds";
const DESCRIPTION =
  "Paste your website address for an instant check of SEO basics, speed signals, mobile setup and trust signals. Free, no email needed.";
const CRUMBS: Crumb[] = [{ name: "Free website check", path: PATH }];

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const ld = graph(
  webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, crumbs: CRUMBS, dateModified: PAGES.grader.updated, about: { "@id": `${absUrl(PATH)}#app` } }),
  breadcrumbNode(CRUMBS),
  {
    "@type": "WebApplication",
    "@id": `${absUrl(PATH)}#app`,
    name: "SiteBlitz free website grader",
    url: absUrl(PATH),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (runs in the browser)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@id": ORG_ID },
  }
);

/** /tools/grader (SEO-6 follow-up): the tool is the first screen; no JavaScript fade may hide it (CLAUDE.md rule 4). */
export default function GraderPage() {
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        crumbs={CRUMBS}
        kicker="Free tool"
        lines={["Free website", <span key="c" className="serif text-volt">check.</span>]}
        lead={
          <p>
            Paste your website address and get an instant check of SEO basics, speed signals, mobile setup and trust
            signals: about 20 checks in roughly ten seconds. Free, and no email needed.
          </p>
        }
      />
      <section aria-label="Website grader" className="bg-void pb-[12vh]">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <GraderTool />
        </div>
      </section>
    </Shell>
  );
}

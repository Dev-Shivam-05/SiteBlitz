import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { Close, Stroke } from "@/components/site/sections/Home";
import { SITE } from "@/lib/site";
import { businessPkg, inr, launchPkg } from "@/lib/offer";
import { PAGES } from "@/lib/pages";
import { STUDY } from "@/lib/research";
import { ORG_ID, breadcrumbNode, graph, pageMeta, webPageNode, type Crumb } from "@/lib/seo";

const PATH = PAGES.about.path;
const TITLE = "About SiteBlitz, a Gujarat-based Website Studio";
const DESCRIPTION =
  "SiteBlitz is a small website studio based in Gujarat, working with businesses across India: demo first, price and scope in writing, the site handed over in your name.";
const CRUMBS: Crumb[] = [{ name: "Studio", path: PATH }];

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const ld = graph(
  webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, type: "AboutPage", crumbs: CRUMBS, dateModified: PAGES.about.updated, about: { "@id": ORG_ID } }),
  breadcrumbNode(CRUMBS)
);

/** How the studio works: each line is something a buyer can check on this site, not a virtue claim. */
const WAYS = [
  {
    title: "Demo before deposit",
    text: "You open a working demo website for your kind of business before you pay anything, and for suitable projects you can review a homepage concept for your own business.",
  },
  {
    title: "Prices written down",
    text: `${inr(launchPkg.priceInr as number)} for one page, ${inr(businessPkg.priceInr as number)} for three, everything else by written quote. What is not included is listed on the pricing page.`,
  },
  {
    title: "Yours at the end",
    text: "We recommend registering the domain in your own name. The agreement lists what is handed over: the live site, access and your content.",
  },
  {
    title: "No invented proof",
    text: "No reviews, client logos or results until they are real and can be shown. Demo businesses are labelled fictional, and this site's own speed data is public.",
  },
] as const;

const FACTS = [
  ["Based in", "South Gujarat, India"],
  ["Works with", "Businesses across India, remotely"],
  ["Talk to us", `WhatsApp ${SITE.phone}`],
  ["Replies", SITE.replyHours],
  ["Started", String(SITE.founded)],
] as const;

/** /about (SEO-3): who the studio is, in facts a visitor can check. The moment is the statement that tints word by word
 *  as it is read. Replaces copy that promised indexing and a client analytics engine the offer does not include. */
export default function AboutPage() {
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        crumbs={CRUMBS}
        kicker="The studio"
        lines={["A small studio", <span key="g" className="serif text-volt">based in Gujarat.</span>]}
        lead={
          <p>
            SiteBlitz builds websites for small businesses across India, mostly over WhatsApp. We show a working demo first,
            write the price and the scope down before any payment, and hand the finished site over in your name.
          </p>
        }
        aside={
          <dl className="rounded-3xl border border-line bg-surface p-7 md:p-9">
            {FACTS.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-6 border-b border-line py-3 last:border-0">
                <dt className="kicker text-faint">{k}</dt>
                <dd className="text-right text-base font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section aria-label="What we believe" className="border-t border-line bg-void py-[16vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <p
            data-anim="words-scrub"
            className="max-w-[24ch] text-[clamp(28px,7vw,40px)] font-semibold leading-tight md:text-[clamp(40px,4vw,68px)]"
          >
            A small business website has one job: make it easy for the right customer to understand you and get in touch.
          </p>
        </div>
      </section>

      <section aria-labelledby="ways-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <p className="kicker text-volt">How we work</p>
          <h2 id="ways-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
            Four things <span className="relative inline-block">
              you can check
              <Stroke
                viewBox="0 0 300 24"
                d="M4 15 C 60 5, 120 3, 182 9 S 268 21, 296 7"
                className="absolute -bottom-[0.14em] left-0 h-[0.22em] w-full text-volt"
              />
            </span>
            .
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
            {WAYS.map((w, i) => (
              <li key={w.title} className="rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-volt/40 md:p-9">
                <p className="display text-sm text-volt">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-2xl font-semibold">{w.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{w.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="name-title" className="border-t border-line bg-void py-[12vh]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-2 md:gap-16 md:px-8 [&>*]:min-w-0">
          <div>
            <p className="kicker text-volt">The name</p>
            <h2 id="name-title" className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
              SiteBlitz, <span className="serif text-volt">one word.</span>
            </h2>
            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg">
              People also write it Site Blitz; it is the same studio. The WhatsApp number on this site, {SITE.phone}, is the
              one to use.
            </p>
          </div>
          <div>
            <p className="kicker text-volt">Open data</p>
            <h2 className="display mt-4 text-[clamp(32px,8vw,44px)] md:text-[clamp(44px,3.8vw,68px)]">
              We publish <span className="serif text-volt">what we learn.</span>
            </h2>
            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted md:text-lg">
              Our first study counts how often {STUDY.total.n.toLocaleString("en-IN")} listing records of local businesses in
              Gujarat link to a website, by city and trade.{" "}
              <Link href={STUDY.path} className="text-ink underline underline-offset-4 hover:text-volt">
                Read the Gujarat study
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Close />
    </Shell>
  );
}

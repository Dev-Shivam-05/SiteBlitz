import { Shell } from "@/components/site/Shell";
import { BookingForm } from "@/components/site/BookingForm";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { SITE } from "@/lib/site";
import { PAGES } from "@/lib/pages";
import { breadcrumbNode, graph, pageMeta, webPageNode, type Crumb } from "@/lib/seo";

const PATH = PAGES.book.path;
const TITLE = "Book a Free Brief Call";
const DESCRIPTION =
  "Request a short call about your website on WhatsApp or phone. We tell you what we would build and what it costs, with no obligation to buy.";
const CRUMBS: Crumb[] = [{ name: "Book a call", path: PATH }];

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const ld = graph(webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, crumbs: CRUMBS, dateModified: PAGES.book.updated }), breadcrumbNode(CRUMBS));

/** /book (SEO-6 follow-up): truthful copy (no "H0 of the 48-hour process", no slot promises) and the request form in
 *  the first screen without any JavaScript fade. */
export default function BookPage() {
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        crumbs={CRUMBS}
        kicker="Book a call"
        lines={["Book a free", <span key="b" className="serif text-volt">brief call.</span>]}
        lead={
          <p>
            Tell us about your business on a short call. We say what we would build and what it costs, and you decide in
            your own time. No obligation to buy.
          </p>
        }
      />
      <section aria-label="Request a call" className="border-t border-line bg-void py-[10vh]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 md:px-8 lg:grid-cols-[4fr_7fr] lg:gap-16 [&>*]:min-w-0">
          <div>
            <ul className="space-y-3 text-base text-muted">
              {["The matching demo, the price and the next step", "On WhatsApp or by phone, your choice", `Replies ${SITE.replyHours}`].map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base text-muted">
              Prefer no form? Message{" "}
              <a
                href={SITE.whatsapp("Hi SiteBlitz! I'd like to book a brief call.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-4 hover:text-volt"
                data-track="book_wa_direct"
              >
                {SITE.phone} on WhatsApp
              </a>
              .
            </p>
          </div>
          <div>
            <BookingForm />
          </div>
        </div>
      </section>
    </Shell>
  );
}

import { Suspense } from "react";
import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { PageHero } from "@/components/site/PageHero";
import { JsonLd } from "@/components/site/JsonLd";
import { LeadForm } from "@/components/site/LeadForm";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { SITE } from "@/lib/site";
import { PAGES } from "@/lib/pages";
import { ORG_ID, breadcrumbNode, graph, pageMeta, webPageNode, type Crumb } from "@/lib/seo";

const PATH = PAGES.contact.path;
const TITLE = "Contact the Website Studio";
const DESCRIPTION = `Tell SiteBlitz about your business on WhatsApp (${SITE.phone}) or the short form. Replies ${SITE.replyHours} with a demo, the price and next steps.`;
const CRUMBS: Crumb[] = [{ name: "Contact", path: PATH }];

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const ld = graph(
  webPageNode({ path: PATH, name: TITLE, description: DESCRIPTION, type: "ContactPage", crumbs: CRUMBS, dateModified: PAGES.contact.updated, about: { "@id": ORG_ID } }),
  breadcrumbNode(CRUMBS)
);

/** /contact (SEO-3): WhatsApp first (the studio's main channel), a call link, and the existing lead form. No
 *  decorative motion here beyond the shared hero entrance: nothing may get between a visitor and the form. */
export default function ContactPage() {
  return (
    <Shell>
      <JsonLd data={ld} />
      <PageHero
        crumbs={CRUMBS}
        kicker="Start a project"
        lines={["Tell us what", <span key="w" className="serif text-volt">your website needs.</span>]}
        lead={
          <p>
            A WhatsApp message is the quickest way. Say what your business does and what customers should be able to do on
            the site; we reply {SITE.replyHours} with the matching demo, the price and the next step. No obligation.
          </p>
        }
        actions={
          <a
            href={SITE.whatsapp("Hi SiteBlitz, I want to discuss a website for my business. My business is: ")}
            target="_blank"
            rel="noopener noreferrer"
            data-track="contact_hero_whatsapp"
            className="btn-volt inline-flex h-[52px] items-center gap-2 rounded-full px-7 text-base font-semibold"
          >
            <WhatsAppIcon className="h-5 w-5" color="currentColor" /> Chat on WhatsApp
          </a>
        }
      />

      <section aria-labelledby="form-title" className="border-t border-line bg-void py-[10vh]">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 md:px-8 lg:grid-cols-[4fr_7fr] lg:gap-16 [&>*]:min-w-0">
          <div>
            <h2 id="form-title" className="display text-[clamp(32px,8vw,44px)] md:text-[clamp(40px,3.4vw,60px)]">
              Or send <span className="serif text-volt">the short form.</span>
            </h2>
            <ul className="mt-10 space-y-3">
              <li>
                <a
                  href={SITE.whatsapp("Hi SiteBlitz! I want to discuss a website project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="contact_whatsapp"
                  className="group flex items-center justify-between rounded-2xl border border-line bg-surface p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-volt/40"
                >
                  <span>
                    <span className="block font-semibold">WhatsApp</span>
                    <span className="text-sm text-muted">{SITE.phone}</span>
                  </span>
                  <span aria-hidden className="text-volt transition-transform group-hover:translate-x-1">→</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${SITE.phoneRaw}`}
                  data-track="contact_call"
                  className="group flex items-center justify-between rounded-2xl border border-line bg-surface p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-volt/40"
                >
                  <span>
                    <span className="block font-semibold">Call</span>
                    <span className="text-sm text-muted">{SITE.replyHours}</span>
                  </span>
                  <span aria-hidden className="text-volt transition-transform group-hover:translate-x-1">→</span>
                </a>
              </li>
              {SITE.emailLive && (
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    data-track="contact_email"
                    className="group flex items-center justify-between rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-volt/40"
                  >
                    <span>
                      <span className="block font-semibold">Email</span>
                      <span className="text-sm text-muted">{SITE.email}</span>
                    </span>
                    <span aria-hidden className="text-volt">→</span>
                  </a>
                </li>
              )}
            </ul>
            <p className="mt-8 text-base text-muted">
              {SITE.locationLine}. Before you write, you may want to see{" "}
              <Link href={PAGES.pricing.path} className="text-ink underline underline-offset-4 hover:text-volt">
                the prices
              </Link>{" "}
              or{" "}
              <Link href={PAGES.faq.path} className="text-ink underline underline-offset-4 hover:text-volt">
                the common questions
              </Link>
              .
            </p>
          </div>
          <div>
            <Suspense fallback={<div className="h-96 rounded-2xl border border-line bg-surface" />}>
              <LeadForm />
            </Suspense>
          </div>
        </div>
      </section>
    </Shell>
  );
}

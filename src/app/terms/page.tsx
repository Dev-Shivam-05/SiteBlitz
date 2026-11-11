import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern SiteBlitz projects and use of this website: scope of work, payment, ownership, revisions, warranties and liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 2026">
      <p>
        These terms apply to services provided by SiteBlitz and to your use of {SITE.url}. By
        engaging us or using the site, you agree to them.
      </p>
      <h2>Scope of work</h2>
      <p>
        Each project is defined by a written brief (WhatsApp or email counts). Deliverables,
        timeline and price are confirmed before work begins. Delivery timelines (e.g. 48 hours)
        start when we have your confirmed brief and required content.
      </p>
      <h2>Payment</h2>
      <p>
        Projects are quoted as one-time fixed prices in INR or USD. Unless agreed otherwise, 50%
        is payable to begin and 50% on approval before launch. Care plans and ongoing work are
        billed as agreed in writing.
      </p>
      <h2>Ownership</h2>
      <p>
        On full payment, you own the delivered website, its code, content and your domain. We may
        showcase completed work in our portfolio unless you ask us not to.
      </p>
      <h2>Revisions</h2>
      <p>
        Each plan includes the stated revision rounds. Revisions cover refinements within the
        agreed scope; new pages or features are quoted separately.
      </p>
      <h2>Warranties & liability</h2>
      <p>
        We fix defects in our work free of charge within 30 days of launch. We cannot guarantee
        specific search rankings or revenue outcomes — no honest provider can. Our total liability
        is limited to the fees paid for the project.
      </p>
      <h2>Contact</h2>
      <p>Questions about these terms: WhatsApp {SITE.phone}</p>
    </LegalPage>
  );
}

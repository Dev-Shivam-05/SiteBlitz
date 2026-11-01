import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SiteBlitz collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <p>
        SiteBlitz (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what
        we collect on {SITE.url}, why, and the choices you have.
      </p>
      <h2>What we collect</h2>
      <p>
        <strong>Enquiry details you submit:</strong> name, phone, email, business information and
        any message you send through our forms or WhatsApp. We use these solely to respond to your
        enquiry and deliver services.
      </p>
      <p>
        <strong>Usage analytics:</strong> we run privacy-conscious, first-party analytics — pages
        viewed, approximate location (country/city derived from IP), device and browser type,
        referring site and time on page. IP addresses are truncated before storage and are never
        sold or shared. We do not use third-party advertising trackers.
      </p>
      <h2>Cookies</h2>
      <p>
        We set two first-party cookies to understand how the site is used: a session cookie that
        expires after 30 minutes of inactivity, and a visitor cookie that lasts up to one year so we
        can tell new visits from returning ones. Both hold random identifiers only — no name, email
        or phone number — but together with approximate location and device they describe a visit.
        If your browser sends a Global Privacy Control or Do Not Track signal, we set neither cookie
        and record no analytics for your visit.
      </p>
      <h2>How long we keep data</h2>
      <p>
        Enquiry records are kept while relevant to a business relationship. Analytics records (the
        pages of a visit, approximate location, device and the random identifiers above) are
        currently kept until they are deleted; published figures such as those on our Proof page are
        aggregates. You may request deletion of your data at any time.
      </p>
      <h2>Your rights</h2>
      <p>
        Message us on <strong>WhatsApp {SITE.phone}</strong> to access, correct or delete your personal data. We
        respond within 7 working days.
      </p>
      <h2>Third parties</h2>
      <p>
        The site is hosted on Vercel and data is stored with MongoDB Atlas. Both process data on
        our behalf under their respective privacy terms. We never sell personal data.
      </p>
    </LegalPage>
  );
}

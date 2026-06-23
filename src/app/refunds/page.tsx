import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "SiteBlitz refund policy — clear and fair.",
  alternates: { canonical: "/refunds" },
};

export default function RefundsPage() {
  return (
    <LegalPage title="Refund Policy" updated="July 2026">
      <h2>Before the build starts</h2>
      <p>
        If you cancel before we begin the build (i.e. before the visual direction is shared), any
        advance is refunded in full within 7 working days.
      </p>
      <h2>Direction approval</h2>
      <p>
        You approve the visual direction before we build. If we can&apos;t land a direction you
        like after the included revision rounds, you may cancel and receive a full refund of the
        advance. Simple.
      </p>
      <h2>After delivery</h2>
      <p>
        Once the site is delivered and approved, fees are non-refundable — but we fix any defects
        free within 30 days, and we don&apos;t disappear after launch.
      </p>
      <h2>How to request</h2>
      <p>
        Email {SITE.email} with your project details. Refunds are processed to the original
        payment method within 7 working days of approval.
      </p>
    </LegalPage>
  );
}

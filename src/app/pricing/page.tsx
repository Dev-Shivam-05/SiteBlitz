import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { PricingPlans } from "@/components/site/sections/PricingPlans";
import { FinalCTA } from "@/components/site/sections/Home";
import { EXCLUSIONS, PACKAGES, READY_TO_BUILD, businessPkg, inr, launchPkg } from "@/lib/offer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Prices & Terms — One Page ₹7,999, Three Pages ₹17,999",
  description:
    "SiteBlitz pricing and terms: one-page website ₹7,999, three-page website ₹17,999, custom by quote. What's included, what isn't, payment stages, renewals and ownership, all upfront.",
  alternates: { canonical: "/pricing" },
};

/* Copy: docs/debate/2026-11-01-ads-psychology-redesign/03_chatgpt.md (c). Every number comes from
   src/lib/offer.ts. Release condition: nothing here may promise what the package cannot deliver. */

const COMPARE = [
  ["Pages", "1", "3 agreed pages", "Quoted"],
  ["Mobile-first design", "Included", "Included", "As quoted"],
  ["Services and business information", "Included", "Included", "As quoted"],
  ["WhatsApp and call buttons", "Included", "Included", "As quoted"],
  ["Basic technical SEO", "Included", "Included", "As quoted"],
  ["Content formatting from your material", "Included", "Included", "As quoted"],
  ["Revision rounds", "1 consolidated round", "1 consolidated round", "As quoted"],
  ["Delivery target", launchPkg.delivery, businessPkg.delivery, "Written schedule"],
  ["Advanced appointment booking", "Not included", "Not included", "Quoted"],
  ["E-commerce or online payments", "Not included", "Not included", "Quoted"],
  ["Ongoing maintenance", "Optional, separate", "Optional, separate", "Quoted"],
] as const;

const COSTS = [
  ["SiteBlitz website build", "One-time", "Paid in two stages as agreed"],
  ["Domain registration", "Yearly renewal", "In your own account; the real provider price is written in your quote"],
  ["Website hosting", "Depends on the host", "Hosting choice and who pays are agreed before launch"],
  ["Business email", "Optional, recurring", "Only if your project needs it"],
  ["Third-party integrations", "Depends on provider", "Quoted before use"],
  ["Maintenance", "Optional", "Separate written scope and price"],
  ["Extra design or development", "As requested", "Quoted before work begins"],
] as const;

function Block({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-10 md:py-14">
      <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-28 md:px-8 md:pt-36">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-volt">Pricing & terms</p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
          Professional websites. Clear project prices.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          A focused one-page site, a three-page business website, or a custom project. Every paid project starts with
          an agreed scope, a delivery schedule and a written quotation. No GST is added to these prices.
        </p>
        <div className="mt-10">
          <PricingPlans />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Block id="terms" title="Compare what's included">
          <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">What each package includes</caption>
              <thead>
                <tr className="border-b border-line text-ink">
                  <th scope="col" className="p-4">Feature</th>
                  {PACKAGES.map((p) => (
                    <th key={p.id} scope="col" className="p-4">
                      {p.name} — {p.priceInr ? inr(p.priceInr) : "quote"}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([f, ...cells]) => (
                  <tr key={f} className="border-b border-line last:border-0">
                    <th scope="row" className="p-4 font-semibold text-ink">{f}</th>
                    {cells.map((c, i) => (
                      <td key={i} className="p-4">{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm">The final quotation defines the exact deliverables. Anything extra is agreed and priced before work begins.</p>
        </Block>

        <Block title="What is not included by default">
          <ul className="grid gap-2 sm:grid-cols-2">
            {EXCLUSIONS.map((e) => (
              <li key={e} className="flex gap-2.5">
                <span className="text-faint" aria-hidden>—</span>
                {e}
              </li>
            ))}
          </ul>
          <p className="font-semibold text-ink">No additional charge is ever added without your approval.</p>
        </Block>

        <Block title="Domain, hosting and renewal costs">
          <p>We recommend registering your domain in an account you control. Renewal prices depend on the provider, so we write the real figure in your quote instead of guessing one here.</p>
          <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">One-time and recurring costs</caption>
              <thead>
                <tr className="border-b border-line text-ink">
                  <th scope="col" className="p-4">Cost</th>
                  <th scope="col" className="p-4">One-time or recurring</th>
                  <th scope="col" className="p-4">How it's handled</th>
                </tr>
              </thead>
              <tbody>
                {COSTS.map(([a, b, c]) => (
                  <tr key={a} className="border-b border-line last:border-0">
                    <th scope="row" className="p-4 font-semibold text-ink">{a}</th>
                    <td className="p-4">{b}</td>
                    <td className="p-4">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        <Block title="How payment works">
          {PACKAGES.filter((p) => p.payments).map((p) => (
            <p key={p.id}>
              <strong className="text-ink">{p.name} — {inr(p.priceInr as number)}:</strong> {inr(p.payments![0])} after you
              approve the design direction, scope and agreement; {inr(p.payments![1])} after you approve the finished
              staging site, before it goes live or is handed over.
            </p>
          ))}
          <p><strong className="text-ink">Custom:</strong> payment milestones are written in the quotation.</p>
          <p>Every payment gets a receipt with the amount, date, project reference and balance. The name of the person or entity receiving payment is shown in your quotation before you are asked to pay.</p>
        </Block>

        <Block title="Review before you commit">
          <p>For suitable projects we prepare one personalised homepage concept using the business details and images you approve. It is <strong className="text-ink">free to review, with no obligation to buy</strong>.</p>
          <p>It is a visual preview, not a finished website, and doesn&apos;t include unlimited redesigns or design source files. If you don&apos;t want to go ahead, you simply decline before signing the paid agreement. Paid work starts only after you approve the scope, the terms and the first payment.</p>
        </Block>

        <Block title="What counts as a revision?">
          <p>One consolidated revision round means one organised list of reasonable changes inside the agreed design direction and scope: correcting text, swapping images, adjusting spacing or refining agreed sections.</p>
          <p>A completely different design, extra pages, major structural changes or new features are not included automatically. We explain any scope change before suggesting a charge.</p>
        </Block>

        <Block title="When does the delivery clock start?">
          <p>The delivery time counts from the day everything below is in place (we call it &ldquo;ready to build&rdquo;):</p>
          <ol className="list-decimal space-y-1 pl-5">
            {READY_TO_BUILD.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
          <p>Delays in sending content or approvals can move the schedule. We tell you before changing a delivery date.</p>
        </Block>

        <Block title="What if I cancel?">
          <p>Before a paid agreement there is nothing to cancel: the free concept carries no obligation. After a paid project starts, cancellation, completed work and refunds follow the written agreement and applicable law, and you can read those terms before paying.</p>
        </Block>

        <Block title="What happens at handover?">
          <p>Handover follows the agreed scope: the live website, access details, your content and configuration notes. You should own your domain registration. Any source-code transfer, hosting responsibilities and post-launch help are written in the agreement.</p>
        </Block>

        <Block title="Common questions">
          <p><strong className="text-ink">Will the website appear on Google?</strong> We set up the technical SEO included in your scope and submit the site to Google Search Console. Search engines decide whether and when to index and rank pages, so we don&apos;t guarantee either.</p>
          <p><strong className="text-ink">Will it bring guaranteed leads?</strong> No. We build a clear enquiry journey; traffic and sales depend on factors beyond the website.</p>
          <p><strong className="text-ink">Can I change the website later?</strong> Yes, depending on the agreed handover, access and any extra development needed.</p>
          <p><strong className="text-ink">Can I talk to the team first?</strong> Yes. WhatsApp {SITE.phone} is our main channel, replies {SITE.replyHours}.</p>
        </Block>
      </div>

      <FinalCTA />
    </Shell>
  );
}

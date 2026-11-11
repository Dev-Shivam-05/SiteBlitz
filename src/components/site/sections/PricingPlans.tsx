import Link from "next/link";
import { PACKAGES, inr } from "@/lib/offer";
import { SITE } from "@/lib/site";

/** Package cards, rendered from src/lib/offer.ts only. Used on the home page and /pricing. */
export function PricingPlans({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {PACKAGES.map((p) => (
        <article
          key={p.id}
          className={`relative flex flex-col rounded-3xl border p-7 md:p-8 ${
            p.recommended ? "card-recommended border-volt bg-surface" : "border-line bg-surface"
          }`}
        >
          {p.recommended && (
            <span className="absolute -top-3 left-7 rounded-full bg-volt px-3 py-1 text-xs font-bold uppercase tracking-wide text-void">
              Most complete
            </span>
          )}
          <H className="font-display text-xl font-bold">
            {p.name} <span className="text-sm font-semibold text-faint">· {p.pages}</span>
          </H>
          <p className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
          <p className="mt-6 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            {p.priceInr ? inr(p.priceInr) : "By quote"}
          </p>
          <p className="mt-1 text-xs text-faint">
            {p.priceInr ? "One-time build price · no GST added" : "Priced to the agreed scope"}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-volt">{p.delivery}</p>
          <ul className="mt-6 flex-1 space-y-2.5">
            {p.includes.map((f) => (
              <li key={f} className="flex gap-2.5 text-sm text-muted">
                <span className="mt-0.5 text-volt" aria-hidden>
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
          {p.payments && (
            <p className="mt-6 rounded-xl bg-raised px-4 py-3 text-xs leading-relaxed text-muted">
              Pay {inr(p.payments[0])} after you approve the design and scope, {inr(p.payments[1])} after you approve
              the finished site.
            </p>
          )}
          <a
            href={SITE.whatsapp(
              p.priceInr
                ? `Hi SiteBlitz, I'm interested in the ${p.name} website (${inr(p.priceInr)}). My business is: `
                : "Hi SiteBlitz, I need a custom website quote. My business is: "
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-track={`pricing_whatsapp_${p.id}`}
            className={`mt-6 rounded-full px-6 py-3.5 text-center text-sm font-semibold ${
              p.recommended ? "btn-volt" : "btn-ghost text-ink"
            }`}
          >
            {p.priceInr ? `Ask about ${p.name}` : "Request a custom quote"}
          </a>
        </article>
      ))}
      <p className="text-sm text-faint lg:col-span-3">
        Prices cover the website build. Domain, hosting, renewals and optional maintenance are written in your
        quotation before you pay.{" "}
        <Link href="/pricing#terms" className="font-semibold text-volt underline-offset-4 hover:underline">
          See full terms →
        </Link>
      </p>
    </div>
  );
}

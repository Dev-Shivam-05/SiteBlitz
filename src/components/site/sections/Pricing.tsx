"use client";

import { useState } from "react";
import Link from "next/link";
import { PLANS, type Currency } from "@/lib/site";

function price(p: (typeof PLANS)[number], c: Currency): string {
  return c === "INR" ? `₹${p.priceINR.toLocaleString("en-IN")}` : `$${p.priceUSD}`;
}

export function Pricing({ compact = false }: { compact?: boolean }) {
  const [currency, setCurrency] = useState<Currency>("INR");

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32" id="pricing">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.25em] text-volt">Pricing</p>
          <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-6xl">
            Agency quality<span className="text-volt">,</span>
            <br />
            without the <span className="font-accent italic">agency invoice</span>
          </h2>
        </div>

        <div className="reveal flex items-center gap-1 self-start rounded-full border border-line p-1 md:self-auto">
          {(["INR", "USD"] as const).map((c) => (
            <button
              key={c}
              onClick={() => {
                setCurrency(c);
                window.sbTrack?.("pricing_currency_toggle", { currency: c });
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                currency === c ? "bg-volt text-void" : "text-muted hover:text-ink"
              }`}
              aria-pressed={currency === c}
            >
              {c === "INR" ? "₹ India" : "$ Global"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {PLANS.map((p, i) => (
          <article
            key={p.id}
            className={`reveal card-hover relative flex flex-col rounded-2xl border p-8 ${
              p.highlight
                ? "border-volt/40 bg-gradient-to-b from-volt/[0.07] to-surface"
                : "border-line bg-surface"
            }`}
            data-delay={String(i * 100)}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-8 rounded-full bg-volt px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-void">
                Recommended
              </span>
            )}
            <h3 className="font-display text-xl font-bold">{p.name}</h3>
            <p className="mt-2 min-h-[3.5rem] text-sm leading-relaxed text-muted">{p.blurb}</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold tracking-tight">
                {price(p, currency)}
              </span>
              <span className="text-xs text-faint">one-time</span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-widest text-volt">{p.delivery}</p>

            <ul className="mt-7 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-muted">
                  <span className="mt-0.5 text-volt">✦</span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={`/contact?plan=${p.id}`}
              data-track={`pricing_select_${p.id}`}
              className={`mt-8 rounded-full px-6 py-3.5 text-center text-sm font-semibold ${
                p.highlight ? "btn-volt" : "btn-ghost text-ink"
              }`}
            >
              Choose {p.name} →
            </Link>
          </article>
        ))}
      </div>

      {!compact && (
        <p className="reveal mt-8 text-center text-sm text-faint">
          Every plan includes hosting setup, SSL, Google indexing and the visitor analytics
          dashboard. You own everything — code, content and domain.
        </p>
      )}
    </section>
  );
}

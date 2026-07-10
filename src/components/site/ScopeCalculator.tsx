"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const FEATURES = [
  { id: "booking", label: "Online booking / appointments", inr: 6000, usd: 75 },
  { id: "ecom", label: "E-commerce (products + payments)", inr: 12000, usd: 150 },
  { id: "blog", label: "Blog / updates section", inr: 3000, usd: 39 },
  { id: "multilang", label: "Second language", inr: 5000, usd: 65 },
  { id: "copy", label: "Full copywriting from scratch", inr: 4000, usd: 49 },
  { id: "crm", label: "WhatsApp / CRM automation hooks", inr: 5000, usd: 65 },
];

/** Honest scope estimator: maps pages + features to a price RANGE anchored to
 *  the real plans. Explicitly labelled an estimate — the quote comes from a
 *  human after the brief. */
export function ScopeCalculator() {
  const [pages, setPages] = useState(1);
  const [picked, setPicked] = useState<string[]>([]);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const est = useMemo(() => {
    const hasEcom = picked.includes("ecom");
    // e-commerce implies the Scale plan, where the store is already included —
    // never charge the base upgrade AND the add-on for the same thing
    const base = hasEcom || pages > 5
      ? { inr: 24999, usd: 329, plan: "Scale" as const }
      : pages > 1
        ? { inr: 14999, usd: 189, plan: "Growth" as const }
        : { inr: 7999, usd: 99, plan: "Launch" as const };
    const extras = FEATURES.filter((f) => picked.includes(f.id) && !(f.id === "ecom" && base.plan === "Scale"));
    const inr = base.inr + extras.reduce((s, f) => s + f.inr, 0);
    const usd = base.usd + extras.reduce((s, f) => s + f.usd, 0);
    const plan = base.plan === "Launch" && extras.length > 0 ? "Growth" : base.plan;
    // match the plan cards exactly: 48-hour / 4-day / 7-day delivery
    const days = plan === "Launch" ? "48 hours" : plan === "Growth" ? "4 days" : "7 days";
    return { inr, usd, plan, days };
  }, [pages, picked]);

  const fmt = (v: number) =>
    currency === "INR" ? `₹${v.toLocaleString("en-IN")}` : `$${v.toLocaleString("en-US")}`;
  const low = currency === "INR" ? est.inr : est.usd;
  const high = Math.round(low * 1.25);

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <div className="rounded-3xl border border-line bg-surface p-6 md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-volt">Scope estimator</p>
            <h2 className="font-display mt-2 text-2xl font-bold md:text-4xl">
              Price it yourself<span className="text-volt">,</span> right now
            </h2>
          </div>
          <div className="flex rounded-full border border-line p-1">
            {(["INR", "USD"] as const).map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCurrency(c);
                  window.sbTrack?.("calc_currency", { c });
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-bold ${currency === c ? "bg-volt text-void" : "text-muted"}`}
              >
                {c === "INR" ? "₹ INR" : "$ USD"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-ink">How many pages?</p>
            <div className="mt-3 flex items-center gap-4">
              <input
                type="range"
                min={1}
                max={12}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full accent-[#CCFF00]"
                aria-label="Number of pages"
              />
              <span className="font-display w-24 shrink-0 text-right text-2xl font-bold tabular-nums">
                {pages} <span className="text-sm font-normal text-faint">page{pages > 1 ? "s" : ""}</span>
              </span>
            </div>

            <p className="mt-8 text-sm font-semibold text-ink">Anything special?</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {FEATURES.map((f) => {
                const on = picked.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() =>
                      setPicked((p) => (on ? p.filter((x) => x !== f.id) : [...p, f.id]))
                    }
                    className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                      on ? "border-volt bg-volt/10 text-ink" : "border-line text-muted hover:border-volt/40"
                    }`}
                  >
                    {f.label}
                    <span className={`font-display text-xs font-bold tabular-nums ${on ? "text-volt" : "text-faint"}`}>
                      +{currency === "INR" ? `₹${f.inr.toLocaleString("en-IN")}` : `$${f.usd}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-volt/30 bg-void p-7">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-faint">Estimated range</p>
              <p className="font-display mt-3 text-4xl font-bold tabular-nums md:text-5xl">
                {fmt(low)}<span className="text-muted"> – {fmt(high)}</span>
              </p>
              <p className="mt-3 text-sm text-muted">
                Closest plan: <b className="text-volt">{est.plan}</b> · typical delivery{" "}
                <b className="text-ink">{est.days}</b>
              </p>
              <p className="mt-4 text-xs leading-relaxed text-faint">
                This is an honest estimate, not a trap — the exact quote comes from a human after a
                30-minute brief, and it stays inside this range unless you change the scope.
              </p>
            </div>
            <Link
              href="/book"
              data-track="calc_to_book"
              className="btn-volt mt-6 block rounded-full px-6 py-3.5 text-center text-sm font-semibold"
            >
              Get the exact quote → free brief call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

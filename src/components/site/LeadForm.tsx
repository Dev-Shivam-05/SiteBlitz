"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SITE } from "@/lib/site";

const BUSINESS_TYPES = [
  "Restaurant / Café",
  "Clinic / Healthcare",
  "Shop / E-commerce",
  "Professional services",
  "Real estate",
  "Startup / SaaS",
  "Other",
];

const GOALS = [
  "Get more enquiries",
  "Look professional",
  "Rank on Google",
  "Sell online",
  "Replace an old site",
];

const BUDGETS = ["Under ₹10k / $120", "₹10–20k / $120–250", "₹20–50k / $250–600", "Flexible for the right result"];

type Step = 0 | 1 | 2;

export function LeadForm() {
  const params = useSearchParams();
  const [step, setStep] = useState<Step>(0);
  const [state, setState] = useState<"idle" | "sending" | "done" | "fallback" | "error">("idle");
  const [ref, setRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    businessType: "",
    goal: "",
    budget: "",
    name: "",
    phone: "",
    email: "",
    message: "",
    website: "", // honeypot
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const next = (s: Step) => {
    setStep(s);
    window.sbTrack?.("lead_form_step", { step: s });
    if (s === 1) window.sbTrack?.("form_start", {});
  };

  const submit = async () => {
    if (!form.name.trim() || (!form.phone.trim() && !form.email.trim())) {
      setErrorMsg("Please add your name and at least one way to reach you.");
      return;
    }
    setState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          businessType: form.businessType,
          budget: form.budget,
          goal: form.goal,
          message: form.message.trim(),
          plan: params.get("plan") || undefined,
          path: window.location.pathname + window.location.search,
          website: form.website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setRef(typeof data.ref === "string" ? data.ref : null);
        setState("done");
        window.sbTrack?.("lead_submitted", { businessType: form.businessType });
      } else if (data.fallback === "whatsapp") {
        // Not saved. Say so, and hand the visitor a WhatsApp button with their answers pre-filled:
        // window.open() after an await is popup-blocked on many phones, which used to show "done"
        // while nothing was sent anywhere.
        window.sbTrack?.("lead_whatsapp_fallback", {});
        setState("fallback");
      } else {
        setState("error");
        setErrorMsg(data.error || "Something went wrong. Try WhatsApp instead?");
      }
    } catch {
      setState("error");
      setErrorMsg("Network hiccup. Try again or ping us on WhatsApp.");
    }
  };

  if (state === "fallback") {
    const text = `Hi SiteBlitz! I'm ${form.name}. Business: ${form.businessType || "-"}. Goal: ${form.goal || "-"}. Budget: ${form.budget || "-"}. ${form.message}`;
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center" role="alert">
        <h3 className="font-display text-2xl font-bold">We couldn&apos;t save your request just now.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Nothing was sent yet. Tap below to send the same details to us on WhatsApp, or try the form again.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={SITE.whatsapp(text)}
            target="_blank"
            rel="noopener noreferrer"
            data-track="lead_fallback_whatsapp"
            className="btn-volt inline-block rounded-full px-6 py-3 text-sm font-semibold"
          >
            Send my details on WhatsApp
          </a>
          <button type="button" onClick={() => setState("idle")} className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold text-ink">
            Try the form again
          </button>
        </div>
      </div>
    );
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-volt/30 bg-volt/5 p-10 text-center" role="status">
        <h3 className="font-display text-2xl font-bold">Request received and saved.</h3>
        {ref && (
          <p className="mt-2 text-sm text-muted">
            Your reference: <span className="font-semibold text-ink">{ref}</span>
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We reply on WhatsApp or by phone during {SITE.replyHours}. Want to start the conversation now?
        </p>
        <a
          href={SITE.whatsapp(`Hi SiteBlitz! I just submitted the form — I'm ${form.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          data-track="lead_done_whatsapp"
          className="btn-volt mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold"
        >
          Continue on WhatsApp →
        </a>
      </div>
    );
  }

  const Chip = ({
    selected,
    label,
    onClick,
  }: {
    selected: boolean;
    label: string;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-5 py-3 text-sm transition-all ${
        selected
          ? "border-volt bg-volt font-semibold text-void"
          : "border-line text-muted hover:border-ink/30 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 md:p-10">
      {/* progress */}
      <div className="mb-8 flex items-center gap-2">
        {[0, 1, 2].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              s <= step ? "bg-volt" : "bg-line"
            }`}
          />
        ))}
      </div>

      {step === 0 && (
        <div>
          <h3 className="font-display text-2xl font-bold">What&apos;s your business?</h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {BUSINESS_TYPES.map((b) => (
              <Chip
                key={b}
                label={b}
                selected={form.businessType === b}
                onClick={() => {
                  set("businessType", b);
                  setTimeout(() => next(1), 250);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 className="font-display text-2xl font-bold">What matters most right now?</h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {GOALS.map((g) => (
              <Chip
                key={g}
                label={g}
                selected={form.goal === g}
                onClick={() => set("goal", g)}
              />
            ))}
          </div>
          <h3 className="font-display mt-8 text-2xl font-bold">Rough budget?</h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {BUDGETS.map((b) => (
              <Chip key={b} label={b} selected={form.budget === b} onClick={() => set("budget", b)} />
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button type="button" onClick={() => next(0)} className="text-sm text-faint hover:text-ink">
              ← Back
            </button>
            <button
              type="button"
              onClick={() => next(2)}
              className="btn-volt rounded-full px-6 py-3 text-sm font-semibold"
            >
              Almost done →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-display text-2xl font-bold">Where do we reach you?</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              className="rounded-xl border border-line bg-void px-5 py-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-volt"
              placeholder="Your name *"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              autoComplete="name"
            />
            <input
              className="rounded-xl border border-line bg-void px-5 py-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-volt"
              placeholder="Phone / WhatsApp"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              autoComplete="tel"
              inputMode="tel"
            />
            <input
              className="rounded-xl border border-line bg-void px-5 py-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-volt md:col-span-2"
              placeholder="Email (optional)"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              autoComplete="email"
            />
            <textarea
              className="min-h-28 rounded-xl border border-line bg-void px-5 py-4 text-sm outline-none transition-colors placeholder:text-faint focus:border-volt md:col-span-2"
              placeholder="Anything else we should know? (optional)"
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
            />
            {/* honeypot */}
            <input
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => set("website", e.target.value)}
              name="website"
              aria-hidden
            />
          </div>
          {errorMsg && <p className="mt-4 text-sm text-red-400">{errorMsg}</p>}
          <div className="mt-8 flex items-center justify-between">
            <button type="button" onClick={() => next(1)} className="text-sm text-faint hover:text-ink">
              ← Back
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={state === "sending"}
              data-track="lead_form_submit"
              className="btn-volt rounded-full px-8 py-3.5 text-sm font-semibold disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : "Send my request"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

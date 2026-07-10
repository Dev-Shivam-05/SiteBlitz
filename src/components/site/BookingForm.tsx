"use client";

import { useMemo, useState } from "react";
import { SITE } from "@/lib/site";

const SLOTS = ["11:00", "14:00", "17:00", "19:30"];

function nextDays(n: number): { key: string; label: string; sub: string }[] {
  const days = [];
  const fmtDay = new Intl.DateTimeFormat("en-IN", { weekday: "short", timeZone: "Asia/Kolkata" });
  const fmtDate = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
  // key must be the IST calendar date — toISOString() is UTC and lags IST by
  // one day between 00:00 and 05:30 IST, booking the wrong day
  const fmtKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  for (let i = 1; i <= n; i++) {
    const d = new Date(Date.now() + i * 86400000);
    days.push({ key: fmtKey.format(d), label: fmtDay.format(d), sub: fmtDate.format(d) });
  }
  return days;
}

export function BookingForm() {
  const days = useMemo(() => nextDays(7), []);
  const [day, setDay] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const canSubmit = day && slot && name.trim().length >= 2 && phone.trim().length >= 8;

  const submit = async () => {
    if (!canSubmit || state === "sending") return;
    setState("sending");
    window.sbTrack?.("booking_submit", { day, slot });
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        phone: phone.trim(),
        businessType: topic || "Brief call",
        goal: "Booked brief call",
        plan: "booking",
        message: `Requested brief call: ${day} at ${slot} IST${topic ? ` — about: ${topic}` : ""}`,
      }),
    }).catch(() => null);
    if (res?.ok) setState("done");
    else setState("error");
  };

  const chosenDay = days.find((d) => d.key === day);
  const dayLabel = chosenDay ? `${chosenDay.label}, ${chosenDay.sub}` : day;

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-volt/40 bg-surface p-10 text-center">
        <p className="font-display text-3xl font-bold">
          Locked in<span className="text-volt">.</span>
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          <b className="text-ink">{dayLabel}</b> at <b className="text-ink">{slot} IST</b>. We&rsquo;ll
          confirm on WhatsApp within a few hours. If the slot clashes on our side, we&rsquo;ll
          propose the nearest one — you never have to chase us.
        </p>
        <a
          href={SITE.whatsapp(`Hi SiteBlitz! I just booked a brief call for ${day} at ${slot} IST (${name}).`)}
          target="_blank"
          rel="noopener noreferrer"
          data-track="booking_wa_confirm"
          className="btn-volt mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold"
        >
          Say hi on WhatsApp now →
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.25em] text-faint">1 · Pick a day (IST)</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {days.map((d) => (
          <button
            key={d.key}
            onClick={() => setDay(d.key)}
            className={`rounded-xl border px-4 py-2.5 text-sm transition-colors ${
              day === d.key ? "border-volt bg-volt/10 text-volt" : "border-line text-muted hover:border-volt/40 hover:text-ink"
            }`}
          >
            <span className="font-display font-bold">{d.label}</span>
            <span className="ml-2 text-xs opacity-80">{d.sub}</span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.25em] text-faint">2 · Pick a time</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SLOTS.map((s) => (
          <button
            key={s}
            onClick={() => setSlot(s)}
            className={`rounded-xl border px-5 py-2.5 font-display text-sm font-bold tabular-nums transition-colors ${
              slot === s ? "border-volt bg-volt/10 text-volt" : "border-line text-muted hover:border-volt/40 hover:text-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.25em] text-faint">3 · Who are we meeting?</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Your name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-line bg-void px-4 py-3 text-sm text-ink outline-none placeholder:text-faint focus:border-volt"
        />
        <input
          type="tel"
          placeholder="WhatsApp number *"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-xl border border-line bg-void px-4 py-3 text-sm text-ink outline-none placeholder:text-faint focus:border-volt"
        />
        <input
          type="text"
          placeholder="What's it about? (optional)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-xl border border-line bg-void px-4 py-3 text-sm text-ink outline-none placeholder:text-faint focus:border-volt sm:col-span-2"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          onClick={submit}
          disabled={!canSubmit || state === "sending"}
          data-track="booking_confirm"
          className="btn-volt rounded-full px-7 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          {state === "sending" ? "Booking…" : "Lock the slot →"}
        </button>
        <p className="text-xs text-faint">
          30 minutes · free · no deck, no pressure
          {state === "error" && (
            <b className="ml-2 text-red-300">Something failed — WhatsApp us instead.</b>
          )}
        </p>
      </div>
    </div>
  );
}

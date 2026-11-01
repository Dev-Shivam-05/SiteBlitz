"use client";

import { useState } from "react";
import type { Demo } from "@/lib/demos";

/** A simulated enquiry (FD-45): it collects no personal details and sends nothing anywhere. The end
 *  state says so explicitly, so nobody mistakes the demo for a booking. */
export function DemoEnquiry({ demo }: { demo: Demo }) {
  const [choice, setChoice] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const e = demo.enquiry;

  const reset = () => {
    setChoice(null);
    setTime(null);
    setDone(false);
  };

  if (done) {
    return (
      <div className="demo-card rounded-3xl p-6 md:p-8" role="status" aria-live="polite">
        <p className="demo-kicker text-xs font-semibold uppercase tracking-[0.2em]">Demo completed</p>
        <h3 className="demo-heading mt-3 text-2xl md:text-3xl">{e.previewHeading} preview</h3>
        <dl className="mt-5 grid gap-3 text-sm">
          <div className="demo-soft flex justify-between gap-4 rounded-xl px-4 py-3">
            <dt className="opacity-70">{e.step1Label}</dt>
            <dd className="text-right font-semibold">{choice}</dd>
          </div>
          <div className="demo-soft flex justify-between gap-4 rounded-xl px-4 py-3">
            <dt className="opacity-70">{e.step2Label}</dt>
            <dd className="text-right font-semibold">{time}</dd>
          </div>
        </dl>
        <p className="mt-5 text-sm leading-relaxed">
          On a real website, the business would get this request instantly on WhatsApp or by alert.{" "}
          <strong>In this demo nothing was submitted, nothing was booked and no contact details were collected.</strong>
        </p>
        <button type="button" onClick={reset} className="demo-btn-outline mt-6 rounded-full px-5 py-2.5 text-sm font-semibold">
          Try another example
        </button>
      </div>
    );
  }

  return (
    <div className="demo-card rounded-3xl p-6 md:p-8">
      <fieldset>
        <legend className="text-sm font-semibold">1 · {e.step1Label}</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {e.step1Options.map((o) => (
            <button
              key={o}
              type="button"
              aria-pressed={choice === o}
              onClick={() => setChoice(o)}
              className={`demo-option rounded-xl px-4 py-3 text-left text-sm font-medium ${choice === o ? "is-selected" : ""}`}
            >
              {o}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-6" disabled={!choice}>
        <legend className={`text-sm font-semibold ${choice ? "" : "opacity-50"}`}>2 · {e.step2Label}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {e.step2Options.map((o) => (
            <button
              key={o}
              type="button"
              aria-pressed={time === o}
              onClick={() => setTime(o)}
              className={`demo-option rounded-full px-4 py-2.5 text-sm font-medium disabled:opacity-40 ${time === o ? "is-selected" : ""}`}
            >
              {o}
            </button>
          ))}
        </div>
      </fieldset>
      <button
        type="button"
        disabled={!choice || !time}
        onClick={() => {
          setDone(true);
          window.sbTrack?.("demo_enquiry_preview", { demo: demo.id });
        }}
        className="demo-btn mt-7 w-full rounded-full px-6 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
      >
        3 · Preview the request
      </button>
      <p className="mt-3 text-center text-xs opacity-70">Demo only: nothing is sent and no details are asked for.</p>
    </div>
  );
}

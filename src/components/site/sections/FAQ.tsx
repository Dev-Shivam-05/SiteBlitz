"use client";

import { useState } from "react";
import { FAQS } from "@/lib/site";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-5 py-16 md:px-8 md:py-24">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-volt">Questions people ask</p>
        <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
          Straight answers before you decide.
        </h2>
      </div>

      <div className="mt-12 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                isOpen ? "border-volt/30 bg-surface" : "border-line bg-surface/50"
              }`}
              data-delay={String(i * 60)}
            >
              <button
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
                onClick={() => {
                  setOpen(isOpen ? null : i);
                  if (!isOpen) window.sbTrack?.("faq_open", { q: f.q });
                }}
                aria-expanded={isOpen}
              >
                <span className="font-display text-base font-bold md:text-lg">{f.q}</span>
                <span
                  className={`shrink-0 text-volt transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

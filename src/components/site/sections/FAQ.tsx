"use client";

import { useState } from "react";
import { FAQS } from "@/lib/site";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl px-5 py-20 md:px-8 md:py-32">
      <div className="reveal text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-volt">Questions</p>
        <h2 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
          You&apos;re probably <span className="font-accent italic">wondering</span>…
        </h2>
      </div>

      <div className="mt-12 space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`reveal overflow-hidden rounded-2xl border transition-colors ${
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

import { FAQS } from "@/lib/site";

/** 09 — FAQs as native <details> (spec: no scroll theatrics, keyboard and reduced motion for free).
 *  Opening a question is tracked through the delegated [data-track] click handler in Tracker.tsx. */
export function FAQ() {
  return (
    <section id="faq" data-wa="faq" aria-labelledby="faq-title" className="scroll-mt-20 bg-void py-[14vh]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:grid-cols-[5fr_7fr] md:gap-16 md:px-8">
        <div className="md:sticky md:top-[104px] md:self-start">
          <p className="kicker text-volt">Questions people ask</p>
          <h2 id="faq-title" className="display mt-4 text-[clamp(44px,11vw,64px)] md:text-[clamp(64px,6vw,96px)]">
            Straight answers before you decide.
          </h2>
        </div>
        <div className="border-t border-ink/20">
          {FAQS.map((f) => (
            <details key={f.q} className="faq-item group border-b border-ink/20">
              <summary
                data-track="faq_open"
                className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold md:text-xl"
              >
                {f.q}
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/25 text-xl text-volt transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-base leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

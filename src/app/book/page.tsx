import type { Metadata } from "next";
import { Shell } from "@/components/site/Shell";
import { BookingForm } from "@/components/site/BookingForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free 30-Minute Brief Call | SiteBlitz",
  description:
    "Pick a slot, tell us about your business, and leave with a clear direction for your website — whether or not you hire us. Free, on WhatsApp or call.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pt-44">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-volt" data-anim="fade-up" data-now>
              Book a call
            </p>
            <h1 className="font-display mt-3 text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl" data-anim="chars" data-now>
              30 minutes<span className="text-volt">.</span> Zero <span className="font-accent italic text-volt">pressure</span><span className="text-volt">.</span>
            </h1>
            <p className="mt-6 max-w-md text-muted" data-anim="fade-up" data-now data-delay="0.3">
              This is the H0 of the 48-hour process — the brief. You talk about your business, we
              tell you exactly what we&rsquo;d build and what it costs. If we&rsquo;re not the right
              fit, you still leave with a plan you can take anywhere.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted" data-anim="fade-up" data-now data-delay="0.4">
              <li className="flex gap-3"><span className="text-volt">✦</span> Direction + honest quote on the call — no &ldquo;we&rsquo;ll send a proposal&rdquo; limbo</li>
              <li className="flex gap-3"><span className="text-volt">✦</span> WhatsApp, phone or video — your pick</li>
              <li className="flex gap-3"><span className="text-volt">✦</span> India-friendly evening slots, IST</li>
            </ul>
            <p className="mt-8 text-xs text-faint" data-anim="fade-up" data-now data-delay="0.5">
              Prefer zero forms? Just message{" "}
              <a
                href={SITE.whatsapp("Hi SiteBlitz! I'd like to book a brief call.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-volt underline-offset-4 hover:underline"
                data-track="book_wa_direct"
              >
                {SITE.phone} on WhatsApp
              </a>
              .
            </p>
          </div>
          <div data-anim="fade-up" data-now data-delay="0.35">
            <BookingForm />
          </div>
        </div>
      </section>
    </Shell>
  );
}

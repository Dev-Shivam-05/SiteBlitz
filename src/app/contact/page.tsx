import type { Metadata } from "next";
import { Suspense } from "react";
import { Shell } from "@/components/site/Shell";
import { LeadForm } from "@/components/site/LeadForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a Project — Contact",
  description:
    "Tell SiteBlitz about your business in 60 seconds. We reply on WhatsApp 9 AM - 9 PM IST with a demo, the price and next steps.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pt-44">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-volt">Start a project</p>
            <h1 className="font-display mt-3 text-5xl font-bold tracking-tight md:text-7xl">
              60 seconds<span className="text-volt">.</span>
              <br />
              That&apos;s the <span className="font-accent italic">brief</span><span className="text-volt">.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              Answer three quick questions. We&apos;ll reply on WhatsApp or by phone during {SITE.replyHours}{" "}
              with a relevant demo, the price and next steps. No obligation.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={SITE.whatsapp("Hi SiteBlitz! I want to discuss a website project.")}
                target="_blank"
                rel="noopener noreferrer"
                data-track="contact_whatsapp"
                className="group flex items-center justify-between rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-volt/40"
              >
                <div>
                  <p className="font-display font-bold">Prefer WhatsApp?</p>
                  <p className="text-sm text-muted">{SITE.phone} · {SITE.replyHours}</p>
                </div>
                <span className="text-volt transition-transform group-hover:translate-x-1">→</span>
              </a>
              {SITE.emailLive && (
                <a
                  href={`mailto:${SITE.email}`}
                  data-track="contact_email"
                  className="group flex items-center justify-between rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-volt/40"
                >
                  <div>
                    <p className="font-display font-bold">Prefer email?</p>
                    <p className="text-sm text-muted">{SITE.email}</p>
                  </div>
                  <span className="text-volt transition-transform group-hover:translate-x-1">→</span>
                </a>
              )}
            </div>
          </div>

          <div >
            <Suspense fallback={<div className="h-96 rounded-2xl border border-line bg-surface" />}>
              <LeadForm />
            </Suspense>
          </div>
        </div>
      </section>
    </Shell>
  );
}

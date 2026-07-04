import Link from "next/link";
import { Magnetic } from "@/components/site/Magnetic";
import { SITE } from "@/lib/site";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_120%,rgba(204,255,0,0.12),transparent)]" />
      <div className="relative mx-auto max-w-5xl px-5 py-24 text-center md:px-8 md:py-36">
        <p className="font-accent text-xl italic text-muted md:text-2xl" data-anim="fade-up">
          Your competitors&apos; websites are asleep.
        </p>
        <h2 className="font-display mt-4 text-5xl font-bold tracking-tight md:text-7xl">
          <span data-anim="chars" data-stagger="0.02" className="block">
            Yours could be <span className="text-volt">selling</span>
          </span>
          <span data-anim="chars" data-stagger="0.02" data-delay="0.15" className="block">
            by this weekend<span className="text-volt">.</span>
          </span>
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4" data-anim="fade-up" data-delay="0.3">
          <Magnetic>
            <Link
              href="/contact"
              data-track="cta_bottom_start"
              className="btn-volt block rounded-full px-8 py-4 text-base font-semibold"
            >
              Start your project →
            </Link>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href={SITE.whatsapp("Hi SiteBlitz! I'm ready to start my website project.")}
              target="_blank"
              rel="noopener noreferrer"
              data-track="cta_bottom_whatsapp"
              className="btn-ghost block rounded-full px-8 py-4 text-base text-ink"
            >
              Chat on WhatsApp
            </a>
          </Magnetic>
        </div>
        <p className="mt-6 text-xs text-faint" data-anim="fade-up" data-delay="0.45">
          Free 30-minute brief · No advance until you approve the direction
        </p>
      </div>
    </section>
  );
}

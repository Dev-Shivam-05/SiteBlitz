"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/* The prefilled message follows the section in view; the visible label never changes (spec, persistent pill). */
const MESSAGES: Record<string, string> = {
  default: "Hi SiteBlitz, I'd like to discuss a website for my business.",
  demos: "Hi SiteBlitz, I saw your concept demos. I'd like a website like this for my business: ",
  pricing: "Hi SiteBlitz, I'd like to discuss the Launch or Business package. My business is: ",
  process: "Hi SiteBlitz, I'd like to know the next steps for a website. My business is: ",
  concept: "Hi SiteBlitz, I'd like to ask about a homepage concept for my business. My business is: ",
  faq: "Hi SiteBlitz, I have a question about getting a website: ",
};

/** Persistent WhatsApp pill: appears once the hero has scrolled away, hides over the closing section and the
 *  footer (they carry their own large WhatsApp buttons), and never covers content on a phone's safe area. */
export function WhatsAppPill() {
  const [visible, setVisible] = useState(false);
  const [topic, setTopic] = useState("default");

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const enders = Array.from(document.querySelectorAll("[data-close], footer"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-wa]"));
    // Pages without the home hero show the pill after the first screen.
    let heroGone = !hero;
    let enderOn = false;
    const update = () => setVisible(heroGone && !enderOn);

    const heroObs = hero
      ? new IntersectionObserver(([e]) => {
          heroGone = !e.isIntersecting;
          update();
        }, { threshold: 0.05 })
      : null;
    if (hero && heroObs) heroObs.observe(hero);

    const onScreen = new Set<Element>();
    const endObs = new IntersectionObserver((entries) => {
      for (const e of entries) (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target));
      enderOn = onScreen.size > 0;
      update();
    });
    enders.forEach((el) => endObs.observe(el));

    // A section counts as "in view" when it crosses the middle band of the screen.
    const topicObs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setTopic((e.target as HTMLElement).dataset.wa || "default");
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((el) => topicObs.observe(el));

    if (!hero) {
      const onScroll = () => {
        heroGone = window.scrollY > window.innerHeight * 0.6;
        update();
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        endObs.disconnect();
        topicObs.disconnect();
      };
    }
    return () => {
      heroObs?.disconnect();
      endObs.disconnect();
      topicObs.disconnect();
    };
  }, []);

  return (
    <a
      href={SITE.whatsapp(MESSAGES[topic] || MESSAGES.default)}
      target="_blank"
      rel="noopener noreferrer"
      data-track={`pill_whatsapp_${topic}`}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`wa-pill btn-volt fixed z-[70] flex h-14 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold shadow-lg ring-2 ring-void ${
        visible ? "is-visible" : ""
      }`}
    >
      <WhatsAppIcon className="h-5 w-5" color="currentColor" /> Chat on WhatsApp
    </a>
  );
}

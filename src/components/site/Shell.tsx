import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { RevealInit } from "@/components/site/Reveal";
import { ExperienceLayer } from "@/components/site/ExperienceLayer";
import { WhatsAppPill } from "@/components/site/WhatsAppPill";
import { Preloader } from "@/components/site/Preloader";

/** Public-site chrome. The animation stack mounts idle-deferred via
 *  ExperienceLayer so it never blocks first paint or interactivity.
 *  The skip link is the first stop for keyboard users (hidden until focused, globals.css "skip-link"). */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Preloader />
      <ExperienceLayer />
      <RevealInit />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <WhatsAppPill />
    </>
  );
}

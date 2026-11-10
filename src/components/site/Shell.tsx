import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { RevealInit } from "@/components/site/Reveal";
import { ExperienceLayer } from "@/components/site/ExperienceLayer";
import { WhatsAppPill } from "@/components/site/WhatsAppPill";
import { Preloader } from "@/components/site/Preloader";

/** Public-site chrome. The animation stack mounts idle-deferred via
 *  ExperienceLayer so it never blocks first paint or interactivity. */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <ExperienceLayer />
      <RevealInit />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppPill />
    </>
  );
}

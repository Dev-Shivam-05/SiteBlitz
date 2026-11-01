import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { RevealInit } from "@/components/site/Reveal";
import { ExperienceLayer } from "@/components/site/ExperienceLayer";

/** Public-site chrome. The animation stack mounts idle-deferred via
 *  ExperienceLayer so it never blocks first paint or interactivity. */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ExperienceLayer />
      <RevealInit />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

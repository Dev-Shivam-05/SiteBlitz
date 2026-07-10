import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { RevealInit } from "@/components/site/Reveal";
import { Preloader } from "@/components/site/Preloader";
import { ExperienceLayer } from "@/components/site/ExperienceLayer";

/** Public-site chrome. The animation stack mounts idle-deferred via
 *  ExperienceLayer so it never blocks first paint or interactivity. */
export function Shell({
  children,
  entrance = false,
}: {
  children: React.ReactNode;
  entrance?: boolean;
}) {
  return (
    <>
      {entrance && <Preloader />}
      <ExperienceLayer />
      <RevealInit />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

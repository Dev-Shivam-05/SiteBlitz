import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Cursor } from "@/components/site/Cursor";
import { RevealInit } from "@/components/site/Reveal";
import { Preloader } from "@/components/site/Preloader";
import { MotionProvider } from "@/components/site/Motion";

/** Public-site chrome: smooth scroll + anim engine, nav, footer, cursor, entrance. */
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
      <MotionProvider />
      <Cursor />
      <RevealInit />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Cursor } from "@/components/site/Cursor";
import { RevealInit } from "@/components/site/Reveal";
import { Preloader } from "@/components/site/Preloader";

/** Public-site chrome: nav, footer, cursor, reveal engine, entrance. */
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
      <Cursor />
      <RevealInit />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

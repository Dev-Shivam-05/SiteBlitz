import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif, Mona_Sans } from "next/font/google";
import { SITE } from "@/lib/site";
import { FROM_PRICE, inr } from "@/lib/offer";
import { Tracker } from "@/components/site/Tracker";
import { JsonLd } from "@/components/site/JsonLd";
import { graph, organizationNode, websiteNode } from "@/lib/seo";
import "./globals.css";

/* Redesign v4 (docs/spec/redesign-v4-showcase.md): Mona Sans, variable in weight and width, for display type (800,
   125% wide); Instrument Serif italic for accent words; DM Sans for text. Mona Sans takes latin-ext as well so the
   rupee sign (U+20B9) can come from it; the browser only fetches that subset when a page needs it (unicode-range). */
const mona = Mona_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-dm",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Business Websites from ${inr(FROM_PRICE)} — SiteBlitz, Gujarat`,
    template: "%s — SiteBlitz",
  },
  description:
    `Professional, mobile-friendly websites for local businesses. See working demos, know the price upfront (from ${inr(FROM_PRICE)}, no hidden charges) and review a homepage concept before you pay. Gujarat-based, serving all of India.`,
  authors: [{ name: "SiteBlitz" }],
  creator: "SiteBlitz",
  // No canonical here: a root canonical is inherited by every page that forgets its own and would declare that page
  // a duplicate of the home page. Each page sets its canonical through pageMeta().
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "SiteBlitz",
    locale: "en_IN",
    url: SITE.url,
    title: `Business Websites from ${inr(FROM_PRICE)} — SiteBlitz`,
    description:
      "See working website demos, know the price upfront and review a homepage concept for your business before you pay.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Business Websites from ${inr(FROM_PRICE)} — SiteBlitz`,
    description: "Working demos, upfront prices, and a homepage concept to review before you pay.",
  },
  verification: {
    google: "FpMq1620MPw97ShOx5JxKpvxsk0ON2uvsx7jUCBk_Ks",
  },
};

/** The brand entity and the website, stated once on every page (src/lib/seo.ts). */
const siteGraph = graph(organizationNode(), websiteNode());

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the Preloader's inline script marks <html data-seen> before React hydrates
    <html lang="en-IN" className={`${mona.variable} ${dmSans.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        {/* without JS, reveal-on-scroll elements must simply be visible */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}.hero-v4{height:auto !important}.hero-stage{position:relative !important;height:auto !important}.hero-screen{min-height:100svh !important}.hero-b{position:relative !important;padding:10vh 0 !important}.hero-a,.hero-b-copy,.hero-shot,.hero-bezel{opacity:1 !important;visibility:visible !important;transform:none !important}`}</style>
        </noscript>
        <JsonLd data={siteGraph} />
        {children}
        <Tracker />
      </body>
    </html>
  );
}

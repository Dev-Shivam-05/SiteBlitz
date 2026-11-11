import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import { SITE } from "@/lib/site";
import { FROM_PRICE, inr } from "@/lib/offer";
import { Tracker } from "@/components/site/Tracker";
import { JsonLd } from "@/components/site/JsonLd";
import { graph, organizationNode, websiteNode } from "@/lib/seo";
import "./globals.css";

/* Redesign v4 (docs/spec/redesign-v4-showcase.md): Mona Sans for display type (800, 125% wide), Instrument Serif
   italic for accent words, DM Sans for text.
   Mona Sans and DM Sans are self-hosted, one variable file each, built by scripts/fonts/build_fonts.py (performance
   audit 2026-11-11, fix Q2). Google's files carried every weight 200-900 and width 75-125 % plus a separate latin-ext
   file for the rupee sign: six files, 214 KB, five of them preloaded on every page. The site only uses Mona Sans at
   600-800 / 100-125 %, so the build narrows those axes and keeps the characters in use (rupee included): 64 + 35 KB,
   the only two preloads. Same faces, same rendering. */
const mona = localFont({
  src: "../fonts/mona-sans-600-800.woff2",
  weight: "600 800",
  style: "normal",
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
  variable: "--font-mona",
  display: "swap",
  adjustFontFallback: "Arial",
});

// "optional", not "swap": the body font is preloaded and small, so it is normally there for first paint; when a slow
// connection misses that window, the page keeps the metric-matched fallback instead of swapping mid-read. The swap
// re-wrapped long hero paragraphs and moved everything under them (lab CLS 0.17 on the research pages, SEO-6).
// The file keeps DM Sans' optical-size axis, so large text still gets the tighter cut the browser picks by size.
const dmSans = localFont({
  src: "../fonts/dm-sans-400-600.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-dm",
  display: "optional",
  adjustFontFallback: "Arial",
});

// Accent words (italic) and the salon/showroom demo headings (upright). Not preloaded: it is never the largest element,
// swap paints the Georgia fallback until it arrives, and each face is only fetched by a page that uses it.
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
  preload: false,
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

import type { Metadata, Viewport } from "next";
import { Antonio, DM_Sans, Instrument_Serif } from "next/font/google";
import { SITE } from "@/lib/site";
import { FROM_PRICE, inr } from "@/lib/offer";
import { Tracker } from "@/components/site/Tracker";
import "./globals.css";

/* Redesign v3 (docs/spec/redesign-v3-motion.md): Antonio 600 for display type, DM Sans for text.
   Antonio needs latin-ext because the rupee sign (U+20B9) lives in that subset; the browser only fetches
   it when a ₹ is on the page (unicode-range). DM Sans has no ₹, so body-size prices fall back to the
   system sans, as they did before. Instrument Serif stays for the concept demos' own headings. */
const antonio = Antonio({
  subsets: ["latin", "latin-ext"],
  weight: ["600"],
  variable: "--font-antonio",
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
  themeColor: "#f8f5ee",
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
  keywords: [
    "website development India",
    "business website design",
    "fast website delivery",
    "SEO website agency",
    "freelance web developer India",
    "landing page design",
  ],
  authors: [{ name: "SiteBlitz" }],
  creator: "SiteBlitz",
  alternates: { canonical: "/" },
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

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#organization`,
  name: "SiteBlitz",
  description:
    "Website studio building professional, mobile-friendly business websites with upfront pricing.",
  url: SITE.url,
  ...(SITE.emailLive ? { email: SITE.email } : {}),
  telephone: SITE.phone,
  // Region only: no street or city is published (truthful-location rule, FD-22).
  address: {
    "@type": "PostalAddress",
    addressRegion: SITE.region,
    addressCountry: "IN",
  },
  areaServed: "IN",
  priceRange: "₹₹",
  // sameAs left out until verified external profiles exist (an empty list says nothing)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${antonio.variable} ${dmSans.variable} ${instrument.variable}`}>
      <body>
        {/* without JS, reveal-on-scroll elements must simply be visible */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <Tracker />
      </body>
    </html>
  );
}

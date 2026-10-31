import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Space_Grotesk, Instrument_Serif } from "next/font/google";
import { SITE } from "@/lib/site";
import { Tracker } from "@/components/site/Tracker";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
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
    default: "SiteBlitz — Fast Business Websites from ₹7,999 / $99",
    template: "%s — SiteBlitz",
  },
  description:
    "SiteBlitz is a web studio building conversion-focused, SEO-first business websites for India and worldwide — designed, engineered and launched in as little as 48 hours.",
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
    title: "SiteBlitz — Fast Business Websites from ₹7,999 / $99",
    description:
      "Conversion-focused, SEO-first business websites for India and worldwide. Designed, engineered and launched in as little as 48 hours.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteBlitz — Fast Business Websites from ₹7,999 / $99",
    description:
      "Conversion-focused, SEO-first business websites, launched in as little as 48 hours.",
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
    "Web studio building conversion-focused, SEO-first business websites, delivered in as little as 48 hours.",
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.city,
    addressCountry: "IN",
  },
  areaServed: ["IN", "Worldwide"],
  priceRange: "₹₹",
  // sameAs left out until verified external profiles exist (an empty list says nothing)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${grotesk.variable} ${instrument.variable}`}>
      <body className="grain">
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

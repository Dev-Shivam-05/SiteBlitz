import { useEffect, useRef, useState } from "react";

import { CookieBanner } from "@/components/CookieBanner";
import { LiveChatWidget } from "@/components/LiveChatWidget";
import { MobileCTABar } from "@/components/MobileCTABar";
import { BusinessSelector } from "@/sections/BusinessSelector";
import { ComparisonTable } from "@/sections/ComparisonTable";
import { FAQSection } from "@/sections/FAQSection";
import { FinalCTA } from "@/sections/FinalCTA";
import { FooterSection } from "@/sections/FooterSection";
import { Hero } from "@/sections/Hero";
import { Navbar } from "@/sections/Navbar";
import { PainAmplifier } from "@/sections/PainAmplifier";
import { PortfolioSection } from "@/sections/PortfolioSection";
import { PricingSection } from "@/sections/PricingSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { ROICalculator } from "@/sections/ROICalculator";
import { SocialProofMarquee } from "@/sections/SocialProofMarquee";
import { TrustSignals } from "@/sections/TrustSignals";
import { VideoTestimonials } from "@/sections/VideoTestimonials";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("08:45:12");
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState<string | null>("PROFESSIONAL");
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const footerTop = footerRef.current?.getBoundingClientRect().top ?? 99999;
      const beyondHero = window.scrollY > window.innerHeight * 0.7;
      const nearFooter = footerTop < window.innerHeight + 80;
      setShowMobileBar(beyondHero && !nearFooter);
    };

    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, "0");
      const m = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, "0");
      const s = Math.floor((diff / 1000) % 60).toString().padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const whatsappBaseLink = "https://wa.me/919274490242";
  const whatsappHeroLink = `${whatsappBaseLink}?text=${encodeURIComponent(
    "Hi SiteBlitz! I want to create a website for my business. Can we discuss?"
  )}`;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        onScrollTo={scrollTo}
        whatsappLink={whatsappHeroLink}
      />

      <Hero timeLeft={timeLeft} whatsappLink={whatsappHeroLink} onPortfolioClick={() => scrollTo("portfolio")} />
      <SocialProofMarquee />
      <PainAmplifier whatsappLink={whatsappHeroLink} />
      <BusinessSelector
        onSelectPlan={(plan) => {
          setRecommendedPlan(plan);
          scrollTo("pricing");
        }}
        whatsappBaseLink={whatsappBaseLink}
      />
      <PricingSection whatsappBaseLink={whatsappBaseLink} recommendedPlan={recommendedPlan} onCompareClick={() => scrollTo("comparison")} />
      <ROICalculator whatsappLink={whatsappHeroLink} />
      <PortfolioSection />
      <ProcessSection />
      <VideoTestimonials />
      <FAQSection />
      <ComparisonTable />
      <TrustSignals />
      <FinalCTA whatsappLink={whatsappHeroLink} />
      <div ref={footerRef}>
        <FooterSection onScrollTo={scrollTo} />
      </div>
      <MobileCTABar show={showMobileBar} whatsappLink={whatsappHeroLink} />
      <LiveChatWidget whatsappLink={whatsappHeroLink} />
      <CookieBanner />
    </div>
  );
}

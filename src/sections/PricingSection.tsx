import { motion } from "framer-motion";
import { PricingCard, PricingPlan } from "@/sections/PricingCard";

interface PricingSectionProps {
  whatsappBaseLink: string;
  recommendedPlan: string | null;
  onCompareClick: () => void;
}

const pricingPlans: PricingPlan[] = [
  {
    badge: "🥉",
    name: "STARTER",
    subtitle: "Static Website",
    marketPrice: "₹15,999",
    price: "₹7,999",
    save: "SAVE 50%",
    delivery: "⚡ Live in 12-24 Hours",
    bestFor: "Plumbers, Electricians, Small Shops, Freelancers",
    features: [
      "1-5 Pages (Home, About, Services, Contact, Gallery)",
      "Mobile Responsive Design",
      "WhatsApp Chat Button",
      "Google Maps Integration",
      "Contact Form with Email Alerts",
      "Basic SEO (Meta Tags, Sitemap)",
      "1 Year Free Hosting + SSL"
    ],
    tech: "HTML + Tailwind CSS",
    cta: "Choose Starter - ₹7,999"
  },
  {
    badge: "🥈",
    name: "PROFESSIONAL",
    subtitle: "Dynamic + Admin",
    marketPrice: "₹30,999",
    price: "₹14,999",
    save: "SAVE 52%",
    delivery: "⚡ 24-48 Hours",
    bestFor: "Restaurants, Doctors, Clinics, Coaching, Salons",
    features: [
      "Everything in STARTER +",
      "5-12 Pages",
      "Full Admin Panel",
      "User Login/Signup System",
      "Database (MongoDB/PostgreSQL)",
      "Appointment/Booking System",
      "Blog/News Section",
      "Photo Gallery with Upload",
      "Multi-Language (Hindi + English)",
      "Advanced SEO (Schema + GMB Guide)"
    ],
    tech: "Next.js + Node.js + Database",
    cta: "Choose Professional - ₹14,999",
    highlight: true
  },
  {
    badge: "🥇",
    name: "BUSINESS",
    subtitle: "E-Commerce + Payments",
    marketPrice: "₹60,999",
    price: "₹29,999",
    save: "SAVE 51%",
    delivery: "⚡ 48-72 Hours",
    bestFor: "E-commerce, Online Stores, Multi-Product Shops",
    features: [
      "Everything in PROFESSIONAL +",
      "12-25 Pages",
      "Full Product Catalog",
      "Shopping Cart System",
      "Razorpay Payment Gateway",
      "Order Management + Notifications",
      "GST Invoice Auto-Generation",
      "Inventory Management",
      "Discount/Coupon System",
      "PWA (Installable App)"
    ],
    tech: "Next.js + E-commerce Platform + Payments",
    cta: "Choose Business - ₹29,999"
  },
  {
    badge: "💎",
    name: "ENTERPRISE",
    subtitle: "Custom Build",
    marketPrice: "₹1,50,000+",
    price: "₹59,999",
    save: "SAVE 60%",
    delivery: "⚡ 4-7 Days (Custom Build)",
    bestFor: "Hospitals, Real Estate, Hotels, Education",
    features: [
      "Everything in BUSINESS +",
      "Unlimited Pages",
      "Multi-Branch/Location Management",
      "Role-Based Access (Admin, Manager, Staff)",
      "Advanced Booking (Calendar, Reminders, SMS)",
      "Patient/Student/Customer Portal",
      "Document Upload/Download System",
      "Email Marketing Automation",
      "Live Chat Widget",
      "Multi-Currency Support",
      "API Documentation (Future app integration)",
      "30-Day Post-Launch Support",
      "Full Source Code Ownership"
    ],
    tech: "Custom Stack (Your Requirements)",
    cta: "Choose Enterprise - ₹59,999"
  }
];

export function PricingSection({ whatsappBaseLink, recommendedPlan, onCompareClick }: PricingSectionProps) {
  const easeOut = [0.16, 1, 0.3, 1] as const;
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }
  };

  return (
    <section id="pricing" className="py-24 md:py-32 relative bg-gray-50 border-y border-border">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-bold leading-tight mb-6">
            Choose Your Weapon
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              (Plans That Crush Competitors)
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} whatsappBaseLink={whatsappBaseLink} recommended={recommendedPlan === plan.name} />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-border shadow-sm">
            <span className="text-xl">💳</span>
            <span className="font-medium text-sm md:text-base">Pay ₹999 advance. Rest after delivery. UPI, Cards, Net Banking accepted.</span>
          </div>
          <button onClick={onCompareClick} className="px-6 py-3 rounded-md border border-border text-primary font-semibold inline-flex items-center gap-2 hover:bg-gray-100 transition-colors">
            🔍 Compare all features side-by-side →
          </button>
        </div>
      </div>
    </section>
  );
}

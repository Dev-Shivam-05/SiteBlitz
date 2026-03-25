import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioCard, PortfolioItem } from "@/sections/PortfolioCard";
import { PortfolioModal } from "@/sections/PortfolioModal";

const portfolioItems: PortfolioItem[] = [
  { id: 1, category: "restaurant", title: "Anand Sweets - Traditional Indian Sweets", result: "47 online orders in first month", quote: "Best ₹14,999 I ever spent. Got 3X ROI in 30 days!", plan: "PROFESSIONAL Plan", badge: "Restaurant", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, category: "clinic", title: "Dr. Priya Clinic - Family Dental Care", result: "300+ patient bookings", quote: "Appointment system changed my practice completely.", plan: "PROFESSIONAL Plan", badge: "Clinic", image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, category: "ecommerce", title: "Fashion Hub - Online Boutique", result: "₹1.2M revenue in 6 months", quote: "Payments and inventory are seamless now.", plan: "BUSINESS Plan", badge: "E-commerce", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80" },
  { id: 4, category: "other", title: "Legal Associates - Corporate Law Firm", result: "85 qualified leads/month", quote: "Premium look that attracts serious clients.", plan: "PROFESSIONAL Plan", badge: "Other", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80" },
  { id: 5, category: "other", title: "PowerFit Gym - Fitness Studio", result: "120 membership inquiries", quote: "New memberships doubled in 4 weeks.", plan: "PROFESSIONAL Plan", badge: "Gym", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80" },
  { id: 6, category: "salon", title: "Glow Salon & Spa", result: "Bookings filled for 2 weeks", quote: "We are fully booked thanks to the new site.", plan: "PROFESSIONAL Plan", badge: "Salon", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80" },
  { id: 7, category: "restaurant", title: "Sweet Spot - Festival Orders", result: "Diwali orders 10X last year", quote: "Online ordering saved the season.", plan: "BUSINESS Plan", badge: "Restaurant", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80" },
  { id: 8, category: "other", title: "Bright Coaching Institute", result: "200 student enrollments", quote: "Lead flow is nonstop now.", plan: "PROFESSIONAL Plan", badge: "Other", image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80" },
  { id: 9, category: "shop", title: "RapidFix Plumber Services", result: "60+ service calls", quote: "Customers now find us instantly.", plan: "STARTER Plan", badge: "Shop", image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80" },
  { id: 10, category: "ecommerce", title: "Urban Threads Boutique", result: "₹80K sales first month", quote: "Best launch we have ever had.", plan: "BUSINESS Plan", badge: "E-commerce", image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=1200&q=80" },
  { id: 11, category: "clinic", title: "CityCare Hospital - OPD Services", result: "500+ appointment bookings", quote: "Patients love the self-booking system.", plan: "ENTERPRISE Plan", badge: "Hospital", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80" },
  { id: 12, category: "other", title: "Prime Realty - Mumbai Listings", result: "45 property inquiries", quote: "The site feels premium and converts well.", plan: "ENTERPRISE Plan", badge: "Real Estate", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" }
];

export function PortfolioSection() {
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const filteredPortfolio = useMemo(() => {
    if (portfolioFilter === "all") return portfolioItems;
    return portfolioItems.filter((item) => item.category === portfolioFilter);
  }, [portfolioFilter]);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-bold mb-4">Our Work Speaks Louder</h2>
        </div>

        <div className="sticky top-20 bg-white/95 backdrop-blur-xl py-4 z-20">
          <div className="flex gap-3 overflow-x-auto no-scrollbar justify-center">
            {[
              { label: "All", value: "all" },
              { label: "Restaurants", value: "restaurant" },
              { label: "Clinics", value: "clinic" },
              { label: "Shops", value: "shop" },
              { label: "Salons", value: "salon" },
              { label: "E-commerce", value: "ecommerce" },
              { label: "Other", value: "other" }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setPortfolioFilter(tab.value)}
                className={`px-6 py-3 rounded-md text-sm font-semibold transition-all whitespace-nowrap ${
                  portfolioFilter === tab.value
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,102,255,0.3)]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <AnimatePresence>
            {filteredPortfolio.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <PortfolioCard item={item} onView={() => setModalOpen(true)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <PortfolioModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

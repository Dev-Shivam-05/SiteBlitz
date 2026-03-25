import { motion } from "framer-motion";
import { CheckCircle2, Clock, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { Counter } from "@/components/Counter";
import { HeroSphere } from "@/components/HeroSphere";

interface HeroProps {
  timeLeft: string;
  whatsappLink: string;
  onPortfolioClick: () => void;
}

export function Hero({ timeLeft, whatsappLink, onPortfolioClick }: HeroProps) {
  const easeOut = [0.16, 1, 0.3, 1] as const;
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32">
      <HeroSphere />
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/30">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium">Trusted by 142+ Indian Businesses • Next batch: {timeLeft}</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,8vw,5rem)] font-extrabold font-display leading-[1.05] mb-6">
            Your Competitor Got 47 Customers Last Month.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary inline-block mt-2">
              You Got 0.
            </span>
          </motion.h1>

          <motion.h2 variants={fadeUp} className="text-[clamp(1.5rem,4vw,2.5rem)] font-display font-bold mb-6 text-foreground/90">
            Let's fix that in 24 hours. Professional websites from ₹7,999.
          </motion.h2>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-10 w-full max-w-3xl">
            {[
              "Live in 24 hours, not 24 days",
              "50% cheaper than agencies",
              "Full admin panel included"
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 bg-white/80 border border-border rounded-2xl px-4 py-3 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <span className="text-sm font-semibold text-foreground/90">{point}</span>
              </div>
            ))}
          </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-md text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,102,255,0.4)] shadow-[0_0_20px_rgba(0,102,255,0.25)]"
            >
              <MessageCircle className="w-5 h-5" /> Start Your Website - ₹7,999
            </a>
            <button
              onClick={onPortfolioClick}
                className="w-full sm:w-auto px-8 py-4 bg-gray-100 hover:bg-gray-200 border border-border text-foreground font-semibold rounded-md text-lg transition-all"
            >
              See Our Work
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> 4.9/5 Rating (142 Reviews)</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> 24-Hour Delivery Guaranteed</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Money-Back Guarantee</span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 text-sm font-semibold text-primary">
            🔥 3 websites delivered today | ⏰ Next slot: Tomorrow 10 AM
          </motion.div>

          <motion.div variants={fadeUp} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              { num: 142, label: "Websites Delivered", suffix: "+" },
              { num: 98, label: "Satisfaction Rate", suffix: "%" },
              { num: 24, label: "Fastest Delivery", suffix: "h" },
              { num: 5, label: "Years Experience", suffix: "+" }
            ].map((stat) => (
              <div key={stat.label} className="glass p-6 rounded-2xl flex flex-col items-center justify-center hover:shadow-md transition-all">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1 flex items-center">
                  <Counter to={stat.num} />{stat.suffix}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium text-center">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Palette, Rocket, TrendingUp } from "lucide-react";

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: ReactNode;
}

const processSteps: ProcessStep[] = [
  { id: 1, title: "YOU WHATSAPP US", description: "Tell us your business type. Takes 2 minutes. We reply instantly.", time: "Day 0, 00:00", icon: <MessageCircle className="w-6 h-6" /> },
  { id: 2, title: "WE CREATE", description: "3 design mockups delivered in 2 hours. Pick your favorite.", time: "Day 0, 02:00", icon: <Palette className="w-6 h-6" /> },
  { id: 3, title: "YOU APPROVE", description: "Love it? We start building immediately. Hate it? We redesign.", time: "Day 0, 03:00", icon: <CheckCircle2 className="w-6 h-6" /> },
  { id: 4, title: "WEBSITE GOES LIVE", description: "Same day. Admin panel access, training video, full control.", time: "Day 0, 24:00", icon: <Rocket className="w-6 h-6" /> },
  { id: 5, title: "CUSTOMERS ARRIVE", description: "SEO guide, Google My Business setup, marketing tips.", time: "Day 1+", icon: <TrendingUp className="w-6 h-6" /> }
];

export function ProcessSection() {
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
    <section id="process" className="py-24 md:py-32 bg-gray-50 border-y border-border">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-16">
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-bold">How We Deliver Websites Faster Than Pizza</h2>
          <p className="mt-4 text-muted-foreground font-medium">⏱️ Total Time: 12-24 hours (competitors take 2-4 weeks)</p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 -translate-y-1/2 rounded-full" />
          <div className="md:hidden absolute left-7 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent rounded-full" />

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
            {processSteps.map((step) => (
              <motion.div key={step.id} variants={fadeUp} className="flex md:flex-col items-start md:items-center gap-6 md:gap-4 text-left md:text-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-30" />
                  <div className="w-14 h-14 rounded-full bg-white border border-primary/30 flex items-center justify-center text-primary relative z-10 shadow-[0_0_20px_rgba(0,102,255,0.2)]">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary mb-1 tracking-widest uppercase">{step.time}</div>
                  <h4 className="text-lg font-bold mb-2 text-foreground/90">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

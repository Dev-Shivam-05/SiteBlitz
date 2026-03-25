import { BadgeCheck, MessageCircle, Rocket } from "lucide-react";
import { motion } from "framer-motion";

interface FinalCTAProps {
  whatsappLink: string;
}

export function FinalCTA({ whatsappLink }: FinalCTAProps) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="container max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
        <motion.h2 initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="text-[clamp(2.5rem,8vw,5rem)] font-display font-extrabold leading-tight mb-6">
          Your Competitor Just Signed Up.
          <br />
          Don't Let Them Win.
        </motion.h2>
        <p className="text-xl md:text-2xl text-foreground/80 mb-10">Start your website in the next 10 minutes. Be live by tomorrow.</p>
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold rounded-md text-xl md:text-2xl shadow-[0_0_40px_rgba(0,102,255,0.4)] transition-all animate-pulse hover:animate-none"
        >
          💬 WhatsApp Now - Get Started
        </motion.a>
        <div className="mt-6 text-primary font-medium">⏰ Next available slot: Tomorrow 10 AM (2 slots left)</div>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
          <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-primary" /> Reply in 10 minutes</span>
          <span className="flex items-center gap-2"><Rocket className="w-4 h-4 text-primary" /> Live in 24 hours</span>
          <span className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-primary" /> ₹999 advance only</span>
        </div>
      </div>
    </section>
  );
}

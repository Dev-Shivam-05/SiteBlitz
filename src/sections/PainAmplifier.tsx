import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

interface PainAmplifierProps {
  whatsappLink: string;
}

export function PainAmplifier({ whatsappLink }: PainAmplifierProps) {
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
    <section className="py-24 md:py-32 relative">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 variants={fadeUp} className="text-[clamp(2rem,6vw,3.5rem)] font-display font-bold leading-tight">
            Still Don't Think You Need a Website?
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
            {[
              "80% of customers Google you before buying",
              "Your competitor with a website gets 10X more calls",
              "You're losing ₹50,000/month to competitors",
              "Every day without a website = money lost"
            ].map((point) => (
              <motion.div key={point} variants={fadeUp} className="flex items-start gap-4">
                <div className="mt-1 min-w-[24px]">
                  <X className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-xl font-medium text-foreground/90">{point}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full" />
            <div className="relative glass rounded-3xl p-1 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 bg-white rounded-[22px] overflow-hidden">
                <div className="p-8 border-b sm:border-b-0 sm:border-r border-border flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-3xl">😞</span>
                  </div>
                  <h3 className="font-bold text-lg text-red-500 mb-4 uppercase tracking-wider">Before</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>Invisible on Google</li>
                    <li>Manual WhatsApp only</li>
                    <li>Looks unprofessional</li>
                    <li>Losing to competitors</li>
                  </ul>
                </div>
                <div className="p-8 bg-primary/5 flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-[0_0_30px_rgba(0,102,255,0.25)]">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h3 className="font-bold text-lg text-primary mb-4 uppercase tracking-wider relative z-10">After</h3>
                  <ul className="space-y-3 text-sm text-foreground/90 font-medium relative z-10">
                    <li className="flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> First on Google</li>
                    <li className="flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Automated inquiries</li>
                    <li className="flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Premium brand image</li>
                    <li className="flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Dominating market</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-16 text-center">
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-bold rounded-md text-lg hover:bg-foreground/80 transition-colors">
            Stop Losing. Start Winning <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

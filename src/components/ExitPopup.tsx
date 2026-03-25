import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Sparkles, ArrowRight, Loader2, MessageCircle } from "lucide-react";
import { useCreateLead } from "@/hooks/use-leads";

export function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const { mutate: createLead, isPending, isSuccess } = useCreateLead();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessType: ""
  });
  const [whatsappMessage, setWhatsappMessage] = useState("");

  useEffect(() => {
    if (document.cookie.includes("exitPopupShown=true")) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse leaves top of viewport and popup hasn't been shown
      if (e.clientY < 10 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        document.cookie = "exitPopupShown=true; max-age=604800; path=/";
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi! I want a FREE website mockup for my ${formData.businessType}. My name is ${formData.name}, phone: ${formData.phone}.`;
    setWhatsappMessage(message);
    createLead(formData);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10"
          >
            <div className="relative bg-white rounded-[22px] p-8 md:p-10 border border-border shadow-xl">
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 px-3 py-3 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-2">Wait! Before You Go...</h2>
                <p className="text-muted-foreground">
                  Get a <span className="text-primary font-semibold">FREE website mockup</span> designed for your business.
                </p>
              </div>

              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-600 p-6 rounded-xl text-center"
                >
                  <h3 className="font-bold text-xl mb-2">You're on the list! 🎉</h3>
                  <p>Our lead designer will message you on WhatsApp within 10 minutes with next steps.</p>
                  <button
                    onClick={() => {
                      const encoded = encodeURIComponent(whatsappMessage);
                      window.open(`https://wa.me/919274490242?text=${encoded}`, "_blank");
                    }}
                    className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-md"
                  >
                    <MessageCircle className="w-4 h-4" /> Send on WhatsApp
                  </button>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="mt-4 px-6 py-3 rounded-md text-sm text-foreground/70 hover:text-foreground hover:bg-gray-100 transition-colors"
                  >
                    Close window
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      required
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-5 py-4 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="tel"
                      placeholder="WhatsApp Number"
                      className="w-full px-5 py-4 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="text"
                      placeholder="Type of Business (e.g. Cafe, Clinic)"
                      className="w-full px-5 py-4 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                      value={formData.businessType}
                      onChange={e => setFormData({...formData, businessType: e.target.value})}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full px-6 py-3 mt-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold rounded-md text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,102,255,0.25)] hover:shadow-[0_0_30px_rgba(0,102,255,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        Get Free Mockup <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  
                  <div className="text-center mt-4">
                    <button 
                      type="button" 
                      onClick={() => setIsVisible(false)}
                      className="px-6 py-3 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors"
                    >
                      No thanks, I don't want more customers right now
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
  );
}

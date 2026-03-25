import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const message = encodeURIComponent("Hi SiteBlitz! I want to create a website for my business. Can we discuss?");
    window.open(`https://wa.me/919274490242?text=${message}`, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-slide-in-right"
    >
      <button
        onClick={handleClick}
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center gap-3 rounded-md bg-[#25D366] text-white shadow-lg hover:shadow-2xl transition-all duration-300 animate-bounce-soft px-6 py-3"
      >
        <div className="absolute inset-0 bg-white/20 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 relative z-10" />
        <span className="hidden md:inline-flex items-center whitespace-nowrap text-sm font-semibold relative z-10 max-w-0 opacity-0 group-hover:max-w-[220px] group-hover:opacity-100 transition-all duration-300 overflow-hidden">
          Chat with us - Reply in 2 min
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-background animate-pulse" />
      </button>
    </div>
  );
}

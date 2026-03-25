import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface PortfolioModalProps {
  open: boolean;
  onClose: () => void;
}

export function PortfolioModal({ open, onClose }: PortfolioModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg rounded-2xl bg-white border border-border shadow-2xl p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-3 py-3 rounded-md text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-display font-bold mb-3">Confidential Portfolio</h3>
        <p className="text-muted-foreground mb-6">
          We can't let you see this confidential website due to our client's privacy. If you want to explore our work, you can connect with our team.
        </p>
        <a
          href="https://wa.me/919274490242"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-md hover:bg-primary/90 transition-colors"
        >
          <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
        </a>
      </motion.div>
    </div>
  );
}

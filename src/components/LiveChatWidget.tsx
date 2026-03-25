import { useState } from "react";
import { MessageCircle, MessageSquare } from "lucide-react";

interface LiveChatWidgetProps {
  whatsappLink: string;
}

export function LiveChatWidget({ whatsappLink }: LiveChatWidgetProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label="Open live chat"
      >
        <MessageSquare className="w-5 h-5" />
        Live Chat
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
      </button>
      {open && (
        <div className="mt-4 w-72 bg-white border border-border rounded-2xl shadow-xl p-4">
          <div className="text-sm font-semibold">Hi! How can we help you today?</div>
          <p className="text-xs text-muted-foreground mt-1">Our team replies within 10 minutes.</p>
          <div className="mt-4 space-y-2">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-foreground font-semibold py-2 rounded-xl">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
            <a href="mailto:web@siteblitz.in" className="w-full flex items-center justify-center gap-2 bg-white border border-border text-foreground font-semibold py-2 rounded-xl">
              Email Us
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

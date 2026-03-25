interface MobileCTABarProps {
  show: boolean;
  whatsappLink: string;
}

export function MobileCTABar({ show, whatsappLink }: MobileCTABarProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 md:hidden z-40 bg-white border-t border-border shadow-[0_-8px_24px_rgba(0,0,0,0.08)] px-4 py-3">
      <a href={whatsappLink} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-xl">
        Get Your Website - ₹7,999
      </a>
    </div>
  );
}

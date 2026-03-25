import { Menu, Phone, X } from "lucide-react";

interface NavbarProps {
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onScrollTo: (id: string) => void;
  whatsappLink: string;
}

export function Navbar({ isScrolled, mobileMenuOpen, onToggleMobileMenu, onScrollTo, whatsappLink }: NavbarProps) {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-lg border-b border-border py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 z-50">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-display font-bold text-background text-xl shadow-[0_0_15px_rgba(0,102,255,0.4)]">
            S
          </div>
          <span className="font-display font-bold text-xl tracking-tight">SiteBlitz</span>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <button onClick={() => onScrollTo("pricing")} className="px-6 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors">Pricing</button>
          <button onClick={() => onScrollTo("portfolio")} className="px-6 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors">Portfolio</button>
          <button onClick={() => onScrollTo("process")} className="px-6 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors">Process</button>
          <button onClick={() => onScrollTo("faq")} className="px-6 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gray-100 transition-colors">FAQ</button>
        </nav>

        <div className="hidden md:block">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 border border-border rounded-md font-medium text-sm transition-all duration-300 flex items-center gap-2 text-primary group"
          >
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            WhatsApp Us
          </a>
        </div>

        <button className="md:hidden z-50 px-3 py-3 -mr-2 text-foreground rounded-md hover:bg-gray-100 transition-colors" onClick={onToggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 px-4 text-center h-screen pt-20">
          <button onClick={() => onScrollTo("pricing")} className="px-6 py-3 rounded-md text-2xl font-display font-bold hover:bg-gray-100 transition-colors">Pricing</button>
          <button onClick={() => onScrollTo("portfolio")} className="px-6 py-3 rounded-md text-2xl font-display font-bold hover:bg-gray-100 transition-colors">Portfolio</button>
          <button onClick={() => onScrollTo("process")} className="px-6 py-3 rounded-md text-2xl font-display font-bold hover:bg-gray-100 transition-colors">Process</button>
          <button onClick={() => onScrollTo("faq")} className="px-6 py-3 rounded-md text-2xl font-display font-bold hover:bg-gray-100 transition-colors">FAQ</button>
          <a href={whatsappLink} className="mt-4 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-md w-full max-w-xs shadow-[0_0_20px_rgba(0,102,255,0.3)] hover:bg-primary/90 transition-colors">
            WhatsApp Us Now
          </a>
        </div>
      )}
    </header>
  );
}

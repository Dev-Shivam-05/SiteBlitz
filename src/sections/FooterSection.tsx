import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from "lucide-react";

interface FooterSectionProps {
  onScrollTo: (id: string) => void;
}

export function FooterSection({ onScrollTo }: FooterSectionProps) {
  return (
    <footer className="bg-gray-50 py-16 border-t border-border relative z-10 text-foreground">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-display font-bold text-white text-xl">
                S
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                SiteBlitz
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              From Zero to Hero in 24 Hours. India's fastest website delivery
              service.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/siteblitz"
                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/siteblitz"
                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/siteblitz"
                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com"
                className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 py-3 px-4">Quick Links</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => onScrollTo("pricing")}
                  className="px-6 py-3 rounded-md hover:text-primary hover:bg-gray-100 transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo("portfolio")}
                  className="px-6 py-3 rounded-md hover:text-primary hover:bg-gray-100 transition-colors"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo("process")}
                  className="px-6 py-3 rounded-md hover:text-primary hover:bg-gray-100 transition-colors"
                >
                  Process
                </button>
              </li>
              <li>
                <a
                  href="mailto:hello@siteblitz.in"
                  className="hover:text-primary transition-colors px-6 py-3 rounded-md hover:bg-gray-100"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 py-3 px-4">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="tel:+919274490242"
                  className="hover:text-primary transition-colors"
                >
                  +91 92744 90242
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:hello@siteblitz.in"
                  className="hover:text-primary transition-colors"
                >
                  hello@siteblitz.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 py-3 px-4">Legal</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/refunds"
                  className="hover:text-primary transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="hover:text-primary transition-colors"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SiteBlitz. All rights reserved.</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}

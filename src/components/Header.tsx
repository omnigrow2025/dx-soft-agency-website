import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Մեր մասին", href: "#about" },
  { label: "Դասընթացներ", href: "#courses" },
  { label: "Մասնագետներ", href: "#specialists" },
  { label: "Q&A", href: "#faq" },
  { label: "Կապ", href: "#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex flex-col leading-none">
          <span className="text-2xl font-black tracking-tight text-foreground">
            OMNI<span className="text-accent-lime">DX</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
            ACADEMY
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-accent-lime transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-foreground hover:text-accent-lime"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;

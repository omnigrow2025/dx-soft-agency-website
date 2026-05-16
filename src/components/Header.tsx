import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/hooks/useI18n";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  const navLinks = [
    { label: t("nav.about", "Մեր մասին"), href: "#about" },
    { label: t("nav.courses", "Դասընթացներ"), href: "#courses" },
    { label: t("nav.specialists", "Մասնագետներ"), href: "#specialists" },
    { label: t("nav.faq", "Q&A"), href: "#faq" },
    { label: t("nav.contact", "Կապ"), href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex flex-col leading-none">
          <span className="font-serif-display text-2xl md:text-[26px] text-foreground tracking-tight">
            {t("brand.name", "Vision")}
          </span>
          <span className="eyebrow text-[9px] mt-1 text-muted-foreground">
            {t("brand.tagline", "Business Academy")}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/80 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>

        <div className="md:hidden flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-5 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-base text-foreground hover:text-accent"
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

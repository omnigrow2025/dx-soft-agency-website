import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col leading-none">
              <span className="font-serif-display text-3xl">Vision</span>
              <span className="eyebrow text-[10px] mt-1 text-primary-foreground/60">Business Academy</span>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-sm leading-relaxed">
              Նոր սերնդի միջազգային կրթական հարթակ՝ ուղղված կիրառական հմտություններին։
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="eyebrow text-primary-foreground/60">Հասցե</h4>
            <p className="flex items-start gap-2 text-sm text-primary-foreground/80">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              Nova Plaza, Sayat Nova 19/1,<br /> Yerevan, Armenia
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="eyebrow text-primary-foreground/60">Կապ</h4>
            <a href="mailto:support@omnidx.academy" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground">
              <Mail className="h-4 w-4" /> support@omnidx.academy
            </a>
            <a href="tel:+37494963903" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground">
              <Phone className="h-4 w-4" /> (094) 96 39 03
            </a>
            <div className="flex gap-2 pt-2">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground hover:border-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground hover:border-primary-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-primary-foreground/60">
            © 2026 Vision Business Academy — Բոլոր իրավունքները պաշտպանված են
          </p>
          <p className="text-xs text-primary-foreground/60">Աշխատում ենք 24/7</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

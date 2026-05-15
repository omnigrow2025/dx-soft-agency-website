import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Կոնտակտային ինֆորմացիա</h4>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <p>Nova Plaza, Sayat Nova 19/1, Yerevan, Armenia</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Էլ. հասցե</h4>
            <a href="mailto:support@omnidx.academy" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <Mail className="h-4 w-4" /> support@omnidx.academy
            </a>
            <p className="text-xs text-muted-foreground">Աշխատանքային ժամեր՝ <span className="text-foreground font-medium">Աշխատում 24/7</span></p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Հեռախոս</h4>
            <a href="tel:+37494963903" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <Phone className="h-4 w-4" /> (094) 96 39 03
            </a>
            <div className="flex gap-2 pt-1">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent-lime hover:border-accent transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent-lime hover:border-accent transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © Բոլոր իրավունքները պաշտպանված են
          </p>
          <p className="text-xs text-muted-foreground">
            2026 Vision Business Academy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

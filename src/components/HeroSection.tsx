import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-background overflow-hidden border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-7 space-y-7">
            <p className="eyebrow">Vision Business Academy</p>
            <h1 className="font-serif-display text-[44px] sm:text-6xl md:text-7xl leading-[1.02] tracking-tight text-foreground">
              Կրթություն,<br />
              որը <em className="text-accent not-italic font-serif-display">փոխում</em> է<br />
              ապագան։
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
              Ուսուցում, որ միտված է իրական աշխատանքային հմտությունների
              զարգացմանը՝ պատրաստելով ձեզ մրցունակ և պատրաստ
              աշխատաշուկայի պահանջներին։
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7 h-12 text-sm font-medium"
              >
                <a href="#courses">
                  Դիտել դասընթացները
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-7 h-12 text-sm font-medium border-foreground/20 hover:bg-secondary"
              >
                <a href="#about">Մեր մասին</a>
              </Button>
            </div>

            <div className="hidden sm:flex items-center gap-8 pt-6 border-t border-border mt-8">
              <div>
                <p className="font-serif-display text-3xl text-foreground">500+</p>
                <p className="text-xs text-muted-foreground mt-1">Ուսանողներ</p>
              </div>
              <div className="rule w-px h-10 bg-border" />
              <div>
                <p className="font-serif-display text-3xl text-foreground">20+</p>
                <p className="text-xs text-muted-foreground mt-1">Դասընթացներ</p>
              </div>
              <div className="rule w-px h-10 bg-border" />
              <div>
                <p className="font-serif-display text-3xl text-foreground">95%</p>
                <p className="text-xs text-muted-foreground mt-1">Բավարարվածություն</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop"
                alt="Student"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-card border border-border rounded-md shadow-sm px-5 py-4 max-w-[220px]">
              <p className="eyebrow text-[10px]">Միացիր</p>
              <p className="font-serif-display text-lg leading-tight mt-1">Նոր սերնդի ակադեմիա</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

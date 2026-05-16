import { ArrowRight, Sparkles, GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const },
});

const HeroSection = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-12 gap-4 md:gap-5 auto-rows-[minmax(110px,auto)]">
          {/* Headline */}
          <motion.div
            {...fade(0)}
            className="col-span-12 lg:col-span-8 lg:row-span-2 bento-card p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-card via-card to-secondary/60"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Vision Business Academy
            </div>
            <div className="space-y-6 mt-8">
              <h1 className="font-serif-display text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95] text-foreground">
                Կրթություն,<br />
                որը <em className="text-accent">փոխում</em> է<br />
                ապագան։
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
                Ուսուցում, որ միտված է իրական աշխատանքային հմտությունների զարգացմանը՝ պատրաստելով ձեզ մրցունակ և պատրաստ աշխատաշուկայի պահանջներին։
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild size="lg" className="rounded-full px-7 h-12 text-sm font-medium">
                  <a href="#courses">Դիտել դասընթացները<ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-7 h-12 text-sm font-medium">
                  <a href="#about">Մեր մասին</a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            {...fade(0.1)}
            className="col-span-12 sm:col-span-7 lg:col-span-4 lg:row-span-3 bento-card relative overflow-hidden min-h-[280px] lg:min-h-0"
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=1200&fit=crop"
              alt="Student"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
              <p className="text-xs uppercase tracking-[0.18em] opacity-80">Միացիր</p>
              <p className="font-serif-display text-2xl md:text-3xl mt-2 leading-tight">
                Նոր սերնդի ակադեմիա
              </p>
            </div>
          </motion.div>

          {/* Stats trio */}
          <motion.div {...fade(0.2)} className="col-span-6 sm:col-span-5 lg:col-span-3 bento-card p-6 flex flex-col justify-between">
            <GraduationCap className="h-5 w-5 text-accent" />
            <div>
              <p className="font-serif-display text-4xl md:text-5xl text-foreground">500+</p>
              <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Ուսանողներ</p>
            </div>
          </motion.div>

          <motion.div {...fade(0.25)} className="col-span-6 sm:col-span-6 lg:col-span-3 bento-card p-6 flex flex-col justify-between bg-primary text-primary-foreground">
            <Users className="h-5 w-5 opacity-80" />
            <div>
              <p className="font-serif-display text-4xl md:text-5xl">20+</p>
              <p className="text-xs opacity-70 mt-2 uppercase tracking-wider">Դասընթացներ</p>
            </div>
          </motion.div>

          <motion.div {...fade(0.3)} className="col-span-12 sm:col-span-6 lg:col-span-2 bento-card p-6 flex flex-col justify-between">
            <div className="h-1.5 w-10 bg-accent rounded-full" />
            <div>
              <p className="font-serif-display text-4xl md:text-5xl text-foreground">95<span className="text-2xl">%</span></p>
              <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Բավարարվածություն</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

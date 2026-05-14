import { ArrowRight, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] uppercase tracking-tight">
              <span className="text-accent-lime">Կրթություն,</span>
              <br />
              որը փոխում է
              <br />
              <span className="relative inline-block">ապագան</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed">
              Ուսուցում, որ միտված է իրական աշխատանքային հմտությունների
              զարգացմանը՝ պատրաստելով ձեզ մրցունակ և պատրաստ
              աշխատաշուկայի պահանջներին։
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-primary/20"
            >
              <a href="#courses">
                Դիտել դասընթացները
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="relative flex justify-center md:justify-end">
            {/* Yellow blob */}
            <div
              className="absolute right-0 top-4 w-[85%] h-[90%] bg-highlight rounded-[40%_60%_55%_45%/50%_45%_55%_50%] -z-0"
              aria-hidden="true"
            />

            <div className="relative w-72 h-80 md:w-[22rem] md:h-[26rem] rounded-2xl overflow-hidden z-10">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop"
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-10 left-0 md:-left-6 bg-card rounded-2xl shadow-xl p-3 pr-5 flex items-center gap-3 z-20 border border-border">
              <div className="bg-highlight rounded-full p-2.5">
                <GraduationCap className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Ընտրիր</p>
                <p className="text-sm font-bold">Դասընթացներ</p>
              </div>
            </div>

            <div className="absolute bottom-16 left-0 md:-left-6 bg-card rounded-2xl shadow-xl p-3 pr-5 flex items-center gap-3 z-20 border border-border">
              <div className="bg-[hsl(200,90%,55%)] rounded-full p-2.5">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Արհեստական Բանականության</p>
                <p className="text-sm font-bold">Գործիքակազմ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

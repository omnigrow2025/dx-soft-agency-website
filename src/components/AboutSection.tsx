import { motion } from "framer-motion";
import { Briefcase, Cpu, Compass, Sparkles } from "lucide-react";

const directions = [
  { icon: Briefcase, title: "Բիզնես և ձեռնարկատիրություն", desc: "Ստարտափներ, ռազմավարություն, ֆինանսներ, վաճառքներ, բանակցություններ" },
  { icon: Cpu, title: "Տեխնոլոգիա և դիզայն", desc: "UI/UX, վեբ և հավելվածներ, No-Code լուծումներ, արհեստական բանականություն" },
  { icon: Compass, title: "Կառավարում և պրոդուկտ", desc: "Նախագծերի կառավարում և պրոդուկտի ռազմավարություն" },
  { icon: Sparkles, title: "Prompt Engineering", desc: "AI-ով ղեկավարվող workflow-ներ և ավտոմատացում" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <p className="eyebrow mb-4">Մեր մասին</p>
          <h2 className="font-serif-display text-4xl md:text-6xl text-foreground">
            Նոր սերնդի <em className="text-accent">միջազգային</em> կրթական հարթակ։
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-4 md:gap-5 auto-rows-[minmax(140px,auto)]">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="col-span-12 lg:col-span-7 lg:row-span-2 bento-card p-8 md:p-10 space-y-5 text-base text-muted-foreground leading-relaxed"
          >
            <p>
              <strong className="text-foreground font-medium">OMNI GROW LLC</strong>-ն և{" "}
              <strong className="text-foreground font-medium">DX Group Ltd</strong>-ն համատեղ ստեղծել են{" "}
              <strong className="text-foreground font-medium">OmniDX Academy</strong>-ն՝ նոր սերնդի միջազգային կրթական հարթակ, որի նպատակն է պատրաստել մասնագետների և ձեռնարկատերերի, ովքեր կկարողանան հաջողել ժամանակակից, արագ փոփոխվող տնտեսությունում։
            </p>
            <p>
              OmniDX Academy-ն առաջարկում է ինչպես օֆլայն, այնպես էլ օնլայն ծրագրեր՝ կենտրոնանալով կիրառական և ապագային ուղղված հմտությունների զարգացման վրա։
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-12 sm:col-span-6 lg:col-span-5 lg:row-span-3 bento-card relative overflow-hidden min-h-[320px]"
          >
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&h=1200&fit=crop"
              alt="Academy"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 font-serif-display text-2xl text-primary-foreground leading-tight">
              Գիտելիք, որը <em>աշխատում</em> է իրական աշխարհում։
            </p>
          </motion.div>

          {/* Directions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="col-span-12 sm:col-span-6 lg:col-span-7 bento-card p-8 md:p-10 bg-primary text-primary-foreground"
          >
            <p className="text-xs uppercase tracking-[0.18em] opacity-70 mb-6">Կրթական ուղղություններ</p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {directions.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                  className="flex gap-4"
                >
                  <Icon className="h-5 w-5 mt-1 shrink-0 opacity-80" />
                  <div>
                    <h3 className="font-serif-display text-xl leading-tight">{title}</h3>
                    <p className="text-sm opacity-70 mt-1.5 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

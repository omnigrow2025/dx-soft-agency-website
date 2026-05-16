const directions: [string, string][] = [
  ["Բիզնես և ձեռնարկատիրություն", "Ստարտափներ, ռազմավարություն, ֆինանսներ, վաճառքներ, բանակցություններ"],
  ["Տեխնոլոգիա և դիզայն", "UI/UX, վեբ և հավելվածներ, No-Code լուծումներ, արհեստական բանականություն"],
  ["Կառավարում և պրոդուկտ", "Նախագծերի կառավարում և պրոդուկտի ռազմավարություն"],
  ["Prompt Engineering", "AI-ով ղեկավարվող workflow-ներ և ավտոմատացում"],
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-28 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5 relative md:sticky md:top-28">
            <p className="eyebrow mb-4">Մեր մասին</p>
            <h2 className="font-serif-display text-4xl md:text-5xl leading-tight text-foreground mb-6">
              Նոր սերնդի <em className="text-accent not-italic">միջազգային</em> կրթական հարթակ։
            </h2>
            <div className="relative aspect-[4/5] rounded-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&h=900&fit=crop"
                alt="Academy team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-8 md:pt-12">
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground font-medium">OMNI GROW LLC</strong>-ն և{" "}
                <strong className="text-foreground font-medium">DX Group Ltd</strong>-ն համատեղ ստեղծել են{" "}
                <strong className="text-foreground font-medium">OmniDX Academy</strong>-ն՝ նոր սերնդի
                միջազգային կրթական հարթակ, որի նպատակն է պատրաստել մասնագետների և
                ձեռնարկատերերի, ովքեր կկարողանան հաջողել ժամանակակից, արագ փոփոխվող
                տնտեսությունում։
              </p>
              <p>
                OmniDX Academy-ն առաջարկում է ինչպես օֆլայն, այնպես էլ օնլայն ծրագրեր՝
                կենտրոնանալով կիրառական և ապագային ուղղված հմտությունների զարգացման վրա։
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="eyebrow mb-6">Կրթական ուղղություններ</p>
              <ul className="divide-y divide-border">
                {directions.map(([title, desc], i) => (
                  <li key={title} className="py-5 grid grid-cols-[2rem_1fr] gap-4 items-start">
                    <span className="font-serif-display text-accent text-lg">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif-display text-xl text-foreground mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

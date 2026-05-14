const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="rounded-2xl overflow-hidden bg-muted h-72 md:h-[28rem] relative">
            <div
              className="absolute inset-6 bg-highlight rounded-[40%_60%_55%_45%/50%_45%_55%_50%]"
              aria-hidden="true"
            />
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&h=600&fit=crop"
              alt="OmniDX Academy team"
              className="relative w-full h-full object-cover mix-blend-multiply"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Մեր <span className="text-accent-lime">Մասին</span>
            </h2>
            <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">OMNI GROW LLC</strong>-ն և{" "}
                <strong className="text-foreground">DX Group Ltd</strong>-ն համատեղ ստեղծել են{" "}
                <strong className="text-foreground">OmniDX Academy</strong>-ն՝ նոր սերնդի
                միջազգային կրթական հարթակ, որի նպատակն է պատրաստել մասնագետների և
                ձեռնարկատերերի, ովքեր կկարողանան հաջողել ժամանակակից, արագ փոփոխվող
                տնտեսությունում։
              </p>
              <p>
                OmniDX Academy-ն առաջարկում է ինչպես օֆլայն, այնպես էլ օնլայն ծրագրեր՝
                կենտրոնանալով կիրառական և ապագային ուղղված հմտությունների զարգացման վրա՝
                բիզնեսի, տեխնոլոգիաների, կառավարման և արհեստական բանականության ոլորտներում։
              </p>

              <h3 className="text-foreground font-semibold pt-2">
                Կրթական հիմնական ուղղություններն են․
              </h3>
              <ul className="space-y-2 list-none">
                {[
                  ["Բիզնես և ձեռնարկատիրություն", "ստարտափներ, ռազմավարություն, ֆինանսներ, վաճառքներ"],
                  ["Տեխնոլոգիա և դիզայն", "UI/UX, վեբ և հավելվածներ, No-Code, AI"],
                  ["Կառավարում և պրոդուկտ", "նախագծերի կառավարում և պրոդուկտի ռ
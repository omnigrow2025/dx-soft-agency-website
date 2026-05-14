import { motion } from "framer-motion";
import AboutUsImage from "../../../../../../assets/about.svg";

export const AboutUs = () => {
  return (
    <section
      className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 py-16 overflow-hidden"
      id="aboutUs"
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex justify-center md:justify-end"
      >
        <img src={AboutUsImage} alt="About OmniDX Academy" className="w-full" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="flex-1"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Մեր Մասին
        </motion.h1>

        <div className="flex flex-col gap-6 text-gray-700 leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            OMNI GROW LLC-ն և DX Group Ltd-ն համատեղ ստեղծել են
            <b> OmniDX Academy</b>-ն՝ նոր սերնդի միջազգային կրթական հարթակ, որի
            նպատակն է պատրաստել մասնագետների և ձեռնարկատերերի, ովքեր կկարողանան
            հաջողել ժամանակակից, արագ փոփոխվող տնտեսությունում։
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            OmniDX Academy-ն առաջարկում է ինչպես օֆլայն, այնպես էլ օնլայն
            ծրագրեր՝ կենտրոնանալով կիրառական և ապագային ուղղված հմտությունների
            զարգացման վրա՝ բիզնեսի, տեխնոլոգիաների, կառավարման և արհեստական
            բանականության ոլորտներում։
          </motion.p>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-semibold text-lg mb-3"
            >
              Կրթական հիմնական ուղղություններն են․
            </motion.h3>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="list-disc pl-5 space-y-2"
            >
              <li>
                <b>Բիզնես և ձեռնարկատիրություն</b> — ստարտափների զարգացում,
                ռազմավարություն, ֆինանսներ, վաճառքներ, բանակցություններ, փողի
                հոգեբանություն
              </li>

              <li>
                <b>Տեխնոլոգիա և դիզայն</b> — UI/UX, վեբ և հավելվածների մշակում,
                No-Code լուծումներ, արհեստական բանականություն
              </li>

              <li>
                <b>Կառավարում և պրոդուկտ</b> — նախագծերի կառավարում և պրոդուկտի
                ռազմավարություն
              </li>

              <li>
                <b>Prompt Engineering</b> — AI-ով ղեկավարվող workflow-ներ և
                ավտոմատացում
              </li>
            </motion.ul>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Մեր տեսլականն է ձևավորել գլոբալ կրթական կենտրոն, որը կմիավորի
            համաշխարհային մակարդակի մասնագետներին և նպատակասլաց մարդկանց՝
            տրամադրելով գիտելիք, գործիքներ և մտածողություն՝ հաջողելու թվային և
            AI-ով առաջնորդվող աշխարհում։
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

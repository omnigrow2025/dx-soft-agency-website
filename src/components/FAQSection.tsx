import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { apiFetch, unwrap, type FaqItem } from "@/lib/api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ["public-faq"],
    queryFn: async () => unwrap<FaqItem[]>(await apiFetch("/api/faq", { auth: false })),
  });

  return (
    <section id="faq" className="py-16 md:py-28 border-t border-border bg-secondary/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <p className="eyebrow">Q&A</p>
          <h2 className="font-serif-display text-4xl md:text-6xl text-foreground">
            Հաճախ տրվող <em className="text-accent">հարցեր</em>
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : !faqs?.length ? (
          <p className="text-center text-muted-foreground">Հարցեր չկան</p>
        ) : (
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
              >
                <AccordionItem value={String(f.id)} className="bento-card px-6 border">
                  <AccordionTrigger className="text-left text-base font-medium py-5">{f.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed pb-5">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
};

export default FAQSection;

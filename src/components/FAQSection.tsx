import { useQuery } from "@tanstack/react-query";
import { apiFetch, unwrap, type FaqItem } from "@/lib/api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ["public-faq"],
    queryFn: async () => unwrap<FaqItem[]>(await apiFetch("/api/faq", { auth: false })),
  });

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Հաճախ տրվող <span className="text-accent-lime">հարցեր</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Ամենից շատ տրվող հարցերի պատասխաններ։
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : !faqs?.length ? (
          <p className="text-center text-muted-foreground">Հարցեր չկան</p>
        ) : (
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((f) => (
              <AccordionItem key={f.id} value={String(f.id)} className="bg-background rounded-lg border px-4">
                <AccordionTrigger className="text-left text-sm font-medium">{f.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground whitespace-pre-line">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
};

export default FAQSection;

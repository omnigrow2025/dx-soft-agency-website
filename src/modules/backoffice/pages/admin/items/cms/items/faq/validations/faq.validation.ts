import z from "zod";

export const faqValidation = z.object({
  question: z.string(),
  answer: z.string(),
});

export type FaqFormModel = z.infer<typeof faqValidation>;

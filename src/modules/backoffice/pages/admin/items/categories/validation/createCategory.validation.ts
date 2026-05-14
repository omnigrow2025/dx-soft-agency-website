import z from "zod";

export const createCategoryValidation = z.object({
  name: z.string(),
  description: z.string(),
});

export type CreateCategoryFormModel = z.infer<typeof createCategoryValidation>;

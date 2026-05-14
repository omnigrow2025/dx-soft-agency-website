import z from "zod";

export const updateCategoryValidation = z.object({
  name: z.string(),
  description: z.string(),
});

export type UpdateCategoryFormModel = z.infer<typeof updateCategoryValidation>;

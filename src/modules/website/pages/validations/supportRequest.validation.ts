import z from "zod";

export const supportRequestValidation = z.object({
  fullname: z.string().trim(),
  phoneNumber: z.string().trim(),
  email: z.email().trim(),
  message: z.string(),
});

export type SupportRequestFormModel = z.infer<typeof supportRequestValidation>;

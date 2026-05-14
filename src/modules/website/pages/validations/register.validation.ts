import z from "zod";

export const registerValidation = z.object({
  fullname: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
});

export type RegisterFormModel = z.infer<typeof registerValidation>;

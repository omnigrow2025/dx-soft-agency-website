import z from "zod";

export const subscribeValidation = z.object({
  email: z.string(),
});

export type SubscribeFormModel = z.infer<typeof subscribeValidation>;

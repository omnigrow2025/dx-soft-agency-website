import z from "zod";

export const registerOfferModal = z.object({
  email: z.email(),
});

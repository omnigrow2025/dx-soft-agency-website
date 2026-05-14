import z from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "../../../../../../../api/constants/constants";

export const createPartnerValidation = z.object({
  logo: z
    .any()
    .refine((files) => !!files?.[0].size, "Logo is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  name: z.string(),
  url: z.url(),
});

export type CreatePartnerFormModel = z.infer<typeof createPartnerValidation>;

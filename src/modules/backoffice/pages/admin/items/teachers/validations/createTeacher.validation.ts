import z from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "../../../../../api/constants/constants";

export const createTeacherValidation = z.object({
  name: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  img: z
    .any()
    .refine((files) => !!files?.[0].size, "Image is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  bio: z.string(),
  description: z.string().min(1, "Description is required"),
  email: z.email(),
  phoneNumber: z.string(),
});

export type CreateTeacherFormModel = z.infer<typeof createTeacherValidation>;

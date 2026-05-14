import z from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "../../../../../api/constants/constants";

export const updateTeacherValidation = z
  .object({
    name: z.string().min(1, "Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    img: z
      .any()
      .optional()
      .refine(
        (files) => !files || !files[0] || files[0].size <= MAX_FILE_SIZE,
        "Max image size is 5MB.",
      )
      .refine(
        (files) =>
          !files || !files[0] || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      )
      .optional(),
    imageUrl: z.string().optional(),
    bio: z.string(),
    description: z.string().min(1, "Description is required"),
    email: z.email().min(1, "Email is required"),
    phoneNumber: z.string(),
  })
  .refine(
    ({ imageUrl, img }) => {
      return (imageUrl && imageUrl.length > 0) || (img && img[0]);
    },
    {
      message: "Image is required (upload or existing)",
      path: ["img"], // attach error to img field
    },
  );

export type UpdateTeacherFormModel = z.infer<typeof updateTeacherValidation>;

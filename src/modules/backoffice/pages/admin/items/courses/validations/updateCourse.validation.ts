import { z } from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from "../../../../../api/constants/constants";

// Feature schema
export const featureValidation = z.object({
  title: z.string().min(1, "Feature title is required"),
});

// Study Plan schema
export const studyPlanValidation = z.object({
  title: z.string().min(1, "Study plan title is required"),
  description: z.string().min(1, "Description is required"),
  order: z.number().optional(),
});

// ✅ Update Course schema
export const updateCourseValidation = z
  .object({
    title: z.string().min(1, "Title is required"),
    isGroup: z.boolean(),
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
    teacherId: z.string(),

    imageUrl: z.string().nullable().optional(),

    categoryId: z.number(),
    level: z.string().min(1, "Level is required"),
    type: z.string(),
    description: z.string(),
    price: z.number().nonnegative("Price cannot be negative"),
    duration: z.number().nonnegative("Duration cannot be negative"),

    currency: z.string().min(1, "Currency is required"),
    practical: z.string().min(1, "Practical info is required"),
    salePrice: z
      .any()

      .transform((val) => {
        if (val === null || val === undefined) return null;

        const num = Number(val);

        if (Number.isNaN(num)) return null;

        return num;
      })
      .refine((val) => val === null || val > 0, {
        message: "Sale price must be positive",
      })
      .nullable()
      .optional(),

    features: z
      .array(featureValidation)
      .min(1, "At least one feature is required"),

    studyPlan: z
      .array(studyPlanValidation)
      .min(1, "At least one study plan is required"),

    certificate: z.string().min(1, "Certificate info is required"),
  })
  // ✅ FIXED: require at least one image source
  .refine(
    ({ imageUrl, img }) => {
      return (imageUrl && imageUrl.length > 0) || (img && img[0]);
    },
    {
      message: "Image is required (upload or existing)",
      path: ["img"], // attach error to img field
    },
  )
  .refine(
    ({ salePrice, price }) => {
      if (salePrice == null) return true; // no sale = OK
      return salePrice < price; // sale must be lower than price
    },
    {
      message: "Sale price must be lower than regular price",
      path: ["salePrice"],
    },
  );

// ✅ Correct type name
export type UpdateCourseFormModel = z.infer<typeof updateCourseValidation>;

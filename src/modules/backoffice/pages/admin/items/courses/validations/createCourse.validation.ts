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

// Main Course schema
export const createCourseValidation = z
  .object({
    title: z.string().min(1, "Title is required"),
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
    categoryId: z.number(),
    level: z.string().min(1, "Level is required"),
    price: z.number(),
    salePrice: z
      .any()
      .transform((val) => {
        if (val === "" || val === null || val === undefined) return null;

        const num = Number(val);

        if (Number.isNaN(num)) return null;

        return num;
      })
      .refine((val) => val === null || val > 0, {
        message: "Sale price must be positive",
      })
      .nullable()
      .optional(),
    duration: z.number(),
    teacherId: z.string(),
    type: z.string(),
    description: z.string(),
    currency: z.string().min(1, "Currency is required"),
    practical: z.string().min(1, "Practical info is required"),
    isGroup: z.boolean(),
    features: z
      .array(featureValidation)
      .min(1, "At least one feature is required"),
    studyPlan: z
      .array(studyPlanValidation)
      .min(1, "At least one study plan is required"),
    certificate: z.string().min(1, "Certificate info is required"),
  })
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

// TypeScript type (optional, inferred from Zod)
export type CreateCourseFormModel = z.infer<typeof createCourseValidation>;

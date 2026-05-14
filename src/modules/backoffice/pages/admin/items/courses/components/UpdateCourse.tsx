import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  updateCourseValidation,
  type UpdateCourseFormModel,
} from "../validations/updateCourse.validation";
import { useEffect, useState, type ChangeEvent } from "react";
import { IMAGE_SRC } from "../../../../../../../common/constants/constants";
import { useUpdateCourse } from "../api/hooks/useUpdateCourse";
import type { UpdateCourseModel } from "../models/updateCourse.model";
import { useGetTeachers } from "../../../../../../../common/api/hooks/useGetTeachers";
import { useGetCategories } from "../../categories/api/hooks/useGetCategories";
import { useGetByIdCourse } from "../api/hooks/useGetByIdCourse";

export const UpdateCourse = () => {
  const { courseId } = useParams();
  const { data: categories } = useGetCategories();
  const { data: course } = useGetByIdCourse(courseId);
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: updateCourse, isPending } = useUpdateCourse(String(courseId));
  const navigate = useNavigate();
  const { data: teachers } = useGetTeachers();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCourseFormModel>({
    resolver: zodResolver(updateCourseValidation),
    defaultValues: {
      title: "",
      imageUrl: "",
      img: null,
      level: "",
      price: NaN,
      salePrice: null,
      duration: NaN,
      currency: "",
      practical: "",
      isGroup: false,
      teacherId: "",
      features: [{ title: "" }],
      studyPlan: [{ title: "", description: "" }],
      certificate: "",
      description: "",
      type: "",
    },
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({ control, name: "features" });

  const {
    fields: studyPlanFields,
    append: appendStudyPlan,
    remove: removeStudyPlan,
  } = useFieldArray({ control, name: "studyPlan" });

  const onSubmit = (data: UpdateCourseFormModel) => {
    const dataToSend: UpdateCourseModel = {
      ...data,
      imageUrl: undefined,
      teacherId: data.teacherId === "" ? undefined : data.teacherId,
      salePrice: data.salePrice ? data.salePrice : undefined,
    };
    if (data.img) {
      dataToSend.img = data.img[0];
    } else {
      dataToSend.imageUrl = course?.imageUrl;
    }

    updateCourse(dataToSend, {
      onSuccess: () => {
        enqueueSnackbar("Course updated successfully!", {
          variant: "success",
        });
        navigate("/admin/courses");
      },
      onError: ({ message }) => {
        enqueueSnackbar(
          message || "Failed to update course. Please try again.",
          { variant: "error" },
        );
        navigate("/admin/courses");
      },
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    reset({
      ...course,
      teacherId: course?.teacherId ?? "",
      salePrice: course?.salePrice ?? undefined,
    });
  }, [course, reset]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      {/* Breadcrumbs */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <nav className="text-sm breadcrumbs">
          <ul className="flex gap-2 text-gray-600">
            <li>
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="hover:underline"
              >
                Admin
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigate("/admin/courses")}
                className="hover:underline"
              >
                Courses
              </button>
            </li>
            <li className="text-gray-800 font-semibold">
              Update Course {courseId}
            </li>
          </ul>
        </nav>
      </div>

      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Update Course</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            {...register("title")}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold text-sm text-gray-700">
            Course Image
          </label>

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            {...register("img")}
            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
            onChange={handleFileChange}
          />

          {/* Image Preview Container */}
          <div className="mt-2">
            {previewImage ? (
              <div className="relative w-48 h-32 rounded-xl overflow-hidden border shadow-sm">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-fill"
                />
              </div>
            ) : course?.imageUrl ? (
              <div className="relative w-48 h-32 rounded-xl overflow-hidden border shadow-sm">
                <img
                  src={`${IMAGE_SRC}${course.imageUrl}`}
                  alt="Course"
                  className="w-full h-full object-fill"
                />
              </div>
            ) : (
              <div className="w-48 h-32 flex items-center justify-center border rounded-xl text-gray-400 text-sm">
                No image selected
              </div>
            )}
          </div>

          {/* Error */}
          {errors.img && (
            <p className="text-red-500 text-sm mt-1">
              {errors.img.message?.toString()}
            </p>
          )}
        </div>

        {/* Category & Level */}
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <fieldset className="fieldset w-full">
              <label className="font-semibold">Category</label>
              <Controller
                name="categoryId"
                control={control}
                rules={{ required: "Please select a Category" }}
                render={({ field, fieldState }) => {
                  const value =
                    field.value !== undefined ? String(field.value) : "";

                  return (
                    <>
                      <select
                        {...field}
                        value={value} // string for the select
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? undefined : Number(val));
                        }}
                        className="select select-bordered w-full"
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {categories.map((el) => (
                          <option key={el.id} value={el.id}>
                            {el.name}
                          </option>
                        ))}
                      </select>
                      {fieldState.error && (
                        <p className="text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  );
                }}
              />
            </fieldset>
          </div>
          <div className="flex-1">
            <label className="font-semibold">Level</label>
            <input
              {...register("level")}
              className="input input-bordered w-full"
            />
            {errors.level && (
              <p className="text-red-500">{errors.level.message}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="font-semibold">Course Type</label>
            <input
              type="text"
              {...register("type")}
              className="input input-bordered w-full"
            />

            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="font-semibold">Duration (Month)</label>
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              className="input input-bordered w-full"
            />
            {errors.duration && (
              <p className="text-red-500">{errors.duration.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="font-semibold">Price</label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="input input-bordered w-full"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="font-semibold">Sale Price</label>
            <input
              type="number"
              {...register("salePrice", { valueAsNumber: true })}
              className="input input-bordered w-full"
            />
            {errors.salePrice && (
              <p className="text-red-500">{errors.salePrice?.message}</p>
            )}
          </div>
        </div>

        {/* Currency & Practical */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="font-semibold">Currency</label>
            <input
              {...register("currency")}
              className="input input-bordered w-full"
            />
            {errors.currency && (
              <p className="text-red-500">{errors.currency.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="font-semibold">Practical</label>
            <input
              {...register("practical")}
              className="input input-bordered w-full"
            />
            {errors.practical && (
              <p className="text-red-500">{errors.practical.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-2 items-center">
          <div className="flex items-center gap-2 w-full">
            <input
              type="checkbox"
              {...register("isGroup")}
              id="isGroup"
              className="checkbox"
            />
            <label htmlFor="isGroup">Is Group Course</label>
          </div>

          <fieldset className="fieldset w-full">
            <label className="font-semibold">Teacher</label>
            <Controller
              name="teacherId"
              control={control}
              rules={{ required: "Please select a teacher" }}
              render={({ field, fieldState }) => (
                <>
                  <select
                    {...field}
                    value={field.value}
                    className="select select-bordered w-full"
                  >
                    <option value="">No one</option>
                    {teachers.map((el) => (
                      <option key={el.id} value={el.id}>
                        {el.name} {el.lastName}
                      </option>
                    ))}
                  </select>
                  {fieldState.error && (
                    <p className="text-red-500">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />
          </fieldset>
        </div>

        {/* Features */}
        <div>
          <label className="font-semibold">Features</label>
          <div className="flex flex-col gap-2">
            {featureFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`features.${index}.title`)}
                  placeholder={`Feature ${index + 1}`}
                  className="input input-bordered flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="btn btn-sm btn-red"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => appendFeature({ title: "" })}
            className="btn btn-sm mt-2"
          >
            Add Feature
          </button>
        </div>

        {/* Study Plan */}
        <div>
          <label className="font-semibold">Study Plan</label>
          <div className="flex flex-col gap-2">
            {studyPlanFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`studyPlan.${index}.title`)}
                  placeholder="Title"
                  className="input input-bordered flex-1"
                />
                <input
                  {...register(`studyPlan.${index}.description`)}
                  placeholder="Description"
                  className="input input-bordered flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeStudyPlan(index)}
                  className="btn btn-sm btn-red"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => appendStudyPlan({ title: "", description: "" })}
            className="btn btn-sm mt-2"
          >
            Add Study Plan
          </button>
        </div>

        {/* Certificate */}
        <div>
          <label className="font-semibold">Certificate</label>
          <input
            {...register("certificate")}
            className="input input-bordered w-full"
          />
          {errors.certificate && (
            <p className="text-red-500">{errors.certificate.message}</p>
          )}
        </div>
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            {...register("description")}
            rows={4}
            className="textarea textarea-bordered w-full"
            placeholder="Enter course description..."
          />

          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending && <span className="loading loading-spinner"></span>}
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

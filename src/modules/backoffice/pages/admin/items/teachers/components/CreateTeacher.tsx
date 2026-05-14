import { useState, type ChangeEvent, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createTeacherValidation,
  type CreateTeacherFormModel,
} from "../validations/createTeacher.validation";
import type { CreateTeacherModel } from "../models/createTeacher.model";
import { useCreateTeacher } from "../api/hooks/useCreateTeacher";
import { zodResolver } from "@hookform/resolvers/zod";
import { enqueueSnackbar } from "notistack";

export const CreateTeacher: FC = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<null | string>(null);
  const { mutate, isPending } = useCreateTeacher();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTeacherFormModel>({
    defaultValues: {
      description: "",
      email: "",
      img: null,
      lastName: "",
      bio: "",
      name: "",
      phoneNumber: "",
    },
    resolver: zodResolver(createTeacherValidation),
  });

  const onSubmit = (data: CreateTeacherFormModel) => {
    const payload: CreateTeacherModel = {
      ...data,
      phoneNumber: data.phoneNumber ?? null,
      img: data.img[0],
    };
    mutate(payload, {
      onSuccess: () => {
        navigate("/admin/teachers");
      },
      onError: ({ message }) => {
        enqueueSnackbar(message || "Something went wrong. Please try again.", {
          variant: "error",
        });
      },
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="w-full p-4">
      {/* Breadcrumbs */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 mb-4">
        <nav className="text-sm breadcrumbs">
          <ul className="flex gap-2 text-gray-600">
            <li>
              <button
                onClick={() => navigate("/admin")}
                className="hover:underline"
              >
                Admin
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/teachers")}
                className="hover:underline"
              >
                Teachers
              </button>
            </li>
            <li className="text-gray-800 font-semibold">Create Teacher</li>
          </ul>
        </nav>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="label">Last Name</label>
          <input
            className="input input-bordered w-full"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="label">Bio</label>
          <input
            type="text"
            placeholder="CEO, Founder, CTO"
            className="input input-bordered w-full"
            {...register("bio", { required: "Bio is required" })}
          />
          {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone Number</label>
          <input
            className="input input-bordered w-full"
            {...register("phoneNumber")}
            placeholder="+374..."
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="label">Image</label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("img", {
              required: "Image is required",
            })}
            onChange={handleFileChange}
          />

          {previewImage && (
            <div className="mt-2 w-48 h-32 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-fill"
              />
            </div>
          )}
          {errors.img && (
            <p className="text-red-500">{errors.img.message?.toString()}</p>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end gap-3">
          <button
            className="btn btn-secondary"
            type="reset"
            onClick={() => navigate("/admin/teachers")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending && <span className="loading loading-spinner"></span>}
            Create Teacher
          </button>
        </div>
      </form>
    </div>
  );
};

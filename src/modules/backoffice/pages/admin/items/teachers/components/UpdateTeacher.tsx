import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateTeacherValidation,
  type UpdateTeacherFormModel,
} from "../validations/updateTeacher.validation";
import { IMAGE_SRC } from "../../../../../../../common/constants/constants";
import type { UpdateTeacherModel } from "../models/updateTeacher.model";
import { useUpdateTeacher } from "../api/hooks/useUpdateTeacher";
import { enqueueSnackbar } from "notistack";
import { useGetTeacherById } from "../api/hooks/useGetTeacherById";

export const UpdateTeacher: FC = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const { data: teacher } = useGetTeacherById(teacherId);
  const { mutate, isPending } = useUpdateTeacher(String(teacherId));
  const [previewImage, setPreviewImage] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateTeacherFormModel>({
    defaultValues: {
      description: "",
      email: "",
      bio: "",
      img: null,
      lastName: "",
      name: "",
      phoneNumber: "",
    },
    resolver: zodResolver(updateTeacherValidation),
  });

  const onSubmit = (data: UpdateTeacherFormModel) => {
    const payload: UpdateTeacherModel = {
      ...data,
      phoneNumber: data.phoneNumber || null,
      img: data.img[0],
      imageUrl: undefined,
    };

    if (data.img) {
      payload.img = data.img[0];
    } else {
      payload.imageUrl = teacher?.imageUrl;
    }
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

  useEffect(() => {
    reset({ ...teacher, phoneNumber: teacher?.phoneNumber ?? "" });
  }, [reset, teacher]);

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
            <li className="text-gray-800 font-semibold">
              Update Teacher {teacherId}
            </li>
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
        <div className="flex flex-col gap-2 w-full">
          <label className="font-semibold text-sm text-gray-700">
            Teacher Image
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
            ) : teacher?.imageUrl ? (
              <div className="relative w-48 h-32 rounded-xl overflow-hidden border shadow-sm">
                <img
                  src={`${IMAGE_SRC}${teacher.imageUrl}`}
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
            Update Teacher
          </button>
        </div>
      </form>
    </div>
  );
};

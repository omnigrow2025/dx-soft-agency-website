import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClear } from "react-icons/md";
import { useCreateCategory } from "../api/hooks/useCreateCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCategoryValidation,
  type CreateCategoryFormModel,
} from "../validation/createCategory.validation";
import { GET_CATEGORIES_QUERY_KEY } from "../../../../../../../common/api/constants/queryKeys";

export const CreateCategoryModal = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending: loading } = useCreateCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryFormModel>({
    defaultValues: {
      description: "",
      name: "",
    },
    resolver: zodResolver(createCategoryValidation),
  });

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data: CreateCategoryFormModel) => {
    mutate(data, {
      onSuccess: () => {
        enqueueSnackbar("Category created successfully!", {
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: [GET_CATEGORIES_QUERY_KEY],
        });
        handleClose();
      },
      onError: ({ message }) => {
        enqueueSnackbar(message || "Something went wrong. Please try again.", {
          variant: "error",
        });
      },
    });
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        Create Category
      </button>

      {/* Modal */}
      <dialog className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box w-11/12 max-w-md">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg mb-4">Create Category</h3>
            <div>
              <button onClick={handleClose}>
                <MdClear />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Category name"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="label">Description</label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading && <span className="loading loading-spinner"></span>}
                Create
              </button>
            </div>
          </form>
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleClose}>close</button>
        </form>
      </dialog>
    </>
  );
};

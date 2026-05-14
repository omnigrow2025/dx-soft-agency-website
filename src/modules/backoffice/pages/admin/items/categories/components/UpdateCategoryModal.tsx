import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { MdClear, MdEdit } from "react-icons/md";
import { useUpdateCategory } from "../api/hooks/useUpdateCategory";
import type { GetCategoryModel } from "../../../../../../../common/models/getCategory.model";
import type { UpdateCategoryModel } from "../models/updateCategory.model";
import { updateCategoryValidation } from "../validation/updateCategory.validation";
import { GET_CATEGORIES_QUERY_KEY } from "../../../../../../../common/api/constants/queryKeys";

interface UpdateCategoryModalProps {
  data: GetCategoryModel;
}

export const UpdateCategoryModal: FC<UpdateCategoryModalProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending: isUpdating } = useUpdateCategory(data.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCategoryModel>({
    resolver: zodResolver(updateCategoryValidation),
  });

  // ✅ Sync form when modal opens or data changes
  useEffect(() => {
    if (isOpen) {
      reset({
        name: data.name,
        description: data.description,
      });
    }
  }, [data, isOpen, reset]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleUpdateCategory = (formData: UpdateCategoryModel) => {
    mutate(formData, {
      onSuccess: () => {
        enqueueSnackbar("Category updated successfully!", {
          variant: "success",
        });

        queryClient.invalidateQueries({
          queryKey: [GET_CATEGORIES_QUERY_KEY],
        });

        handleCloseModal();
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
      {/* Open button */}
      <button
        className="btn btn-ghost btn-circle"
        onClick={() => setIsOpen(true)}
        aria-label="Edit category"
      >
        <MdEdit />
      </button>
      {/* Modal */}
      <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box w-11/12 max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Update Category #{data.id}</h3>
            <button
              onClick={handleCloseModal}
              type="button"
              aria-label="Close modal"
            >
              <MdClear size={20} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(handleUpdateCategory)}
            className="space-y-4"
          >
            {/* Name */}
            <div>
              <label className="label" htmlFor="update-category-name">
                Name
              </label>
              <input
                type="text"
                id="update-category-name"
                className="input input-bordered w-full"
                placeholder="Category name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="label" htmlFor="update-category-description">
                Description
              </label>
              <textarea
                id="update-category-description"
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleCloseModal}>
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isUpdating}
              >
                {isUpdating && (
                  <span className="loading loading-spinner"></span>
                )}
                Update
              </button>
            </div>
          </form>
        </div>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCloseModal}>close</button>
        </form>
      </dialog>
    </>
  );
};

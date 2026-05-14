import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { MdClear } from "react-icons/md";
import {
  createPartnerValidation,
  type CreatePartnerFormModel,
} from "../validations/createPartner.validation";
import type { CreatePartnerModel } from "../models/createPartner.model";
import { GET_PARTNERS_QUERY_KEY } from "../api/constants/queryKeys";
import { useCreatePartner } from "../api/hooks/useCreatePartner";

export const CreatePartner = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending: loading } = useCreatePartner();
  const [previewImage, setPreviewImage] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePartnerFormModel>({
    defaultValues: {
      logo: null,
      name: "",
      url: "",
    },
    resolver: zodResolver(createPartnerValidation),
  });

  const handleClose = () => {
    reset();
    setOpen(false);
    setPreviewImage(null);
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
  };

  const onSubmit = (data: CreatePartnerFormModel) => {
    const dataToSend: CreatePartnerModel = {
      ...data,
      logo: data.logo[0],
    };
    mutate(dataToSend, {
      onSuccess: () => {
        enqueueSnackbar("Partner created successfully!", {
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: [GET_PARTNERS_QUERY_KEY],
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        Add Partner
      </button>

      {/* Modal */}
      <dialog className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box w-11/12 max-w-md">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg mb-4">Create Partner</h3>
            <div>
              <button onClick={handleClose}>
                <MdClear />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label" htmlFor="create-partner-name">
                Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="create-partner-name"
                placeholder="Name"
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

            <div>
              <label className="label" htmlFor="create-partner-url">
                URL
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="create-partner-url"
                placeholder="URL"
                {...register("url", {
                  required: "URL is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="label">Logo</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("logo", {
                  required: "Logo is required",
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
              {errors.logo && (
                <p className="text-red-500">
                  {errors.logo.message?.toString()}
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

        <form method="dialog" className="modal-backdrop">
          <button onClick={handleClose}>close</button>
        </form>
      </dialog>
    </>
  );
};

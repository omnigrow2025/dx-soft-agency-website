import { Controller, useForm } from "react-hook-form";
import type { RegisterOfferModel } from "../models/registerOffer.model";
import { CiMail } from "react-icons/ci";
import { useRegisterOffer } from "../api/hooks/useRegisterOffer";
import { useSnackbar } from "notistack";
import { useState } from "react";

export const RegisterOffer = () => {
  const { mutate, isPending } = useRegisterOffer();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = useState(false); // modal state

  const {
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<RegisterOfferModel>({
    defaultValues: { email: "" },
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    resetForm();
    setIsOpen(false); // close modal
  };

  const onSubmit = (data: RegisterOfferModel) => {
    mutate(data, {
      onSuccess: () => {
        enqueueSnackbar("Registration email sent successfully", {
          variant: "success",
        });
        handleClose(); // closes modal
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
      <button className="btn btn-secondary" onClick={handleOpen}>
        Register Offer
      </button>

      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h3 className="text-lg font-bold">Register Offer</h3>
            <p className="py-2">Send registration email</p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <div className="w-full">
                    <label className="input input-bordered w-full flex items-center gap-2">
                      <CiMail />
                      <input
                        {...field}
                        type="email"
                        placeholder="mail@site.com"
                        className="w-full"
                      />
                    </label>
                    {error && (
                      <span className="text-error text-sm mt-1">
                        {error.message}
                      </span>
                    )}
                  </div>
                )}
              />

              <button
                disabled={isPending}
                type="submit"
                className="btn btn-primary mt-2 flex items-center gap-2"
              >
                {isPending && <span className="loading loading-spinner"></span>}
                Send
              </button>
            </form>

            <div className="modal-action">
              <button className="btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={handleClose}></div>
        </div>
      )}
    </>
  );
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { MdClear, MdEdit } from "react-icons/md";
import type { GetFaqModel } from "../models/getFaq.model";
import { useUpdateFaq } from "../api/hooks/useUpdateFaq";
import {
  faqValidation,
  type FaqFormModel,
} from "../validations/faq.validation";
import { GET_FAQ_QUERY_KEY } from "../api/constants/queryKeys";

interface UpdateFaqModalProps {
  data: GetFaqModel;
}

export const UpdateFaq: FC<UpdateFaqModalProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending: isUpdating } = useUpdateFaq(data.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqFormModel>({
    resolver: zodResolver(faqValidation),
  });

  // ✅ Sync form when modal opens or data changes
  useEffect(() => {
    if (isOpen) {
      reset({
        answer: data.answer,
        question: data.question,
      });
    }
  }, [data, isOpen, reset]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleUpdateCategory = (formData: FaqFormModel) => {
    mutate(formData, {
      onSuccess: () => {
        enqueueSnackbar("FAQ updated successfully!", {
          variant: "success",
        });

        queryClient.invalidateQueries({
          queryKey: [GET_FAQ_QUERY_KEY],
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
        aria-label="Edit faq"
      >
        <MdEdit />
      </button>
      {/* Modal */}
      <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box w-11/12 max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Update Faq #{data.id}</h3>
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
              <label className="label" htmlFor="update-faq-question">
                Question
              </label>
              <input
                type="text"
                id="update-faq-question"
                className="input input-bordered w-full"
                placeholder="Question"
                {...register("question")}
              />
              {errors.question && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.question.message}
                </p>
              )}
            </div>

            <div>
              <label className="label" htmlFor="update-faq-answer">
                Answer
              </label>
              <textarea
                id="update-faq-answer"
                className="textarea textarea-bordered w-full"
                placeholder="Answer..."
                {...register("answer")}
              />
              {errors.answer && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.answer.message}
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

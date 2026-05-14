import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClear } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  faqValidation,
  type FaqFormModel,
} from "../validations/faq.validation";
import { GET_FAQ_QUERY_KEY } from "../api/constants/queryKeys";
import { useCreateFaq } from "../api/hooks/useCreateFaq";

export const CreateFaq = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending: loading } = useCreateFaq();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqFormModel>({
    defaultValues: {
      answer: "",
      question: "",
    },
    resolver: zodResolver(faqValidation),
  });

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = (data: FaqFormModel) => {
    mutate(data, {
      onSuccess: () => {
        enqueueSnackbar("FAQ created successfully!", {
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: [GET_FAQ_QUERY_KEY],
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
        Add FAQ
      </button>

      {/* Modal */}
      <dialog className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box w-11/12 max-w-md">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg mb-4">Create Faq</h3>
            <div>
              <button onClick={handleClose}>
                <MdClear />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label" htmlFor="create-faq-question">
                Question
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                id="create-faq-question"
                placeholder="Question"
                {...register("question", {
                  required: "Question is required",
                  minLength: { value: 2, message: "Min 2 characters" },
                })}
              />
              {errors.question && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.question.message}
                </p>
              )}
            </div>

            <div>
              <label className="label" htmlFor="create-faq-answer">
                Answer
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Answer..."
                id="create-faq-answer"
                rows={2}
                {...register("answer", {
                  required: "Answer is required",
                })}
              />
              {errors.answer && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.answer.message}
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

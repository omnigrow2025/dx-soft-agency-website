import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { useSupportRequest } from "../api/hooks/useSupportRequest";
import {
  supportRequestValidation,
  type SupportRequestFormModel,
} from "../validations/supportRequest.validation";

export const SupportRequest = () => {
  const {
    mutate,
    isPending,
    isError,
    isSuccess,
    reset: resetMutation,
  } = useSupportRequest();

  const { reset, register, handleSubmit } = useForm<SupportRequestFormModel>({
    defaultValues: {
      email: "",
      fullname: "",
      message: "",
      phoneNumber: "",
    },
    resolver: zodResolver(supportRequestValidation),
  });

  const onSubmit = (data: SupportRequestFormModel) => {
    resetMutation(); // clear previous state
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="p-4" id="supportRequest">
      {!isSuccess ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              {...register("fullname")}
              className="input input-ghost border-0 border-b-2 border-gray-300 focus:border-primary rounded-none outline-0 w-full"
              placeholder="Անուն, Ազգանուն"
            />

            <input
              {...register("email")}
              type="email"
              className="input input-ghost border-0 border-b-2 border-gray-300 focus:border-primary rounded-none outline-0 w-full"
              placeholder="Էլ․ հասցե"
            />

            <input
              {...register("phoneNumber")}
              type="tel"
              className="input input-ghost border-0 border-b-2 border-gray-300 focus:border-primary rounded-none outline-0 w-full"
              placeholder="Հեռախոսահամար"
            />

            <div className="md:col-span-3">
              <textarea
                {...register("message")}
                rows={3}
                className="textarea textarea-ghost border-0 border-b-2 border-gray-300 focus:border-primary rounded-none outline-0 w-full resize-none"
                placeholder="Ձեր Նամակը"
              />
            </div>
          </div>

          {/* ❌ ERROR MESSAGE */}
          {isError && (
            <p className="text-red-600 mt-3 text-sm font-medium">
              Սխալ տեղի ունեցավ, փորձեք կրկին
            </p>
          )}

          <div className="flex justify-between flex-col md:flex-row items-center gap-4 mt-4">
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-secondary text-white font-medium rounded-full hover:shadow-lg transition"
            >
              {isPending && <span className="loading loading-spinner"></span>}
              Ուղարկել Նամակը <GoArrowRight />
            </button>

            <div className="flex gap-2 items-center">
              <a
                href="https://www.facebook.com/omnidxaca"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-circle border-gray-300 hover:border-primary hover:bg-gray-100"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/_omnidx_academy_/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-circle border-gray-300 hover:border-primary hover:bg-gray-100"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <AiOutlineCheckCircle className="text-6xl text-green-500" />
          <p className="text-lg font-semibold text-center text-green-600">
            Ձեր նամակը հաջողությամբ ուղարկվել է!
          </p>
        </div>
      )}
    </div>
  );
};

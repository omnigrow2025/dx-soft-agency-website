import { type FC, useEffect } from "react";
import { IoMdBookmarks } from "react-icons/io";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { GetCourseModel } from "../../../common/models/getCourse.model";
import {
  registerValidation,
  type RegisterFormModel,
} from "../pages/validations/register.validation";
import { useEnrollInCourse } from "../api/hooks/useEnrollInCourse.ts";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: GetCourseModel;
}

export const RegistrationModal: FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  const { register, handleSubmit, reset } = useForm<RegisterFormModel>({
    defaultValues: {
      email: "",
      fullname: "",
      phoneNumber: "",
    },
    resolver: zodResolver(registerValidation),
  });

  const {
    mutateAsync: enroll,
    isSuccess,
    isError,
    isPending,
    reset: resetMutation,
  } = useEnrollInCourse();

  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      const timer = setTimeout(() => {
        resetMutation(); // reset mutation state
        onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose, reset, resetMutation]);

  const onEnrollSubmit = async (data: RegisterFormModel) => {
    await enroll({
      ...data,
      courseId: course.id,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* SUCCESS */}
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <AiOutlineCheckCircle className="text-7xl text-success animate-bounce" />
            <h3 className="text-xl font-bold text-[#1F3530]">Հաջող գրանցում</h3>
            <p className="text-gray-500">Ձեր հայտը հաջողությամբ ուղարկվել է։</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00B4D8]">
                <IoMdBookmarks className="text-2xl text-white" />
              </div>

              <div>
                <p className="text-gray-400 text-sm font-medium">
                  {course.title}
                </p>
                <h2 className="text-[#1F3530] text-xl md:text-2xl font-bold">
                  Գրանցվել դասընթացին
                </h2>
              </div>
            </div>

            {/* ERROR */}
            {isError && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">
                <MdErrorOutline className="text-md" />
                <span className="text-sm">
                  Չհաջողվեց ուղարկել հայտը։ Խնդրում ենք փորձել կրկին։
                </span>
              </div>
            )}

            {/* FORM */}
            <form className="space-y-8" onSubmit={handleSubmit(onEnrollSubmit)}>
              <div className="border-b border-gray-200 py-2">
                <input
                  {...register("fullname")}
                  type="text"
                  placeholder="Անուն, Ազգանուն"
                  className="w-full bg-transparent outline-none text-[#1F3530]"
                />
              </div>

              <div className="border-b border-gray-200 py-2">
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  placeholder="Հեռախոսահամար"
                  className="w-full bg-transparent outline-none text-[#1F3530]"
                />
              </div>

              <div className="border-b border-gray-200 py-2">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Էլ․հասցե"
                  className="w-full bg-transparent outline-none text-[#1F3530]"
                />
              </div>

              {/* BUTTON */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-secondary hover:bg-secondary-light active:scale-95 disabled:opacity-50 rounded-full text-white px-12 py-4 font-bold text-lg transition-all shadow-lg flex items-center gap-2"
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Ուղարկվում...
                    </>
                  ) : (
                    "Հաստատել"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

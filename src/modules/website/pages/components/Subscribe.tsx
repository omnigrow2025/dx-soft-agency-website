import { type FC } from "react";
import bgImage from "../../../../assets/subscribe-background.png";
import { Typography } from "../../../../common/components/Typography";
import { useForm } from "react-hook-form";
import type { SubscribeFormModel } from "../validations/subscribe.validation";
import { useSubscribe } from "../api/hooks/useSubscribe";

export const Subscribe: FC = () => {
  const { register, handleSubmit, reset } = useForm<SubscribeFormModel>({
    defaultValues: {
      email: "",
    },
  });
  const { mutate, isPending, isSuccess, isError } = useSubscribe();

  const onSubmit = (data: SubscribeFormModel) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div
      className="p-5 min-h-40 flex items-center justify-between flex-wrap lg:flex-nowrap gap-3"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-w-0 max-w-full md:max-w-1/3">
        <Typography
          className="text-2xl"
          text="Ստացե՜ք նորություններ և առաջարկներ անմիջապես Ձեր էլ. փոստին"
        />
      </div>

      <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center bg-white justify-between min-w-50">
          <div className="flex-1">
            <input
              {...register("email")}
              type="email"
              className="input input-xl bg-transparent outline-0 border-0 shadow-none w-full"
              placeholder="Էլ․ Հասցե"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-neutral rounded-full btn-sm md:btn-md"
            >
              {isPending && <span className="loading loading-spinner"></span>}
              Բաժանորդագրվել
            </button>
          </div>
        </div>
        {isSuccess && (
          <p className="text-green-600 mt-2 text-sm font-medium">
            Բաժանորդագրվել է հաջողությամբ!
          </p>
        )}
        {isError && (
          <p className="text-red-600 mt-2 text-sm font-medium">
            Սխալ տեղի ունեցավ, փորձեք կրկին
          </p>
        )}
      </form>
    </div>
  );
};

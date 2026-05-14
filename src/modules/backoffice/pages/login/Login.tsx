import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation } from "./validation/login.validation";
import type { LoginFormModel } from "./model/loginForm.model";
import { useLogin } from "../../api/hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { enqueueSnackbar } from "notistack";

export const Login = () => {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginFormModel>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginValidation),
  });

  const onSubmit = (data: LoginFormModel) => {
    mutate(data, {
      onSuccess: ({ data }) => {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      },
      onError: ({ message }) => {
        enqueueSnackbar(message || "Something went wrong. Pleas try again.", {
          variant: "error",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-base-100 p-8 rounded-2xl shadow-xl flex flex-col gap-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          {/* EMAIL */}
          <Controller
            name="email"
            control={control}
            render={({
              field: { onBlur, onChange, name, value },
              fieldState: { error },
            }) => (
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="input input-bordered w-full flex items-center gap-2"
                >
                  <MdOutlineAlternateEmail />
                  <input
                    className="grow"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    type="email"
                    placeholder="mail@site.com"
                    autoComplete="email"
                    aria-label="Email address"
                    id="email"
                  />
                </label>

                {error && (
                  <p className="text-error text-sm mt-1">{error.message}</p>
                )}
              </div>
            )}
          />

          {/* PASSWORD */}
          <Controller
            control={control}
            name="password"
            render={({
              field: { onBlur, onChange, value, name },
              fieldState: { error },
            }) => (
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="input input-bordered w-full flex items-center gap-2"
                >
                  <TbLockPassword />

                  <input
                    className="grow"
                    type="password"
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    placeholder="Password"
                    onChange={onChange}
                    autoComplete="current-password"
                    aria-label="Password"
                    id="password"
                  />
                </label>

                {error && (
                  <p className="text-error text-sm mt-1">{error.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {/* BUTTON */}
        <button
          className={`btn btn-neutral w-full rounded-full flex items-center gap-2`}
          type="submit"
          disabled={isPending}
        >
          {isPending && <span className="loading loading-spinner"></span>}
          Login
        </button>
      </form>
    </div>
  );
};

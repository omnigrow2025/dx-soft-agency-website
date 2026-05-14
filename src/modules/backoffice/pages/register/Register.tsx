import { Controller, useForm } from "react-hook-form";
import type { RegisterModel } from "./models/registerModel";
import { useRegister } from "./api/hooks/useRegister";
import { useNavigate, useSearchParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerValidation,
  type RegisterFormModel,
} from "./validations/register.validation";

export const Register = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? ""; // get token from query
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister(token);
  const { control, handleSubmit } = useForm<RegisterFormModel>({
    defaultValues: {
      lastName: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(registerValidation),
  });

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <p className="text-error">Invalid or missing registration token.</p>
      </div>
    );
  }

  const onSubmit = (data: RegisterFormModel) => {
    const dataToSend: RegisterModel = {
      lastName: data.lastName.trim(),
      name: data.name.trim(),
      password: data.password,
    };

    mutate(dataToSend, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: ({ message }) => {
        enqueueSnackbar(message || "Something went wrong. Please try again.", {
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
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          {/* Name */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field, fieldState }) => (
              <div className="w-full">
                <input
                  {...field}
                  type="text"
                  placeholder="Name"
                  className="input w-full"
                  aria-label="name"
                />
                {fieldState.error && (
                  <p className="text-error text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Last Name */}
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "Last name is required" }}
            render={({ field, fieldState }) => (
              <div className="w-full">
                <input
                  {...field}
                  type="text"
                  placeholder="Last Name"
                  className="input w-full"
                />
                {fieldState.error && (
                  <p className="text-error text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field, fieldState }) => (
              <div className="w-full">
                <label className="input input-bordered w-full flex items-center gap-2">
                  <input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className="grow"
                  />
                </label>
                {fieldState.error && (
                  <p className="text-error text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="passwordConfirmation"
            control={control}
            rules={{
              required: "Confirm password is required",
              validate: (value, formValues) =>
                value === formValues.password || "Passwords do not match",
            }}
            render={({ field, fieldState }) => (
              <div className="w-full">
                <label className="input input-bordered w-full flex items-center gap-2">
                  <input
                    {...field}
                    type="password"
                    placeholder="Confirm Password"
                    className="grow"
                  />
                </label>
                {fieldState.error && (
                  <p className="text-error text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-neutral w-full rounded-full flex items-center justify-center gap-2"
          disabled={isPending}
        >
          {isPending && <span className="loading loading-spinner"></span>}
          Register
        </button>
      </form>
    </div>
  );
};

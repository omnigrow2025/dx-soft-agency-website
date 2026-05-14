import { useMutation } from "@tanstack/react-query";
import type { LoginModel } from "../../pages/login/model/login.model";
import { masterUserApi } from "../masterUser.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginModel) => masterUserApi.login(data),
  });
};

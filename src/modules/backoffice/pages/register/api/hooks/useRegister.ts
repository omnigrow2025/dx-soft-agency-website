import { useMutation } from "@tanstack/react-query";
import type { RegisterModel } from "../../models/registerModel";
import { masterUserApi } from "../../../../api/masterUser.api";

export const useRegister = (token: string) => {
  return useMutation({
    mutationFn: (data: RegisterModel) => masterUserApi.register(token, data),
  });
};

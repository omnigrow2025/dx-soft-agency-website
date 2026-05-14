import { useMutation } from "@tanstack/react-query";
import { masterUserApi } from "../../../../../../api/masterUser.api";
import type { RegisterOfferModel } from "../../models/registerOffer.model";

export const useRegisterOffer = () => {
  return useMutation({
    mutationFn: (data: RegisterOfferModel) => masterUserApi.sendOffer(data),
  });
};

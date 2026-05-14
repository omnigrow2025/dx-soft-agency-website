import { useMutation } from "@tanstack/react-query";
import type { CreatePartnerModel } from "../../models/createPartner.model";
import { partnersApi } from "../partners.api";

export const useCreatePartner = () => {
  return useMutation({
    mutationFn: (data: CreatePartnerModel) => partnersApi.create(data),
  });
};

import { useMutation } from "@tanstack/react-query";
import { partnersApi } from "../partners.api";

export const useDeletePartner = () => {
  return useMutation({
    mutationFn: (id: number) => partnersApi.delete(id),
  });
};

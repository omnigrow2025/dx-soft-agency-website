import { useMutation } from "@tanstack/react-query";
import { faqApi } from "../faq.api";

export const useDeleteFaq = () => {
  return useMutation({
    mutationFn: (id: number) => faqApi.delete(id),
  });
};

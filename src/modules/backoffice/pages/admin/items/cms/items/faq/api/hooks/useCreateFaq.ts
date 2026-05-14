import { useMutation } from "@tanstack/react-query";
import { faqApi } from "../faq.api";
import type { FaqItem } from "../../../../../../../../../../common/models/faq.model";

export const useCreateFaq = () => {
  return useMutation({
    mutationFn: (data: FaqItem) => faqApi.create(data),
  });
};

import { faqClient } from "../../../../../../../../../common/api/httpClient";
import type { FaqItem } from "../../../../../../../../../common/models/faq.model";
import type { GetFaqModel } from "../models/getFaq.model";

export const faqApi = {
  get() {
    return faqClient.get<GetFaqModel[]>("/");
  },

  delete(id: number) {
    return faqClient.delete(`${id}`);
  },

  create(data: FaqItem) {
    return faqClient.post("/", data);
  },

  update(id: number, data: FaqItem) {
    return faqClient.put(`${id}`, data);
  },
};

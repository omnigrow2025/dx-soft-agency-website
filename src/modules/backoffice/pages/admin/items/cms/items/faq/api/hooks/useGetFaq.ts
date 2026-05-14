import { useQuery } from "@tanstack/react-query";
import { GET_FAQ_QUERY_KEY } from "../constants/queryKeys";
import { faqApi } from "../faq.api";

export const useGetFaq = () => {
  return useQuery({
    queryKey: [GET_FAQ_QUERY_KEY],
    queryFn: async () => {
      const { data } = await faqApi.get();
      return data;
    },
    initialData: [],
  });
};

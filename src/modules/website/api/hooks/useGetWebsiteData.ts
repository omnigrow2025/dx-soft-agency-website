import { useQuery } from "@tanstack/react-query";
import { GET_WEBSITE_DATA_QUERY_KEY } from "../constants/query.keys";
import { websiteApi } from "../website.api";

export const useGetWebsiteData = () => {
  return useQuery({
    queryKey: [GET_WEBSITE_DATA_QUERY_KEY],
    queryFn: async () => {
      const { data } = await websiteApi.getWebsiteData();
      return data;
    },
    placeholderData: (prev) => prev,
  });
};

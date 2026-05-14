import { useQuery } from "@tanstack/react-query";
import { GET_SUPPORT_REQUESTS_QUERY_KEY } from "../constants/queryKeys";
import type { SupportRequestsQueryModel } from "../../models/supportRequestsQuery.model";
import { supportRequestsApi } from "../../../../../../../../common/api/supportRequests.api";

export const useGetSupportRequests = (query: SupportRequestsQueryModel) => {
  return useQuery({
    queryKey: [GET_SUPPORT_REQUESTS_QUERY_KEY, query],
    queryFn: async () => {
      const { data } = await supportRequestsApi.getList(query);
      return data;
    },
  });
};

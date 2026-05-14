import { useQuery } from "@tanstack/react-query";
import type { SubscribersQueryModel } from "../../models/subscribersQuery.model";
import { GET_SUBSCRIBERS_QUERY_KEY } from "../constants/queryKeys";
import { subscribersApi } from "../../../../../../../../common/api/subscribers.api";

export const useGetSubscribers = (query: SubscribersQueryModel) => {
  return useQuery({
    queryKey: [GET_SUBSCRIBERS_QUERY_KEY, query],
    queryFn: async () => {
      const { data } = await subscribersApi.getList(query);
      return data;
    },
  });
};

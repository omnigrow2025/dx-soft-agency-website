import { useQuery } from "@tanstack/react-query";
import { GET_PARTNERS_QUERY_KEY } from "../constants/queryKeys";
import { partnersApi } from "../partners.api";
import type { PartnersQueryModel } from "../../models/partnersQuery.model";

export const useGetPartners = (query: PartnersQueryModel) => {
  return useQuery({
    queryKey: [GET_PARTNERS_QUERY_KEY, query],
    queryFn: async () => {
      const { data } = await partnersApi.get(query);
      return data;
    },
  });
};

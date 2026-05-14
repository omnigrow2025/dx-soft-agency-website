import type { MasterUserQueryModel } from "../../models/masterUsersQuery.model";
import { GET_MASTER_USERS_QUERY_KEY } from "../constants/queryKeys";
import { masterUserApi } from "../../../../../../api/masterUser.api";
import { useQuery } from "@tanstack/react-query";

export const useGetMasterUser = (query: MasterUserQueryModel) => {
  return useQuery({
    queryKey: [GET_MASTER_USERS_QUERY_KEY, query],
    queryFn: async () => {
      const { data } = await masterUserApi.get(query);
      return data;
    },
  });
};

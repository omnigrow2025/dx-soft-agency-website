import { useQuery } from "@tanstack/react-query";
import { enrollmentsApi } from "../../../../../../../../common/api/enrollments.api";
import type { EnrollmentsListQueryOptionModel } from "../../models/enrollmentsQuery.model";
import { GET_ENROLLMENTS_QUERY_KEY } from "../constants/queryKeys";

export const useGteEnrollments = (query: EnrollmentsListQueryOptionModel) => {
  return useQuery({
    queryKey: [GET_ENROLLMENTS_QUERY_KEY, query],
    queryFn: async () => {
      const { data } = await enrollmentsApi.get(query);
      return data;
    },
  });
};

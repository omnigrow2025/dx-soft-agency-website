import { useQuery } from "@tanstack/react-query";
import { GET_BY_ID_COURSE_QUERY_KEY } from "../../../../../../../../common/api/constants/queryKeys";
import { coursesApi } from "../../../../../../../../common/api/courses.api";

export const useGetByIdCourse = (id?: string) => {
  return useQuery({
    queryKey: [GET_BY_ID_COURSE_QUERY_KEY, id],
    queryFn: async () => {
      if (!id) return;
      const { data } = await coursesApi.getById(id);
      return data;
    },
    enabled: !!id,
  });
};

import { useQuery } from "@tanstack/react-query";
import { GET_COURSES_QUERY_KEY } from "../constants/queryKeys";
import { coursesApi } from "../../../../../../../../common/api/courses.api";
import type { CoursesQueryModel } from "../../models/coursesQuery.model";

export const useGetCourses = (query: CoursesQueryModel) => {
  return useQuery({
    queryKey: [GET_COURSES_QUERY_KEY, query],
    queryFn: async () => {
      const { data } = await coursesApi.get(query);
      return data;
    },
  });
};

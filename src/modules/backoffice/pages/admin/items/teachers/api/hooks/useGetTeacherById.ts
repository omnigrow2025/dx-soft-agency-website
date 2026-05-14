import { useQuery } from "@tanstack/react-query";
import { GET_TEACHER_BY_ID_QUERY_KEY } from "../../../../../../../../common/api/constants/queryKeys";
import { teachersApi } from "../../../../../../../../common/api/teachers.api";

export const useGetTeacherById = (id?: string) => {
  return useQuery({
    queryKey: [GET_TEACHER_BY_ID_QUERY_KEY, id],
    queryFn: async () => {
      if (!id) return;
      const { data } = await teachersApi.getById(id);
      return data;
    },
    enabled: !!id,
  });
};

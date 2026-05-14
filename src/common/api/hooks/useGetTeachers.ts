import { useQuery } from "@tanstack/react-query";
import { teachersApi } from "../teachers.api";
import { GET_TEACHERS_QUERY_KEY } from "../constants/queryKeys";

export const useGetTeachers = () => {
  return useQuery({
    queryKey: [GET_TEACHERS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await teachersApi.getAll();
      return data;
    },
    initialData: [],
  });
};

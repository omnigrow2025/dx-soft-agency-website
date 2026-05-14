import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../../../../../../../../common/api/categories.api";
import { GET_CATEGORIES_QUERY_KEY } from "../../../../../../../../common/api/constants/queryKeys";

export const useGetCategories = () => {
  return useQuery({
    queryKey: [GET_CATEGORIES_QUERY_KEY],
    queryFn: async () => {
      const { data } = await categoriesApi.get();
      return data;
    },
    initialData: [],
  });
};

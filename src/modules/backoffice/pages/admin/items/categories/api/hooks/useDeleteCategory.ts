import { useMutation } from "@tanstack/react-query";
import { categoriesApi } from "../../../../../../../../common/api/categories.api";

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: number) => categoriesApi.delete(id),
  });
};

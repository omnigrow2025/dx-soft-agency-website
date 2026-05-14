import { useMutation } from "@tanstack/react-query";
import type { UpdateCategoryModel } from "../../models/updateCategory.model";
import { categoriesApi } from "../../../../../../../../common/api/categories.api";

export const useUpdateCategory = (id: number) => {
  return useMutation({
    mutationFn: (data: UpdateCategoryModel) => categoriesApi.update(id, data),
  });
};

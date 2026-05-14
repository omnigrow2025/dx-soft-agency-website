import { useMutation } from "@tanstack/react-query";
import { categoriesApi } from "../../../../../../../../common/api/categories.api";
import type { CreateCategoryModel } from "../../models/createCategory.model";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data: CreateCategoryModel) => categoriesApi.create(data),
  });
};

import { categoriesClient } from "./httpClient";
import type { CreateCategoryModel } from "../../modules/backoffice/pages/admin/items/categories/models/createCategory.model";
import type { GetCategoriesModel } from "../../modules/backoffice/pages/admin/items/categories/models/getCategories.model";
import type { UpdateCategoryModel } from "../../modules/backoffice/pages/admin/items/categories/models/updateCategory.model";

export const categoriesApi = {
  get() {
    return categoriesClient.get<GetCategoriesModel>("");
  },

  create(data: CreateCategoryModel) {
    return categoriesClient.post("", data);
  },

  update(id: number, data: UpdateCategoryModel) {
    return categoriesClient.put(`${id}`, data);
  },

  delete(id: number) {
    return categoriesClient.delete(`${id}`);
  },
};

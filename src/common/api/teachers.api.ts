import { teachersClient } from "./httpClient";
import type { CreateTeacherModel } from "../../modules/backoffice/pages/admin/items/teachers/models/createTeacher.model";
import type { GetTeacherModel } from "../models/getTeacher.model";
import type { GetTeachersModel } from "../models/getTeachers.model";
import type { UpdateTeacherModel } from "../../modules/backoffice/pages/admin/items/teachers/models/updateTeacher.model";

export const teachersApi = {
  getAll() {
    return teachersClient.get<GetTeachersModel>("");
  },
  getFree() {
    return teachersClient.get<GetTeachersModel>("free");
  },
  getById(id: string) {
    return teachersClient.get<GetTeacherModel>(`${id}`);
  },
  delete(id: string) {
    return teachersClient.delete(`${id}`);
  },
  create(data: CreateTeacherModel) {
    return teachersClient.post("", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  update(id: string, data: UpdateTeacherModel) {
    return teachersClient.put(`${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

import { coursesClient } from "./httpClient";
import type { CoursesQueryModel } from "../../modules/backoffice/pages/admin/items/courses/models/coursesQuery.model";
import type { CreateCourseModel } from "../../modules/backoffice/pages/admin/items/courses/models/createCourse.model";
import type { GetCourseModel } from "../models/getCourse.model";
import type { UpdateCourseModel } from "../../modules/backoffice/pages/admin/items/courses/models/updateCourse.model";
import type { GetCoursesModel } from "../models/getCourses.model";
import type { ChangeCourseState } from "../../modules/backoffice/pages/admin/items/courses/models/changeCourseState.model";

export const coursesApi = {
  get(params: CoursesQueryModel) {
    return coursesClient.get<GetCoursesModel>("", {
      params,
    });
  },
  delete(id: string) {
    return coursesClient.delete(`${id}`);
  },
  create(data: CreateCourseModel) {
    return coursesClient.post("", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getById(id: string) {
    return coursesClient.get<GetCourseModel>(`${id}`);
  },
  update(id: string, data: UpdateCourseModel) {
    return coursesClient.put(`${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  changeState(id: string, data: ChangeCourseState) {
    return coursesClient.patch(`change-state/${id}`, data);
  },
};

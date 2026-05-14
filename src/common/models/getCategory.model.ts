import type { GetCourseModel } from "./getCourse.model";

export interface GetCategoryModel {
  id: number;
  name: string;
  description: string;
  courses: GetCourseModel[];
}

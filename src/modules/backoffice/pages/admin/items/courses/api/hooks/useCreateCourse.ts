import { useMutation } from "@tanstack/react-query";
import { coursesApi } from "../../../../../../../../common/api/courses.api";
import type { CreateCourseModel } from "../../models/createCourse.model";

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: (data: CreateCourseModel) => coursesApi.create(data),
  });
};

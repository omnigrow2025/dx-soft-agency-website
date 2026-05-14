import { useMutation } from "@tanstack/react-query";
import { coursesApi } from "../../../../../../../../common/api/courses.api";
import type { UpdateCourseModel } from "../../models/updateCourse.model";

export const useUpdateCourse = (id: string) => {
  return useMutation({
    mutationFn: (data: UpdateCourseModel) => coursesApi.update(id, data),
  });
};

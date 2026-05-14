import { useMutation } from "@tanstack/react-query";
import { coursesApi } from "../../../../../../../../common/api/courses.api";

export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: (id: string) => coursesApi.delete(id),
  });
};

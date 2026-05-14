import { useMutation } from "@tanstack/react-query";
import { teachersApi } from "../../../../../../../../common/api/teachers.api";
import type { UpdateTeacherModel } from "../../models/updateTeacher.model";

export const useUpdateTeacher = (id: string) => {
  return useMutation({
    mutationFn: async (data: UpdateTeacherModel) => {
      return teachersApi.update(id, data);
    },
  });
};

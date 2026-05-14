import { useMutation } from "@tanstack/react-query";
import type { CreateTeacherModel } from "../../models/createTeacher.model";
import { teachersApi } from "../../../../../../../../common/api/teachers.api";

export const useCreateTeacher = () => {
  return useMutation({
    mutationFn: (data: CreateTeacherModel) => teachersApi.create(data),
  });
};

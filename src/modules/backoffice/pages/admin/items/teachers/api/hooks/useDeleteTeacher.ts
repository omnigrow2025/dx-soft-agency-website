import { useMutation } from "@tanstack/react-query";
import { teachersApi } from "../../../../../../../../common/api/teachers.api";

export const useDeleteTeacher = () => {
  return useMutation({
    mutationFn: (id: string) => teachersApi.delete(id),
  });
};

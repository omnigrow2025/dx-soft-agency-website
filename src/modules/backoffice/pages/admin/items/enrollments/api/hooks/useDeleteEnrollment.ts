import { useMutation } from "@tanstack/react-query";
import { enrollmentsApi } from "../../../../../../../../common/api/enrollments.api";

export const useDeleteEnrollment = () => {
  return useMutation({
    mutationFn: (id: number) => enrollmentsApi.delete(id),
  });
};

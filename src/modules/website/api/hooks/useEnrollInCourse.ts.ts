import { useMutation } from "@tanstack/react-query";
import { enrollmentsApi } from "../../../../common/api/enrollments.api";

export const useEnrollInCourse = () => {
  return useMutation({
    mutationFn: enrollmentsApi.create, // or enroll
  });
};

import { useMutation } from "@tanstack/react-query";
import { coursesApi } from "../../../../../../../../common/api/courses.api";
import type { ChangeCourseState } from "../../models/changeCourseState.model";

export const useChangeCourseState = (id: string) => {
  return useMutation({
    mutationFn: (data: ChangeCourseState) => coursesApi.changeState(id, data),
  });
};

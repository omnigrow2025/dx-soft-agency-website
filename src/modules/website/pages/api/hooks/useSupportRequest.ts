import { useMutation } from "@tanstack/react-query";
import { supportRequestsApi } from "../../../../../common/api/supportRequests.api";
import type { CreateSupportRequestModel } from "../../../../../common/models/createSupportRequest.model";

export const useSupportRequest = () => {
  return useMutation({
    mutationFn: (data: CreateSupportRequestModel) =>
      supportRequestsApi.create(data),
  });
};

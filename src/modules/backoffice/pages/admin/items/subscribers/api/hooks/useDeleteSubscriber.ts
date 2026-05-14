import { useMutation } from "@tanstack/react-query";
import { subscribersApi } from "../../../../../../../../common/api/subscribers.api";

export const useDeleteSubscriber = () => {
  return useMutation({
    mutationFn: (id: number) => subscribersApi.delete(id),
  });
};

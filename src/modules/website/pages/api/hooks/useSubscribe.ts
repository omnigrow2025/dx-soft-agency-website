import { useMutation } from "@tanstack/react-query";
import { subscribersApi } from "../../../../../common/api/subscribers.api";
import type { CreateSubscriberModel } from "../../../../../common/models/createSubscriber.model";

export const useSubscribe = () => {
  return useMutation({
    mutationFn: (data: CreateSubscriberModel) => subscribersApi.create(data),
  });
};

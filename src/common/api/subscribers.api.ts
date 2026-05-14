import type { GetSubscribersModel } from "../../modules/backoffice/pages/admin/items/subscribers/models/getSubscribers.model";
import type { SubscribersQueryModel } from "../../modules/backoffice/pages/admin/items/subscribers/models/subscribersQuery.model";
import type { CreateSubscriberModel } from "../models/createSubscriber.model";
import { subscribersClient } from "./httpClient";

export const subscribersApi = {
  getList(params: SubscribersQueryModel) {
    return subscribersClient.get<GetSubscribersModel>("/", { params });
  },
  delete(id: number) {
    return subscribersClient.delete(`/${id}`);
  },
  create(data: CreateSubscriberModel) {
    return subscribersClient.post("/", data);
  },
};

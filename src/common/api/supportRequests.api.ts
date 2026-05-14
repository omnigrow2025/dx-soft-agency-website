import type { SupportRequestsModel } from "../../modules/backoffice/pages/admin/items/support-requests/models/getSupportRequests.model";
import type { SupportRequestsQueryModel } from "../../modules/backoffice/pages/admin/items/support-requests/models/supportRequestsQuery.model";
import type { CreateSupportRequestModel } from "../models/createSupportRequest.model";
import { supportRequestsClient } from "./httpClient";

export const supportRequestsApi = {
  getList(params: SupportRequestsQueryModel) {
    return supportRequestsClient.get<SupportRequestsModel>("/", {
      params,
    });
  },
  create(data: CreateSupportRequestModel) {
    return supportRequestsClient.post("/", data);
  },
};

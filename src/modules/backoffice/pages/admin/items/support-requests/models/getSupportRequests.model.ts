import type { GetSupportRequestModel } from "./getSupportRequest.model";

export interface SupportRequestsModel {
  count: number;
  data: GetSupportRequestModel[];
}

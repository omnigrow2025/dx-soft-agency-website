import { partnersClient } from "../../../../../../../../../common/api/httpClient";
import type { CreatePartnerModel } from "../models/createPartner.model";
import type { GetPartnersModel } from "../models/getPartners.model";
import type { PartnersQueryModel } from "../models/partnersQuery.model";

export const partnersApi = {
  get(params: PartnersQueryModel) {
    return partnersClient.get<GetPartnersModel>("/", { params });
  },

  delete(id: number) {
    return partnersClient.delete(`/${id}`);
  },

  create(data: CreatePartnerModel) {
    return partnersClient.post("/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

import type { LoginModel } from "../pages/login/model/login.model";
import { masterUsersClient } from "../../../common/api/httpClient";
import type { RegisterModel } from "../pages/register/models/registerModel";
import type { GetMasterUsersModel } from "../pages/admin/items/master-users/models/getMasterUsers.model";
import type { MasterUserQueryModel } from "../pages/admin/items/master-users/models/masterUsersQuery.model";
import type { RegisterOfferModel } from "../pages/admin/items/master-users/models/registerOffer.model";

export const masterUserApi = {
  get(query: MasterUserQueryModel) {
    return masterUsersClient.get<GetMasterUsersModel>("", { params: query });
  },
  login(data: LoginModel) {
    return masterUsersClient.post("login", data);
  },
  register(token: string, data: RegisterModel) {
    return masterUsersClient.post("register", data, {
      params: { token },
    });
  },
  sendOffer(data: RegisterOfferModel) {
    return masterUsersClient.post("send-email", data);
  },
};

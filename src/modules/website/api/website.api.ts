import { websiteClient } from "../../../common/api/httpClient";
import type { WebsiteData } from "../model/websiteData.model";

export const websiteApi = {
  getWebsiteData() {
    return websiteClient.get<WebsiteData>("/data");
  },
};

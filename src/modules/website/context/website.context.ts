import { createContext } from "react";
import type { WebsiteData } from "../model/websiteData.model";

interface WebsiteDataContextValue {
  data?: WebsiteData;
  isLoading?: boolean;
  error?: unknown;
}

export const WebsiteDataContext = createContext<WebsiteDataContextValue>({
  data: undefined,
  isLoading: true,
  error: undefined,
});

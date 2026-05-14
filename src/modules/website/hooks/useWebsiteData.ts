import { useContext } from "react";
import { WebsiteDataContext } from "../context/website.context";

export const useWebsiteData = () => {
  const context = useContext(WebsiteDataContext);

  if (!context) {
    throw new Error("useWebsiteData must be used within WebsiteDataProvider");
  }

  return context;
};

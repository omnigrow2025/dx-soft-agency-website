import { Outlet } from "react-router-dom";
import { PageState } from "../../common/components/UI/PageState";
import { useGetWebsiteData } from "./api/hooks/useGetWebsiteData";
import { WebsiteDataContext } from "./context/website.context";
import { WebsiteLayout } from "./pages/components/WebsiteLayout";
import { ScrollToTopButton } from "../../common/components/ScrollToTopButton";

export const WebsiteApp = () => {
  const { data, isFetching, error } = useGetWebsiteData();

  return (
    <PageState isLoading={isFetching} isEmpty={!data} error={error}>
      <WebsiteDataContext.Provider
        value={{ data, isLoading: isFetching, error }}
      >
        <WebsiteLayout>
          <Outlet />
        </WebsiteLayout>
        <ScrollToTopButton />
      </WebsiteDataContext.Provider>
    </PageState>
  );
};

import { Tab } from "../../../../../../common/components/UI/Tab";
import { Tabs } from "../../../../../../common/components/UI/Tabs";
import { Faq } from "./items/faq/Faq";
import { Partners } from "./items/partners/Partners";

export const CmsContentManager = () => {
  return (
    <Tabs>
      <Tab label="Faq" component={<Faq />} />
      <Tab label="Partners" component={<Partners />} />
    </Tabs>
  );
};

import { Paper } from "@mui/material";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
//
import SupportSoftwareLog from "./Logs/SupportSoftwareLog";
import Roadmap from "./Roadmap/Roadmap";
import { TabsRouter2, TabsType } from "../../components/core/TabsRouter2";
import Subscription from "./Subscriptions/Subscription";

const tabs: TabsType = [
  {
    label: "support.logs",
    link: "logs",
    component: SupportSoftwareLog,
  },
  {
    label: "support.subscriptions",
    link: "subscriptions",
    component: Subscription,
  },
  /*   {
    label: "support.bugs",
    link: "clients",
    component: SupportRequests,
  }, */
  {
    label: "support.roadmap",
    link: "roadmap",
    component: Roadmap,
  },
];

function SupportCenterFrame() {
  return (
    <Paper>
      <FormTitleBarRich title="support.title" />
      <TabsRouter2 tabs={tabs} />
    </Paper>
  );
}

export default SupportCenterFrame;

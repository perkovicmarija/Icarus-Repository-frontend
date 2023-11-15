import { Paper } from "@mui/material";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
//
import Clients from "./Client/Clients";
import Versions from "./VersionMobile/Versions";
import { TabsRouter2, TabsType } from "../../components/core/TabsRouter2";

const tabs: TabsType = [
  {
    label: "form.clients",
    link: "clients",
    component: Clients,
  },
  {
    label: "general.versionsMobile",
    link: "version-mobile",
    component: Versions,
  },
];

function SettingFrame() {
  return (
    <Paper>
      <FormTitleBarRich title="general.settings" />
      <TabsRouter2 tabs={tabs} />
    </Paper>
  );
}

export default SettingFrame;

import { Link, useRouteMatch } from "react-router-dom";
import { AppBar, Paper, Tab, Tabs } from "@mui/material";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import { FormattedMessage } from "react-intl";
//
import SettingRouter from "./SettingRouter";
import { clients, versionsMobile } from "../../consts/routePaths";

type Tabs = "clients" | "version-mobile";

function SettingFrame() {
  const match = useRouteMatch<{ tab: Tabs }>();

  let tabSelected;
  switch (match.params.tab) {
    case "clients":
      tabSelected = 0;
      break;
    case "version-mobile":
      tabSelected = 1;
      break;
    default:
      throw new Error("wrong settings route");
  }

  return (
    <Paper>
      <FormTitleBarRich title="general.settings" />
      <AppBar position="static" color="default">
        <Tabs
          value={tabSelected}
          variant="fullWidth"
          indicatorColor="secondary"
        >
          <Tab
            label={<FormattedMessage id="form.clients" />}
            component={Link}
            to={clients}
          />
          <Tab
            label={<FormattedMessage id="general.versionsMobile" />}
            component={Link}
            to={versionsMobile}
          />
        </Tabs>
      </AppBar>
      <SettingRouter />
    </Paper>
  );
}

export default SettingFrame;

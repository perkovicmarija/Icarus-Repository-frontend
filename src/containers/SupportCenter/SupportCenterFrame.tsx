import { Link, useRouteMatch } from "react-router-dom";
import { AppBar, Paper, Tab, Tabs } from "@mui/material";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import { FormattedMessage } from "react-intl";
//
import SupportCenterRouter from "./SupportCenterRouter";
import {
  //supportBugs,
  supportLogs,
  supportRoadmap,
} from "../../consts/routePaths";

type Tabs = "logs" | "bugs" | "roadmap";

function SupportCenterFrame() {
  const match = useRouteMatch<{ tab: Tabs }>();

  let tabSelected;
  switch (match.params.tab) {
    case "logs":
      tabSelected = 0;
      break;
    case "roadmap":
      tabSelected = 1;
      break;
    /* case "bugs":
      tabSelected = 2;
      break; */
    default:
      throw new Error("wrong support center route");
  }

  return (
    <Paper>
      <FormTitleBarRich title="support.title" />
      <AppBar position="static" color="default">
        <Tabs
          value={tabSelected}
          variant="fullWidth"
          indicatorColor="secondary"
        >
          <Tab
            label={<FormattedMessage id="support.logs" />}
            component={Link}
            to={supportLogs}
          />
          {/* <Tab
            label={<FormattedMessage id="support.bugs" />}
            component={Link}
            to={supportBugs}
          /> */}
          <Tab
            label={<FormattedMessage id="support.roadmap" />}
            component={Link}
            to={supportRoadmap}
          />
        </Tabs>
      </AppBar>
      <SupportCenterRouter />
    </Paper>
  );
}

export default SupportCenterFrame;

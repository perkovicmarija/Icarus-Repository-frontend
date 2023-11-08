import { Link, useRouteMatch } from "react-router-dom";
import { makeStyles, useTheme } from "@mui/styles";
import { AppBar, Paper, Tab, Tabs } from "@mui/material";

import IntlMessages from "../../components/core/IntlMessages";
import TabContainer from "../../components/core/TabContainer";
import SupportCenterRouter from "./SupportCenterRouter";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import {
  supportBugs,
  supportLogs,
  supportRoadmap,
} from "../../consts/routePaths";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tabLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

type Tabs = "logs" | "bugs" | "roadmap";

function SupportCenterFrame() {
  const classes = useStyles();
  const theme = useTheme();
  const match = useRouteMatch<{ tab: Tabs }>();

  let tabSelected;
  switch (match.params.tab) {
    case "logs":
      tabSelected = 0;
      break;
    case "bugs":
      tabSelected = 1;
      break;
    case "roadmap":
      tabSelected = 2;
      break;
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
            label={<IntlMessages id="support.logs" />}
            className={classes.tabLink}
            component={Link}
            to={supportLogs}
          />
          <Tab
            label={<IntlMessages id="support.bugs" />}
            className={classes.tabLink}
            component={Link}
            to={supportBugs}
          />
          <Tab
            label={<IntlMessages id="support.roadmap" />}
            className={classes.tabLink}
            component={Link}
            to={supportRoadmap}
          />
        </Tabs>
      </AppBar>
      <TabContainer dir={theme.direction}>
        <SupportCenterRouter />
      </TabContainer>
    </Paper>
  );
}

export default SupportCenterFrame;

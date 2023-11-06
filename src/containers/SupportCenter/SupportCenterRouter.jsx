import React from "react";
import { Route, Switch } from "react-router-dom";
import SupportSoftwareLog from "./Logs/SupportSoftwareLog";
import SupportBugs from "./Bug/SupportBugs";
import Roadmap from "./Roadmap/Roadmap";
import {
  supportLogs,
  supportBugs,
  supportRoadmap,
} from "../../consts/routePaths";

function SupportCenter(props) {
  return (
    <Switch>
      <Route
        path={supportLogs + ":page?/:rowsPerPage?"}
        component={SupportSoftwareLog}
      />
      <Route
        path={supportBugs + ":page?/:rowsPerPage?"}
        component={SupportBugs}
      />
      <Route path={supportRoadmap} component={Roadmap} />
    </Switch>
  );
}

export default SupportCenter;

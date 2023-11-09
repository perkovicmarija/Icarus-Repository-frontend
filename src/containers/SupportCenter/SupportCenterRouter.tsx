import { Route, Switch } from "react-router-dom";
import SupportSoftwareLog from "./Logs/SupportSoftwareLog";
import SupportRequests from "./Bug/SupportRequests";
import Roadmap from "./Roadmap/Roadmap";
import {
  supportLogs,
  supportBugs,
  supportRoadmap,
} from "../../consts/routePaths";

function SupportCenter() {
  return (
    <Switch>
      <Route
        path={supportLogs + ":page?/:rowsPerPage?"}
        component={SupportSoftwareLog}
      />
      <Route
        path={supportBugs + ":page?/:rowsPerPage?"}
        component={SupportRequests}
      />
      <Route path={supportRoadmap} component={Roadmap} />
    </Switch>
  );
}

export default SupportCenter;

import React from "react";
import { Switch, Route } from "react-router-dom";
import asyncComponent from "../../helpers/AsyncFunc";
import HazardClassificators from "./HazardClassificators";

function HazardRiskRouter(props) {
  const { url } = props;
  return (
    <Switch>
      <Route
        exact
        path={`${url}/hazards`}
        component={asyncComponent(() =>
          HazardClassificators
        )}
      />
      {/* <Route
        exact
        path={`${url}/threats`}
        component={asyncComponent(() => import("./Threat/Threats"))}
      />
      <Route
        exact
        path={`${url}/consequences`}
        component={asyncComponent(() => import("./Consequence/Consequences"))}
      />
      <Route
        exact
        path={`${url}/barriers`}
        component={asyncComponent(() => import("./Barrier/Barriers"))}
      />
      <Route
        exact
        path={`${url}/risks`}
        component={asyncComponent(() => import("./Risk/Risks"))}
      /> */}
    </Switch>
  );
}

export default HazardRiskRouter;

import { Route, Switch } from "react-router-dom";
import Clients from "./Client/Clients";
import Versions from "./VersionMobile/Versions";
import { clients, versionsMobile } from "../../consts/routePaths";

function SettingRouter() {
  return (
    <Switch>
      <Route
        exact
        path={clients + ":page?/:rowsPerPage?"}
        component={Clients}
      />
      <Route
        exact
        path={versionsMobile + ":page?/:rowsPerPage?"}
        component={Versions}
      />
    </Switch>
  );
}

export default SettingRouter;

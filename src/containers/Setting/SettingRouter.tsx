import { Route, Switch } from "react-router-dom";
import Clients from "./Client/Clients";
import Versions from "./VersionMobile/Versions";
import { clients, versionsMobile } from "../../consts/routePaths";

function SettingRouter() {
  return (
    <Switch>
      <Route
        path={clients}
        component={Clients}
      />
      <Route
        path={versionsMobile}
        component={Versions}
      />
    </Switch>
  );
}

export default SettingRouter;

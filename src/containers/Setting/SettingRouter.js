import React from 'react';

import {Route, Switch} from 'react-router-dom';
import Clients from './Client/Clients';
import Versions from './VersionMobile/Versions';
import {clients, versionsMobile} from "../../consts/routePaths";

function SettingRouter(props) {
  return (
    <Switch>
      <Route
        exact
        path={clients}
        component={Clients}
      />
    <Route
        exact
        path={versionsMobile}
        component={Versions}
      />
    </Switch>
  );
}

export default SettingRouter;

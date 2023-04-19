import React from 'react';

import {Route, Switch} from 'react-router-dom';
import Clients from './Client/Clients';
import {clients} from "../../consts/routePaths";

function SettingRouter(props) {
  return (
    <Switch>
      <Route
        exact
        path={clients}
        component={Clients}
      />
    </Switch>
  );
}

export default SettingRouter;

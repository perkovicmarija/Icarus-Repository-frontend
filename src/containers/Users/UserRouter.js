import React from 'react';

import { Switch, Route } from 'react-router-dom';

import User from './User/Users';
import UserGroups from './UserGroup/UserGroups'
import Roles from './Role/Roles';
import { users, userGroups, roles } from "../../consts/routePaths";

function UserRouter(props) {
    return (
        <Switch>
            <Route
                exact
                path={users}
                component={User}
            />
            <Route
                exact
                path={userGroups}
                component={UserGroups}
            />
            <Route
                exact
                path={roles}
                component={Roles}
            />
        </Switch>
    );
}

export default UserRouter;

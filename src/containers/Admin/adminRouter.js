import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import User from '../Users/User/User';
import SupportBugDetailsFrame from '../SupportCenter/Bug/Details/SupportBugDetailsFrame';
import ProtectedRoute from '../../ProtectedRoute';
import Dashboard from '../Dashboard/Dashboard';
import SubmenuComp1 from '../SubmenuComp/SubmenuComp1';
import SubmenuComp2 from '../SubmenuComp/SubmenuComp2';
import UserRoleFrame from '../Users/UserRoleFrame';
import SupportCenterFrame from '../SupportCenter/SupportCenterFrame';
import {
    root,
    dashboard,
    supportCenter,
    userModule,
    user,
    supportBug,
    submenu1,
    submenu2,
} from '../../consts/routePaths';

const AdminRouter = () => {
  return (
    <Switch>
        <Route
            path={dashboard}
            component={Dashboard}
            key="dashboard"
        />
        <Route
            path={submenu1}
            component={SubmenuComp1}
            key="rates-hourly"
        />
        <Route
            path={submenu2}
            component={SubmenuComp2}
            key="rates-drilling"
        />
        <ProtectedRoute
            protectedAuthorities={['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN']}
            path={supportCenter}
            component={SupportCenterFrame}
            key="support-center"
        />
        <ProtectedRoute
            protectedAuthorities={['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN']}
            path={supportBug}
            component={SupportBugDetailsFrame}
            key="support-bug-details"
        />
        <ProtectedRoute
            protectedAuthorities={['PERM_USER_CRUD']}
            path={userModule}
            component={UserRoleFrame}
            key="user-module"
        />
        <ProtectedRoute
            protectedAuthorities={['PERM_USER_CRUD']}
            path={user}
            component={User}
            key="user-module"
        />
        <Redirect from={root} to={dashboard} />
    </Switch>
  );
};

export default AdminRouter;

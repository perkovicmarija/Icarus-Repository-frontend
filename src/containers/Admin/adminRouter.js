import React from 'react';

import {Redirect, Route, Switch} from 'react-router-dom';

import User from '../Users/User/User';
import SupportBugDetailsFrame from '../SupportCenter/Bug/Details/SupportBugDetailsFrame';
import ProtectedRoute from '../../ProtectedRoute';
import Dashboard from '../Dashboard/Dashboard';
import SubmenuComp1 from '../SubmenuComp/SubmenuComp1';
import SubmenuComp2 from '../SubmenuComp/SubmenuComp2';
import UserRoleFrame from '../Users/UserRoleFrame';
import SupportCenterFrame from '../SupportCenter/SupportCenterFrame';
import SettingFrame from '../Setting/SettingFrame';
import {
    auditChecklist,
    auditChecklistOverview,
    dashboard,
    getSupportBugsPath,
    getSupportLogsPath,
    icarusDocs,
    icarusDocsDetailsNew, icarusDocsViewFile,
    root,
    settingModule,
    submenu1,
    submenu2,
    supportBug,
    supportRoadmap,
    user,
    userModule
} from '../../consts/routePaths';
import AuditChecklistOverview from "../Audit/AuditChecklist/AuditChecklistOverview";
import AuditChecklist from "../Audit/AuditChecklist/AuditChecklist";
import IcarusDocs from "../SupportCenter/IcarusDocs/IcarusDocs";
import FileDetailsWrapperNew from "../SupportCenter/IcarusDocs/FileDetailsWrapperNew";
import IcarusDocsFileView from "../SupportCenter/IcarusDocs/IcarusDocsFileView";

const AdminRouter = () => {
  return (
    <Switch>
        {
            /**
             * Default routes
             */
        }
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
            path={getSupportLogsPath(0, 25)}
            component={SupportCenterFrame}
            key="software-logs-list"
        />
        <ProtectedRoute
            protectedAuthorities={['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN']}
            path={getSupportBugsPath(0, 25)}
            component={SupportCenterFrame}
            key="software-bugs-list"
        />
        <ProtectedRoute
            protectedAuthorities={['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN']}
            path={supportRoadmap}
            component={SupportCenterFrame}
            key="roadmap"
        />
        <ProtectedRoute
            exact
            protectedAuthorities={['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN']}
            path={icarusDocs}
            component={IcarusDocs}
            key="icarus-docs"
        />
        <ProtectedRoute
            exact
            protectedAuthorities={['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN']}
            path={icarusDocsDetailsNew}
            component={FileDetailsWrapperNew}
            key="icarus-docs-details-new"
        />
        <ProtectedRoute
            exact
            protectedAuthorities={['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN']}
            path={icarusDocsViewFile + ':id'}
            component={IcarusDocsFileView}
            key="icarus-docs-view-file"
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
        <ProtectedRoute
            protectedAuthorities={['PERM_SUPPORT_BASIC', 'PERM_SUPPORT_CRUD', 'PERM_SUPPORT_ADMIN']}
            path={settingModule}
            component={SettingFrame}
            key="setting-module"
        />
        {
            /**
             * Custom routes
             */
        }
        <Route
            exact
            path={auditChecklistOverview}
            component={AuditChecklistOverview}
            key="auditChecklistOverview"
        />
        <Route
            exact
            path={auditChecklist}
            component={AuditChecklist}
            key="auditChecklist"
        />
        <Redirect from={root} to={dashboard} />
    </Switch>
  );
};

export default AdminRouter;

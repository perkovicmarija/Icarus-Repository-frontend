import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import User from "../Users/User/User";
import SupportBugDetailsFrame from "../SupportCenter/Bug/Details/SupportBugDetailsFrame";
import ProtectedRoute from "../../ProtectedRoute";
import Dashboard from "../Dashboard/Dashboard";
import SubmenuComp1 from "../SubmenuComp/SubmenuComp1";
import SubmenuComp2 from "../SubmenuComp/SubmenuComp2";
import UserRoleFrame from "../Users/UserRoleFrame";
import SupportCenterFrame from "../SupportCenter/SupportCenterFrame";
import SettingFrame from "../Setting/SettingFrame";
import {
  auditChecklist,
  auditChecklistOverview,
  dashboard,
  icarusDocs,
  icarusDocsDetailsNew,
  icarusDocsEditFile,
  icarusDocsViewFile,
  root,
  settingModule,
  submenu1,
  submenu2,
  supportBug,
  supportCenter,
  supportRoadmap,
  userModule,
} from "../../consts/routePaths";
import AuditChecklistOverview from "../Audit/AuditChecklist/AuditChecklistOverview";
import AuditChecklist from "../Audit/AuditChecklist/AuditChecklist";
import IcarusDocs from "../SupportCenter/IcarusDocs/IcarusDocs";
import FileDetailsWrapperNew from "../SupportCenter/IcarusDocs/FileDetailsWrapperNew";
import IcarusDocsFileView from "../SupportCenter/IcarusDocs/IcarusDocsFileView";
import FileDetailsWrapperEdit from "../SupportCenter/IcarusDocs/FileDetailsWrapperEdit";

const AdminRouter = () => {
  return (
    <Switch>
      <Route path={dashboard} component={Dashboard} key="dashboard" />
      <Route path={submenu1} component={SubmenuComp1} key="rates-hourly" />
      <Route path={submenu2} component={SubmenuComp2} key="rates-drilling" />

      <ProtectedRoute
        protectedAuthorities={[
          "PERM_SUPPORT_BASIC",
          "PERM_SUPPORT_CRUD",
          "PERM_SUPPORT_ADMIN",
        ]}
        path={supportCenter + "/:tab?"}
        component={SupportCenterFrame}
        key="supportCenter"
      />

      <ProtectedRoute
        exact
        protectedAuthorities={[
          "PERM_SUPPORT_BASIC",
          "PERM_SUPPORT_CRUD",
          "PERM_SUPPORT_ADMIN",
        ]}
        path={icarusDocs}
        component={IcarusDocs}
        key="icarusDocs"
      />
      <ProtectedRoute
        exact
        protectedAuthorities={[
          "PERM_SUPPORT_BASIC",
          "PERM_SUPPORT_CRUD",
          "PERM_SUPPORT_ADMIN",
        ]}
        path={icarusDocsDetailsNew}
        component={FileDetailsWrapperNew}
        key="icarus-docs-details-new"
      />
      <ProtectedRoute
        exact
        protectedAuthorities={[
          "PERM_SUPPORT_BASIC",
          "PERM_SUPPORT_CRUD",
          "PERM_SUPPORT_ADMIN",
        ]}
        path={icarusDocsEditFile}
        component={FileDetailsWrapperEdit}
        key="icarus-docs-details-edit"
      />
      <ProtectedRoute
        exact
        protectedAuthorities={[
          "PERM_SUPPORT_BASIC",
          "PERM_SUPPORT_CRUD",
          "PERM_SUPPORT_ADMIN",
        ]}
        path={icarusDocsViewFile + ":id"}
        component={IcarusDocsFileView}
        key="icarus-docs-view-file"
      />
      <ProtectedRoute
        protectedAuthorities={[
          "PERM_SUPPORT_BASIC",
          "PERM_SUPPORT_CRUD",
          "PERM_SUPPORT_ADMIN",
        ]}
        path={supportBug}
        component={SupportBugDetailsFrame}
        key="support-bug-details"
      />

      <ProtectedRoute
        protectedAuthorities={["PERM_USER_CRUD"]}
        path={userModule + "/:tab?"}
        component={UserRoleFrame}
        key="user-module"
      />

      <ProtectedRoute
        protectedAuthorities={[
          "PERM_SUPPORT_BASIC",
          "PERM_SUPPORT_CRUD",
          "PERM_SUPPORT_ADMIN",
        ]}
        path={settingModule + "/:tab?"}
        component={SettingFrame}
        key="setting-module"
      />

      {/**
       * Custom routes
       */}
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

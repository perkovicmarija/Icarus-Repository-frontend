import { Redirect, Route, Switch } from "react-router-dom";

import SupportBugDetailsFrame from "../SupportCenter/Bug/Details/SupportBugDetailsFrame";
import ProtectedRoute from "../../ProtectedRoute";
import Dashboard from "../Dashboard/Dashboard";
import UserRoleFrame from "../Users/UserRoleFrame";
import SupportCenterFrame from "../SupportCenter/SupportCenterFrame";
import SettingFrame from "../Setting/SettingFrame";
import {
  auditChecklistOverview,
  auditChecklist,
  userModule,
  dashboard,
  icarusDocs,
  icarusDocsDetailsNew,
  icarusDocsEditFile,
  icarusDocsViewFile,
  root,
  settingModule,
  supportBug,
  supportCenter,
} from "../../consts/routePaths";
import AuditChecklistOverview from "../AuditChecklist/AuditChecklistOverview";
import AuditChecklist from "../AuditChecklist/AuditChecklist";
import IcarusDocs from "../SupportCenter/IcarusDocs/IcarusDocs";
import FileDetailsWrapperNew from "../SupportCenter/IcarusDocs/FileDetailsWrapperNew";
import IcarusDocsFileView from "../SupportCenter/IcarusDocs/IcarusDocsFileView";
import FileDetailsWrapperEdit from "../SupportCenter/IcarusDocs/FileDetailsWrapperEdit";

const AdminRouter = () => {
  return (
    <Switch>
      <Route path={dashboard} component={Dashboard} key="dashboard" />

      <Route
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
        protectedAuthorities={[
          "PERM_SUPPORT_BASIC",
          "PERM_SUPPORT_CRUD",
          "PERM_SUPPORT_ADMIN",
        ]}
        path={settingModule + "/:tab?"}
        component={SettingFrame}
        key="setting-module"
      />

      <Redirect from={root} to={auditChecklistOverview} />
    </Switch>
  );
};

export default AdminRouter;

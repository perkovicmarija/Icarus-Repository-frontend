import { Redirect, Route, Switch } from "react-router-dom";
import SupportBugDetailsFrame from "../SupportCenter/Bug_OBSOLETE/Details/SupportBugDetailsFrame";
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
  root,
  settingModule,
  supportBug,
  supportCenter,
} from "../../consts/routePaths";
import AuditChecklistOverview from "../AuditChecklist/AuditChecklistOverview";
import AuditChecklist from "../AuditChecklist/AuditChecklist";
import IcarusDocs from "../IcarusDocs/IcarusDocs";

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
        path={userModule}
        component={UserRoleFrame}
        key="user-module"
      />

      <ProtectedRoute
        protectedAuthorities={[
          "PERM_SUPPORT_BASIC",
          "PERM_SUPPORT_CRUD",
          "PERM_SUPPORT_ADMIN",
        ]}
        path={supportCenter}
        component={SupportCenterFrame}
        key="supportCenter"
      />

      <ProtectedRoute
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
        path={settingModule}
        component={SettingFrame}
        key="setting-module"
      />

      <Redirect from={root} to={auditChecklistOverview} />
    </Switch>
  );
};

export default AdminRouter;

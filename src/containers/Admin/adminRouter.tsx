import {Redirect, Route, Switch} from "react-router-dom";
import SupportBugDetailsFrame from "../SupportCenter/Bug_OBSOLETE/Details/SupportBugDetailsFrame";
import ProtectedRoute from "../../ProtectedRoute";
import Dashboard from "../Dashboard/Dashboard";
import UserRoleFrame from "../Users/UserRoleFrame";
import SupportCenterFrame from "../SupportCenter/SupportCenterFrame";
import SettingFrame from "../Setting/SettingFrame";
import {
    androidClients,
    auditChecklist,
    auditChecklistOverview,
    dashboard,
    forumRegistrations, forumTags, forumTopicForm,
    forumTopics,
    icarusDocs,
    iOSClients,
    mobileLogs,
    root,
    settingModule,
    supportBug,
    supportCenter,
    userModule,
    webClients,
} from "../../consts/routePaths";
import AuditChecklistOverview from "../AuditChecklist/AuditChecklistOverview";
import AuditChecklist from "../AuditChecklist/AuditChecklist";
import IcarusDocs from "../IcarusDocs/IcarusDocs";
import Clients from "../Setting/Client/Clients";
import MobileLogs from "../Logger/MobileLogs";
import ForumRegistrations from "../Forum/ForumRegistrations";
import ForumTopics from "../Forum/ForumTopics";
import ForumTags from "../Forum/ForumTags";
import ForumTopicForm from "../Forum/ForumTopicForm";

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

        <Route
            path={iOSClients}
            render={(routeProps) => <Clients {...routeProps} actions={false} />}
            key="ios-clients"
        />

        <Route
            path={androidClients}
            render={(routeProps) => <Clients {...routeProps} actions={false} />}
            key="android-clients"
        />

        <Route
            path={webClients}
            render={(routeProps) => <Clients {...routeProps} actions={false} />}
            key="web-clients"
        />

        <Route
            path={mobileLogs}
            component={MobileLogs}
            key="mobile-logs"
        />

        <Route
            path={forumRegistrations}
            component={ForumRegistrations}
            key="forum-registrations"
        />

        <Route
            path={forumTopics}
            component={ForumTopics}
            key="forum-topics"
        />

        <Route
            path={forumTopicForm}
            component={ForumTopicForm}
            key="forum-topics-form"
        />

        <Route
            path={forumTags}
            component={ForumTags}
            key="forum-tags"
        />

      <Redirect from={root} to={auditChecklistOverview} />
    </Switch>
  );
};

export default AdminRouter;

import {Redirect, Route, Switch} from "react-router-dom";
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
  forumCommentLikes,
  forumTags,
  forumTopic,
  forumTopicComments,
  forumTopicLikes,
  forumTopics,
  forumTopicSubscribers,
  forumUsers,
  icarusDocs,
  iOSClients,
  mobileLogs,
  reportHazardClassification,
  reportHazardIdentification,
  reportHazardIdentificationDetails,
  root,
  settingModule,
  supportCenter,
  userModule,
  webClients,
} from "../../consts/routePaths";
import AuditChecklistOverview from "../AuditChecklist/AuditChecklistOverview";
import AuditChecklist from "../AuditChecklist/AuditChecklist";
import IcarusDocs from "../IcarusDocs/IcarusDocs";
import Clients from "../Setting/Client/Clients";
import MobileLogs from "../Logger/MobileLogs";
import ForumUsers from "../Forum/ForumUsers";
import ForumTopics from "../Forum/ForumTopics";
import ForumTags from "../Forum/ForumTags";
import ForumTopicSubscribers from "../Forum/ForumTopicSubscribers";
import ForumComments from "../Forum/ForumComments";
import ForumLikes from "../Forum/ForumLikes";
import ForumTopicWrapper from "../Forum/ForumTopic/ForumTopicWrapper";
import ReportHazardIdentificationOverview from "../ReportHazardIdentification/ReportHazardIdentificationOverview";
import ReportHazardIdentification from "../ReportHazardIdentification/ReportHazardIdentification";
import HazardClassification from "../HazardClassification/HazardClassification";

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
            path={forumUsers}
            component={ForumUsers}
            key="forum-users"
        />

        <Route
            path={forumTopics}
            component={ForumTopics}
            key="forum-topics"
        />

        <Route
            path={forumTopic}
            component={ForumTopicWrapper}
            key="forum-topic"
        />

        <Route
            path={forumTopicSubscribers}
            component={ForumTopicSubscribers}
            key="forum-topic-subscribers"
        />

        <Route
            path={forumTopicComments}
            component={ForumComments}
            key="forum-topic-comments"
        />

        <Route
            path={forumTopicLikes}
            component={ForumLikes}
            key="forum-topic-likes"
        />

        <Route
            path={forumCommentLikes}
            component={ForumLikes}
            key="forum-comment-likes"
        />

        <Route
            path={forumTags}
            component={ForumTags}
            key="forum-tags"
        />

        <Route
            path={reportHazardIdentification}
            component={ReportHazardIdentificationOverview}
            key="report-hazard-identification"
        />

        <Route
            path={reportHazardIdentificationDetails}
            component={ReportHazardIdentification}
            key="report-hazard-identification-details"
        />

        <Route
            path={reportHazardClassification}
            component={HazardClassification}
            key="report-hazard-classification"
        />

      <Redirect from={root} to={auditChecklistOverview} />
    </Switch>
  );
};

export default AdminRouter;

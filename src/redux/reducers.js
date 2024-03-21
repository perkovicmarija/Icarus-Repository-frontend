import Auth from "./auth/authReducer";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import AjaxStatus from "./ajaxCall/ajaxStatusReducer";
import Message from "./message/messageReducer";
import User from "./user/userReducer";
import Authority from "./authority/authorityReducer";
import SupportCenter from "./support/supportReducer";
import supportLogsSlice from "./support/supportLogs/supportLogsSlice";
import Progress from "./progress/progressReducer";
import LanguageSwitcher from "./languageSwitcher/languageSwitcherReducer";
import AuditChecklist from "./auditChecklist/auditChecklistReducer";
import AuditChecklistItem from "./auditChecklistItem/auditChecklistItemReducer";
import AuditChecklistSubArea from "./auditChecklistSubArea/auditChecklistSubAreaReducer";
import clientsSlice from "./settings/clientsSlice";
import AuditorActionLocationType from "./auditorActionLocationType/AuditorActionLocationTypeReducer";
import IcarusDocumentationFile from "./icarusDocs/file/icarusDocumentationFileReducer";
import IcarusDocumentationFolder from "./icarusDocs/folder/icarusDocumentationFolderReducer";
import settingsSlice from "./settings/settingsSlice";
import versionsSlice from "./settings/versionsSlice";
import usersSlice from "./user/usersSlice";
import auditChecklistsSlice from "./auditChecklistsSlice";
import rolesSlice from "./user/rolesSlice";
import roadmapSlice from "./support/roadmap/roadmapSlice";
import icarusDocsSlice from "./icarusDocs/icarusDocsSlice";
import forumTagsSlice from "./forum/forumTags/forumTagsSlice"
import { clientsApi } from "./settings/clientsApi";
import { authApi } from "./authApi";
import { versionsApi } from "./settings/versionsApi";
import { supportLogsApi } from "./support/supportLogs/supportLogsApi";
import { softwareLogSubscriptionApi } from "./support/subscriptions/softwareLogSubscriptionApi";
import { roadmapApi } from "./support/roadmap/roadmapApi";
import { auditChecklistsApi } from "./auditChecklistsApi";
import { usersApi } from "./user/usersApi";
import loggerSlice from "./logger/loggerSlice";
import { loggerApi } from "./logger/loggerApi";
import softwareLogSubscriptionSlice from "./support/subscriptions/softwareLogSubscriptionSlice";
import {forumTagsApi} from "./forum/forumTags/forumTagsApi";
import {forumTopicsApi} from "./forum/forumTopics/forumTopicsApi";
import forumTopicsSlice from "./forum/forumTopics/forumTopicsSlice";
import {forumCommentsApi} from "./forum/forumComments/forumCommentsApi";
import forumCommentsSlice from "./forum/forumComments/forumCommentsSlice";
import {forumUsersApi} from "./forum/forumUsers/forumUsersApi";
import forumUsersSlice from "./forum/forumUsers/forumUsersSlice";
import {forumTopicUsersApi} from "./forum/forumUsers/forumTopicUsersApi";
import forumTopicUsersSlice from "./forum/forumUsers/forumTopicUsersSlice";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    Auth,
    AjaxStatus,
    Message,
    Progress,
    User,
    Users: usersSlice.reducer,
    UserRoles: rolesSlice.reducer,
    Authority,
    Settings: settingsSlice.reducer,
    SupportCenter,
    SupportLogs: supportLogsSlice.reducer,
    SoftwareLogSubscriptions: softwareLogSubscriptionSlice.reducer,
    Roadmap: roadmapSlice.reducer,
    LanguageSwitcher,
    AuditChecklist,
    AuditChecklists: auditChecklistsSlice.reducer,
    AuditChecklistItem,
    AuditChecklistSubArea,
    Clients: clientsSlice.reducer,
    IcarusDocumentationFile,
    IcarusDocumentationFolder,
    IcarusDocs: icarusDocsSlice.reducer,
    AuditorActionLocationType,
    Versions: versionsSlice.reducer,
    [auditChecklistsApi.reducerPath]: auditChecklistsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [versionsApi.reducerPath]: versionsApi.reducer,
    [supportLogsApi.reducerPath]: supportLogsApi.reducer,
    [softwareLogSubscriptionApi.reducerPath]: softwareLogSubscriptionApi.reducer,
    [roadmapApi.reducerPath]: roadmapApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    Logger: loggerSlice.reducer,
    [loggerApi.reducerPath]: loggerApi.reducer,
    [forumTagsApi.reducerPath]: forumTagsApi.reducer,
    ForumTags: forumTagsSlice.reducer,
    [forumTopicsApi.reducerPath]: forumTopicsApi.reducer,
    ForumTopics: forumTopicsSlice.reducer,
    [forumCommentsApi.reducerPath]: forumCommentsApi.reducer,
    ForumComments: forumCommentsSlice.reducer,
    [forumUsersApi.reducerPath]: forumUsersApi.reducer,
    ForumUsers: forumUsersSlice.reducer,
    [forumTopicUsersApi.reducerPath]: forumTopicUsersApi.reducer,
    ForumTopicUsers: forumTopicUsersSlice.reducer
  });

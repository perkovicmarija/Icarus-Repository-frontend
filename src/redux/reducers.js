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
import clientsSlice from "./setting/clientsSlice";
import AuditorActionLocationType from "./auditorActionLocationType/AuditorActionLocationTypeReducer";
import IcarusDocumentationFile from "./support/icarusDocs/file/icarusDocumentationFileReducer";
import IcarusDocumentationFolder from "./support/icarusDocs/folder/icarusDocumentationFolderReducer";
import settingsSlice from "./settings/settingsSlice";
import versionsSlice from "./setting/versionsSlice";
import usersSlice from "./user/usersSlice";
import auditChecklistsSlice from "./auditChecklistsSlice";
import rolesSlice from "./user/rolesSlice";
import roadmapSlice from "./support/roadmapSlice";
import icarusDocsSlice from "./icarusDocsSlice";
import { clientsApi } from "./clientsApi";
import { authApi } from "./authApi";
import { versionsApi } from "./versionsApi";
import { supportLogsApi } from "./support/supportLogsApi";
import { roadmapApi } from "./support/roadmapApi";
import { auditChecklistsApi } from "./auditChecklistsApi";
import { usersApi } from "./user/usersApi";
import loggerSlice from "./logger/loggerSlice";
import { loggerApi } from "./loggerApi";

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
    [roadmapApi.reducerPath]: roadmapApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    Logger: loggerSlice.reducer,
    [loggerApi.reducerPath]: loggerApi.reducer,
  });

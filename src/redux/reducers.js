import Auth from "./auth/authReducer";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import AjaxStatus from "./ajaxCall/ajaxStatusReducer";
import Message from "./message/messageReducer";
import User from "./user/userReducer";
import UserRole from "./user/role/userRoleReducer";
import UserGroup from "./user/group/userGroupReducer";
import Authority from "./authority/authorityReducer";
import SupportCenter from "./support/supportReducer";
import supportLogsSlice from "./support/supportLogs/supportLogsSlice";
import supportRequestsSlice from "./support/supportRequests/supportRequestsSlice";
import Progress from "./progress/progressReducer";
import LanguageSwitcher from "./languageSwitcher/languageSwitcherReducer";
import AuditChecklist from "./auditChecklist/auditChecklistReducer";
import AuditChecklistItem from "./auditChecklistItem/auditChecklistItemReducer";
import AuditChecklistSubArea from "./auditChecklistSubArea/auditChecklistSubAreaReducer";
import Client from "./setting/client/clientReducer";
import clientsSlice from "./setting/clientsSlice";
import AuditorActionLocationType from "./auditorActionLocationType/AuditorActionLocationTypeReducer";
import VersionMobile from "./setting/versionMobile/versionMobileReducer";
import IcarusDocumentationFile from "./support/icarusDocs/file/icarusDocumentationFileReducer";
import IcarusDocumentationFolder from "./support/icarusDocs/folder/icarusDocumentationFolderReducer";
import settingsSlice from "./settings/settingsSlice";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    Auth,
    AjaxStatus,
    Message,
    Progress,
    User,
    UserRole,
    UserGroup,
    Authority,
    Settings: settingsSlice.reducer,
    SupportCenter,
    SupportLogs: supportLogsSlice.reducer,
    SupportRequests: supportRequestsSlice.reducer,
    LanguageSwitcher,
    AuditChecklist,
    AuditChecklistItem,
    AuditChecklistSubArea,
    Client,
    Clients: clientsSlice.reducer,
    IcarusDocumentationFile,
    IcarusDocumentationFolder,
    AuditorActionLocationType,
    VersionMobile,
  });

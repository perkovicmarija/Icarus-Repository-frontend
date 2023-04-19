import Auth from './auth/authReducer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import AjaxStatus from './ajaxCall/ajaxStatusReducer';
import Message from './message/messageReducer';
import User from './user/userReducer';
import UserRole from './user/role/userRoleReducer'
import UserGroup from './user/group/userGroupReducer';
import Authority from './authority/authorityReducer';
import SupportCenter from './support/supportReducer';
import Progress from './progress/progressReducer';
import LanguageSwitcher from './languageSwitcher/languageSwitcherReducer';
import AuditChecklist from './auditChecklist/auditChecklistReducer';
import AuditChecklistItem from './auditChecklistItem/auditChecklistItemReducer';
import AuditChecklistSubArea from './auditChecklistSubArea/AuditChecklistSubAreaReducer';
import Client from './setting/client/clientReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    Auth,
    AjaxStatus,
    Message,
    Progress,
    User,
    UserRole,
    UserGroup,
    Authority,
    SupportCenter,
    LanguageSwitcher,
    AuditChecklist,
    AuditChecklistItem,
    AuditChecklistSubArea,
    Client
})

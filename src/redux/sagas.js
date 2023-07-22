import {all} from 'redux-saga/effects';
import authSagas from './auth/authSaga';
import userSagas from './user/userSaga';
import roleSagas from './user/role/userRoleSaga';
import groupSagas from './user/group/userGroupSaga';
import supportCenterSagas from './support/supportSaga';
import authoritySagas from './authority/authoritySaga';
import auditChecklistSaga from './auditChecklist/auditChecklistSaga';
import auditChecklistItemSaga from "./auditChecklistItem/auditChecklistItemSaga";
import auditChecklistSubAreaSaga from "./auditChecklistSubArea/AuditChecklistSubAreaSaga";
import settingSagas from "./setting/client/clientSaga"
import auditorActionLocationType from "./auditorActionLocationType/AuditorActionLocationTypeSaga";

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        userSagas(),
        roleSagas(),
        groupSagas(),
        supportCenterSagas(),
        authoritySagas(),
        auditChecklistSaga(),
        auditChecklistItemSaga(),
        auditChecklistSubAreaSaga(),
        settingSagas(),
        auditChecklistSubAreaSaga(),
        auditorActionLocationType()
    ]);
}

import { all } from "redux-saga/effects";
import authSagas from "./auth/authSaga";
import userSagas from "./user/userSaga";
import supportCenterSagas from "./support/supportSaga";
import authoritySagas from "./authority/authoritySaga";
import auditChecklistSaga from "./auditChecklist/auditChecklistSaga";
import auditChecklistItemSaga from "./auditChecklistItem/auditChecklistItemSaga";
import auditChecklistSubAreaSaga from "./auditChecklistSubArea/auditChecklistSubAreaSaga";
import auditorActionLocationType from "./auditorActionLocationType/AuditorActionLocationTypeSaga";
import icarusDocumentationFileSagas from "./icarusDocs/file/icarusDocumentationFileSaga";
import icarusDocumentationFolderSagas from "./icarusDocs/folder/icarusDocumentationFolderSaga";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    userSagas(),
    supportCenterSagas(),
    authoritySagas(),
    auditChecklistSaga(),
    auditChecklistItemSaga(),
    auditChecklistSubAreaSaga(),
    auditorActionLocationType(),
    icarusDocumentationFileSagas(),
    icarusDocumentationFolderSagas(),
    auditorActionLocationType(),
  ]);
}

import {call, put, takeLatest, all, fork, take} from "redux-saga/effects";
import AuditChecklistApi from "../../api/auditChecklist/AuditChecklistApi";
import {auditChecklistActions} from "./auditChecklistReducer";
import * as types from "../actionTypes";

export function* auditChecklistCreateRequest() {
    yield takeLatest(auditChecklistActions.createAuditChecklistRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistApi.create, action.payload);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.setAuditChecklistsAfterCreation.type,
                    auditChecklist: response.data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Unable to create checklist"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export function* auditChecklistDeleteRequest() {
    yield takeLatest(auditChecklistActions.deleteAuditChecklistRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistApi.delete, action.payload);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.setAuditChecklistsAfterDelete.type,
                    auditChecklistId: action.payload.id
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Unable to delete checklist"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export function* auditChecklistUpdateRequest() {
    yield takeLatest(auditChecklistActions.updateAuditChecklistRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistApi.put, action.payload.checklist);
            if(response.code === "200") {
                debugger;
                yield put({
                    type: auditChecklistActions.setChecklistAfterUpdate.type,
                    auditChecklist: response.data.auditChecklist
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Unable to update checklist"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export function* auditChecklistRequest() {
    yield takeLatest(auditChecklistActions.getAuditChecklist.type, function*(action) {
        try {
            const response = yield call(AuditChecklistApi.get, action.payload);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.setAuditChecklist.type,
                    auditChecklist: response.data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Unable to fetch checklist"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export function* auditChecklistActiveRequest() {
    yield takeLatest(auditChecklistActions.getAllActiveRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistApi.getAllActive, action.payload);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.setAuditChecklists.type,
                    auditChecklists: response.data,
                    totalCount: response.meta.totalCount
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Unable to fetch checklist"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export function* auditChecklistActiveWithItemsRequest() {
    yield takeLatest(auditChecklistActions.getAuditChecklistsActiveWithItemsRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistApi.getAllActiveWithItems, action.payload);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.setAuditChecklists.type,
                    auditChecklists: response.data,
                    totalCount: response.meta.totalCount
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Unable to fetch checklist"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export function* auditChecklistDomainsRequest() {
    yield takeLatest(auditChecklistActions.getAuditChecklistsDomains.type, function*(action) {
        try {
            const response = yield call(AuditChecklistApi.getAuditChecklistsDomains, action.payload);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.setAuditChecklistsDomains.type,
                    auditChecklistDomains: response.data
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Unable to fetch checklist domains"
            });
        }
    });
}

export function* auditChecklistTypesRequest() {
    yield takeLatest(auditChecklistActions.getAuditChecklistTypes.type, function*(action) {
        try {
            const response = yield call(AuditChecklistApi.getAuditChecklistsTypes, action.payload);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.setAuditChecklistTypes.type,
                    auditChecklistTypes: response.data
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Unable to fetch checklist types"
            });
        }
    });
}

export function* createNewVersionRequest() {
    yield takeLatest(auditChecklistActions.createNewVersionRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistApi.createNewVersion, action.payload.checklist);
            if (response.code === "200") {
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
                yield put({
                    type: auditChecklistActions.getAllActiveRequest.type,
                    payload: action.payload.pagination
                });
            } else {
                yield put({type: types.AJAX_FAILED})
            }
        } catch (e) {
            yield put({type: types.AJAX_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* auditDndChecklistsGetRequest() {
    yield takeLatest(auditChecklistActions.getAuditDndChecklistRequest.type, function*(action ) {
        try {
            const response = yield call(AuditChecklistApi.getAuditDndChecklist, action.payload);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.setAuditDndChecklist.type,
                    auditDndChecklist: response.data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                });
            }
        } catch (e) {
            yield put({type: types.AJAX_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    })
}

export function* auditDndChecklistUpdateOrderRequest() {
    yield takeLatest(auditChecklistActions.updateAuditChecklistOrderRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistApi.updateOrderNew, action.payload);
            if(response.code === "200") {
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                });
            }
        } catch (e) {
            yield put({type: types.AJAX_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    })
}

export function* downloadPDFAuditChecklist() {
    yield takeLatest(auditChecklistActions.downloadPDFRequest.type, function*(action) {
        try {
            const channel = yield call(AuditChecklistApi.createPDF, action.payload);
            try {
                while (true) {
                    // take(END) will cause the saga to terminate by jumping to the finally block
                    const action = yield take(channel);
                    yield put(action);
                }
            } finally {
                yield put({
                    type: types.DOWNLOAD_FILE_PROGRESS_CLOSE,
                    progressOpened: false
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: "File downloaded"
                });
            }
        } catch (e) {
            yield put({
                type: types.DOWNLOAD_FILE_PROGRESS_CLOSE,
                progressOpened: false
            });
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to download file"
            });
        }
        finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* downloadExcelAuditChecklist() {
    yield takeLatest(auditChecklistActions.downloadExcelRequest.type, function*(action) {
        try {
            const channel = yield call(AuditChecklistApi.createExcel, action.payload);
            try {
                while (true) {
                    // take(END) will cause the saga to terminate by jumping to the finally block
                    const action = yield take(channel);
                    yield put(action);
                }
            } finally {
                yield put({
                    type: types.DOWNLOAD_FILE_PROGRESS_CLOSE,
                    progressOpened: false
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: "File downloaded"
                });
            }
        } catch (e) {
            yield put({
                type: types.DOWNLOAD_FILE_PROGRESS_CLOSE,
                progressOpened: false
            });
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to download file"
            });
        }
        finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* uploadChecklistRequest() {
    yield takeLatest(auditChecklistActions.uploadCSVChecklistRequest.type, function*(action) {
        try {
            const channel = yield call(AuditChecklistApi.uploadCSV, action.payload.checklistData);
            try {
                while (true) {
                    yield put({
                        type: types.DOWNLOAD_FILE_PROGRESS_OPEN,
                        progressOpened: true,
                    });
                    // take(END) will cause the saga to terminate by jumping to the finally block
                    const { progress = 0, success = false, data } = yield take(channel);
                    if(success) {
                        if (data.code === "200") {
                            yield put({
                                type: auditChecklistActions.getAuditDndChecklistRequest.type,
                                payload: action.payload.checklistId
                            });
                            yield put({
                                type: types.AJAX_SUCCESS,
                                message: "Upload successful. Added items: " + data.data.length
                            });
                        } else {
                            yield put({
                                type: types.AJAX_FAILED,
                                message: "Failed to fetch info"
                            });
                        }
                    }
                    yield put({
                        type: types.DOWNLOAD_FILE_PROGRESS,
                        progress: progress,
                    });
                }
            } finally {
                yield put({
                    type: types.DOWNLOAD_FILE_PROGRESS_CLOSE,
                    progressOpened: false
                });
            }
        } catch (e) {
            console.log(e);
            yield put({
                type: types.DOWNLOAD_FILE_PROGRESS_CLOSE,
                progressOpened: false
            });
            yield put({
                type: types.AJAX_FAILED,
                message: "Error on server. Update failed!"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(auditChecklistDeleteRequest),
        fork(auditChecklistUpdateRequest),
        fork(auditChecklistRequest),
        fork(auditChecklistActiveRequest),
        fork(auditChecklistActiveWithItemsRequest),
        fork(auditChecklistDomainsRequest),
        fork(auditChecklistTypesRequest),
        fork(createNewVersionRequest),
        fork(auditChecklistCreateRequest),
        fork(auditDndChecklistsGetRequest),
        fork(auditDndChecklistUpdateOrderRequest),
        fork(downloadPDFAuditChecklist),
        fork(downloadExcelAuditChecklist),
        fork(uploadChecklistRequest)
    ]);
}
import {call, put, takeLatest, all, fork } from "redux-saga/effects";
import AuditChecklistItemApi from "../../api/auditChecklist/AuditChecklistItemApi";
import { auditChecklistItemActions } from "./auditChecklistItemReducer";
import * as types from "../actionTypes";
import { auditChecklistActions } from "../auditChecklist/auditChecklistReducer";

export function* auditChecklistItemRequest() {
    yield takeLatest(auditChecklistItemActions.getAuditChecklistItemRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistItemApi.get, action.payload)
            if(response.code === "200") {
                yield put({
                    type: auditChecklistItemActions.setAuditChecklistItem.type,
                    auditItem: response.data
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
                message: "Unable to fetch checklist item"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export function* auditChecklistItemCreateRequest() {
    yield takeLatest(auditChecklistItemActions.createAuditChecklistItemRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistItemApi.create, action.payload);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.getAuditDndChecklistRequest.type,
                    payload: { id: action.payload.auditChecklist.auditChecklistId }
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
                message: "Unable to fetch checklist item"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export function* auditChecklistItemUpdateRequest() {
    yield takeLatest(auditChecklistItemActions.updateAuditChecklistItemRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistItemApi.update, action.payload)
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.getAuditDndChecklistRequest.type,
                    payload: { id: action.payload.auditChecklist.auditChecklistId }
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
                message: "Unable to fetch checklist item"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export function* auditChecklistItemDeleteRequest() {
    yield takeLatest(auditChecklistItemActions.deleteAuditChecklistItemRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistItemApi.delete, action.payload);
            debugger;
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.getAuditDndChecklistRequest.type,
                    payload: { id: action.payload.auditChecklist.auditChecklistId }
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
                message: "Unable to delete checklist item"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(auditChecklistItemRequest),
        fork(auditChecklistItemUpdateRequest),
        fork(auditChecklistItemCreateRequest),
        fork(auditChecklistItemDeleteRequest),
    ]);
}
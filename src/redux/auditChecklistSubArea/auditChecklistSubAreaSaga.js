import {call, put, takeLatest, all, fork } from "redux-saga/effects";
import { auditChecklistSubAreaActions } from "./auditChecklistSubAreaReducer";
import * as types from "../actionTypes";
import AuditChecklistSubAreaApi from "../../api/auditChecklist/AuditChecklistSubAreaApi";
import { auditChecklistActions } from "../auditChecklist/auditChecklistReducer";

export function* auditChecklistSubAreaGetRequest() {
    yield takeLatest(auditChecklistSubAreaActions.getAuditChecklistSubAreaRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistSubAreaApi.get, action.payload);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistSubAreaActions.setAuditChecklistSubArea.type,
                    auditChecklistSubArea: response.data
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
        } catch(e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Unable to fetch checklist subarea."
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export function* auditChecklistSubAreaCreateRequest() {
    yield takeLatest(auditChecklistSubAreaActions.createAuditChecklistSubAreaRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistSubAreaApi.create, action.payload.auditChecklistSubArea);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.getAuditDndChecklistRequest.type,
                    payload: {id: action.payload.checklistId}
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
                message: "Unable to create checklist subarea."
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });

}

export function* auditChecklistSubAreaUpdateRequest() {
    yield takeLatest(auditChecklistSubAreaActions.updateAuditChecklistSubAreaRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistSubAreaApi.update, action.payload.auditChecklistSubArea);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.getAuditDndChecklistRequest.type,
                    payload: {id: action.payload.checklistId}
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
                message: "Unable to update checklist subarea."
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export function* auditChecklistSubAreaDeleteRequest() {
    yield takeLatest(auditChecklistSubAreaActions.deleteAuditChecklistSubAreaRequest.type, function*(action) {
        try {
            const response = yield call(AuditChecklistSubAreaApi.delete, action.payload.auditChecklistSubArea);
            if(response.code === "200") {
                yield put({
                    type: auditChecklistActions.getAuditDndChecklistRequest.type,
                    payload: {id: action.payload.checklistId}
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
                message: "Unable to delete checklist subarea."
            });
        } finally {
            yield put({type: types.AJAX_FINISHED});
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(auditChecklistSubAreaGetRequest),
        fork(auditChecklistSubAreaCreateRequest),
        fork(auditChecklistSubAreaUpdateRequest),
        fork(auditChecklistSubAreaDeleteRequest),
    ]);
}
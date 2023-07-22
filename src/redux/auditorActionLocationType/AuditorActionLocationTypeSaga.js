import {call, put, takeLatest, all, fork } from "redux-saga/effects";
import { auditorActionLocationType } from "./AuditorActionLocationTypeReducer";
import * as types from "../actionTypes";
import LocationTypeApi from "../../api/auditChecklist/LocationTypeApi";

export function* getAllAuditorActionLocationType() {
    yield takeLatest(auditorActionLocationType.getLocationTypes.type, function*() {
        try {
            const response = yield call(LocationTypeApi.getAll);
            if(response.code === "200") {
                yield put({
                    type: auditorActionLocationType.setLocationTypes.type,
                    locationTypes: response.data
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
                message: "Unable to fetch auditor actions location types."
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getAllAuditorActionLocationType)
    ]);
}
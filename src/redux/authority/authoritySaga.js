import { all, takeEvery, takeLatest, put, call, fork } from 'redux-saga/effects';
import * as types from '../actionTypes';
import AuthorityApi from '../../api/AuthorityApi';

export function* authoritiesRequest() {
    yield takeLatest(types.LOAD_AUTHORITIES_REQUEST, function*(action) {
        try {
            const response = yield call(AuthorityApi.getAll);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_AUTHORITIES_SUCCESS,
                    authorities: data
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

export function* authorityRequest() {
    yield takeLatest(types.LOAD_AUTHORITY_REQUEST, function*(action) {
        try {
            const response = yield call(AuthorityApi.get, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_AUTHORITY_SUCCESS,
                    authority: data
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

export default function* rootSaga() {
    yield all([
        fork(authoritiesRequest, authorityRequest)
    ]);
}

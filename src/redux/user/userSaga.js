import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as types from '../actionTypes';
import UserApi from '../../api/UserApi';
import {getUsersPath} from '../../consts/routePaths';

export function* usersRequest() {
    yield takeLatest(types.LOAD_USERS_REQUEST, function*(action) {
        try {
            const response = yield call(UserApi.getAll, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.LOAD_USERS_SUCCESS,
                    users: data
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

export function* usersSimpleRequest() {
    yield takeLatest(types.LOAD_USERS_SIMPLE_REQUEST, function*(action) {
        try {
            const response = yield call(UserApi.getAllSimple, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.LOAD_USERS_SIMPLE_SUCCESS,
                    usersSimple: data
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                })
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch users"
            })
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* usersPaginationRequest() {
    yield takeLatest(types.LOAD_USERS_PAGINATION_REQUEST, function*(action) {
        try {
            const response = yield call(UserApi.getAllPagination, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.LOAD_USERS_PAGINATION_SUCCESS,
                    users: data,
                    totalCount: meta.totalCount
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

export function* userRequest() {
    yield takeLatest(types.LOAD_USER_REQUEST, function*(action) {
        try {
            const response = yield call(UserApi.get, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_USER_SUCCESS,
                    user: data
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

export function* createRequest() {
    yield takeLatest(types.CREATE_USER_REQUEST, function*(action) {
        try {
            const response = yield call(UserApi.create, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.CREATE_USER_SUCCESS,
                    user: data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
                yield put(push(getUsersPath(0, 25)));
            } else if (response.code === "EMAIL_EXIST") {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Email already exist with other user!"
                });
            }
            else if (response.code === "USER_EXIST"){
                    yield put({
                        type: types.AJAX_FAILED,
                        message: "Username already exist with other user!"
                    });
            }else {
                yield put({type: types.AJAX_FAILED})
            }

        } catch (e) {
            yield put({type: types.AJAX_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}



export function* updateRequest() {
    yield takeLatest(types.UPDATE_USER_REQUEST, function*(action) {
        try {
            const response = yield call(UserApi.update, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.UPDATE_USER_SUCCESS,
                    user: data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else if (response.code === "EMAIL_EXIST") {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Email already exist with other user!"
                });
            }
            else if (response.code === "USER_EXIST"){
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Username already exist with other user!"
                });
            }
            else {
                yield put({type: types.AJAX_FAILED})
            }
        } catch (e) {
            yield put({type: types.AJAX_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* deleteRequest() {
    yield takeLatest(types.DELETE_USER_REQUEST, function*(action) {
        try {
            const response = yield call(UserApi.delete, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put(push(getUsersPath(0, 25)));
                yield put({
                    type: types.DELETE_USER_SUCCESS,
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

export function* reactivateRequest() {
    yield takeLatest(types.REACTIVATE_USER_REQUEST, function*(action) {
        try {
            const response = yield call(UserApi.reactivate, action.viewModel);
            if (response.code === "200") {
                yield put({
                    type: types.REACTIVATE_USER_SUCCESS,
                    user: response.data
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

export function* renewCode() {
    yield takeLatest(types.RENEW_CODE_USER_REQUEST, function*(action) {
        try {
            const response = yield call(UserApi.renewCode, action.viewModel);
            if (response.code === "200") {
                yield put({
                    type: types.RENEW_CODE_USER_SUCCESS,
                    user: response.data
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
        fork(usersRequest),
        fork(usersSimpleRequest),
        fork(userRequest),
        fork(createRequest),
        fork(updateRequest),
        fork(reactivateRequest),
        fork(renewCode),
        fork(usersPaginationRequest),
        fork(deleteRequest),
    ]);
}

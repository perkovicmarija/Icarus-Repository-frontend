import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as types from '../../actionTypes';
import UserRoleApi from '../../../api/UserRoleApi';

export function* userRolesRequest() {
    yield takeLatest(types.LOAD_USER_ROLES_REQUEST, function*(action) {
        try {
            const response = yield call(UserRoleApi.getAll, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.LOAD_USER_ROLES_SUCCESS,
                    userRoles: data,
                });
            } else {
                yield put({type: types.LOAD_USER_ROLES_FAILED})
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch all roles"
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_USER_ROLES_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch all roles"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* userRolesPaginationRequest() {
    yield takeLatest(types.LOAD_USER_ROLES_PAGINATION_REQUEST, function*(action) {
        try {
            const response = yield call(UserRoleApi.getAllPagination, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.LOAD_USER_ROLES_PAGINATION_SUCCESS,
                    userRoles: data,
                    totalCount: meta.totalCount
                });
            } else {
                yield put({type: types.LOAD_USER_ROLES_FAILED})
            }
        } catch (e) {
            yield put({type: types.LOAD_USER_ROLES_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* userRoleRequest() {
    yield takeLatest(types.LOAD_USER_ROLE_REQUEST, function*(action) {
        try {
            const response = yield call(UserRoleApi.get, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_USER_ROLE_SUCCESS,
                    userRole: data
                });
            } else {
                yield put({type: types.LOAD_USER_ROLE_FAILED});
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch roles"
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_USER_ROLE_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch roles"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* createRequest() {
    yield takeLatest(types.CREATE_USER_ROLE_REQUEST, function*(action) {
        try {
            const response = yield call(UserRoleApi.create, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.CREATE_USER_ROLE_SUCCESS,
                    userRoles: data,
                    totalCount: meta.totalCount
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.CREATE_USER_ROLE_FAILED});
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to create role"
                });
            }
        } catch (e) {
            yield put({type: types.CREATE_USER_ROLE_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to create role"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* updateRequest() {
    yield takeLatest(types.UPDATE_USER_ROLE_REQUEST, function*(action) {
        try {
            const response = yield call(UserRoleApi.update, action.viewModel.requestBody, action.viewModel.params);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.UPDATE_USER_ROLE_SUCCESS,
                    userRoles: data,
                    totalCount: meta.totalCount
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.UPDATE_USER_ROLE_FAILED})
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to update role"
                });
            }
        } catch (e) {
            yield put({type: types.UPDATE_USER_ROLE_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to update role"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* deleteRequest() {
    yield takeLatest(types.DELETE_USER_ROLE_REQUEST, function*(action) {
        try {
            const response = yield call(UserRoleApi.delete, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.DELETE_USER_ROLE_SUCCESS,
                    userRoles: data,
                    totalCount: meta.totalCount
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.DELETE_USER_ROLE_FAILED})
            }
        } catch (e) {
            yield put({type: types.DELETE_USER_ROLE_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(userRolesRequest),
        fork(userRoleRequest),
        fork(createRequest),
        fork(updateRequest),
        fork(deleteRequest),
        fork(userRolesPaginationRequest)
    ]);
}

import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as types from '../../actionTypes';
import UserGroupApi from '../../../api/UserGroupApi';

export function* userGroupsRequest() {
    yield takeLatest(types.LOAD_USER_GROUPS_REQUEST, function*(action) {
        try {
            const response = yield call(UserGroupApi.getAll, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.LOAD_USER_GROUPS_SUCCESS,
                    userGroups: data,
                });
            } else {
                yield put({type: types.LOAD_USER_GROUPS_FAILED})
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch all user groups"
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_USER_GROUPS_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch all user groups"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* userGroupsPaginationRequest() {
    yield takeLatest(types.LOAD_USER_GROUPS_PAGINATION_REQUEST, function*(action) {
        try {
            const response = yield call(UserGroupApi.getAllPagination, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.LOAD_USER_GROUPS_PAGINATION_SUCCESS,
                    userGroups: data,
                    totalCount: meta.totalCount
                });
            } else {
                yield put({type: types.LOAD_USER_GROUPS_FAILED})
            }
        } catch (e) {
            yield put({type: types.LOAD_USER_GROUPS_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* userGroupRequest() {
    yield takeLatest(types.LOAD_USER_GROUP_REQUEST, function*(action) {
        try {
            const response = yield call(UserGroupApi.get, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_USER_GROUP_SUCCESS,
                    userGroup: data
                });
            } else {
                yield put({type: types.LOAD_USER_GROUP_FAILED});
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch roles"
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_USER_GROUP_FAILED});
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
    yield takeLatest(types.CREATE_USER_GROUP_REQUEST, function*(action) {
        try {
            const response = yield call(UserGroupApi.create, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.CREATE_USER_GROUP_SUCCESS,
                    userGroups: data,
                    totalCount: meta.totalCount
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.CREATE_USER_GROUP_FAILED});
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to create role"
                });
            }
        } catch (e) {
            yield put({type: types.CREATE_USER_GROUP_FAILED});
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
    yield takeLatest(types.UPDATE_USER_GROUP_REQUEST, function*(action) {
        try {
            const response = yield call(UserGroupApi.update, action.viewModel.requestBody, action.viewModel.params);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.UPDATE_USER_GROUP_SUCCESS,
                    userGroups: data,
                    totalCount: meta.totalCount
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.UPDATE_USER_GROUP_FAILED})
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to update user groups"
                });
            }
        } catch (e) {
            yield put({type: types.UPDATE_USER_GROUP_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to update user group"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* deleteRequest() {
    yield takeLatest(types.DELETE_USER_GROUP_REQUEST, function*(action) {
        try {
            const response = yield call(UserGroupApi.delete, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.DELETE_USER_GROUP_SUCCESS,
                    userGroups: data,
                    totalCount: meta.totalCount
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.DELETE_USER_GROUP_FAILED})
            }
        } catch (e) {
            yield put({type: types.DELETE_USER_GROUP_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(userGroupsRequest),
        fork(userGroupRequest),
        fork(createRequest),
        fork(updateRequest),
        fork(deleteRequest),
        fork(userGroupsPaginationRequest)
    ]);
}

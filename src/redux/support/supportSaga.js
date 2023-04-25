import { all, take, takeLatest, put, call, fork } from 'redux-saga/effects';
import * as types from '../actionTypes';
import SupportCenterApi from '../../api/SupportCenterApi';
import ClientApi from "../../api/ClientApi";
import {
    DELETE_SOFTWARE_LOG_FAILED,
    DELETE_SOFTWARE_LOG_SUCCESS,
    UPDATE_SOFTWARE_LOG_FAILED,
    UPDATE_SOFTWARE_LOG_SUCCESS
} from "../actionTypes";

export function* supportCentersRequest() {
    yield takeLatest(types.LOAD_SUPPORT_CENTER_ALL_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.getAll, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.LOAD_SUPPORT_CENTER_ALL_SUCCESS,
                    supportBugs: data,
                    totalCount: meta.totalCount
                });
            } else {
                yield put({type: types.LOAD_SUPPORT_CENTER_ALL_FAILED})
            }
        } catch (e) {
            console.log("error");
            yield put({type: types.LOAD_SUPPORT_CENTER_ALL_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* supportBug() {
    yield takeLatest(types.LOAD_SUPPORT_CENTER_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.get, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_SUPPORT_CENTER_SUCCESS,
                    supportBug: data
                });
            } else {
                yield put({type: types.LOAD_SUPPORT_CENTER_FAILED})
            }
        } catch (e) {
            yield put({type: types.LOAD_SUPPORT_CENTER_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* createRequest() {
    yield takeLatest(types.CREATE_SUPPORT_CENTER_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.create, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.CREATE_SUPPORT_CENTER_SUCCESS,
                    supportBugs: data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.CREATE_SUPPORT_CENTER_FAILED})
            }
        } catch (e) {
            yield put({type: types.CREATE_SUPPORT_CENTER_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* updateRequest() {
    yield takeLatest(types.UPDATE_SUPPORT_CENTER_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.update, action.viewModel);
            const data = response.data;
            if (response.code === "200") {
                yield put({
                    type: types.UPDATE_SUPPORT_CENTER_SUCCESS,
                    supportBug: data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.UPDATE_SUPPORT_CENTER_FAILED})
            }
        } catch (e) {
            yield put({type: types.UPDATE_SUPPORT_CENTER_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* getAllModulesRequest() {
    yield takeLatest(types.LOAD_SUPPORT_CENTER_MODULES_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.getAllModules, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_SUPPORT_CENTER_MODULES_SUCCESS,
                    modules: data,
                });
            } else {
                yield put({type: types.LOAD_SUPPORT_CENTER_MODULES_FAILED})
            }
        } catch (e) {
            console.log("error");
            yield put({type: types.LOAD_SUPPORT_CENTER_MODULES_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* getAllLevelsRequest() {
    yield takeLatest(types.LOAD_SUPPORT_CENTER_LEVELS_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.getAllLevels, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_SUPPORT_CENTER_LEVELS_SUCCESS,
                    levels: data,
                });
            } else {
                yield put({type: types.LOAD_SUPPORT_CENTER_LEVELS_FAILED})
            }
        } catch (e) {
            console.log("error");
            yield put({type: types.LOAD_SUPPORT_CENTER_LEVELS_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* getAllStatusesRequest() {
    yield takeLatest(types.LOAD_SUPPORT_CENTER_STATUSES_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.getAllStatuses, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_SUPPORT_CENTER_STATUSES_SUCCESS,
                    statuses: data,
                });
            } else {
                yield put({type: types.LOAD_SUPPORT_CENTER_STATUSES_FAILED})
            }
        } catch (e) {
            console.log("error");
            yield put({type: types.LOAD_SUPPORT_CENTER_STATUSES_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* addCommentRequest() {
    yield takeLatest(types.ADD_COMMENT_SUPPORT_CENTER_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.addComment, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.ADD_COMMENT_SUPPORT_CENTER_SUCCESS,
                    supportBug: data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.ADD_COMMENT_SUPPORT_CENTER_FAILED})
            }
        } catch (e) {
            yield put({type: types.ADD_COMMENT_SUPPORT_CENTER_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}



export function* createWithAttachmentsRequest() {
    yield takeLatest(types.CREATE_SUPPORT_CENTER_WITH_ATTACHMENTS, function* (action) {
        try {
            const channel = yield call(SupportCenterApi.createWithAttachments, action.viewModel);
            try {
                while (true) {
                    yield put({
                        type: types.DOWNLOAD_FILE_PROGRESS_OPEN,
                        progressOpened: true,
                    });

                    // take(END) will cause the saga to terminate by jumping to the finally block
                    const { progress = 0, err, success = false, data } = yield take(channel);
                    if(success) {
                        if (data.code === "200") {
                            yield put({
                                type: types.CREATE_SUPPORT_CENTER_SUCCESS,
                                supportBug: data.data
                            });
                            yield put({
                                type: types.AJAX_SUCCESS,
                                message: data.message
                            });
                        } else {
                            yield put({
                                type: types.AJAX_FAILED,
                                message: data.message
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
            yield put({
                type: types.DOWNLOAD_FILE_PROGRESS_CLOSE,
                progressOpened: false
            });
            yield put({
                type: types.AJAX_FAILED,
                message: "Error on server. Create failed!"
            });
        }
    });
}

export function* updateWithAttachmentsRequest() {
    yield takeLatest(types.UPDATE_SUPPORT_CENTER_WITH_ATTACHMENTS, function*(action) {
        try {
            debugger;
            const channel = yield call(SupportCenterApi.updateWithAttachments, action.viewModel);
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
                                type: types.UPDATE_SUPPORT_CENTER_SUCCESS,
                                supportBug: data.data
                            });
                            yield put({
                                type: types.AJAX_SUCCESS,
                                message: data.message
                            });
                        } else {
                            yield put({
                                type: types.AJAX_FAILED,
                                message: data.message
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
            yield put({
                type: types.DOWNLOAD_FILE_PROGRESS_CLOSE,
                progressOpened: false
            });
            yield put({
                type: types.AJAX_FAILED,
                message: "Error on server. Update failed!"
            });
        }
    });
}

export function* downloadRequest() {
    yield takeLatest(types.DOWNLOAD_SUPPORT_CENTER_ATTACHMENT, function*(action) {
        try {
            const channel = yield call(SupportCenterApi.download, action.viewModel);
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
                type: types.AJAX_FAILED,
                message: "Failed to download file"
            });
        }
    });
}


export function* icarusSoftwareLogsRequest() {
    yield takeLatest(types.LOAD_SOFTWARE_LOGS_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.getAllSoftwareLogClients, action.viewModel);
            if (response.code === "200") {
                const data = response.data
                //const meta = response.meta;
                yield put({
                    type: types.LOAD_SOFTWARE_LOGS_SUCCESS,
                    softwareLogs: data,
                    //totalCount: meta.totalCount
                });
            } else {
                yield put({type: types.LOAD_SOFTWARE_LOGS_FAILED})
            }
        } catch (e) {
            console.log("error");
            yield put({type: types.LOAD_SOFTWARE_LOGS_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* createSoftwareLogRequest() {
    yield takeLatest(types.CREATE_SOFTWARE_LOG_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.createSoftwareLogClient, action.viewModel);
            if (response.code === "200") {
                yield put({
                    type: types.CREATE_SOFTWARE_LOG_SUCCESS,
                    softwareLog: response.data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.CREATE_SOFTWARE_LOG_FAILED})
            }
        } catch (e) {
            yield put({type: types.CREATE_SOFTWARE_LOG_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* updateSoftwareLogRequest() {
    yield takeLatest(types.UPDATE_SOFTWARE_LOG_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.updateSoftwareLogClient, action.viewModel.requestBody);
            if (response.code === "200") {
                yield put({
                    type: types.UPDATE_SOFTWARE_LOG_SUCCESS,
                    softwareLog: response.data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.UPDATE_SOFTWARE_LOG_FAILED})
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to update software log"
                });
            }
        } catch (e) {
            yield put({type: types.UPDATE_SOFTWARE_LOG_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to update software log"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* deleteSoftwareLogRequest() {
    yield takeLatest(types.DELETE_SOFTWARE_LOG_REQUEST, function*(action) {
        try {
            const response = yield call(SupportCenterApi.deleteSoftwareLogClient, action.viewModel);
            if (response.code === "200") {
                yield put({
                    type: types.DELETE_SOFTWARE_LOG_SUCCESS,
                    softwareLog: {}
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.DELETE_SOFTWARE_LOG_FAILED})
            }
        } catch (e) {
            yield put({type: types.DELETE_SOFTWARE_LOG_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(supportCentersRequest),
        fork(supportBug),
        fork(createRequest),
        fork(updateRequest),
        fork(getAllModulesRequest),
        fork(getAllLevelsRequest),
        fork(getAllStatusesRequest),
        fork(addCommentRequest),
        fork(createWithAttachmentsRequest),
        fork(updateWithAttachmentsRequest),
        fork(downloadRequest),
        fork(icarusSoftwareLogsRequest),
        fork(createSoftwareLogRequest),
        fork(updateSoftwareLogRequest),
        fork(deleteSoftwareLogRequest),
    ]);
}

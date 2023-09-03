import { all, take, takeLatest, put, call, fork, cancelled, cancel } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as types from '../../../actionTypes';
import { CancelToken } from 'axios'
import IcarusDocumentationFileApi from "../../../../api/IcarusDocumentationFileApi";

export function* documentationFilesRequest() {
    yield takeLatest(types.LOAD_ICARUS_DOCUMENTATION_FILES_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.getAll, action.viewModel);
            debugger
            if (response.code === "200") {
                const data = response.data;
                // const meta = response.meta;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FILES_SUCCESS,
                    documentationFiles: data,
                });
            } else {
                yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FILES_FAILED})
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch all documentationFiles"
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FILES_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch all documentationFiles"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* documentationFileRequest() {
    yield takeLatest(types.LOAD_ICARUS_DOCUMENTATION_FILE_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.get, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FILE_SUCCESS,
                    documentationFile: data
                });
            } else {
                yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FILE_FAILED});
                yield put({
                    type: types.AJAX_FAILED,
                    message: response.message
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FILE_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch documentationFile"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* loadRevisionsRequest() {
    yield takeLatest(types.LOAD_ICARUS_DOCUMENTATION_FILE_REVISIONS_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.getRevisions, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FILE_REVISIONS_SUCCESS,
                    documentationFileRevisions: data
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch file revisions"
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch file revisions"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* loadHistoryRequest() {
    yield takeLatest(types.LOAD_ICARUS_DOCUMENTATION_FILE_HISTORY_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.getHistory, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FILE_HISTORY_SUCCESS,
                    documentationFileHistory: data
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch file download history"
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch file download history"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* moveRequest() {
    yield takeLatest(types.ICARUS_DOCUMENTATION_FILE_MOVE_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.moveFile, action.viewModel);
            const message = response.message;
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FILES_SUCCESS,
                    documentationFiles: data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message
                });
            } else if(response.code === "500") {
                yield put({
                    type: types.AJAX_FAILED,
                    message: message
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to move file"
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to move file"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* loadInFolderRequest() {
    yield takeLatest(types.LOAD_ICARUS_DOCUMENTATION_FILES_IN_FOLDER_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.getAllInFolder, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FILES_SUCCESS,
                    documentationFiles: data
                });
            } else {
                yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FILES_IN_FOLDER_FAILED});
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch files in folder"
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FILES_IN_FOLDER_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch documentationFile"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* loadBySearchRequest() {
    yield takeLatest(types.LOAD_ICARUS_DOCUMENTATION_FILES_BY_SEARCH_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.getBySearch, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FILES_SUCCESS,
                    documentationFiles: data
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch files"
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch files"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* createRequest() {
    yield takeLatest(types.CREATE_ICARUS_DOCUMENTATION_FILE_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.create, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.CREATE_ICARUS_DOCUMENTATION_FILE_SUCCESS,
                    documentationFile: data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
                yield put(push('/dashboard/riskManagement/documentationFileRiskRegistry'));
            } else {
                yield put({type: types.CREATE_ICARUS_DOCUMENTATION_FILE_FAILED});
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to create documentationFile"
                });
            }
        } catch (e) {
            yield put({type: types.CREATE_ICARUS_DOCUMENTATION_FILE_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to create documentationFile"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* updateRequest() {
    yield takeLatest(types.UPDATE_ICARUS_DOCUMENTATION_FILE_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.update, action.viewModel);
            if (response.code === "200") {
                // const data = response.data;
                yield put({
                    type: types.UPDATE_ICARUS_DOCUMENTATION_FILE_SUCCESS,
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.UPDATE_ICARUS_DOCUMENTATION_FILE_FAILED})
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to update documentationFile"
                });
            }
        } catch (e) {
            yield put({type: types.UPDATE_ICARUS_DOCUMENTATION_FILE_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to update documentationFile"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* uploadRequest() {
    yield takeLatest(types.UPLOAD_ICARUS_DOCUMENTATION_FILE, function*(action) {
        try {
            const channel = yield call(IcarusDocumentationFileApi.uploadFile, action.viewModel);
            try {
                while (true) {
                    // take(END) will cause the saga to terminate by jumping to the finally block
                    const { progress = 0, openDialog = false, err, success = false, data } = yield take(channel);
                    if(success) {
                        yield put({
                            type: types.AJAX_SUCCESS,
                            message: data.message
                        });
                        yield put(push('/admin/support-center/icarus-docs'));
                    }
                    if(err) {
                        yield put({
                            type: types.AJAX_FAILED,
                            message: "Failed to upload file"
                        });
                    }

                    if(openDialog) {
                        yield put({
                            type: types.DOWNLOAD_FILE_PROGRESS_OPEN,
                            progressOpened: true,
                        });
                    }

                    yield put({
                        type: types.DOWNLOAD_FILE_PROGRESS,
                        progress: progress,
                    });
                }
            } catch(e) {
                console.log(e);
                yield put({type: types.UPDATE_ICARUS_DOCUMENTATION_FILE_FAILED});
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to upload file"
                });
            } finally {
                yield put({
                    type: types.DOWNLOAD_FILE_PROGRESS_CLOSE,
                    progressOpened: false
                });
            }
        } catch (e) {
            console.log(e);
            yield put({type: types.UPDATE_ICARUS_DOCUMENTATION_FILE_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to upload file"
            });
        }
    });
}

export function* reviseRequest() {
    yield takeLatest(types.REVISE_ICARUS_DOCUMENTATION_FILE_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.revise, action.viewModel);
            if (response.code === "200") {
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
                yield put(push('/admin/support-center/icarus-docs'));
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to revise file"
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to revise file"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* editRequest() {
    yield takeLatest(types.EDIT_ICARUS_DOCUMENTATION_FILE_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.edit, action.viewModel);
            if (response.code === "200") {
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
                yield put(push('/admin/support-center/icarus-docs'));
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to revise file"
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to revise file"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

let downloadTask;
export function* downloadFileByGetRequest() {
    downloadTask = yield takeLatest(types.DOWNLOAD_ICARUS_DOCUMENTATION_FILE, function*(action) {
        let channel;
        try {
            const source = CancelToken.source();
            channel = yield call(IcarusDocumentationFileApi.download, action.viewModel);
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
                if (yield(cancelled())) {
                    // Cancel the API call if the saga was cancelled
                    channel.close();
                } else {
                    yield put({
                        type: types.AJAX_SUCCESS,
                        message: "File downloaded"
                    });
                }
            }
        } catch (e) {
            console.error(e.message);
            yield put({
                type: types.DOWNLOAD_FILE_PROGRESS_CLOSE,
                progressOpened: false
            });
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to download file"
            });
        }
    });
}

export function* cancelDownloadFile() {
    yield takeLatest(types.CANCEL_DOWNLOAD_ICARUS_DOCUMENTATION_FILE, function*(action) {
        if(downloadTask) {
            yield cancel(downloadTask);
            yield fork(downloadFileByGetRequest);
        }
    });
}

let viewTask;
export function* viewFileRequest() {
    viewTask = yield takeLatest(types.VIEW_ICARUS_DOCUMENTATION_FILE, function*(action) {
        try {
            const channel = yield call(IcarusDocumentationFileApi.view, action.viewModel);
            try {
                while (true) {
                    yield put({
                        type: types.DOWNLOAD_FILE_PROGRESS_OPEN,
                        progressOpened: true,
                    });

                    const { progress = 0, success = false, data } = yield take(channel);
                    if(success) {
                        yield put({
                            type: types.VIEW_ICARUS_DOCUMENTATION_FILE_SUCCESS,
                            file: data
                        });
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
                if (yield(cancelled())) {
                    // Cancel the API call if the saga was cancelled
                    channel.close();
                } else {
                    yield put({
                        type: types.AJAX_SUCCESS,
                        message: "File downloaded"
                    });
                }
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
    });
}

export function* cancelViewFile() {
    yield takeLatest(types.CANCEL_VIEW_ICARUS_DOCUMENTATION_FILE, function*(action) {
        if(viewTask) {
            yield cancel(viewTask);
            yield put(push('/admin/support-center/icarus-docs'));
            yield fork(viewFileRequest);
        }
    });
}

export function* deleteRequest() {
    yield takeLatest(types.DELETE_ICARUS_DOCUMENTATION_FILE_REQUEST, function*(action) {
        try {
            const response = yield call(IcarusDocumentationFileApi.delete, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FILES_SUCCESS,
                    documentationFiles: data
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
        fork(documentationFilesRequest),
        fork(documentationFileRequest),
        fork(loadInFolderRequest),
        fork(createRequest),
        fork(updateRequest),
        fork(uploadRequest),
        fork(deleteRequest),
        //fork(downloadRequest),
        fork(loadBySearchRequest),
        fork(downloadFileByGetRequest),
        fork(cancelDownloadFile),
        fork(viewFileRequest),
        fork(cancelViewFile),
        fork(reviseRequest),
        fork(editRequest),
        fork(loadRevisionsRequest),
        fork(loadHistoryRequest),
        fork(moveRequest)
    ]);
}

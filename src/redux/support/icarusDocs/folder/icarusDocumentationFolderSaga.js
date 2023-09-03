import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../../actionTypes';
import DocumentationFolderApi from "../../../../api/IcarusDocumentationFolderApi";

export function* documentationFoldersRequest() {
    yield takeLatest(types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_REQUEST, function*(action) {
        try {
            const response = yield call(DocumentationFolderApi.getAll, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_SUCCESS,
                    documentationFolders: data,
                });
            } else {
                yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_FAILED})
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch all documentationFolders"
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch all documentationFolders"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* documentationFolderTreeRequest() {
    yield takeLatest(types.LOAD_ICARUS_DOCUMENTATION_FOLDER_TREE_REQUEST, function*(action) {
        try {
            const response = yield call(DocumentationFolderApi.getFolderTree, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                const meta = response.meta;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FOLDER_TREE_SUCCESS,
                    documentationFolderTree: data,
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch folder tree"
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch folder tree"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* documentationFolderRequest() {
    yield takeLatest(types.LOAD_ICARUS_DOCUMENTATION_FOLDER_REQUEST, function*(action) {
        try {
            const response = yield call(DocumentationFolderApi.get, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FOLDER_SUCCESS,
                    documentationFolder: data
                });
            } else {
                yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FOLDER_FAILED});
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to fetch documentationFolder"
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FOLDER_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to fetch documentationFolder"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* createRequest() {
    yield takeLatest(types.CREATE_ICARUS_DOCUMENTATION_FOLDER_REQUEST, function*(action) {
        try {
            const response = yield call(DocumentationFolderApi.create, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_SUCCESS,
                    documentationFolders: data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.CREATE_ICARUS_DOCUMENTATION_FOLDER_FAILED});
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to create documentationFolder"
                });
            }
        } catch (e) {
            yield put({type: types.CREATE_ICARUS_DOCUMENTATION_FOLDER_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to create documentationFolder"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* loadOnPathRequest() {
    yield takeLatest(types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_ON_PATH_REQUEST, function*(action) {
        try {
            const response = yield call(DocumentationFolderApi.getOnPath, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_SUCCESS,
                    documentationFolders: data
                });
            } else {
                yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_FAILED});
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to load folder"
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to load folders"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* updateRequest() {
    yield takeLatest(types.UPDATE_ICARUS_DOCUMENTATION_FOLDER_REQUEST, function*(action) {
        try {
            const response = yield call(DocumentationFolderApi.update, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_SUCCESS,
                    documentationFolders: data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({type: types.UPDATE_ICARUS_DOCUMENTATION_FOLDER_FAILED})
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to update documentationFolder"
                });
            }
        } catch (e) {
            yield put({type: types.UPDATE_ICARUS_DOCUMENTATION_FOLDER_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to update documentationFolder"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* deleteRequest() {
    yield takeLatest(types.DELETE_ICARUS_DOCUMENTATION_FOLDER_REQUEST, function*(action) {
        try {
            const response = yield call(DocumentationFolderApi.delete, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_SUCCESS,
                    documentationFolders: data
                });
            } else {
                yield put({type: types.DELETE_ICARUS_DOCUMENTATION_FOLDER_FAILED})
            }
        } catch (e) {
            yield put({type: types.DELETE_ICARUS_DOCUMENTATION_FOLDER_FAILED})
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* moveRequest() {
    yield takeLatest(types.ICARUS_DOCUMENTATION_FOLDER_MOVE_REQUEST, function*(action) {
        try {
            const response = yield call(DocumentationFolderApi.moveFolder, action.viewModel);
            const message = response.message;
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_SUCCESS,
                    documentationFolders: data
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
                    message: "Failed to move folder"
                });
            }
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to move folder"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export function* loadStorageInfoRequest() {
    yield takeLatest(types.LOAD_STORAGE_INFO_REQUEST, function*(action) {
        try {
            const response = yield call(DocumentationFolderApi.getStorageInfo, action.viewModel);
            if (response.code === "200") {
                const data = response.data;
                yield put({
                    type: types.LOAD_STORAGE_INFO_SUCCESS,
                    storageInfo: data
                });
                yield put({
                    type: types.AJAX_SUCCESS,
                    message: response.message
                });
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Failed to load storage info"
                });
            }
        } catch (e) {
            yield put({type: types.LOAD_DOCUMENTATION_FOLDERS_FAILED});
            yield put({
                type: types.AJAX_FAILED,
                message: "Failed to load folders"
            });
        } finally {
            yield put({type: types.AJAX_FINISHED})
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(documentationFoldersRequest),
        fork(documentationFolderTreeRequest),
        fork(documentationFolderRequest),
        fork(loadOnPathRequest),
        fork(createRequest),
        fork(updateRequest),
        fork(deleteRequest),
        fork(moveRequest),
        fork(loadStorageInfoRequest),
    ]);
}

import * as types from '../../actionTypes.js';

export function loadAll(viewModel) {
    return {
        type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_REQUEST,
        viewModel
    }
}

export function loadTree(viewModel) {
    return {
        type: types.LOAD_ICARUS_DOCUMENTATION_FOLDER_TREE_REQUEST,
        viewModel
    }
}

export function load(viewModel) {
    return {
        type: types.LOAD_ICARUS_DOCUMENTATION_FOLDER_REQUEST,
        viewModel
    }
}
export function loadOnPath(viewModel) {
    return {
        type: types.LOAD_ICARUS_DOCUMENTATION_FOLDERS_ON_PATH_REQUEST,
        viewModel
    }
}

export function clearFolder() {
    return {
        type: types.CLEAR_FOLDERS
    }
}

export function create(viewModel) {
    return {
        type: types.CREATE_ICARUS_DOCUMENTATION_FOLDER_REQUEST,
        viewModel
    }
}

export function update(viewModel) {
    return {
        type: types.UPDATE_ICARUS_DOCUMENTATION_FOLDER_REQUEST,
        viewModel
    }
}

export function deleteAction(viewModel) {
    return {
        type: types.DELETE_ICARUS_DOCUMENTATION_FOLDER_REQUEST,
        viewModel
    }
}

export function goBackToFolder(icarusDocumentationFolder) {
    return {
        type: types.GO_BACK_TO_FOLDER,
        icarusDocumentationFolder
    }
}

export function goBackToRootFolder() {
    return {
        type: types.GO_BACK_TO_ROOT_FOLDER,
    }
}

export function enterFolder(icarusDocumentationFolder) {
    return {
        type: types.ENTER_FOLDER,
        icarusDocumentationFolder
    }
}

export function exitFolder(viewModel) {
    return {
        type: types.EXIT_FOLDER,
        viewModel
    }
}

export function reverseOrder(propery) {
    return {
        type: types.REVERSE_ICARUS_DOCUMENTATION_FOLDER_ORDER,
        propery
    }
}

export function move(viewModel) {
    return {
        type: types.ICARUS_DOCUMENTATION_FOLDER_MOVE_REQUEST,
        viewModel
    }
}

export function loadFolderForFile(viewModel) {
    return {
        type: types.LOAD_DOCUMENTATION_FOLDER_FOR_FILE_REQUEST,
        viewModel
    }
}

export function loadStorageInfo(viewModel) {
    return {
        type: types.LOAD_STORAGE_INFO_REQUEST,
        viewModel
    }
}

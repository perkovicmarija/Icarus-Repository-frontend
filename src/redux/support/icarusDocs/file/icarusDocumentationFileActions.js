import * as types from '../../../actionTypes';


export function loadAll(viewModel) {
    return {
        type: types.LOAD_ICARUS_DOCUMENTATION_FILES_REQUEST,
        viewModel
    }
}

export function load(viewModel) {
    return {
        type: types.LOAD_ICARUS_DOCUMENTATION_FILE_REQUEST,
        viewModel
    }
}

export function exportToExcel(viewModel) {
    return {
        type: types.CREATE_ICARUS_DOCUMENTATION_FILE_DOWNLOAD_LIST_EXCEL_REQUEST,
        viewModel
    }
}

export function move(viewModel) {
    return {
        type: types.ICARUS_DOCUMENTATION_FILE_MOVE_REQUEST,
        viewModel
    }
}

export function loadInFolder(viewModel) {
    return {
        type: types.LOAD_ICARUS_DOCUMENTATION_FILES_IN_FOLDER_REQUEST,
        viewModel
    }
}

export function loadBySearch(viewModel) {
    return {
        type: types.LOAD_ICARUS_DOCUMENTATION_FILES_BY_SEARCH_REQUEST,
        viewModel
    }
}

export function loadByFilter(viewModel) {
    return {
        type: types.LOAD_ICARUS_DOCUMENTATION_FILES_BY_FILTER_REQUEST,
        viewModel
    }
}

export function create(viewModel) {
    return {
        type: types.CREATE_ICARUS_DOCUMENTATION_FILE_REQUEST,
        viewModel
    }
}

export function upload(viewModel) {
    return {
        type: types.UPLOAD_ICARUS_DOCUMENTATION_FILE,
        viewModel
    }
}

export function editFile(viewModel) {
    return {
        type: types.EDIT_ICARUS_DOCUMENTATION_FILE_REQUEST,
        viewModel
    }
}

export function download(viewModel) {
    return {
        type: types.DOWNLOAD_ICARUS_DOCUMENTATION_FILE,
        viewModel
    }
}

export function cancelDownload(viewModel) {
    return {
        type: types.CANCEL_DOWNLOAD_ICARUS_DOCUMENTATION_FILE,
        viewModel
    }
}

export function viewFile(viewModel) {
    return {
        type: types.VIEW_ICARUS_DOCUMENTATION_FILE,
        viewModel
    }
}

export function cancelViewFile(viewModel) {
    return {
        type: types.CANCEL_VIEW_ICARUS_DOCUMENTATION_FILE,
        viewModel
    }
}

export function deleteAction(viewModel) {
    return {
        type: types.DELETE_ICARUS_DOCUMENTATION_FILE_REQUEST,
        viewModel
    }
}

export function passFile(icarusDocumentationFile) {
    return {
        type: types.PASS_ICARUS_DOCUMENTATION_FILE,
        icarusDocumentationFile
    }
}

export function reverseOrder(propery) {
    return {
        type: types.REVERSE_ICARUS_DOCUMENTATION_FILE_ORDER,
        propery
    }
}
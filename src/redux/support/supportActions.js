import * as types from '../actionTypes';

export function loadAll(viewModel) {
    return {
        type: types.LOAD_SUPPORT_CENTER_ALL_REQUEST,
        viewModel
    }
}

export function load(viewModel) {
    return {
        type: types.LOAD_SUPPORT_CENTER_REQUEST,
        viewModel
    }
}

export function create(viewModel) {
    return {
        type: types.CREATE_SUPPORT_CENTER_REQUEST,
        viewModel
    }
}

export function update(viewModel) {
    return {
        type: types.UPDATE_SUPPORT_CENTER_REQUEST,
        viewModel
    }
}

export function loadAllModules() {
    return {
        type: types.LOAD_SUPPORT_CENTER_MODULES_REQUEST,
    }
}

export function loadAllLevels() {
    return {
        type: types.LOAD_SUPPORT_CENTER_LEVELS_REQUEST,
    }
}

export function loadAllStatuses() {
    return {
        type: types.LOAD_SUPPORT_CENTER_STATUSES_REQUEST,
    }
}

export function addComment(viewModel) {
    return {
        type: types.ADD_COMMENT_SUPPORT_CENTER_REQUEST,
        viewModel
    }
}

export function createWithAttachments(viewModel) {
    return {
        type: types.CREATE_SUPPORT_CENTER_WITH_ATTACHMENTS,
        viewModel
    }
}

export function updateWithAttachments(viewModel) {
    return {
        type: types.UPDATE_SUPPORT_CENTER_WITH_ATTACHMENTS,
        viewModel
    }
}

export function download(viewModel) {
    return {
        type: types.DOWNLOAD_SUPPORT_CENTER_ATTACHMENT,
        viewModel
    }
}

export function changeFilterStatus(statuses) {
    return {
        type: types.FILTER_SUPPORT_CENTER_STATUS_UPDATE,
        statuses
    }
}

export function changeFilterStartDate(startDate) {
    return {
        type: types.FILTER_SUPPORT_CENTER_START_DATE_UPDATE,
        startDate
    }
}

export function changeFilterEndDate(endDate) {
    return {
        type: types.FILTER_SUPPORT_CENTER_END_DATE_UPDATE,
        endDate
    }
}

export function clearFilters(empty) {
    return {
        type: types.FILTER_SUPPORT_CENTER_CLEAR,
        empty
    }
}

export function loadAllSoftwareLogs(viewModel) {
    return {
        type: types.LOAD_SOFTWARE_LOGS_REQUEST,
        viewModel
    }
}


export function createSoftwareLogClient(viewModel) {
    return {
        type: types.CREATE_SOFTWARE_LOG_REQUEST,
        viewModel
    }
}

export function updateSoftwareLogClient(viewModel) {
    return {
        type: types.UPDATE_SOFTWARE_LOG_REQUEST,
        viewModel
    }
}

export function deleteSoftwareLogClient(viewModel) {
    return {
        type: types.DELETE_SOFTWARE_LOG_REQUEST,
        viewModel
    }
}

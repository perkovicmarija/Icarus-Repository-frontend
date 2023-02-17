import * as types from '../../actionTypes';

export function loadAll(viewModel) {
    return {
        type: types.LOAD_USER_GROUPS_REQUEST,
        viewModel
    }
}

export function loadAllPagination(viewModel) {
    return {
        type: types.LOAD_USER_GROUPS_PAGINATION_REQUEST,
        viewModel
    }
}

export function load(viewModel) {
    return {
        type: types.LOAD_USER_GROUP_REQUEST,
        viewModel
    }
}

export function create(viewModel) {
    return {
        type: types.CREATE_USER_GROUP_REQUEST,
        viewModel
    }
}

export function update(viewModel) {
    return {
        type: types.UPDATE_USER_GROUP_REQUEST,
        viewModel
    }
}

export function deleteAction(viewModel) {
    return {
        type: types.DELETE_USER_GROUP_REQUEST,
        viewModel
    }
}

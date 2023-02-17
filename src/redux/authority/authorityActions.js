import * as types from '../actionTypes';

export function loadAll() {
    return {
        type: types.LOAD_AUTHORITIES_REQUEST
    }
}

export function load(viewModel) {
    return {
        type: types.LOAD_AUTHORITY_REQUEST,
        viewModel
    }
}

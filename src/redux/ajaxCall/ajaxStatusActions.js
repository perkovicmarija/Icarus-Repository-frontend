import * as types from '../actionTypes';

export function resetLoading() {
    return {
        type: types.AJAX_LOADING_RESET
    }
}

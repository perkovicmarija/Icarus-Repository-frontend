import * as types from '../actionTypes';

const initState = {
    successMessage: {
        message: undefined,
        date: undefined
    },
    failedMessage: {
        message: undefined,
        date: undefined
    }
}
export default function messageReducer(state = initState, action) {
    switch(action.type) {
        case types.AJAX_SUCCESS:
            return {
                ...state,
                successMessage: {
                    message: action.message,
                    date: new Date()
                }
            };
        case types.AJAX_FAILED:
            return {
                ...state,
                failedMessage: {
                    message: action.message,
                    date: new Date()
                }
        };
        default:
            return state;
    }
}
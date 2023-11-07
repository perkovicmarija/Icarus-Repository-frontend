import * as types from '../actionTypes';

const initState = {
    ajaxCallsInProgress: 0
}
function actionTypeEndsInRequest(type) {
    return type.substring(type.length - 8) === '_REQUEST';
}

function actionTypeContainsInRequest(type) {
    return type.toLowerCase().endsWith('Request');
}
export default function ajaxStatusReducer(state = initState, action) {
    //ZA SADA PRESKACEMO LOGIN
/*    if(actionTypeLogin(action.type)) {
        return state;
    }*/
    if(action.type === types.AJAX_LOADING_RESET) {
        return Object.assign(
            {}, state, {
                ajaxCallsInProgress: 0
            }
        );
    }
    else if(actionTypeEndsInRequest(action.type)) {
        return Object.assign({}, state, {ajaxCallsInProgress: state.ajaxCallsInProgress + 1});
    } else if(actionTypeContainsInRequest(action.type)) {
        return Object.assign({}, state, {ajaxCallsInProgress: state.ajaxCallsInProgress + 1});
    } else if(action.type === types.AJAX_FINISHED) {
        if(state.ajaxCallsInProgress > 0) {
            return Object.assign({}, state, {ajaxCallsInProgress: state.ajaxCallsInProgress - 1});
        }
    } else {
        return state;
    }
}
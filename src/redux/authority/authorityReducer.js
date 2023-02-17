import * as types from '../actionTypes';

const initState = {
    authorities: [],
    authority: {}
}
export default function authorityReducer(state = initState, action) {
    switch(action.type) {
        case types.LOAD_AUTHORITIES_SUCCESS:
            return {
                ...state,
                authorities: action.authorities
            };
        case types.LOAD_AUTHORITY_SUCCESS:
            return {
                ...state,
                authority: action.authority
            };
        case types.LOAD_AUTHORITY_FAILED:
            return initState;
        default:
            return state;
    }
}
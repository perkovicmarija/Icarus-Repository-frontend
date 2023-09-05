import * as types from '../../actionTypes';

const initState = {
    userGroupsPagination: [],
    userGroups: [],
    totalCount: 0,
    userGroup: {}
}
export default function userGroupReducer(state = initState, action) {
    switch(action.type) {
        case types.LOAD_USER_GROUPS_SUCCESS:
            return {
                ...state,
                userGroups: action.userGroups,
                userGroup: {}
            };
        case types.LOAD_USER_GROUPS_PAGINATION_SUCCESS:
            return {
                ...state,
                userGroupsPagination: action.userGroups,
                totalCount: action.totalCount,
                userGroup: {}
            };
        //remove previous report object if new report is selected
        case types.LOAD_USER_GROUP_REQUEST:
            return {
                ...state,
                userGroup: {}
            };
        case types.DELETE_USER_GROUP_REQUEST:
            return {
                ...state,
                userGroup: {}
            };
        case types.LOAD_USER_GROUP_SUCCESS:
            return {
                ...state,
                userGroup: action.userGroup
            };
        case types.CREATE_USER_GROUP_SUCCESS:
            return {
                ...state,
                userGroupsPagination: action.userGroups,
                totalCount: action.totalCount,
                userGroup: {}
            };
        case types.DELETE_USER_GROUP_SUCCESS:
            return {
                ...state,
                userGroupsPagination: state.userGroupsPagination.filter(group => group.userGroupId !== action.userGroupId),
                totalCount: action.totalCount,
                userGroup: {}
            };
        case types.UPDATE_USER_GROUP_SUCCESS:
            return {
                ...state,
                userGroupsPagination: action.userGroups,
                totalCount: action.totalCount,
                userGroup: {}
            };

        case types.LOAD_USER_GROUPS_FAILED:
            return initState;
        default:
            return state;
    }
}
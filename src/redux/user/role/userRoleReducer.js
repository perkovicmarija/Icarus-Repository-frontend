import * as types from '../../actionTypes';

const initState = {
    userRolesPagination: [],
    userRoles: [],
    totalCount: 0,
    userRole: {}
}
export default function userRoleReducer(state = initState, action) {
    switch(action.type) {
        case types.LOAD_USER_ROLES_SUCCESS:
            return {
                ...state,
                userRoles: action.userRoles,
                userRole: {}
            };
        case types.LOAD_USER_ROLES_PAGINATION_SUCCESS:
            return {
                ...state,
                userRolesPagination: action.userRoles,
                totalCount: action.totalCount,
                userRole: {}
            };
        //remove previous report object if new report is selected
        case types.LOAD_USER_ROLE_REQUEST:
            return {
                ...state,
                userRole: {}
            };
        case types.DELETE_USER_ROLE_REQUEST:
            return {
                ...state,
                userRole: {}
            };
        case types.LOAD_USER_ROLE_SUCCESS:
            return {
                ...state,
                userRole: action.userRole
            };
        case types.DELETE_USER_ROLE_SUCCESS:
            return {
                ...state,
                userRolesPagination: state.userRolesPagination.filter(role => role.userRoleId !== action.userRoleId),
                totalCount: action.totalCount,
                userRole: {}
            }
        case types.CREATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                userRolesPagination: action.userRoles,
                totalCount: action.totalCount,
                userRole: {}
            }
        case types.UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                userRolesPagination: action.userRoles,
                totalCount: action.totalCount,
                userRole: {}
            }

/*        case types.UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                userRole: action.userRole
            };*/

        case types.LOAD_USER_ROLES_FAILED:
            return initState;
        default:
            return state;
    }
}
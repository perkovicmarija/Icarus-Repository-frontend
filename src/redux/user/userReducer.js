import * as types from "../actionTypes";

export const initFilters = {
  subdivisions: [],
  departments: [],
  companies: [],
  userRoles: [],
  showDeactivated: false,
};
const initState = {
  usersPagination: [],
  users: [],
  usersSimple: [],
  totalCount: 0,
  user: {},
  languages: [],
  rowsPerPage: 25,
  filters: { ...initFilters, userSearch: "" },
};
export default function userReducer(state = initState, action) {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        user: {},
      };
    case types.LOAD_USERS_SIMPLE_SUCCESS:
      return {
        ...state,
        usersSimple: action.usersSimple,
      };
    case types.LOAD_USERS_PAGINATION_SUCCESS:
      return {
        ...state,
        usersPagination: action.users,
        totalCount: action.totalCount,
        user: {},
      };
    //remove previous report object if new hazard category is selected
    case types.LOAD_USER_REQUEST:
      return {
        ...state,
        user: {},
      };
    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };

    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        user: {},
      };
    case types.RENEW_CODE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case types.REACTIVATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case types.USERS_ROWS_PER_PAGE_UPDATE:
      return {
        ...state,
        rowsPerPage: action.rowsPerPage,
      };
    case types.FILTER_USER_SUBDIVISIONS_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          subdivisions: action.subdivisions,
        },
      };
    case types.FILTER_USER_DEPARTMENTS_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          departments: action.departments,
        },
      };
    case types.FILTER_USER_COMPANIES_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          companies: action.companies,
        },
      };
    case types.FILTER_USER_ROLES_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          userRoles: action.userRoles,
        },
      };
    case types.FILTER_USER_SHOW_DEACTIVATED_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          showDeactivated: action.showDeactivated,
        },
      };
    case types.FILTER_USER_CLEAR:
      return {
        ...state,
        filters: initFilters,
      };
    default:
      return state;
  }
}

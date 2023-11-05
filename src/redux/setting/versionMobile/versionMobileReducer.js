import * as types from "../../actionTypes";

const initState = {
  versionsMobile: [],
  totalCount: 0,
  rowsPerPage: 25,
  filters: {
    clientName: "",
  },
};

export default function versionMobileReducer(state = initState, action) {
  switch (action.type) {
    case types.LOAD_ALL_VERSIONS_MOBILE_SUCCESS:
      return {
        ...state,
        versionsMobile: action.versionsMobile,
        totalCount: action.totalCount,
      };
    case types.UPDATE_VERSION_MOBILE_SUCCESS:
      return {
        ...state,
      };
    case types.CREATE_VERSION_MOBILE_SUCCESS:
      return {
        ...state,
      };
    case types.DELETE_VERSION_MOBILE_SUCCESS:
      return {
        ...state,
        versionsMobile: state.versionsMobile.filter(
          (versionMobile) =>
            versionMobile.versionMobileId !== action.deletedVersionMobileId
        ),
        totalCount: state.totalCount - 1,
      };
    case types.MOBILE_VERSIONS_SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    default:
      return state;
  }
}

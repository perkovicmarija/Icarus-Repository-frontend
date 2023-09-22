import * as types from '../../actionTypes';

const initFilters = {
  versionMobileSearch: undefined,
}

const initState = {
  versionsMobile: [],
  versionMobile: {},
  totalCount: 0,
  rowsPerPage: 25,
  filters: initFilters
}


export default function versionMobileReducer(state = initState, action) {

  switch (action.type) {
    case types.LOAD_ALL_VERSIONS_MOBILE_SUCCESS:
      return {
        ...state,
        versionsMobile: action.versionsMobile,
        totalCount: action.totalCount,
        versionMobile: {}
      };
    case types.UPDATE_VERSION_MOBILE_SUCCESS:
      const index = state.versionsMobile.findIndex(version => version.versionMobileId === action.updatedVersionMobile.versionMobileId)
      const updatedVersion = {
        ...state.versionsMobile[index],
        versionMin: action.updatedVersion.versionMin,
        platform: action.updatedVersion.platform,
        client: action.updatedVersion.client
      }
      return {
        ...state,
        versionMobile: action.updatedVersion,
        versionsMobile: [...state.versionsMobile.slice(0, index), updatedVersion, ...state.versionsMobile.slice(index + 1)]
      };
    case types.FILTER_VERSION_MOBILE_SEARCH_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          versionMobileSearch: action.versionMobileSearch
        }
      };
    case types.CREATE_VERSION_MOBILE_SUCCESS:
      return {
        ...state,
        versionMobile: action.versionMobile,
        versionsMobile: [...state.versionsMobile, action.versionMobile],
        totalCount: state.totalCount + 1
      };
    case types.DELETE_VERSION_MOBILE_SUCCESS:
      return {
        ...state,
        versionMobile: {},
        versionsMobile: state.versionsMobile.filter(versionMobile => versionMobile.versionMobileId !== action.deletedVersionMobileId),
        totalCount: state.totalCount - 1
      };

    default:
      return state;
  }
}
import * as types from "../actionTypes";

export const initFilters = {
  startDate: null,
  endDate: null,
  statuses: [],
  selectedClients: [],
};

const initRoadmapFilters = {
  title: "",
  description: "",
  status: "",
};

const initState = {
  supportBugs: [],
  totalCount: 0,
  supportBug: {},
  modules: [],
  levels: [],
  statuses: [],
  filters: { ...initFilters, softwareLogSearch: "" },
  softwareLogsPagination: [],
  softwareLog: {},
  roadmaps: [],
  roadmapFilters: initRoadmapFilters,
  roadmap: {},
};
export default function supportReducer(state = initState, action) {
  switch (action.type) {
    case types.LOAD_SUPPORT_CENTER_ALL_SUCCESS:
      return {
        ...state,
        supportBugs: action.supportBugs,
        totalCount: action.totalCount,
        supportBug: {},
      };
    //remove previous messageBoard object if new messageBoards is selected
    case types.LOAD_SUPPORT_CENTER_SUCCESS:
      return {
        ...state,
        supportBug: action.supportBug,
      };

    case types.CREATE_SUPPORT_CENTER_SUCCESS:
      return {
        ...state,
        supportBug: action.supportBug,
      };

    case types.UPDATE_SUPPORT_CENTER_SUCCESS:
      return {
        ...state,
        supportBug: action.supportBug,
      };
    //remove previous messageBoard object if new messageBoards is selected
    case types.LOAD_SUPPORT_CENTER_MODULES_SUCCESS:
      return {
        ...state,
        modules: action.modules,
      };
    case types.LOAD_SUPPORT_CENTER_LEVELS_SUCCESS:
      return {
        ...state,
        levels: action.levels,
      };
    case types.LOAD_SUPPORT_CENTER_STATUSES_SUCCESS:
      return {
        ...state,
        statuses: action.statuses,
      };
    case types.ADD_COMMENT_SUPPORT_CENTER_SUCCESS:
      return {
        ...state,
        supportBug: action.supportBug,
      };

    //filters **********
    case types.FILTER_SUPPORT_CENTER_START_DATE_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          startDate: action.startDate,
        },
      };
    case types.FILTER_SUPPORT_CENTER_END_DATE_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          endDate: action.endDate,
        },
      };
    case types.FILTER_SUPPORT_CENTER_STATUS_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          statuses: action.statuses,
        },
      };
    case types.FILTER_SUPPORT_CENTER_CLEAR:
      return {
        ...state,
        filters: initFilters,
      };
    case types.LOAD_SOFTWARE_LOGS_SUCCESS:
      return {
        ...state,
        softwareLogsPagination: action.softwareLogs,
      };
    case types.LOAD_SOFTWARE_LOGS_PAGINATION_SUCCESS:
      return {
        ...state,
        softwareLogsPagination: action.softwareLogs,
        totalCount: action.totalCount,
      };

    case types.SOFTWARE_LOG_SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };

    case types.DELETE_SOFTWARE_LOG_SUCCESS:
      return {
        ...state,
        softwareLog: {},
        softwareLogsPagination: state.softwareLogsPagination.filter(
          (log) => log.supportSoftwareLogId !== action.softwareLogId
        ),
        totalCount: state.totalCount - 1,
      };
    case types.LOAD_ROADMAP_LOGS_PAGINATE_FILTER_SUCCESS:
      return {
        ...state,
        roadmaps: action.roadmaps,
      };
    case types.LOAD_ROADMAP_LOGS_SUCCESS:
      return {
        ...state,
        roadmaps: action.roadmaps,
      };
    case types.CREATE_ROADMAP_LOG_SUCCESS:
      return {
        ...state,
      };
    case types.UPDATE_ROADMAP_LOG_SUCCESS:
      return {
        ...state,
        roadmap: action.roadmap,
      };
    case types.DELETE_ROADMAP_LOG_SUCCESS:
      return {
        ...state,
        roadmap: {},
        roadmaps: state.roadmaps.filter(
          (log) => log.icarusRoadmapLogId !== action.icarusRoadmapLogId
        ),
      };
    case types.CLEAR_ROADMAP_LOG_FILTERS:
      return {
        ...state,
        roadmapFilters: initRoadmapFilters,
      };
    case types.CHANGE_ROADMAP_LOG_FILTERS:
      return {
        ...state,
        roadmapFilters: action.filters,
      };
    default:
      return state;
  }
}

import * as types from '../actionTypes';

const initFilters = {
  startDate: null,
  endDate: null,
  statuses: [],
  softwareLogDescription: ""
}

const initState = {
  supportBugs: [],
  totalCount: 0,
  supportBug: {},
  modules: [],
  levels: [],
  statuses: [],
  filters: initFilters,
  softwareLogs: [],
  softwareLog: {}
}
export default function supportReducer(state = initState, action) {
  switch (action.type) {
    case types.LOAD_SUPPORT_CENTER_ALL_SUCCESS:
      return {
        ...state,
        supportBugs: action.supportBugs,
        totalCount: action.totalCount,
        supportBug: {}
      };
    //remove previous messageBoard object if new messageBoards is selected
    case types.LOAD_SUPPORT_CENTER_SUCCESS:
      return {
        ...state,
        supportBug: action.supportBug
      };

    case types.CREATE_SUPPORT_CENTER_SUCCESS:
      return {
        ...state,
        supportBug: action.supportBug
      };

    case types.UPDATE_SUPPORT_CENTER_SUCCESS:
      return {
        ...state,
        supportBug: action.supportBug
      };
    //remove previous messageBoard object if new messageBoards is selected
    case types.LOAD_SUPPORT_CENTER_MODULES_SUCCESS:
      return {
        ...state,
        modules: action.modules
      };
    case types.LOAD_SUPPORT_CENTER_LEVELS_SUCCESS:
      return {
        ...state,
        levels: action.levels
      };
    case types.LOAD_SUPPORT_CENTER_STATUSES_SUCCESS:
      return {
        ...state,
        statuses: action.statuses
      };
    case types.ADD_COMMENT_SUPPORT_CENTER_SUCCESS:
      return {
        ...state,
        supportBug: action.supportBug
      };

    //filters **********
    case types.FILTER_SUPPORT_CENTER_START_DATE_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          startDate: action.startDate
        }
      };
    case types.FILTER_SUPPORT_CENTER_END_DATE_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          endDate: action.endDate
        }
      };
    case types.FILTER_SUPPORT_CENTER_STATUS_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          statuses: action.statuses
        }
      };
    case types.FILTER_SUPPORT_CENTER_CLEAR:
      return {
        ...state,
        filters: initFilters
      };

    case types.LOAD_SOFTWARE_LOGS_SUCCESS:
      return {
        ...state,
        softwareLogs: action.softwareLogs,
      };
    case types.CREATE_SOFTWARE_LOG_SUCCESS:
      return {
        ...state,
        softwareLogs: action.softwareLogs,
        softwareLog: {}

      };
    case types.UPDATE_SOFTWARE_LOG_SUCCESS:
      const index = state.softwareLogs.findIndex(log => log.supportSoftwareLog.supportSoftwareLogId === action.updatedSoftwareLog.supportSoftwareLogId)
      const updatedSoftwareLog = {
        ...state.softwareLogs[index],
        supportSoftwareLog: action.updatedSoftwareLog,
        clients: action.updatedClients
      }
      return {
        ...state,
        softwareLog: action.updatedSoftwareLog,
        softwareLogs: [...state.softwareLogs.slice(0, index), updatedSoftwareLog, ...state.softwareLogs.slice(index + 1)]
      };
    case types.DELETE_SOFTWARE_LOG_SUCCESS:
      return {
        ...state,
        softwareLog: {},
        softwareLogs: state.softwareLogs.filter(log => log.supportSoftwareLog.supportSoftwareLogId !== action.softwareLogId)
      };
    default:
      return state;
  }
}
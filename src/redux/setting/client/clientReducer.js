import * as types from '../../actionTypes';

const initFilters = {
  clientSearch: undefined,
}

const initState = {
  clientsPagination: [],
  clients: [],
  client: {},
  totalCount: 0,
  rowsPerPage: 25,
  filters: initFilters
}


export default function clientReducer(state = initState, action) {
  switch (action.type) {
    case types.LOAD_ALL_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.clients
      };
    case types.LOAD_CLIENTS_PAGINATION_SUCCESS:
      return {
        ...state,
        clientsPagination: action.clients,
        totalCount: action.totalCount,
        client: {}
      };
    case types.UPDATE_CLIENT_SUCCESS:
      const index = state.clientsPagination.findIndex(client => client.clientId === action.updatedClient.clientId)
      const updatedClient = {
        ...state.clientsPagination[index],
        name: action.updatedClient.name,
        abbreviation: action.updatedClient.abbreviation,
        deactivated: action.updatedClient.deactivated
      }
      return {
        ...state,
        client: action.updatedClient,
        clientsPagination: [...state.clientsPagination.slice(0, index), updatedClient, ...state.clientsPagination.slice(index + 1)]
      };
    case types.FILTER_CLIENT_SEARCH_UPDATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          clientSearch: action.clientSearch
        }
      };
    case types.CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        client: action.client,
        clientsPagination: [...state.clientsPagination, action.client]
      };
    case types.DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        client: {},
        clientsPagination: state.clientsPagination.filter(client => client.clientId !== action.deletedClientId)
      };

    default:
      return state;
  }
}
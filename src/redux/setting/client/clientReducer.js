import * as types from "../../actionTypes";

const initState = {
  clientsPagination: [],
  clients: [],
  client: {},
  totalCount: 0,
  rowsPerPage: 10,
  filters: {
    clientSearch: "",
  },
};

export default function clientReducer(state = initState, action) {
  switch (action.type) {
    case types.LOAD_ALL_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.clients,
      };
    case types.LOAD_CLIENTS_PAGINATION_SUCCESS:
      return {
        ...state,
        clientsPagination: action.clients,
        totalCount: action.totalCount,
        client: {},
      };
    case types.CLIENTS_SET_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    case types.UPDATE_CLIENT_SUCCESS:
      const index = state.clientsPagination.findIndex(
        (client) => client.clientId === action.updatedClient.clientId
      );
      const updatedClient = {
        ...state.clientsPagination[index],
        name: action.updatedClient.name,
        abbreviation: action.updatedClient.abbreviation,
        deactivated: action.updatedClient.deactivated,
      };
      return {
        ...state,
        client: action.updatedClient,
        clientsPagination: [
          ...state.clientsPagination.slice(0, index),
          updatedClient,
          ...state.clientsPagination.slice(index + 1),
        ],
      };
    case types.CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        client: action.client,
        clientsPagination: [...state.clientsPagination, action.client],
        totalCount: state.totalCount + 1,
      };
    case types.DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        client: {},
        clientsPagination: state.clientsPagination.filter(
          (client) => client.clientId !== action.deletedClientId
        ),
        totalCount: state.totalCount - 1,
      };

    default:
      return state;
  }
}

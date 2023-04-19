import * as types from '../../actionTypes';

// CRUD

export function loadAllClients(viewModel) {
  return {
    type: types.LOAD_ALL_CLIENTS_REQUEST,
    viewModel
  }
}

export function create(viewModel) {
  return {
    type: types.CREATE_CLIENT_REQUEST,
    viewModel
  }
}

// Pagination

export function loadAllClientsPagination(viewModel) {
  return {
    type: types.LOAD_CLIENTS_PAGINATION_REQUEST,
    viewModel
  }
}

// Filter

export function changeFilterClientSearch(clientSearch) {
  return {
    type: types.FILTER_CLIENT_SEARCH_UPDATE,
    clientSearch
  }
}





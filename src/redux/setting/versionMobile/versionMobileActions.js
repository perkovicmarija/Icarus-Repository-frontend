import * as types from '../../actionTypes';

// CRUD

export function loadVersions(viewModel) {
  return {
    type: types.LOAD_ALL_VERSIONS_MOBILE_REQUEST,
    viewModel
  }
}

export function create(viewModel) {
  return {
    type: types.CREATE_VERSION_MOBILE_REQUEST,
    viewModel
  }
}

export function update(viewModel) {
  return {
    type: types.UPDATE_VERSION_MOBILE_REQUEST,
    viewModel
  }
}

export function deleteAction(viewModel) {
  return {
    type: types.DELETE_VERSION_MOBILE_REQUEST,
    viewModel
  }
}

// Filter

export function setFilters(filters) {
  return {
    type: types.MOBILE_VERSIONS_SET_FILTERS,
    filters
  }
}





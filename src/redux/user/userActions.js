import * as types from "../actionTypes";

export function loadAllPagination(viewModel) {
  return {
    type: types.LOAD_USERS_PAGINATION_REQUEST,
    viewModel,
  };
}

export function loadAll(viewModel) {
  return {
    type: types.LOAD_USERS_REQUEST,
    viewModel,
  };
}

export function loadAllSimple(viewModel) {
  return {
    type: types.LOAD_USERS_SIMPLE_REQUEST,
    viewModel,
  };
}

export function load(viewModel) {
  return {
    type: types.LOAD_USER_REQUEST,
    viewModel,
  };
}

export function create(viewModel) {
  return {
    type: types.CREATE_USER_REQUEST,
    viewModel,
  };
}

export function update(viewModel) {
  return {
    type: types.UPDATE_USER_REQUEST,
    viewModel,
  };
}

export function deleteAction(viewModel) {
  return {
    type: types.DELETE_USER_REQUEST,
    viewModel,
  };
}

export function reactivate(viewModel) {
  return {
    type: types.REACTIVATE_USER_REQUEST,
    viewModel,
  };
}

export function renewCode(viewModel) {
  return {
    type: types.RENEW_CODE_USER_REQUEST,
    viewModel,
  };
}

export function changRowsPerPage(rowsPerPage) {
  return {
    type: types.USERS_ROWS_PER_PAGE_UPDATE,
    rowsPerPage,
  };
}

export function changeFilterSubdivision(subdivisions) {
  return {
    type: types.FILTER_USER_SUBDIVISIONS_UPDATE,
    subdivisions,
  };
}

export function changeFilterDepartment(departments) {
  return {
    type: types.FILTER_USER_DEPARTMENTS_UPDATE,
    departments,
  };
}

export function changeFilterCompany(companies) {
  return {
    type: types.FILTER_USER_COMPANIES_UPDATE,
    companies,
  };
}

export function setFilters(filters) {
  return {
    type: types.USERS_SET_FILTERS,
    filters,
  };
}

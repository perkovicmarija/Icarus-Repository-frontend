import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import ClientApi from '../../../api/ClientApi';

export function* loadAllClientsRequest() {
  yield takeLatest(types.LOAD_ALL_CLIENTS_REQUEST, function*(action) {
    try {
      const response = yield call(ClientApi.getAllClients, action.viewModel);
      if (response.code === "200") {
        yield put({
          type: types.LOAD_ALL_CLIENTS_SUCCESS,
          clients: response.data
        });
        yield put({
          type: types.AJAX_SUCCESS,
          message: response.message
        });
      } else {
        yield put({type: types.LOAD_ALL_CLIENTS_FAILED})
      }
    } catch (e) {
      yield put({type: types.AJAX_FAILED})
    } finally {
      yield put({type: types.AJAX_FINISHED})
    }
  });
}

export function* clientsPaginationRequest() {
  yield takeLatest(types.LOAD_CLIENTS_PAGINATION_REQUEST, function*(action) {
    try {
      const response = yield call(ClientApi.getAllClientsPagination, action.viewModel);
      if (response.code === "200") {
        const data = response.data;
        const meta = response.meta;
        yield put({
          type: types.LOAD_CLIENTS_PAGINATION_SUCCESS,
          clients: data,
          totalCount: meta.totalCount
        });
      } else {
        yield put({type: types.LOAD_CLIENTS_PAGINATION_FAILED})
      }
    } catch (e) {
      yield put({type: types.AJAX_FAILED})
    } finally {
      yield put({type: types.AJAX_FINISHED})
    }
  });
}

export function* createClientRequest() {
  yield takeLatest(types.CREATE_CLIENT_REQUEST, function*(action) {
    try {
      const response = yield call(ClientApi.createClient, action.viewModel);
      if (response.code === "200") {
        yield put({
          type: types.CREATE_CLIENT_SUCCESS,
          client: response.data
        });
        yield put({
          type: types.AJAX_SUCCESS,
          message: response.message
        });
      } else {
        yield put({type: types.CREATE_CLIENT_FAILED});
        yield put({
          type: types.AJAX_FAILED,
          message: "Failed to create client"
        });
      }
    } catch (e) {
      yield put({type: types.CREATE_CLIENT_FAILED});
      yield put({
        type: types.AJAX_FAILED,
        message: "Failed to create client"
      });
    } finally {
      yield put({type: types.AJAX_FINISHED})
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(loadAllClientsRequest),
    fork(clientsPaginationRequest),
    fork(createClientRequest),
  ]);
}

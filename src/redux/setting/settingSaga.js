import { all, takeLatest, put, call, fork } from 'redux-saga/effects';
import * as types from '../actionTypes';
import SettingApi from '../../api/SettingApi';

export function* loadAllClientsRequest() {
  yield takeLatest(types.LOAD_ALL_CLIENTS_REQUEST, function*(action) {
    try {
      const response = yield call(SettingApi.getAllClients);
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
      yield put({type: types.LOAD_ALL_CLIENTS_FAILED})
    } finally {
      yield put({type: types.AJAX_FINISHED})
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(loadAllClientsRequest)
  ]);
}

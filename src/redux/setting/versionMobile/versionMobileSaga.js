import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import * as types from '../../actionTypes';
import ClientApi from '../../../api/ClientApi';

export function* loadVersionsMobileRequest() {
  yield takeLatest(types.LOAD_ALL_VERSIONS_MOBILE_REQUEST, function*(action) {
    try {
      const response = yield call(ClientApi.getMobileVersions, action.viewModel);
      if (response.code === "200") {
        yield put({
          type: types.LOAD_ALL_VERSIONS_MOBILE_SUCCESS,
          versionsMobile: response.data,
          totalCount: response.meta.totalCount
        });
      } else {
          yield put({
            type: types.AJAX_FAILED,
            message: response.message
          });
      }
    } catch (e) {
        yield put({
          type: types.AJAX_FAILED,
          message: e
        });
    } finally {
      yield put({type: types.AJAX_FINISHED})
    }
  });
}

export function* createVersionMobileRequest() {
  yield takeLatest(types.CREATE_VERSION_MOBILE_REQUEST, function*(action) {
    try {
      const response = yield call(ClientApi.createMobileVersion, action.viewModel);
      if (response.code === "200") {
        yield put({
          type: types.CREATE_VERSION_MOBILE_SUCCESS
        });
        yield put({
          type: types.AJAX_SUCCESS,
          message: response.message
        });
      } else {
        yield put({
          type: types.AJAX_FAILED,
          message: response.message
        });
      }
    } catch (e) {
      yield put({
        type: types.AJAX_FAILED,
        message: e
      });
    } finally {
      yield put({type: types.AJAX_FINISHED})
    }
  });
}

export function* updateVersionMobileRequest() {
  yield takeLatest(types.UPDATE_VERSION_MOBILE_REQUEST, function*(action) {
    try {
      const response = yield call(ClientApi.updateMobileVersion, action.viewModel);
      if (response.code === "200") {
        yield put({
          type: types.UPDATE_VERSION_MOBILE_SUCCESS
        });
        yield put({
          type: types.AJAX_SUCCESS,
          message: response.message
        });
      } else {
        yield put({
          type: types.AJAX_FAILED,
          message: response.message
        });
      }
    } catch (e) {
      yield put({
        type: types.AJAX_FAILED,
        message: e
      });
      yield put({
        type: types.AJAX_FAILED,
        message: "Failed to update client"
      });
    } finally {
      yield put({type: types.AJAX_FINISHED})
    }
  });
}

export function* deleteVersionMobileRequest() {
  yield takeLatest(types.DELETE_VERSION_MOBILE_REQUEST, function*(action) {
    try {
      const response = yield call(ClientApi.deleteMobileVersion, action.viewModel);
      if (response.code === "200") {
        yield put({
          type: types.DELETE_VERSION_MOBILE_SUCCESS,
          deletedVersionMobileId: action.viewModel.versionMobileId
        });
        yield put({
          type: types.AJAX_SUCCESS,
          message: response.message
        });
      } else {
        yield put({
          type: types.AJAX_FAILED,
          message: response.message
        });
      }
    } catch (e) {
      yield put({
        type: types.AJAX_FAILED,
        message: e
      });
    } finally {
      yield put({type: types.AJAX_FINISHED})
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(loadVersionsMobileRequest),
    fork(createVersionMobileRequest),
    fork(updateVersionMobileRequest),
    fork(deleteVersionMobileRequest),
  ]);
}

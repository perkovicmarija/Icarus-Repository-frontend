import {all, takeEvery, takeLatest, put, call, fork} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import AuthApi from '../../api/AuthApi';
import * as types from './../actionTypes';
import { root, confirmationCode } from '../../consts/routePaths';
import {getCurrentLanguage} from "../../helpers/LanguageProvider/config";

export function* loginRequest() {
    yield takeEvery(types.LOGIN_REQUEST, function* (action) {
        try {
            const response = yield call(AuthApi.oauth, action.viewModel);
            if (response.access_token) {
                localStorage.setItem('token', response.access_token);
                let viewModel = {
                    source: "web"
                }
                //register user login after auth has been successful
                let responseUserData = yield call(AuthApi.login, viewModel);
                if (responseUserData.code === "200") {
                    let user = responseUserData.data;
                    localStorage.setItem('userId', user.userId);
                    localStorage.setItem('name', user.name);
                    localStorage.setItem('surname', user.surname);
                    localStorage.setItem('fullName', user.fullName);
                    if (user.imageUrl !== null) {
                        localStorage.setItem('imageUrl', user.imageUrl);
                    }
                    let userLang = "english";
                    if (user.language) {
                        localStorage.setItem('language', user.language.name);
                        localStorage.setItem('languageCode', user.language.isoCode);

                        if(user.language.isoCode === "es"){
                            userLang = "spanish";
                        }
                        else if(user.language.isoCode === "ru"){
                            userLang = "russian";
                        }
                        else if(user.language.isoCode === "hr"){
                            userLang = "croatian";
                        }

                    }

                    localStorage.setItem('title', user.title);
                    localStorage.setItem('authorities', JSON.stringify(user.authorities));
                    yield put({
                        type: types.LOGIN_SUCCESS,
                        token: response.access_token,
                    });


                    yield put({
                        type: types.CHANGE_LANGUAGE,
                        language: getCurrentLanguage(userLang)
                    });
                }
            } else if (response.error === "invalid_grant") {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Wrong username or password!"
                })
            } else {
                yield put({
                    type: types.AJAX_FAILED,
                    message: "Server error!"
                })
                yield put({type: types.LOGIN_ERROR})
            }
        } catch (e) {
            yield put({type: types.AJAX_FAILED})
        }
        yield put({
            type: types.AJAX_FINISHED,
        });
    });
}

export function* loginSuccess() {
    yield takeEvery(types.LOGIN_SUCCESS, function* (payload) {
        yield localStorage.setItem('token', payload.token);
    });
}


export function* logout() {
    yield takeEvery(types.LOGOUT, function* (action) {
        localStorage.removeItem('token');
        yield put(push(root));
    });
}

export function* checkAuthorization() {
    yield takeEvery(types.CHECK_AUTHORIZATION, function* () {
        const token = localStorage.getItem('token');
        if (token) {
            yield put({
                type: types.LOGIN_SUCCESS,
                token,
            });
        }
    });
}

export function* signUp() {
    yield takeLatest(types.SIGN_UP, function*(action) {
        try {
            const response = yield call(AuthApi.signUp, action.viewModel);
            yield put({
                type: types.SIGN_UP_SUCCESS,
                userSignUp: response
            });
            yield put(push(confirmationCode));
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: e.message
            });
        }
    });
}

export function* confirmSignUp() {
    yield takeLatest(types.CONFIRM_SIGN_UP, function*(action) {
        try {
            yield call(AuthApi.confirmSignUp, action.viewModel);
            debugger;
            yield put({
                type: types.CONFIRM_SIGN_UP_SUCCESS,
            });
            yield put(push(root));
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: e.message
            });
        }
    });
}

export function* changeUserPassword() {
    yield takeLatest(types.CHANGE_USER_PWD, function*(action) {
        try {
            yield call(AuthApi.changeUserPassword, action.viewModel);
            yield put({
                type: types.CHANGE_USER_PWD_SUCCESS,
            });
            /*yield put({
                type: types.AJAX_SUCCESS,
                message: "Cloud providers fetched successfully"
            });*/
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: e.message
                //message: "Failed to load cloud providers."
            });
        }
    });
}

export function* resendSignUpCode() {
    yield takeLatest(types.RESEND_SIGN_UP_CODE, function*(action) {
        try {
            yield call(AuthApi.resendSignUpCode, action.viewModel);
            yield put({
                type: types.RESEND_SIGN_UP_CODE_SUCCESS,
            });
            /*yield put({
                type: types.AJAX_SUCCESS,
                message: "Cloud providers fetched successfully"
            });*/
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: e.message
                //message: "Failed to load cloud providers."
            });
        }
    });
}

export function* forgotUserPassword() {
    yield takeLatest(types.FORGOT_USER_PWD, function*(action) {
        try {
            yield call(AuthApi.forgotUserPassword, action.viewModel);
            yield put({
                type: types.FORGOT_USER_PWD_SUCCESS,
            });
            /*yield put({
                type: types.AJAX_SUCCESS,
                message: "Cloud providers fetched successfully"
            });*/
        } catch (e) {
            yield put({
                type: types.AJAX_FAILED,
                message: e.message
                //message: "Failed to load cloud providers."
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(loginRequest),
        fork(loginSuccess),
        fork(logout),
        fork(checkAuthorization),
        fork(signUp),
        fork(confirmSignUp),
        fork(changeUserPassword),
        fork(resendSignUpCode),
        fork(forgotUserPassword),
    ]);
}

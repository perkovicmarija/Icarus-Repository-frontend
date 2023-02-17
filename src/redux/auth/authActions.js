import * as types from '../actionTypes';

const actions = {
    checkAuthorization: () => ({
        type: types.CHECK_AUTHORIZATION
    }),
    login: (viewModel) => ({
        type: types.LOGIN_REQUEST,
        viewModel
    }),
    logout: () => ({
        type: types.LOGOUT
    }),
    signUp: (viewModel) => ({
        type: types.SIGN_UP,
        viewModel
    }),
    confirmSignUp: (viewModel) => ({
        type: types.CONFIRM_SIGN_UP,
        viewModel
    }),
    changeUserPassword: (viewModel) => ({
        type: types.CHANGE_USER_PWD,
        viewModel
    }),
    forgotUserPassword: (viewModel) => ({
        type: types.FORGOT_USER_PWD,
        viewModel
    }),
    resendSignUpCode: (viewModel) => ({
        type: types.RESEND_SIGN_UP_CODE,
        viewModel
    })

};
export default actions;

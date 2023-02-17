import RestApiPostWithPathParams from './methods/RestApiPostWithPathParams';
import RestApiAuth from './methods/RestApiAuth';

const AuthApi = {
    login (viewModel) {
        return RestApiPostWithPathParams.postData('/user/auth', viewModel);
    },
    oauth (userData) {
        return RestApiAuth.auth(userData, '/oauth/token');
    },
    logout (viewModel) {
        return RestApiPostWithPathParams.postData('/logout', viewModel);
    },
    signUp(viewModel) {
        return RestApiPostWithPathParams.postData('/signup', viewModel);
    },
    changeUserPassword (viewModel) {
        return RestApiPostWithPathParams.postData( '/change-user-password', viewModel);
    },
    forgotUserPassword (viewModel) {
        return RestApiPostWithPathParams.postData('/forgot-user-password', viewModel);
    },
    confirmSignUp (viewModel) {
        return RestApiPostWithPathParams.postData('/confirm-signup-confirmation-code', viewModel);
    },
    resendSignUpCode (viewModel) {
        return RestApiPostWithPathParams.postData('/resend-signup-confirmation-code', viewModel);
    },
}

export default AuthApi;

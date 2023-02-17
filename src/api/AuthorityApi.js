import RestApiGetPathParams from './methods/RestApiGetPathParams';

const AuthorityApi = {
    getAll () {
        return RestApiGetPathParams.getData('/authority/getAll', {});
    },
    get(viewModel) {
        return RestApiGetPathParams.getData('/authority', viewModel);
    }
}

export default AuthorityApi;

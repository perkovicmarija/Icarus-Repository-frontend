import RestApiGet from './methods/RestApiGet';

const AuthorityApi = {
    getAll () {
        return RestApiGet.getData('/authority/getAll', {});
    },
    get(viewModel) {
        return RestApiGet.getData('/authority', viewModel);
    }
}

export default AuthorityApi;

import RestApiPost from './methods/RestApiPost';
import RestApiGet from './methods/RestApiGet';
import RestApiGetRequestParams from './methods/RestApiGetRequestParams';
import RestApiPostWithPathParams from './methods/RestApiPostWithPathParams';

const UserRoleApi = {
    getAll(viewModel) {
        return RestApiGet.getData('/userRole/getAll', viewModel);
    },
    getAllPagination(viewModel) {
        return RestApiPost.postData('/userRole/getAllPagination', viewModel);
    },
    get(viewModel) {
        return RestApiGet.getData('/userRole/:userRoleId', viewModel);
    },
    create(viewModel) {
        return RestApiPost.postData('/userRole/create', viewModel);
    },
    update(viewModel, params) {
        return RestApiPostWithPathParams.postData('/userRole/update/:page/:rowsPerPage', viewModel, params);
    },
    delete(viewModel) {
        return RestApiGetRequestParams.getData('/userRole/delete', viewModel)
    }
}

export default UserRoleApi;

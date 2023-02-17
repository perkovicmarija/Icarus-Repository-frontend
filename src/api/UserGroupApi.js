import RestApiPost from './methods/RestApiPost';
import RestApiGetPathParams from './methods/RestApiGetPathParams';
import RestApiGetRequestParams from './methods/RestApiGetRequestParams';
import RestApiPostWithPathParams from './methods/RestApiPostWithPathParams';

const UserGroupApi = {
    getAll(viewModel) {
        return RestApiGetPathParams.getData('/userGroup/getAll', viewModel);
    },
    getAllPagination(viewModel) {
        return RestApiPost.postData('/userGroup/getAllPagination', viewModel);
    },
    get(viewModel) {
        return RestApiGetPathParams.getData('/userGroup/:userGroupId', viewModel);
    },
    create(viewModel) {
        return RestApiPost.postData('/userGroup/create', viewModel);
    },
    update(viewModel, params) {
        return RestApiPostWithPathParams.postData('/userGroup/update/:page/:rowsPerPage',viewModel, params);
    },
    delete(viewModel) {
        return RestApiGetRequestParams.getData('/userGroup/delete/', viewModel)
    }
}

export default UserGroupApi;

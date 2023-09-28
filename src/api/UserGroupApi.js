import RestApiPost from './methods/RestApiPost';
import RestApiGet from './methods/RestApiGet';
import RestApiPostWithPathParams from './methods/RestApiPostWithPathParams';
import RestApiDelete from "./methods/RestApiDelete";

const UserGroupApi = {
    getAll(viewModel) {
        return RestApiGet.getData('/userGroup/getAll', viewModel);
    },
    getAllPagination(viewModel) {
        return RestApiPost.postData('/userGroup/getAllPagination', viewModel);
    },
    get(viewModel) {
        return RestApiGet.getData('/userGroup/:userGroupId', viewModel);
    },
    create(viewModel) {
        return RestApiPost.postData('/userGroup/create', viewModel);
    },
    update(viewModel, params) {
        return RestApiPostWithPathParams.postData('/userGroup/update/:page/:rowsPerPage',viewModel, params);
    },
    delete(viewModel) {
        return RestApiDelete.deleteData(viewModel, '/userGroup/:userGroupId' )
    }
}

export default UserGroupApi;

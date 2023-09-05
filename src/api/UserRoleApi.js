import RestApiPost from './methods/RestApiPost';
import RestApiGet from './methods/RestApiGet';
import RestApiPostWithPathParams from './methods/RestApiPostWithPathParams';
import RestApiDelete from "./methods/RestApiDelete";

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
        return RestApiDelete.deleteData(viewModel, '/userRole/:userRoleId')
    }
}

export default UserRoleApi;

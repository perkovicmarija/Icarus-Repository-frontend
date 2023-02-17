import RestApiPost from './methods/RestApiPost';
import RestApiGetPathParams from './methods/RestApiGetPathParams';

const UserApi = {
    getAllPagination(viewModel) {
        return RestApiPost.postData('/user/getAllPagination', viewModel);
    },
    getAllSimple(viewModel) {
        return RestApiGetPathParams.getData('/user/getAllSimple', viewModel);
    },
    getAll(viewModel) {
        return RestApiGetPathParams.getData('/user/getAll', viewModel);
    },
    getAllLanguages(viewModel) {
        return RestApiGetPathParams.getData('/user/languages', viewModel);
    },
    get(viewModel) {
        return RestApiGetPathParams.getData('/user/:userId', viewModel);
    },
    create(viewModel) {
        return RestApiPost.postData('/user/create', viewModel);
    },
    update(viewModel) {
        return RestApiPost.postData('/user/update', viewModel);
    },
    delete(viewModel) {
        return RestApiGetPathParams.getData('/user/delete/', viewModel)
    },
    reactivate(viewModel) {
        return RestApiGetPathParams.getData('/user/reactivate/', viewModel)
    },
    renewCode(viewModel) {
        return RestApiGetPathParams.getData('/user/renewCode/', viewModel)
    },
    recoverPassword(viewModel) {
        return RestApiPost.postDataSimple(viewModel, '/user/recoverPassword')
    }
}

export default UserApi;

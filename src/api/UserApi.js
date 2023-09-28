import RestApiPost from './methods/RestApiPost';
import RestApiGet from './methods/RestApiGet';

const UserApi = {
    getAllPagination(viewModel) {
        return RestApiPost.postData('/user/getAllPagination', viewModel);
    },
    getAllSimple(viewModel) {
        return RestApiGet.getData('/user/getAllSimple', viewModel);
    },
    getAll(viewModel) {
        return RestApiGet.getData('/user/getAll', viewModel);
    },
    getAllLanguages(viewModel) {
        return RestApiGet.getData('/user/languages', viewModel);
    },
    get(viewModel) {
        return RestApiGet.getData('/user/:userId', viewModel);
    },
    create(viewModel) {
        return RestApiPost.postData('/user/create', viewModel);
    },
    update(viewModel) {
        return RestApiPost.postData('/user/update', viewModel);
    },
    delete(viewModel) {
        return RestApiGet.getData('/user/delete/', viewModel)
    },
    reactivate(viewModel) {
        return RestApiGet.getData('/user/reactivate/', viewModel)
    },
    renewCode(viewModel) {
        return RestApiGet.getData('/user/renewCode/', viewModel)
    },
    recoverPassword(viewModel) {
        return RestApiPost.postDataSimple(viewModel, '/user/recoverPassword')
    }
}

export default UserApi;

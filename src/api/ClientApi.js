import RestApiGet from "./methods/RestApiGet";
import RestApiPost from "./methods/RestApiPost";
import RestApiDelete from "./methods/RestApiDelete";
import RestApiPutWithPathParams from "./methods/RestApiPutWithPathParams";

const ClientApi = {
  getAllClients(viewModel) {
    return RestApiGet.getData('/client/getAllClients', viewModel);
  },
  getAllClientsPagination(viewModel) {
    return RestApiPost.postData('/client/getAllClientsPagination', viewModel);
  },
  createClient(viewModel) {
    return RestApiPost.postData('/client', viewModel);
  },
  updateClient(viewModel) {
    return RestApiPutWithPathParams.putData('/client', viewModel);
  },
  deleteClient(viewModel) {
    return RestApiDelete.deleteData(viewModel,'/client/:clientId');
  },
}

export default ClientApi;

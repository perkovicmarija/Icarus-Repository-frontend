import RestApiGet from "./methods/RestApiGet";
import RestApiPost from "./methods/RestApiPost";
import RestApiDelete from "./methods/RestApiDelete";
import RestApiPutWithPathParams from "./methods/RestApiPutWithPathParams";
import RestApiGetWithParams from "./methods/RestApiGetWithParams";

const ClientApi = {
  getAllClients() {
    return RestApiGet.getData('/client/getAllClients');
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

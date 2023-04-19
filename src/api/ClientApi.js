import RestApiGet from "./methods/RestApiGet";
import RestApiPost from "./methods/RestApiPost";

const ClientApi = {
  getAllClients(viewModel) {
    return RestApiGet.getData('/setting/getAllClients', viewModel);
  },
  getAllClientsPagination(viewModel) {
    return RestApiPost.postData('/setting/getAllClientsPagination', viewModel);
  },
  createClient(viewModel) {
    return RestApiPost.postData('/setting/createClient', viewModel);
  },
}

export default ClientApi;

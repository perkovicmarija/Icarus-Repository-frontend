import RestApiGet from "./methods/RestApiGet";
import RestApiPost from "./methods/RestApiPost";
import RestApiDelete from "./methods/RestApiDelete";
import RestApiPutWithPathParams from "./methods/RestApiPutWithPathParams";
import RestApiGetWithParams from "./methods/RestApiGetWithParams";

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

  ///////////////////////////   VERSION MOBILE   ///////////////////////////////////////////////

  getMobileVersions(viewModel) {
    return RestApiGetWithParams.getData(viewModel, '/version-mobile');
  },
  createMobileVersion(viewModel) {
    return RestApiPost.postData('/version-mobile', viewModel);
  },
  updateMobileVersion(viewModel) {
    return RestApiPutWithPathParams.putData('/version-mobile', viewModel);
  },
  deleteMobileVersion(viewModel) {
    return RestApiDelete.deleteData(viewModel,'/version-mobile/:versionMobileId');
  },

}

export default ClientApi;

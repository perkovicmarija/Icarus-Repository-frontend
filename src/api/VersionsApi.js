import RestApiPost from "./methods/RestApiPost";
import RestApiDelete from "./methods/RestApiDelete";
import RestApiPutWithPathParams from "./methods/RestApiPutWithPathParams";

const VersionsApi = {
  getMobileVersionsPaginated(viewModel) {
    return RestApiPost.postData("/version-mobile/paginate", viewModel);
  },
  createMobileVersion(viewModel) {
    return RestApiPost.postData("/version-mobile", viewModel);
  },
  updateMobileVersion(viewModel) {
    return RestApiPutWithPathParams.putData("/version-mobile", viewModel);
  },
  deleteMobileVersion(viewModel) {
    return RestApiDelete.deleteData(
      viewModel,
      "/version-mobile/:versionMobileId"
    );
  },
};

export default VersionsApi;

import RestApiPost from "./methods/RestApiPost";
import RestApiPostMultipart from "./methods/Multipart/RestApiPostMultipart";
import RestApiPostDownloadAxios from "./methods/Download/RestApiPostDownloadAxios";
import RestApiPostViewAxios from "./methods/Download/RestApiPostViewAxios";
import RestApiGet from "./methods/RestApiGet";
import RestApiDelete from "./methods/RestApiDelete";
import RestApiGetDownloadAxios from "./methods/Download/RestApiGetDownloadAxios";
import { RestApiFile2 } from "./methods/RestApiFile2";

const IcarusDocumentationFileApi = {
  getAll(viewModel) {
    return RestApiGet.getData(
      "/support/icarus-documentation-file/get-all",
      viewModel
    );
  },
  get(viewModel) {
    return RestApiGet.getData("/support/icarus-documentation-file/", viewModel);
  },
  getAllInFolder(viewModel) {
    return RestApiPost.postData(
      "/support/icarus-documentation-file/fetch-all-in-folder",
      viewModel
    );
  },
  getBySearch(viewModel) {
    return RestApiPost.postData(
      "/support/icarus-documentation-file/fetch-search",
      viewModel
    );
  },
  getByFilter(viewModel) {
    return RestApiPost.postData(
      "/support/icarus-documentation-file/filter",
      viewModel
    );
  },
  create(viewModel) {
    return RestApiPost.postData(
      "/support/icarus-documentation-file/create",
      viewModel
    );
  },
  getHistory(viewModel) {
    return RestApiPost.postData(
      "/support/icarus-documentation-file/fetch-history",
      viewModel
    );
  },
  createDownloadExcelList(viewModel) {
    return RestApiGetDownloadAxios.getData(
      "/support/icarus-documentation-file/get-download-history-excel-export/",
      viewModel
    );
  },
  moveFile(viewModel) {
    return RestApiPost.postData(
      "/support/icarus-documentation-file/move-file",
      viewModel
    );
  },
  edit(viewModel) {
    return RestApiPostMultipart.postData(
      viewModel,
      "/support/icarus-documentation-file/edit"
    );
  },
  delete(viewModel) {
    return RestApiDelete.deleteData(
      viewModel,
      "/support/icarus-documentation-file/:id"
    );
  },
  download(viewModel) {
    return RestApiPostDownloadAxios.postData(
      viewModel,
      "/support/icarus-documentation-file/download"
    );
  },
  view(viewModel) {
    return RestApiPostViewAxios.postData(
      viewModel,
      "/support/icarus-documentation-file/download"
    );
  },
  view2(viewModel, onProgress, abortController?: any) {
    return RestApiFile2.get(
      "/support/icarus-documentation-file/download",
      viewModel,
      onProgress,
      abortController
    );
  },
  download2(viewModel, onProgress, abortController?: any) {
    return RestApiFile2.download(
      "/support/icarus-documentation-file/download",
      viewModel,
      onProgress,
      abortController
    );
  },
  upload2(viewModel, onProgress, abortController?: any) {
    return RestApiFile2.upload(
      "/support/icarus-documentation-file/upload",
      viewModel,
      onProgress,
      abortController
    );
  },
};

export default IcarusDocumentationFileApi;

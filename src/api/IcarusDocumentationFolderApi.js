import RestApiGet from "./methods/RestApiGet";
import RestApiPost from './methods/RestApiPost';
import RestApiDelete from "./methods/RestApiDelete";
import RestApiPostMultipartAxios from "./methods/Multipart/RestApiPostMultipartAxios";

const IcarusDocumentationFolderApi = {
    getAll(viewModel) {
        return RestApiGet.getData('/support/icarus-documentation-folder/get-all', viewModel);
    },
    get(viewModel) {
        return RestApiGet.getData('/support/icarus-documentation-folder/', viewModel);
    },
    getFolderTree(viewModel) {
        return RestApiGet.getData('/support/icarus-documentation-folder/get-folder-tree', viewModel);
    },
    getOnPath(viewModel) {
        return RestApiPost.postData('/support/icarus-documentation-folder/fetch-on-path', viewModel);
    },
    create(viewModel) {
        return RestApiPost.postData('/support/icarus-documentation-folder/create', viewModel);
    },
    update(viewModel) {
        return RestApiPost.postData('/support/icarus-documentation-folder/update', viewModel);
    },
    moveFolder(viewModel) {
        return RestApiPost.postData('/support/icarus-documentation-folder/move-folder', viewModel);
    },
    delete(viewModel) {
        return RestApiDelete.deleteData(viewModel, '/support/icarus-documentation-folder/:id' )
    },
    getStorageInfo(viewModel) {
        return RestApiGet.getData('/support/icarus-documentation-folder/get-storage-info', viewModel);
    },
}

export default IcarusDocumentationFolderApi;
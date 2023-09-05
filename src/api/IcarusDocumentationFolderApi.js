import RestApiGet from "./methods/RestApiGet";
import RestApiPost from './methods/RestApiPost';
import RestApiDelete from "./methods/RestApiDelete";

const IcarusDocumentationFolderApi = {
    getAll(viewModel) {
        return RestApiGet.getData('/icarusDocumentationFolder/getAll', viewModel);
    },
    get(viewModel) {
        return RestApiGet.getData('/icarusDocumentationFolder/', viewModel);
    },
    getFolderTree(viewModel) {
        return RestApiGet.getData('/icarusDocumentationFolder/getFolderTree', viewModel);
    },
    getOnPath(viewModel) {
        return RestApiPost.postData('/icarusDocumentationFolder/fetchOnPath', viewModel);
    },
    create(viewModel) {
        return RestApiPost.postData('/icarusDocumentationFolder/create', viewModel);
    },
    update(viewModel) {
        return RestApiPost.postData('/icarusDocumentationFolder/update', viewModel);
    },
    moveFolder(viewModel) {
        return RestApiPost.postData('/icarusDocumentationFolder/moveFolder', viewModel);
    },
    delete(viewModel) {
        return RestApiDelete.deleteData(viewModel, '/icarusDocumentationFolder/:id' )
    },
    getStorageInfo(viewModel) {
        return RestApiGet.getData('/documentation/getStorageInfo', viewModel);
    },
}

export default IcarusDocumentationFolderApi;
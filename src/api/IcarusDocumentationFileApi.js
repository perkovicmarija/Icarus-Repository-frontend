import RestApiPost from './methods/RestApiPost';
import RestApiPostMultipart from './methods/Multipart/RestApiPostMultipart';
import RestApiPostDownloadAxios from './methods/RestApiPostDownloadAxios';
import RestApiPostMultipartAxios from './methods/RestApiPostMultipartAxios';
import RestApiPostViewAxios from './methods/RestApiPostViewAxios';
import RestApiGet from "./methods/RestApiGet";
import RestApiDelete from "./methods/RestApiDelete";
import RestApiGetDownloadAxios from "./methods/RestApiGetDownloadAxios";

const IcarusDocumentationFileApi = {
    getAll(viewModel) {
        return RestApiGet.getData('/icarusDocumentationFile/getAll', viewModel);
    },
    get(viewModel) {
        return RestApiGet.getData('/icarusDocumentationFile/', viewModel);
    },
    getAllInFolder(viewModel) {
        return RestApiPost.postData('/icarusDocumentationFile/fetchAllInFolder', viewModel);
    },
    getBySearch(viewModel) {
        return RestApiPost.postData('/icarusDocumentationFile/fetchSearch', viewModel);
    },
    create(viewModel) {
        return RestApiPost.postData('/icarusDocumentationFile/create', viewModel);
    },
    update(viewModel) {
        return RestApiPost.postData('/icarusDocumentationFile/update', viewModel);
    },
    getHistory(viewModel) {
        return RestApiPost.postData('/icarusDocumentationFile/fetchHistory', viewModel);
    },
    createDownloadExcelList(viewModel) {
        return RestApiGetDownloadAxios.getData('/icarusDocumentationFile/getDownloadHistoryExcelExport/', viewModel)
    },
    moveFile(viewModel) {
        return RestApiPost.postData('/icarusDocumentationFile/moveFile', viewModel);
    },
    uploadFile(viewModel) {
        return RestApiPostMultipartAxios.postData(viewModel, '/icarusDocumentationFile/upload');
    },
    revise(viewModel) {
        return RestApiPostMultipart.postData(viewModel, '/icarusDocumentationFile/revise');
    },
    edit(viewModel) {
        return RestApiPostMultipart.postData(viewModel, '/icarusDocumentationFile/edit');
    },
    delete(viewModel) {
        return RestApiDelete.deleteData(viewModel,'/icarusDocumentationFile/:id');
    },
    download(viewModel) {
        return RestApiPostDownloadAxios.postData(viewModel, '/icarusDocumentationFile/download')
    },
    view(viewModel) {
        return RestApiPostViewAxios.postData(viewModel, '/icarusDocumentationFile/download')
    },

}

export default IcarusDocumentationFileApi;

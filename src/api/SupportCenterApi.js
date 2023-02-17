import RestApiPost from './methods/RestApiPost';
import RestApiGetPathParams from './methods/RestApiGetPathParams';
import RestApiPostMultipartArrayAxios from './methods/Multipart/RestApiPostMultipartArrayAxios';
import RestApiPostDownloadAxios from './methods/Download/RestApiPostDownloadAxios';

const SupportCenterApi = {
    getAll (viewModel) {
        return RestApiPost.postData('/supportBug/getAll', viewModel);
    },
    get(viewModel) {
        return RestApiGetPathParams.getData('/supportBug/:supportBugId', viewModel);
    },
    getAllModules() {
        return RestApiGetPathParams.getData('/supportBug/getAllModules', {});
    },
    getAllLevels() {
        return RestApiGetPathParams.getData('/supportBug/getAllLevels', {});
    },
    getAllStatuses() {
        return RestApiGetPathParams.getData('/supportBug/getAllStatuses', {});
    },
    create(viewModel) {
        return RestApiPost.postData('/supportBug/create', viewModel);
    },
    update(viewModel) {
        return RestApiPost.postData('/supportBug/update', viewModel);
    },
    addComment(viewModel) {
        return RestApiPost.postData('/supportBug/addComment', viewModel);
    },
    createWithAttachments(viewModel) {
        return RestApiPostMultipartArrayAxios.postData(viewModel, '/supportBug/createWithAttachments');
    },
    updateWithAttachments(viewModel) {
        debugger;
        return RestApiPostMultipartArrayAxios.postData(viewModel, '/supportBug/updateWithAttachments');
    },
    download(viewModel) {
        return RestApiPostDownloadAxios.postData(viewModel, '/supportBug/downloadAttachment')
    },
    getAllSoftwareLogs (viewModel) {
        return RestApiGetPathParams.getData('/supportBug/softwareLog/getAll', viewModel);
    },
    createSoftwareLog(viewModel) {
        return RestApiPost.postData('/supportBug/softwareLog/create', viewModel);
    },
}

export default SupportCenterApi;

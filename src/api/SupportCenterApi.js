import RestApiPost from './methods/RestApiPost';
import RestApiGetPathParams from './methods/RestApiGetPathParams';
import RestApiPostMultipartArrayAxios from './methods/Multipart/RestApiPostMultipartArrayAxios';
import RestApiPostDownloadAxios from './methods/Download/RestApiPostDownloadAxios';
import RestApiGet from "./methods/RestApiGet";
import RestApiPutWithPathParams from "./methods/RestApiPutWithPathParams";
import RestApiDelete from "./methods/RestApiDelete";

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

    ///////////////////////////   SUPPORT SOFTWARE LOGS   ///////////////////////////////////////////////

    getAllSoftwareLogClients(viewModel) {
        return RestApiGet.getData('/support/software-log-clients-joined', viewModel);
    },
    getAllSoftwareLogClientsPagination(viewModel) {
        return RestApiPost.postData('/support/software-log-clients-joined/paginate', viewModel);
    },
    createSoftwareLogClient(viewModel) {
        return RestApiPost.postData('/support/software-log-clients-joined', viewModel);
    },
    updateSoftwareLogClient(viewModel) {
        return RestApiPutWithPathParams.putData('/support/software-log-clients-joined', viewModel);
    },
    deleteSoftwareLogClient(viewModel) {
        return RestApiDelete.deleteData(viewModel,'/support/software-log-clients/:softwareLogId');
    }
}

export default SupportCenterApi;

import RestApiPost from './methods/RestApiPost';
import RestApiPostMultipartArrayAxios from './methods/Multipart/RestApiPostMultipartArrayAxios';
import RestApiPostDownloadAxios from './methods/Download/RestApiPostDownloadAxios';
import RestApiGet from "./methods/RestApiGet";
import RestApiPutWithPathParams from "./methods/RestApiPutWithPathParams";
import RestApiDelete from "./methods/RestApiDelete";
import RestApiGetWithParams from "./methods/RestApiGetWithParams";

const SupportCenterApi = {
    getAll (viewModel) {
        return RestApiPost.postData('/supportBug/getAll', viewModel);
    },
    get(viewModel) {
        return RestApiGet.getData('/supportBug/:supportBugId', viewModel);
    },
    getAllModules() {
        return RestApiGet.getData('/supportBug/getAllModules', {});
    },
    getAllLevels() {
        return RestApiGet.getData('/supportBug/getAllLevels', {});
    },
    getAllStatuses() {
        return RestApiGet.getData('/supportBug/getAllStatuses', {});
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
        return RestApiDelete.deleteData(viewModel,'/support/software-log-clients/:supportSoftwareLogId');
    },

    ///////////////////////////   ROADMAP   ///////////////////////////////////////////////

    getRoadmapLogsPaginateFilter(viewModel) {
        return RestApiPost.postData('/support/roadmap-log/paginate', viewModel);
    },
    getAllRoadmapLogs(viewModel) {
        return RestApiGet.getData('/support/roadmap-log', viewModel);
    },
    createRoadmapLog(viewModel) {
        return RestApiPost.postData('/support/roadmap-log', viewModel);
    },
    updateRoadmapLog(viewModel) {
        return RestApiPutWithPathParams.putData('/support/roadmap-log', viewModel);
    },
    deleteRoadmapLog(viewModel) {
        return RestApiDelete.deleteData(viewModel,'/support/roadmap-log/:icarusRoadmapLogId');
    },

    ///////////////////////////   SUBSCRIPTIONS   ///////////////////////////////////////////////

    getSoftwareLogSubscriptionsPaginateFilter(viewModel) {
        return RestApiPost.postData('/support/software-log-subscription/paginate', viewModel);
    },
    getAllSoftwareLogSubscriptions(viewModel) {
        return RestApiGet.getData('/support/software-log-subscription', viewModel);
    },
    createSoftwareLogSubscription(viewModel) {
        return RestApiPost.postData('/support/software-log-subscription', viewModel);
    },
    updateSoftwareLogSubscription(viewModel) {
        return RestApiPutWithPathParams.putData('/support/software-log-subscription', viewModel);
    },
    deleteSoftwareLogSubscription(viewModel) {
        return RestApiDelete.deleteData(viewModel,'/support/software-log-subscription/:supportSoftwareLogSubscriptionId');
    },
}

export default SupportCenterApi;

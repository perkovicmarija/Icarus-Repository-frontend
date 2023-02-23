import RestApiGet from "../methods/RestApiGet";
import RestApiPost from "../methods/RestApiPost";
import RestApiPut from "../methods/RestApiPutWithPathParams";
import RestApiDelete from "../methods/RestApiDelete";
import RestApiPostDownloadAxios from "../methods/RestApiPostDownloadAxios";
import RestApiPostMultipartAxios from "../methods/RestApiPostMultipartAxios";

const AuditChecklistApi = {
    get(viewModel) {
        return RestApiGet.getData(viewModel, '/audit-checklists/');
    },
    create(viewModel) {
        return RestApiPost.postData('/audit-checklists', viewModel);
    },
    put(viewModel) {
        return RestApiPut.putData(viewModel, '/audit-checklists');
    },
    delete(viewModel) {
        return RestApiDelete.deleteData(null,'/audit-checklists/' + viewModel.id, null);
    },
    getAllActive(viewModel) {
        return RestApiPost.postData('/audit-checklists/all-active', viewModel);
    },
    getAllActiveWithItems(viewModel) {
        return RestApiPost.postData(viewModel, '/audit-checklists/active-with-items');
    },
    getAuditChecklistsDomains() {
        return RestApiPost.postData('/audit-checklists/domains', null);
    },
    getAuditChecklistsTypes() {
        return RestApiPost.postData('/audit-checklists/types', null);
    },
    createNewVersion(viewModel) {
        return RestApiPost.postData(viewModel, '/audit-checklists/' + viewModel.auditChecklistId + '/version');
    },
    getAuditDndChecklist(viewModel) {
        return RestApiGet.getData('/audit-checklists/' + viewModel.id + '/dnd-tree-view', null);
    },
    updateOrderNew(viewModel) {
        return RestApiPut.putData(viewModel.data, '/audit-checklists/' + viewModel.auditChecklistId + '/dnd-tree-view');
    },
    createPDF(viewModel) {
        return RestApiPostDownloadAxios.postData(viewModel, '/audit-checklists/create-pdf');
    },
    createExcel(viewModel) {
        return RestApiPostDownloadAxios.postData(viewModel, '/audit-checklists/create-excel');
    },
    uploadCSV(viewModel) {
        return RestApiPostMultipartAxios.postData(viewModel, '/audit-checklists/upload');
    }
}

export default AuditChecklistApi;
import RestApiGet from "../methods/RestApiGet";
import RestApiPut from "../methods/RestApiPutWithPathParams";
import RestApiPost from "../methods/RestApiPost";
import RestApiDelete from "../methods/RestApiDelete";

const AuditChecklistItemApi = {
    get(viewModel) {
        return RestApiGet.getData('/audit-checklists/items/' + viewModel.id);
    },
    update(viewModel) {
        return RestApiPut.putData('/audit-checklists/' + viewModel.auditChecklist.auditChecklistId + '/items', viewModel.selectedItem);
    },
    create(viewModel) {
        return RestApiPost.postData('/audit-checklists/' + viewModel.auditChecklist.auditChecklistId + '/items', viewModel.selectedItem);
    },
    delete(viewModel) {
        return RestApiDelete.deleteData({}, '/audit-checklists/' + viewModel.auditChecklist.auditChecklistId + '/items/' + viewModel.auditItemId);
    }
}

export default AuditChecklistItemApi;
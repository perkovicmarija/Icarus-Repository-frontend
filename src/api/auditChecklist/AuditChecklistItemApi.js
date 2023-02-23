import RestApiGet from "../methods/RestApiGet";
import RestApiPut from "../methods/RestApiPutWithPathParams";
import RestApiPost from "../methods/RestApiPost";
import RestApiDelete from "../methods/RestApiDelete";

const AuditChecklistItemApi = {
    get(viewModel) {
        return RestApiGet.getData(viewModel, '/audit-checklists/items/');
    },
    update(viewModel) {
        return RestApiPut.putData(viewModel.selectedItem, '/audit-checklists/' + viewModel.auditChecklist.auditChecklistId + '/items');
    },
    create(viewModel) {
        return RestApiPost.postData(viewModel.selectedItem, '/audit-checklists/' + viewModel.auditChecklist.auditChecklistId + '/items');
    },
    delete(viewModel) {
        return RestApiDelete.deleteData({}, '/audit-checklists/' + viewModel.auditChecklist.auditChecklistId + '/items/' + viewModel.auditItemId);
    }
}

export default AuditChecklistItemApi;
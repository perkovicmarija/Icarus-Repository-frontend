import RestApiGet from "../methods/RestApiGet";
import RestApiPut from "../methods/RestApiPutWithPathParams";
import RestApiPost from "../methods/RestApiPost";
import RestApiDelete from "../methods/RestApiDelete";

const AuditChecklistSubAreaApi = {
    get(viewModel) {
        return RestApiGet.getData('/audit-checklists/subareas/' + viewModel.id);
    },
    update(viewModel) {
        return RestApiPut.putData('/audit-checklists/subareas', viewModel);
    },
    create(viewModel) {
        return RestApiPost.postData('/audit-checklists/subareas', viewModel);
    },
    delete(viewModel) {
        return RestApiDelete.deleteData(null, '/audit-checklists/subareas/' + viewModel.auditChecklistSubAreaId, null);
    }
}

export default AuditChecklistSubAreaApi;
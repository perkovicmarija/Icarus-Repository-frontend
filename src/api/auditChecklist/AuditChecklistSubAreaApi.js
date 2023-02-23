import RestApiGet from "../methods/RestApiGet";
import RestApiPut from "../methods/RestApiPutWithPathParams";
import RestApiPost from "../methods/RestApiPost";
import RestApiDelete from "../methods/RestApiDelete";

const AuditChecklistSubAreaApi = {
    get(viewModel) {
        return RestApiGet.getData(viewModel, '/audit-checklists/subareas/');
    },
    update(viewModel) {
        return RestApiPut.putData(viewModel, '/audit-checklists/subareas');
    },
    create(viewModel) {
        return RestApiPost.postData(viewModel, '/audit-checklists/subareas');
    },
    delete(viewModel) {
        return RestApiDelete.deleteData(viewModel, '/audit-checklists/subareas/');
    }
}

export default AuditChecklistSubAreaApi;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auditItem: {
        auditItemId: null,
        question: null,
        guidance: null,
        showAuditorAction: false,
        title: "",
        auditChecklist: {
            auditChecklistId: "",
            title: null
        },
        auditChecklistSubArea: {
            auditChecklistSubAreaId: "",
            title: null
        }
    }
}

const auditChecklistItemSlice = createSlice({
    name: 'auditChecklistItem',
    initialState: initialState,
    reducers: {
        getAuditChecklistItemRequest() {},
        setAuditChecklistItem(state, action) {
            state.auditItem = action.auditItem
        },
        updateAuditChecklistItemRequest() {},
        createAuditChecklistItemRequest() {},
        deleteAuditChecklistItemRequest() {},
    }
});

export const auditChecklistItemActions = auditChecklistItemSlice.actions;
export default auditChecklistItemSlice.reducer;
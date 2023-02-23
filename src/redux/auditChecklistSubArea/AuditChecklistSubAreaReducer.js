import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auditChecklistSubArea: {
        auditChecklistSubAreaId: null,
        title: null,
        auditItems: [],
        auditCheckListSubAreas: []
    },
    auditChecklistSubAreaChild: []
}

const auditChecklistSubAreaSlice = createSlice({
    name: 'auditChecklistSubArea',
    initialState: initialState,
    reducers: {
        getAuditChecklistSubAreaRequest() {},
        setAuditChecklistSubArea(state, action) {
            state.auditChecklistSubArea = action.auditChecklistSubArea
        },
        updateAuditChecklistSubAreaRequest() {},
        createAuditChecklistSubAreaRequest() {},
        deleteAuditChecklistSubAreaRequest() {},
    }
});

export const auditChecklistSubAreaActions = auditChecklistSubAreaSlice.actions;
export default auditChecklistSubAreaSlice.reducer;
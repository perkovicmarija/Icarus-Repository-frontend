import { createSlice } from "@reduxjs/toolkit";

export const initFilters = {
  startDate: null,
  endDate: null,
  checklistTypes: [],
};

const initialState = {
  auditChecklist: {
    auditChecklistId: undefined,
    title: null,
    version: null,
    created: null,
    active: null,
    auditChecklistType: {
      auditChecklistTypeId: "",
      name: null,
    },
    userCreated: {
      userId: "",
      name: null,
      surname: null,
    },
    domain: {
      domainId: "",
      name: null,
    },
    auditItems: [],
    auditChecklistSubAreas: [],
  },
  totalCount: 0,
  auditChecklists: [],
  auditChecklistDomains: [],
  auditChecklistTypes: [],
  filters: {
    stringSearch: "",
  },
  auditDndChecklist: {
    auditChecklist: {
      auditChecklistId: undefined,
      title: null,
      version: null,
      created: null,
      active: null,
      auditChecklistType: {
        auditChecklistTypeId: "",
        name: null,
      },
      userCreated: {
        userId: "",
        name: null,
        surname: null,
      },
      domain: {
        domainId: "",
        name: null,
      },
      auditItems: [],
      auditChecklistSubAreas: [],
    },
    dndTreeViewData: [],
  },
};

const auditChecklistSlice = createSlice({
  name: "auditChecklist",
  initialState: initialState,
  reducers: {
    getAuditChecklist() {},
    getAllActiveRequest() {},
    getAuditChecklistsActiveWithItemsRequest() {},
    createAuditChecklistRequest() {},
    setAuditChecklistsAfterCreation(state, action) {
      state.auditChecklists.push(action.auditChecklist);
      state.totalCount++;
    },
    updateAuditChecklistRequest() {},
    setChecklistAfterUpdate(state, action) {
      state.auditChecklists.map((auditChecklist, index) => {
        if (
          auditChecklist.auditChecklistId ===
          action.auditChecklist.auditChecklistId
        ) {
          debugger;
          state.auditChecklists[index] = action.auditChecklist;
        }
      });
    },
    deleteAuditChecklistRequest() {},
    setAuditChecklistsAfterDelete(state, action) {
      state.auditChecklists = state.auditChecklists.filter((auditChecklist) => {
        return auditChecklist.auditChecklistId !== action.auditChecklistId;
      });
      state.totalCount--;
    },
    setAuditChecklist(state, action) {
      state.auditChecklist = action.auditChecklist;
    },
    setAuditChecklists(state, action) {
      state.auditChecklists = action.auditChecklists;
      state.totalCount = action.totalCount;
    },
    getAuditChecklistsDomains() {},
    setAuditChecklistsDomains(state, action) {
      state.auditChecklistDomains = action.auditChecklistDomains;
    },
    getAuditChecklistTypes() {},
    setAuditChecklistTypes(state, action) {
      state.auditChecklistTypes = action.auditChecklistTypes;
    },
    createNewVersionRequest() {},
    setFilterStringSearch(state, action) {
      state.filters.stringSearch = action.payload;
    },
    clearFilters(state) {
      state.filters = initialState.filters;
    },
    setFilterStartDate(state, action) {
      state.filters.startDate = action.payload;
    },
    setFilterEndDate(state, action) {
      state.filters.endDate = action.payload;
    },
    setFilterType(state, action) {
      state.filters.checklistTypes = action.payload;
    },
    clearAuditChecklists(state) {
      state.auditChecklists = [];
    },
    getAuditDndChecklistRequest() {},
    setAuditDndChecklist(state, action) {
      state.auditDndChecklist = action.auditDndChecklist;
    },
    updateAuditChecklistOrderRequest() {},
    downloadPDFRequest() {},
    downloadExcelRequest() {},
    uploadCSVChecklistRequest() {},
    publishChecklistRequest() {},
    setChecklistPublished(state, action) {
      state.auditDndChecklist.auditChecklist.published = action.payload;
    },
  },
});

export const auditChecklistActions = auditChecklistSlice.actions;
export default auditChecklistSlice.reducer;

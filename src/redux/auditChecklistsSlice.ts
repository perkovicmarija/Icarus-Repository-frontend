import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuditChecklistApi from "../api/auditChecklist/AuditChecklistApi";

export interface AuditChecklistType {
  auditChecklistTypeId: string;
  name: string;
}

export interface AuditChecklistDomain {
  domainId: string;
  name: string;
}

export const initFilters = {
  startDate: null as string | null,
  endDate: null as string | null,
  checklistTypes: [] as AuditChecklistType[],
};

export interface AuditChecklist {
  auditChecklistId: string;
  domain: { name: string }[];
  title: string;
  version: string;
  type: AuditChecklistType;
  effective: string | null;
  effectiveDate: string | null;
  published: boolean;
  checklistRevisions: AuditChecklist[];
  active: boolean;
  abbreviation: string;
}

const initialState = {
  data: undefined as AuditChecklist[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, stringSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk(
  "auditChecklists/getData",
  async (viewModel: any /*, thunkAPI */) => {
    const response = await AuditChecklistApi.getAllActive(viewModel);
    return response;
  }
);

const deleteItem = createAsyncThunk(
  "auditChecklists/deleteItem",
  async (viewModel: AuditChecklist) => {
    const response = await AuditChecklistApi.delete({
      id: viewModel.auditChecklistId,
    });
    return response.data;
  }
);

const addEditItem = createAsyncThunk(
  "auditChecklists/addEditItem",
  async ({ payload, meta }: { payload: AuditChecklist; meta: any }) => {
    const response = await (payload.auditChecklistId
      ? AuditChecklistApi.put
      : AuditChecklistApi.create)({ payload, meta });
    return response.data;
  }
);

const createNewVersion = createAsyncThunk(
  "auditChecklists/createNewVersion",
  async ({ payload, meta }: { payload: AuditChecklist; meta: any }) => {
    const response = await AuditChecklistApi.createNewVersion({
      payload,
      meta,
    });
    return response;
  }
);

const auditChecklistsSlice = createSlice({
  name: "auditChecklists",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    });
  },
});

export const auditChecklistsActions = {
  ...auditChecklistsSlice.actions,
  getData,
  addEditItem,
  deleteItem,
  createNewVersion,
};
export default auditChecklistsSlice;

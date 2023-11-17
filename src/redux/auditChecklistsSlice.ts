import { createSlice } from "@reduxjs/toolkit";
import AuditChecklistApi from "../api/auditChecklist/AuditChecklistApi";
import { createAsyncThunk2 } from "./utils";
import { Meta } from "../components/core/commonTypes";

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
  domain: { name: string } | null;
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

const getData = createAsyncThunk2(
  "auditChecklists/getData",
  async (meta: Meta) => {
    const response = await AuditChecklistApi.getAllActive(meta);
    return response;
  }
);

const deleteItem = createAsyncThunk2(
  "auditChecklists/deleteItem",
  async (
    { payload, meta }: { payload: AuditChecklist; meta: any },
    thunkAPI
  ) => {
    await AuditChecklistApi.delete(payload);
    return await thunkAPI.dispatch(getData(meta));
  }
);

const addEditItem = createAsyncThunk2(
  "auditChecklists/addEditItem",
  async (
    { payload, meta }: { payload: AuditChecklist; meta: any },
    thunkAPI
  ) => {
    await (payload.auditChecklistId
      ? AuditChecklistApi.put
      : AuditChecklistApi.create)(payload);
    return await thunkAPI.dispatch(getData(meta));
  }
);

const createNewVersion = createAsyncThunk2(
  "auditChecklists/createNewVersion",
  async (
    { payload, meta }: { payload: AuditChecklist; meta: any },
    thunkAPI
  ) => {
    await AuditChecklistApi.createNewVersion(payload);
    return await thunkAPI.dispatch(getData(meta));
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

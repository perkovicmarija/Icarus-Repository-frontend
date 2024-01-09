import { createSlice } from "@reduxjs/toolkit";
import SupportCenterApi from "../../../api/SupportCenterApi";
import { createAsyncThunk2 } from "../../utils";
import { Meta } from "../../../components/core/commonTypes";

export const initFilters = {
  selectedClients: [],
};

export interface SupportLog {
  supportSoftwareLogId: string;
  title: string;
  description: string;
  clients: any[];
  dateFormatted: string;
  dateOfLogFormatted: string;
}

const initialState = {
  data: undefined as SupportLog[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, softwareLogSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk2("supportLogs/getData", async (meta: Meta) => {
  const response = await SupportCenterApi.getAllSoftwareLogClientsPagination(
    meta
  );
  return response;
});

const deleteItem = createAsyncThunk2(
  "supportLogs/deleteItem",
  async ({ payload, meta }: { payload: SupportLog; meta: any }, thunkAPI) => {
    return await SupportCenterApi.deleteSoftwareLogClient(payload);
    //return await thunkAPI.dispatch(getData(meta));
  }
);

const addEditItem = createAsyncThunk2(
  "supportLogs/addEditItem",
  async ({ payload, meta }: { payload: SupportLog; meta: any }, thunkAPI) => {
    return await (payload.supportSoftwareLogId
      ? SupportCenterApi.updateSoftwareLogClient
      : SupportCenterApi.createSoftwareLogClient)(payload);
    //return await thunkAPI.dispatch(getData(meta));
  }
);

const supportLogsSlice = createSlice({
  name: "supportLogs",
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

export const supportLogsActions = {
  ...supportLogsSlice.actions,
  getData,
  addEditItem,
  deleteItem,
};
export default supportLogsSlice;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SupportCenterApi from "../../../api/SupportCenterApi";

export const initFilters = {
  selectedClients: [],
};

export interface SupportLog {
  supportSoftwareLogId: string;
  title: string;
  description: string;
  clients: any[];
  dateFormatted: string;
}

const initialState = {
  data: undefined as SupportLog[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, softwareLogSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk(
  "supportLogs/getData",
  async (viewModel: any /*, thunkAPI */) => {
    const response = await SupportCenterApi.getAllSoftwareLogClientsPagination(
      viewModel
    );
    console.log(response);
    return response.data;
  }
);

const deleteItem = createAsyncThunk(
  "supportLogs/deleteItem",
  async (viewModel: SupportLog) => {
    const response = await SupportCenterApi.deleteSoftwareLogClient(viewModel);
    return response.data;
  }
);

const addEditItem = createAsyncThunk(
  "supportLogs/addEditItem",
  async ({ payload, meta }: { payload: SupportLog; meta: any }) => {
    const response = await (payload.supportSoftwareLogId
      ? SupportCenterApi.updateSoftwareLogClient
      : SupportCenterApi.createSoftwareLogClient)({ payload, meta });
    return response.data;
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

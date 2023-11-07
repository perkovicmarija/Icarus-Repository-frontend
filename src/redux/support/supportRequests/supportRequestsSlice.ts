import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SupportCenterApi from "../../../api/SupportCenterApi";

export const initFilters = {
  startDate: null,
  endDate: null,
  statuses: [],
};

export interface SupportRequest {
  supportBugId: string;
  supportBugIdSign: string;
  title: string;
  module: { name: string };
  userAuthor: { fullName: string };
  status: { code: string; status: string };
  lebel: { code: string; level: string };
  created: string;
  dueDate: string;
}

const initialState = {
  data: undefined as SupportRequest[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, stringSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk(
  "supportRequests/getData",
  async (viewModel: any /* thunkAPI */) => {
    const response = await SupportCenterApi.getAll(viewModel);
    return Promise.resolve({ data: response.data, meta: response.meta });
  }
);

const deleteItem = createAsyncThunk(
  "supportRequests/deleteItem",
  async (viewModel: any) => {
    /* const response = await SupportCenterApi.delete(viewModel);
    return response.data; */
  }
);

const addEditItem = createAsyncThunk(
  "supportRequests/addEditItem",
  async ({ payload, meta }: { payload: SupportRequest; meta: any }) => {
    const response = await (payload.supportBugId
      ? SupportCenterApi.update
      : SupportCenterApi.create)({ payload, meta });
    return response.data;
  }
);

const supportRequestsSlice = createSlice({
  name: "supportRequests",
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

export const supportRequestsActions = {
  ...supportRequestsSlice.actions,
  getData,
  addEditItem,
  deleteItem,
};
export default supportRequestsSlice;

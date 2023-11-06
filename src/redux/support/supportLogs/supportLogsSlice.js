import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SupportCenterApi from "../../../api/SupportCenterApi";

export const initFilters = {
  startDate: null,
  endDate: null,
  selectedClients: [],
};

const initialState = {
  data: [],
  meta: {
    totalCount: 0,
  },
  filters: { ...initFilters, softwareLogSearch: "" },
};

const getData = createAsyncThunk(
  "supportLogs/getData",
  async (viewModel /* thunkAPI */) => {
    const response = await SupportCenterApi.getAllSoftwareLogClientsPagination(
      viewModel
    );
    return response.data;
  }
);

const supportLogsSlice = createSlice({
  name: "supportLogs",
  initialState,
  reducers: {
    addEditItem() {},
    deleteItem() {},
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      console.log("rafa", action.payload.data);
      state.data = action.payload.data;
      state.meta = action.payload.meta;
    });
  },
});

export const supportLogsActions = { ...supportLogsSlice.actions, getData };
export default supportLogsSlice.reducer;

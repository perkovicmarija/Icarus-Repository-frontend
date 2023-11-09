import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import VersionsApi from "../../api/VersionsApi";
import { Client } from "./clientsSlice";

export const initFilters = {};

export interface Version {
  versionMobileId: string;
  versionMin: string;
  platform: "";
  selectedClients: Client[];
}

const initialState = {
  data: undefined as Version[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, clientSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk(
  "versions/getData",
  async (viewModel: any /*, thunkAPI */) => {
    const response = await VersionsApi.getMobileVersionsPaginated(viewModel);
    return response;
  }
);

const deleteItem = createAsyncThunk(
  "versions/deleteItem",
  async (viewModel: Version) => {
    const response = await VersionsApi.deleteMobileVersion(viewModel);
    return response.data;
  }
);

const addEditItem = createAsyncThunk(
  "versions/addEditItem",
  async ({ payload, meta }: { payload: Version; meta: any }) => {
    const response = await (payload.versionMobileId
      ? VersionsApi.updateMobileVersion
      : VersionsApi.createMobileVersion)({ payload, meta });
    return response.data;
  }
);

const versionsSlice = createSlice({
  name: "versions",
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
    /* .addCase(getData.rejected, (state, action) => {
      console.log("rafa")
    }) */
  },
});

export const versionsActions = {
  ...versionsSlice.actions,
  getData,
  addEditItem,
  deleteItem,
};
export default versionsSlice;

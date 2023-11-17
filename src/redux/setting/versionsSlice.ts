import { createSlice } from "@reduxjs/toolkit";
import VersionsApi from "../../api/VersionsApi";
import { Client } from "./clientsSlice";
import { createAsyncThunk2 } from "../utils";
import { Meta } from "../../components/core/commonTypes";

export const initFilters = {};

export interface Version {
  versionMobileId: string;
  versionMin: string;
  platform: "";
  client: Client;
}

export type VersionForAddEdit = Omit<Version, "client"> & {
  selectedClients: Client[];
};

const initialState = {
  data: undefined as Version[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, clientSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk2("versions/getData", async (meta: Meta) => {
  const response = await VersionsApi.getMobileVersionsPaginated(meta);
  return response;
});

const deleteItem = createAsyncThunk2(
  "versions/deleteItem",
  async ({ payload, meta }: { payload: Version; meta: any }, thunkAPI) => {
    return await VersionsApi.deleteMobileVersion(payload);
    //return await thunkAPI.dispatch(getData(meta));
  }
);

const addEditItem = createAsyncThunk2(
  "versions/addEditItem",
  async ({ payload, meta }: { payload: Version; meta: any }, thunkAPI) => {
    return await (payload.versionMobileId
      ? VersionsApi.updateMobileVersion
      : VersionsApi.createMobileVersion)(payload);
    //return await thunkAPI.dispatch(getData(meta));
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

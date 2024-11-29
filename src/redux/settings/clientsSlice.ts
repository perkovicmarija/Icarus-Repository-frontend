import { createSlice } from "@reduxjs/toolkit";
import ClientApi from "../../api/ClientApi";
import { createAsyncThunk2 } from "../utils";
import { Meta } from "../../components/core/commonTypes";
import { Client } from "./clientsApi";

export const initFilters = {};

const initialState = {
  data: undefined as Client[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, clientSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getAll = createAsyncThunk2("clients/getAll", async () => {
  const response = await ClientApi.getAllClients();
  return response;
});

const getData = createAsyncThunk2("clients/getData", async (meta: Meta) => {
  const response = await ClientApi.getAllClientsPagination(meta);
  return response;
});

const deleteItem = createAsyncThunk2(
  "clients/deleteItem",
  async ({ payload, meta }: { payload: Client; meta: any }, thunkAPI) => {
    return await ClientApi.deleteClient(payload);
    //return await thunkAPI.dispatch(getData(meta));
  }
);

const addEditItem = createAsyncThunk2(
  "clients/addEditItem",
  async ({ payload, meta }: { payload: Client; meta: any }, thunkAPI) => {
    return await (payload.clientId
      ? ClientApi.updateClient
      : ClientApi.createClient)(payload);
    //return await thunkAPI.dispatch(getData(meta));
  }
);

const clientsSlice = createSlice({
  name: "clients",
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

export const clientsActions = {
  ...clientsSlice.actions,
  getAll,
  getData,
  addEditItem,
  deleteItem,
};
export default clientsSlice;

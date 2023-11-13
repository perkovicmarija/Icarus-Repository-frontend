import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClientApi from "../../api/ClientApi";

export const initFilters = {};

export interface Client {
  clientId: string;
  name: string;
  abbreviation: string;
  deactivated: boolean;
}

const initialState = {
  data: undefined as Client[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, clientSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk(
  "clients/getData",
  async (viewModel: any /*, thunkAPI */) => {
    const response = await ClientApi.getAllClientsPagination(viewModel);
    return response;
  }
);

const deleteItem = createAsyncThunk(
  "clients/deleteItem",
  async ({ payload, meta }: { payload: Client; meta: any }, thunkAPI) => {
    await ClientApi.deleteClient(payload);
    return await thunkAPI.dispatch(getData(meta));
  }
);

const addEditItem = createAsyncThunk(
  "clients/addEditItem",
  async ({ payload, meta }: { payload: Client; meta: any }, thunkAPI) => {
    await (payload.clientId
      ? ClientApi.updateClient
      : ClientApi.createClient)(payload);
    return await thunkAPI.dispatch(getData(meta));
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
  getData,
  addEditItem,
  deleteItem,
};
export default clientsSlice;

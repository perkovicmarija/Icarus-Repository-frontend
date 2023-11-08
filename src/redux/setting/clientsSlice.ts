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
    const response = await ClientApi.getAllClientsPagination(
      viewModel
    );
    return response;
  }
);

const deleteItem = createAsyncThunk(
  "clients/deleteItem",
  async (viewModel: Client) => {
    const response = await ClientApi.deleteClient(viewModel);
    return response.data;
  }
);

const addEditItem = createAsyncThunk(
  "clients/addEditItem",
  async ({ payload, meta }: { payload: Client; meta: any }) => {
    const response = await (payload.clientId
      ? ClientApi.updateClient
      : ClientApi.createClient)({ payload, meta });
    return response.data;
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

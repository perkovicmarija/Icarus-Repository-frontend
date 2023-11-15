import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserRoleApi from "../../api/UserRoleApi";

export const initFilters = {};

export interface Role {
  userRoleId: string;
  name: string;
}

const initialState = {
  data: undefined as Role[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, textSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk(
  "roles/getData",
  async (viewModel: any /*, thunkAPI */) => {
    const response = await UserRoleApi.getAllPagination(viewModel.pagination);
    return response;
  }
);

const deleteItem = createAsyncThunk(
  "roles/deleteItem",
  async ({ payload, meta }: { payload: Role; meta: any }, thunkAPI) => {
    await UserRoleApi.delete(payload);
    return await thunkAPI.dispatch(getData(meta));
  }
);

const addEditItem = createAsyncThunk(
  "roles/addEditItem",
  async ({ payload, meta }: { payload: Role; meta: any }, thunkAPI) => {
    await (payload.userRoleId ? UserRoleApi.update : UserRoleApi.create)(payload);
    return await thunkAPI.dispatch(getData(meta));
  }
);

const rolesSlice = createSlice({
  name: "roles",
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

export const rolesActions = {
  ...rolesSlice.actions,
  getData,
  addEditItem,
  deleteItem,
};
export default rolesSlice;

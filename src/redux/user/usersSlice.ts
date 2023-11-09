import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "../../api/UserApi";

export const initFilters = {
  companies: [],
  departments: [],
  showDeactivated: false,
  subdivisions: [],
  userRoles: [],
};

export interface User {
  userId: string;
  surname: string;
  name: string;
  email: string;
  deactivated: boolean;
}

const initialState = {
  data: undefined as User[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, userSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk(
  "users/getData",
  async (viewModel: any /*, thunkAPI */) => {
    const response = await UserApi.getAllPagination(viewModel);
    console.log(response);
    return response;
  }
);

const deleteItem = createAsyncThunk(
  "users/deleteItem",
  async (viewModel: User) => {
    const response = await UserApi.delete(viewModel);
    return response.data;
  }
);

const addEditItem = createAsyncThunk(
  "users/addEditItem",
  async ({ payload, meta }: { payload: User; meta: any }) => {
    const response = await (payload.userId ? UserApi.update : UserApi.create)({
      payload,
      meta,
    });
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
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

export const usersActions = {
  ...usersSlice.actions,
  getData,
  addEditItem,
  deleteItem,
};
export default usersSlice;

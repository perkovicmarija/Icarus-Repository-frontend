import { createSlice } from "@reduxjs/toolkit";
import UserRoleApi from "../../api/UserRoleApi";
import { createAsyncThunk2 } from "../utils";
import { Meta } from "../../components/core/commonTypes";

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

const getAll = createAsyncThunk2("roles/getAll", async () => {
  const response = await UserRoleApi.getAll();
  return response;
});

const getData = createAsyncThunk2("roles/getData", async (meta: Meta) => {
  const response = await UserRoleApi.getAllPagination(meta.pagination);
  return response;
});

const deleteItem = createAsyncThunk2(
  "roles/deleteItem",
  async ({ payload, meta }: { payload: Role; meta: any }, thunkAPI) => {
    return await UserRoleApi.delete(payload);
    //return await thunkAPI.dispatch(getData(meta));
  }
);

const addEditItem = createAsyncThunk2(
  "roles/addEditItem",
  async ({ payload, meta }: { payload: Role; meta: any }, thunkAPI) => {
    return await (payload.userRoleId ? UserRoleApi.update : UserRoleApi.create)(
      payload
    );
    //return await thunkAPI.dispatch(getData(meta));
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
  getAll,
  getData,
  addEditItem,
  deleteItem,
};
export default rolesSlice;

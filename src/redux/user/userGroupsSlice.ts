import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserGroupApi from "../../api/UserGroupApi";
//
import { User } from "./usersSlice";

export const initFilters = {};

export interface UserGroup {
  userGroupId: string;
  name: string;
  users: User[];
}

const initialState = {
  data: undefined as UserGroup[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, textSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk(
  "userGroups/getData",
  async (viewModel: any /*, thunkAPI */) => {
    const response = await UserGroupApi.getAllPagination(viewModel);
    console.log(response);
    return response;
  }
);

const deleteItem = createAsyncThunk(
  "userGroups/deleteItem",
  async (viewModel: UserGroup) => {
    const response = await UserGroupApi.delete(viewModel);
    return response.data;
  }
);

const addEditItem = createAsyncThunk(
  "userGroups/addEditItem",
  async ({ payload, meta }: { payload: UserGroup; meta: any }) => {
    const response = await (payload.userGroupId
      ? UserGroupApi.update
      : UserGroupApi.create)({
      payload,
      meta,
    });
    return response.data;
  }
);

const userGroupsSlice = createSlice({
  name: "userGroups",
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

export const userGroupsActions = {
  ...userGroupsSlice.actions,
  getData,
  addEditItem,
  deleteItem,
};
export default userGroupsSlice;

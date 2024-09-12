import { createSlice } from "@reduxjs/toolkit";
import { Report } from "./reportApi";

export const initFilters = {
  title: "",
  text: ""
};

const initialState = {
  data: undefined as Report[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters},
};

export type FiltersType = (typeof initialState)["filters"];

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const reportActions = {
  ...reportSlice.actions,
};
export default reportSlice;

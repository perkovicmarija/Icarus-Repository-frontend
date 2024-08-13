import { createSlice } from "@reduxjs/toolkit";
import { ReportHazardIdentification } from "./reportHazardIdentificationApi";

export const initFilters = {
  title: "",
  text: ""
};

const initialState = {
  data: undefined as ReportHazardIdentification[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters},
};

export type FiltersType = (typeof initialState)["filters"];

const reportHazardIdentificationSlice = createSlice({
  name: "reportHazardIdentification",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const reportHazardIdentificationActions = {
  ...reportHazardIdentificationSlice.actions,
};
export default reportHazardIdentificationSlice;

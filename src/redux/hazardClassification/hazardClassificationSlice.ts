import { createSlice } from "@reduxjs/toolkit";
import { HazardClassification } from "./hazardClassificationApi";

export const initFilters = {
  title: "",
  text: ""
};

const initialState = {
  data: undefined as HazardClassification[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters},
};

export type FiltersType = (typeof initialState)["filters"];

const hazardClassificationSlice = createSlice({
  name: "hazardClassification",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const hazardClassificatioActions = {
  ...hazardClassificationSlice.actions,
};
export default hazardClassificationSlice;

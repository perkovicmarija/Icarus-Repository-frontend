import { createSlice } from "@reduxjs/toolkit";
import { Report } from "./reportApi";
import { HazardClassification } from "../hazardClassification/hazardClassificationApi";

export const initFilters = {
  showWithoutHazardClassification: false,
  hazardClassifications: [] as HazardClassification[],
};

const initialState = {
  data: undefined as Report[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, stringSearch: "" },
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

import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import {
  paginationSetRowsPerPage,
  paginationGetRowsPerPage,
} from "../../helpers/pagination";

const defaultState = {
  rowsPerPage: {
    supportLogs: 25,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: null,
  reducers: {
    setPagination(state, action) {
      paginationSetRowsPerPage(action.payload.moduleKey, action.payload.value);
      state.rowsPerPage[action.payload.moduleKey] = action.payload.value;
    },
    initializeSettings(state, action) {
      const initialState = cloneDeep(defaultState);
      initialState.rowsPerPage = {
        ...initialState.rowsPerPage,
        ...paginationGetRowsPerPage(),
      };
      return initialState;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export default settingsSlice;

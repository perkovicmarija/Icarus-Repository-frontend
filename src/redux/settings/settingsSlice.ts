import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import {
  paginationSetRowsPerPage,
  paginationGetRowsPerPage,
} from "../../helpers/pagination";

export const defaultState = {
  rowsPerPage: {
    supportLogs: 25,
    supportRequests: 25,
    clients: 25,
    versions: 25,
    users: 25,
    userGroups: 25,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: null as typeof defaultState | null,
  reducers: {
    setPagination(
      state,
      action: PayloadAction<{
        moduleKey: keyof (typeof defaultState)["rowsPerPage"];
        value: number;
      }>
    ) {
      paginationSetRowsPerPage(action.payload.moduleKey, action.payload.value);
      state!.rowsPerPage[action.payload.moduleKey] = action.payload.value;
    },
    initializeSettings() {
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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import {
  paginationSetRowsPerPage,
  paginationGetRowsPerPage,
} from "../../helpers/pagination";

export const defaultState = {
  rowsPerPage: {
    supportLogs: 25,
    softwareLogSubscriptions: 25,
    supportRequests: 25,
    clients: 25,
    versions: 25,
    users: 25,
    userRoles: 25,
    auditChecklists: 25,
    mobileLogs: 25,
    forumTopics: 25,
    forumUsers: 25,
    forumTopicUsers: 25,
    forumComments: 25,
    forumLikes: 25,
    reportHazardIdentification: 25,
    report: 25,
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

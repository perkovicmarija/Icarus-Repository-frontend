import { createSlice } from "@reduxjs/toolkit";
import SupportCenterApi from "../../api/SupportCenterApi";
import { createAsyncThunk2 } from "../utils";
import { Meta } from "../../components/core/commonTypes";

export const initFilters = {
  title: "",
  description: "",
  status: "",
};

export interface RoadmapType {
  icarusRoadmapLogId: string;
  title: string;
  description: string;
  status: string;
  created: string;
  estimatedTime: string;
  estimatedTimeFormatted: string;
}

const initialState = {
  data: undefined as RoadmapType[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters, textSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk2(
  "roadmap/getData",
  async (meta: Meta /*, thunkAPI */) => {
    const response = await SupportCenterApi.getRoadmapLogsPaginateFilter({
      ...meta.pagination,
      ...meta.filters,
    });
    return response;
  }
);

const deleteItem = createAsyncThunk2(
  "roadmap/deleteItem",
  async ({ payload, meta }: { payload: RoadmapType; meta: any }, thunkAPI) => {
    return await SupportCenterApi.deleteRoadmapLog(payload);
    //return await thunkAPI.dispatch(getData(meta.pagination));
  }
);

const addEditItem = createAsyncThunk2(
  "roadmap/addEditItem",
  async ({ payload, meta }: { payload: RoadmapType; meta: any }, thunkAPI) => {
    return await (payload.icarusRoadmapLogId
      ? SupportCenterApi.updateRoadmapLog
      : SupportCenterApi.createRoadmapLog)(payload);
    //return await thunkAPI.dispatch(getData(meta.pagination));
  }
);

const roadmapSlice = createSlice({
  name: "roadmap",
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

export const roadmapActions = {
  ...roadmapSlice.actions,
  getData,
  addEditItem,
  deleteItem,
};
export default roadmapSlice;

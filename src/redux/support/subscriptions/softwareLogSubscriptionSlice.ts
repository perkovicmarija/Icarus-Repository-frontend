import {createSlice} from "@reduxjs/toolkit";
import SupportCenterApi from "../../../api/SupportCenterApi";
import {createAsyncThunk2} from "../../utils";
import {Meta} from "../../../components/core/commonTypes";
import {Client} from "../../clientsApi";

export const initFilters = {
  email: "",
  selectedClients: [],
};

export interface SoftwareLogSubscription {
  supportSoftwareLogSubscriptionId: string;
  email: string;
  clients: Client[];
}

const initialState = {
  data: undefined as SoftwareLogSubscription[] | undefined,
  meta: {
    totalCount: undefined as number | undefined,
  },
  filters: { ...initFilters },
};

export type FiltersType = (typeof initialState)["filters"];

const getData = createAsyncThunk2("softwareLogSubscription/getData", async (meta: Meta) => {
  const response = await SupportCenterApi.getSoftwareLogSubscriptionsPaginateFilter(
    meta
  );
  return response;
});

const deleteItem = createAsyncThunk2(
  "softwareLogSubscription/deleteItem",
  async ({ payload, meta }: { payload: SoftwareLogSubscription; meta: any }, thunkAPI) => {
    return await SupportCenterApi.deleteSoftwareLogSubscription(payload);
    //return await thunkAPI.dispatch(getData(meta));
  }
);

const addEditItem = createAsyncThunk2(
  "softwareLogSubscription/addEditItem",
  async ({ payload, meta }: { payload: SoftwareLogSubscription; meta: any }, thunkAPI) => {
    return await (payload.supportSoftwareLogSubscriptionId
      ? SupportCenterApi.updateSoftwareLogSubscription
      : SupportCenterApi.createSoftwareLogSubscription)(payload);
    //return await thunkAPI.dispatch(getData(meta));
  }
);

const softwareLogSubscriptionSlice = createSlice({
  name: "softwareLogSubscription",
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

export const softwareLogSubscriptionActions = {
  ...softwareLogSubscriptionSlice.actions,
  getData,
  addEditItem,
  deleteItem,
};
export default softwareLogSubscriptionSlice;

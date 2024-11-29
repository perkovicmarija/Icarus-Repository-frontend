import {MobileLog} from "./loggerApi";
import {createSlice} from "@reduxjs/toolkit";


export const initFilters = {
    startDate: null,
    endDate: null
};

const initialState = {
    data: undefined as MobileLog[] | undefined,
    meta: {
        totalCount: undefined as number | undefined,
    },
    filters: { ...initFilters, stringSearch: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const loggerSlice = createSlice({
    name: "mobileLogs",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        },
    },
});

export const loggerActions = {
    ...loggerSlice.actions,
};
export default loggerSlice;

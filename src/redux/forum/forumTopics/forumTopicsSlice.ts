import {ForumTopic, forumTopicsApi} from "./forumTopicsApi";
import {createSlice} from "@reduxjs/toolkit";

export const initFilters = {};

const initialState = {
    data: undefined as ForumTopic[] | undefined,
    meta: {
        totalCount: undefined as number | undefined,
    },
    filters: { ...initFilters, title: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const forumTopicsSlice = createSlice({
    name: "forumTopics",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        },
    }
});

export const forumTopicsActions = {
    ...forumTopicsSlice.actions,
};
export default forumTopicsSlice;

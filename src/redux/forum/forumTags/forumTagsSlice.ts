import {ForumTag, forumTagsApi} from "./forumTagsApi";
import {createSlice} from "@reduxjs/toolkit";

export const initFilters = {};

const initialState = {
    data: undefined as ForumTag[] | undefined,
    meta: {
        totalCount: undefined as number | undefined,
    },
    filters: { ...initFilters },
};

export type FiltersType = (typeof initialState)["filters"];

const forumTagsSlice = createSlice({
    name: "forumTags",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        },
    }
});

export const forumTagsActions = {
    ...forumTagsSlice.actions,
};
export default forumTagsSlice;

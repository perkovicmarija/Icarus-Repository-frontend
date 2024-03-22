import {ForumComment} from "./forumCommentsApi";
import {createSlice} from "@reduxjs/toolkit";

export const initFilters = {
    dateFrom: null,
    dateTo: null,
    forumUser: null,
    content: "",
};

const initialState = {
    data: undefined as ForumComment[] | undefined,
    meta: {
        totalCount: undefined as number | undefined,
    },
    filters: { ...initFilters, content: "" },
};

export type FiltersType = (typeof initialState)["filters"];

const forumCommentsSlice = createSlice({
    name: "forumComments",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        }
    }
});

export const forumCommentsActions = {
    ...forumCommentsSlice.actions,
};
export default forumCommentsSlice;

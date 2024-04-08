import {ForumLike} from "./forumLikesApi";
import {createSlice} from "@reduxjs/toolkit";

export const initFilters = {
    forumUserCreatedDisplayName: "",
    client: null,
    dateFrom: null,
    dateTo: null
};

const initialState = {
    data: undefined as ForumLike[] | undefined,
    meta: {
        totalCount: undefined as number | undefined,
    },
    filters: { ...initFilters },
};

export type FiltersType = (typeof initialState)["filters"];

const forumLikesSlice = createSlice({
    name: "forumLikes",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        },
    }
});

export const forumLikesActions = {
    ...forumLikesSlice.actions,
};
export default forumLikesSlice;

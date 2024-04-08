import {createSlice} from "@reduxjs/toolkit";
import {ForumTopicUserJoined} from "./forumTopicUsersApi";

export const initFilters = {
    displayName: "",
    email: ""
};

const initialState = {
    data: undefined as ForumTopicUserJoined[] | undefined,
    meta: {
        totalCount: undefined as number | undefined,
    },
    filters: { ...initFilters },
};

export type FiltersType = (typeof initialState)["filters"];

const forumTopicUsersSlice = createSlice({
    name: "forumTopicUsers",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        },
    }
});

export const forumTopicUsersActions = {
    ...forumTopicUsersSlice.actions,
};
export default forumTopicUsersSlice;

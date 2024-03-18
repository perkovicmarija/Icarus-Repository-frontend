import {ForumUser} from "./forumUsersApi";
import {createSlice} from "@reduxjs/toolkit";

export const initFilters = {
    displayName: "",
    email: ""
};

const initialState = {
    data: undefined as ForumUser[] | undefined,
    meta: {
        totalCount: undefined as number | undefined,
    },
    filters: { ...initFilters },
};

export type FiltersType = (typeof initialState)["filters"];

const forumUsersSlice = createSlice({
    name: "forumUsers",
    initialState,
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        },
    }
});

export const forumUsersActions = {
    ...forumUsersSlice.actions,
};
export default forumUsersSlice;

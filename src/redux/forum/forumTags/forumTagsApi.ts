import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getServerPath} from "../../../consts/ServerInfo";
import {getToken} from "../../../helpers/utility";
import {ResponseWrapper} from "../../../components/core/commonTypes";

export interface ForumTag {
    forumTagId: string;
    name: string;
    deactivated: boolean;
}

export const forumTagsApi = createApi({
    reducerPath: "forumTagsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getServerPath() + "/forum-tag/",
        headers: { Authorization: `Basic ${getToken()}` },
    }),
    tagTypes: ["ForumTags"],
    endpoints: (builder) => ({
        getForumTags: builder.query<ResponseWrapper<ForumTag[]>, void>({
            query: () => `?access_token=${getToken()}`,
            providesTags: ["ForumTags"]
        }),
        createUpdateForumTag: builder.mutation<void, ForumTag>({
            query: (body) => ({
                url: `?access_token=${getToken()}`,
                method: body.forumTagId ? "PUT" : "POST",
                body,
            }),
            invalidatesTags: ["ForumTags"],
        }),
    }),
})

export const {
    useGetForumTagsQuery,
    useCreateUpdateForumTagMutation,
} = forumTagsApi;

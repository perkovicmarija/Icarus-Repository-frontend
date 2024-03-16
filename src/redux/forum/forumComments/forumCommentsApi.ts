import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getServerPath} from "../../../consts/ServerInfo";
import {getToken} from "../../../helpers/utility";
import {ResponseWrapper} from "../../../components/core/commonTypes";
import {UserSimple} from "../../user/usersApi";
import {ForumComment} from "../forumComments/forumCommentsApi";

export interface ForumComment {
    forumCommentId: string;
    forumTopicId: string;
    userCreated: UserSimple;
    content: string;
    created: Date | null;
    createdFormatted: string;
}

export const forumCommentsApi = createApi({
    reducerPath: "forumCommentsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getServerPath() + "/forum-comment/",
        headers: { Authorization: `Basic ${getToken()}` },
    }),
    tagTypes: ["ForumComment"],
    endpoints: (builder) => ({
        getForumComment: builder.query<ResponseWrapper<ForumComment>, void>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "GET",
            }),
            providesTags: ["ForumComment"],
        }),
        getAllForumComments: builder.query<ResponseWrapper<ForumComment[]>, void>({
            query: () => `?access_token=${getToken()}`,
            providesTags: ["ForumComment"],
        }),
        getForumCommentsForTopic: builder.query<ResponseWrapper<ForumComment[]>, void>({
            query: (id) => ({
                url: `topic/${id}` + `?access_token=${getToken()}`,
                method: "GET",
            }),
            providesTags: ["ForumComment"],
        }),
        createUpdateForumComment: builder.mutation<void, ForumComment>({
            query: (body) => ({
                url: `?access_token=${getToken()}`,
                method: body.forumCommentId ? "PUT" : "POST",
                body,
            }),
            invalidatesTags: ["ForumComment"],
        }),
        deleteForumComment: builder.mutation<void, string>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ForumComment"],
        }),
    }),
})

export const {
    useGetForumCommentQuery,
    useGetAllForumCommentsQuery,
    useGetForumCommentsForTopicQuery,
    useCreateUpdateForumCommentMutation,
    useDeleteForumCommentMutation,
} = forumCommentsApi;

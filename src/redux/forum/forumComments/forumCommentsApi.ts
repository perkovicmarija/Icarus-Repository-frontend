import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getServerPath} from "../../../consts/ServerInfo";
import {getToken} from "../../../helpers/utility";
import {Meta, ResponseWrapper} from "../../../components/core/commonTypes";
import {ForumComment} from "../forumComments/forumCommentsApi";
import {ForumUser} from "../forumUsers/forumUsersApi";

export interface ForumComment {
    forumCommentId: string;
    forumTopicId: string;
    forumUserCreated: ForumUser;
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
        getForumCommentsPaginated: builder.query<ResponseWrapper<ForumComment[]>, Meta>({
            query: (body) => ({
                url: `paginate?access_token=${getToken()}`,
                method: "POST",
                body: body,
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
    useGetForumCommentsPaginatedQuery,
    useCreateUpdateForumCommentMutation,
    useDeleteForumCommentMutation,
} = forumCommentsApi;

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getServerPath} from "../../../consts/ServerInfo";
import {getToken} from "../../../helpers/utility";
import {ForumComment} from "../forumComments/forumCommentsApi";

export interface ForumLike {
    forumLikeId: string;
    forumTopicId: string;
    forumCommentId: string;
    forumUserCreatedId: string;
    forumUserCreatedDisplayName: string;
    created: Date | null;
    createdFormatted: string;
}

export const forumLikesApi = createApi({
    reducerPath: "forumLikesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getServerPath() + "/forum/like/",
        headers: { Authorization: `Basic ${getToken()}` },
    }),
    tagTypes: ["ForumLike", "ForumComment"],
    endpoints: (builder) => ({
        createForumLike: builder.mutation<void, ForumComment>({
            query: (body) => ({
                url: `?access_token=${getToken()}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["ForumLike", "ForumComment"]
        }),
        deleteForumLike: builder.mutation<void, string>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ForumLike", "ForumComment"]
        }),
    }),
})

export const {
    useCreateForumLikeMutation,
    useDeleteForumLikeMutation,
} = forumLikesApi;

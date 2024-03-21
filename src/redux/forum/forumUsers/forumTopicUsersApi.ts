import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getServerPath} from "../../../consts/ServerInfo";
import {getToken} from "../../../helpers/utility";
import {Meta, ResponseWrapper} from "../../../components/core/commonTypes";
import {ForumUser} from "./forumUsersApi";

export interface ForumTopicUserJoined {
    forumTopicUserJoinedId: string;
    forumUserCreated: ForumUser;
    forumTopicId: string;
    created: Date | null;
    createdFormatted: string;
}

export const forumTopicUsersApi = createApi({
    reducerPath: "forumTopicUsersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getServerPath() + "/forum-topic/subscribers/",
        headers: { Authorization: `Basic ${getToken()}` },
    }),
    tagTypes: ["ForumTopicUserJoined"],
    endpoints: (builder) => ({
        getForumTopicUsersPaginated: builder.query<ResponseWrapper<ForumTopicUserJoined[]>, Meta>({
            query: (body) => ({
                url: `paginate` + `?access_token=${getToken()}`,
                method: "POST",
                body,
            }),
            providesTags: ["ForumTopicUserJoined"],
        }),
        createForumTopicUser: builder.mutation<void, { forumUserId: string, forumTopicId: string; }>({
            query: ({ forumUserId, forumTopicId }) => ({
                url: `${forumTopicId}` + `?access_token=${getToken()}`,
                method: "POST",
                body: {forumUserId},
            }),
            invalidatesTags: ["ForumTopicUserJoined"],
        }),
        deleteForumTopicUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ForumTopicUserJoined"],
        }),
    }),
})

export const {
    useGetForumTopicUsersPaginatedQuery,
    useCreateForumTopicUserMutation,
    useDeleteForumTopicUserMutation,
} = forumTopicUsersApi;

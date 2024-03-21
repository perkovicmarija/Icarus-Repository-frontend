import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getServerPath} from "../../../consts/ServerInfo";
import {getToken} from "../../../helpers/utility";
import {Meta, ResponseWrapper} from "../../../components/core/commonTypes";
import {ForumTag} from "../forumTags/forumTagsApi";
import {ForumComment} from "../forumComments/forumCommentsApi";
import {ForumTopicUserJoined} from "../forumUsers/forumTopicUsersApi";
import {ForumUser} from "../forumUsers/forumUsersApi";

export interface ForumTopic {
    forumTopicId: string;
    content: string;
    created: Date | null;
    createdFormatted: string;
    title: string;
    forumUserCreated: ForumUser;
    forumTopicTagJoineds: ForumTopicTagJoined[];
    forumTopicUserJoineds: ForumTopicUserJoined[];
    forumComments: ForumComment[];
    forumTopicAttachments: ForumTopicAttachment[];
}

export interface ForumTopicTagJoined {
    forumTopicTagId: string;
    forumTopicId: string;
    forumTag: ForumTag;
}

export interface ForumTopicAttachment {
    forumTopicAttachmentId: string;
    filename: string;
    description: string;
    dateCreated: string;
    forumUserCreated: ForumUser;
    forumTopicId: string;
}

export const forumTopicsApi = createApi({
    reducerPath: "forumTopicsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getServerPath() + "/forum-topic/",
        headers: { Authorization: `Basic ${getToken()}` },
    }),
    tagTypes: ["ForumTopic"],
    endpoints: (builder) => ({
        getForumTopic: builder.query<ResponseWrapper<ForumTopic>, void>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "GET",
            }),
            providesTags: ["ForumTopic"],
        }),
        getForumTopics: builder.query<ResponseWrapper<ForumTopic[]>, void>({
            query: () => `?access_token=${getToken()}`,
            providesTags: ["ForumTopic"],
        }),
        getForumTopicsPaginated: builder.query<ResponseWrapper<ForumTopic[]>, Meta>({
            query: (body) => ({
                url: `paginate` + `?access_token=${getToken()}`,
                method: "POST",
                body,
            }),
            providesTags: ["ForumTopic"],
        }),
        createUpdateForumTopic: builder.mutation<void, ForumTopic>({
            query: (body) => ({
                url: `?access_token=${getToken()}`,
                method: body.forumTopicId ? "PUT" : "POST",
                body,
            }),
            invalidatesTags: ["ForumTopic"],
        }),
        deleteForumTopic: builder.mutation<void, string>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ForumTopic"],
        }),
    }),
})

export const {
    useGetForumTopicQuery,
    useGetForumTopicsQuery,
    useGetForumTopicsPaginatedQuery,
    useCreateUpdateForumTopicMutation,
    useDeleteForumTopicMutation,
} = forumTopicsApi;

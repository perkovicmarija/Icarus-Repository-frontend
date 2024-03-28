import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getServerPath} from "../../../consts/ServerInfo";
import {getToken} from "../../../helpers/utility";
import {Meta, ResponseWrapper} from "../../../components/core/commonTypes";
import {Client} from "../../settings/clientsApi";
import {User} from "../../user/usersApi";

export interface ForumUser {
    forumUserId: string;
    displayName: string;
    client: Client;
    email: string;
    name: string;
    surname: string;
    fullName: string;
    deactivated: boolean;
    createdFormatted: string;
    updatedFormatted: string;
    userCreated: User;
}

export const forumUsersApi = createApi({
    reducerPath: "forumUsersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getServerPath() + "/forum/forum-user/",
        headers: { Authorization: `Basic ${getToken()}` },
    }),
    tagTypes: ["ForumUser"],
    endpoints: (builder) => ({
        getForumUser: builder.query<ResponseWrapper<ForumUser>, void>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "GET",
            }),
            providesTags: ["ForumUser"],
        }),
        getForumUserByDisplayName: builder.query<ResponseWrapper<ForumUser>, void>({
            query: (displayName) => ({
                url: 'display-name/' + `${displayName}` + `?access_token=${getToken()}`,
                method: "GET",
            }),
            providesTags: ["ForumUser"],
        }),
        getForumUsers: builder.query<ResponseWrapper<ForumUser[]>, void>({
            query: () => `?access_token=${getToken()}`,
            providesTags: ["ForumUser"],
        }),
        getForumUsersPaginated: builder.query<ResponseWrapper<ForumUser[]>, Meta>({
            query: (body) => ({
                url: `paginate` + `?access_token=${getToken()}`,
                method: "POST",
                body,
            }),
            providesTags: ["ForumUser"],
        }),
        createUpdateForumUser: builder.mutation<void, ForumUser>({
            query: (body) => ({
                url: `?access_token=${getToken()}`,
                method: body.forumUserId ? "PUT" : "POST",
                body,
            }),
            invalidatesTags: ["ForumUser"],
        }),
        deleteForumUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ForumUser"],
        }),
    }),
})

export const {
    useGetForumUserQuery,
    useGetForumUserByDisplayNameQuery,
    useGetForumUsersQuery,
    useGetForumUsersPaginatedQuery,
    useCreateUpdateForumUserMutation,
    useDeleteForumUserMutation,
} = forumUsersApi;

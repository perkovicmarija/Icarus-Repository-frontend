import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerPath } from "../../consts/ServerInfo";
import { getToken } from "../../helpers/utility";
import { Meta, ResponseWrapper } from "../../components/core/commonTypes";

export interface User {
  userId: string;
  surname: string;
  name: string;
  email: string;
  deactivated: boolean;
  fullName: string;
}

export interface UserSimple {
  userId: string;
  name: string;
  surname: string;
  fullName: string;
  fullNameReverse: string;
  email: string;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getServerPath() + "/user/",
    headers: { Authorization: `Basic ${getToken()}` },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUser: builder.query<ResponseWrapper<User>, void>({
      query: (id) => ({
        url: `${id}` + `?access_token=${getToken()}`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getUsersPaginated: builder.query<ResponseWrapper<User[]>, Meta>({
      query: (body) => ({
        url: `getAllPagination` + `?access_token=${getToken()}`,
        method: "POST",
        body,
      }),
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `delete/${id}` + `?access_token=${getToken()}`,
        method: "GET",
      }),
      invalidatesTags: ["Users"],
    }),
    addEditUser: builder.mutation<
      void,
      {
        newPassword: boolean;
        generatePassword: boolean;
        user: User;
      }
    >({
      query: ({ newPassword, generatePassword, user }) => ({
        url:
          (user.userId ? "update" : "create") + `?access_token=${getToken()}`,
        method: "POST",
        body: {
          newPassword,
          generatePassword,
          user: user,
        },
      }),
      invalidatesTags: ["Users"],
    }),
    /* deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}` + `?access_token=${getToken()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    addEditUser: builder.mutation<void, User>({
      query: (body) => ({
        url: `?access_token=${getToken()}`,
        method: body.userId ? "PUT" : "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }), */
  }),
});

export const {
  useGetUserQuery,
  useGetUsersPaginatedQuery,
  useDeleteUserMutation,
  useAddEditUserMutation,
} = usersApi;

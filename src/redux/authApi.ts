import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerPath } from "../consts/ServerInfo";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getServerPath() + "/oauth/",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<any, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: `token`,
        method: "POST",
        headers: {
          "Authorization": "Basic bXlhcHA6c2VjcmV0",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "username=" +
          username +
          "&password=" +
          password +
          "&grant_type=password",
      }),
    }),
    /* getClientsPaginated: builder.query<ResponseWrapper<Client[]>, Meta>({
      query: (body) => ({
        url: `getAllClientsPagination` + `?access_token=${getToken()}`,
        method: "POST",
        body,
      }),
      providesTags: ["Auth"],
    }),
    deleteClient: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}` + `?access_token=${getToken()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Auth"],
    }),
    addEditClient: builder.mutation<void, Client>({
      query: (body) => ({
        url: `?access_token=${getToken()}`,
        method: body.clientId ? "PUT" : "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }), */
  }),
});

export const { useLoginMutation } = authApi;

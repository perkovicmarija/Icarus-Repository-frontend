import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerPath } from "../../consts/ServerInfo";
import { getToken } from "../../helpers/utility";
import { Meta, ResponseWrapper } from "../../components/core/commonTypes";

export interface Client {
  clientId: string;
  name: string;
  abbreviation: string;
  deactivated: boolean;
}

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getServerPath() + "/client/",
    headers: { Authorization: `Basic ${getToken()}` },
  }),
  tagTypes: ["Clients"],
  endpoints: (builder) => ({
    getClients: builder.query<ResponseWrapper<Client[]>, void>({
      query: () => `getAllClients` + `?access_token=${getToken()}`,
      providesTags: ["Clients"],
    }),
    getClientsPaginated: builder.query<ResponseWrapper<Client[]>, Meta>({
      query: (body) => ({
        url: `getAllClientsPagination` + `?access_token=${getToken()}`,
        method: "POST",
        body,
      }),
      providesTags: ["Clients"],
    }),
    deleteClient: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}` + `?access_token=${getToken()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
    addEditClient: builder.mutation<void, Client>({
      query: (body) => ({
        url: `?access_token=${getToken()}`,
        method: body.clientId ? "PUT" : "POST",
        body,
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientsPaginatedQuery,
  useDeleteClientMutation,
  useAddEditClientMutation,
} = clientsApi;

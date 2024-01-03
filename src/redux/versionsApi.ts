import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerPath } from "../consts/ServerInfo";
import { getToken } from "../helpers/utility";
import { Meta, ResponseWrapper } from "../components/core/commonTypes";
import { Client } from "./clientsApi";

export interface Version {
  versionMobileId: string;
  versionMin: string;
  platform: "";
  client: Client;
}

export type VersionForAddEdit = Omit<Version, "client"> & {
  selectedClients: Client[];
};

export const versionsApi = createApi({
  reducerPath: "versionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getServerPath() + "/version-mobile/",
    headers: { Authorization: `Basic ${getToken()}` },
  }),
  tagTypes: ["Versions"],
  endpoints: (builder) => ({
    getVersionsPaginated: builder.query<ResponseWrapper<Version[]>, Meta>({
      query: (body) => ({
        url: `paginate` + `?access_token=${getToken()}`,
        method: "POST",
        body,
      }),
      providesTags: ["Versions"],
    }),
    deleteVersion: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}` + `?access_token=${getToken()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Versions"],
    }),
    addEditVersion: builder.mutation<void, VersionForAddEdit>({
      query: (body) => ({
        url: `?access_token=${getToken()}`,
        method: body.versionMobileId ? "PUT" : "POST",
        body,
      }),
      invalidatesTags: ["Versions"],
    }),
  }),
});

export const {
  useGetVersionsPaginatedQuery,
  useDeleteVersionMutation,
  useAddEditVersionMutation,
} = versionsApi;

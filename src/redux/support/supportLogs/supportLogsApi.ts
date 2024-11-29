import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerPath } from "../../../consts/ServerInfo";
import { getToken } from "../../../helpers/utility";
import { Meta, ResponseWrapper } from "../../../components/core/commonTypes";
import { Client } from "../../settings/clientsApi";

export interface SupportLog {
  supportSoftwareLogId: string;
  title: string;
  description: string;
  clients: Client[];
  dateFormatted: string;
}

export const supportLogsApi = createApi({
  reducerPath: "supportLogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getServerPath() + "/support/software-log-clients-joined",
    headers: { Authorization: `Basic ${getToken()}` },
  }),
  tagTypes: ["SupportLogs"],
  endpoints: (builder) => ({
    getSupportLogsPaginated: builder.query<ResponseWrapper<SupportLog[]>, Meta>(
      {
        query: (body) => ({
          url: `paginate` + `?access_token=${getToken()}`,
          method: "POST",
          body,
        }),
        providesTags: ["SupportLogs"],
      }
    ),
    deleteSupportLog: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}` + `?access_token=${getToken()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SupportLogs"],
    }),
    addEditSupportLog: builder.mutation<void, SupportLog>({
      query: (body) => ({
        url: `?access_token=${getToken()}`,
        method: body.supportSoftwareLogId ? "PUT" : "POST",
        body,
      }),
      invalidatesTags: ["SupportLogs"],
    }),
  }),
});

export const {
  useGetSupportLogsPaginatedQuery,
  useDeleteSupportLogMutation,
  useAddEditSupportLogMutation,
} = supportLogsApi;

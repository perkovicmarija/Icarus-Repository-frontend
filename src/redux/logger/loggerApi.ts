import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getServerPath} from "../../consts/ServerInfo";
import {getToken} from "../../helpers/utility";
import {Meta, ResponseWrapper} from "../../components/core/commonTypes";

export interface MobileLog {
  loggerMobileAppId: string;
  sessionId?: string;
  source: string;
  appVersion: string;
  osVersion: string;
  message: string;
  logLevel?: string;
  dateCreatedFormatted: string;
  dateLogFormatted: string;
  client: string;
  userCreatedId?: string;
}

export const loggerApi = createApi({
  reducerPath: "loggerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getServerPath() + "/logger/",
    headers: { Authorization: `Basic ${getToken()}` },
  }),
  tagTypes: ["Logger"],
  endpoints: (builder) => ({
    getAllMobileLogs: builder.query<ResponseWrapper<MobileLog[]>, void>({
      query: () => `mobile/?access_token=${getToken()}`,
      providesTags: ["Logger"],
    }),
    getMobileLogsPaginated: builder.query<ResponseWrapper<MobileLog[]>, Meta>({
      query: (body) => ({
        url: `mobile/paginate` + `?access_token=${getToken()}`,
        method: "POST",
        body,
      }),
      providesTags: ["Logger"],
    }),
    deleteMobileLog: builder.mutation<void, string>({
      query: (id) => ({
        url: `mobile/${id}` + `?access_token=${getToken()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Logger"],
    }),
    addEditMobileLog: builder.mutation<void, MobileLog>({
      query: (body) => ({
        url: `mobile/?access_token=${getToken()}`,
        method: body.loggerMobileAppId ? "PUT" : "POST",
        body,
      }),
      invalidatesTags: ["Logger"],
    }),
  }),
});

export const {
  useGetAllMobileLogsQuery,
  useGetMobileLogsPaginatedQuery,
  useDeleteMobileLogMutation,
  useAddEditMobileLogMutation,
} = loggerApi;

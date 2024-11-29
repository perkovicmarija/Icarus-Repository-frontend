import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerPath } from "../../../consts/ServerInfo";
import { getToken } from "../../../helpers/utility";
import { Meta, ResponseWrapper } from "../../../components/core/commonTypes";
import {Client} from "../../settings/clientsApi";

export interface SoftwareLogSubscription {
  supportSoftwareLogSubscriptionId: string;
  email: string;
  client: Client;
}

export const softwareLogSubscriptionApi = createApi({
  reducerPath: "softwareLogSubscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getServerPath() + "/support/software-log-subscription",
    headers: { Authorization: `Basic ${getToken()}` },
  }),
  tagTypes: ["SoftwareLogSubscription"],
  endpoints: (builder) => ({
    getSoftwareLogSubscriptionsPaginated: builder.query<ResponseWrapper<SoftwareLogSubscription[]>, Meta>(
      {
        query: (body) => ({
          url: `paginate` + `?access_token=${getToken()}`,
          method: "POST",
          body,
        }),
        providesTags: ["SoftwareLogSubscription"],
      }
    ),
    deleteSoftwareLogSubscription: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}` + `?access_token=${getToken()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SoftwareLogSubscription"],
    }),
    addEditSoftwareLogSubscription: builder.mutation<void, SoftwareLogSubscription>({
      query: (body) => ({
        url: `?access_token=${getToken()}`,
        method: body.supportSoftwareLogSubscriptionId ? "PUT" : "POST",
        body,
      }),
      invalidatesTags: ["SoftwareLogSubscription"],
    }),
  }),
});

export const {
  useGetSoftwareLogSubscriptionsPaginatedQuery,
  useDeleteSoftwareLogSubscriptionMutation,
  useAddEditSoftwareLogSubscriptionMutation,
} = softwareLogSubscriptionApi;

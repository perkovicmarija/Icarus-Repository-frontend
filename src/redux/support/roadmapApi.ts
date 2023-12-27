import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerPath } from "../../consts/ServerInfo";
import { getToken } from "../../helpers/utility";
import { Meta, ResponseWrapper } from "../../components/core/commonTypes";

export interface RoadmapType {
  icarusRoadmapLogId: string;
  title: string;
  description: string;
  status: string;
  created: string;
  estimatedTime: string;
  estimatedTimeFormatted: string;
}

export const roadmapApi = createApi({
  reducerPath: "roadmapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getServerPath() + "/support/roadmap-log",
    headers: { Authorization: `Basic ${getToken()}` },
  }),
  tagTypes: ["Roadmap"],
  endpoints: (builder) => ({
    getRoadmapPaginated: builder.query<ResponseWrapper<RoadmapType[]>, Meta>({
      query: (body) => ({
        url: `paginate` + `?access_token=${getToken()}`,
        method: "POST",
        body,
      }),
      providesTags: ["Roadmap"],
    }),
    deleteRoadmap: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}` + `?access_token=${getToken()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roadmap"],
    }),
    addEditRoadmap: builder.mutation<void, RoadmapType>({
      query: (body) => ({
        url: `?access_token=${getToken()}`,
        method: body.icarusRoadmapLogId ? "PUT" : "POST",
        body,
      }),
      invalidatesTags: ["Roadmap"],
    }),
  }),
});

export const {
  useGetRoadmapPaginatedQuery,
  useDeleteRoadmapMutation,
  useAddEditRoadmapMutation,
} = roadmapApi;

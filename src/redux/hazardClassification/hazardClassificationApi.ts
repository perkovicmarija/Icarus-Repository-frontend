import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ResponseWrapper, Meta } from "../../components/core/commonTypes";
import { getServerPath } from "../../consts/ServerInfo";
import { getToken } from "../../helpers/utility";

export interface HazardClassification {
    hazardClassificationId: string;
    name: string;
    taxonomyId: string;
    explanation: string;
    path: string;
    parentId: string;
    level: number;
    hasChild: boolean;
}

export interface HazardClassificationSearchViewModel {
    searchText: string;
}

export const hazardClassificationApi = createApi({
    reducerPath: "hazardClassificationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getServerPath() + "/hazard-classification/",
        headers: { Authorization: `Basic ${getToken()}` },
    }),
    tagTypes: ["HazardClassification"],
    endpoints: (builder) => ({
        /* getHazardClassification: builder.query<ResponseWrapper<HazardClassification>, void>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "GET",
            }),
            providesTags: ["HazardClassification"],
        }), */
        getHazardClassifications: builder.query<ResponseWrapper<HazardClassification[]>, void>({
            query: () => `?access_token=${getToken()}`,
            providesTags: ["HazardClassification"],
        }),
        getHazardClassificationsFiltered: builder.query<ResponseWrapper<HazardClassification[]>, HazardClassificationSearchViewModel>({
            query: (body) => ({
                url: `filtered` + `?access_token=${getToken()}`,
                method: "POST",
                body,
            }),
            providesTags: ["HazardClassification"],
        }),
        createUpdateHazardClassification: builder.mutation<void, HazardClassification>({
            query: (body) => ({
                url: `?access_token=${getToken()}`,
                method: body.hazardClassificationId ? "PUT" : "POST",
                body,
            }),
            invalidatesTags: ["HazardClassification"],
        }),
        deleteHazardClassification: builder.mutation<void, string>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "DELETE",
            }),
            invalidatesTags: ["HazardClassification"],
        }),
    }),
})

export const {
    useGetHazardClassificationsFilteredQuery,
    useGetHazardClassificationsQuery,
    useCreateUpdateHazardClassificationMutation,
    useDeleteHazardClassificationMutation
} = hazardClassificationApi;

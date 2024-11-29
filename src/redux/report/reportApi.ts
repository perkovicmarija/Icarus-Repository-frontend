import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ResponseWrapper, Meta } from "../../components/core/commonTypes";
import { getServerPath } from "../../consts/ServerInfo";
import { getToken } from "../../helpers/utility";
import { ReportHazardIdentification } from "../reportHazardIdentification/reportHazardIdentificationApi";

export interface Report {
    reportId: string;
    title: string;
    eventDescription: string;
    createdFormatted: string;
    airportDeparture: string;
    airportDestination: string;
    flightPhase: string;
    aircraft: string;
    flightNumber: string;
    reportHazardIdentification: ReportHazardIdentification;
}

export const reportApi = createApi({
    reducerPath: "reportApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getServerPath() + "/reports/",
        headers: { Authorization: `Basic ${getToken()}` },
    }),
    tagTypes: ["Report"],
    endpoints: (builder) => ({
        getReport: builder.query<ResponseWrapper<Report>, void>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "GET",
            }),
            providesTags: ["Report"],
        }),
        getReports: builder.query<ResponseWrapper<Report[]>, void>({
            query: () => `/getAllLatest?access_token=${getToken()}`,
            providesTags: ["Report"],
        }),
        getReportsPaginated: builder.query<ResponseWrapper<Report[]>, Meta>({
            query: (body) => ({
                url: `paginate` + `?access_token=${getToken()}`,
                method: "POST",
                body,
            }),
            providesTags: ["Report"],
        }),
        createUpdateReport: builder.mutation<void, Report>({
            query: (body) => ({
                url: `?access_token=${getToken()}`,
                method: body.reportId ? "PUT" : "POST",
                body,
            }),
            invalidatesTags: ["Report"],
        }),
        deleteReport: builder.mutation<void, string>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Report"],
        }),
    }),
})

export const {
    useGetReportQuery,
    useCreateUpdateReportMutation,
    useDeleteReportMutation,
    useGetReportsQuery,
    useGetReportsPaginatedQuery,
} = reportApi;

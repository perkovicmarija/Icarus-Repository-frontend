import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { User } from "../user/usersApi";
import { ResponseWrapper, Meta } from "../../components/core/commonTypes";
import { getServerPath } from "../../consts/ServerInfo";
import { getToken } from "../../helpers/utility";
import { HazardClassification } from "../hazardClassification/hazardClassificationApi";

export interface ReportHazardIdentification {
    reportHazardIdentificationId: string;
    title: string;
    text: string;
    cleanedText: string;
    result: string;
    tokens: Token[];
    entities: Entity[];
    severityTokens: ContributingToken[];
    probabilityTokens: ContributingToken[];
    createdFormatted: string;
    updatedFormatted: string;
    userCreated: User;
    riskLevel: string;
    severity: string;
    probability: string;
    sentimentAnalysis: SentimentAnalysis;
    spellCheckSuggestions: SpellCheckSuggestion[];
    hazardClassification: HazardClassification;
}

export interface UpdateReportHazardIdentificationToken extends ReportHazardIdentification {
    tokenId: string;
    spellCheckSuggestionId: string;
}

export interface Token {
    id: string;
    position: string;
    lemma: string;
    text: string;
}

export interface Entity {
    id: string;
    label: string;
    text: string;
}

export interface SpellCheckSuggestion {
    id: string;
    error: string;
    suggestion: string;
}

export interface ContributingToken {
    id: string;
    token: string;
    level: string;
}

export interface SentimentAnalysis {
    polarity: string;
    subjectivity: string;
    sentimentAnalysisId: string;
    sentimentAssessments: SentimentAssessment[];
}

export interface SentimentAssessment {
    polarity: string;
    subjectivity: string;
    words: string[];
    sentimentAssessmentId: string;
}

export const reportHazardIdentificationApi = createApi({
    reducerPath: "reportHazardIdentificationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getServerPath() + "/reportHazardIdentification/",
        headers: { Authorization: `Basic ${getToken()}` },
    }),
    tagTypes: ["ReportHazardIdentification"],
    endpoints: (builder) => ({
        getReportHazardIdentification: builder.query<ResponseWrapper<ReportHazardIdentification>, void>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "GET",
            }),
            providesTags: ["ReportHazardIdentification"],
        }),
        getReportHazardIdentifications: builder.query<ResponseWrapper<ReportHazardIdentification[]>, void>({
            query: () => `?access_token=${getToken()}`,
            providesTags: ["ReportHazardIdentification"],
        }),
        getReportHazardIdentificationsPaginated: builder.query<ResponseWrapper<ReportHazardIdentification[]>, Meta>({
            query: (body) => ({
                url: `paginate` + `?access_token=${getToken()}`,
                method: "POST",
                body,
            }),
            providesTags: ["ReportHazardIdentification"],
        }),
        createUpdateReportHazardIdentification: builder.mutation<void, ReportHazardIdentification>({
            query: (body) => ({
                url: `?access_token=${getToken()}`,
                method: body.reportHazardIdentificationId ? "PUT" : "POST",
                body,
            }),
            invalidatesTags: ["ReportHazardIdentification"],
        }),
        updateReportHazardIdentificationToken: builder.mutation<void, UpdateReportHazardIdentificationToken>({
            query: (body) => ({
                url: `updateToken/?access_token=${getToken()}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["ReportHazardIdentification"],
        }),
        deleteReportHazardIdentification: builder.mutation<void, string>({
            query: (id) => ({
                url: `${id}` + `?access_token=${getToken()}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ReportHazardIdentification"],
        }),
    }),
})

export const {
    useGetReportHazardIdentificationQuery,
    useCreateUpdateReportHazardIdentificationMutation,
    useDeleteReportHazardIdentificationMutation,
    useGetReportHazardIdentificationsQuery,
    useGetReportHazardIdentificationsPaginatedQuery,
    useUpdateReportHazardIdentificationTokenMutation
} = reportHazardIdentificationApi;

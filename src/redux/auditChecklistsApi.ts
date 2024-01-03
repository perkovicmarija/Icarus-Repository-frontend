import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerPath } from "../consts/ServerInfo";
import { getToken } from "../helpers/utility";
import { Meta, ResponseWrapper } from "../components/core/commonTypes";

export interface AuditChecklistType {
  auditChecklistTypeId: string;
  name: string;
}

export interface AuditChecklistDomain {
  domainId: string;
  name: string;
}

export interface AuditChecklist {
  auditChecklistId: string;
  domain: { name: string } | null;
  title: string;
  version: string;
  type: AuditChecklistType;
  effective: string | null;
  effectiveDate: string | null;
  published: boolean;
  checklistRevisions: AuditChecklist[];
  active: boolean;
  abbreviation: string;
}

export const auditChecklistsApi = createApi({
  reducerPath: "auditChecklistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getServerPath() + "/audit-checklists/",
    headers: { Authorization: `Basic ${getToken()}` },
  }),
  tagTypes: ["AuditChecklists"],
  endpoints: (builder) => ({
    getAuditChecklistsPaginated: builder.query<
      ResponseWrapper<AuditChecklist[]>,
      Meta
    >({
      query: (body) => ({
        url: `all-active` + `?access_token=${getToken()}`,
        method: "POST",
        body,
      }),
      providesTags: ["AuditChecklists"],
    }),
    deleteAuditChecklist: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}` + `?access_token=${getToken()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AuditChecklists"],
    }),
    addEditAuditChecklist: builder.mutation<void, AuditChecklist>({
      query: (body) => ({
        url: `?access_token=${getToken()}`,
        method: body.auditChecklistId ? "PUT" : "POST",
        body,
      }),
      invalidatesTags: ["AuditChecklists"],
    }),
    createAuditChecklistNewVersion: builder.mutation<void, AuditChecklist>({
      query: (body) => ({
        url: body.auditChecklistId + "/version" + `?access_token=${getToken()}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AuditChecklists"],
    }),
  }),
});

export const {
  useGetAuditChecklistsPaginatedQuery,
  useDeleteAuditChecklistMutation,
  useAddEditAuditChecklistMutation,
  useCreateAuditChecklistNewVersionMutation,
} = auditChecklistsApi;

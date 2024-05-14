import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerPath } from "../../../consts/ServerInfo";
import { getToken } from "../../../helpers/utility";
import { Meta, ResponseWrapper } from "../../../components/core/commonTypes";
import { ForumTag } from "../forumTags/forumTagsApi";
import { ForumComment } from "../forumComments/forumCommentsApi";
import { ForumTopicUserJoined } from "../forumUsers/forumTopicUsersApi";
import { ForumUser } from "../forumUsers/forumUsersApi";
import { ForumLike } from "../forumLikes/forumLikesApi";
import { RestApiFile2 } from "../../../api/methods/RestApiFile2";
import { AxiosError, AxiosResponse } from "axios";
import { IAttachment } from "../../../components/attachments/Attachments";

export interface ForumTopic {
  forumTopicId: string;
  content: string;
  created: Date | null;
  createdFormatted: string;
  title: string;
  forumUserCreatedDisplayName: string;
  forumTags: ForumTag[];
  forumTopicUserJoineds: ForumTopicUserJoined[];
  forumComments: ForumComment[];
  forumTopicAttachments: ForumTopicAttachment[];
  forumLikes: ForumLike[];
}

export interface ForumTopicAttachment {
  attachmentId: string;
  filename: string;
  description: string;
  dateCreated: string;
  forumUserCreated: ForumUser;
  forumTopicId: string;
}

export const forumTopicsApi = createApi({
  reducerPath: "forumTopicsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getServerPath() + "/forum/topic/",
    headers: { Authorization: `Basic ${getToken()}` },
  }),
  tagTypes: ["ForumTopic"],
  endpoints: (builder) => ({
    getForumTopic: builder.query<ResponseWrapper<ForumTopic>, string>({
      query: (id) => ({
        url: `${id}` + `?access_token=${getToken()}`,
        method: "GET",
      }),
      providesTags: ["ForumTopic"],
    }),
    getForumTopics: builder.query<ResponseWrapper<ForumTopic[]>, void>({
      query: () => `?access_token=${getToken()}`,
      providesTags: ["ForumTopic"],
    }),
    getForumTopicsPaginated: builder.query<ResponseWrapper<ForumTopic[]>, Meta>(
      {
        query: (body) => ({
          url: `paginate` + `?access_token=${getToken()}`,
          method: "POST",
          body,
        }),
        providesTags: ["ForumTopic"],
      }
    ),
    createUpdateForumTopic: builder.mutation<
      void,
      {
        formData: FormData;
        onProgress: (n: number | undefined) => void;
        forumTopicId: undefined | string;
      }
    >({
      queryFn: async ({ formData, onProgress, forumTopicId }, { signal }) => {
        try {
          const response = await RestApiFile2.upload2(
            "/forum/topic",
            formData,
            onProgress,
            signal,
            forumTopicId ? "PUT" : "POST"
          );
          console.log("response", response);
          return { data: response.data };
        } catch (error) {
          console.log("error", error);
          const { message /* name, code */ } = error as AxiosError;
          return { error: { error: message, status: "CUSTOM_ERROR" } };
        }

        /* method: body.forumTopicId ? "PUT" : "POST", */
      },
      invalidatesTags: ["ForumTopic"],
    }),
    getForumAttachment: builder.mutation<
      AxiosResponse<any, any>,
      {
        attachment: IAttachment;
        onProgress: (n: number | undefined) => void;
      }
    >({
      queryFn: async ({ attachment, onProgress }, { signal }) => {
        try {
          const response = await RestApiFile2.get(
            "/forum/topic/downloadAttachment",
            attachment,
            onProgress,
            undefined,
            signal
          );
          return { data: response };
        } catch (error) {
          console.log("error", error);
          const { message } = error as AxiosError;
          return { error: { error: message, status: "CUSTOM_ERROR" } };
        }
      },
    }),
    downloadForumAttachment: builder.mutation<
      void,
      {
        attachment: IAttachment;
        onProgress: (n: number | undefined) => void;
      }
    >({
      queryFn: async ({ attachment, onProgress }, { signal }) => {
        try {
          const response = await RestApiFile2.download2(
            "/forum/topic/downloadAttachment",
            attachment,
            onProgress,
            signal
          );
          console.log("response", response);
          return { data: response.data };
        } catch (error) {
          console.log("error", error);
          const { message } = error as AxiosError;
          return { error: { error: message, status: "CUSTOM_ERROR" } };
        }
      },
    }),
    deleteForumTopic: builder.mutation<void, string>({
      query: (id) => ({
        url: `${id}` + `?access_token=${getToken()}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ForumTopic"],
    }),
  }),
});

export const {
  useGetForumTopicQuery,
  useGetForumTopicsQuery,
  useGetForumTopicsPaginatedQuery,
  useCreateUpdateForumTopicMutation,
  useGetForumAttachmentMutation,
  useDownloadForumAttachmentMutation,
  useDeleteForumTopicMutation,
} = forumTopicsApi;

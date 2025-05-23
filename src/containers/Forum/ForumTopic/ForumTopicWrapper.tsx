import { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import ForumTopicHeader from "./ForumTopicHeader";
import {
  ForumTopic,
  ForumTopicAttachment,
  useCreateUpdateForumTopicMutation,
  useDownloadForumAttachmentMutation,
  useGetForumAttachmentMutation,
  useGetForumTopicQuery,
} from "../../../redux/forum/forumTopics/forumTopicsApi";
import { ForumTopicUserJoined } from "../../../redux/forum/forumUsers/forumTopicUsersApi";
import { ForumComment } from "../../../redux/forum/forumComments/forumCommentsApi";
import {
  ForumLike,
  useCreateForumLikeMutation,
  useDeleteForumLikeMutation,
} from "../../../redux/forum/forumLikes/forumLikesApi";
import { useHistory, useParams } from "react-router-dom";
import {
  ForumTag,
  useGetForumTagsQuery,
} from "../../../redux/forum/forumTags/forumTagsApi";
import { useGetForumUserByRepositoryUserQuery } from "../../../redux/forum/forumUsers/forumUsersApi";
import { handleNotify2 } from "../../../helpers/utility";
import { getForumTopicsPaginationPath } from "../../../consts/routePaths";
import ForumTopicForm from "./ForumTopicForm";
import { ProgressCustom } from "../../../components/core/ProgressCustom";
import DialogProgress from "../../../components/core/Dialog/DialogProgress";
import { FileView } from "../../../components/core/FileView";

const initialForumTopic: ForumTopic = {
  forumTopicId: "",
  content: "",
  created: null,
  createdFormatted: "",
  title: "",
  forumUserCreatedDisplayName: "",
  forumTags: new Array<ForumTag>(),
  forumTopicUserJoineds: new Array<ForumTopicUserJoined>(),
  forumComments: new Array<ForumComment>(),
  forumTopicAttachments: new Array<ForumTopicAttachment>(),
  forumLikes: new Array<ForumLike>(),
};

const ForumTopicWrapper = () => {
  const history = useHistory();
  const { forumTopicId } = useParams<{ forumTopicId: string }>();
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [forumTopic, setForumTopic] = useState<ForumTopic>(initialForumTopic);

  const [createUpdateForumTopic] = useCreateUpdateForumTopicMutation();
  const [getForumAttachment] = useGetForumAttachmentMutation();
  const [downloadAttachment] = useDownloadForumAttachmentMutation();
  const {
    data: forumTopicFromDb,
    refetch: refetchForumTopic,
    isFetching,
  } = useGetForumTopicQuery(forumTopicId, { skip: forumTopicId === "-1" });

  const { data: forumTags } = useGetForumTagsQuery();

  const { data: forumUser } = useGetForumUserByRepositoryUserQuery(userId, {
    skip: !userId,
  });

  const [createForumLike] = useCreateForumLikeMutation();
  const [deleteForumLike] = useDeleteForumLikeMutation();

  useEffect(() => {
    if (forumTopicId !== "-1") {
      if (forumTopicFromDb?.data) {
        setForumTopic(forumTopicFromDb.data);
      } else {
        setForumTopic(initialForumTopic);
      }
    }
  }, [forumTopicFromDb]);

  const [progressUpload, setProgressUpload] = useState<number | undefined>();
  const abortUpload = useRef<() => void | undefined>();

  const [progressDownload, setProgressDownload] = useState<
    number | undefined
  >();
  const abortDownload = useRef<() => void | undefined>();

  const handleForumTopicSubmit = async (value: ForumTopic): Promise<void> => {
    const formData = new FormData();
    formData.append(
      "forumTopic",
      JSON.stringify({
        ...value,
        forumUserCreatedDisplayName: forumUser.data.displayName,
      })
    );
    value.forumTopicAttachments.forEach((attachment) => {
      if (attachment.file) {
        formData.append("file", attachment.file);
      }
    });
    const resultPromise = createUpdateForumTopic({
      formData,
      onProgress: setProgressUpload,
      forumTopicId: value.forumTopicId,
    });
    abortUpload.current = resultPromise.abort;
    await handleNotify2(resultPromise);
    history.push(getForumTopicsPaginationPath(0, 25));
  };

  const handleTopicLike = async (): Promise<void> => {
    const existingLike: ForumLike = forumTopic.forumLikes.find(
      (like) => like.forumUserCreatedDisplayName === forumUser.data.displayName
    );

    if (existingLike) {
      await deleteForumLike(existingLike.forumLikeId);
    } else {
      let forumLike = {
        forumTopicId: forumTopic.forumTopicId,
        forumUserCreatedDisplayName: forumUser.data.displayName,
      };
      await createForumLike(forumLike);
    }

    refetchForumTopic();
  };

  const [file, setFile] = useState();

  return (
    <Grid container spacing={2}>
      <ForumTopicHeader />

      {forumTopicFromDb?.data || forumTopicId === "-1" ? (
        <ForumTopicForm
          initialData={forumTopicFromDb?.data}
          onForumTopicSubmit={handleForumTopicSubmit}
          onAttachView={async (attachment: ForumTopicAttachment) => {
            const resultPromise = getForumAttachment({
              attachment,
              onProgress: setProgressDownload,
            });
            abortUpload.current = resultPromise.abort;
            const result = await resultPromise;
            console.log(result);
            setFile(result.data);
          }}
          onAttachmentDownload={(attachment: ForumTopicAttachment) => {
            const resultPromise = downloadAttachment({
              attachment,
              onProgress: setProgressDownload,
            });
            abortUpload.current = resultPromise.abort;
            handleNotify2(resultPromise);
          }}
          forumUser={forumUser?.data}
          forumTags={forumTags?.data}
          forumTopic={forumTopic}
          forumTopicId={forumTopicId}
          onTopicLike={handleTopicLike}
        />
      ) : (
        isFetching && <ProgressCustom />
      )}

      <DialogProgress
        type={"upload"}
        progress={progressUpload}
        onClose={abortUpload.current!}
      />

      <DialogProgress
        type={"download"}
        progress={progressDownload}
        onClose={abortDownload.current!}
      />

      <FileView file={file} onClose={() => setFile(undefined)} />
    </Grid>
  );
};
export default ForumTopicWrapper;

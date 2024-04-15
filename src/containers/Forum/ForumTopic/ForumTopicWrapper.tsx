import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import ForumTopicHeader from "./ForumTopicHeader";
import {
  ForumTopic,
  ForumTopicAttachment,
  ForumTopicTagJoined,
  useCreateUpdateForumTopicMutation,
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
import { handleNotify } from "../../../helpers/utility";
import { getForumTopicsPaginationPath } from "../../../consts/routePaths";
import ForumTopicForm from "./ForumTopicForm";
import { ResponseWrapper } from "../../../components/core/commonTypes";

const initialForumTopic: ForumTopic = {
  forumTopicId: "",
  content: "",
  created: null,
  createdFormatted: "",
  title: "",
  forumUserCreatedDisplayName: "",
  forumTopicTagJoineds: new Array<ForumTopicTagJoined>(),
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

  const handleForumTopicSubmit = async (value: ForumTopic): Promise<void> => {
    const result: ResponseWrapper<ForumTopic> = await createUpdateForumTopic({
      ...value,
      forumTopicTagJoineds: forumTopic.forumTopicTagJoineds,
      forumUserCreatedDisplayName: forumUser.data.displayName,
    }).unwrap();
    handleNotify(result);
    history.push(getForumTopicsPaginationPath(0, 25));
  };

  const handleClickForumTag = (payload: ForumTag): void => {
    setForumTopic((prevTopic) => {
      const existingTag = prevTopic.forumTopicTagJoineds?.find(
        (tagJoined) => tagJoined.forumTag.forumTagId === payload.forumTagId
      );

      let newTags: ForumTopicTagJoined[];
      if (existingTag) {
        newTags = prevTopic.forumTopicTagJoineds!.filter(
          (tagJoined) => tagJoined.forumTag.forumTagId !== payload.forumTagId
        );
      } else {
        const newTagJoined: ForumTopicTagJoined = {
          forumTopicTagId: "",
          forumTopicId: prevTopic.forumTopicId,
          forumTag: payload,
        };
        newTags = [...(prevTopic.forumTopicTagJoineds || []), newTagJoined];
      }

      return {
        ...prevTopic,
        forumTopicTagJoineds: newTags,
      };
    });
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

  return (
    <Grid container spacing={2}>
      <ForumTopicHeader />

      {forumTopicFromDb?.data || forumTopicId === "-1" ? (
        <ForumTopicForm
          initialData={forumTopicFromDb?.data}
          onForumTopicSubmit={handleForumTopicSubmit}
          forumUser={forumUser?.data}
          onClickForumTag={handleClickForumTag}
          forumTags={forumTags?.data}
          forumTopic={forumTopic}
          forumTopicId={forumTopicId}
          onTopicLike={handleTopicLike}
        />
      ) : (
        isFetching && (
          <div
            style={{
              position: "relative",
              top: "20vh",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        )
      )}
    </Grid>
  );
};
export default ForumTopicWrapper;

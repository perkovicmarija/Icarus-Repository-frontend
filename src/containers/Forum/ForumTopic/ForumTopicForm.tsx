import React, { useState } from "react";
import { ForumTopic } from "../../../redux/forum/forumTopics/forumTopicsApi";
import { ForumTag } from "../../../redux/forum/forumTags/forumTagsApi";
import ForumTagsComponent from "../../../components/forum/ForumTagsComponent";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { getForumTopicsPaginationPath } from "../../../consts/routePaths";
import JoditEditor from "jodit-react";
import { ForumUser } from "../../../redux/forum/forumUsers/forumUsersApi";
import IntlMessages from "../../../components/core/IntlMessages";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Controller, useForm } from "react-hook-form";
import TextField2 from "../../../components/core/Fields/TextField2";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";

const StyledPaper = styled(Paper)({
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const ForumTopicForm = <T,>({
  initialData,
  onForumTopicSubmit,
  forumUser,
  onClickForumTag,
  forumTags,
  forumTopic,
  forumTopicId,
  onTopicLike,
}: {
  initialData: any;
  onForumTopicSubmit: (ForumTopic: T) => Promise<any>;
  forumUser: ForumUser;
  onClickForumTag: (ForumTag: ForumTag) => void;
  forumTags: ForumTag[];
  forumTopic: ForumTopic;
  forumTopicId: string;
  onTopicLike: () => Promise<any>;
}) => {
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);

  const { handleSubmit, control } = useForm({
    defaultValues: initialData,
  });

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/,
    uploader: {
      insertImageAsBase64URI: true,
    },
    cleanHTML: {
      fillEmptyParagraph: false,
    },
    height: 300,
  };

  return (
    <>
      <Grid item xs={12}>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            handleSubmit((data) => {
              setLoading(true);
              onForumTopicSubmit(data as ForumTopic).catch(() =>
                setLoading(false)
              );
            })(e);
          }}
        >
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <StyledPaper style={{ padding: "5rem" }}>
                <TextField2
                  control={control}
                  label="forum.topic"
                  name="title"
                  rules={{ required: "general.required" }}
                  placeholder="forum.topic"
                />

                <div style={{ display: "flex", alignItems: "center" }}>
                  <h4>
                    <IntlMessages id="forum.user" />
                    :&nbsp;
                  </h4>
                  <span>{forumUser?.displayName}</span>
                </div>
              </StyledPaper>
            </Grid>

            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
              <StyledPaper>
                <ForumTagsComponent
                  onTagClick={onClickForumTag}
                  forumTags={forumTags}
                  selectedTags={forumTopic.forumTopicTagJoineds}
                  showAdd={false}
                />
              </StyledPaper>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="content"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <JoditEditor
                    value={forumTopic.content}
                    config={config}
                    onBlur={(newContent) => onChange(newContent)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              Attachments here
            </Grid>

            {forumTopicId !== "-1" && (
              <Grid
                item
                xs={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  onClick={() => onTopicLike()}
                  style={{
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {forumTopic.forumLikes.find(
                    (like) =>
                      like.forumUserCreatedDisplayName ===
                      forumUser?.displayName
                  ) ? (
                    <ThumbUpIcon
                      fontSize="small"
                      style={{ marginRight: "0.3rem", transform: "scale(0.8)" }}
                    />
                  ) : (
                    <ThumbUpOutlinedIcon
                      color="action"
                      fontSize="small"
                      style={{ marginRight: "0.3rem", transform: "scale(0.8)" }}
                    />
                  )}
                </div>
                <p>
                  {forumTopic.forumLikes.length}{" "}
                  <IntlMessages id="forum.likes" />
                </p>
              </Grid>
            )}

            <Grid item xs={12}>
              <DialogActions2
                onClose={() =>
                  history.push(getForumTopicsPaginationPath(0, 25))
                }
                loading={loading}
              />
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
};
export default ForumTopicForm;

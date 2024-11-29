import { useState } from "react";
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
import { Controller, useController, useForm } from "react-hook-form";
import TextField2 from "../../../components/core/Fields/TextField2";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";
import Attachments from "../../../components/attachments/Attachments";

const StyledPaper = styled(Paper)({
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

interface TopicFormValues {
  forumTags: ForumTag[];
  forumTopicAttachments: any[];
}

const ForumTopicForm = ({
  initialData,
  onForumTopicSubmit,
  forumUser,
  forumTags,
  forumTopic,
  forumTopicId,
  onTopicLike,
  onAttachView,
  onAttachmentDownload,
}: {
  initialData: any;
  onForumTopicSubmit: (payload: ForumTopic) => Promise<any>;
  forumUser: ForumUser;
  forumTags: ForumTag[];
  forumTopic: ForumTopic;
  forumTopicId: string;
  onTopicLike: () => Promise<any>;
  onAttachView: (attachment: any) => void;
  onAttachmentDownload: (attachment: any) => void;
}) => {
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);

  const { handleSubmit, control } = useForm({
    defaultValues: initialData,
  });

  const { field: fieldTags } = useController<TopicFormValues>({
    control,
    name: "forumTags",
    defaultValue: [] as ForumTag[],
  });

  const { field: fieldAttachments } = useController<TopicFormValues>({
    control,
    name: "forumTopicAttachments",
    defaultValue: [],
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
            <Grid item lg={6} xs={12}>
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

            <Grid item lg={6} xs={12}>
              <StyledPaper>
                <ForumTagsComponent
                  onEditClick={(item) => {
                    const index = fieldTags.value.findIndex(
                      (i) => i.forumTagId === item.forumTagId
                    );
                    if (index === -1) {
                      fieldTags.onChange([...fieldTags.value, item]);
                    } else {
                      const copy = [...fieldTags.value];
                      copy.splice(index, 1);
                      fieldTags.onChange(copy);
                    }
                  }}
                  options={forumTags}
                  selectedTags={fieldTags.value}
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
              <Paper>
                <Attachments
                  attachments={fieldAttachments.value}
                  disabled={false}
                  onAttachView={onAttachView}
                  onAttachDownload={onAttachmentDownload}
                  onAttachDelete={(attachment, index) => {
                    const copy = [...fieldAttachments.value];
                    copy.splice(index, 1);
                    fieldAttachments.onChange(copy);
                  }}
                  onAttachAdd={(file, attachment) =>
                    fieldAttachments.onChange([
                      ...fieldAttachments.value,
                      { ...attachment, file },
                    ])
                  }
                />
              </Paper>
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

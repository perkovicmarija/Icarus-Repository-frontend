import CardContent from "@mui/material/CardContent";
import { Grid, IconButton, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import { Delete } from "@mui/icons-material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { ForumUser } from "../../redux/forum/forumUsers/forumUsersApi";
import { ForumComment } from "../../redux/forum/forumComments/forumCommentsApi";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import { getForumCommentLikesPaginationPath } from "../../consts/routePaths";
import { useHistory } from "react-router-dom";
import Attachments from "../attachments/Attachments";
import { RestApiFile2 } from "../../api/methods/RestApiFile2";
import { useRef, useState } from "react";
import DialogProgress from "../core/Dialog/DialogProgress";
import { ObjectViewer } from "../core/Viewer/ObjectViewer";
import { parseContentDisposition } from "../core/Viewer/utils";

const ForumCommentComponent = <T,>({
  forumUser,
  onLike,
  commentReplyInputText,
  onForumReplySubmit,
  onForumReplyChange,
  setDialogWarning,
  forumComment,
  setCommentIdToDelete,
  onAddEdit,
  level,
}: {
  forumUser: ForumUser;
  onLike: (forumComment: ForumComment) => Promise<any>;
  commentReplyInputText: string;
  onForumReplySubmit: (ForumComment: T) => void;
  onForumReplyChange: (item: T) => void;
  setDialogWarning: (item: T) => void;
  forumComment: ForumComment;
  setCommentIdToDelete: (item: T) => void;
  onAddEdit: (item: T) => void;
  level: number;
}) => {
  const history = useHistory();
  const [progressDownload, setProgressDownload] = useState<
    number | undefined
  >();
  const [viewFile, setViewFile] = useState();
  const abortDownload = useRef();

  return (
    <>
      <CardContent
        style={{
          borderBottom: "1px solid black",
          marginLeft: `${level}vw`,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
            <AccountCircleRoundedIcon
              fontSize="large"
              style={{ marginRight: "0.5rem", fontWeight: "bold" }}
            />

            <Grid container direction="column">
              <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                {forumComment?.forumUserCreatedDisplayName}
              </Typography>

              <Typography variant="caption">
                {forumComment?.createdFormatted}
              </Typography>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Tooltip title={<FormattedMessage id="forum.comment.likes" />}>
                <IconButton
                  size="small"
                  onClick={() =>
                    history.push(
                      getForumCommentLikesPaginationPath(
                        forumComment.forumTopicId,
                        forumComment.forumCommentId,
                        0,
                        25
                      )
                    )
                  }
                >
                  <ThumbsUpDownIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={<FormattedMessage id="general.delete" />}>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => {
                    setDialogWarning(true);
                    setCommentIdToDelete(forumComment.forumCommentId);
                  }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="body1"
              style={{ whiteSpace: "pre-line", margin: "0.75rem 0 0.5rem" }}
            >
              {forumComment.content}
            </Typography>
          </Grid>

          {forumComment.attachments?.length > 0 && (
            <Grid item xs={12} style={{ background: "#f3f3f3" }}>
              <Attachments
                attachments={forumComment.attachments}
                hideHeader={true}
                onAttachView={(attachment) => {
                  const abortController = new AbortController();
                  RestApiFile2.get(
                    "/forum/comment/downloadAttachment",
                    {
                      forumCommentId: forumComment.forumCommentId,
                      forumTopicId: forumComment.forumTopicId,
                      forumCommentAttachment: attachment,
                    },
                    setProgressDownload,
                    abortController
                  ).then((result) => {
                    setViewFile(result);
                  });
                  abortDownload.current = abortController.abort;
                }}
                onAttachDownload={(attachment) => {
                  const abortController = new AbortController();
                  RestApiFile2.download(
                    "/forum/comment/downloadAttachment",
                    {
                      forumCommentId: forumComment.forumCommentId,
                      forumTopicId: forumComment.forumTopicId,
                      forumCommentAttachment: attachment,
                    },
                    setProgressDownload,
                    abortController
                  );
                  abortDownload.current = abortController.abort;
                }}
              />
            </Grid>
          )}

          <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
            <Grid container>
              <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                <div
                  onClick={() => onLike(forumComment)}
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  <Tooltip title={<FormattedMessage id="forum.like" />}>
                    {forumComment.forumLikes.find(
                      (like) =>
                        like.forumUserCreatedDisplayName ===
                        forumUser?.displayName
                    ) ? (
                      <ThumbUpIcon
                        fontSize="small"
                        style={{
                          marginRight: "0.2rem",
                          transform: "scale(0.8)",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <ThumbUpOutlinedIcon
                        color="action"
                        fontSize="small"
                        style={{
                          marginRight: "0.2rem",
                          transform: "scale(0.8)",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </Tooltip>
                  <small>
                    <p>
                      {forumComment?.forumLikes?.length}{" "}
                      <FormattedMessage id="forum.likes" />
                    </p>
                  </small>
                </div>
              </Grid>
              {/* <Grid
                item
                xs={2}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Tooltip title={<FormattedMessage id="forum.reply" />}>
                  <ReplyIcon
                    onClick={() => {
                      if (replyOpen) {
                        setReplyOpen("");
                      } else {
                        setReplyOpen(forumComment.forumCommentId);
                      }
                    }}
                    style={{ transform: "scale(0.8)", cursor: "pointer" }}
                  />
                </Tooltip>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <DialogProgress
        type={"download"}
        progress={progressDownload}
        /* onClose={abortDownload?.current} */
      />

      {viewFile && (
        <ObjectViewer
          file={URL.createObjectURL(
            new Blob([viewFile.data], { type: "image/png" })
          )}
          onClose={() => setViewFile(undefined)}
          filename={
            parseContentDisposition(viewFile.headers["content-disposition"])
              .filename
          }
        />
      )}
    </>
  );
};
export default ForumCommentComponent;

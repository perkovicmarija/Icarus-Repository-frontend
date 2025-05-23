import { useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { styled } from "@mui/styles";
import { ForumComment } from "../../redux/forum/forumComments/forumCommentsApi";
import { DialogDelete2 } from "../core/Dialog/DialogDelete2";
import {
  TablePagination2,
  TablePagination2Props,
} from "../core/Table/TablePagination2";
import { ForumUser } from "../../redux/forum/forumUsers/forumUsersApi";
import ForumCommentComponent from "./ForumCommentComponent";
import { ForumCommentNew } from "./ForumCommentNew";

const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}));

const ForumCommentsList = <T,>({
  forumComment,
  forumComments,
  forumUser,
  onForumCommentInputChange,
  onAddEdit,
  onDelete,
  onLike,
  commentReplyInputText,
  onForumReplySubmit,
  onForumReplyChange,
  meta,
  paginationProps,
  loading,
}: {
  forumComment: ForumComment;
  forumComments: ForumComment[];
  forumUser: ForumUser;
  onForumCommentInputChange: (item: T) => void;
  onAddEdit: (item: T) => void;
  onDelete: (forumCommentId: string) => Promise<any>;
  onLike: (forumComment: ForumComment) => Promise<any>;
  commentReplyInputText: string;
  onForumReplySubmit: (item: T) => void;
  onForumReplyChange: (item: T) => void;
  meta: any;
  paginationProps: TablePagination2Props;
  loading: boolean;
}) => {
  const [dialogWarning, setDialogWarning] = useState<T | undefined>();
  const [commentIdToDelete, setCommentIdToDelete] = useState<string>("");

  return (
    <>
      <StyledGrid container style={{ opacity: loading ? 0.25 : 1 }}>
        <Grid item xs={12} style={{ marginBottom: "1rem" }}>
          <ForumCommentNew onSubmit={onAddEdit} />
        </Grid>

        {forumComments?.map((forumComment) => {
          return (
            <Grid container spacing={2} key={forumComment.forumCommentId}>
              {loading && (
                <div
                  style={{
                    position: "relative",
                    top: "0%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              )}
              <Grid item xs={12}>
                <ForumCommentComponent
                  forumUser={forumUser}
                  onLike={onLike}
                  commentReplyInputText={commentReplyInputText}
                  onForumReplySubmit={onForumReplySubmit}
                  onForumReplyChange={onForumReplyChange}
                  setDialogWarning={setDialogWarning}
                  forumComment={forumComment}
                  setCommentIdToDelete={setCommentIdToDelete}
                  onAddEdit={onAddEdit}
                  level={0}
                />
              </Grid>
            </Grid>
          );
        })}

        <TablePagination2
          onChangePage={paginationProps.onChangePage}
          onChangeRowsPerPage={paginationProps.onChangeRowsPerPage}
          page={paginationProps.page}
          rowsPerPage={paginationProps.rowsPerPage}
          totalCount={paginationProps.totalCount}
        />
      </StyledGrid>

      <DialogDelete2
        data={dialogWarning}
        onSubmit={() => onDelete(commentIdToDelete)}
        onClose={() => setDialogWarning(undefined)}
      />
    </>
  );
};
export default ForumCommentsList;

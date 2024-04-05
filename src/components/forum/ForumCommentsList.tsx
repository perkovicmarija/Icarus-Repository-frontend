import React, {useEffect, useState} from 'react'
import {CircularProgress, Grid, IconButton, Tooltip} from "@mui/material";
import {styled} from "@mui/styles";
import {ForumComment, forumCommentsApi} from "../../redux/forum/forumComments/forumCommentsApi";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import IntlMessages from "../core/IntlMessages";
import TextFieldValidation from "../core/TextField/TextFieldValidation";
import {Delete} from "@mui/icons-material";
import {DialogDelete2} from "../core/Dialog/DialogDelete2";
import {TablePagination2, TablePagination2Props} from "../core/Table/TablePagination2";
import {ValidatorForm} from 'react-material-ui-form-validator';
import withValidation from "../../containers/HOC/withValidation";
import {ForumUser} from "../../redux/forum/forumUsers/forumUsersApi";
import ForumCommentComponent from "./ForumCommentComponent";


const StyledGrid = styled(Grid)(({theme}) => ({
  backgroundColor: theme.palette.grey[200],
}));

const ForumCommentsList = <T, >({
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
                                  paginationProps,
                                  loading
                                }: {
  forumComment: ForumComment,
  forumComments: ForumComment[],
  forumUser: ForumUser,
  onForumCommentInputChange: (item: T) => void,
  onAddEdit: (item: T) => void,
  onDelete: (forumCommentId: string) => Promise<any>,
  onLike: (forumComment: ForumComment) => Promise<any>,
  commentReplyInputText: string,
  onForumReplySubmit: (item: T) => void,
  onForumReplyChange: (item: T) => void,
  paginationProps: TablePagination2Props;
  loading: boolean;
}) => {
  const [dialogWarning, setDialogWarning] = useState<T | undefined>();
  const [commentIdToDelete, setCommentIdToDelete] = useState<string>("");
  
  return (
    <>
      <StyledGrid container style={{opacity: loading ? 0.25 : 1}}>
        <Grid item xs={12}>
          <CardContent>
            <ValidatorForm
              noValidate
              autoComplete="off"
              onSubmit={onAddEdit}
              onError={() => {
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} style={{display: "flex", alignItems: "center"}}>
                  <AccountCircleRoundedIcon fontSize="large" style={{marginRight: "0.5rem"}}/>
                  <Typography variant="subtitle2" style={{fontWeight: "bold"}}>
                    <IntlMessages id="forum.comments.add"/>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextFieldValidation
                    disabled={false}
                    label=""
                    id="content"
                    name="content"
                    value={forumComment.content}
                    onInputChange={onForumCommentInputChange}
                    multiline
                    rows="3"
                    placeholder="forum.typeHere"
                    type="text"
                  />
                </Grid>
              </Grid>
            </ValidatorForm>
          </CardContent>
          <CardActions disableSpacing sx={{display: "flex", justifyContent: "flex-start", marginBottom: "4rem"}}>
            <Button variant="contained" color="secondary" onClick={onAddEdit}><IntlMessages
              id="forum.comment"/></Button>
          </CardActions>
        </Grid>
        {forumComments?.map(forumComment => {
          return (
            <Grid container spacing={2} key={forumComment.forumCommentId}>
              {loading && (
                <div style={{
                  position: 'relative',
                  top: '0%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <CircularProgress/>
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
          )
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
  )
}
export default withValidation(ForumCommentsList)

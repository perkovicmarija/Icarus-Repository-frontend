import React, {useState} from 'react'
import {Grid, IconButton} from "@mui/material";
import {styled} from "@mui/styles";
import {ForumComment} from "../../redux/forum/forumComments/forumCommentsApi";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import IntlMessages from "../core/IntlMessages";
import TextFieldValidation from "../core/TextField/TextFieldValidation";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {Delete} from "@mui/icons-material";
import {DialogDelete2} from "../core/Dialog/DialogDelete2";
import {TablePagination2, TablePagination2Props} from "../core/Table/TablePagination2";
import { ValidatorForm } from 'react-material-ui-form-validator';
import withValidation from "../../containers/HOC/withValidation";
import {ForumUser} from "../../redux/forum/forumUsers/forumUsersApi";

const StyledGrid = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
}));

const ForumTopicCommentsList = <T,>({
    forumComment,
    forumComments,
    forumUser,
    onForumCommentInputChange,
    onAddEdit,
    onDelete,
    onLike,
    paginationProps
                                } : {
    forumComment: ForumComment,
    forumComments: ForumComment[],
    forumUser: ForumUser,
    onForumCommentInputChange: (item: T) => void,
    onAddEdit: (item: T) => void,
    onDelete: (forumCommentId: string) => Promise<any>,
    onLike: (forumComment: ForumComment) => Promise<any>,
    paginationProps: TablePagination2Props;
}) => {
    const [dialogWarning, setDialogWarning] = useState<T | undefined>();
    const [commentIdToDelete, setCommentIdToDelete] = useState<string>("");

    return (
        <>
            <StyledGrid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <CardContent>
                        <ValidatorForm
                            noValidate
                            autoComplete="off"
                            onSubmit={onAddEdit}
                            onError={() => {}}
                        >
                            <Grid container spacing={2}>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: "flex", alignItems: "center"}}>
                                    <AccountCircleRoundedIcon fontSize="large" style={{marginRight: "1rem", transform: "scale(1.2)"}}/>
                                    <Typography  variant="subtitle2" style={{fontWeight: "bold"}}>
                                        <IntlMessages id="forum.comments.add" />
                                    </Typography>
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                        <Button variant="contained" color="secondary" onClick={onAddEdit}><IntlMessages id="forum.comment"/></Button>
                    </CardActions>
                </Grid>
                {forumComments?.map(forumComment => {
                    return (
                        <Grid container spacing={2} key={forumComment.forumCommentId}>
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <CardContent style={{ borderBottom: '1px solid lightgrey' }}>
                                    <Grid container spacing={2}>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ display: "flex", alignItems: "center" }}>
                                            <AccountCircleRoundedIcon fontSize="large" style={{ marginRight: "1rem", fontWeight: "bold", transform: "scale(1.2)" }} />

                                            <Grid container direction="column">
                                                <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                                    {forumComment?.forumUserCreated.fullName}
                                                </Typography>

                                                <Typography variant="subtitle2">
                                                    {forumComment?.createdFormatted}
                                                </Typography>
                                            </Grid>
                                            <Grid container justifyContent="flex-end">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => {
                                                        setDialogWarning(true)
                                                        setCommentIdToDelete(forumComment.forumCommentId)
                                                    }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Grid>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                            <Typography variant="body1" gutterBottom style={{ whiteSpace: 'pre-line' }}>
                                                {forumComment.content}
                                            </Typography>
                                        </Grid>

                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: "flex", alignItems: "center"}}>
                                            <div onClick={() => onLike(forumComment)} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
                                                {forumComment.forumLikes.find((like) => like.forumUserCreatedId === forumUser?.forumUserId) ? (
                                                    <ThumbUpIcon fontSize="small" style={{ marginRight: "0.5rem", transform: "scale(0.8)" }}/>
                                                ) : (
                                                    <ThumbUpOutlinedIcon color="action" fontSize="small" style={{ marginRight: "0.5rem", transform: "scale(0.8)" }}/>
                                                )}
                                            </div>
                                            <Typography variant="overline">
                                                {forumComment.forumLikes.length} <IntlMessages id="forum.likes" />
                                            </Typography>
                                        </Grid>

                                    </Grid>

                                </CardContent>
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

            </StyledGrid >

            <DialogDelete2
                data={dialogWarning}
                onSubmit={() => onDelete(commentIdToDelete)}
                onClose={() => setDialogWarning(undefined)}
            />
        </>
    )
}
export default withValidation(ForumTopicCommentsList)

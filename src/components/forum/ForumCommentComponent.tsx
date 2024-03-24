import React, {useState} from 'react'
import IntlMessages from "../core/IntlMessages";
import TextFieldValidation from "../core/TextField/TextFieldValidation";
import CardContent from "@mui/material/CardContent";
import {Button, Grid, IconButton, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {FormattedMessage} from "react-intl";
import {Delete} from "@mui/icons-material";
import ReplyIcon from '@mui/icons-material/Reply';
import SmsIcon from '@mui/icons-material/Sms';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { ValidatorForm } from 'react-material-ui-form-validator';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import {ForumUser} from "../../redux/forum/forumUsers/forumUsersApi";
import {ForumComment} from "../../redux/forum/forumComments/forumCommentsApi";

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
                                       level
                               } : {
    forumUser: ForumUser,
    onLike: (forumComment: ForumComment) => Promise<any>,
    commentReplyInputText: string,
    onForumReplySubmit: (ForumComment: T) => void,
    onForumReplyChange: (item: T) => void,
    setDialogWarning: (item: T) => void,
    forumComment: ForumComment,
    setCommentIdToDelete: (item: T) => void,
    onAddEdit: (item: T) => void,
    level: number
}) => {
    const [replyOpen, setReplyOpen] = useState<string>("");

    return (
        <>
            <CardContent style={{ borderBottom: '1px solid lightgrey', marginLeft: `${level}vw` }}>
                <Grid container spacing={1}>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ display: "flex", alignItems: "center" }}>
                        <AccountCircleRoundedIcon fontSize="large" style={{ marginRight: "0.5rem", fontWeight: "bold" }} />

                        <Grid container direction="column">
                            <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                {forumComment?.forumUserCreated?.fullName}
                            </Typography>

                            <Typography variant="caption">
                                {forumComment?.createdFormatted}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Tooltip title={<FormattedMessage id="general.delete" />}>
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
                            </Tooltip>
                        </Grid>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography variant="body1" gutterBottom style={{ whiteSpace: 'pre-line' }}>
                            {forumComment.content}
                        </Typography>
                    </Grid>

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: "flex", alignItems: "center"}}>
                        <Grid container>
                            <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                                <div onClick={() => onLike(forumComment)} style={{ display: "inline-flex", alignItems: "center" }}>
                                    <Tooltip title={<FormattedMessage id="forum.like" />}>
                                        {forumComment.forumLikes.find((like) => like.forumUserCreatedId === forumUser?.forumUserId) ? (
                                            <ThumbUpIcon fontSize="small"
                                                         style={{ marginRight: "0.3rem", transform: "scale(0.7)", cursor: "pointer" }}/>
                                        ) : (
                                            <ThumbUpOutlinedIcon color="action" fontSize="small"
                                                                 style={{ marginRight: "0.3rem", transform: "scale(0.7)", cursor: "pointer" }}/>
                                        )}
                                    </Tooltip>
                                    <Typography variant="caption">
                                        {forumComment?.forumLikes?.length} <IntlMessages id="forum.likes" />
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} style={{ display: "flex", justifyContent: "flex-end" }} >
                                <Tooltip title={<FormattedMessage id="forum.reply" />}>
                                    <ReplyIcon onClick={() => {
                                        if (replyOpen) {
                                            setReplyOpen("")
                                        } else {
                                            setReplyOpen(forumComment.forumCommentId)
                                        }
                                    }}
                                               style={{ transform: "scale(0.8)", cursor: "pointer" }} />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>

                    {replyOpen === forumComment.forumCommentId &&

                        <Grid container style={{display: "flex", alignItems: "flex-end"}}>
                            <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                                <ValidatorForm
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={onAddEdit}
                                    onError={() => {}}
                                >
                                    <TextFieldValidation
                                        disabled={false}
                                        label=""
                                        id="content"
                                        name="content"
                                        value={commentReplyInputText}
                                        onInputChange={onForumReplyChange}
                                        placeholder="forum.typeHere"
                                        type="text"
                                        multiline
                                        rows="3"
                                    />
                                </ValidatorForm>
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2} alignItems="end" style={{display: "flex", justifyContent: "space-around"}}>
                                <Button size="small" variant="contained" color="primary" onClick={() => {
                                    onForumReplySubmit(forumComment)
                                    setReplyOpen("")
                                }
                                }>
                                    <IntlMessages id="forum.reply"/>
                                </Button>
                                <Button size="small" variant="contained" color="error" onClick={() => setReplyOpen("")}>
                                    <IntlMessages id="action.cancel"/>
                                </Button>
                            </Grid>
                        </Grid>

                    }

                </Grid>

            </CardContent>

            {(forumComment?.replies && forumComment?.replies?.length > 0) &&

                forumComment?.replies?.map((reply, i) => {
                    return (
                        <ForumCommentComponent
                            key={reply.forumCommentId}
                            forumUser={forumUser}
                            onLike={onLike}
                            commentReplyInputText={commentReplyInputText}
                            onForumReplySubmit={onForumReplySubmit}
                            onForumReplyChange={onForumReplyChange}
                            setDialogWarning={setDialogWarning}
                            forumComment={reply}
                            setCommentIdToDelete={setCommentIdToDelete}
                            onAddEdit={onAddEdit}
                            level={level + 4}
                        />
                    )
                })
            }

        </>
    )
}
export default ForumCommentComponent

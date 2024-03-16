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
import {Delete} from "@mui/icons-material";
import {DialogDelete2} from "../core/Dialog/DialogDelete2";

const StyledGrid = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
}));

const ForumTopicComments = <T,>({
    forumComment,
    forumComments,
    onForumCommentInputChange,
    onAddEdit,
    onDelete
                                } : {
    forumComment: ForumComment,
    forumComments: ForumComment[],
    onForumCommentInputChange: (item: T) => void,
    onAddEdit: (item: T) => void,
    onDelete: (forumCommentId: string) => Promise<any>
}) => {
    const [dialogWarning, setDialogWarning] = useState<T | undefined>();
    const [commentIdToDelete, setCommentIdToDelete] = useState<string>("");

    return (
        <>
            <StyledGrid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <CardContent>
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
                    </CardContent>
                    <CardActions disableSpacing sx={{display: "flex", justifyContent: "flex-end"}}>
                        <Button variant="contained" color="secondary" onClick={onAddEdit}><IntlMessages id="forum.comment"/></Button>
                    </CardActions>
                </Grid>
                    {forumComments?.map(forumComment => {
                        return (
                            <Grid container spacing={2} key={forumComment.forumCommentId}>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <CardContent>
                                        <Grid container spacing={2}>

                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{ display: "flex", alignItems: "center" }}>
                                                <AccountCircleRoundedIcon fontSize="large" style={{ marginRight: "1rem", fontWeight: "bold", transform: "scale(1.2)" }} />

                                                <Grid container direction="column">
                                                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                                        {forumComment?.userCreated.fullName}
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
                                                <TextFieldValidation
                                                    disabled={true}
                                                    label=""
                                                    id="content"
                                                    name="content"
                                                    value={forumComment.content}
                                                    onInputChange={onForumCommentInputChange}
                                                    multiline
                                                    rows="5"
                                                    type="text"
                                                    placeholder=""
                                                />
                                            </Grid>

                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: "flex", alignItems: "center"}}>
                                                <ThumbUpIcon fontSize="small" style={{marginRight: "0.5rem", transform: "scale(0.8)"}}/>
                                                <Typography variant="overline">
                                                    48 <IntlMessages id="forum.likes" />
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        )
                    })}

            </StyledGrid >

            <DialogDelete2
                data={dialogWarning}
                onSubmit={() => onDelete(commentIdToDelete)}
                onClose={() => setDialogWarning(undefined)}
            />
        </>
    )
}
export default ForumTopicComments

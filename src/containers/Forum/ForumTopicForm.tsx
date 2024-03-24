import React, {useEffect, useRef, useState} from 'react'
import {
    ForumTopic,
    ForumTopicAttachment,
    ForumTopicTagJoined,
    useCreateUpdateForumTopicMutation,
    useGetForumTopicQuery
} from "../../redux/forum/forumTopics/forumTopicsApi";
import {ForumTag, useGetForumTagsQuery} from "../../redux/forum/forumTags/forumTagsApi";
import {cloneDeep} from "lodash";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import TextFieldValidation from "../../components/core/TextField/TextFieldValidation";
import ForumTagsComponent from "../../components/forum/ForumTagsComponent";
import FormSubmit from "../../components/core/Form/FormSubmit";
import {Grid, Paper, Tooltip} from "@mui/material";
import {styled} from "@mui/styles";
import {ValidatorForm} from 'react-material-ui-form-validator';
import {useHistory, useParams} from "react-router-dom";
import {ForumComment} from "../../redux/forum/forumComments/forumCommentsApi";
import {
    getForumSubscribersPaginationPath,
    getForumTopicCommentsPaginationPath,
    getForumTopicsPaginationPath
} from "../../consts/routePaths";
import JoditEditor from "jodit-react";
import PeopleIcon from '@mui/icons-material/People';
import {FormattedMessage} from "react-intl";
import {ForumTopicUserJoined} from "../../redux/forum/forumUsers/forumTopicUsersApi";
import CommentIcon from '@mui/icons-material/Comment';
import {ForumUser, useGetForumUserByDisplayNameQuery} from "../../redux/forum/forumUsers/forumUsersApi";
import {useGetUserQuery} from "../../redux/user/usersApi";
import IntlMessages from "../../components/core/IntlMessages";
import withValidation from "../HOC/withValidation";
import {
    ForumLike,
    useCreateForumLikeMutation,
    useDeleteForumLikeMutation
} from "../../redux/forum/forumLikes/forumLikesApi";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const StyledPaper = styled(Paper)({
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
});

const initialForumTopic = {
    forumTopicId: '',
    content: '',
    created: null,
    createdFormatted: '',
    title: '',
    forumUserCreated: {} as ForumUser,
    forumTopicTagJoineds: new Array<ForumTopicTagJoined>(),
    forumTopicUserJoineds: new Array<ForumTopicUserJoined>(),
    forumComments: new Array<ForumComment>(),
    forumTopicAttachments: new Array<ForumTopicAttachment>(),
    forumLikes: new Array<ForumLike>()
}

const ForumTopicForm = () => {
    const history = useHistory();
    const { forumTopicId } = useParams<{forumTopicId: string}>();

    const [forumTopic, setForumTopic] = useState<ForumTopic>(initialForumTopic);
    const [newAttachments, setNewAttachments] = useState<Array<ForumTopicAttachment>>([]);

    const [createUpdateForumTopic] = useCreateUpdateForumTopicMutation();
    const { data: forumTopicFromDb, refetch: refetchForumTopic } = useGetForumTopicQuery(forumTopicId, {skip: forumTopicId === "-1"});

    const { data: forumTags } = useGetForumTagsQuery();

    const { data: user } = useGetUserQuery(JSON.parse(localStorage.getItem("userId")))

    const username = user?.data.username;

    const { data: forumUser } = useGetForumUserByDisplayNameQuery(username, {
        skip: !username,
    })

    const [createForumLike] = useCreateForumLikeMutation()
    const [deleteForumLike] = useDeleteForumLikeMutation()

    useEffect(() => {
        if (forumTopicId != "-1") {
            if (forumTopicFromDb?.data) {
                setForumTopic(forumTopicFromDb.data);
            } else {
                setForumTopic(initialForumTopic);
            }
        }
    }, [forumTopicFromDb]);

    const handleForumTopicSubmit = async event => {
        event.preventDefault()
        await createUpdateForumTopic({...forumTopic, forumUserCreated: forumUser.data}).unwrap();
        history.push(getForumTopicsPaginationPath(0, 25))
    }

    const handleClickForumTag = (payload: ForumTag) => {
        setForumTopic(prevTopic => {
            const existingTag = prevTopic.forumTopicTagJoineds?.find(
                tagJoined => tagJoined.forumTag.forumTagId === payload.forumTagId
            );

            let newTags: ForumTopicTagJoined[];
            if (existingTag) {
                newTags = prevTopic.forumTopicTagJoineds!.filter(tagJoined => tagJoined.forumTag.forumTagId !== payload.forumTagId);
            } else {
                const newTagJoined: ForumTopicTagJoined = {
                    forumTopicTagId: '',
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
    }

    const handleClickSubscribers = () => {
        history.push(getForumSubscribersPaginationPath(forumTopicId, 0, 25));
    }

    const handleClickComments = () => {
        history.push(getForumTopicCommentsPaginationPath(forumTopicId, 0, 5));
    }

    const editor = useRef(null);
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

    const handleInputChange = ({ target: { name, value } }) => {
        let newForumTopicClone = cloneDeep(forumTopic);
        newForumTopicClone[name] = value;
        setForumTopic(newForumTopicClone);
    };

    const handleNewAttachSubmit = (file, attachment) => {
        let forumTopicClone = cloneDeep(forumTopic);
        forumTopicClone.forumTopicAttachments.push(attachment);

        setNewAttachments([...newAttachments, file]);
        setForumTopic(forumTopicClone);
    };

    const handleAttachDelete = (event, attachment) => {
        let forumTopicClone = cloneDeep(forumTopic);
        for (let i = 0, l = forumTopicClone.forumTopicAttachments.length; i < l; i++) {
            if (forumTopicClone.forumTopicAttachments[i].filename === attachment.filename) {
                forumTopicClone.forumTopicAttachments.splice(i, 1);
                setForumTopic(forumTopicClone);
                break;
            }
        }
        for (let i = 0, l = newAttachments.length; i < l; i++) {
            if (newAttachments[i].filename === attachment.filename) {
                setNewAttachments([...newAttachments.slice(0, i), ...newAttachments.slice(i + 1)]);
                break;
            }
        }
    };

    const handleAttachDownload = (event, attachment) => {
        let viewModel = {
            id: forumTopic.forumTopicId,
            filename: attachment.filename
        };
        // props.reportActions.download(viewModel);
    };

    const handleAttachView = (event, attachment) => {
        // let viewModel = {
        //     id: selectedItem.inspectionItemJoinedId,
        //     filename: attachment.filename
        // };
        // props.inspectionItemJoinedActions.viewAttachment(viewModel);
        // setDialogAttachmentViewOpen(true);
    }

    const handleLike = async () => {
        const existingLike: ForumLike = forumTopic.forumLikes.find((like) => like.forumUserCreatedId === forumUser.data.forumUserId)

        if (existingLike) {
            await deleteForumLike(existingLike.forumLikeId)
        } else {
            let forumLike = {
                forumTopicId: forumTopic.forumTopicId,
                forumUserCreatedId: forumUser.data.forumUserId
            }
            await createForumLike(forumLike)
        }

        refetchForumTopic()
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <FormTitleBarRich
                              title={forumTopicId != "-1" ? "forum.topic.edit" : "forum.topic.new"}
                              children={
                                  <Grid container spacing={2}>
                                      <Grid item>
                                          <Tooltip title={<FormattedMessage id="forum.comments" />}>
                                              <CommentIcon style={{ color: "#FFFFFF", cursor: "pointer" }} fontSize="medium"
                                                           onClick={handleClickComments}
                                              />
                                          </Tooltip>
                                      </Grid>
                                      <Grid item>
                                          <Tooltip title={<FormattedMessage id="forum.subscribers" />}>
                                              <PeopleIcon style={{ color: "#FFFFFF", cursor: "pointer" }} fontSize="medium"
                                                          onClick={handleClickSubscribers}
                                              />
                                          </Tooltip>
                                      </Grid>
                                  </Grid>
                              }
                        />
                </Grid>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <ValidatorForm
                        noValidate
                        autoComplete="off"
                        onSubmit={handleForumTopicSubmit}
                        // onError={onValidationError}
                    >
                        <Grid container spacing={2}>

                            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                <StyledPaper style={{padding: "5rem"}}>
                                    <TextFieldValidation
                                        disabled={false}
                                        id="title"
                                        label="forum.topic"
                                        name="title"
                                        value={forumTopic.title}
                                        onInputChange={handleInputChange}
                                        placeholder="forum.topic"
                                        type="text"
                                        validators={['required']}
                                        errorMessages={['This field is required', 'Email is not valid']}
                                        required/>

                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <h4><IntlMessages id="forum.user" />:&nbsp;</h4><span>{forumUser?.data.displayName}</span>
                                    </div>
                                </StyledPaper>
                            </Grid>

                            <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                                <StyledPaper>
                                    <ForumTagsComponent
                                        onTagClick={handleClickForumTag}
                                        forumTags={forumTags?.data}
                                        selectedTags={forumTopic.forumTopicTagJoineds}
                                        showAdd={false}
                                    />
                                </StyledPaper>
                            </Grid>

                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <JoditEditor
                                    ref={editor}
                                    value={forumTopic.content}
                                    config={config}
                                    onBlur={(newContent) => {
                                        setForumTopic({...forumTopic, content: newContent})
                                    }}
                                    onChange={newContent => {}}
                                />
                            </Grid>

                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                {/*<Attachments*/}
                                {/*    attachments={forumTopic.forumTopicAttachments}*/}
                                {/*    onNewAttachSubmit={handleNewAttachSubmit}*/}
                                {/*    onAttachDelete={handleAttachDelete}*/}
                                {/*    onAttachDownload={handleAttachDownload}*/}
                                {/*    onAttachView={handleAttachView}*/}
                                {/*    editDisabled={false}*/}
                                {/*    showView*/}
                                {/*/>*/}
                            </Grid>

                            {forumTopicId != "-1" &&
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: "flex", alignItems: "center"}}>
                                    <div onClick={() => handleLike()} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
                                        {forumTopic.forumLikes.find((like) => like.forumUserCreatedId === forumUser?.data.forumUserId) ? (
                                            <ThumbUpIcon fontSize="small" style={{ marginRight: "0.5rem", transform: "scale(0.8)" }}/>
                                        ) : (
                                            <ThumbUpOutlinedIcon color="action" fontSize="small" style={{ marginRight: "0.5rem", transform: "scale(0.8)" }}/>
                                        )}
                                    </div>
                                    <Typography variant="overline">
                                        {forumTopic.forumLikes.length} <IntlMessages id="forum.likes" />
                                    </Typography>
                                </Grid>
                            }

                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <FormSubmit
                                    handleCancel={() => history.push(getForumTopicsPaginationPath(0, 25))}
                                />
                            </Grid>

                        </Grid>

                    </ValidatorForm>
                </Grid>
            </Grid>
        </>

    )
}
export default withValidation(ForumTopicForm)

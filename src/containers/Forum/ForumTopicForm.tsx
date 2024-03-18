import React, {useEffect, useRef, useState} from 'react'
import {UserSimple} from "../../redux/user/usersApi";
import {
    ForumTopicUserJoined,
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
import {Grid, Paper} from "@mui/material";
import {styled} from "@mui/styles";
import {ValidatorForm} from 'react-material-ui-form-validator';
import {useHistory, useParams} from "react-router-dom";
import ForumTopicComments from "../../components/forum/ForumTopicComments";
import {
    ForumComment,
    useCreateUpdateForumCommentMutation,
    useDeleteForumCommentMutation,
    useGetForumCommentsForTopicQuery
} from "../../redux/forum/forumComments/forumCommentsApi";
import {getForumTopicsPaginationPath} from "../../consts/routePaths";
import useDeepCompareEffect from "use-deep-compare-effect";
import JoditEditor from "jodit-react";

const StyledPaper = styled(Paper)({
    minHeight: '300px',
});

const initialForumTopic = {
    forumTopicId: '',
    content: '',
    created: null,
    createdFormatted: '',
    title: '',
    userCreated: {} as UserSimple,
    forumTopicTagJoineds: new Array<ForumTopicTagJoined>(),
    forumTopicUserJoineds: new Array<ForumTopicUserJoined>(),
    forumComments: new Array<ForumComment>(),
    forumTopicAttachments: new Array<ForumTopicAttachment>()
}

const ForumTopicForm = () => {
    const history = useHistory();
    const { forumTopicId } = useParams<{forumTopicId: string}>();

    const initialForumComment = {
        forumCommentId: '',
        forumTopicId: forumTopicId,
        userCreated: {} as UserSimple,
        content: '',
        created: null,
        createdFormatted: '',
    }

    const [forumTopic, setForumTopic] = useState<ForumTopic>(initialForumTopic);
    const [forumComment, setForumComment] = useState<ForumComment>(initialForumComment);
    const [newAttachments, setNewAttachments] = useState<Array<ForumTopicAttachment>>([]);

    const [createUpdateForumTopic] = useCreateUpdateForumTopicMutation();
    const { data: forumTopicFromDb } = useGetForumTopicQuery(forumTopicId);

    const { data: forumTags } = useGetForumTagsQuery();

    const { data: forumComments } = useGetForumCommentsForTopicQuery(forumTopicId);
    const [createUpdateForumComment] = useCreateUpdateForumCommentMutation(forumComment);
    const [deleteForumComment] = useDeleteForumCommentMutation();

    useEffect(() => {
        if (forumTopicId != "-1") {
            if (forumTopicFromDb?.data) {
                setForumTopic(forumTopicFromDb.data);
            } else {
                setForumTopic(initialForumTopic);
            }
        }
    }, [forumTopicFromDb]);

    useEffect(() => {
        setForumComment(prevComment => ({
            ...prevComment,
            forumTopicId: forumTopic.forumTopicId
        }));
    }, [forumTopic.forumTopicId]);


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

    const handleForumTopicSubmit = async event => {
        event.preventDefault()
        const forumTopicUpdated = await createUpdateForumTopic(forumTopic).unwrap();
        setForumTopic(forumTopicUpdated.data)
    }

    const handleInputChange = ({ target: { name, value } }) => {
        let newForumTopicClone = cloneDeep(forumTopic);
        newForumTopicClone[name] = value;
        setForumTopic(newForumTopicClone);
    };

    const handleForumCommentInputChange = ({ target: { name, value } }) => {
        let newForumCommentClone = cloneDeep(forumComment);
        newForumCommentClone[name] = value;
        setForumComment(newForumCommentClone);
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

    const handleAddEditComment = async event => {
        event.preventDefault()
        await createUpdateForumComment(forumComment)
        setForumComment(initialForumComment)
    }

    const handleDeleteComment = async (forumCommentId: string) => {
        await deleteForumComment(forumCommentId)
    }


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <FormTitleBarRich title={forumTopicId != "-1" ? "forum.topic.edit" : "forum.topic.new"} />
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
                                        type="text"/>
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

                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <ForumTopicComments
                                        forumComments={forumComments?.data}
                                        onAddEdit={handleAddEditComment}
                                        onDelete={handleDeleteComment}
                                        forumComment={forumComment}
                                        onForumCommentInputChange={handleForumCommentInputChange}
                                    />
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
export default ForumTopicForm

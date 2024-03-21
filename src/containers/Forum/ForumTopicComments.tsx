import React, {useMemo, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {useHistory, useParams} from "react-router-dom";
import {usePagination} from "../../helpers/pagination";
import {getForumTopicCommentsPaginationPath, getForumTopicFormPath} from "../../consts/routePaths";
import {ForumUser, useGetForumUserByDisplayNameQuery} from "../../redux/forum/forumUsers/forumUsersApi";
import {Grid, Tooltip} from "@mui/material";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import {FormattedMessage} from "react-intl";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ForumTopicCommentsList from "../../components/forum/ForumTopicCommentsList";
import {
    ForumComment,
    useCreateUpdateForumCommentMutation,
    useDeleteForumCommentMutation,
    useGetForumCommentsPaginatedQuery
} from "../../redux/forum/forumComments/forumCommentsApi";
import {cloneDeep} from "lodash";
import {FiltersType, forumCommentsActions} from "../../redux/forum/forumComments/forumCommentsSlice";
import {useGetUserQuery} from "../../redux/user/usersApi";

const ForumTopicComments = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { forumTopicId } = useParams<{forumTopicId: string}>();

    const initialForumComment = {
        forumCommentId: '',
        forumTopicId: forumTopicId,
        forumUserCreated: {} as ForumUser,
        content: '',
        created: null,
        createdFormatted: '',
    }

    const [forumComment, setForumComment] = useState<ForumComment>(initialForumComment);

    const { page, rowsPerPage, storeRowsPerPage } = usePagination("forumComments");
    const filters = useAppSelector((state) => state.ForumComments.filters);
    const meta = useMemo(
        () => ({
            filters: {
                ...filters,
                forumTopicId
            },
            pagination: {
                page,
                rowsPerPage,
            },
        }),
        [filters, forumTopicId, page, rowsPerPage]
    );
    const { data: forumComments } = useGetForumCommentsPaginatedQuery(meta);
    const [createUpdateForumComment] = useCreateUpdateForumCommentMutation(forumComment);
    const [deleteForumComment] = useDeleteForumCommentMutation();

    const { data: user } = useGetUserQuery(JSON.parse(localStorage.getItem("userId")))

    const username = user?.data.username;

    const { data: forumUser } = useGetForumUserByDisplayNameQuery(username, {
        skip: !username,
    })

    const handleForumCommentInputChange = ({ target: { name, value } }) => {
        let newForumCommentClone = cloneDeep(forumComment);
        newForumCommentClone[name] = value;
        setForumComment(newForumCommentClone);
    };

    const handleSubmitFilters = (newFilters: FiltersType) => {
        dispatch(forumCommentsActions.setFilters({ ...filters, ...newFilters }));
        history.push(getForumTopicCommentsPaginationPath(forumTopicId, page, rowsPerPage));
    };
    // PAGINATION
    const onChangePage = (newValue: number) => {
        history.push(getForumTopicCommentsPaginationPath(forumTopicId, newValue, rowsPerPage));
    };
    const onChangeRowsPerPage = (newValue: number) => {
        storeRowsPerPage(newValue);
        history.push(getForumTopicCommentsPaginationPath(forumTopicId, page, newValue));
    };

    const handleAddEditComment = async event => {
        event.preventDefault()
        await createUpdateForumComment({...forumComment, forumUserCreated: forumUser.data}).unwrap();
        setForumComment(initialForumComment)
    }

    const handleDeleteComment = async (forumCommentId: string) => {
        await deleteForumComment(forumCommentId)
    }

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <FormTitleBarRich
                        title={"forum.comments"}
                        children={
                            <Tooltip title={<FormattedMessage id="forum.topic" />}>
                                <KeyboardBackspaceIcon style={{ color: "#FFFFFF", cursor: "pointer" }} fontSize="medium"
                                            onClick={() => history.push(getForumTopicFormPath(forumTopicId))}
                                />
                            </Tooltip>
                        }
                    />
                </Grid>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <ForumTopicCommentsList
                        forumComments={forumComments?.data}
                        onAddEdit={handleAddEditComment}
                        onDelete={handleDeleteComment}
                        forumComment={forumComment}
                        onForumCommentInputChange={handleForumCommentInputChange}
                        paginationProps={{
                            totalCount: forumComments?.meta.totalCount,
                            page,
                            rowsPerPage,
                            onChangePage,
                            onChangeRowsPerPage,
                        }}
                    />
                </Grid>

            </Grid>
        </>
    );
}
export default ForumTopicComments

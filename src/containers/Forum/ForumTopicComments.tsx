import React, {useMemo, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {useHistory, useParams} from "react-router-dom";
import {usePagination} from "../../helpers/pagination";
import {getForumTopicCommentsPaginationPath, getForumTopicFormPath} from "../../consts/routePaths";
import {
    ForumUser,
    useGetForumUserByDisplayNameQuery,
    useGetForumUsersQuery
} from "../../redux/forum/forumUsers/forumUsersApi";
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
import {
    ForumLike,
    useCreateForumLikeMutation,
    useDeleteForumLikeMutation
} from "../../redux/forum/forumLikes/forumLikesApi";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import DialogFormForumCommentFilter from "../../components/forum/DialogFormForumCommentFilter";
import FilterListIcon from '@mui/icons-material/FilterList';

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
        forumLikes: [] as ForumLike[]
    }

    const [forumComment, setForumComment] = useState<ForumComment>(initialForumComment);
    const [dialogFilters, setDialogFilters] = useState<boolean>(false);

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
    const { data: forumComments, refetch: refetchForumComments } = useGetForumCommentsPaginatedQuery(meta);
    const [createUpdateForumComment] = useCreateUpdateForumCommentMutation();
    const [deleteForumComment] = useDeleteForumCommentMutation();

    const { data: user } = useGetUserQuery(JSON.parse(localStorage.getItem("userId")))

    const username = user?.data.username;

    const { data: forumUser } = useGetForumUserByDisplayNameQuery(username, {
        skip: !username,
    })
    const { data: forumUsers } = useGetForumUsersQuery(meta);

    const [createForumLike] = useCreateForumLikeMutation()
    const [deleteForumLike] = useDeleteForumLikeMutation()

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

    const handleLike = async (forumComment: ForumComment) => {
        const existingLike: ForumLike = forumComment.forumLikes.find((like) => like.forumUserCreatedId === forumUser.data.forumUserId)

        if (existingLike) {
            await deleteForumLike(existingLike.forumLikeId)
        } else {
            let forumLike = {
                forumCommentId: forumComment.forumCommentId,
                forumUserCreatedId: forumUser.data.forumUserId
            }
            await createForumLike(forumLike)
        }

        refetchForumComments()
    }


    return (
        <>
            <Grid container spacing={0}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <FormTitleBarRich
                        title={"forum.comments"}
                        children={

                            <Grid container spacing={2}>
                                <Grid item>
                                    <Tooltip title={<FormattedMessage id="general.selectFilters" />}>
                                        <FilterListIcon style={{ color: "#FFFFFF", cursor: "pointer" }} fontSize="medium"
                                                               onClick={() => setDialogFilters(true)}
                                        />
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title={<FormattedMessage id="forum.topic" />}>
                                        <KeyboardBackspaceIcon style={{ color: "#FFFFFF", cursor: "pointer" }} fontSize="medium"
                                                               onClick={() => history.push(getForumTopicFormPath(forumTopicId))}
                                        />
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        }
                    />
                </Grid>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <ForumTopicCommentsList
                        forumComments={forumComments?.data}
                        onAddEdit={handleAddEditComment}
                        onDelete={handleDeleteComment}
                        onLike={handleLike}
                        forumComment={forumComment}
                        forumUser={forumUser?.data}
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

            <DialogFormFrame
                onClose={() => setDialogFilters(false)}
                title="general.selectFilters"
                open={dialogFilters}
            >
                <DialogFormForumCommentFilter
                    initialData={dialogFilters!}
                    onClose={() => setDialogFilters(false)}
                    onSubmit={handleSubmitFilters}
                    forumUsers={forumUsers?.data}
                />
            </DialogFormFrame>
        </>
    );
}
export default ForumTopicComments

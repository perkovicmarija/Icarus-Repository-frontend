import React, {useMemo, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {useHistory, useParams} from "react-router-dom";
import {usePagination} from "../../helpers/pagination";
import {getForumTopicCommentsPaginationPath, getForumTopicFormPath} from "../../consts/routePaths";
import {useGetForumUserByRepositoryUserQuery, useGetForumUsersQuery} from "../../redux/forum/forumUsers/forumUsersApi";
import {Grid, Tooltip} from "@mui/material";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import {FormattedMessage} from "react-intl";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ForumTopicCommentsList from "../../components/forum/ForumCommentsList";
import {
  ForumComment,
  useCreateUpdateForumCommentMutation,
  useDeleteForumCommentMutation,
  useGetForumCommentsPaginatedQuery
} from "../../redux/forum/forumComments/forumCommentsApi";
import {cloneDeep} from "lodash";
import {FiltersType, forumCommentsActions} from "../../redux/forum/forumComments/forumCommentsSlice";
import {
  ForumLike,
  useCreateForumLikeMutation,
  useDeleteForumLikeMutation
} from "../../redux/forum/forumLikes/forumLikesApi";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import DialogFormForumCommentFilter from "../../components/forum/DialogFormForumCommentFilter";
import FilterListIcon from '@mui/icons-material/FilterList';
import {handleNotify} from "../../helpers/utility";

const ForumComments = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { forumTopicId } = useParams<{forumTopicId: string}>();
  const userId = JSON.parse(localStorage.getItem("userId"))
  
  const initialForumComment = {
    forumCommentId: '',
    forumTopicId: forumTopicId,
    forumUserCreatedDisplayName: '',
    content: '',
    created: null,
    createdFormatted: '',
    forumLikes: [] as ForumLike[],
    parentCommentId: null,
    replies: [] as ForumComment[]
  }
  
  const [forumComment, setForumComment] = useState<ForumComment>(initialForumComment);
  const [commentReplyInputText, setCommentReplyInputText] = useState<string>("");
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
  const [createUpdateForumComment, { isLoading }] = useCreateUpdateForumCommentMutation();
  const [deleteForumComment] = useDeleteForumCommentMutation();
  
  const { data: forumUser } = useGetForumUserByRepositoryUserQuery(userId, {
    skip: !userId,
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
    const result = await createUpdateForumComment({...forumComment, forumUserCreatedDisplayName: forumUser.data.displayName}).unwrap();
    handleNotify(result)
    setForumComment(initialForumComment)
  }
  
  const handleDeleteComment = async (forumCommentId: string) => {
    await deleteForumComment(forumCommentId)
  }
  
  const handleCommentLike = async (forumComment: ForumComment) => {
    const existingLike: ForumLike = forumComment.forumLikes.find((like) => like.forumUserCreatedDisplayName === forumUser.data.displayName)
    
    if (existingLike) {
      await deleteForumLike(existingLike.forumLikeId)
    } else {
      let forumLike = {
        forumCommentId: forumComment.forumCommentId,
        forumUserCreatedDisplayName: forumUser.data.displayName
      }
      await createForumLike(forumLike)
    }
    
    refetchForumComments()
  }
  
  const handleForumReplyChange = ({ target: { name, value } }) => {
    setCommentReplyInputText(value)
  }
  
  const handleForumReplySubmit = async (forumComment: ForumComment) => {
    let viewModel = {
      forumTopicId: forumComment.forumTopicId,
      content: commentReplyInputText,
      parentCommentId: forumComment.forumCommentId,
      forumUserCreatedDisplayName: forumUser.data.displayName
    }
    await createUpdateForumComment(viewModel)
    
    setCommentReplyInputText(null)
  }
  
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <FormTitleBarRich
            title={"forum.comments"}
            children={
              
              <Grid container spacing={4}>
                <Grid item>
                  <Tooltip title={<FormattedMessage id="general.selectFilters" />}>
                    <FilterListIcon style={{ color: "#FFFFFF", cursor: "pointer" }}
                                    onClick={() => setDialogFilters(true)}
                    />
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title={<FormattedMessage id="forum.topic" />}>
                    <KeyboardBackspaceIcon style={{ color: "#FFFFFF", cursor: "pointer" }}
                                           onClick={() => history.push(getForumTopicFormPath(forumTopicId))}
                    />
                  </Tooltip>
                </Grid>
              </Grid>
            }
          />
        </Grid>
        
        <Grid item xs={12}>
          <ForumTopicCommentsList
            forumComments={forumComments?.data}
            onAddEdit={handleAddEditComment}
            onDelete={handleDeleteComment}
            onLike={handleCommentLike}
            forumComment={forumComment}
            forumUser={forumUser?.data}
            onForumCommentInputChange={handleForumCommentInputChange}
            commentReplyInputText={commentReplyInputText}
            onForumReplySubmit={handleForumReplySubmit}
            onForumReplyChange={handleForumReplyChange}
            paginationProps={{
              totalCount: forumComments?.meta.totalCount,
              page,
              rowsPerPage,
              onChangePage,
              onChangeRowsPerPage,
            }}
            loading={isLoading}
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
export default ForumComments

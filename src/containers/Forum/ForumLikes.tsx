import React, {useMemo, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {useHistory, useParams} from "react-router-dom";
import {usePagination} from "../../helpers/pagination";
import {FiltersType, forumLikesActions, initFilters} from "../../redux/forum/forumLikes/forumLikesSlice";
import {getForumTopicCommentsPaginationPath, getForumTopicLikesPaginationPath} from "../../consts/routePaths";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import {Grid, Paper, Tooltip} from "@mui/material";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import {FormattedMessage} from "react-intl";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useGetClientsQuery} from "../../redux/settings/clientsApi";
import {
  ForumLike,
  useDeleteForumLikeMutation,
  useGetForumLikesPaginatedQuery
} from "../../redux/forum/forumLikes/forumLikesApi";
import ForumLikesList from "../../components/forum/ForumLikesList";
import DialogFormForumLikeFilter from "../../components/forum/DialogFormForumLikeFilter";

const ForumLikes = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { forumTopicId } = useParams<{forumTopicId: string}>();
  const { forumCommentId } = useParams<{forumCommentId: string}>();
  
  const [dialogFilters, setDialogFilters] = useState<boolean>();
  
  const { page, rowsPerPage, storeRowsPerPage } = usePagination("forumLikes");
  const filters = useAppSelector((state) => state.ForumLikes.filters);
  const meta = useMemo(
    () => ({
      filters:{ ...filters,
        forumTopicId: (forumTopicId && forumCommentId) ? "" : forumTopicId,
        forumCommentId
      },
      pagination: {
        page,
        rowsPerPage,
      },
    }),
    [filters, forumTopicId, forumCommentId, page, rowsPerPage]
  );
  const { data: forumLikes, isFetching } = useGetForumLikesPaginatedQuery(meta);
  const [triggerDelete] = useDeleteForumLikeMutation();
  
  const { data: clients } = useGetClientsQuery();
  
  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(forumLikesActions.setFilters({ ...filters, ...newFilters }));
    history.push(getForumTopicLikesPaginationPath(forumTopicId, page, rowsPerPage));
  };
  
  const onChangePage = (newValue: number) => {
    history.push(getForumTopicLikesPaginationPath(forumTopicId, newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getForumTopicLikesPaginationPath(forumTopicId, page, newValue));
  };
  
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <FormTitleBarRich
            title={"forum.likes"}
            children={
              <Tooltip title={<FormattedMessage id="forum.topic" />}>
                <KeyboardBackspaceIcon style={{ color: "#FFFFFF", cursor: "pointer" }} fontSize="medium"
                                       onClick={() => history.push(getForumTopicCommentsPaginationPath(forumTopicId, 0, 25))}
                />
              </Tooltip>
            }
          />
        </Grid>
        
        <Grid item xs={12}>
          <Paper>
            <ForumLikesList<ForumLike>
              data={forumLikes?.data}
              onDelete={(payload) =>
                triggerDelete(payload.forumLikeId).unwrap()
              }
              //
              toolbarProps={{
                title: "",
                initFilters,
                filters,
                onFilterClick: setDialogFilters,
              }}
              paginationProps={{
                totalCount: forumLikes?.meta.totalCount,
                page,
                rowsPerPage,
                onChangePage,
                onChangeRowsPerPage,
              }}
              loading={isFetching}
            />
          </Paper>
        </Grid>
      
      </Grid>
      
      <DialogFormFrame
        onClose={() => setDialogFilters(false)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormForumLikeFilter
          initialData={dialogFilters!}
          onClose={() => setDialogFilters(false)}
          onSubmit={handleSubmitFilters}
          clients={clients?.data}
        />
      </DialogFormFrame>
    </>
  );
}
export default ForumLikes

import React, {useMemo, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {useHistory, useParams} from "react-router-dom";
import {usePagination} from "../../helpers/pagination";
import {FiltersType, forumTopicUsersActions, initFilters} from "../../redux/forum/forumUsers/forumTopicUsersSlice";
import {
  getForumRegistrationsPath,
  getForumTopicFormPath,
  getForumTopicSubscribersPaginationPath
} from "../../consts/routePaths";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import DialogFormForumUserFilter from "../../components/forum/DialogFormForumUserFilter";
import ForumTopicSubscribersList from "../../components/forum/ForumTopicSubscribersList";
import {
  ForumTopicUserJoined,
  useCreateForumTopicUserMutation,
  useDeleteForumTopicUserMutation,
  useGetForumTopicUsersPaginatedQuery
} from "../../redux/forum/forumUsers/forumTopicUsersApi";
import DialogFormForumTopicSubscriber from "../../components/forum/DialogFormForumTopicSubscriber";
import {useGetForumUsersQuery} from "../../redux/forum/forumUsers/forumUsersApi";
import {Grid, Paper, Tooltip} from "@mui/material";
import FormTitleBarRich from "../../components/core/Form/FormTitleBarRich";
import {FormattedMessage} from "react-intl";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useGetClientsQuery} from "../../redux/settings/clientsApi";
import {handleNotify} from "../../helpers/utility";

const ForumTopicSubscribers = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {forumTopicId} = useParams<{ forumTopicId: string }>();
  
  const [dialogAddEdit, setDialogAddEdit] = useState<ForumTopicUserJoined | {} | undefined>();
  const [dialogFilters, setDialogFilters] = useState<boolean>();
  
  const {page, rowsPerPage, storeRowsPerPage} = usePagination("forumTopicUsers");
  const filters = useAppSelector((state) => state.ForumTopicUsers.filters);
  const meta = useMemo(
    () => ({
      filters: {...filters, forumTopicId},
      pagination: {
        page,
        rowsPerPage,
      },
    }),
    [filters, forumTopicId, page, rowsPerPage]
  );
  const {data: forumTopics, isFetching} = useGetForumTopicUsersPaginatedQuery(meta);
  const [triggerDelete] = useDeleteForumTopicUserMutation();
  const [triggerAdd] = useCreateForumTopicUserMutation();
  
  const {data: forumUsers} = useGetForumUsersQuery(meta);
  
  const {data: clients} = useGetClientsQuery();
  
  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(forumTopicUsersActions.setFilters({...filters, ...newFilters}));
    history.push(getForumTopicSubscribersPaginationPath(forumTopicId, page, rowsPerPage));
  };
  
  const onChangePage = (newValue: number) => {
    history.push(getForumRegistrationsPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getForumRegistrationsPath(page, newValue));
  };
  
  const handleSubmit = async (payload) => {
    const displayName = payload.forumUser.displayName
    const result = await triggerAdd({displayName, forumTopicId})
    handleNotify(result?.data)
  }
  
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <FormTitleBarRich
            title={"forum.subscribers"}
            children={
              <Tooltip title={<FormattedMessage id="forum.topic"/>}>
                <KeyboardBackspaceIcon style={{color: "#FFFFFF", cursor: "pointer"}} fontSize="medium"
                                       onClick={() => history.push(getForumTopicFormPath(forumTopicId))}
                />
              </Tooltip>
            }
          />
        </Grid>
        
        <Grid item xs={12}>
          <Paper>
            <ForumTopicSubscribersList<ForumTopicUserJoined>
              data={forumTopics?.data}
              onEdit={setDialogAddEdit}
              onDelete={(payload) =>
                triggerDelete(payload.forumTopicUserJoinedId).unwrap()
                
              }
              //
              toolbarProps={{
                onAddClick: setDialogAddEdit,
                title: "",
                searchPlaceholder: "search.search",
                searchTextPropKey: "displayName",
                initFilters,
                filters,
                onFilterClick: setDialogFilters,
                onSearchSubmit: handleSubmitFilters,
              }}
              paginationProps={{
                totalCount: forumTopics?.meta.totalCount,
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
        onClose={() => setDialogAddEdit(undefined)}
        title={"action.add"}
        open={dialogAddEdit}
      >
        <DialogFormForumTopicSubscriber
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={handleSubmit}
          forumUsers={forumUsers?.data}
        />
      </DialogFormFrame>
      
      <DialogFormFrame
        onClose={() => setDialogFilters(false)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormForumUserFilter
          initialData={dialogFilters!}
          onClose={() => setDialogFilters(false)}
          onSubmit={handleSubmitFilters}
          clients={clients?.data}/>
      </DialogFormFrame>
    </>
  );
}
export default ForumTopicSubscribers

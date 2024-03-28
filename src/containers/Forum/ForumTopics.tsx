import ForumTopicsList from "../../components/forum/ForumTopicsList";
import {
    ForumTopic,
    useDeleteForumTopicMutation,
    useGetForumTopicsPaginatedQuery
} from "../../redux/forum/forumTopics/forumTopicsApi";
import {usePagination} from "../../helpers/pagination";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import React, {useMemo, useState} from "react";
import {getForumTopicFormPath, getForumTopicsPaginationPath} from "../../consts/routePaths";
import {FiltersType, forumTopicsActions, initFilters} from "../../redux/forum/forumTopics/forumTopicsSlice";
import {useHistory} from "react-router-dom";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import DialogFormForumTopicFilter from "../../components/forum/DialogFormForumTopicFilter";
import {
    useCreateUpdateForumUserMutation,
    useGetForumUserByDisplayNameQuery
} from "../../redux/forum/forumUsers/forumUsersApi";
import {Grid, Paper} from "@mui/material";
import Button from "@mui/material/Button";
import IntlMessages from "../../components/core/IntlMessages";
import {useGetUserQuery} from "../../redux/user/usersApi";

const ForumTopics = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [dialogFilters, setDialogFilters] = useState<boolean>(false);

    const { page, rowsPerPage, storeRowsPerPage } = usePagination("forumTopics");

    const filters = useAppSelector((state) => state.ForumTopics.filters);
    const meta = useMemo(
        () => ({
            filters,
            pagination: {
                page,
                rowsPerPage,
            },
        }),
        [filters, page, rowsPerPage]
    )

    const { data: user } = useGetUserQuery(JSON.parse(localStorage.getItem("userId")))

    const username = user?.data.username;

    const { data: forumUser } = useGetForumUserByDisplayNameQuery(username, {
        skip: !username,
    })
    const [triggerAddEdit] = useCreateUpdateForumUserMutation();

    const { data: forumTopics, isFetching } = useGetForumTopicsPaginatedQuery(meta, {
        skip: !forumUser?.data
    });
    const [triggerDelete] = useDeleteForumTopicMutation();

    const handleAddEditTopic = async (forumTopicId: string) => {
        history.push(getForumTopicFormPath(forumTopicId));
    }

    const handleSubmitFilters = (newFilters: FiltersType) => {
        dispatch(forumTopicsActions.setFilters({ ...filters, ...newFilters }));
        history.push(getForumTopicsPaginationPath(page, rowsPerPage));
    };
    // PAGINATION
    const onChangePage = (newValue: number) => {
        history.push(getForumTopicsPaginationPath(newValue, rowsPerPage));
    };
    const onChangeRowsPerPage = (newValue: number) => {
        storeRowsPerPage(newValue);
        history.push(getForumTopicsPaginationPath(page, newValue));
    };

    return (
        <>
            {forumUser?.data ?
                <Paper>
                    <ForumTopicsList
                        data={forumTopics?.data}
                        loading={isFetching}
                        onDelete={(payload: ForumTopic) =>
                            triggerDelete(payload.forumTopicId).unwrap()
                        }
                        onEdit={handleAddEditTopic}
                        toolbarProps={{
                            title: "forum.topics",
                            searchPlaceholder: "search.search",
                            searchTextPropKey: "displayName",
                            initFilters,
                            filters,
                            onAddClick: () => handleAddEditTopic(""),
                            onFilterClick: setDialogFilters,
                            onSearchSubmit: handleSubmitFilters,
                        }}
                        paginationProps={{
                            totalCount: forumTopics?.meta?.totalCount,
                            page,
                            rowsPerPage,
                            onChangePage,
                            onChangeRowsPerPage,
                        }}
                    />
                </Paper>
            :
                <Grid container spacing={4}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                        <h4><IntlMessages id="forum.user.create.text" /></h4>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" onClick={() => triggerAddEdit({...forumUser, userCreated: user?.data})}><IntlMessages id="forum.user.create" /></Button>
                    </Grid>
                </Grid>
            }



            <DialogFormFrame
                onClose={() => setDialogFilters(false)}
                title="general.selectFilters"
                open={dialogFilters}
            >
                <DialogFormForumTopicFilter
                    initialData={dialogFilters!}
                    onClose={() => setDialogFilters(false)}
                    onSubmit={handleSubmitFilters}
                />
            </DialogFormFrame>

        </>
    )
}


export default ForumTopics

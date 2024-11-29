import ForumUsersList from "../../components/forum/ForumUsersList";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { useMemo, useState } from "react";
import { usePagination } from "../../helpers/pagination";
import { useGetClientsQuery } from "../../redux/settings/clientsApi";
import { getForumRegistrationsPath } from "../../consts/routePaths";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import { isEmpty } from "lodash";
import {
  ForumUser,
  useCreateUpdateForumUserMutation,
  useGetForumUsersPaginatedQuery,
} from "../../redux/forum/forumUsers/forumUsersApi";
import {
  FiltersType,
  forumUsersActions,
  initFilters,
} from "../../redux/forum/forumUsers/forumUsersSlice";
import DialogFormForumUser from "../../components/forum/DialogFormForumUser";
import DialogFormForumUserFilter from "../../components/forum/DialogFormForumUserFilter";
import { useGetUserQuery } from "../../redux/user/usersApi";
import { handleNotify } from "../../helpers/utility";
import { Paper } from "@mui/material";

const ForumUsers = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [dialogAddEdit, setDialogAddEdit] = useState<
    ForumUser | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState<boolean>();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("forumUsers");
  const filters = useAppSelector((state) => state.ForumUsers.filters);
  const meta = useMemo(
    () => ({
      filters,
      pagination: {
        page,
        rowsPerPage,
      },
    }),
    [filters, page, rowsPerPage]
  );
  const { data, isFetching, refetch } = useGetForumUsersPaginatedQuery(meta);
  const [triggerAddEdit] = useCreateUpdateForumUserMutation();

  const { data: user } = useGetUserQuery(
    JSON.parse(localStorage.getItem("userId"))
  );

  //
  const { data: clientsResponse } = useGetClientsQuery();
  const activeClients = useMemo(
    () => clientsResponse?.data.filter((item) => !item.deactivated) ?? [],
    [clientsResponse]
  );
  //

  const handleSearchSubmit = (newFilters: FiltersType): void => {
    dispatch(forumUsersActions.setFilters({ ...filters, ...newFilters }));
    refetch();
  };

  const handleSubmitFilters = (newFilters: FiltersType): void => {
    dispatch(forumUsersActions.setFilters({ ...filters, ...newFilters }));
    history.push(getForumRegistrationsPath(page, rowsPerPage));
  };

  const onChangePage = (newValue: number): void => {
    history.push(getForumRegistrationsPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number): void => {
    storeRowsPerPage(newValue);
    history.push(getForumRegistrationsPath(page, newValue));
  };

  return (
    <>
      <Paper>
        <ForumUsersList<ForumUser>
          data={data?.data}
          onEdit={setDialogAddEdit}
          //
          toolbarProps={{
            onAddClick: setDialogAddEdit,
            title: "",
            searchPlaceholder: "search.search",
            searchTextPropKey: "displayName",
            initFilters,
            filters,
            onFilterClick: setDialogFilters,
            onSearchSubmit: handleSearchSubmit,
          }}
          paginationProps={{
            totalCount: data?.meta?.totalCount,
            page,
            rowsPerPage,
            onChangePage,
            onChangeRowsPerPage,
          }}
          loading={isFetching}
        />
      </Paper>

      <DialogFormFrame
        onClose={() => setDialogAddEdit(undefined)}
        title={isEmpty(dialogAddEdit) ? "general.create" : "general.update"}
        open={dialogAddEdit}
      >
        <DialogFormForumUser
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload: ForumUser): Promise<void> =>
            triggerAddEdit({ ...payload, userCreated: user?.data })
              .unwrap()
              .then((result) => {
                handleNotify(result);
              })
          }
          clients={activeClients}
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
          clients={clientsResponse?.data}
        />
      </DialogFormFrame>
    </>
  );
};
export default ForumUsers;

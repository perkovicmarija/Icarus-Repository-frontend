import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { usePagination } from "../../../helpers/pagination";
import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import { useSimpleGetAll } from "../../../redux/utils";
//
import UserList from "./UserList";
import DialogFormUserFilters from "../../../components/user/DialogFormUserFilters";
import { getUsersPath } from "../../../consts/routePaths";
import {
  FiltersType,
  User,
  usersActions,
} from "../../../redux/user/usersSlice";
import UserForm from "../../../components/user/UserForm";
import { initFilters } from "../../../redux/user/usersSlice";
import { rolesActions } from "../../../redux/user/rolesSlice";
import {
  useAddEditUserMutation,
  useDeleteUserMutation,
  useGetUsersPaginatedQuery,
} from "../../../redux/user/usersApi";

function Users() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [dialogAddEdit, setDialogAddEdit] = useState<User | {} | undefined>();
  const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("users");
  const filters = useAppSelector((state) => state.Users.filters);
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
  const { data, isFetching } = useGetUsersPaginatedQuery(meta);
  const [triggerDelete] = useDeleteUserMutation();
  const [triggerAddEdit] = useAddEditUserMutation();

  //
  const userRoles = useSimpleGetAll(rolesActions.getAll);
  //

  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(usersActions.setFilters({ ...filters, ...newFilters }));
    history.push(getUsersPath(0));
  };
  // PAGINATION
  const onChangePage = (newValue: number) => {
    history.push(getUsersPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getUsersPath(page, newValue));
  };

  return (
    <>
      <UserList<User>
        data={data?.data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) => triggerDelete(payload.userId).unwrap()}
        //
        toolbarProps={{
          onAddClick: () => setDialogAddEdit({}),
          title: "form.users",
          searchPlaceholder: "search.byEmail",
          searchTextPropKey: "userSearch",
          initFilters,
          filters,
          onFilterClick: setDialogFilters,
          onSearchSubmit: handleSubmitFilters,
        }}
        paginationProps={{
          totalCount: data?.meta.totalCount,
          page,
          rowsPerPage,
          onChangePage,
          onChangeRowsPerPage,
        }}
        loading={isFetching}
      />

      <DialogFormFrame
        onClose={() => setDialogAddEdit(undefined)}
        title={"form.user"}
        open={dialogAddEdit}
      >
        <UserForm
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload) => triggerAddEdit(payload).unwrap()}
          userRoles={userRoles}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogFilters(undefined)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormUserFilters
          initialData={dialogFilters!}
          onClose={() => setDialogFilters(undefined)}
          onSubmit={handleSubmitFilters}
          userRoles={userRoles}
        />
      </DialogFormFrame>
    </>
  );
}

export default Users;

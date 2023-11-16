import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { usePagination } from "../../../helpers/pagination";
import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
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

function Users() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const data = useAppSelector((state) => state.Users.data);
  const totalCount = useAppSelector((state) => state.Users.meta.totalCount);
  const filters = useAppSelector((state) => state.Users.filters);

  const [dialogAddEdit, setDialogAddEdit] = useState<User | {} | undefined>();
  const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("users");

  const [loading, setLoading] = useState(false);

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

  useLayoutEffect(() => {
    setLoading(true);
    dispatch(usersActions.getData(meta)).finally(() => setLoading(false));
  }, [meta]);

  //
  const [userRoles, setUserRoles] = useState<any[]>([]);
  useEffect(() => {
    dispatch(rolesActions.getAll(undefined)).then((response) => {
      setUserRoles(response.payload.data);
    });
  }, []);
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
        data={data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) =>
          dispatch(usersActions.deleteItem({ payload, meta }))
        }
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
          totalCount,
          page,
          rowsPerPage,
          onChangePage,
          onChangeRowsPerPage,
        }}
        loading={loading}
      />

      <DialogFormFrame
        onClose={() => setDialogAddEdit(undefined)}
        title={"form.user"}
        open={dialogAddEdit}
      >
        <UserForm
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload) => {
            return dispatch(usersActions.addEditItem({ payload, meta }));
          }}
          userRoles={userRoles}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogFilters(undefined)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormUserFilters
          initialData={dialogFilters}
          onClose={() => setDialogFilters(undefined)}
          onSubmit={handleSubmitFilters}
          userRoles={userRoles}
        />
      </DialogFormFrame>
    </>
  );
}

export default Users;

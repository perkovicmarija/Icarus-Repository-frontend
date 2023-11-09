import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { usePagination } from "../../../helpers/pagination";
import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
//
import UserGroupList from "./UserGroupList";
import DialogFormUserGroup from "../../../components/user/DialogFormUserGroup";
import { getUserGroupsPath } from "../../../consts/routePaths";
import {
  FiltersType,
  UserGroup,
  userGroupsActions,
} from "../../../redux/user/userGroupsSlice";
//
import { User } from "../../../redux/user/usersSlice";
import UserApi from "../../../api/UserApi";

function UserGroups() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const data = useAppSelector((state) => state.UserGroups.data);
  const totalCount = useAppSelector(
    (state) => state.UserGroups.meta.totalCount
  );
  const filters = useAppSelector((state) => state.UserGroups.filters);

  const [dialogAddEdit, setDialogAddEdit] = useState<
    UserGroup | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("userGroups");

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
    dispatch(userGroupsActions.getData(meta)).finally(() => setLoading(false));
  }, [meta]);

  //
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    UserApi.getAll().then((response) => setUsers(response.data));
  }, []);
  //

  /* const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(userGroupsActions.setFilters({ ...filters, ...newFilters }));
    history.push(getUserGroupsPath(0));
  }; */
  // PAGINATION
  const onChangePage = (newValue: number) => {
    history.push(getUserGroupsPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getUserGroupsPath(page, newValue));
  };

  /* const handleUserGroupDialogDetailsMultiSelectChange = (event) => {
    let selectedUsers = [];
    let lastSelected = event.target.value[event.target.value.length - 1];
    if (lastSelected === "SelectAll") {
      users.forEach((user) => {
        selectedUsers.push({
          user,
        });
      });
    } else if (lastSelected === "DeselectAll") {
      selectedUsers = [];
    } else {
      const selectedUsersId = event.target.value;
      for (let i = 0, l = selectedUsersId.length; i < l; i++) {
        const userObject = users.find(
          (user: any) => user.userId === selectedUsersId[i]
        );
        selectedUsers.push({
          user: userObject,
        });
      }
    }
    let userGroupClone = cloneDeep(userGroup);
    userGroupClone.userGroupJoined = selectedUsers;
    setUserGroup(userGroupClone);
  }; */

  return (
    <>
      <UserGroupList<UserGroup>
        data={data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) => dispatch(userGroupsActions.deleteItem(payload))}
        //
        toolbarProps={{
          onAddClick: () => setDialogAddEdit({}),
          title: "form.userGroups",
          /* filters,
          onFilterClick: setDialogFilters,
          onSearchSubmit: handleSubmitFilters, */
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
        title="User group"
        open={dialogAddEdit}
      >
        <DialogFormUserGroup
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload) => {
            return dispatch(userGroupsActions.addEditItem({ payload, meta }));
          }}
          users={users}
        />
      </DialogFormFrame>
    </>
  );
}

export default UserGroups;

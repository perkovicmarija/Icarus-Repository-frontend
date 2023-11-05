import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { cloneDeep } from "lodash";

import DialogFormUserGroup from "../../../components/user/DialogFormUserGroup";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import UserGroupList from "./UserGroupList";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import * as userGroupActions from "../../../redux/user/group/userGroupActions";
import * as userAction from "../../../redux/user/userActions";
import { getUserGroupsPath } from "../../../consts/routePaths";
import { useHistory } from "react-router-dom";

function UserGroups({
  page,
  rowsPerPage,
  userGroupActions,
  userAction,
  userGroups,
  totalCount,
  users,
}: any) {
  const history = useHistory();
  const [userGroup, setUserGroup] = useState({
    userGroupJoined: [],
  });
  const [userGroupIdForDelete, setUserGroupIdForDelete] = useState(undefined);
  const [dialogUserGroupDetailsOpen, setDialogUserGroupDetailsOpen] =
    useState(false);
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);

  useEffect(() => {
    const viewModel = {
      page,
      rowsPerPage,
    };
    userGroupActions.loadAllPagination(viewModel);

    userGroupActions.loadAllPagination(viewModel);
    userAction.loadAll();
  }, []);

  const handleChangePage = (e, page: number) => {
    history.push(getUserGroupsPath(page, rowsPerPage));
  };

  const handleChangeRowsPerPage = (e) => {
    history.push(getUserGroupsPath(page, e.target.value));
  };

  const handleGroupNewClick = (e) => {
    let userGroup = {
      userGroupId: undefined,
      name: undefined,
      userGroupJoined: [],
    };
    setUserGroup(userGroup);
    setDialogUserGroupDetailsOpen(true);
  };

  const handleGroupEdit = (e, userGroup: any) => {
    setUserGroup(userGroup);
    setDialogUserGroupDetailsOpen(true);
  };

  const handleGroupDelete = (e, role: any) => {
    setUserGroupIdForDelete(role.userGroupId);
    setDialogWarningOpen(true);
  };

  const handleUserGroupDetailsInputChange = ({
    target: { name, value },
  }: any) => {
    let userGroupClone = cloneDeep(userGroup);
    userGroupClone[name] = value;
    setUserGroup(userGroupClone);
  };

  const handleUserGroupDialogDetailsClose = () => {
    setDialogUserGroupDetailsOpen(false);
  };

  const handleUserGroupDialogDetailsSubmit = () => {
    setDialogUserGroupDetailsOpen(false);

    if (userGroup.userGroupId) {
      let viewModel = {
        requestBody: userGroup,
        params: {
          page,
          rowsPerPage,
        },
      };
      userGroupActions.update(viewModel);
    } else {
      userGroupActions.create(userGroup);
    }
  };

  const handleDeleteUserGroupConfirmed = () => {
    if (userGroupIdForDelete) {
      let viewModel = {
        userGroupId: userGroupIdForDelete,
      };
      userGroupActions.deleteAction(viewModel);
    }

    setDialogWarningOpen(false);
  };

  const handleDeleteUserGroupClose = () => {
    setDialogWarningOpen(false);
  };

  const handleUserGroupDialogDetailsMultiSelectChange = (event) => {
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
  };

  return (
    <>
      <UserGroupList
        data={userGroups}
        totalCount={totalCount}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        onAddClick={handleGroupNewClick}
        onEdit={handleGroupEdit}
        onDelete={handleGroupDelete}
      />

      <DialogFormFrame
        onClose={handleUserGroupDialogDetailsClose}
        title="User groups"
        open={dialogUserGroupDetailsOpen}
      >
        <DialogFormUserGroup
          onClose={handleUserGroupDialogDetailsClose}
          onSubmit={handleUserGroupDialogDetailsSubmit}
          onInputChange={handleUserGroupDetailsInputChange}
          onMultiSelectChange={handleUserGroupDialogDetailsMultiSelectChange}
          userGroup={userGroup}
          users={users}
        />
      </DialogFormFrame>

      <DialogDeleteWarning
        open={dialogWarningOpen}
        text="Are you sure you want to delete this item?"
        onDelete={handleDeleteUserGroupConfirmed}
        onClose={handleDeleteUserGroupClose}
      />
    </>
  );
}

function mapStateToProps(state, ownProps) {
  let page = 0;
  let rowsPerPage = 25;
  if (ownProps.match.params.page) {
    page = parseInt(ownProps.match.params.page);
  }
  if (ownProps.match.params.rowsPerPage) {
    rowsPerPage = parseInt(ownProps.match.params.rowsPerPage);
  }
  return {
    userGroups: state.UserGroup.userGroupsPagination,
    totalCount: state.UserGroup.totalCount,
    users: state.User.users,
    page: page,
    rowsPerPage: rowsPerPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userGroupActions: bindActionCreators(userGroupActions, dispatch),
    userAction: bindActionCreators(userAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGroups);

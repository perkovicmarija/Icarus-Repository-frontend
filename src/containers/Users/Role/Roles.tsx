import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import { bindActionCreators } from "redux";
import * as userRoleActions from "../../../redux/user/role/userRoleActions";
import * as authorityActions from "../../../redux/authority/authorityActions";
import RoleList from "./RoleList";

import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import DialogFormUserRole from "../../../components/user/DialogFormUserRole";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import { getUserRolesPath } from "../../../consts/routePaths";
import { useHistory } from "react-router-dom";

function Roles({
  page,
  rowsPerPage,
  userRoleActions,
  authorities,
  authorityActions,
  roles,
  totalCount,
}) {
  const history = useHistory();
  const [userRole, setUserRole] = useState({
    userRoleAuthorityJoined: [],
  });
  const [userRoleIdForDelete, setUserRoleIdForDelete] = useState(undefined);
  const [dialogUserRoleDetails, setDialogUserRoleDetailsOpen] =
    useState(false);
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);

  useEffect(() => {
    const viewModel = {
      page,
      rowsPerPage,
    };
    userRoleActions.loadAllPagination(viewModel);
    if (authorities.length === 0) {
      authorityActions.loadAll();
    }
  }, []);

  const handleChangePage = (e, page) => {
    history.push(getUserRolesPath(page, rowsPerPage));
  };

  const handleChangeRowsPerPage = (e) => {
    history.push(getUserRolesPath(page, e.target.value));
  };

  const handleRoleNewClick = () => {
    let userRole = {
      userRoleId: undefined,
      name: undefined,
      userRoleAuthorityJoined: [],
      userRoleCsdbTypeJoined: [],
    };
    setUserRole(userRole);
    setDialogUserRoleDetailsOpen(true);
  };

  const handleRoleEdit = (e, role) => {
    setUserRole(role);
    setDialogUserRoleDetailsOpen(true);
  };

  const handleRoleDelete = (e, role) => {
    setUserRoleIdForDelete(role.userRoleId);
    setDialogWarningOpen(true);
  };

  const handleUserRoleDetailsInputChange = ({ target: { name, value } }) => {
    let userRoleClone = cloneDeep(userRole);
    userRoleClone[name] = value;
    setUserRole(userRoleClone);
  };

  const handleUserRoleDialogDetailsClose = () => {
    setDialogUserRoleDetailsOpen(false);
  };

  const handleUserRoleDialogDetailsSubmit = () => {
    setDialogUserRoleDetailsOpen(false);
    if (userRole.userRoleId) {
      let viewModel = {
        requestBody: userRole,
        params: {
          page,
          rowsPerPage,
        },
      };
      userRoleActions.update(viewModel);
    } else {
      userRoleActions.create(userRole);
    }
  };

  const handleDeleteUserRoleConfirmed = () => {
    if (userRoleIdForDelete) {
      let viewModel = {
        userRoleId: userRoleIdForDelete,
        page,
        rowsPerPage,
      };
      userRoleActions.deleteAction(viewModel);
      setDialogWarningOpen(false);
    }
  };

  const handleDeleteUserRoleClose = () => {
    setDialogWarningOpen(false);
  };

  const handleUserRoleDialogDetailsMultiSelectChange = (event) => {
    let selectedAuthorities = [];
    let lastSelected = event.target.value[event.target.value.length - 1];
    if (lastSelected === "SelectAll") {
      authorities.forEach((authority) => {
        selectedAuthorities.push({
          authority,
        });
      });
    } else if (lastSelected === "DeselectAll") {
      selectedAuthorities = [];
    } else {
      const selectedAuthoritiesIds = event.target.value;
      for (let i = 0, l = selectedAuthoritiesIds.length; i < l; i++) {
        const authorityObject = authorities.find(
          (authority) => authority.authorityId === selectedAuthoritiesIds[i]
        );
        selectedAuthorities.push({
          authority: authorityObject,
        });
      }
    }
    let userRoleClone = cloneDeep(userRole);
    userRoleClone.userRoleAuthorityJoined = selectedAuthorities;
    setUserRole(userRoleClone);
  };

  return (
    <>
      <RoleList
        data={roles}
        title="form.userRoles"
        totalCount={totalCount}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        onAddClick={handleRoleNewClick}
        onEdit={handleRoleEdit}
        onDelete={handleRoleDelete}
      />

      <DialogFormFrame
        onClose={handleUserRoleDialogDetailsClose}
        title="userRole.role"
        open={dialogUserRoleDetails}
      >
        <DialogFormUserRole
          onClose={handleUserRoleDialogDetailsClose}
          onSubmit={handleUserRoleDialogDetailsSubmit}
          onInputChange={handleUserRoleDetailsInputChange}
          onMultiSelectChange={handleUserRoleDialogDetailsMultiSelectChange}
          userRole={userRole}
          authorities={authorities}
        />
      </DialogFormFrame>

      <DialogDeleteWarning
        open={dialogWarningOpen}
        text="Are you sure you want to delete this item?"
        onDelete={handleDeleteUserRoleConfirmed}
        onClose={handleDeleteUserRoleClose}
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
    roles: state.UserRole.userRolesPagination,
    totalCount: state.UserRole.totalCount,
    authorities: state.Authority.authorities,
    page: page,
    rowsPerPage: rowsPerPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userRoleActions: bindActionCreators(userRoleActions, dispatch),
    authorityActions: bindActionCreators(authorityActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);

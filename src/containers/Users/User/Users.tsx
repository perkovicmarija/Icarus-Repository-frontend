import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Paper } from "@mui/material";

import UserList from "./UserList";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import DialogFormUserFilters from "../../../components/user/DialogFormUserFilters";
import * as userActions from "../../../redux/user/userActions";
import * as userRoleActions from "../../../redux/user/role/userRoleActions";
import { getUsersPath, getUserDetailsPath } from "../../../consts/routePaths";
import { useHistory } from "react-router-dom";

function Users({
  filters,
  page,
  rowsPerPage,
  userActions,
  userRoles,
  userRoleActions,
  users,
  totalCount,
}: any) {
  const [dialogFilterOpen, setDialogFilterOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const viewModel = {
      filters,
      pagination: {
        page,
        rowsPerPage,
      },
    };

    userActions.loadAllPagination(viewModel);

    if (userRoles.length === 0) {
      userRoleActions.loadAll();
    }
  }, []);

  const onChangePage = (event, page) => {
    history.push(getUsersPath(page, rowsPerPage));
  };

  const onChangeRowsPerPage = (event) => {
    history.push(getUsersPath(page, event.target.value));
  };

  const handleFilterSubmit = (newFilters) => {
    const viewModel = {
      filters: { ...filters, ...newFilters },
      pagination: {
        page,
        rowsPerPage,
      },
    };
    userActions.loadAllPagination(viewModel);
    userActions.setFilters({ ...filters, ...newFilters });
  };

  const handleUserClick = (event, id) => {
    history.push(getUserDetailsPath(id));
  };

  const handleUserNewClick = (event, route) => {
    history.push(getUserDetailsPath("-1"));
  };

  return (
    <Paper>
      <UserList
        data={users}
        totalCount={totalCount}
        onEdit={handleUserClick}
        onAddClick={handleUserNewClick}
        onSearchSubmit={handleFilterSubmit}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onFilterClick={() => setDialogFilterOpen(filters)}
        filters={filters}
        page={page}
        rowsPerPage={rowsPerPage}
      />

      <DialogFormFrame
        onClose={() => setDialogFilterOpen(false)}
        title="Select filters"
        open={dialogFilterOpen}
      >
        <DialogFormUserFilters
          initialData={dialogFilterOpen}
          onClose={() => setDialogFilterOpen(false)}
          onSubmit={handleFilterSubmit}
          userRoles={userRoles}
        />
      </DialogFormFrame>
    </Paper>
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
    users: state.User.usersPagination,
    userRoles: state.UserRole.userRoles,
    totalCount: state.User.totalCount,
    filters: state.User.filters,
    page: page,
    rowsPerPage: rowsPerPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    userRoleActions: bindActionCreators(userRoleActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

import React from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination,
  Tooltip,
  IconButton,
} from "@mui/material";
import { NoteAdd } from "@mui/icons-material";

import IntlMessages from "../../../components/core/IntlMessages";
import FilterIconCustom from "../../../components/core/FilterIconCustom";
import { TableContainer2 } from "../../../components/core/Table/TableContainer2";
import TableToolbar2 from "../../../components/core/Table/TableToolbar2";
import { initFilters } from "../../../redux/user/userReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  tableRow: {
    cursor: "pointer",
  },
}));

const columnData = [{ label: "form.name" }, { label: "form.email" }];

function UserList(props) {
  const classes = useStyles();

  const {
    users,
    totalCount,
    page,
    rowsPerPage,
    onUserClick,
    onUserNewClick,
    onPageChange,
    onRowsPerPageChange,
    onUserFilterClick,
    filtersActive,
    searchValue,
    onInputSearchChange,
    onSearchSubmit,
  } = props;

  return (
    <div className={classes.root}>
      <TableToolbar2
        title="form.users"
        //
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder="search.byEmail"
        searchTextPropKey="userSearch"
        //
        onAddClick={onUserNewClick}
        //
        onFilterClick={onUserFilterClick}
        initFilters={initFilters}
      />
      <TableContainer2
        headerProps={{
          columnData,
        }}
        paginationProps={{
          totalCount,
          rowsPerPage,
          page,
          onPageChange,
          onRowsPerPageChange,
        }}
      >
        {users.map((user) => {
          return (
            <TableRow
              className={classes.tableRow}
              key={user.userId}
              onClick={(event) => onUserClick(event, user.userId)}
              hover={true}
            >
              <TableCell>{user.surname + " " + user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          );
        })}
      </TableContainer2>
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};
export default UserList;

import React from "react";

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
import { Edit, Delete, NoteAdd } from "@mui/icons-material";
import PropTypes from "prop-types";
import IntlMessages from "../../../components/core/IntlMessages";
import { TableContainer2 } from "../../../components/core/Table/TableContainer2";
import TableToolbar2 from "../../../components/core/Table/TableToolbar2";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    cursor: "pointer",
  },
}));

const columnData = [
  { id: "name", numeric: false, disablePadding: false, label: "general.name" },
];

function RoleList(props) {
  const classes = useStyles();

  const {
    roles,
    totalCount,
    page,
    rowsPerPage,
    onChangePage,
    onChangeRowsPerPage,
    onRoleNewClick,
    onRoleEdit,
    onRoleDelete,
  } = props;

  return (
    <div>
      <TableToolbar2
        title="form.userRoles"
        //
        onAddClick={onRoleNewClick}
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
        {roles.map((role) => {
          return (
            <TableRow
              className={classes.tableRow}
              key={role.userRoleId}
              hover={true}
            >
              <TableCell>{role.name}</TableCell>
              <TableCell className="nostretch">
                <Tooltip title="Edit">
                  <div className="d-inline">
                    <IconButton
                      aria-label="Edit"
                      onClick={(event) => onRoleEdit(event, role)}
                    >
                      <Edit />
                    </IconButton>
                  </div>
                </Tooltip>
                <Tooltip title="Delete">
                  <>
                    <div className="d-inline">
                      <IconButton
                        aria-label="Delete"
                        onClick={(event) => onRoleDelete(event, role)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </>
                </Tooltip>
              </TableCell>
            </TableRow>
          );
        })}
      </TableContainer2>
    </div>
  );
}

RoleList.propTypes = {
  roles: PropTypes.array.isRequired,
};
export default RoleList;

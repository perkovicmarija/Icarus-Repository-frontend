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
import IntlMessages from "../../../components/core/IntlMessages";
import TableToolbar2 from "../../../components/core/Table/TableToolbar2";
import { TableContainer2 } from "../../../components/core/Table/TableContainer2";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    cursor: "pointer",
  },
}));

const columnData = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "general.groupName",
  },
  {
    id: "number",
    numeric: false,
    disablePadding: false,
    label: "general.number",
  },
];

function UserGroupList({
  userGroups,
  totalCount,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onGroupNewClick,
  onGroupEdit,
  onGroupDelete,
}) {
  const classes = useStyles();

  return (
    <div>
      <TableToolbar2 title="form.userGroups" onAddClick={onGroupNewClick} />

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
        {userGroups.map((item) => {
          return (
            <TableRow
              className={classes.tableRow}
              key={item.userGroupId}
              hover={true}
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.numberOfParticipants}</TableCell>
              <TableCell className="nostretch">
                <Tooltip title="Edit">
                  <>
                    <div className="d-inline">
                      <IconButton
                        aria-label="Edit"
                        onClick={(event) => onGroupEdit(event, item)}
                      >
                        <Edit />
                      </IconButton>
                    </div>
                  </>
                </Tooltip>
                <Tooltip title="Delete">
                  <>
                    <div className="d-inline">
                      <IconButton
                        aria-label="Delete"
                        onClick={(event) => onGroupDelete(event, item)}
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
  
export default UserGroupList;

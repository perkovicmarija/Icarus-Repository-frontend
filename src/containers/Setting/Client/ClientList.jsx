import React from "react";

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import IntlMessages from "../../../components/core/IntlMessages";
import { Delete, Edit, NoteAdd } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { TableContainer2 } from "../../../components/core/Table/TableContainer2";
import TableToolbar2 from "../../../components/core/Table/TableToolbar2";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    cursor: "pointer",
  },
}));

const columnData = [
  { id: "name", numeric: false, disablePadding: false, label: "general.name" },
  {
    id: "abbreviation",
    numeric: false,
    disablePadding: false,
    label: "general.abbreviation",
  },
];

const ClientList = (props) => {
  const classes = useStyles();

  const {
    clients,
    onSearchSubmit,
    onNewClientClick,
    onClientEdit,
    onClientDelete,
    page,
    rowsPerPage,
    totalCount,
    onChangePage,
    onChangeRowsPerPage,
  } = props;

  return (
    <>
      <TableToolbar2
        title="form.clients"
        //
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder={"search.byName"}
        searchTextPropKey="clientSearch"
        //
        onAddClick={onNewClientClick}
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
        {clients
          .filter((client) => !client.deactivated)
          .map((client) => {
            return (
              <TableRow
                className={classes.tableRow}
                key={client.clientId}
                hover={true}
              >
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.abbreviation}</TableCell>
                <TableCell className="nostretch">
                  <Tooltip title="Edit">
                    <>
                      <div className="d-inline">
                        <IconButton
                          aria-label="Edit"
                          onClick={(event) => onClientEdit(event, client)}
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
                          onClick={(event) => onClientDelete(event, client)}
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
    </>
  );
};

ClientList.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default ClientList;

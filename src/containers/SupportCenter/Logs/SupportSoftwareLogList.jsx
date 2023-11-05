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
import FilterIconCustom from "../../../components/core/FilterIconCustom";
import { TableContainer2 } from "../../../components/core/Table/TableContainer2";
import TableToolbar2 from "../../../components/core/Table/TableToolbar2";

const useStyles = makeStyles((theme) => ({
  tableRow: {
    cursor: "pointer",
  },
}));

const columnData = [
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "general.title",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "general.description",
  },
  {
    id: "clients",
    numeric: false,
    disablePadding: false,
    label: "form.clients",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "support.dateOfLog",
  },
];

const SupportSoftwareLogList = (props) => {
  const classes = useStyles();

  const {
    softwareLogs,
    onSearchSubmit,
    onNewSoftwareLogClick,
    onSoftwareLogEdit,
    onSoftwareLogDelete,
    page,
    rowsPerPage,
    totalCount,
    onChangePage,
    onChangeRowsPerPage,
    onUserFilterClick,
    selectedClients,
  } = props;

  return (
    <div>
      <TableToolbar2
        title="support.softwareLogs"
        //
        filters={filters}
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder="search.search"
        searchTextPropKey="softwareLogSearch"
        //
        onAddClick={onNewSoftwareLogClick}
        //
        initFilters={{}}
        onFilterClick={onUserFilterClick}
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
        {softwareLogs.map((softwareLog, i) => {
          return (
            <TableRow className={classes.tableRow} key={i} hover={true}>
              <TableCell>{softwareLog.title}</TableCell>
              <TableCell>{softwareLog.description}</TableCell>
              <TableCell>
                {softwareLog.supportSoftwareLogClientJoinedList
                  .map((x) => x.client.name)
                  .join(", ")}
              </TableCell>
              <TableCell sx={{ width: "150px" }}>
                {softwareLog.dateFormatted}
              </TableCell>
              <TableCell className="nostretch">
                <Tooltip title="Edit">
                  <>
                    <div className="d-inline">
                      <IconButton
                        aria-label="Edit"
                        onClick={(event) =>
                          onSoftwareLogEdit(event, softwareLog)
                        }
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
                        onClick={(event) =>
                          onSoftwareLogDelete(event, softwareLog)
                        }
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
};

export default SupportSoftwareLogList;

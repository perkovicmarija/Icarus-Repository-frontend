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
  {
    id: "versionMin",
    numeric: false,
    disablePadding: false,
    label: "general.versionMobile",
  },
  {
    id: "platform",
    numeric: false,
    disablePadding: false,
    label: "general.platform",
  },
  {
    id: "abbreviation",
    numeric: false,
    disablePadding: false,
    label: "general.client",
  },
];

const VersionList = (props) => {
  const classes = useStyles();

  const {
    versionsMobile,
    filters,
    onSearchSubmit,
    onNewVersionMobileClick,
    onVersionMobileEdit,
    onVersionMobileDelete,
    page,
    rowsPerPage,
    totalCount,
    onChangePage,
    onChangeRowsPerPage,
  } = props;

  return (
    <>
      <TableToolbar2
        title="general.versionsMobile"
        //
        filters={filters}
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder="search.byClientName"
        //
        onAddClick={onNewVersionMobileClick}
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
        {versionsMobile.map((version) => {
          return (
            <TableRow
              className={classes.tableRow}
              key={version.versionMobileId}
              hover={true}
            >
              <TableCell>{version.versionMin}</TableCell>
              <TableCell>{version.platform}</TableCell>
              <TableCell>{version.client.name}</TableCell>
              <TableCell className="nostretch">
                <Tooltip title="Edit">
                  <>
                    <div className="d-inline">
                      <IconButton
                        aria-label="Edit"
                        onClick={(event) => onVersionMobileEdit(event, version)}
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
                          onVersionMobileDelete(event, version)
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
    </>
  );
};

VersionList.propTypes = {
  //myProp: PropTypes.string.isRequired
};

export default VersionList;

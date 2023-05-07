import React from 'react';

import {IconButton, Table, TableBody, TableCell, TableFooter, TablePagination, TableRow, Tooltip} from "@mui/material";
import IntlMessages from "../../../components/core/IntlMessages";
import {Delete, Edit, NoteAdd} from "@mui/icons-material";
import EnhancedTableToolbarRich from "../../../components/core/Table/EnhancedTableToolbarRich";
import {makeStyles} from "@mui/styles";
import EnhancedTableHeaderActions from "../../../components/core/Table/EnhancedTableHeaderActions";
import TablePaginationAction from "../../../components/core/Table/TablePaginationAction";
import FilterIconCustom from "../../../components/core/FilterIconCustom";

const useStyles = makeStyles(theme => ({
  tableRow: {
    cursor: 'pointer'
  }
}));

const columnData = [
  {id: 'title', numeric: false, disablePadding: false, label: 'general.title'},
  {id: 'description', numeric: false, disablePadding: false, label: 'general.description'},
  {id: 'clients', numeric: false, disablePadding: false, label: 'form.clients'},
];

const SupportSoftwareLogList = (props) => {
  const classes = useStyles();

  const {
    softwareLogs,
    searchValue,
    onInputSearchChange,
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
    filtersActive
  } = props

  return (
    <div>
      <EnhancedTableToolbarRich
        title="support.softwareLogs"
        showSearch
        searchValue={searchValue}
        onInputSearchChange={onInputSearchChange}
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder="search.search"
      >
        <Tooltip title={<IntlMessages id="general.addNew"/>}>
          <>
            <IconButton aria-label="Add new"
                        aria-haspopup="true"
                        onClick={onNewSoftwareLogClick}>
              <NoteAdd/>
            </IconButton>
          </>
        </Tooltip>
        <FilterIconCustom onFilterClick={onUserFilterClick} filtersActive={filtersActive} />
      </EnhancedTableToolbarRich>
      <Table>
        <EnhancedTableHeaderActions
          columnData={columnData}
        />
        <TableBody>
          {softwareLogs
            .map((softwareLog, i) => {
              return (
                <TableRow
                  className={classes.tableRow}
                  key={i}
                  hover={true}>

                  <TableCell>{softwareLog.title}</TableCell>
                  <TableCell>{softwareLog.description}</TableCell>
                  <TableCell>{softwareLog.supportSoftwareLogClientJoinedList.map(x => x.client.name).join(', ')}</TableCell>
                  <TableCell className="nostretch">
                    <Tooltip title="Edit">
                      <>
                        <div className="d-inline">
                          <IconButton aria-label="Edit"
                                      onClick={(event) => onSoftwareLogEdit(event, softwareLog)}>
                            <Edit/>
                          </IconButton>
                        </div>
                      </>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <>
                        <div className="d-inline">
                          <IconButton aria-label="Delete"
                                      onClick={(event) => onSoftwareLogDelete(event, softwareLog)}>
                            <Delete/>
                          </IconButton>
                        </div>
                      </>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={columnData.length + 1}
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
              ActionsComponent={TablePaginationAction}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

SupportSoftwareLogList.propTypes = {
  //myProp: PropTypes.string.isRequired
}

export default SupportSoftwareLogList
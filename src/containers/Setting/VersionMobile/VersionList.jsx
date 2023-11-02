import React from 'react';

import {IconButton, Table, TableBody, TableCell, TableFooter, TablePagination, TableRow, Tooltip} from "@mui/material";
import IntlMessages from "../../../components/core/IntlMessages";
import {Delete, Edit, NoteAdd} from "@mui/icons-material";
import EnhancedTableToolbarRich from "../../../components/core/Table/EnhancedTableToolbarRich";
import {makeStyles} from "@mui/styles";
import EnhancedTableHeaderActions from "../../../components/core/Table/EnhancedTableHeaderActions";
import TablePaginationAction from "../../../components/core/Table/TablePaginationAction";

const useStyles = makeStyles(theme => ({
  tableRow: {
    cursor: 'pointer'
  }
}));

const columnData = [
  {id: 'versionMin', numeric: false, disablePadding: false, label: 'general.versionMobile'},
  {id: 'platform', numeric: false, disablePadding: false, label: 'general.platform'},
  {id: 'abbreviation', numeric: false, disablePadding: false, label: 'general.client'},
];

const VersionList = (props) => {
  const classes = useStyles();

  const {
    versionsMobile,
    searchValue,
    onInputSearchChange,
    onSearchSubmit,
    onNewVersionMobileClick,
    onVersionMobileEdit,
    onVersionMobileDelete,
    page,
    rowsPerPage,
    totalCount,
    onChangePage,
    onChangeRowsPerPage
  } = props

  return (
    <>
      <EnhancedTableToolbarRich
        title="general.versionsMobile"
        showSearch
        searchValue={searchValue}
        onInputSearchChange={onInputSearchChange}
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder="search.byClientName"
      >
        <Tooltip title={<IntlMessages id="general.addNew"/>}>
          <>
            <IconButton aria-label="Add new"
                        aria-haspopup="true"
                        onClick={onNewVersionMobileClick}>
              <NoteAdd/>
            </IconButton>
          </>
        </Tooltip>
        {/*<FilterIconCustom onFilterClick={onUserFilterClick} filtersActive={filtersActive} />*/}
      </EnhancedTableToolbarRich>
      <Table>
        <EnhancedTableHeaderActions
          columnData={columnData}
        />
        <TableBody>
          {versionsMobile
            .map(version => {
              return (
                <TableRow
                  className={classes.tableRow}
                  key={version.versionMobileId}
                  hover={true}>

                  <TableCell>{version.versionMin}</TableCell>
                  <TableCell>{version.platform}</TableCell>
                  <TableCell>{version.client.name}</TableCell>
                  <TableCell className="nostretch">
                    <Tooltip title="Edit">
                      <>
                        <div className="d-inline">
                          <IconButton aria-label="Edit"
                                      onClick={(event) => onVersionMobileEdit(event, version)}>
                            <Edit/>
                          </IconButton>
                        </div>
                      </>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <>
                        <div className="d-inline">
                          <IconButton aria-label="Delete"
                                      onClick={(event) => onVersionMobileDelete(event, version)}>
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
    </>
  );
};

VersionList.propTypes = {
  //myProp: PropTypes.string.isRequired
}

export default VersionList
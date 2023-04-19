import React from 'react';

import {IconButton, Table, TableBody, TableCell, TableRow, Tooltip} from "@mui/material";
import IntlMessages from "../../../components/core/IntlMessages";
import {Delete, Edit, NoteAdd} from "@mui/icons-material";
import EnhancedTableToolbarRich from "../../../components/core/Table/EnhancedTableToolbarRich";
import {makeStyles} from "@mui/styles";
import EnhancedTableHeaderActions from "../../../components/core/Table/EnhancedTableHeaderActions";

const useStyles = makeStyles(theme => ({
  tableRow: {
    cursor: 'pointer'
  }
}));

const columnData = [
  { id: 'name', numeric: false, disablePadding: false, label: 'general.name' },
];

const ClientList = (props) => {
  const classes = useStyles();

  const { clients, searchValue, onInputSearchChange, onSearchSubmit, onNewClientClick } = props

  return (
    <div>
      <EnhancedTableToolbarRich
        title="form.clients"
        showSearch
        searchValue={searchValue}
        onInputSearchChange={onInputSearchChange}
        onSearchSubmit={onSearchSubmit}
        searchPlaceholder="search.byName"
      >
        <Tooltip title={<IntlMessages id="general.addNew" />}>
          <>
            <IconButton aria-label="Add new"
                        aria-haspopup="true"
                        onClick={onNewClientClick}>
              <NoteAdd />
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
          {clients.map(client => {
            return (
              <TableRow
                className={classes.tableRow}
                key={client.clientId}
                hover={true}>

                <TableCell>{client.name}</TableCell>
                <TableCell className="nostretch">
                  <Tooltip title="Edit">
                    <>
                      <div className="d-inline">
                        <IconButton aria-label="Edit"
                                    >
                          <Edit/>
                        </IconButton>
                      </div>
                    </>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <>
                      <div className="d-inline">
                        <IconButton aria-label="Delete">
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
      </Table>
    </div>
  );
};

ClientList.propTypes = {
  //myProp: PropTypes.string.isRequired
}

export default ClientList
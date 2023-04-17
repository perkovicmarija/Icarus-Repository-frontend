import React, {useEffect} from 'react';

// import ClientList from "../../components/setting/ClientList"
import {bindActionCreators} from "redux";
import * as settingActions from "../../redux/setting/settingActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {IconButton, Table, TableBody, TableCell, TableFooter, TablePagination, TableRow, Tooltip} from "@mui/material";
import IntlMessages from "../../components/core/IntlMessages";
import {Delete, Edit, NoteAdd} from "@mui/icons-material";
import EnhancedTableToolbarRich from "../../components/core/Table/EnhancedTableToolbarRich";
import FilterIconCustom from "../../components/core/FilterIconCustom";
import {makeStyles} from "@mui/styles";
import EnhancedTableHeaderActions from "../../components/core/Table/EnhancedTableHeaderActions";
import TablePaginationAction from "../../components/core/Table/TablePaginationAction";

const useStyles = makeStyles(theme => ({
  tableRow: {
    cursor: 'pointer'
  }
}));

const columnData = [
  { id: 'name', numeric: false, disablePadding: false, label: 'general.name' },
];

const ClientsList = (props) => {
  const classes = useStyles();

  const { clients } = props

  useEffect(() => {
    props.settingActions.loadAllClients()
  },[])

  return (
    <div>
      <EnhancedTableToolbarRich
        title="form.clients"
        showSearch
        searchPlaceholder="search.byName"
      >
        <Tooltip title={<IntlMessages id="general.addNew" />}>
          <>
            <IconButton aria-label="Add new"
                        aria-haspopup="true">
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
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={columnData.length + 1}
              ActionsComponent={TablePaginationAction}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

ClientsList.propTypes = {
  //myProp: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    clients: state.Client.clients,
    test: state.Client.test
  }
}

function mapDispatchToProps(dispatch) {
  return {
    settingActions: bindActionCreators(settingActions, dispatch)
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(withRouter(ClientsList)));
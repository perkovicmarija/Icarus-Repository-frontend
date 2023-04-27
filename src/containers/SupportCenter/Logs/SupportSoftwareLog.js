import React, {useEffect, useState} from 'react';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Paper,} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {cloneDeep} from 'lodash';
import DialogFormFrame from '../../../components/core/Dialog/DialogFormFrame';
import DialogFormSoftwareLog from '../../../components/support/DialogFormSoftwareLog';
import * as supportActions from '../../../redux/support/supportActions';
import * as clientActions from '../../../redux/setting/client/clientActions';
import SupportSoftwareLogList from "./SupportSoftwareLogList";
import {getSupportLogsPath} from "../../../consts/routePaths";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";

const useStyles = makeStyles(theme => ({}));

function SupportSoftwareLog(props) {

  const classes = useStyles();

  const [dialogNewLog, setDialogNewLog] = useState(false);
  const [softwareLog, setSoftwareLog] = useState({
    title: "",
    description: "",
    selectedClients: [],
    supportSoftwareLog: {}
  });
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);
  const [softwareLogIdForDelete, setSoftwareLogIdForDelete] = useState(undefined)

  useEffect(() => {
    const viewModel = {
      filters: {},
      pagination: {
        page: props.page,
        rowsPerPage: props.rowsPerPage
      }
    }
    // props.supportActions.loadAllSoftwareLogs();
    props.supportActions.loadAllSoftwareLogsPagination(viewModel);
    if (props.clients.length === 0) {
      props.clientActions.loadAllClients()
    }
  }, []);

  const handleNewSoftwareLogClick = (event) => {
    setDialogNewLog(true);
    setSoftwareLog(x => ({...x, supportSoftwareLog: {}}))
  }

  const handleSoftwareLogEdit = (event, softwareLog) => {
    setSoftwareLog({
      title: softwareLog.supportSoftwareLog.title,
      description: softwareLog.supportSoftwareLog.description,
      selectedClients: softwareLog.clients,
      supportSoftwareLog: softwareLog.supportSoftwareLog
    });
    setDialogNewLog(true);
  }

  const handleDialogFormSoftwareLogSubmit = () => {
    setDialogNewLog(false);
    if (softwareLog.supportSoftwareLog.supportSoftwareLogId) {
      props.supportActions.updateSoftwareLogClient(softwareLog);
    } else {
      props.supportActions.createSoftwareLogClient(softwareLog);
    }
    setSoftwareLog({
      title: "",
      description: "",
      selectedClients: [],
      supportSoftwareLog: {}
    })
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target
    let softwareLogClone = cloneDeep(softwareLog);
    softwareLogClone[name] = value;
    setSoftwareLog(x => ({
      ...x,
      title: softwareLogClone.title,
      description: softwareLogClone.description,
      supportSoftwareLog: softwareLogClone.supportSoftwareLog
    }));
  };

  const handleMultipleSelectChange = (event) => {
    const selectedIds = event.target.value;
    const selectedClients = props.clients.filter(client => selectedIds.includes(client.clientId));
    setSoftwareLog(x => ({
      ...x, selectedClients
    }))
  };

  const handleDialogLogClose = () => {
    setDialogNewLog(false);
    setSoftwareLog({
      title: "",
      description: "",
      selectedClients: [],
      supportSoftwareLog: {}
    })
  };

  const handleInputSearchChange = (event) => {
    props.supportActions.changeFilterSoftwareLogSearch(event.target.value);
  }

  const handleSearchSubmit = () => {
    const viewModel = {
      filters: { softwareLogSearch: props.filters.softwareLogSearch },
      pagination: {
        page: props.page,
        rowsPerPage: props.rowsPerPage
      }
    }
    props.supportActions.loadAllSoftwareLogsPagination(viewModel);
  }

  const handleSoftwareLogDelete = (event, softwareLog) => {
    setSoftwareLogIdForDelete(softwareLog.supportSoftwareLog.supportSoftwareLogId);
    setDialogWarningOpen(true);
  }

  const handleDeleteSoftwareLogClose = () => {
    setDialogWarningOpen(false);
    setSoftwareLogIdForDelete(undefined);
  }
  
  const handleDeleteSoftwareLogConfirmed = () => {
      let viewModel = {
        softwareLogId: softwareLogIdForDelete,
      }
      props.supportActions.deleteSoftwareLogClient(viewModel);
      setDialogWarningOpen(false);
  }

  const handleChangePage = (event, page) => {
    const viewModel = {
      filters: props.filters,
      pagination: {
        page: page,
        rowsPerPage: props.rowsPerPage
      }
    };
    props.supportActions.loadAllSoftwareLogsPagination(viewModel);
    props.history.push(getSupportLogsPath(page, props.rowsPerPage));
  };

  const handleChangeRowsPerPage = event => {
    const viewModel = {
      filters: props.filters,
      pagination: {
        page: props.page,
        rowsPerPage: event.target.value
      }
    };
    props.supportActions.loadAllSoftwareLogsPagination(viewModel);
    props.history.push(getSupportLogsPath(props.page, event.target.value));
  };

  const {
    softwareLogsPagination,
    totalCount,
    filters,
    filtersActive,
    page,
    rowsPerPage,
  } = props;

  return (
    <Paper>
      <SupportSoftwareLogList
        softwareLogs={softwareLogsPagination}
        totalCount={totalCount}
        searchValue={filters.softwareLogSearch}
        onInputSearchChange={handleInputSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onNewSoftwareLogClick={handleNewSoftwareLogClick}
        onSoftwareLogEdit={handleSoftwareLogEdit}
        onSoftwareLogDelete={handleSoftwareLogDelete}
        filtersActive={filtersActive}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}/>

      <DialogFormFrame
        onClose={handleDialogLogClose}
        title="support.logs.new"
        open={dialogNewLog}>
        <DialogFormSoftwareLog
          onClose={handleDialogLogClose}
          onSubmit={handleDialogFormSoftwareLogSubmit}
          onInputChange={handleInputChange}
          onMultiSelectChange={handleMultipleSelectChange}
          selectedClients={softwareLog.selectedClients}
          softwareLog={softwareLog}
          clients={props.clients}
        />
      </DialogFormFrame>
      <DialogDeleteWarning
        open={dialogWarningOpen}
        text="general.deleteWarning"
        onDelete={handleDeleteSoftwareLogConfirmed}
        onClose={handleDeleteSoftwareLogClose}/>
    </Paper>
  );
}

SupportSoftwareLog.propTypes = {
  //myProp: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
  let page = 0;
  let rowsPerPage = 10;
  if (ownProps.match.params.page) {
    page = parseInt(ownProps.match.params.page);
  }
  if (ownProps.match.params.rowsPerPage) {
    rowsPerPage = parseInt(ownProps.match.params.rowsPerPage);
  }
  return {
    softwareLogsPagination: state.SupportCenter.softwareLogsPagination,
    softwareLog: state.SupportCenter.softwareLog,
    clients: state.Client.clients,
    totalCount: state.SupportCenter.totalCount,
    filters: state.SupportCenter.filters,
    filtersActive: true,
    page: page,
    rowsPerPage: rowsPerPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    supportActions: bindActionCreators(supportActions, dispatch),
    clientActions: bindActionCreators(clientActions, dispatch)
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(withRouter(SupportSoftwareLog)));
import React, {useEffect, useMemo, useState} from 'react';

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Paper,} from '@mui/material';
import {makeStyles} from '@mui/styles';
import _, {cloneDeep} from 'lodash';
import DialogFormFrame from '../../../components/core/Dialog/DialogFormFrame';
import DialogFormSoftwareLog from '../../../components/support/DialogFormSoftwareLog';
import * as supportActions from '../../../redux/support/supportActions';
import * as clientActions from '../../../redux/setting/client/clientActions';
import SupportSoftwareLogList from "./SupportSoftwareLogList";
import {getSupportLogsPath} from "../../../consts/routePaths";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import DialogFormSoftwareLogFilter from "../../../components/support/DialogFormSoftwareLogFilter";

const SupportSoftwareLog = (props) => {

  const createInitialState = () => ({
    title: "",
    description: "",
    selectedClients: [],
    supportSoftwareLog: {},
    notifyAllClientsByEmail: false,
    notifyUpdatedClientsByEmail: false
  });

  const [dialogNewLog, setDialogNewLog] = useState(false);
  const [notifyByEmail, setNotifyByEmail] = useState({
    notifyAll: false,
    notifyUpdated: false
  });
  const [softwareLog, setSoftwareLog] = useState(createInitialState);
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);
  const [softwareLogIdForDelete, setSoftwareLogIdForDelete] = useState(undefined)
  const [dialogFilterOpen, setDialogFilterOpen] = useState(false)

  const viewModel = useMemo(() => ({
    filters: {
      softwareLogSearch: props.filters.softwareLogSearch,
      selectedClients: props.filters.selectedClients
    },
    pagination: {
      page: props.page,
      rowsPerPage: props.rowsPerPage
    }
  }), [props.filters.softwareLogSearch, props.filters.selectedClients, props.page, props.rowsPerPage]);


  useEffect(() => {
    props.supportActions.loadAllSoftwareLogsPagination(viewModel);
    if (props.clients.length === 0) {
      props.clientActions.loadAllClients()
    }
    handleClearAllFilters();
  }, []);

  const handleNewSoftwareLogClick = (event) => {
    setDialogNewLog(true);
    setSoftwareLog(x => ({...x, supportSoftwareLog: {}}))
  }

  const handleSoftwareLogEdit = (event, softwareLog) => {
    setSoftwareLog({
      title: softwareLog.title,
      description: softwareLog.description,
      selectedClients: softwareLog.supportSoftwareLogClientJoinedList.map(x => x.client),
      supportSoftwareLog: softwareLog,
      notifyAllClientsByEmail: false,
      notifyUpdatedClientsByEmail: false
    });
    setNotifyByEmail({
      notifyAll: false,
      notifyUpdated: false
    })
    setDialogNewLog(true);
  }

  const handleDialogFormSoftwareLogSubmit = () => {
    setDialogNewLog(false);
    if (softwareLog.supportSoftwareLog.supportSoftwareLogId) {
      props.supportActions.updateSoftwareLogClient(softwareLog);
    } else {
      props.supportActions.createSoftwareLogClient(softwareLog);
    }
    setSoftwareLog(createInitialState)
    // props.supportActions.loadAllSoftwareLogs(viewModel);
    props.supportActions.loadAllSoftwareLogsPagination(viewModel);
  };

  const handleInputChange = ({target: { name, value }}) => {
    setSoftwareLog(prevState => ({ ...prevState, [name]: value }));
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
    setSoftwareLog(createInitialState)
  };

  const handleInputSearchChange = (event) => {
    props.supportActions.changeFilterSoftwareLogSearch(event.target.value);
  }

  const handleSearchSubmit = () => {
    const viewModelWithPageReset = {
      ...viewModel,
      pagination: {
        ...viewModel.pagination,
        page: 0
      }
    };
    props.supportActions.loadAllSoftwareLogsPagination(viewModelWithPageReset);
    props.history.push(getSupportLogsPath(0, props.rowsPerPage))
  }

  const handleSoftwareLogDelete = (event, softwareLog) => {
    setSoftwareLogIdForDelete(softwareLog.supportSoftwareLogId);
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

  // PAGINATION

  const handleChangePage = (event, page) => {
    const viewModelWithNewPage = {
      ...viewModel,
      pagination: {
        ...viewModel.pagination,
        page: page
      }
    };
    props.supportActions.loadAllSoftwareLogsPagination(viewModelWithNewPage);
    props.history.push(getSupportLogsPath(page, props.rowsPerPage));
  };

  const handleChangeRowsPerPage = event => {
    const viewModelWithNewRowsPerPage = {
      ...viewModel,
      pagination: {
        ...viewModel.pagination,
        rowsPerPage: event.target.value
      }
    };
    props.supportActions.loadAllSoftwareLogsPagination(viewModelWithNewRowsPerPage);
    props.history.push(getSupportLogsPath(props.page, event.target.value));
  };

  // FILTERS

  const handleUserFilterClick = () => {
    setDialogFilterOpen(true);
  }

  const handleFilterDialogClose = () => {
    setDialogFilterOpen(false);
  }

  const handleClearAllFilters = () => {
    props.supportActions.clearSoftwareLogFilters();
  }

  const handleFilterSubmit = () => {
    setDialogFilterOpen(false);
    props.supportActions.loadAllSoftwareLogsPagination(viewModel);
  }

  const handleMultiSelectChangeClients = (event) => {
    const selectedIds = event.target.value
    let selectedClients = [];
    for (let i = 0, l = selectedIds.length; i < l; i++) {
      const client = props.clients.find(type => type.clientId === selectedIds[i]);
      selectedClients.push(client);
    }
    props.supportActions.changeFilterSoftwareLogClients(selectedClients);
  }

  const handleNotifyByEmail = (event) => {
    const { name, checked } = event.target;

    const newNotifyByEmailState = {
      notifyAll: false,
      notifyUpdated: false,
      [name]: checked
    };

    setNotifyByEmail(newNotifyByEmailState);
    setSoftwareLog((prevState) => ({
      ...prevState,
      notifyAllClientsByEmail: newNotifyByEmailState.notifyAll,
      notifyUpdatedClientsByEmail: newNotifyByEmailState.notifyUpdated
    }));
  };

  const {
    softwareLogsPagination,
    totalCount,
    filters,
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
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onUserFilterClick={handleUserFilterClick}
        selectedClients={props.filters.selectedClients}
      />

      {/*
          title prop:
          If the supportSoftwareLog is empty, display the "New software log" label to indicate adding new functionality.
          If the supportSoftwareLog has properties, display the "Update software log" label to indicate update functionality.
      */}
      <DialogFormFrame
        onClose={handleDialogLogClose}
        title={_.isEmpty(softwareLog.supportSoftwareLog) ? "support.logs.new" : "support.logs.update"}
        open={dialogNewLog}>
        <DialogFormSoftwareLog
          onClose={handleDialogLogClose}
          onSubmit={handleDialogFormSoftwareLogSubmit}
          onInputChange={handleInputChange}
          onMultiSelectChange={handleMultipleSelectChange}
          selectedClients={softwareLog.selectedClients}
          softwareLog={softwareLog}
          notifyByEmail={notifyByEmail}
          handleNotifyByEmail={handleNotifyByEmail}
          clients={props.clients}
          gridSpacing={2}
        />
      </DialogFormFrame>
      <DialogFormFrame
        onClose={handleFilterDialogClose}
        title="general.selectFilters"
        open={dialogFilterOpen}>
        <DialogFormSoftwareLogFilter
          onClearAll={handleClearAllFilters}
          onClose={handleFilterDialogClose}
          onSubmit={handleFilterSubmit}
          onMultiSelectChangeClients={handleMultiSelectChangeClients}
          clients={props.clients}
          selectedClients={props.filters.selectedClients}
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
  let rowsPerPage = 25;
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
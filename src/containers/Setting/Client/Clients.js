import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import * as clientActions from "../../../redux/setting/client/clientActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ClientList from "./ClientList";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import DialogFormClient from "../../../components/setting/DialogFormClient";
import {cloneDeep} from "lodash";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import {getClientsPath} from "../../../consts/routePaths";

function Clients(props) {

  const [client, setClient] = useState({
    name: undefined,
    abbreviation: undefined,
    deactivated: false
  });
  const [dialogClientDetailsOpen, setDialogClientDetailsOpen] = useState(false);
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);
  const [clientIdForDelete, setClientIdForDelete] = useState(undefined);

  useEffect(() => {
    const viewModel = {
      filters: props.filters,
      pagination: {
        page: props.page,
        rowsPerPage: props.rowsPerPage
      }
    }
    props.clientActions.loadAllClientsPagination(viewModel);
  },[])

  const handleClientDialogDetailsClose = () => {
    setDialogClientDetailsOpen(false);
  }

  const handleClientDetailsInputChange = name => ({target: { value }}) => {
    let clientClone = cloneDeep(client);
    clientClone[name] = value;
    setClient(clientClone);
  };

  const handleClientDeactivatedChange = (name) => event  => {
    setClient({
      ...client, deactivated: !client.deactivated
    })
  }

  const handleClientDialogDetailsSubmit = () => {
    setDialogClientDetailsOpen(false);
    if (client.clientId) {
      props.clientActions.update(client);
    }
    else {
      props.clientActions.create(client)
    }
  }

  const handleDeleteClientConfirmed = () => {
    if (clientIdForDelete) {
      let viewModel = {
        clientId: clientIdForDelete,
      }
      props.clientActions.deleteAction(viewModel);
      setDialogWarningOpen(false);
      props.clientActions.loadAllClients()
    }
  }

  const handleClientDelete = (event, client) => {
    setClientIdForDelete(client.clientId);
    setDialogWarningOpen(true);
  }

  const handleDeleteClientClose = () => {
    setDialogWarningOpen(false);
    setClientIdForDelete(undefined);
  }

  const handleNewClientClick = (event) => {
    let client = {
      clientId: undefined,
      name: undefined,
      abbreviation: undefined,
      deactivated: false
    }
    setClient(client);
    setDialogClientDetailsOpen(true);
  }

  const handleClientEdit = (event, client) => {
    setClient(client);
    setDialogClientDetailsOpen(true);
  }

  const handleInputSearchChange = (event) => {
    props.clientActions.changeFilterClientSearch(event.target.value);
  }

  const handleSearchSubmit = () => {
    const viewModel = {
      filters: props.filters,
      pagination: {
        page: 0,
        rowsPerPage: props.rowsPerPage
      }
    }
    props.clientActions.loadAllClientsPagination(viewModel);
    props.history.push(getClientsPath( 0 , props.rowsPerPage))
  }

  const handleChangePage = (event, page) => {
    const viewModel = {
      filters: props.filters,
      pagination: {
        page: page,
        rowsPerPage: props.rowsPerPage
      }
    };
    props.clientActions.loadAllClientsPagination(viewModel);
    props.history.push(getClientsPath(page, props.rowsPerPage));

  };

  const handleChangeRowsPerPage = event => {
    const viewModel = {
      filters: props.filters,
      pagination: {
        page: props.page,
        rowsPerPage: event.target.value
      }
    };
    props.clientActions.loadAllClientsPagination(viewModel);
    props.history.push(getClientsPath(props.page, event.target.value));
  };

  const {
    clients,
    totalCount,
    filters,
    filtersActive,
    page,
    rowsPerPage
  } = props;

  return (
    <>
      <ClientList
        clients={clients}
        totalCount={totalCount}
        searchValue={filters.clientSearch}
        onInputSearchChange={handleInputSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onNewClientClick={handleNewClientClick}
        onClientEdit={handleClientEdit}
        onClientDelete={handleClientDelete}
        filtersActive={filtersActive}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <DialogFormFrame
        onClose={handleClientDialogDetailsClose}
        title="form.clients"
        open={dialogClientDetailsOpen}>
        <DialogFormClient
          onClose={handleClientDialogDetailsClose}
          onSubmit={handleClientDialogDetailsSubmit}
          onInputChange={handleClientDetailsInputChange}
          onSwitchClientDeactivatedChange={handleClientDeactivatedChange}
          client={client}
        />
      </DialogFormFrame>
      <DialogDeleteWarning
        open={dialogWarningOpen}
        text="general.deleteWarning"
        onDelete={handleDeleteClientConfirmed}
        onClose={handleDeleteClientClose}/>
    </>
  );
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
    clients: state.Client.clientsPagination,
    totalCount: state.Client.totalCount,
    filters: state.Client.filters,
    filtersActive: true,
    page: page,
    rowsPerPage: rowsPerPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(clientActions, dispatch)
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(withRouter(Clients)));
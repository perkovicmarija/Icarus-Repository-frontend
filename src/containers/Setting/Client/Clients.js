import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import * as clientActions from "../../../redux/setting/client/clientActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ClientList from "./ClientList";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import DialogFormClient from "../../../components/setting/DialogFormClient";
import {cloneDeep} from "lodash";

function Clients(props) {

  const [client, setClient] = useState({
    name: undefined,
    abbreviation: undefined,
    deactivated: false
  });
  const [dialogClientDetailsOpen, setDialogClientDetailsOpen] = useState(false);

  useEffect(() => {
    props.clientActions.loadAllClients(client)
  },[])

  /////////// Dialog ///////////

  const handleClientDialogDetailsClose = () => {
    setDialogClientDetailsOpen(false);
  }

  const handleClientDetailsInputChange = (event) => {
    const { name, value } = event.target;
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
      // let viewModel = {
      //   requestBody: client,
      //   params: {
      //     page: props.page,
      //     rowsPerPage: props.rowsPerPage
      //   }
      // }
      // props.userRoleActions.update(viewModel);
    }
    else {
      props.clientActions.create(client)
    }
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

  /////////// Search ///////////

  const handleInputSearchChange = (event) => {
    props.clientActions.changeFilterClientSearch(event.target.value);
  }

  const handleSearchSubmit = () => {
    const viewModel = {
      filters: props.filters,
      pagination: {
        page: props.page,
        rowsPerPage: props.rowsPerPage
      }
    }
    props.clientActions.loadAllClientsPagination(viewModel);
  }

  const {
    clients,
    totalCount,
    filters,
    filtersActive,
    page,
    rowsPerPage
  } = props;

  return (
    <div>
      <ClientList
        clients={clients}
        totalCount={totalCount}
        searchValue={filters.clientSearch}
        onInputSearchChange={handleInputSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onNewClientClick={handleNewClientClick}
        filtersActive={filtersActive}
        page={page}
        rowsPerPage={rowsPerPage}
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
    </div>
  );
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
import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import * as versionMobileActions from "../../../redux/setting/versionMobile/versionMobileActions";
import * as clientActions from '../../../redux/setting/client/clientActions';
import {connect} from "react-redux";
import {useHistory, useLocation, withRouter} from "react-router-dom";
import VersionList from "./VersionList";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import DialogFormVersionMobile from "../../../components/setting/DialogFormVersionMobile";
import {cloneDeep, isEmpty} from "lodash";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import {getClientsPath, getVersionMobilePath} from "../../../consts/routePaths";
import queryString from 'query-string';
import {constructUrl} from "../../../helpers/utility";

function Versions(props) {
  const location = useLocation();
  const searchParams = queryString.parse(location.search);
  const history = useHistory();

  const [versionMobile, setVersionMobile] = useState({
    versionMin: undefined,
    platform: undefined,
    client: undefined
  });
  const [dialogVersionMobileDetailsOpen, setDialogVersionMobileDetailsOpen] = useState(false);
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);
  const [versionMobileIdForDelete, setVersionMobileIdForDelete] = useState(undefined);

  useEffect(() => {
    let viewModel = {
      page,
      rows_per_page: rowsPerPage
    }
    props.versionMobileActions.loadVersions(viewModel);
  },[])

  const handleVersionMobileDialogDetailsClose = () => {
    setDialogVersionMobileDetailsOpen(false);
  }

  const handleVersionMobileDetailsInputChange = name => ({target: { value }}) => {
    let versionMobileClone = cloneDeep(versionMobile);
    versionMobileClone[name] = value;
    setVersionMobile(versionMobileClone);
  };

  const handleVersionMobileDialogDetailsSubmit = () => {
    setDialogVersionMobileDetailsOpen(false);
    if (versionMobile.versionMobileId) {
      props.versionMobileActions.update(versionMobile);
    }
    else {
      props.versionMobileActions.create(versionMobile)
    }
  }

  const handleDeleteVersionMobileConfirmed = () => {
    if (versionMobileIdForDelete) {
      let viewModel = {
        versionMobileId: versionMobileIdForDelete,
      }
      props.versionMobileActions.deleteAction(viewModel);
      setDialogWarningOpen(false);
    }
  }

  const handleVersionMobileDelete = (event, versionMobile) => {
    setVersionMobileIdForDelete(versionMobile.versionMobileId);
    setDialogWarningOpen(true);
  }

  const handleDeleteVersionMobileClose = () => {
    setDialogWarningOpen(false);
    setVersionMobileIdForDelete(undefined);
  }

  const handleNewVersionMobileClick = (event) => {
    let versionMobile = {
      versionMobileId: undefined,
      versionMin: undefined,
      platform: undefined,
      client: undefined
    }
    setVersionMobile(versionMobile);
    setDialogVersionMobileDetailsOpen(true);
  }

  const handleVersionMobileEdit = (event, client) => {
    setVersionMobile(client);
    setDialogVersionMobileDetailsOpen(true);
  }

  const handleInputSearchChange = (event) => {
    props.versionMobileActions.changeFilterVersionMobileSearch(event.target.value);
  }

  const handleSearchSubmit = () => {
    const viewModel = {
      filters: props.filters,
      pagination: {
        page: 0,
        rowsPerPage: props.rowsPerPage
      }
    }
    props.versionMobileActions.loadVersions(viewModel);
    props.history.push(getVersionMobilePath( 0 , props.rowsPerPage))
  }

  const handleChangePage = (event, page) => {
    const viewModel = {
      page: page,
      rowsPerPage: props.rowsPerPage
    };
    props.versionMobileActions.loadVersions(viewModel);
    props.history.push(getVersionMobilePath(page, props.rowsPerPage));
  };

  const handleChangeRowsPerPage = event => {
    const viewModel = {
      page: page,
      rowsPerPage: event.target.value
    };
    props.versionMobileActions.loadVersions(viewModel);
    props.history.push(getVersionMobilePath(page, event.target.value));
  };

  const handleSelectChange = ({target: {name, value}}) => {
    let versionMobileClone = cloneDeep(versionMobile);
    versionMobileClone[name] = value
    setVersionMobile(versionMobileClone);
  }

  const {
    versionsMobile,
    totalCount,
    filters,
    filtersActive,
    page,
    rowsPerPage,
    clients
  } = props;

  return (
    <>
      <VersionList
        versionsMobile={versionsMobile}
        totalCount={totalCount}
        searchValue={filters.clientSearch}
        onInputSearchChange={handleInputSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onNewVersionMobileClick={handleNewVersionMobileClick}
        onVersionMobileEdit={handleVersionMobileEdit}
        onVersionMobileDelete={handleVersionMobileDelete}
        filtersActive={filtersActive}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <DialogFormFrame
        onClose={handleVersionMobileDialogDetailsClose}
        title="general.versionMobile"
        open={dialogVersionMobileDetailsOpen}>
        <DialogFormVersionMobile
          onClose={handleVersionMobileDialogDetailsClose}
          onSubmit={handleVersionMobileDialogDetailsSubmit}
          onInputChange={handleVersionMobileDetailsInputChange}
          versionsMobile={versionsMobile}
          clients={clients}
          onSelectChange={handleSelectChange}
        />
      </DialogFormFrame>
      <DialogDeleteWarning
        open={dialogWarningOpen}
        text="general.deleteWarning"
        onDelete={handleDeleteVersionMobileConfirmed}
        onClose={handleDeleteVersionMobileClose}/>
    </>
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
    versionsMobile: state.VersionMobile.versionsMobile,
    totalCount: state.VersionMobile.totalCount,
    filters: state.VersionMobile.filters,
    filtersActive: true,
    page: page,
    rowsPerPage: rowsPerPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    versionMobileActions: bindActionCreators(versionMobileActions, dispatch),
    clientActions: bindActionCreators(clientActions, dispatch)
  };
}

export default (connect(mapStateToProps, mapDispatchToProps)(withRouter(Versions)));
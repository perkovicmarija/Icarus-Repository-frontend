import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import * as versionMobileActions from "../../../redux/setting/versionMobile/versionMobileActions";
import * as clientActions from "../../../redux/setting/client/clientActions";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import VersionList from "./VersionList";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import DialogFormVersionMobile from "./DialogFormVersionMobile";
import { cloneDeep } from "lodash";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import { getVersionMobilePath } from "../../../consts/routePaths";
import { AJAX_FAILED } from "../../../redux/actionTypes";

function Versions(props) {
  const {
    versionsMobile,
    totalCount,
    filters,
    filtersActive,
    page,
    rowsPerPage,
    clients,
  } = props;

  const dispatch = useDispatch();

  const createInitialState = () => ({
    versionMobileId: undefined,
    versionMin: undefined,
    platform: undefined,
    selectedClients: [],
  });

  const [versionMobile, setVersionMobile] = useState(createInitialState);
  const [entryExistsFlag, setEntryExistsFlag] = useState(false);
  const [dialogVersionMobileDetails, setDialogVersionMobileDetails] =
    useState();
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);
  const [versionMobileIdForDelete, setVersionMobileIdForDelete] =
    useState(undefined);

  useEffect(() => {
    let viewModel = {
      page,
      rows_per_page: rowsPerPage,
    };
    props.versionMobileActions.loadVersions(viewModel);
    props.clientActions.loadAllClients();
  }, []);

  // Check if a version with the same client name, platform and version already exists
  const checkForExistingCombination = (versionsMobile, versionMobile) => {
    return versionsMobile.some(
      (vm) =>
        versionMobile.versionMin === vm.versionMin &&
        versionMobile.platform === vm.platform &&
        versionMobile.selectedClients[0].name === vm.client.name
    );
  };

  const handleDeleteVersionMobileConfirmed = () => {
    if (versionMobileIdForDelete) {
      let viewModel = {
        versionMobileId: versionMobileIdForDelete,
      };
      props.versionMobileActions.deleteAction(viewModel);
      setDialogWarningOpen(false);
    }
  };

  const handleVersionMobileDelete = (event, versionMobile) => {
    setVersionMobileIdForDelete(versionMobile.versionMobileId);
    setDialogWarningOpen(true);
  };

  const handleDeleteVersionMobileClose = () => {
    setDialogWarningOpen(false);
    setVersionMobileIdForDelete(undefined);
  };

  const handleVersionMobileEdit = (e, version) => {
    setDialogVersionMobileDetails(version);
  };

  const handleInputSearchChange = (event) => {
    props.versionMobileActions.changeFilterVersionMobileSearch(
      event.target.value
    );
  };

  const handleSearchSubmit = () => {
    let viewModel = {
      page,
      rows_per_page: rowsPerPage,
      client_name: filters.clientName,
    };
    props.versionMobileActions.loadVersions(viewModel);
    props.history.push(getVersionMobilePath(0, rowsPerPage));
  };

  const handleChangePage = (event, page) => {
    const viewModel = {
      page: page,
      rows_per_page: rowsPerPage,
    };
    props.versionMobileActions.loadVersions(viewModel);
    props.history.push(getVersionMobilePath(page, rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    const viewModel = {
      page: page,
      rowsPerPage: event.target.value,
    };
    props.versionMobileActions.loadVersions(viewModel);
    props.history.push(getVersionMobilePath(page, event.target.value));
  };

  return (
    <>
      <VersionList
        versionsMobile={versionsMobile}
        totalCount={totalCount}
        searchValue={filters.clientName}
        onInputSearchChange={handleInputSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onNewVersionMobileClick={() => setDialogVersionMobileDetails({})}
        onVersionMobileEdit={handleVersionMobileEdit}
        onVersionMobileDelete={handleVersionMobileDelete}
        filtersActive={filtersActive}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {dialogVersionMobileDetails && (
        <DialogFormFrame
          onClose={() => setDialogVersionMobileDetails()}
          title="general.versionMobile"
          open={dialogVersionMobileDetails}
        >
          <DialogFormVersionMobile
            initialData={dialogVersionMobileDetails}
            onClose={() => setDialogVersionMobileDetails()}
            onSubmit={(payload) => {
              const duplicate = checkForExistingCombination(
                versionsMobile,
                payload
              );

              //Do not allow creating of duplicates
              if (!duplicate) {
                if (payload.versionMobileId) {
                  props.versionMobileActions.update(payload);
                } else {
                  props.versionMobileActions.create(payload);
                }
                props.versionMobileActions.loadVersions({
                  page,
                  rows_per_page: rowsPerPage,
                });
              } else {
                dispatch({
                  type: AJAX_FAILED,
                  message: "Duplicate",
                });
                throw new Error();
              }
            }}
            //
            clients={clients}
          />
        </DialogFormFrame>
      )}

      <DialogDeleteWarning
        open={dialogWarningOpen}
        text="general.deleteWarning"
        onDelete={handleDeleteVersionMobileConfirmed}
        onClose={handleDeleteVersionMobileClose}
      />
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
    rowsPerPage: rowsPerPage,
    clients: state.Client.clients,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    versionMobileActions: bindActionCreators(versionMobileActions, dispatch),
    clientActions: bindActionCreators(clientActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Versions));

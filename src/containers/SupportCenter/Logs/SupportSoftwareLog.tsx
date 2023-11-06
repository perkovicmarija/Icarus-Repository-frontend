import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { Paper } from "@mui/material";
import _ from "lodash";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import DialogFormSoftwareLog from "../../../components/support/DialogFormSoftwareLog";
import * as clientActions from "../../../redux/setting/client/clientActions";
import SupportSoftwareLogList from "./SupportSoftwareLogList";
import { getSupportLogsPath } from "../../../consts/routePaths";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import DialogFormSoftwareLogFilter from "../../../components/support/DialogFormSoftwareLogFilter";
import { supportLogsActions } from "../../../redux/support/supportLogs/supportLogsSlice";

const SupportSoftwareLog = ({
  data,
  filters,
  totalCount,
  page,
  rowsPerPage,
  //
  clients,
}: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const createInitialState = () => ({
    title: "",
    description: "",
    selectedClients: [],
    supportSoftwareLog: {},
    notifyAllClientsByEmail: false,
    notifyUpdatedClientsByEmail: false,
  });

  const [dialogNewLog, setDialogNewLog] = useState(false);
  const [notifyByEmail, setNotifyByEmail] = useState({
    notifyAll: false,
    notifyUpdated: false,
  });
  const [softwareLog, setSoftwareLog] = useState(createInitialState);
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);
  const [softwareLogIdForDelete, setSoftwareLogIdForDelete] =
    useState(undefined);
  const [dialogFilters, setDialogFilters] = useState();

  const viewModel = useMemo(
    () => ({
      filters: {
        softwareLogSearch: filters.softwareLogSearch,
        selectedClients: filters.selectedClients,
      },
      pagination: {
        page,
        rowsPerPage,
      },
    }),
    [filters.softwareLogSearch, filters.selectedClients, page, rowsPerPage]
  );

  useEffect(() => {
    dispatch(supportLogsActions.getData(viewModel));
    if (clients.length === 0) {
      dispatch(clientActions.loadAllClients());
    }
  }, []);

  const handleNewSoftwareLogClick = () => {
    setDialogNewLog(true);
    setSoftwareLog((x) => ({ ...x, supportSoftwareLog: {} }));
  };

  const handleSoftwareLogEdit = (_e, softwareLog) => {
    setSoftwareLog({
      title: softwareLog.title,
      description: softwareLog.description,
      selectedClients: softwareLog.supportSoftwareLogClientJoinedList.map(
        (x) => x.client
      ),
      supportSoftwareLog: softwareLog,
      notifyAllClientsByEmail: false,
      notifyUpdatedClientsByEmail: false,
    });
    setNotifyByEmail({
      notifyAll: false,
      notifyUpdated: false,
    });
    setDialogNewLog(true);
  };

  const handleDialogFormSoftwareLogSubmit = (viewModel) => {
    /* setDialogNewLog(false);
    if (softwareLog.supportSoftwareLog.supportSoftwareLogId) {
      supportLogsActions.updateSoftwareLogClient(softwareLog);
    } else {
      supportLogsActions.createSoftwareLogClient(softwareLog);
    }
    setSoftwareLog(createInitialState); */
    dispatch(supportLogsActions.loadAllSoftwareLogsPagination(viewModel));
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setSoftwareLog((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleMultipleSelectChange = (e) => {
    const selectedIds = e.target.value;
    const selectedClients = clients.filter((client) =>
      selectedIds.includes(client.clientId)
    );
    setSoftwareLog((x) => ({
      ...x,
      selectedClients,
    }));
  };

  const handleDialogLogClose = () => {
    setDialogNewLog(false);
    setSoftwareLog(createInitialState);
  };

  const handleSubmitFilters = (newFilters) => {
    dispatch(
      supportLogsActions.loadAllSoftwareLogsPagination({
        filters: { ...filters, ...newFilters },
        pagination: {
          page,
          rowsPerPage,
        },
      })
    );
    dispatch(supportLogsActions.setFilters({ ...filters, ...newFilters }));
  };

  const handleSoftwareLogDelete = (event, softwareLog) => {
    setSoftwareLogIdForDelete(softwareLog.supportSoftwareLogId);
    setDialogWarningOpen(true);
  };

  const handleDeleteSoftwareLogClose = () => {
    setDialogWarningOpen(false);
    setSoftwareLogIdForDelete(undefined);
  };

  const handleDeleteSoftwareLogConfirmed = () => {
    let viewModel = {
      softwareLogId: softwareLogIdForDelete,
    };
    dispatch(supportLogsActions.deleteSoftwareLogClient(viewModel));
    setDialogWarningOpen(false);
  };

  // PAGINATION
  const onChangePage = (event, page) => {
    /* const viewModelWithNewPage = {
      ...viewModel,
      pagination: {
        ...viewModel.pagination,
        page: page,
      },
    }; */
    // supportLogsActions.loadAllSoftwareLogsPagination(viewModelWithNewPage);
    history.push(getSupportLogsPath(page, rowsPerPage));
  };
  const onChangeRowsPerPage = (e) => {
    /* const viewModelWithNewRowsPerPage = {
      ...viewModel,
      pagination: {
        ...viewModel.pagination,
        rowsPerPage: e.target.value,
      },
    }; */
    /* supportLogsActions.loadAllSoftwareLogsPagination(
      viewModelWithNewRowsPerPage
    ); */
    console.log(getSupportLogsPath(page, e.target.value));
    history.push(getSupportLogsPath(page, e.target.value));
  };

  const handleNotifyByEmail = (e) => {
    const { name, checked } = e.target;

    const newNotifyByEmailState = {
      notifyAll: false,
      notifyUpdated: false,
      [name]: checked,
    };

    setNotifyByEmail(newNotifyByEmailState);
    setSoftwareLog((prevState) => ({
      ...prevState,
      notifyAllClientsByEmail: newNotifyByEmailState.notifyAll,
      notifyUpdatedClientsByEmail: newNotifyByEmailState.notifyUpdated,
    }));
  };

  return (
    <Paper>
      <SupportSoftwareLogList
        data={data}
        onAddClick={handleNewSoftwareLogClick}
        onEdit={handleSoftwareLogEdit}
        onDelete={handleSoftwareLogDelete}
        //
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        //
        title="support.softwareLogs"
        filters={filters}
        onFilterClick={() => setDialogFilters(filters)}
        onSearchSubmit={handleSubmitFilters}
      />

      {/*
          title prop:
          If the supportSoftwareLog is empty, display the "New software log" label to indicate adding new functionality.
          If the supportSoftwareLog has properties, display the "Update software log" label to indicate update functionality.
      */}
      <DialogFormFrame
        onClose={handleDialogLogClose}
        title={
          _.isEmpty(softwareLog.supportSoftwareLog)
            ? "support.logs.new"
            : "support.logs.update"
        }
        open={dialogNewLog}
      >
        <DialogFormSoftwareLog
          onClose={handleDialogLogClose}
          onSubmit={handleDialogFormSoftwareLogSubmit}
          onInputChange={handleInputChange}
          onMultiSelectChange={handleMultipleSelectChange}
          selectedClients={softwareLog.selectedClients}
          softwareLog={softwareLog}
          notifyByEmail={notifyByEmail}
          handleNotifyByEmail={handleNotifyByEmail}
          clients={clients}
          gridSpacing={2}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogFilters(undefined)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormSoftwareLogFilter
          initialData={dialogFilters}
          onClose={() => setDialogFilters(undefined)}
          onSubmit={handleSubmitFilters}
          clients={clients}
        />
      </DialogFormFrame>

      <DialogDeleteWarning
        open={dialogWarningOpen}
        text="general.deleteWarning"
        onDelete={handleDeleteSoftwareLogConfirmed}
        onClose={handleDeleteSoftwareLogClose}
      />
    </Paper>
  );
};

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
    data: state.SupportLogs.data,
    totalCount: state.SupportLogs.meta.totalCount,
    filters: state.SupportLogs.filters,
    //
    clients: state.Client.clients,
    page: page,
    rowsPerPage: rowsPerPage,
  };
}

export default connect(mapStateToProps, null)(SupportSoftwareLog);

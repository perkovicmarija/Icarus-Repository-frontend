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
import DialogFormSoftwareLogFilter from "../../../components/support/DialogFormSoftwareLogFilter";
import {
  FiltersType,
  supportLogsActions,
} from "../../../redux/support/supportLogs/supportLogsSlice";
import { usePagination } from "../../../helpers/pagination";
import { DialogDelete2 } from "../../../components/core/Dialog/DialogDelete2";
import { AppDispatch, RootState } from "../../../redux/store";

const SupportSoftwareLog = ({
  data,
  filters,
  totalCount,
  //
  clients,
}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const [dialogAddEditLog, setDialogAddEditLog] = useState<any>();
  const [dialogWarning, setDialogWarning] = useState<any>();
  const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("supportLogs");

  const meta = useMemo(
    () => ({
      filters,
      pagination: {
        page,
        rowsPerPage,
      },
    }),
    [filters, page, rowsPerPage]
  );

  useEffect(() => {
    dispatch(supportLogsActions.getData(meta));
    if (clients.length === 0) {
      dispatch(clientActions.loadAllClients());
    }
  }, [page, rowsPerPage]);

  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(
      supportLogsActions.getData({
        filters: { ...filters, ...newFilters },
        pagination: {
          page,
          rowsPerPage,
        },
      })
    );
    dispatch(supportLogsActions.setFilters({ ...filters, ...newFilters }));
  };

  // PAGINATION
  const onChangePage = (newValue: number) => {
    history.push(getSupportLogsPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getSupportLogsPath(page, newValue));
  };

  return (
    <Paper>
      <SupportSoftwareLogList
        data={data}
        onEdit={setDialogAddEditLog}
        onDelete={setDialogWarning}
        //
        toolbarProps={{
          onAddClick: () => setDialogAddEditLog({}),
          title: "support.softwareLogs",
          filters,
          onFilterClick: setDialogFilters,
          onSearchSubmit: handleSubmitFilters,
        }}
        paginationProps={{
          totalCount,
          page,
          rowsPerPage,
          onChangePage,
          onChangeRowsPerPage,
        }}

        //
      />

      {dialogAddEditLog && (
        <DialogFormFrame
          onClose={() => setDialogAddEditLog(undefined)}
          title={
            _.isEmpty(dialogAddEditLog)
              ? "support.logs.new"
              : "support.logs.update"
          }
          open={dialogAddEditLog}
        >
          <DialogFormSoftwareLog
            initialData={dialogAddEditLog}
            onClose={() => setDialogAddEditLog(undefined)}
            onSubmit={(payload: any) => {
              dispatch(supportLogsActions.addEditItem({ payload, meta }));
            }}
            clients={clients}
          />
        </DialogFormFrame>
      )}

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

      <DialogDelete2
        data={dialogWarning}
        onSubmit={(payload) => {
          return dispatch(
            supportLogsActions.deleteItem({
              softwareLogId: payload.supportSoftwareLogId,
            })
          );
        }}
        onClose={() => setDialogWarning(undefined)}
      />
    </Paper>
  );
};

function mapStateToProps(state: RootState) {
  return {
    data: state.SupportLogs.data,
    totalCount: state.SupportLogs.meta.totalCount,
    filters: state.SupportLogs.filters,
    //
    clients: state.Client.clients,
  };
}

export default connect(mapStateToProps, null)(SupportSoftwareLog);

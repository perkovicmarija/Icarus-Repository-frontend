import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
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
  SupportLog,
  supportLogsActions,
} from "../../../redux/support/supportLogs/supportLogsSlice";
import { usePagination } from "../../../helpers/pagination";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

const SupportSoftwareLog = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const data = useAppSelector((state) => state.SupportLogs.data);
  const totalCount = useAppSelector(
    (state) => state.SupportLogs.meta.totalCount
  );
  const filters = useAppSelector((state) => state.SupportLogs.filters);
  const clients = useAppSelector((state) => state.Client.clients);

  const [dialogAddEditLog, setDialogAddEditLog] = useState<
    SupportLog | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("supportLogs");

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    dispatch(supportLogsActions.getData(meta)).then(() => setLoading(false));
    if (clients.length === 0) {
      dispatch(clientActions.loadAllClients());
    }
  }, [meta]);

  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(supportLogsActions.setFilters({ ...filters, ...newFilters }));
    history.push(getSupportLogsPath(0, 0));
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
      <SupportSoftwareLogList<SupportLog>
        data={data}
        onEdit={setDialogAddEditLog}
        onDelete={(payload) => {
          return dispatch(
            supportLogsActions.deleteItem({
              softwareLogId: payload.supportSoftwareLogId,
            })
          );
        }}
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
        loading={loading}
      />

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
            return dispatch(supportLogsActions.addEditItem({ payload, meta }));
          }}
          clients={clients}
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
    </Paper>
  );
};

export default SupportSoftwareLog;

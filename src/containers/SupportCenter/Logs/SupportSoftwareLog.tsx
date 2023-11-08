import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { usePagination } from "../../../helpers/pagination";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
//
import SupportSoftwareLogList from "./SupportSoftwareLogList";
import DialogFormSoftwareLog from "../../../components/support/DialogFormSoftwareLog";
import DialogFormSoftwareLogFilter from "../../../components/support/DialogFormSoftwareLogFilter";
import { getSupportLogsPath } from "../../../consts/routePaths";
import {
  FiltersType,
  SupportLog,
  supportLogsActions,
} from "../../../redux/support/supportLogs/supportLogsSlice";
import * as clientActions from "../../../redux/setting/client/clientActions";

const SupportSoftwareLog = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const data = useAppSelector((state) => state.SupportLogs.data);
  const totalCount = useAppSelector(
    (state) => state.SupportLogs.meta.totalCount
  );
  const filters = useAppSelector((state) => state.SupportLogs.filters);

  const [dialogAddEdit, setDialogAddEdit] = useState<
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

  useLayoutEffect(() => {
    setLoading(true);
    dispatch(supportLogsActions.getData(meta)).then(() => setLoading(false));
  }, [meta]);

  //
  const clients = useAppSelector((state) => state.Client.clients);
  useEffect(() => {
    if (clients.length === 0) {
      dispatch(clientActions.loadAllClients());
    }
  }, []);
  //

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
    <>
      <SupportSoftwareLogList<SupportLog>
        data={data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) => {
          return dispatch(
            supportLogsActions.deleteItem({
              softwareLogId: payload.supportSoftwareLogId,
            })
          );
        }}
        //
        toolbarProps={{
          onAddClick: () => setDialogAddEdit({}),
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
        onClose={() => setDialogAddEdit(undefined)}
        title={
          isEmpty(dialogAddEdit) ? "support.logs.new" : "support.logs.update"
        }
        open={dialogAddEdit}
      >
        <DialogFormSoftwareLog
          initialData={dialogAddEdit}
          onClose={() => setDialogAddEdit(undefined)}
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
    </>
  );
};

export default SupportSoftwareLog;

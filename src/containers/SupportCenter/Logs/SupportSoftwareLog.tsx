import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { usePagination } from "../../../helpers/pagination";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
//
import SupportSoftwareLogList from "./SupportSoftwareLogList";
import DialogFormSoftwareLog from "./DialogFormSoftwareLog";
import DialogFormSoftwareLogFilter from "../../../components/support/DialogFormSoftwareLogFilter";
import { getSupportLogsPath } from "../../../consts/routePaths";
import {
  FiltersType,
  SupportLog,
  supportLogsActions,
  initFilters,
} from "../../../redux/support/supportLogs/supportLogsSlice";
import { useGetClientsQuery } from "../../../redux/clientsApi";
import {
  useAddEditSupportLogMutation,
  useDeleteSupportLogMutation,
  useGetSupportLogsPaginatedQuery,
} from "../../../redux/support/supportLogsApi";

const SupportSoftwareLog = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [dialogAddEdit, setDialogAddEdit] = useState<
    SupportLog | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("supportLogs");
  const filters = useAppSelector((state) => state.SupportLogs.filters);
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
  const { data, isFetching } = useGetSupportLogsPaginatedQuery(meta);
  const [triggerDelete] = useDeleteSupportLogMutation();
  const [triggerAddEdit] = useAddEditSupportLogMutation();

  //
  const { data: clientsResponse } = useGetClientsQuery();
  const activeClients = useMemo(
    () => clientsResponse?.data.filter((item) => !item.deactivated) ?? [],
    [clientsResponse]
  );
  //

  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(supportLogsActions.setFilters({ ...filters, ...newFilters }));
    history.push(getSupportLogsPath(0));
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
        data={data?.data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) =>
          triggerDelete(payload.supportSoftwareLogId).unwrap()
        }
        //
        toolbarProps={{
          onAddClick: setDialogAddEdit,
          title: "support.softwareLogs",
          searchPlaceholder: "search.search",
          searchTextPropKey: "softwareLogSearch",
          initFilters,
          filters,
          onFilterClick: setDialogFilters,
          onSearchSubmit: handleSubmitFilters,
        }}
        paginationProps={{
          totalCount: data?.meta.totalCount,
          page,
          rowsPerPage,
          onChangePage,
          onChangeRowsPerPage,
        }}
        loading={isFetching}
      />

      <DialogFormFrame
        onClose={() => setDialogAddEdit(undefined)}
        title={
          isEmpty(dialogAddEdit) ? "support.logs.new" : "support.logs.update"
        }
        open={dialogAddEdit}
      >
        <DialogFormSoftwareLog
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload) => triggerAddEdit(payload).unwrap()}
          clients={activeClients}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogFilters(undefined)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormSoftwareLogFilter
          initialData={dialogFilters!}
          onClose={() => setDialogFilters(undefined)}
          onSubmit={handleSubmitFilters}
          clients={clientsResponse?.data ?? []}
        />
      </DialogFormFrame>
    </>
  );
};

export default SupportSoftwareLog;

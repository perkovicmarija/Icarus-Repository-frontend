import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { useMemo, useState } from "react";
import { usePagination } from "../../helpers/pagination";
import { useGetClientsQuery } from "../../redux/settings/clientsApi";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import { isEmpty } from "lodash";
import { useGetUserQuery } from "../../redux/user/usersApi";
import { handleNotify } from "../../helpers/utility";
import { Paper } from "@mui/material";
import {
  ReportHazardIdentification,
  useCreateUpdateReportHazardIdentificationMutation,
  useDeleteReportHazardIdentificationMutation,
  useGetReportHazardIdentificationsPaginatedQuery,
} from "../../redux/reportHazardIdentification/reportHazardIdentificationApi";
import {
  FiltersType,
  initFilters,
  reportHazardIdentificationActions,
} from "../../redux/reportHazardIdentification/reportHazardIdentificationSlice";
import ReportHazardIdentificationList from "./ReportHazardIdentificationList";
import DialogFormReportHazardIdentification from "../../components/reportHazardIdentification/DialogFormReportHazardIdentification";
import DialogFormReportHazardIdentificationFilter from "../../components/reportHazardIdentification/DialogFormReportHazardUdentificationFilter";
import { getReportHazardIdentificationPath } from "../../consts/routePaths";
import DialogFormReportHazardIdentificationResult from "../../components/reportHazardIdentification/DialogFormReportHazardIdentificationResult";

const ReportHazardIdentificationOverview = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [dialogAddEdit, setDialogAddEdit] = useState<
    ReportHazardIdentification | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState<boolean>();
  
  const [
    reportHazardIdentificationResult,
    setReportHazardIdentificationResult,
  ] = useState<ReportHazardIdentification>();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination(
    "reportHazardIdentification"
  );
  const filters = useAppSelector(
    (state) => state.ReportHazardIdentification.filters
  );
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
  const { data, isFetching, refetch } =
    useGetReportHazardIdentificationsPaginatedQuery(meta);
  const [triggerAddEdit] = useCreateUpdateReportHazardIdentificationMutation();
  const [triggerDelete] = useDeleteReportHazardIdentificationMutation();

  const { data: user } = useGetUserQuery(
    JSON.parse(localStorage.getItem("userId"))
  );

  const { data: clientsResponse } = useGetClientsQuery();
  const activeClients = useMemo(
    () => clientsResponse?.data.filter((item) => !item.deactivated) ?? [],
    [clientsResponse]
  );

  const handleSearchSubmit = (newFilters: FiltersType): void => {
    console.log("newFilters", newFilters);
    dispatch(
      reportHazardIdentificationActions.setFilters({
        ...filters,
        ...newFilters,
      })
    );
    refetch();
  };

  const handleSubmitFilters = (newFilters: FiltersType): void => {
    dispatch(
      reportHazardIdentificationActions.setFilters({
        ...filters,
        ...newFilters,
      })
    );
    history.push(getReportHazardIdentificationPath(page, rowsPerPage));
  };

  const onChangePage = (newValue: number): void => {
    history.push(getReportHazardIdentificationPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number): void => {
    storeRowsPerPage(newValue);
    history.push(getReportHazardIdentificationPath(page, newValue));
  };

  return (
    <>
      <Paper>
        <ReportHazardIdentificationList<ReportHazardIdentification>
          data={data?.data}
          onEdit={setDialogAddEdit}
          onDelete={(payload: ReportHazardIdentification): Promise<void> =>
            triggerDelete(payload.reportHazardIdentificationId).unwrap()
          }
          onItemClick={(id) =>{
            console.log("id", id)
            history.push("/admin/dedalus/report-hazard-identification/" + id)}
          }
          toolbarProps={{
            onAddClick: setDialogAddEdit,
            title: "",
            searchPlaceholder: "search.search",
            searchTextPropKey: "title",
            initFilters,
            filters,
            onFilterClick: setDialogFilters,
            onSearchSubmit: handleSearchSubmit,
          }}
          paginationProps={{
            totalCount: data?.meta?.totalCount,
            page,
            rowsPerPage,
            onChangePage,
            onChangeRowsPerPage,
          }}
          loading={isFetching}
        />
      </Paper>

      <DialogFormFrame
        onClose={() => setDialogAddEdit(undefined)}
        title={
          isEmpty(dialogAddEdit)
            ? "reportHazardIdentification.create"
            : "reportHazardIdentification.update"
        }
        open={dialogAddEdit}
      >
        <DialogFormReportHazardIdentification
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload: ReportHazardIdentification): Promise<void> =>
            triggerAddEdit({ ...payload, userCreated: user?.data })
              .unwrap()
              .then((result) => {
                handleNotify(result);
                setReportHazardIdentificationResult(result.data);
              })
          }
          clients={activeClients}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setReportHazardIdentificationResult(undefined)}
        title="reportHazardIdentification.result"
        open={reportHazardIdentificationResult}
      >
        <DialogFormReportHazardIdentificationResult
          reportHazardIdentificationResult={reportHazardIdentificationResult}
          onClose={() => setReportHazardIdentificationResult(undefined)}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogFilters(false)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormReportHazardIdentificationFilter
          initialData={dialogFilters!}
          onClose={() => setDialogFilters(false)}
          onSubmit={handleSubmitFilters}
          clients={clientsResponse?.data}
        />
      </DialogFormFrame>
    </>
  );
};
export default ReportHazardIdentificationOverview;

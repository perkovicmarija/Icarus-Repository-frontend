import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useHistory } from "react-router-dom";
import { useMemo, useState } from "react";
import { usePagination } from "../../helpers/pagination";
import { useGetClientsQuery } from "../../redux/settings/clientsApi";
import { Paper } from "@mui/material";
import {
  Report as ReportInterface,
  useCreateUpdateReportMutation,
  useDeleteReportMutation,
  useGetReportsPaginatedQuery,
  useGetReportStatisticsQuery,
} from "../../redux/report/reportApi";
import ReportList from "./ReportList";
import { getReportPath } from "../../consts/routePaths";
import { useGetUserQuery } from "../../redux/user/usersApi";
import { FiltersType, initFilters, reportActions } from "../../redux/report/reportSlice";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import DialogFormReport from "../../components/report/DialogFormReport";
import { handleNotify } from "../../helpers/utility";
import { isEmpty } from "lodash";
import { useGetHazardClassificationsQuery } from "../../redux/hazardClassification/hazardClassificationApi";
import DialogFormReportFilters from "./DialogFormReportsFilters";
import DialogFormReportStatistics from "./DialogFormReportsStatistics";

const Reports = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [dialogAddEdit, setDialogAddEdit] = useState<
  ReportInterface | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState<boolean>();

  const [dialogStatistics, setDialogStatistics] = useState<boolean>();
  
  const [
    reportResult,
    setReportResult,
  ] = useState<ReportInterface>();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination(
    "report"
  );
  const filters = useAppSelector(
    (state) => state.Report.filters
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
  const { data, isFetching, refetch } = useGetReportsPaginatedQuery(meta);

  const { data: statistics } = useGetReportStatisticsQuery();

    const { data: hazardClassifications} =
    useGetHazardClassificationsQuery();

  const [triggerAddEdit] = useCreateUpdateReportMutation();
  const [triggerDelete] = useDeleteReportMutation();

  const { data: user } = useGetUserQuery(
    JSON.parse(localStorage.getItem("userId"))
  );

  const { data: clientsResponse } = useGetClientsQuery();
  const activeClients = useMemo(
    () => clientsResponse?.data.filter((item) => !item.deactivated) ?? [],
    [clientsResponse]
  );

  const handleSearchSubmit = (newFilters: FiltersType): void => {
    dispatch(
      reportActions.setFilters({
        ...filters,
        ...newFilters,
      })
    );
    refetch();
  };

  const handleSubmitFilters = (newFilters: FiltersType): void => {
    dispatch(
      reportActions.setFilters({
        ...filters,
        ...newFilters,
      })
    );
    refetch();
  };

  const onChangePage = (newValue: number): void => {
    history.push(getReportPath(newValue, rowsPerPage));
  };

  const onChangeRowsPerPage = (newValue: number): void => {
    storeRowsPerPage(newValue);
    history.push(getReportPath(page, newValue));
  };

  return (
    <>
      <Paper>
        <ReportList<ReportInterface>
          data={data?.data}
          onEdit={setDialogAddEdit}
          onDelete={(payload: ReportInterface): Promise<void> =>
            triggerDelete(payload.reportId).unwrap()
          }
          onItemClick={(id) =>{
            history.push("/admin/reports/" + id)}
          }
          toolbarProps={{
            onAddClick: setDialogAddEdit,
            title: "",
            searchPlaceholder: "search.search",
            searchTextPropKey: "title",
            initFilters,
            filters,
            onFilterClick: setDialogFilters,
            onStatisticsClick: setDialogStatistics,
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
            ? "report.create"
            : "report.update"
        }
        open={dialogAddEdit}
      >
        <DialogFormReport
          initialData={dialogAddEdit!}
          hazardClassifications={hazardClassifications?.data}
          isCreated={isEmpty(dialogAddEdit)}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload: ReportInterface): Promise<void> =>
            triggerAddEdit(payload)
              .unwrap()
              .then((result) => {
                handleNotify(result);
                setReportResult(result.data);
              })
          }
          clients={activeClients}
        />
      </DialogFormFrame>
      <DialogFormFrame
        onClose={() => setDialogFilters(undefined)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormReportFilters
          initialData={dialogFilters!}
          onClose={() => setDialogFilters(undefined)}
          onSubmit={handleSubmitFilters}
          hazardClassifications={hazardClassifications?.data}
        />
      </DialogFormFrame>
      <DialogFormFrame
        onClose={() => setDialogStatistics(undefined)}
        title="report.statistics"
        open={dialogStatistics}
      >
        <DialogFormReportStatistics
          reportStatistics={statistics?.data}
        />
      </DialogFormFrame>
    </>
  );
};
export default Reports;

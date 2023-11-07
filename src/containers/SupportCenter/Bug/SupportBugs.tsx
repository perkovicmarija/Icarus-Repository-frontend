import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Paper } from "@mui/material";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import DialogFormSupportItem from "../../../components/support/DialogFormSupportItem";
import DialogFormSupportCenterFilters from "../../../components/support/DialogFormSupportCenterFilters";
import SupportBugList from "./SupportBugList";
import * as supportActions from "../../../redux/support/supportActions";
import {
  getSupportBugsPath,
  getSupportBugCommentsPath,
} from "../../../consts/routePaths";
import {
  FiltersType,
  SupportRequest,
  supportRequestsActions,
} from "../../../redux/support/supportRequests/supportRequestsSlice";
import { usePagination } from "../../../helpers/pagination";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

function SupportRequests() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const data = useAppSelector((state) => state.SupportRequests.data);
  const totalCount = useAppSelector(
    (state) => state.SupportRequests.meta.totalCount
  );
  const filters = useAppSelector((state) => state.SupportRequests.filters);

  const [dialogAddEdit, setDialogAddEdit] = useState<
    SupportRequest | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } =
    usePagination("supportRequests");

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
    dispatch(supportRequestsActions.getData(meta)).then(() =>
      setLoading(false)
    );
  }, [meta]);

  //
  const modules = useAppSelector((state) => state.SupportCenter.modules);
  const levels = useAppSelector((state) => state.SupportCenter.levels);
  const statuses = useAppSelector((state) => state.SupportCenter.statuses);
  useEffect(() => {
    /* dispatch(supportActions.loadAllModules());
    dispatch(supportActions.loadAllLevels());
    dispatch(supportActions.loadAllStatuses()); */
  }, []);
  //

  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(supportRequestsActions.setFilters({ ...filters, ...newFilters }));
    history.push(getSupportBugsPath(0, 0));
  };
  // PAGINATION
  const onChangePage = (newValue: number) => {
    history.push(getSupportBugsPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getSupportBugsPath(page, newValue));
  };

  const handleSupportItemClick = (item: SupportRequest) => {
    history.push(getSupportBugCommentsPath(item.supportBugId));
  };

  return (
    <Paper>
      <SupportBugList<SupportRequest>
        data={data}
        onEdit={handleSupportItemClick}
        onDelete={(payload) => {
          return dispatch(
            supportRequestsActions.deleteItem({
              softwareLogId: payload.supportBugId,
            })
          );
        }}
        //
        toolbarProps={{
          onAddClick: () => setDialogAddEdit({}),
          title: "support.bug.list",
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
        title="support.item"
        open={dialogAddEdit}
      >
        <DialogFormSupportItem
          initialData={dialogAddEdit}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload: any) => {
            return dispatch(
              supportRequestsActions.addEditItem({ payload, meta })
            );
          }}
          modules={modules}
          levels={levels}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogFilters(undefined)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormSupportCenterFilters
          initialData={dialogFilters}
          onClose={() => setDialogFilters(undefined)}
          onSubmit={handleSubmitFilters}
          statuses={statuses}
        />
      </DialogFormFrame>
    </Paper>
  );
}

export default SupportRequests;

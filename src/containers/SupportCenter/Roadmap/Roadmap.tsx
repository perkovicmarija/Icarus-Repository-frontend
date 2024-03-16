import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
//import { usePagination } from "../../../helpers/pagination";
//import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
//
import DialogFormRoadmap from "../../../components/support/Roadmap/DialogFormRoadmap";
import DialogFormRoadmapLogFilter from "../../../components/support/Roadmap/DialogFormRoadmapLogFilter";
import TableToolbar2 from "../../../components/core/Table/TableToolbar2";
import {
  FiltersType,
  RoadmapType,
  initFilters,
  roadmapActions,
} from "../../../redux/support/roadmap/roadmapSlice";
import { RoadmapList } from "../../../components/support/Roadmap/RoadmapList";
import {
  useAddEditRoadmapMutation,
  useDeleteRoadmapMutation,
  useGetRoadmapPaginatedQuery,
} from "../../../redux/support/roadmap/roadmapApi";

function Roadmap() {
  const dispatch = useAppDispatch();
  //const history = useHistory();

  const [dialogAddEdit, setDialogAddEdit] = useState<
    RoadmapType | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState<FiltersType | undefined>();

  const page = 0;
  const rowsPerPage = 50;

  const filters = useAppSelector((state) => state.Roadmap.filters);
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
  const { data, isFetching } = useGetRoadmapPaginatedQuery(meta);
  const [triggerDelete] = useDeleteRoadmapMutation();
  const [triggerAddEdit] = useAddEditRoadmapMutation();

  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(roadmapActions.setFilters({ ...filters, ...newFilters }));
    // history.push(getUsersPath(0));
  };
  // PAGINATION
  /* const onChangePage = (newValue: number) => {
    history.push(getUsersPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getUsersPath(page, newValue));
  }; */

  return (
    <div>
      <TableToolbar2
        title="support.roadmap"
        //
        onAddClick={setDialogAddEdit}
        //
        filters={filters}
        initFilters={initFilters}
        onFilterClick={setDialogFilters}
      />

      <RoadmapList
        data={data?.data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) =>
          triggerDelete(payload.icarusRoadmapLogId).unwrap()
        }
        loading={isFetching}
      />

      <DialogFormFrame
        onClose={() => setDialogFilters(undefined)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormRoadmapLogFilter
          initialData={dialogFilters!}
          onClose={() => setDialogFilters(undefined)}
          onSubmit={handleSubmitFilters}
        />
      </DialogFormFrame>

      {dialogAddEdit && (
        <DialogFormFrame
          onClose={() => setDialogAddEdit(undefined)}
          title="support.roadmap.new"
          open={dialogAddEdit}
        >
          <DialogFormRoadmap
            initialData={dialogAddEdit}
            onClose={() => setDialogAddEdit(undefined)}
            onSubmit={(payload: RoadmapType) =>
              triggerAddEdit(payload).unwrap()
            }
          />
        </DialogFormFrame>
      )}
    </div>
  );
}

export default Roadmap;

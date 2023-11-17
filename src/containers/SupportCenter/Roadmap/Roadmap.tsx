import { useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
//import { usePagination } from "../../../helpers/pagination";
//import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
//
import DialogFormRoadmap from "../../../components/support/DialogFormRoadmap";
import DialogFormRoadmapLogFilter from "../../../components/support/DialogFormRoadmapLogFilter";
import TableToolbar2 from "../../../components/core/Table/TableToolbar2";
import {
  FiltersType,
  RoadmapType,
  initFilters,
  roadmapActions,
} from "../../../redux/support/roadmapSlice";
import { RoadmapList } from "./RoadmapList";

function Roadmap() {
  const dispatch = useAppDispatch();
  //const history = useHistory();

  const data = useAppSelector((state) => state.Roadmap.data);
  //const totalCount = useAppSelector((state) => state.Roadmap.meta.totalCount);
  const filters = useAppSelector((state) => state.Roadmap.filters);

  const [dialogAddEdit, setDialogAddEdit] = useState<
    RoadmapType | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState<FiltersType | undefined>();

  const page = 0;
  const rowsPerPage = 50;

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
    dispatch(roadmapActions.getData(meta)).finally(() => setLoading(false));
  }, [meta]);

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
        data={data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) =>
          dispatch(roadmapActions.deleteItem({ payload, meta })).then(() =>
            dispatch(roadmapActions.getData(meta))
          )
        }
        loading={loading}
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
            onSubmit={(payload: any) =>
              dispatch(roadmapActions.addEditItem({ payload, meta })).then(() =>
                dispatch(roadmapActions.getData(meta))
              )
            }
          />
        </DialogFormFrame>
      )}
    </div>
  );
}

export default Roadmap;

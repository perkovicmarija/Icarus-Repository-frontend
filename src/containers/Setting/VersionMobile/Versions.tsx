import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { usePagination } from "../../../helpers/pagination";
import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
//
import VersionList from "./VersionList";
import DialogFormVersionMobile from "./DialogFormVersionMobile";
import { getVersionMobilePath } from "../../../consts/routePaths";
import {
  FiltersType,
  Version,
  VersionForAddEdit,
  versionsActions,
} from "../../../redux/setting/versionsSlice";
import { useGetClientsQuery } from "../../../redux/clientsApi";
import { toast } from "react-toastify";
import {
  useAddEditVersionMutation,
  useDeleteVersionMutation,
  useGetVersionsPaginatedQuery,
} from "../../../redux/versionsApi";

// Check if a version with the same client name, platform and version already exists
const checkForExistingCombination = (
  versionsMobile: Version[],
  newVersion: VersionForAddEdit
) => {
  return versionsMobile.some(
    (item) =>
      newVersion.versionMin === item.versionMin &&
      newVersion.platform === item.platform &&
      newVersion.selectedClients[0].clientId === item.client.clientId
  );
};

function Versions() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [dialogAddEdit, setDialogAddEdit] = useState<
    Version | {} | undefined
  >();
  /* const [dialogFilters, setDialogFilters] = useState(); */

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("versions");

  const filters = useAppSelector((state) => state.Versions.filters);
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
  const { data, isFetching } = useGetVersionsPaginatedQuery(meta);
  const [triggerDelete] = useDeleteVersionMutation();
  const [triggerAddEdit] = useAddEditVersionMutation();

  //
  const { data: clientsResponse } = useGetClientsQuery();
  const activeClients = useMemo(
    () => clientsResponse?.data.filter((item) => !item.deactivated) ?? [],
    [clientsResponse]
  );
  /* const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    ClientApi.getAllClients().then((response) =>
      setClients(response.data.filter((item: Client) => !item.deactivated))
    );
  }, []); */
  //

  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(versionsActions.setFilters({ ...filters, ...newFilters }));
    history.push(getVersionMobilePath(0));
  };
  // PAGINATION
  const onChangePage = (newValue: number) => {
    history.push(getVersionMobilePath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getVersionMobilePath(page, newValue));
  };

  return (
    <>
      <VersionList<Version>
        data={data?.data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) => triggerDelete(payload.versionMobileId).unwrap()}
        //
        toolbarProps={{
          onAddClick: setDialogAddEdit,
          title: "general.versionsMobile",
          searchPlaceholder: "search.byClientName",
          searchTextPropKey: "clientName",
          filters,
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
        title="general.versionMobile"
        open={dialogAddEdit}
      >
        <DialogFormVersionMobile
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload) => {
            const duplicate = checkForExistingCombination(data?.data!, payload);

            //Do not allow creating of duplicates
            if (!duplicate) {
              return triggerAddEdit(payload).unwrap();
            } else {
              toast("Duplicate", { type: "error" });
              throw new Error("duplicate");
            }
          }}
          clients={activeClients}
        />
      </DialogFormFrame>
    </>
  );
}

export default Versions;

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
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
import { Client } from "../../../redux/setting/clientsSlice";
import ClientApi from "../../../api/ClientApi";
import { toast } from "react-toastify";

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

  const data = useAppSelector((state) => state.Versions.data);
  const totalCount = useAppSelector((state) => state.Versions.meta.totalCount);
  const filters = useAppSelector((state) => state.Versions.filters);

  const [dialogAddEdit, setDialogAddEdit] = useState<
    Version | {} | undefined
  >();
  /* const [dialogFilters, setDialogFilters] = useState(); */

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("versions");

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
    dispatch(versionsActions.getData(meta)).finally(() => {
      setLoading(false);
    });
  }, [meta]);

  //
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    ClientApi.getAllClients().then((response) =>
      setClients(response.data.filter((item: Client) => !item.deactivated))
    );
  }, []);
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
        data={data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) =>
          dispatch(versionsActions.deleteItem({ payload, meta })).then(() =>
            dispatch(versionsActions.getData(meta))
          )
        }
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
        title="general.versionMobile"
        open={dialogAddEdit}
      >
        <DialogFormVersionMobile
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload) => {
            const duplicate = checkForExistingCombination(data!, payload);

            //Do not allow creating of duplicates
            if (!duplicate) {
              return dispatch(
                versionsActions.addEditItem({ payload, meta })
              ).then(() => dispatch(versionsActions.getData(meta)));
            } else {
              toast("Duplicate", { type: "error" });
              throw new Error("duplicate");
            }
          }}
          clients={clients}
        />
      </DialogFormFrame>
    </>
  );
}

export default Versions;

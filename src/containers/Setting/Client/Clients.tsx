import { /* useEffect,*/ useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { usePagination } from "../../../helpers/pagination";
import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
//
import ClientList from "./ClientList";
import DialogFormClient from "../../../components/setting/DialogFormClient";
import { getClientsPath } from "../../../consts/routePaths";
import {
  FiltersType,
  Client,
  clientsActions,
} from "../../../redux/setting/clientsSlice";

function Clients() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const data = useAppSelector((state) => state.Clients.data);
  const totalCount = useAppSelector((state) => state.Clients.meta.totalCount);
  const filters = useAppSelector((state) => state.Clients.filters);

  const [dialogAddEdit, setDialogAddEdit] = useState<Client | {} | undefined>();
  // const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("clients");

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
    dispatch(clientsActions.getData(meta)).finally(() => setLoading(false));
  }, [meta]);
  //

  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(clientsActions.setFilters({ ...filters, ...newFilters }));
    history.push(getClientsPath(0));
  };
  // PAGINATION
  const onChangePage = (newValue: number) => {
    history.push(getClientsPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getClientsPath(page, newValue));
  };

  return (
    <>
      <ClientList<Client>
        data={data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) => dispatch(clientsActions.deleteItem(payload))}
        //
        toolbarProps={{
          onAddClick: () => setDialogAddEdit({}),
          title: "form.clients",
          searchPlaceholder: "search.byName",
          searchTextPropKey: "clientSearch",
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
        title="general.client"
        open={dialogAddEdit}
      >
        <DialogFormClient
          initialData={dialogAddEdit}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload: any) => {
            return dispatch(clientsActions.addEditItem({ payload, meta }));
          }}
        />
      </DialogFormFrame>
    </>
  );
}

export default Clients;

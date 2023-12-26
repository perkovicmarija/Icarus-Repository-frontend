import { useMemo, useState } from "react";
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
  clientsActions,
} from "../../../redux/setting/clientsSlice";
import {
  Client,
  useAddEditClientMutation,
  useDeleteClientMutation,
  useGetClientsPaginatedQuery,
} from "../../../redux/clientsApi";

function Clients() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [dialogAddEdit, setDialogAddEdit] = useState<Client | {} | undefined>();
  // const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("clients");

  const filters = useAppSelector((state) => state.Clients.filters);
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
  const { data, isFetching } = useGetClientsPaginatedQuery(meta);
  const [triggerDelete] = useDeleteClientMutation();
  const [triggerAddEdit] = useAddEditClientMutation();

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
    history.push(getClientsPath(0, newValue));
  };

  return (
    <>
      <ClientList<Client>
        data={data?.data}
        onEdit={setDialogAddEdit}
        onDelete={
          (payload) => triggerDelete(payload.clientId).unwrap()
          //.then(() => refetch())
          /* dispatch(clientsActions.deleteItem({ payload, meta })).then(() =>
            refetch()
          ) */
        }
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
        title="general.client"
        open={dialogAddEdit}
      >
        <DialogFormClient
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={
            (payload: any) => triggerAddEdit(payload).unwrap()
            /* dispatch(clientsActions.addEditItem({ payload, meta })).then(() =>
              refetch()
            ) */
          }
        />
      </DialogFormFrame>
    </>
  );
}

export default Clients;

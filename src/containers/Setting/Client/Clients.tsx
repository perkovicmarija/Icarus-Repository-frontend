import {useEffect, useMemo, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { usePagination } from "../../../helpers/pagination";
import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
//
import ClientList from "./ClientList";
import DialogFormClient from "../../../components/setting/DialogFormClient";
import {
  getAndroidClientsPath,
  getClientsPath,
  getIOSClientsPath,
  getMobileLogsPath,
  getWebClientsPath
} from "../../../consts/routePaths";
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

function Clients({ actions }: { actions?: boolean }) {
  const { actions: showActions = true } = { actions };
  const addNewClientProps = showActions ? { onAddClick: () => setDialogAddEdit({}) } : {};

  const dispatch = useAppDispatch();
  const history = useHistory();

  const [dialogAddEdit, setDialogAddEdit] = useState<Client | {} | undefined>();
  const [mobilePlatform, setMobilePlatform] = useState<string>('')
  // const [dialogFilters, setDialogFilters] = useState();

  useEffect(() => {
    if (history.location.pathname.includes('ios')) {
      setMobilePlatform('ios')
    } else if (history.location.pathname.includes('android')) {
      setMobilePlatform('android')
    } else if (history.location.pathname.includes('web')) {
      setMobilePlatform('web')
    }
  },[])

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

  const handleClickRow = (item: Client) => {
    history.push(getMobileLogsPath(mobilePlatform, item.abbreviation));
  }

  const navigateToPlatformPath = (page, rowsPerPage = null) => {
    switch (mobilePlatform) {
      case 'ios':
        history.push(getIOSClientsPath(page, rowsPerPage));
        break;
      case 'android':
        history.push(getAndroidClientsPath(page, rowsPerPage));
        break;
      case 'web':
        history.push(getWebClientsPath(page, rowsPerPage));
        break;
      default:
        history.push(getClientsPath(page, rowsPerPage));
    }
  };

  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(clientsActions.setFilters({ ...filters, ...newFilters }));
    navigateToPlatformPath(0);
  };

  const onChangePage = (newValue: number) => {
    navigateToPlatformPath(newValue, rowsPerPage);
  };

  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    navigateToPlatformPath(0, newValue);
  };


  return (
    <>
      <ClientList<Client>
        onClickRow={handleClickRow}
        showActions={showActions}
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
          ...addNewClientProps,
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

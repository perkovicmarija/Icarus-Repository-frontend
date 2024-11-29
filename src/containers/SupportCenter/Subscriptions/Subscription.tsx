import {useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/store";
import {usePagination} from "../../../helpers/pagination";
import {useHistory} from "react-router-dom";
import {isEmpty} from "lodash";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
//
import SubscriptionList from "../../../components/support/Subscriptions/SubscriptionList";
import DialogFormSubscriptions from "../../../components/support/Subscriptions/DialogFormSubscriptions";
import DialogFormSubscriptionFilter from "../../../components/support/Subscriptions/DialogFormSubscriptionFilter";
import {getSoftwareLogSubscriptionsPath} from "../../../consts/routePaths";
import {FiltersType, initFilters,} from "../../../redux/support/subscriptions/softwareLogSubscriptionSlice";
import {useGetClientsQuery} from "../../../redux/settings/clientsApi";
import {
  SoftwareLogSubscription,
  softwareLogSubscriptionActions
} from "../../../redux/support/subscriptions/softwareLogSubscriptionSlice";
import {
  useAddEditSoftwareLogSubscriptionMutation,
  useDeleteSoftwareLogSubscriptionMutation,
  useGetSoftwareLogSubscriptionsPaginatedQuery
} from "../../../redux/support/subscriptions/softwareLogSubscriptionApi";

const Subscription = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [dialogAddEdit, setDialogAddEdit] = useState<
    SoftwareLogSubscription | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } = usePagination("softwareLogSubscriptions");
  const filters = useAppSelector((state) => state.SoftwareLogSubscriptions.filters);
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
  const { data, isFetching } = useGetSoftwareLogSubscriptionsPaginatedQuery(meta);
  const [triggerDelete] = useDeleteSoftwareLogSubscriptionMutation();
  const [triggerAddEdit] = useAddEditSoftwareLogSubscriptionMutation();

  //
  const { data: clientsResponse } = useGetClientsQuery();
  const activeClients = useMemo(
    () => clientsResponse?.data.filter((item) => !item.deactivated) ?? [],
    [clientsResponse]
  );
  //

  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(softwareLogSubscriptionActions.setFilters({ ...filters, ...newFilters }));
    history.push(getSoftwareLogSubscriptionsPath(0));
  };
  // PAGINATION
  const onChangePage = (newValue: number) => {
    history.push(getSoftwareLogSubscriptionsPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getSoftwareLogSubscriptionsPath(page, newValue));
  };

  return (
    <>
      <SubscriptionList<SoftwareLogSubscription>
        data={data?.data}
        onEdit={setDialogAddEdit}
        onDelete={(payload) =>
          triggerDelete(payload.supportSoftwareLogSubscriptionId).unwrap()
        }
        //
        toolbarProps={{
          onAddClick: setDialogAddEdit,
          title: "support.subscriptions",
          searchPlaceholder: "search.search",
          searchTextPropKey: "softwareLogSearch",
          initFilters,
          filters,
          onFilterClick: setDialogFilters,
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
        title={
          isEmpty(dialogAddEdit) ? "support.subscriptions.new" : "support.subscriptions.update"
        }
        open={dialogAddEdit}
      >
        <DialogFormSubscriptions
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload) => triggerAddEdit(payload).unwrap()}
          clients={activeClients}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogFilters(undefined)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormSubscriptionFilter
          initialData={dialogFilters!}
          onClose={() => setDialogFilters(undefined)}
          onSubmit={handleSubmitFilters}
          clients={clientsResponse?.data ?? []}
        />
      </DialogFormFrame>
    </>
  );
};

export default Subscription;

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { usePagination } from "../../helpers/pagination";
import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import { isEmpty } from "lodash";
//
import AuditChecklistsList from "./AuditChecklistsList";
import DialogFormChecklistFilters from "./dialogs/DialogFormChecklistFilters";
import DialogFormRevisions from "./dialogs/DialogFormRevisions";
import DialogFormNewChecklistVersion from "./dialogs/DialogFormNewChecklistVersion";
import DialogFormNewChecklist from "./dialogs/DialogFormNewChecklist";
import { getAuditChecklistOverviewPath } from "../../consts/routePaths";
import {
  FiltersType,
  auditChecklistsActions,
  AuditChecklist,
  initFilters,
  AuditChecklistType,
  AuditChecklistDomain,
} from "../../redux/auditChecklistsSlice";
import AuditChecklistApi from "../../api/auditChecklist/AuditChecklistApi";
import {
  useAddEditAuditChecklistMutation,
  useCreateAuditChecklistNewVersionMutation,
  useDeleteAuditChecklistMutation,
  useGetAuditChecklistsPaginatedQuery,
} from "../../redux/auditChecklistsApi";

const AuditChecklistOverview = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [dialogAddEdit, setDialogAddEdit] = useState<
    AuditChecklist | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } =
    usePagination("auditChecklists");
  const filters = useAppSelector((state) => state.AuditChecklists.filters);
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
  const { data, isFetching } = useGetAuditChecklistsPaginatedQuery(meta);
  const [triggerDelete] = useDeleteAuditChecklistMutation();
  const [triggerAddEdit] = useAddEditAuditChecklistMutation();
  const [triggerCreateNewVersion] = useCreateAuditChecklistNewVersionMutation();

  //
  const [auditChecklistTypes, setAuditChecklistTypes] = useState<
    AuditChecklistType[]
  >([]);
  useEffect(() => {
    AuditChecklistApi.getAuditChecklistsTypes().then((response) =>
      setAuditChecklistTypes(response.data)
    );
  }, []);
  const [auditChecklistDomains, setAuditChecklistDomains] = useState<
    AuditChecklistDomain[]
  >([]);
  useEffect(() => {
    AuditChecklistApi.getAuditChecklistsDomains().then((response) =>
      setAuditChecklistDomains(response.data)
    );
  }, []);
  //

  const handleSubmitFilters = (newFilters: FiltersType) => {
    dispatch(auditChecklistsActions.setFilters({ ...filters, ...newFilters }));
    history.push(getAuditChecklistOverviewPath(0));
  };
  // PAGINATION
  const onChangePage = (newValue: number) => {
    history.push(getAuditChecklistOverviewPath(newValue, rowsPerPage));
  };
  const onChangeRowsPerPage = (newValue: number) => {
    storeRowsPerPage(newValue);
    history.push(getAuditChecklistOverviewPath(page, newValue));
  };

  //Dialogs
  const [dialogNewVersion, setDialogNewVersion] = useState<AuditChecklist>();
  const [dialogRevisions, setDialogRevisions] = useState<AuditChecklist>();

  /* const handleChecklistNewVersion = (event, item) => {
    setDialogNewVersionOpen(true);
    let checklistEdit = cloneDeep(item);
    checklistEdit.abbreviationOld = item.abbreviation;
    setChecklist(checklistEdit);
  };*/

  return (
    <>
      <AuditChecklistsList<AuditChecklist>
        data={data?.data}
        onItemClick={(id) => history.push("/admin/audit-checklists/" + id)}
        onEdit={setDialogAddEdit}
        onNewVersion={setDialogNewVersion}
        onShowRevisions={setDialogRevisions}
        onDelete={(payload) => triggerDelete(payload.auditChecklistId).unwrap()}
        //
        toolbarProps={{
          onAddClick: () => setDialogAddEdit({}),
          title: "qms.audits.checklists",
          searchPlaceholder: "general.search.idTitle2",
          searchTextPropKey: "stringSearch",
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
          isEmpty(dialogAddEdit) ? "qms.newChecklist" : "qms.editChecklist"
        }
        open={dialogAddEdit}
      >
        <DialogFormNewChecklist
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload) => triggerAddEdit(payload).unwrap()}
          domains={auditChecklistDomains}
          types={auditChecklistTypes}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogNewVersion(undefined)}
        title="qms.checklist.newVersion"
        open={dialogNewVersion}
      >
        <DialogFormNewChecklistVersion
          initialData={dialogNewVersion!}
          onClose={() => setDialogNewVersion(undefined)}
          onSubmit={(payload) => triggerCreateNewVersion(payload).unwrap()}
          //
          domains={auditChecklistDomains}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogRevisions(undefined)}
        title={"general.revisions"}
        open={dialogRevisions}
      >
        <DialogFormRevisions
          onClose={() => setDialogRevisions(undefined)}
          handleViewChecklist={(item) =>
            history.push("/admin/audit-checklists/" + item.auditChecklistId)
          }
          auditChecklist={dialogRevisions!}
        />
      </DialogFormFrame>

      <DialogFormFrame
        onClose={() => setDialogFilters(undefined)}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormChecklistFilters
          initialData={dialogFilters!}
          onClose={() => setDialogFilters(undefined)}
          onSubmit={handleSubmitFilters}
          checklistTypes={auditChecklistTypes}
        />
      </DialogFormFrame>
    </>
  );
};

export default AuditChecklistOverview;

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { usePagination } from "../../helpers/pagination";
import { useHistory } from "react-router-dom";
import DialogFormFrame from "../../components/core/Dialog/DialogFormFrame";
import { isEmpty } from "lodash";
//
import AuditChecklistsList from "./AuditChecklistsList";
import DialogFormChecklistFilters from "../../components/auditChecklist/dialogs/DialogFormChecklistFilters";
import DialogFormRevisions from "../../components/auditChecklist/dialogs/DialogFormRevisions";
import DialogFormNewChecklistVersion from "../../components/auditChecklist/dialogs/DialogFormNewChecklistVersion";
import DialogFormNewChecklist from "../../components/auditChecklist/dialogs/DialogFormNewChecklist";
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

const AuditChecklistOverview = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const data = useAppSelector((state) => state.AuditChecklists.data);
  const totalCount = useAppSelector(
    (state) => state.AuditChecklists.meta.totalCount
  );
  const filters = useAppSelector((state) => state.AuditChecklists.filters);

  const [dialogAddEdit, setDialogAddEdit] = useState<
    AuditChecklist | {} | undefined
  >();
  const [dialogFilters, setDialogFilters] = useState();

  const { page, rowsPerPage, storeRowsPerPage } =
    usePagination("auditChecklists");

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
    dispatch(auditChecklistsActions.getData(meta)).finally(() =>
      setLoading(false)
    );
  }, [meta]);

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
  const [dialogNewVersionOpen, setDialogNewVersionOpen] = useState(false);
  const [dialogRevisions, setDialogRevisions] = useState<AuditChecklist>();

  /* const handleChecklistNewVersion = (event, item) => {
    setDialogNewVersionOpen(true);
    let checklistEdit = cloneDeep(item);
    checklistEdit.abbreviationOld = item.abbreviation;
    setChecklist(checklistEdit);
  };

  const handleDialogNewChecklistVersionSubmit = () => {
    let viewModelChecklist = cloneDeep(checklist);
    viewModelChecklist.version = viewModelChecklist.versionNew;
    viewModelChecklist.abbreviation = viewModelChecklist.abbreviationNew;

    if (viewModelChecklist.auditChecklistId) {
      const viewModel = {
        pagination: {
          filters: filters,
          pagination: {
            page,
            rowsPerPage,
          },
        },
        checklist: viewModelChecklist,
      };
      dispatch(auditChecklistActions.createNewVersionRequest(viewModel));
    }

    setDialogNewVersionOpen(false);
  }; */

  return (
    <>
      <AuditChecklistsList<AuditChecklist>
        data={data}
        onItemClick={(id) => history.push("/admin/audit-checklists/" + id)}
        onEdit={setDialogAddEdit}
        onNewVersion={() => alert("TODO")}
        onShowRevisions={setDialogRevisions}
        onDelete={(payload) =>
          dispatch(auditChecklistsActions.deleteItem(payload))
        }
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
        title={
          isEmpty(dialogAddEdit) ? "qms.newChecklist" : "qms.editChecklist"
        }
        open={dialogAddEdit}
      >
        <DialogFormNewChecklist
          initialData={dialogAddEdit!}
          onClose={() => setDialogAddEdit(undefined)}
          onSubmit={(payload) => {
            return dispatch(
              auditChecklistsActions.addEditItem({ payload, meta })
            );
          }}
          domains={auditChecklistDomains}
          types={auditChecklistTypes}
        />
      </DialogFormFrame>

      {/* <DialogFormFrame
        onClose={handleChecklistNewVersionClose}
        title="qms.checklist.newVersion"
        open={dialogNewVersionOpen}
      >
        <DialogFormNewChecklistVersion
          onClose={handleChecklistNewVersionClose}
          onSubmit={handleDialogNewChecklistVersionSubmit}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onDateTimeChange={handleDateTimeChange}
          domains={domains}
          isEdit={isEditChecklist}
          checklist={checklist}
        />
      </DialogFormFrame>
      */}

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

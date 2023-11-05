import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuditChecklistsList from "../../../components/auditChecklist/AuditChecklistsList";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import DialogFormNewChecklist from "../../../components/auditChecklist/dialogs/DialogFormNewChecklist";
import DialogFormNewChecklistVersion from "../../../components/auditChecklist/dialogs/DialogFormNewChecklistVersion";
import DialogFormRevisions from "../../../components/auditChecklist/dialogs/DialogFormRevisions";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import DialogFormChecklistFilters from "../../../components/auditChecklist/dialogs/DialogFormChecklistFilters";
import { cloneDeep } from "lodash";
import { auditChecklistActions } from "../../../redux/auditChecklist/auditChecklistReducer";
import { Paper } from "@mui/material";

const AuditChecklistOverview = (props) => {
  const dispatch = useDispatch();

  const auditChecklists = useSelector(
    (state) => state.AuditChecklist.auditChecklists
  );
  const totalCount = useSelector((state) => state.AuditChecklist.totalCount);
  const domains = useSelector(
    (state) => state.AuditChecklist.auditChecklistDomains
  );
  const auditChecklistTypes = useSelector(
    (state) => state.AuditChecklist.auditChecklistTypes
  );
  const filters = useSelector((state) => state.AuditChecklist.filters);

  //Paging
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  //Order
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("irmTimestamp");

  //Dialogs
  const [dialogFilters, setDialogFilters] = useState();
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);
  const [dialogNewChecklistOpen, setDialogNewChecklistOpen] = useState(false);
  const [dialogNewVersionOpen, setDialogNewVersionOpen] = useState(false);
  const [dialogRevisionsOpen, setDialogRevisionsOpen] = useState(false);

  //Edit
  const [isEditChecklist, setIsEditChecklist] = useState(false);
  const [newEditChecklistLabel, setNewEditChecklistLabel] =
    useState("qms.newChecklist");

  //Label
  const [labelChecklist, setLabelChecklist] = useState("");

  //Checklist delete
  const [checklistIdForDelete, setChecklistIdForDelete] = useState(undefined);

  //Checklist
  const [checklist, setChecklist] = useState({
    checklistRevisions: [],
  });

  useEffect(() => {
    return () => {
      dispatch(auditChecklistActions.clearAuditChecklists());
    };
  }, []);

  useEffect(() => {
    dispatch(auditChecklistActions.getAuditChecklistsDomains());
    dispatch(auditChecklistActions.getAuditChecklistTypes());

    const viewModel = {
      filters,
      pagination: {
        page,
        rowsPerPage,
      },
    };

    dispatch(auditChecklistActions.getAllActiveRequest(viewModel));
  }, []);

  const onChangePage = (event, page) => {
    setPage(page);

    const viewModel = {
      filters: filters,
      pagination: {
        page,
        rowsPerPage,
      },
    };
    dispatch(auditChecklistActions.getAllActiveRequest(viewModel));
  };

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);

    const viewModel = {
      filters: filters,
      pagination: {
        page,
        rowsPerPage: event.target.value,
      },
    };
    dispatch(auditChecklistActions.getAllActiveRequest(viewModel));
  };

  const onRequestSort = (event, property) => {
    const orderByModel = property;
    let orderModel = "desc";

    if (orderBy === property && order === "desc") {
      orderModel = "asc";
    }

    setOrder(orderModel);
    setOrderBy(orderByModel);
  };

  const handleAuditChecklistClick = (event, id) => {
    props.history.push("/admin/audit-checklists/" + id);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setChecklist({
      ...checklist,
      [name]: value,
    });
  };

  const handleChecklistNewClick = () => {
    setChecklist({});
    setIsEditChecklist(false);
    setNewEditChecklistLabel("qms.newChecklist");
    setDialogNewChecklistOpen(true);
  };

  const handleDialogNewChecklistClose = () => {
    setDialogNewChecklistOpen(false);
  };

  const handleDialogNewChecklistSubmit = () => {
    let viewModelChecklist = cloneDeep(checklist);

    if (
      viewModelChecklist.auditChecklistId !== undefined &&
      viewModelChecklist.auditChecklistId !== null
    ) {
      let viewModel = {
        checklist: viewModelChecklist,
      };
      dispatch(auditChecklistActions.updateAuditChecklistRequest(viewModel));
    } else {
      dispatch(
        auditChecklistActions.createAuditChecklistRequest(viewModelChecklist)
      );
    }
    setDialogNewChecklistOpen(false);
  };

  const handleChecklistEdit = (event, item) => {
    setIsEditChecklist(true);
    setNewEditChecklistLabel("qms.editChecklist");
    setDialogNewChecklistOpen(true);
    //let checklistEdit = item;
    setChecklist(item);
  };

  const handleChecklistDelete = (event, item) => {
    setDialogWarningOpen(true);
    setChecklistIdForDelete(item.auditChecklistId);
  };

  const handleDeleteChecklistClose = () => {
    setDialogWarningOpen(false);
  };

  const handleDeleteChecklistConfirmed = () => {
    let viewModel = {
      id: checklistIdForDelete,
    };
    dispatch(auditChecklistActions.deleteAuditChecklistRequest(viewModel));
    setDialogWarningOpen(false);
  };

  const handleChecklistNewVersion = (event, item) => {
    setDialogNewVersionOpen(true);
    let checklistEdit = cloneDeep(item);
    checklistEdit.abbreviationOld = item.abbreviation;
    setChecklist(checklistEdit);
  };

  const handleChecklistNewVersionClose = () => {
    setDialogNewVersionOpen(false);
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
  };

  const handleChecklistRevisions = (event, item) => {
    setDialogRevisionsOpen(true);
    let viewModel = item;
    setChecklist(viewModel);
    setLabelChecklist(viewModel.title);
  };

  const handleDialogRevisionsClose = () => {
    setDialogRevisionsOpen(false);
  };

  const handleSelectChange = (event) => {
    let viewModel = cloneDeep(checklist);
    if (event.target.name === "domain") {
      for (let i = 0; i < domains.length; i++) {
        if (domains[i].domainId === event.target.value) {
          viewModel.domain = domains[i];
        }
      }
    }
    if (event.target.name === "auditChecklistType") {
      for (let i = 0; i < auditChecklistTypes.length; i++) {
        if (
          auditChecklistTypes[i].auditChecklistTypeId === event.target.value
        ) {
          viewModel.auditChecklistType = auditChecklistTypes[i];
        }
      }
    }
    setChecklist(viewModel);
  };

  const handleDateTimeChange = (name, event) => {
    setChecklist({
      ...checklist,
      [name]: event,
    });
  };

  const handleFilterSubmit = (newFilters) => {
    const viewModel = {
      filters: { ...filters, ...newFilters },
      pagination: {
        page,
        rowsPerPage,
      },
    };
    dispatch(auditChecklistActions.getAllActiveRequest(viewModel));
  };

  const onChecklistRevisionView = (item) => {
    props.history.push("/admin/audit-checklists/" + item.auditChecklistId);
  };

  return (
    <Paper>
      <AuditChecklistsList
        auditChecklists={auditChecklists}
        handleAuditChecklistClick={handleAuditChecklistClick}
        handleChecklistNewClick={handleChecklistNewClick}
        handleChecklistEdit={handleChecklistEdit}
        handleChecklistNewVersion={handleChecklistNewVersion}
        handleChecklistRevisions={handleChecklistRevisions}
        handleChecklistDelete={handleChecklistDelete}
        //
        filters={filters}
        onFilterClick={() => setDialogFilters(filters)}
        onSearchSubmit={handleFilterSubmit}
        //
        onRequestSort={onRequestSort}
        order={order}
        orderBy={orderBy}
        //
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
      <DialogFormFrame
        onClose={handleDialogNewChecklistClose}
        title={newEditChecklistLabel}
        open={dialogNewChecklistOpen}
      >
        <DialogFormNewChecklist
          onClose={handleDialogNewChecklistClose}
          onSubmit={handleDialogNewChecklistSubmit}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onDateTimeChange={handleDateTimeChange}
          domains={domains}
          types={auditChecklistTypes}
          isEdit={isEditChecklist}
          checklist={checklist}
        />
      </DialogFormFrame>
      <DialogFormFrame
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
      <DialogFormFrame
        onClose={handleDialogRevisionsClose}
        title={labelChecklist}
        open={dialogRevisionsOpen}
      >
        <DialogFormRevisions
          onClose={handleDialogRevisionsClose}
          handleViewChecklist={onChecklistRevisionView}
          revisions={checklist.checklistRevisions}
        />
      </DialogFormFrame>
      <DialogDeleteWarning
        open={dialogWarningOpen}
        text="general.deleteWarning"
        onDelete={handleDeleteChecklistConfirmed}
        onClose={handleDeleteChecklistClose}
      />

      <DialogFormFrame
        onClose={() => setDialogFilters()}
        title="general.selectFilters"
        open={dialogFilters}
      >
        <DialogFormChecklistFilters
          initialData={dialogFilters}
          onClose={() => setDialogFilters()}
          onSubmit={handleFilterSubmit}
          checklistTypeId="auditChecklistTypeId"
          checklistTypes={auditChecklistTypes}
        />
      </DialogFormFrame>
    </Paper>
  );
};

export default AuditChecklistOverview;

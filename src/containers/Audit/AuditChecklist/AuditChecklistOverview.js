import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AuditChecklistsList from "../../../components/auditChecklist/AuditChecklistsList";
import DialogFormFrame from "../../../components/core/Dialog/DialogFormFrame";
import DialogFormNewChecklist from "../../../components/auditChecklist/dialogs/DialogFormNewChecklist";
import DialogFormNewChecklistVersion from "../../../components/auditChecklist/dialogs/DialogFormNewChecklistVersion";
import DialogFormRevisions from "../../../components/auditChecklist/dialogs/DialogFormRevisions";
import DialogDeleteWarning from "../../../components/core/Dialog/DialogDeleteWarning";
import DialogFormChecklistFilters from "../../../components/auditChecklist/dialogs/DialogFormChecklistFilters";
import {cloneDeep} from "lodash";
import { auditChecklistActions } from "../../../redux/auditChecklist/auditChecklistReducer";


const AuditChecklistOverview = (props) => {

    const dispatch = useDispatch();

    const auditChecklists = useSelector((state) => state.AuditChecklist.auditChecklists);
    const totalCount = useSelector((state) => state.AuditChecklist.totalCount);
    const domains = useSelector((state) => state.AuditChecklist.auditChecklistDomains);
    const auditChecklistTypes = useSelector((state) => state.AuditChecklist.auditChecklistTypes);
    const filters = useSelector((state) => state.AuditChecklist.filters);

    const filtersActive = useMemo(() => {
        return filters.startDate !== null
            || filters.endDate !== null
            || filters.checklistTypes.length !== 0;
    }, [filters]);

    //Paging
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    //Order
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('irmTimestamp');

    //Dialogs
    const [dialogFiltersOpen, setDialogFiltersOpen] = useState(false);
    const [dialogWarningOpen, setDialogWarningOpen] = useState(false);
    const [dialogNewChecklistOpen, setDialogNewChecklistOpen] = useState(false);
    const [dialogNewVersionOpen, setDialogNewVersionOpen] = useState(false);
    const [dialogRevisionsOpen, setDialogRevisionsOpen] = useState(false);

    //Edit
    const [isEditChecklist, setIsEditChecklist] = useState(false);
    const [newEditChecklistLabel, setNewEditChecklistLabel] = useState('qms.newChecklist');

    //Label
    const [labelChecklist, setLabelChecklist] = useState('');

    //Checklist delete
    const [checklistIdForDelete, setChecklistIdForDelete] = useState(undefined);

    //Checklist
    const [checklist, setChecklist] = useState({
        checklistRevisions: [],
    });


    useEffect(() => {
        return () => {
            dispatch(auditChecklistActions.clearAuditChecklists());
        }
    }, []);

    useEffect(() => {
        dispatch(auditChecklistActions.getAuditChecklistsDomains());
        dispatch(auditChecklistActions.getAuditChecklistTypes());

        const viewModel = {
            filters: filters,
            pagination: {
                page: page,
                rowsPerPage: rowsPerPage
            }
        };

        dispatch(auditChecklistActions.getAllActiveRequest(viewModel));
    }, []);

    const handleChangePage = (event, page) => {
        setPage(page);

        const viewModel = {
            filters: filters,
            pagination: {
                page: page,
                rowsPerPage: rowsPerPage
            }
        };
        dispatch(auditChecklistActions.getAllActiveRequest(viewModel));
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value);

        const viewModel = {
            filters: filters,
            pagination: {
                page: page,
                rowsPerPage: event.target.value
            }
        }
        dispatch(auditChecklistActions.getAllActiveRequest(viewModel));
    };

    const handleRequestSort = (event, property) => {
        const orderByModel = property;
        let orderModel = 'desc';

        if (orderBy === property && order === 'desc') {
            orderModel = 'asc';
        }

        setOrder(orderModel);
        setOrderBy(orderByModel);
    };

    const handleAuditChecklistClick = (event, id) => {
        props.history.push('/admin/audit-checklists/' + id);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setChecklist({
            ...checklist,
            [name]: value
        });
    };

    const handleChecklistNewClick = () => {
        setChecklist({});
        setIsEditChecklist(false);
        setNewEditChecklistLabel('qms.newChecklist');
        setDialogNewChecklistOpen(true);
    };

    const handleDialogNewChecklistClose = () => {
        setDialogNewChecklistOpen(false);
    };

    const handleDialogNewChecklistSubmit = () => {
        let viewModelChecklist = cloneDeep(checklist);

        if (viewModelChecklist.auditChecklistId !== undefined && viewModelChecklist.auditChecklistId !== null ) {
            let viewModel = {
                checklist: viewModelChecklist
            };
            dispatch(auditChecklistActions.updateAuditChecklistRequest(viewModel));
        } else {
            dispatch(auditChecklistActions.createAuditChecklistRequest(viewModelChecklist));
        }
        setDialogNewChecklistOpen(false);
    };

    const handleChecklistEdit = (event, item) => {
        setIsEditChecklist(true);
        setNewEditChecklistLabel('qms.editChecklist');
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
            id : checklistIdForDelete
        }
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
                pagination : {
                    filters: filters,
                    pagination: {
                        page: page,
                        rowsPerPage: rowsPerPage
                    }
                },
                checklist: viewModelChecklist
            }
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
                if (auditChecklistTypes[i].auditChecklistTypeId === event.target.value) {
                    viewModel.auditChecklistType = auditChecklistTypes[i];
                }
            }
        }
        setChecklist(viewModel);
    };

    const handleDateTimeChange = (name, event) => {
        setChecklist({
            ...checklist,
            [name]: event
        });
    };

    const handleInputSearchChange = (event) => {
        dispatch(auditChecklistActions.setFilterStringSearch(event.target.value));
    };

    const handleSearchSubmit = () => {
        const viewModel = {
            filters: filters,
            pagination: {
                page: page,
                rowsPerPage: rowsPerPage
            }
        }
        dispatch(auditChecklistActions.getAllActiveRequest(viewModel));
    };

    const handleChecklistFilterClick = () => {
        setDialogFiltersOpen(true);
    };

    const handleFilterDialogClose = () => {
        setDialogFiltersOpen(false);
    };

    const handleFilterSubmit = () => {
        setDialogFiltersOpen(false);
        const viewModel = {
            filters: filters,
            pagination: {
                page: page,
                rowsPerPage: rowsPerPage
            }
        }
        dispatch(auditChecklistActions.getAllActiveRequest(viewModel));
    };

    const handleClearAllFilters = () => {
        dispatch(auditChecklistActions.clearFilters());
    };

    const handleStartDateChange = (name, event) => {
        dispatch(auditChecklistActions.setFilterStartDate(event));
    };

    const handleEndDateChange = (name, event) => {
        dispatch(auditChecklistActions.setFilterEndDate(event));
    };

    const handleMultiSelectChangeChecklistType = (event) => {
        const selectedIds = event.target.value;
        let selectedChecklistTypes = [];
        for(let i = 0, l = selectedIds.length; i < l; i++) {
            const typeObject = auditChecklistTypes.find(type => type.auditChecklistTypeId === selectedIds[i]);
            selectedChecklistTypes.push(typeObject);
        }
        dispatch(auditChecklistActions.setFilterType(selectedChecklistTypes));
    };

    const onChecklistRevisionView = (item) => {
        props.history.push('/admin/audit-checklists/' + item.auditChecklistId);
    };

    return (
        <div>
            <AuditChecklistsList
                auditChecklists={auditChecklists}
                totalCount={totalCount}
                filtersActive={filtersActive}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChecklistFilterClick={handleChecklistFilterClick}
                handleAuditChecklistClick={handleAuditChecklistClick}
                handleChecklistNewClick={handleChecklistNewClick}
                handleChecklistEdit={handleChecklistEdit}
                handleChecklistNewVersion={handleChecklistNewVersion}
                handleChecklistRevisions={handleChecklistRevisions}
                handleChecklistDelete={handleChecklistDelete}
                onInputSearchChange={handleInputSearchChange}
                searchValue={filters.stringSearch}
                onSearchSubmit={handleSearchSubmit}
                handleRequestSort={handleRequestSort}
                order={order}
                orderBy={orderBy}
                page={page}
                rowsPerPage={rowsPerPage}
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
                onClose={handleFilterDialogClose}
                title="general.selectFilters"
                open={dialogFiltersOpen}
            >
                <DialogFormChecklistFilters
                    onClearAll={handleClearAllFilters}
                    onClose={handleFilterDialogClose}
                    onSubmit={handleFilterSubmit}
                    onMultiSelectChangeChecklistType={handleMultiSelectChangeChecklistType}
                    onStartDateChange={handleStartDateChange}
                    onEndDateChange={handleEndDateChange}
                    checklistTypeId="auditChecklistTypeId"
                    filters={filters}
                    checklistTypes={auditChecklistTypes}
                />
            </DialogFormFrame>
        </div>
    );
}

export default AuditChecklistOverview;
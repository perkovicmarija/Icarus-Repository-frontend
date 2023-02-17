import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cloneDeep } from 'lodash';

import DialogFormSupportItem from '../../../components/support/DialogFormSupportItem';
import DialogFormSupportCenterFilters from '../../../components/support/DialogFormSupportCenterFilters';
import SupportBugList from './SupportBugList';
import DialogFormFrame from '../../../components/core/Dialog/DialogFormFrame';
import * as supportActions from '../../../redux/support/supportActions';
import { getSupportBugsPath, getSupportBugCommentsPath } from "../../../consts/routePaths";

function SupportBugs(props) {
    const [dialogItemOpen, setDialogItemOpen] = useState(false);
    const [dialogFiltersOpen, setDialogFiltersOpen] = useState(false);
    const [supportItem, setSupportItem] = useState({});

    useEffect(() => {
        const viewModel = {
            filters: props.filters,
            pagination: {
                page: props.page,
                rowsPerPage: props.rowsPerPage
            }
        }
        props.supportActions.loadAll(viewModel);
        props.supportActions.loadAllModules();
        props.supportActions.loadAllLevels();
        props.supportActions.loadAllStatuses();
    }, []);

    const handleChangePage = (event, page) => {
        props.history.push(getSupportBugsPath(page, props.rowsPerPage));
    };

    const handleChangeRowsPerPage = event => {
        props.history.push(getSupportBugsPath(props.page, event.target.value));
    };

    const handleSupportItemClick = (event, id) => {
        //this.setState({dialogItemDetailsOpen: true});
        props.history.push(getSupportBugCommentsPath(id));
    }

    const handleAddItem = () => {
        if (supportItem.icarusBugId) {
            props.supportActions.update(supportItem);
        } else {
            props.supportActions.create(supportItem);
        }
        setDialogItemOpen(false);
    };

    const handleItemClick = () => {
        setDialogItemOpen(true);
    };

    const handleDialogItemClose = () => {
        setSupportItem({});
        setDialogItemOpen(false);
    };

    const handleInputChange = (name, event) => {
        let supportItemClone = cloneDeep(supportItem);
        supportItemClone[name] = event.target.value;
        setSupportItem(supportItemClone);
    };

    const handleSelectChange = (event, name) => {
        let supportItemClone = cloneDeep(supportItem);
        supportItemClone[event.target.name] = {
            [name]: event.target.value
        }
        setSupportItem(supportItemClone);;
    }


/*    const handleSelectChange = (event, name) => {
        let supportItemClone = cloneDeep(supportItem);

        let eventName = event.target.name;
        let eventValue = event.target.value;
        debugger;

        if (event.target.name === "level") {
            for (let i = 0; i < props.levels.length; i++) {
                if (props.levels[i].supportBugLevelId === event.target.value) {
                    supportItemClone.level = props.levels[i];
                }
            }
        }

        if (event.target.name === "module") {
            for (let i = 0; i < props.modules.length; i++) {
                if (props.modules[i].supportBugModuleId === event.target.value) {
                    supportItemClone.module = props.modules[i];
                }
            }
        }
        if (event.target.name === "status") {
            for (let i = 0; i < props.statuses.length; i++) {
                if (props.statuses[i].supportBugStatusId === event.target.value) {
                    supportItemClone.status = props.statuses[i];
                }
            }
        }

        setSupportItem(supportItemClone);
    }*/


    const handleItemDialogClose = () => {
        setDialogItemOpen(false);
    }

    const handleSupportFilterClick = () => {
        setDialogFiltersOpen(true);
    }

    const handleFilterDialogClose = () => {
        setDialogFiltersOpen(false);
    }

    const handleFilterSubmit = () => {
        setDialogFiltersOpen(false);

        const viewModel = {

            filters: props.filters,
            pagination: {
                page: props.page,
                rowsPerPage: props.rowsPerPage
            }
        }
        props.supportActions.loadAll(viewModel);
    }

    const handleClearAllFilters = () => {
        props.supportActions.clearFilters();
    }

    const handleStartDateChange = name => dateTime => {
        props.supportActions.changeFilterStartDate(dateTime);
    }

    const handleEndDateChange = name => dateTime => {
        props.supportActions.changeFilterEndDate(dateTime);
    }

    const handleMultiSelectChangeSupportStatus = (event) => {
        const selectedIds = event.target.value;
        let selectedSupportStatuses = [];
        for (let i = 0, l = selectedIds.length; i < l; i++) {
            const meetingTypeObject = props.statuses.find(status => status.icarusBugStatusId === selectedIds[i]);
            selectedSupportStatuses.push(meetingTypeObject);
        }
        props.supportActions.changeFilterStatus(selectedSupportStatuses);
    }

    const {supportBugs, totalCount, modules, levels, statuses, filters, filtersActive, page, rowsPerPage,} = props;
    
    return (
        <React.Fragment>
            <SupportBugList
                supportBugs={supportBugs}
                totalCount={totalCount}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                onSupportItemNewClick={handleItemClick}
                onSupportItemClick={handleSupportItemClick}
                filtersActive={filtersActive}
                onSupportFilterClick={handleSupportFilterClick}
                page={page}
                rowsPerPage={rowsPerPage}
            />
            <DialogFormFrame
                onClose={handleItemDialogClose}
                disableBackdropClick={true}
                title="support.item"
                open={dialogItemOpen}>
                <DialogFormSupportItem
                    onClose={handleDialogItemClose}
                    onSubmit={handleAddItem}
                    onInputChange={handleInputChange}
                    onSelectChange={handleSelectChange}
                    modules={modules}
                    levels={levels}
                    supportItem={supportItem}/>
            </DialogFormFrame>

            <DialogFormFrame
                onClose={handleFilterDialogClose}
                title="general.selectFilters"
                open={dialogFiltersOpen}
                formComponent={
                    <DialogFormSupportCenterFilters
                        onClearAll={handleClearAllFilters}
                        onClose={handleFilterDialogClose}
                        onSubmit={handleFilterSubmit}
                        onMultiSelectChangeSupportStatus={handleMultiSelectChangeSupportStatus}
                        onStartDateChange={handleStartDateChange}
                        onEndDateChange={handleEndDateChange}
                        filters={filters}
                        statuses={statuses}/>
                }/>
        </React.Fragment>
    )
}

function mapStateToProps(state, ownProps) {
    let page = 0;
    let rowsPerPage = 25;
    if (ownProps.match.params.page) {
        page = parseInt(ownProps.match.params.page);
    }
    if (ownProps.match.params.rowsPerPage) {
        rowsPerPage = parseInt(ownProps.match.params.rowsPerPage);
    }
    return {
        supportBugs: state.SupportCenter.supportBugs,
        totalCount: state.SupportCenter.totalCount,
        modules: state.SupportCenter.modules,
        levels: state.SupportCenter.levels,
        statuses: state.SupportCenter.statuses,
        filters: state.SupportCenter.filters,
        filtersActive: state.SupportCenter.filters.startDate !== null
        || state.SupportCenter.filters.endDate !== null
        || state.SupportCenter.filters.statuses.length > 0,
        page: page,
        rowsPerPage: rowsPerPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        supportActions: bindActionCreators(supportActions, dispatch)
    };
}

export default (connect(mapStateToProps, mapDispatchToProps)(withRouter(SupportBugs)));
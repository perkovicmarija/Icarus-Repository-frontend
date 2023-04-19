import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper } from '@mui/material';

import UserList from './UserList';
import DialogFormFrame from '../../../components/core/Dialog/DialogFormFrame';
import DialogFormUserFilters from '../../../components/user/DialogFormUserFilters';
import * as userActions from '../../../redux/user/userActions';
import * as userRoleActions from '../../../redux/user/role/userRoleActions';
import { getUsersPath, getUserDetailsPath } from "../../../consts/routePaths";

function Users(props) {

    const [dialogFilterOpen, setDialogFilterOpen] = useState(false);

    useEffect(() => {
        const viewModel = {
            filters: props.filters,
            pagination: {
                page: props.page,
                rowsPerPage: props.rowsPerPage
            }
        }

        props.userActions.loadAllPagination(viewModel);

        if (props.userRoles.length === 0) {
            props.userRoleActions.loadAll();
        }
    }, []);

    const handleMultiSelectChangeUserRoles = (event) => {
        const selectedIds = event.target.value;
        let selectedUserRoles = [];
        for (let i = 0, l = selectedIds.length; i < l; i++) {
            const userRole = props.userRoles.find(type => type.userRoleId === selectedIds[i]);
            selectedUserRoles.push(userRole);
        }
        props.userActions.changeFilterUserRole(selectedUserRoles);
    }

    const handleSwitchShowDeactivatedChange = name => event => {
        props.userActions.changeFilterShowDeactivated(event.target.checked);
    }

    const handleChangePage = (event, page) => {
        props.history.push(getUsersPath(page, props.rowsPerPage));
    };

    const handleChangeRowsPerPage = event => {
        props.history.push(getUsersPath(props.page, event.target.value));
    };

    const handleFilterSubmit = () => {
        setDialogFilterOpen(false);
        const viewModel = {
            filters: props.filters,
            pagination: {
                page: props.page,
                rowsPerPage: props.rowsPerPage
            }
        }
        props.userActions.loadAllPagination(viewModel);
    }

    const handleUserFilterClick = () => {
        setDialogFilterOpen(true);
    }

    const handleFilterDialogClose = () => {
        setDialogFilterOpen(false);
    }

    const handleClearAllFilters = () => {
        props.userActions.clearFilters();
    }

    const handleInputSearchChange = (event) => {
        props.userActions.changeFilterUserSearch(event.target.value);
    }

    const handleSearchSubmit = () => {
        const viewModel = {
            filters: props.filters,
            pagination: {
                page: props.page,
                rowsPerPage: props.rowsPerPage
            }
        }
        props.userActions.loadAllPagination(viewModel);
    }

    const handleUserClick = (event, id) => {
        props.history.push(getUserDetailsPath(id));
    }

    const handleUserNewClick = (event, route) => {
        props.history.push(getUserDetailsPath('-1'));
    }

    const {
        users,
        totalCount,
        filters,
        userRoles,
        filtersActive,
        page,
        rowsPerPage
    } = props;

    return (
        <Paper>
            <UserList
                users={users}
                totalCount={totalCount}
                searchValue={filters.userSearch}
                onUserClick={handleUserClick}
                onUserNewClick={handleUserNewClick}
                onInputSearchChange={handleInputSearchChange}
                onSearchSubmit={handleSearchSubmit}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                onUserFilterClick={handleUserFilterClick}
                filtersActive={filtersActive}
                page={page}
                rowsPerPage={rowsPerPage}
            />
            <DialogFormFrame
                onClose={handleFilterDialogClose}
                title="Select filters"
                open={dialogFilterOpen}>
                <DialogFormUserFilters
                    onClearAll={handleClearAllFilters}
                    onClose={handleFilterDialogClose}
                    onSubmit={handleFilterSubmit}
                    onMultiSelectChangeUserRoles={handleMultiSelectChangeUserRoles}
                    onSwitchShowDeactivatedChange={handleSwitchShowDeactivatedChange}
                    filters={filters}
                    userRoles={userRoles}
                />
            </DialogFormFrame>
        </Paper>
    );
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
        users: state.User.usersPagination,
        userRoles: state.UserRole.userRoles,
        totalCount: state.User.totalCount,
        filters: state.User.filters,
        filtersActive: state.User.filters.userRoles.length > 0
        || state.User.filters.showDeactivated,
        page: page,
        rowsPerPage: rowsPerPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        userRoleActions: bindActionCreators(userRoleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
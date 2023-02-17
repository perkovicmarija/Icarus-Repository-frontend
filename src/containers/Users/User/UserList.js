import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableFooter,
    TablePagination,
    Tooltip,
    IconButton
} from '@mui/material';
import { NoteAdd } from "@mui/icons-material";

import IntlMessages from '../../../components/core/IntlMessages';
import TablePaginationAction from '../../../components/core/Table/TablePaginationAction';
import EnhancedTableToolbarRich from '../../../components/core/Table/EnhancedTableToolbarRich';
import EnhancedTableHeader from '../../../components/core/Table/EnhancedTableHeader';
import FilterIconCustom from '../../../components/core/FilterIconCustom';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    tableRow: {
        cursor: 'pointer'
    }
}));

const columnData = [
    {label: 'Name'},
    {label: 'Email'},
];

function UserList(props) {
    const classes = useStyles();

    const {
        users,
        totalCount,
        page,
        rowsPerPage,
        onUserClick,
        onUserNewClick,
        handleChangePage,
        handleChangeRowsPerPage,
        onUserFilterClick,
        filtersActive,
        searchValue,
        onInputSearchChange,
        onSearchSubmit
    } = props;

    return (
        <div className={classes.root}>
            <EnhancedTableToolbarRich
                title="Users"
                showSearch
                searchValue={searchValue}
                onInputSearchChange={onInputSearchChange}
                onSearchSubmit={onSearchSubmit}
                searchPlaceholder="Search by email"
            >
                <Tooltip title={<IntlMessages id="general.addNew" />}>
                    <IconButton aria-label="Add new"
                                aria-haspopup="true"
                                onClick={onUserNewClick}>
                        <NoteAdd />
                    </IconButton>
                </Tooltip>
                <FilterIconCustom onFilterClick={onUserFilterClick} filtersActive={filtersActive} />
            </EnhancedTableToolbarRich>
            <Table className={classes.table}>
                <EnhancedTableHeader
                    columnData={columnData}
                />
                <TableBody>
                    {users.map(user => {
                        return (
                            <TableRow
                                className={classes.tableRow}
                                key={user.userId}
                                onClick={event => onUserClick(event, user.userId)}
                                hover={true}>

                                <TableCell>{user.surname + " " + user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={columnData.length}
                            count={totalCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationAction}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </div>

    );
}

UserList.propTypes = {
    users: PropTypes.array.isRequired,
}
export default UserList;
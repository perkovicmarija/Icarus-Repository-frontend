import React from 'react';

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
import { Edit, Delete, NoteAdd,  } from '@mui/icons-material';
import PropTypes from 'prop-types';

import IntlMessages from '../../../components/core/IntlMessages';
import TablePaginationAction from '../../../components/core/Table/TablePaginationAction';
import EnhancedTableToolbarRich from '../../../components/core/Table/EnhancedTableToolbarRich';
import EnhancedTableHeaderActions from '../../../components/core/Table/EnhancedTableHeaderActions';

const useStyles = makeStyles(theme => ({
    tableRow: {
        cursor: 'pointer'
    }
}));

const columnData = [
    { id: 'name', numeric: false, disablePadding: false, label: 'general.name' },
];

function RoleList(props) {
    const classes = useStyles();

    const {
        roles,
        totalCount,
        page,
        rowsPerPage,
        onChangePage,
        onChangeRowsPerPage,
        onRoleNewClick,
        onRoleEdit,
        onRoleDelete
    } = props;

    return (
        <div>
            <EnhancedTableToolbarRich
                title="form.userRoles"
            >
                <Tooltip title={<IntlMessages id="general.addNew" />}>
                    <>
                        <IconButton aria-label="add new"
                                    aria-haspopup="true"
                                    onClick={onRoleNewClick}>
                            <NoteAdd />
                        </IconButton>
                    </>
                </Tooltip>
            </EnhancedTableToolbarRich>

            <Table>
                <EnhancedTableHeaderActions
                    columnData={columnData}
                />
                <TableBody>
                    {roles.map(role => {
                        return (
                            <TableRow
                                className={classes.tableRow}
                                key={role.userRoleId}
                                hover={true}>

                                <TableCell>{role.name}</TableCell>
                                <TableCell className="nostretch">
                                    <Tooltip title="Edit">
                                        <div className="d-inline">
                                            <IconButton aria-label="Edit"
                                                        onClick={(event) => onRoleEdit(event, role)}>
                                                <Edit/>
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <>
                                            <div className="d-inline">
                                                <IconButton aria-label="Delete"
                                                            onClick={(event) => onRoleDelete(event, role)}>
                                                    <Delete/>
                                                </IconButton>
                                            </div>
                                        </>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            colSpan={columnData.length + 1}
                            count={totalCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={onChangePage}
                            onRowsPerPageChange={onChangeRowsPerPage}
                            ActionsComponent={TablePaginationAction}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}

RoleList.propTypes = {
    roles: PropTypes.array.isRequired,
}
export default RoleList;
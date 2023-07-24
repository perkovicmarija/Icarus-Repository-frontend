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
import { Edit, Delete, NoteAdd } from "@mui/icons-material";
import PropTypes from 'prop-types';

import TablePaginationAction from '../../../components/core/Table/TablePaginationAction';
import EnhancedTableToolbarRich from '../../../components/core/Table/EnhancedTableToolbarRich';
import EnhancedTableHeaderActions from '../../../components/core/Table/EnhancedTableHeaderActions';
import IntlMessages from '../../../components/core/IntlMessages';

const useStyles = makeStyles(theme => ({
    tableRow: {
        cursor: 'pointer'
    }
}));

const columnData = [
    { id: 'name', numeric: false, disablePadding: false, label: 'general.groupName' },
    { id: 'number', numeric: false, disablePadding: false, label: 'general.number' },
];

function UserGroupList(props) {
    const classes = useStyles();

    const {
        userGroups,
        totalCount,
        page,
        rowsPerPage,
        onChangePage,
        onChangeRowsPerPage,
        onGroupNewClick,
        onGroupEdit,
        onGroupDelete,
    } = props;

    return (
        <div>
            <EnhancedTableToolbarRich
                title="form.userGroups"
            >
                <Tooltip title={<IntlMessages id="general.addNew" />}>
                    <>
                        <IconButton aria-label="add new"
                                    aria-haspopup="true"
                                    onClick={onGroupNewClick}>
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
                    {userGroups.map(item => {
                        return (
                            <TableRow
                                className={classes.tableRow}
                                key={item.userGroupId}
                                hover={true}>

                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.numberOfParticipants}</TableCell>
                                <TableCell className="nostretch">
                                    <Tooltip title="Edit">
                                        <>
                                            <div className="d-inline">
                                                <IconButton aria-label="Edit"
                                                            onClick={(event) => onGroupEdit(event, item)}>
                                                    <Edit/>
                                                </IconButton>
                                            </div>
                                        </>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <>
                                            <div className="d-inline">
                                                <IconButton aria-label="Delete"
                                                            onClick={(event) => onGroupDelete(event, item)}>
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

UserGroupList.propTypes = {
    userGroups: PropTypes.array.isRequired,
}
export default UserGroupList;
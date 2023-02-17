import React from 'react';

import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Checkbox
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import IntlMessages from '../../core/IntlMessages';

const useStyles = makeStyles(theme => ({
    thActions: {
        width: "1px",
        textAlign: "center",
        whiteSpace: "nowrap"
    },
}));

function EnhancedTableHeaderCheckboxActions(props) {
    const classes = useStyles();

    const {columnData, order, orderBy, onSelectAllClick, rowCount, numSelected, onSortRequest} = props;
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {columnData.map(column => {
                    return (
                        <TableCell
                            key={column.id}
                            sortDirection={orderBy === column.id ? order : false}
                        >
                            {column.sortable ?
                                <Tooltip
                                    title={<IntlMessages id="general.sort" />}
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={event => onSortRequest(column.id)}
                                    >
                                        <IntlMessages id={column.label} />
                                    </TableSortLabel>
                                </Tooltip> :
                                <IntlMessages id={column.label} />
                            }
                        </TableCell>
                    );
                })}
                <TableCell
                    classes={{root: classes.thActions}}
                    key="Actions"
                    padding="default"
                >
                    <IntlMessages id="general.actions"/>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHeaderCheckboxActions.propTypes = {
    columnData: PropTypes.array.isRequired,
}

export default EnhancedTableHeaderCheckboxActions;
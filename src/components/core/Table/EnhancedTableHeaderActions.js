import React from 'react';

import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
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

function EnhancedTableHeaderActions(props) {
    const classes = useStyles();

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    const {columnData, sortDirection, sortBy} = props;
    return (
        <TableHead>
            <TableRow>
                {columnData.map(column => {
                    return (
                        <TableCell
                            key={column.id}
                            align={column.numeric ? 'right' : 'left'}
                            padding={column.disablePadding ? 'none' : 'normal'}
                            sortDirection={sortBy === column.id ? sortDirection : false}
                        >
                            {column.sortable ?
                                <Tooltip
                                    title={<IntlMessages id="general.sort" />}
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <>
                                        <TableSortLabel
                                          active={sortBy === column.id}
                                          direction={sortDirection}
                                          onClick={createSortHandler(column.id)}
                                        >
                                            <IntlMessages id={column.label} />
                                        </TableSortLabel>
                                    </>
                                </Tooltip> :
                                <IntlMessages id={column.label} />
                            }
                        </TableCell>
                    );
                })}
                <TableCell
                    classes={{root: classes.thActions}}
                    key="Actions"
                    padding="normal"
                >
                    <IntlMessages id="general.actions"/>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHeaderActions.propTypes = {
    columnData: PropTypes.array.isRequired,
}

export default EnhancedTableHeaderActions;
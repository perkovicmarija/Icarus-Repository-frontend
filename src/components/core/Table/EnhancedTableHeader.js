import React from 'react';

import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@mui/material';

import IntlMessages from '../IntlMessages';

function EnhancedTableHeader(props) {

    const {columnData, sortDirection, sortBy, onRequestSort} = props;
    return (
        <TableHead>
            <TableRow>
                {columnData.map(column => {
                    return (
                        <TableCell
                            key={column.label}
                            sortDirection={sortBy === column.id ? sortDirection : false}
                        >
                            {column.sortable ?
                                <Tooltip
                                    title={<IntlMessages id="general.sort" />}
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={sortBy === column.id}
                                        direction={sortBy === column.id ? sortDirection : 'asc'}
                                        onClick={event => onRequestSort(event, column.id)}
                                    >
                                        <IntlMessages id={column.label} />
                                    </TableSortLabel>
                                </Tooltip> :
                                <IntlMessages id={column.label} />
                            }

                        </TableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    )
}

export default EnhancedTableHeader;
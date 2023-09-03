import React from 'react';
import {makeStyles} from "@mui/styles";
import {TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from "@mui/material";
import IntlMessages from "../IntlMessages";
import PropTypes from "prop-types";


const useStyles = makeStyles(theme => ({
    thActions: {
        width: "1px",
        textAlign: "center",
        whiteSpace: "nowrap"
    },
}));

function EnhancedTableHeaderSimpleActions(props) {
    const classes = useStyles();

    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    };

    const {columnData, order, orderBy, disableSorting} = props;
    return (
        <TableHead>
            <TableRow>
                {columnData.map(column => {
                    return (
                        <TableCell
                            key={column.id}
                            align={column.numeric ? 'right' : 'left'}
                            padding={column.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === column.id ? order : false}
                        >
                            {disableSorting ?
                                <IntlMessages id={column.label}/>
                                :
                                <Tooltip
                                    title={<IntlMessages id="general.sort"/>}
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={createSortHandler(column.id)}
                                    >
                                        <IntlMessages id={column.label}/>
                                    </TableSortLabel>
                                </Tooltip>
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

EnhancedTableHeaderSimpleActions.propTypes = {
    columnData: PropTypes.array.isRequired,
}

export default EnhancedTableHeaderSimpleActions;
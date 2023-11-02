import React from 'react';

import { makeStyles } from '@mui/styles';
import {
    TableCell,
    TableRow,
    Typography
} from '@mui/material';
import PropTypes from 'prop-types';

import IntlMessages from '../../core/IntlMessages';

const useStyles = makeStyles(theme => ({
    cellLabelRoot: {
        //padding: '0px !important',
        borderBottom: 'none',
        textTransform: 'uppercase'
    },
    cellValueRoot: {
        borderBottom: 'none',
        textTransform: 'uppercase'
    },
    typoLabelRoot: {
        fontWeight: 500,
        fontSize: '1.5em',
        color: theme.palette.primary.main
    },
    typoValueRoot: {
        fontWeight: 400,
        fontSize: '1.5em'
    },
}));

function ExtensionPanelDetailsRow(props) {

    const classes = useStyles();

    const {label, value, valueIsArray, prop, argument1, argument2, onSourceClick} = props;
    return (
        <TableRow key={label}>
            <TableCell classes={{root: classes.cellLabelRoot}}>
                <Typography classes={{root: classes.typoLabelRoot}} variant="subtitle1">
                    <IntlMessages id={label}/>:
                </Typography>
            </TableCell>
            <TableCell classes={{root: classes.cellValueRoot}}>
                {valueIsArray ?
                    (value.length > 0 ? (value.map(item => {
                        return (
                            <p key={item[prop]}>
                                <a className={classes.typoValueRoot}
                                   onClick={() => onSourceClick(item[argument1], item[argument2])}>
                                    {item[prop]}
                                </a>
                            </p>
                        )
                    })) : <Typography classes={{root: classes.typoValueRoot}} variant="subtitle1">N/A</Typography>) :
                    <Typography classes={{root: classes.typoValueRoot}} variant="subtitle1">{value}</Typography>
                }

            </TableCell>
        </TableRow>
    )
}

ExtensionPanelDetailsRow.propTypes = {
    label: PropTypes.string.isRequired,
    //onInputChange: PropTypes.func.isRequired,
    //onSelectChange: PropTypes.func.isRequired,
    //onDateTimeChange: PropTypes.func.isRequired,
    //irm: PropTypes.object.isRequired,
    //csdbTypes: PropTypes.array.isRequired
}

export default ExtensionPanelDetailsRow;


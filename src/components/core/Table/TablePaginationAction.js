import React, { useState, useEffect } from 'react';

import { TextField, Typography, IconButton } from '@mui/material';
import {
    FirstPage,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    Input,
    LastPage
} from '@mui/icons-material';
import { makeStyles, useTheme } from '@mui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2),
    },
    textField: {
        width: '40px',
        verticalAlign: 'unset'
    },
    typography: {
        display: 'inline-flex',
        paddingRight: theme.spacing(1)
    }
}));

function TablePaginationAction(props) {
    const classes = useStyles();
    const theme = useTheme();

    const [pageManual, setPageManual] = useState(1);

    useEffect(() => {
        setPageManual(props.page + 1);
    }, [props.page]);

    const handleFirstPageButtonClick = event => {
        props.onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
        props.onChangePage(event, props.page - 1);
    };

    const handleNextButtonClick = event => {
        props.onChangePage(event, props.page + 1);
    };

    const handleLastPageButtonClick = event => {
        props.onChangePage(
            event,
            Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1)
        );
    };

    const handlePageChange = event => {
        setPageManual(event.target.value);
    }

    const handleManualPageButtonClick = event => {
        props.onChangePage(event, pageManual - 1);
    }

    const { count, page, rowsPerPage } = props;

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="First Page"
            >
                {theme.direction === 'rtl' ? <LastPage/> : <FirstPage/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="Previous Page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Last Page"
            >
                {theme.direction === 'rtl' ? <FirstPage/> : <LastPage/>}
            </IconButton>
            <Typography className={classes.typography} variant="subtitle1">
                Page:
            </Typography>
            <TextField
                id="page"
                classes={{root: classes.textField}}
                value={pageManual}
                placeholder="Page"
                onChange={handlePageChange}
            />
            <Typography className={classes.typography} variant="subtitle1">
                {"/" + Math.ceil(count / rowsPerPage)}
            </Typography>
            <IconButton
                onClick={handleManualPageButtonClick}
                disabled={pageManual > Math.ceil(count / rowsPerPage) || pageManual < 1}
                aria-label="Go to Page"
            >
                {theme.direction === 'rtl' ? <Input/> : <Input/>}
            </IconButton>
        </div>
    );
}

TablePaginationAction.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
}

export default TablePaginationAction;
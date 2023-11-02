import React from 'react';

import { Toolbar, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import IntlMessages from '../IntlMessages';
import ToolbarSearch from "../ToolbarSearch";

const useStyles = makeStyles(theme => ({
    root: {
        paddingRight: theme.spacing(1),
    },
    title: {
        flex: '0 0 auto',
    },
    actions: {
        flex: '0 0 auto',
        color: theme.palette.text.secondary
    },
}));

function EnhancedTableToolbarRich(props) {
    const classes = useStyles();

    const {showSearch, searchValue, onInputSearchChange, onSearchSubmit, searchPlaceholder, title, children} = props;

    return (
        <Toolbar
            className={classNames(classes.root)}>

            <Grid container spacing={1}>
                <Grid item>
                    <div className={classes.title}>
                        <Typography variant="h6"><IntlMessages id={title} /></Typography>
                    </div>
                </Grid>
                <Grid item>
                    {showSearch &&
                    <ToolbarSearch
                        value={searchValue}
                        onInputSearchChange={onInputSearchChange}
                        onSearchSubmit={onSearchSubmit}
                        placeholder={searchPlaceholder}
                    />}
                </Grid>
            </Grid>

            <div className={classes.actions}>
                {children}
            </div>
        </Toolbar>
    );
}

EnhancedTableToolbarRich.propTypes = {
    title: PropTypes.string.isRequired,
}
export default EnhancedTableToolbarRich;
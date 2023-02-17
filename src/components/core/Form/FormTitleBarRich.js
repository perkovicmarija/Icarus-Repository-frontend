import React from 'react';

import { Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import IntlMessages from '../IntlMessages';

const useStyles = makeStyles(theme => ({
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        flex: '0 0 auto',
        color: theme.palette.text.secondary
    },
    titleText: {
        color: theme.palette.primary.contrastText
    },
    title: {
        flex: '0 0 auto',
    },
    root: {
        backgroundColor: theme.palette.primary.main,
    },
}));


function FormTitleBarRich(props) {
    const classes = useStyles();

    const {title, children} = props;

    return (
        <Toolbar className={classes.root} variant="dense">

            <div className={classes.title}>
                {title ?
                    <Typography classes={{h6: classes.titleText}} variant="h6"><IntlMessages id={title} /></Typography>
                    :
                    ""
                }

            </div>

            <div className={classes.spacer}/>

            <div className={classes.actions}>
                {children}
            </div>
        </Toolbar>
    );
}

FormTitleBarRich.propTypes = {
    title: PropTypes.string.isRequired
}
export default FormTitleBarRich;

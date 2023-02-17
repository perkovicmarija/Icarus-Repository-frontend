import React from 'react';

import {
    CheckCircle ,
    Error,
    Info,
    Close,
    Warning
} from '@mui/icons-material';
import { IconButton , SnackbarContent } from '@mui/material';
import { green, amber } from "@mui/material/colors";
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: Error,
    info: Info,
};

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

function SnackbarContentCustom(props) {
    const classes = useStyles();

    const { showIcon, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <div id="client-snackbar" className={classes.message}>
                    {showIcon && <Icon className={classNames(classes.icon, classes.iconVariant)} /> }
                            {message}
                </div>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <Close className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

SnackbarContentCustom.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default SnackbarContentCustom;
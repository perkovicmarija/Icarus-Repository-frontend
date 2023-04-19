import React from 'react';

import PropTypes from 'prop-types';
import { Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import IntlMessages from '../../components/core/IntlMessages';
import * as Protected from '../../protectedAuth';

const useStyles = makeStyles(theme => ({
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        flex: '0 0 auto',
        color: theme.palette.text.secondary
    },
    titleText: {
        color: theme.palette.primary.contrastText,
        fontWeight: 'bold',
    },
    subtitleText: {
        color: theme.palette.primary.contrastText,
        fontWeight: '300'
    },
    title: {
        flex: '0 0 auto',
    },
    subtitle: {
        flex: '0 0 auto',
        paddingLeft: '5px'
    },
    root: {
        backgroundColor: theme.palette.primary.main,
    },
    iconColor: {
        color: theme.palette.primary.contrastText
    }
}));


function FormTitleSubtitleBar(props) {
    const classes = useStyles();

    const {title, subtitle, onSettingsSelect} = props;

    return (
        <Toolbar className={classes.root}>

            <div className={classes.title}>
                <Typography classes={{h6: classes.titleText}} variant="h6"><IntlMessages id={title}/>:</Typography>
            </div>

            <div className={classes.subtitle}>
                <Typography classes={{h6: classes.subtitleText}} variant="h6">{subtitle}</Typography>
            </div>

            <div className={classes.spacer}/>

            <div className={classes.actions}>
                {Protected.protectedAuth(['PERM_SUPPORT_ADMIN']) ?
                    <Tooltip title="DialogFormClient">
                        <>
                            <IconButton className={classes.iconColor} aria-label="DialogFormClient" onClick={onSettingsSelect}>
                                <Settings/>
                            </IconButton>
                        </>
                    </Tooltip>
                    : null}
            </div>
        </Toolbar>
    );
}

FormTitleSubtitleBar.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
}
export default FormTitleSubtitleBar;

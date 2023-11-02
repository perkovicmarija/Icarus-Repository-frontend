import React from 'react';

import { ExpandMoreIcon } from '@mui/icons-material';
import {
    Box,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    panelHeader: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
    },
    iconColor: {
        color: theme.palette.secondary.contrastText
    }
}));

function ExtensionPanelCustom(props) {
    const classes = useStyles();

    const {children, title} = props;
    return (
        <ExpansionPanel>
            <ExpansionPanelSummary classes={{root: classes.panelHeader}}
                                   expandIcon={<ExpandMoreIcon className={classes.iconColor}/>}>
                <Box display="flex"  fontSize="h6.fontSize" justifyContent="center" width={1}>
                   {title}
                </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {children}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default ExtensionPanelCustom;
import React from 'react';

import { Toolbar, Tooltip, IconButton, Typography } from '@mui/material';
import { Edit, Done, Close, Delete } from "@mui/icons-material";
import { makeStyles } from '@mui/styles';

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
    iconColor: {
        color: theme.palette.primary.contrastText
    }
}));


function FormEditBar(props) {
    const classes = useStyles();

    const {title, editDisabled, onEditSelect, onCancelSelect, onSaveSelect, showDelete, onDeleteSelect} = props;

    return (
        <Toolbar className={classes.root} variant="dense">

            <div className={classes.title}>
                {
                    title &&
                    <Typography classes={{h6: classes.titleText}} variant="h6"><IntlMessages id={title} /></Typography>
                }

            </div>

            <div className={classes.spacer}/>

            <div className={classes.actions}>
                {editDisabled && showDelete &&
                <Tooltip title="Delete">
                    <>
                        <IconButton className={classes.iconColor} aria-label="Delete" onClick={onDeleteSelect}>
                            <Delete/>
                        </IconButton>
                    </>
                </Tooltip>}

                {!editDisabled &&
                <Tooltip title="Save">
                    <>
                        <IconButton className={classes.iconColor} aria-label="Save" onClick={onSaveSelect}>
                            <Done/>
                        </IconButton>
                    </>
                </Tooltip>}

                {!editDisabled &&
                <Tooltip title="Cancel edit">
                    <>
                        <IconButton className={classes.iconColor} aria-label="Cancel" onClick={onCancelSelect}>
                            <Close/>
                        </IconButton>
                    </>
                </Tooltip>}

                {editDisabled &&
                <Tooltip title="Edit">
                    <>
                        <IconButton className={classes.iconColor} aria-label="Edit form" onClick={onEditSelect}>
                            <Edit/>
                        </IconButton>
                    </>
                </Tooltip>}
            </div>
        </Toolbar>
    );
}
export default FormEditBar;

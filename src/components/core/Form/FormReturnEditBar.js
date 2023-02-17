import React from 'react';

import { Toolbar, Tooltip, IconButton, Button, Typography } from '@mui/material';
import { Edit, Done, Close, Delete, BackIcon } from '@mui/icons-material';
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
        textTransform: "none",
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
    },
    backButton: {
        //marginRight: theme.spacing(2),
        color: theme.palette.primary.contrastText
    },
}));


function FormReturnEditBar(props) {
    const classes = useStyles();

    const {title, editDisabled, onEditSelect, onCancelSelect, onSaveSelect, showDelete, onDeleteSelect, onBackClick} = props;

    return (
        <Toolbar className={classes.root} variant="dense">

{/*            <Tooltip title="Back">
                <IconButton edge="return" className={classes.backButton} color="inherit" aria-label="back" onClick={onBackClick}>
                    <BackIcon/>
                </IconButton>
            </Tooltip>*/}

            <div className={classes.title}>
                {
                    title &&
                    <Button
                        className={classes.backButton}
                        onClick={onBackClick}
                        startIcon={<BackIcon />}
                    >
                        <Typography classes={{h6: classes.titleText}} variant="h6"><IntlMessages id={title}/></Typography>
                    </Button>
                }

            </div>

            <div className={classes.spacer}/>

            <div className={classes.actions}>
                {editDisabled && showDelete &&
                <Tooltip title="Delete">
                    <IconButton className={classes.iconColor} aria-label="Delete" onClick={onDeleteSelect}>
                        <Delete/>
                    </IconButton>
                </Tooltip>}

                {!editDisabled &&
                <Tooltip title="Save">
                    <IconButton className={classes.iconColor} aria-label="Save" onClick={onSaveSelect}>
                        <Done/>
                    </IconButton>
                </Tooltip>}

                {!editDisabled &&
                <Tooltip title="Cancel edit">
                    <IconButton className={classes.iconColor} aria-label="Cancel" onClick={onCancelSelect}>
                        <Close/>
                    </IconButton>
                </Tooltip>}

                {editDisabled &&
                <Tooltip title="Edit">
                    <IconButton className={classes.iconColor} aria-label="Edit form" onClick={onEditSelect}>
                        <Edit/>
                    </IconButton>
                </Tooltip>}
            </div>
        </Toolbar>
    );
}

export default FormReturnEditBar;

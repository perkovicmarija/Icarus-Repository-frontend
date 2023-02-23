import React from 'react';

import { Toolbar, Typography, Button } from '@mui/material';
import { NoteAdd } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IntlMessages from '../IntlMessages';

const useStyles = makeStyles(theme => ({
    root: {
        paddingRight: theme.spacing(1),
        paddingLeft: '0px'
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        flex: '0 0 auto',
        color: theme.palette.text.secondary
    },
    title: {
        flex: '0 0 auto',
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    }
}));


function EnhancedTableToolbarSimpleOption(props) {
    const classes = useStyles();

    const {title, onNewClick, buttonLabel, editDisabled} = props;

    return (
        <Toolbar
            className={classNames(classes.root)}>
            <div className={classes.title}>
                <Typography variant="button"><IntlMessages id={title}/></Typography>
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                <Button disabled={editDisabled} className={classes.button} color="secondary" onClick={onNewClick}>
                    <IntlMessages id={buttonLabel}/>
                    <NoteAdd className={classes.rightIcon}/>
                </Button>
            </div>
        </Toolbar>
    );
}

EnhancedTableToolbarSimpleOption.propTypes = {
    title: PropTypes.string.isRequired,
}
export default EnhancedTableToolbarSimpleOption;
import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tooltip, IconButton, Paper, } from '@mui/material';
import { AddComment } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { cloneDeep } from 'lodash';

import SupportLogTrails from '../../../components/support/SupportLogTrails';
import DialogFormFrame from '../../../components/core/Dialog/DialogFormFrame';
import EnhancedTableToolbarRich from '../../../components/core/Table/EnhancedTableToolbarRich';
import DialogFormSoftwareLog from '../../../components/support/DialogFormSoftwareLog';
import * as Protected from "../../../protectedAuth";
import * as supportActions from '../../../redux/support/supportActions';

const useStyles = makeStyles(theme => ({
}));

function SupportSoftwareLog(props) {

    const classes = useStyles();

    const [dialogNewLog, setDialogNewLog] = useState(false);
    const [item, setItem] = useState({});

    useEffect(() => {
        props.supportActions.loadAllSoftwareLogs();
    }, []);

    const handleAddLog = () => {
        props.supportActions.createSoftwareLog(item);
        setDialogNewLog(false);
    };

    const handleInputChange = (name, event) => {
        let itemClone = cloneDeep(item);
        itemClone[name] = event.target.value;
        setItem(itemClone);
    };

    const handleDialogLogOpen = () => {
        setDialogNewLog(true);
    };

    const handleDialogLogClose = () => {
        setDialogNewLog(false);
    };

    const { softwareLogs } = props;
    return (
        <Paper>
            <EnhancedTableToolbarRich title="support.bug.list">
            {Protected.protectedAuth(['PERM_SUPPORT_ADMIN']) ?
                <Tooltip title="Settings">
                    <IconButton className={classes.iconColor} aria-label="Add" onClick={handleDialogLogOpen}>
                        <AddComment/>
                    </IconButton>
                </Tooltip>
                : null}
            </EnhancedTableToolbarRich>

            <SupportLogTrails
                logTrails={softwareLogs}
            />

            <DialogFormFrame
                onClose={handleDialogLogClose}
                title="support.logs.new"
                open={dialogNewLog}>
                <DialogFormSoftwareLog
                    onClose={handleDialogLogClose}
                    onSubmit={handleAddLog}
                    onInputChange={handleInputChange}
                    item={item}/>
            </DialogFormFrame>
        </Paper>
    );
}

SupportSoftwareLog.propTypes = {
    //myProp: PropTypes.string.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        softwareLogs: state.SupportCenter.softwareLogs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        supportActions: bindActionCreators(supportActions, dispatch)
    };
}

export default (connect(mapStateToProps, mapDispatchToProps)(withRouter(SupportSoftwareLog)));
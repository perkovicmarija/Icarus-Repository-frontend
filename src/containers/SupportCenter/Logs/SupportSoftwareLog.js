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
    const [softwareLog, setSoftwareLog] = useState({
        title: "",
        description: "",
        selectedClients: []
    });

    const clients = [{name: "IQ", companyId: 1}, {name: "Elite Jet", companyId: 2}, {name: "Trade Air", companyId: 3}]

    // After API call fetches the clients list.
    useEffect(() => {
        props.supportActions.loadAllSoftwareLogs();
    }, []);

    const handleAddLog = () => {
        props.supportActions.createSoftwareLog(softwareLog);
        setDialogNewLog(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target
        let softwareLogClone = cloneDeep(softwareLog);
        softwareLogClone[name] = value;
        setSoftwareLog(x => ({
            ...x, title: softwareLogClone.title, description: softwareLogClone.description
        }));
    };

    const handleMultipleSelectChange = (event) => {
        const selectedIds = event.target.value;
        const selectedClients = clients.filter(client => selectedIds.includes(client.companyId));
        setSoftwareLog(x => ({
            ...x, selectedClients
        }))
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
                    <>
                        <IconButton className={classes.iconColor} aria-label="Add" onClick={handleDialogLogOpen}>
                            <AddComment/>
                        </IconButton>
                    </>
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
                    onMultiSelectChange={handleMultipleSelectChange}
                    selectedClients={softwareLog.selectedClients}
                    softwareLog={softwareLog}
                    clients={clients}
                />
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
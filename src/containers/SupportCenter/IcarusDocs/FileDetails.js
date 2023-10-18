import React, {useEffect, useState} from 'react';
import {makeStyles} from "@mui/styles";
import {useDeepCompareEffectNoCheck} from "use-deep-compare-effect";
import {cloneDeep} from "lodash";
import {Paper} from "@mui/material";
import FileDetailsForm from "../../../components/documentation/FileDetailsForm";
import DialogNoCloseFrame from "../../../components/core/Dialog/DialogNoCloseFrame";
import DialogProgress from "../../../components/core/Dialog/DialogProgress";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {icarusDocs} from "../../../consts/routePaths";
import {bindActionCreators} from "redux";
import * as icarusDocumentationFileActions from '../../../redux/support/icarusDocs/file/icarusDocumentationFileActions';
import * as clientActions from '../../../redux/setting/client/clientActions';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3),
    },
}));

function FileDetails(props) {
    const classes = useStyles();

    const [icarusDocumentationFile, setIcarusDocumentationFile] = useState({
        icarusDocumentationFileId: undefined,
        filename: undefined,
        name: undefined,
        note: undefined,
        protectedFile: false,
        uncontrolledCopy: false,
        clients: []
    })

    const [file, setFile] = useState(undefined);
    const [selectedClients, setSelectedClients] = useState([])
    const [notifyByEmail, setNotifyByEmail] = useState(false);
    const [notifyByMessageBoard, setNotifyByMessageBoard] = useState(false);

    useEffect(() => {
        if (props.clients.length === 0) {
            props.clientActions.loadAllClients()
        }
    }, []);

    useDeepCompareEffectNoCheck(() => {
        if(props.icarusDocumentationFile && props.icarusDocumentationFile.icarusDocumentationFileId) {
            setIcarusDocumentationFile(props.icarusDocumentationFile);
            setSelectedClients(props.icarusDocumentationFile.clients)
        }
    }, [props.icarusDocumentationFile])

    const handleInputFileMultilineChange = name => event => {
        let icarusDocumentationFileClone = cloneDeep(icarusDocumentationFile);
        icarusDocumentationFileClone[name] = event.target.value;
        setIcarusDocumentationFile(icarusDocumentationFileClone);
    };

    const handleInputFileChange = (event) => {
        const { name, value } = event.target;
        let icarusDocumentationFileClone = cloneDeep(icarusDocumentationFile);
        icarusDocumentationFileClone[name] = value;
        setIcarusDocumentationFile(icarusDocumentationFileClone);
    };

    const handleSwitchFileChange = name => event => {
        let icarusDocumentationFileClone = cloneDeep(icarusDocumentationFile);
        icarusDocumentationFileClone[name] = event.target.checked;
        setIcarusDocumentationFile(icarusDocumentationFileClone);
    }

    const handleCheckboxNotifyByEmailChange = name => event => {
        setNotifyByEmail(event.target.checked);
    };

    const handleCheckboxNotifyByMessageBoardChange = name => event => {
        setNotifyByMessageBoard(event.target.checked);
    };

    const handleFileDrop = (file) => {
        if (file && file.length > 0) {
            let selectedFile = file[0];
            let icarusDocumentationFileClone = cloneDeep(icarusDocumentationFile);
            icarusDocumentationFileClone.filename = selectedFile.name;
            setIcarusDocumentationFile(icarusDocumentationFileClone);
            setFile(selectedFile);
        }
    }

    const handleDocumentationFileSave = event => {
        event.preventDefault();
        let icarusDocumentationFolder = icarusDocumentationFolderPath[icarusDocumentationFolderPath.length - 1]
        props.onDocumentationFileSave(icarusDocumentationFile, icarusDocumentationFolder, selectedClients, file)
    }

    const handleCancelDocumentationFile = event => {
        props.history.push(icarusDocs);
    }

    const handleRadioButtonChange = (event, value) => {
        let icarusDocumentationFileClone = cloneDeep(icarusDocumentationFile);
        icarusDocumentationFileClone[event.target.name] = value;
        setIcarusDocumentationFile(icarusDocumentationFileClone);
    };

    const handleMultiSelectChange = (event) => {
        const selectedIds = event.target.value
        let selected = [];
        for (let i = 0, l = selectedIds.length; i < l; i++) {
            const client = props.clients.find(type => type.clientId === selectedIds[i]);
            selected.push(client);
        }
        setSelectedClients(selected)
    }

    const { progressBarOpened, progress, clients, icarusDocumentationFolderPath } = props;
    return (
        <Paper className={classes.root}>
            <FileDetailsForm
                icarusDocumentationFile={icarusDocumentationFile}
                notifyByEmail={notifyByEmail}
                notifyByMessageBoard={notifyByMessageBoard}
                editDisabled={false}
                onRadioButtonChange={handleRadioButtonChange}
                onInputFileChange={handleInputFileChange}
                onInputFileMultilineChange={handleInputFileMultilineChange}
                onSwitchFileChange={handleSwitchFileChange}
                onCheckboxNotifyByEmailChange={handleCheckboxNotifyByEmailChange}
                onCheckboxNotifyByMessageBoardChange={handleCheckboxNotifyByMessageBoardChange}
                onDocumentationFileSave={handleDocumentationFileSave}
                gridSpacing={2}
                onFileDrop={handleFileDrop}
                onCancelDocumentationFile={handleCancelDocumentationFile}
                clients={clients}
                selectedClients={selectedClients}
                onMultiSelectChange={handleMultiSelectChange}
            />
            <DialogNoCloseFrame
                title="general.uploading"
                open={progressBarOpened}
                formComponent={
                    <DialogProgress
                        progress={progress}/>
                }/>

        </Paper>
    );
}

FileDetails.propTypes = {
    icarusDocumentationFile: PropTypes.object.isRequired,
    onDocumentationFileSave: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        progress: state.Progress.progress,
        progressBarOpened: state.Progress.progressOpened,
        clients: state.Client.clients,
        icarusDocumentationFolderPath: state.IcarusDocumentationFolder.icarusDocumentationFolderPath,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        icarusDocumentationFileActions: bindActionCreators(icarusDocumentationFileActions, dispatch),
        clientActions: bindActionCreators(clientActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FileDetails));
import React, {useState} from 'react';
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
    })

    const [file, setFile] = useState(undefined);
    const [notifyByEmail, setNotifyByEmail] = useState(false);
    const [notifyByMessageBoard, setNotifyByMessageBoard] = useState(false);

    useDeepCompareEffectNoCheck(() => {
        if(props.icarusDocumentationFile && props.icarusDocumentationFile.icarusDocumentationFileId) {
            setIcarusDocumentationFile(props.icarusDocumentationFile);
        }
    }, [props.icarusDocumentationFile])

    const handleInputFileChange = name => event => {
        let icarusDocumentationFileClone = cloneDeep(icarusDocumentationFile);
        icarusDocumentationFileClone[name] = event.target.value;
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
        props.onDocumentationFileSave(icarusDocumentationFile, {}, file, notifyByEmail, notifyByMessageBoard)
    }

    const handleCancelDocumentationFile = event => {
        props.history.push(icarusDocs);
    }

    const handleRadioButtonChange = (event, value) => {
        let icarusDocumentationFileClone = cloneDeep(icarusDocumentationFile);
        icarusDocumentationFileClone[event.target.name] = value;
        setIcarusDocumentationFile(icarusDocumentationFileClone);
    };

    const { progressBarOpened, progress } = props;
    return (
        <Paper className={classes.root}>
            <FileDetailsForm
                icarusDocumentationFile={icarusDocumentationFile}
                notifyByEmail={notifyByEmail}
                notifyByMessageBoard={notifyByMessageBoard}
                editDisabled={false}
                onRadioButtonChange={handleRadioButtonChange}
                onInputFileChange={handleInputFileChange}
                onSwitchFileChange={handleSwitchFileChange}
                onCheckboxNotifyByEmailChange={handleCheckboxNotifyByEmailChange}
                onCheckboxNotifyByMessageBoardChange={handleCheckboxNotifyByMessageBoardChange}
                onDocumentationFileSave={handleDocumentationFileSave}
                gridSpacing={2}
                onFileDrop={handleFileDrop}
                onCancelDocumentationFile={handleCancelDocumentationFile}
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        icarusDocumentationFileActions: bindActionCreators(icarusDocumentationFileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FileDetails));
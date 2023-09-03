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
import * as userActions from '../../../redux/user/userActions';
import {bindActionCreators} from "redux";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3),
    },
}));

function FileDetails(props) {
    const classes = useStyles();

    const [documentationFile, setDocumentationFile] = useState({
        documentationFileId: undefined,
        filename: undefined,
        name: undefined,
        note: undefined,
        protectedFile: false,
        uncontrolledCopy: false,
        documentationFileUserRoleJoined: [],
        documentationFileUserGroupJoined: [],
        documentationFileDepartmentJoined: [],
        documentationFileSubdivisionJoined: [],
        documentationFileUserJoined: []
    })
    const [documentationFileRevision, setDocumentationFileRevision] = useState({
        documentationFileRevisionId: undefined,
        revision: undefined,
        dateRevision: null,
        temporary: false,
    })
    const [file, setFile] = useState(undefined);
    const [notifyByEmail, setNotifyByEmail] = useState(false);
    const [notifyByMessageBoard, setNotifyByMessageBoard] = useState(false);

    useEffect(() => {
        props.userActions.loadAll();
    }, []);

    useDeepCompareEffectNoCheck(() => {
        if(props.documentationFile && props.documentationFile.documentationFileId) {
            setDocumentationFile(props.documentationFile);
        }
    }, [props.documentationFile])

    useDeepCompareEffectNoCheck(() => {
        if(props.documentationFileRevision && props.documentationFileRevision.documentationFileRevisionId) {
            setDocumentationFileRevision(props.documentationFileRevision)
        }
    }, [props.documentationFileRevision])

    const handleInputFileChange = name => event => {
        let documentationFileClone = cloneDeep(documentationFile);
        documentationFileClone[name] = event.target.value;
        setDocumentationFile(documentationFileClone);
    };

    const handleInputRevisionChange = name => event => {
        let documentationFileRevisionClone = cloneDeep(documentationFileRevision);
        documentationFileRevisionClone[name] = event.target.value;
        setDocumentationFileRevision(documentationFileRevisionClone);
    };

    const handleSwitchFileChange = name => event => {
        let documentationFileClone = cloneDeep(documentationFile);
        documentationFileClone[name] = event.target.checked;
        setDocumentationFile(documentationFileClone);
    }

    const handleSwitchRevisionChange = name => event => {
        let documentationFileRevisionClone = cloneDeep(documentationFileRevision);
        documentationFileRevisionClone[name] = event.target.checked;
        setDocumentationFileRevision(documentationFileRevisionClone);
    }

    const handlePermissionSelectChange = (event) => {
        let selectedUserRoles = [];
        let lastSelected = event.target.value[event.target.value.length - 1];
        if (lastSelected === "SelectAll") {
            props.userRoles.forEach(userRole => {
                selectedUserRoles.push({
                    userRole
                });
            });
        } else if (lastSelected === "DeselectAll") {
            selectedUserRoles = [];
        } else {
            const selectedUserRoleIds = event.target.value;
            for (let i = 0, l = selectedUserRoleIds.length; i < l; i++) {
                const userRoleObject = props.userRoles.find(userRole => userRole.userRoleId === selectedUserRoleIds[i]);
                selectedUserRoles.push({
                    userRole: userRoleObject
                });
            }
        }
        let documentationFileClone = cloneDeep(documentationFile);
        documentationFileClone.documentationFileUserRoleJoined = selectedUserRoles;
        setDocumentationFile(documentationFileClone);;
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
            let documentationFileClone = cloneDeep(documentationFile);
            documentationFileClone.filename = selectedFile.name;
            setDocumentationFile(documentationFileClone);
            setFile(selectedFile);
        }
    }

    const handleDocumentationFileSave = event => {
        event.preventDefault();
        props.onDocumentationFileSave(documentationFile, documentationFileRevision, file, notifyByEmail, notifyByMessageBoard)
    }

    const handleCancelDocumentationFile = event => {
        props.history.push(icarusDocs);
    }

    const handleDateTimeChange = name => dateTime => {
        if (name === "expirationDate") {
            let documentationFileClone = cloneDeep(documentationFile);
            documentationFileClone[name] = dateTime;
            setDocumentationFile(documentationFileClone);
        } else {
            let documentationFileRevisionClone = cloneDeep(documentationFileRevision);
            documentationFileRevisionClone[name] = dateTime;
            setDocumentationFileRevision(documentationFileRevisionClone);
        }
    }

    const handleRadioButtonChange = (event, value) => {
        let documentationFileClone = cloneDeep(documentationFile);
        documentationFileClone[event.target.name] = value;
        if(event.target.name === "permissionType"){
            documentationFileClone.documentationFileUserRoleJoined = [];
            documentationFileClone.documentationFileUserGroupJoined = [];
            documentationFileClone.documentationFileDepartmentJoined = [];
        }

        setDocumentationFile(documentationFileClone);
    };

    const handlePermissionUserRoleSelectChange = (event) => {
        let selectedUserRoles = [];
        let lastSelected = event.target.value[event.target.value.length - 1];
        if (lastSelected === "SelectAll") {
            props.userRoles.forEach(userRole => {
                selectedUserRoles.push({
                    userRole
                });
            });
        } else if (lastSelected === "DeselectAll") {
            selectedUserRoles = [];
        } else {
            const selectedUserRoleIds = event.target.value;
            for (let i = 0, l = selectedUserRoleIds.length; i < l; i++) {
                const userRoleObject = props.userRoles.find(userRole => userRole.userRoleId === selectedUserRoleIds[i]);
                selectedUserRoles.push({
                    userRole: userRoleObject
                });
            }
        }
        let documentationFileClone = cloneDeep(documentationFile);
        documentationFileClone.documentationFileUserRoleJoined = selectedUserRoles;
        setDocumentationFile(documentationFileClone);;
    }

    const handlePermissionUserGroupSelectChange = (event) => {
        let selectedUserGroups = [];
        let lastSelected = event.target.value[event.target.value.length - 1];
        if (lastSelected === "SelectAll") {
            props.userGroups.forEach(userGroup => {
                selectedUserGroups.push({
                    userGroup
                });
            });
        } else if (lastSelected === "DeselectAll") {
            selectedUserGroups = [];
        } else {
            const selectedUserGroupIds = event.target.value;
            for (let i = 0, l = selectedUserGroupIds.length; i < l; i++) {
                const userGroupObject = props.userGroups.find(userGroup => userGroup.userGroupId === selectedUserGroupIds[i]);
                selectedUserGroups.push({
                    userGroup: userGroupObject
                });
            }
        }
        let documentationFileClone = cloneDeep(documentationFile);
        documentationFileClone.documentationFileUserGroupJoined = selectedUserGroups;
        setDocumentationFile(documentationFileClone);
    }

    const handlePermissionDepartmentSelectChange = (event) => {
        let selectedDepartments = [];
        let lastSelected = event.target.value[event.target.value.length - 1];
        if (lastSelected === "SelectAll") {
            props.departments.forEach(department => {
                selectedDepartments.push({
                    department
                });
            });
        } else if (lastSelected === "DeselectAll") {
            selectedDepartments = [];
        } else {
            const selectedDepartmentIds = event.target.value;
            for (let i = 0, l = selectedDepartmentIds.length; i < l; i++) {
                const userRoleObject = props.departments.find(department => department.departmentId === selectedDepartmentIds[i]);
                selectedDepartments.push({
                    department: userRoleObject
                });
            }
        }
        let documentationFileClone = cloneDeep(documentationFile);
        documentationFileClone.documentationFileDepartmentJoined = selectedDepartments;
        setDocumentationFile(documentationFileClone);
    }

    const handleSelectChange = (event, name) => {
        let documentationFileNew = cloneDeep(documentationFile);

        documentationFileNew[event.target.name] = {
            [name]: event.target.value
        }

        return setDocumentationFile(documentationFileNew);
    };

    const {userRoles, progressBarOpened, progress, users} = props;
    return (
        <Paper className={classes.root}>
            <FileDetailsForm
                documentationFile={documentationFile}
                documentationFileRevision={documentationFileRevision}
                notifyByEmail={notifyByEmail}
                notifyByMessageBoard={notifyByMessageBoard}
                userRoles={userRoles}
                userGroups={[]}
                departments={[]}
                subdivisions={[]}
                users={users}
                editDisabled={false}
                onRadioButtonChange={handleRadioButtonChange}
                onInputFileChange={handleInputFileChange}
                onInputRevisionChange={handleInputRevisionChange}
                onSwitchFileChange={handleSwitchFileChange}
                onSwitchRevisionChange={handleSwitchRevisionChange}
                onMultiSelectUserRoleChange={handlePermissionUserRoleSelectChange}
                onMultiSelectUserGroupChange={handlePermissionUserGroupSelectChange}
                onMultiSelectDepartmentChange={handlePermissionDepartmentSelectChange}
                onMultiSelectChange={handlePermissionSelectChange}
                onCheckboxNotifyByEmailChange={handleCheckboxNotifyByEmailChange}
                onCheckboxNotifyByMessageBoardChange={handleCheckboxNotifyByMessageBoardChange}
                onDateTimeChange={handleDateTimeChange}
                onDocumentationFileSave={handleDocumentationFileSave}
                gridSpacing={2}
                onFileDrop={handleFileDrop}
                onCancelDocumentationFile={handleCancelDocumentationFile}
                onSelectChange={handleSelectChange}
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
    documentationFile: PropTypes.object.isRequired,
    documentationFileRevision: PropTypes.object.isRequired,
    userRoles: PropTypes.array.isRequired,
    onDocumentationFileSave: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        progress: state.Progress.progress,
        progressBarOpened: state.Progress.progressOpened,
        users: state.User.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FileDetails));
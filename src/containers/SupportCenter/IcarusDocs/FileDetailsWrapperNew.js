import React, { useEffect } from 'react';
import {connect} from "react-redux";
import FileDetails from "./FileDetails";
import {bindActionCreators} from "redux";
import * as userRoleActions from '../../../redux/user/role/userRoleActions';
import * as icarusDocumentationFileActions from '../../../redux/support/icarusDocs/file/icarusDocumentationFileActions';

function FileDetailsWrapperNew(props) {

    useEffect(() => {
        if (props.userRoles.length === 0) {
            props.userRoleActions.loadAll();
        }
    }, [])

    const handleDocumentationFileSave = (icarusDocumentationFile, icarusDocumentationFolder, selectedClients, file) => {
        let data = {
            icarusDocumentationFile,
            icarusDocumentationFolder,
            selectedClients
        }
        let path = "/";
        if (props.icarusDocumentationFolderPath.length > 0) {
            let currentFolder = props.icarusDocumentationFolderPath.slice(-1)[0];
            data.documentationFolder = currentFolder;
            path = currentFolder.path + currentFolder.folderName + "/";
        }

        let viewModel = {
            file: file,
            path: path,
            data: JSON.stringify(data)
        }
        props.icarusDocumentationFileActions.upload(viewModel);
    }

    const {userRoles} = props;
    return (
        <FileDetails
            userRoles={userRoles}
            onDocumentationFileSave={handleDocumentationFileSave}
        />
    );
}

function mapStateToProps(state, ownProps) {
    return {
        icarusDocumentationFolderPath: state.IcarusDocumentationFolder.icarusDocumentationFolderPath,
        userRoles: state.UserRole.userRoles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userRoleActions: bindActionCreators(userRoleActions, dispatch),
        icarusDocumentationFileActions: bindActionCreators(icarusDocumentationFileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileDetailsWrapperNew);
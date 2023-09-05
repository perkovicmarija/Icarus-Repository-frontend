import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as userRoleActions from '../../../redux/user/role/userRoleActions';
import * as icarusDocumentationFileActions from '../../../redux/support/icarusDocs/file/icarusDocumentationFileActions';
import {bindActionCreators} from 'redux';
import FileDetails from './FileDetails';

function FileDetailsWrapperEdit(props) {
    const [icarusDocumentationFile, setIcarusDocumentationFile] = useState({
        protectedFile: false,
        uncontrolledCopy: false,
    })

    useEffect(() => {
        setIcarusDocumentationFile(props.icarusDocumentationFile);
    }, [])

    const handleDocumentationFileSave = (icarusDocumentationFile, file, notifyByEmail, notifyByMessageBoard) => {
        let data = {
            icarusDocumentationFile: icarusDocumentationFile,
            notifyByEmail,
            notifyByMessageBoard
        }
        let path = "/";
        if (props.icarusDocumentationFolderPath?.length > 0) {
            let currentFolder = props.icarusDocumentationFolderPath.slice(-1)[0];
            data.icarusDocumentationFolder = currentFolder;
            path = currentFolder.path + currentFolder.folderName + "/";
        }

        let viewModel = {
            file: file,
            path: path,
            data: JSON.stringify(data)
        }
        props.icarusDocumentationFileActions.editFile(viewModel);
    }

    return (
        <FileDetails
            icarusDocumentationFile={icarusDocumentationFile}
            onDocumentationFileSave={handleDocumentationFileSave}
        />
    );
}

function mapStateToProps(state, ownProps) {
    return {
        icarusDocumentationFile: state.IcarusDocumentationFile.icarusDocumentationFile,
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

export default connect(mapStateToProps, mapDispatchToProps)(FileDetailsWrapperEdit);
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FileDetails from "./FileDetails";
import { bindActionCreators } from "redux";
import * as icarusDocumentationFileActions from "../../redux/support/icarusDocs/file/icarusDocumentationFileActions";
import UserRoleApi from "../../api/UserRoleApi";

function FileDetailsWrapperNew(props) {
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    UserRoleApi.getAll().then((result) => setUserRoles(result.data));
  }, []);

  const handleDocumentationFileSave = (
    icarusDocumentationFile,
    icarusDocumentationFolder,
    selectedClients,
    file
  ) => {
    let data = {
      icarusDocumentationFile,
      icarusDocumentationFolder,
      selectedClients,
    };
    let path = "/";
    if (props.icarusDocumentationFolderPath.length > 0) {
      let currentFolder = props.icarusDocumentationFolderPath.slice(-1)[0];
      data.documentationFolder = currentFolder;
      path = currentFolder.path + currentFolder.folderName + "/";
    }

    let viewModel = {
      file: file,
      path: path,
      data: JSON.stringify(data),
    };
    props.icarusDocumentationFileActions.upload(viewModel);
  };

  return (
    <FileDetails
      userRoles={userRoles}
      onDocumentationFileSave={handleDocumentationFileSave}
    />
  );
}

function mapStateToProps(state, ownProps) {
  return {
    icarusDocumentationFolderPath:
      state.IcarusDocumentationFolder.icarusDocumentationFolderPath,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    icarusDocumentationFileActions: bindActionCreators(
      icarusDocumentationFileActions,
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileDetailsWrapperNew);

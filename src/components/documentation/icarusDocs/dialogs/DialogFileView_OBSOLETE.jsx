import React, { useEffect } from "react";
import DialogGenericWarning from "../../../core/Dialog/DialogGenericWarning.jsx";
import DialogNoCloseFrame from "../../../core/Dialog/DialogNoCloseFrame.jsx";
import DialogProgress from "../../../core/Dialog/DialogProgress.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import DialogPdfFullView from "../../../../containers/FileView/PdfViewer/DialogPdfFullView.js";
import * as icarusDocumentationFileActions from "../../../../redux/icarusDocs/file/icarusDocumentationFileActions.js";

function DialogFileView({
  progressBarOpened,
  progress,
  file,
  icarusDocumentationFileActions,
  icarusDocumentationFileId,
}) {
  const history = useHistory();
  useEffect(() => {
    icarusDocumentationFileActions.viewFile({
      icarusDocumentationFileId,
      viewFile: true,
    });
  }, []);

  const handleDialogWarningClose = () => {
    history.goBack();
  };

  const handleFullViewDialogClose = () => {
    history.goBack();
  };

  const handleCancelClick = () => {
    icarusDocumentationFileActions.cancelViewFile();
  };

  if (file.headers) {
    let filename = "";
    const disposition = file.headers["content-disposition"];
    if (disposition && disposition.indexOf("attachment") !== -1) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(disposition);
      if (matches !== null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    filename = decodeURIComponent(filename);

    let fileExt = filename.split(".").pop();

    if (fileExt.toLowerCase() === "pdf") {
      return (
        <DialogPdfFullView
          open={true}
          onClose={handleFullViewDialogClose}
          file={file}
          filename={filename}
        />
      );
    } else {
      return (
        <DialogGenericWarning
          open={true}
          onClose={handleDialogWarningClose}
          text="general.file.view.notSupported"
        />
      );
    }
  } else {
    return (
      <DialogNoCloseFrame
        title="general.loading"
        open={progressBarOpened}
        formComponent={
          <DialogProgress
            showCancel
            onCancelClick={handleCancelClick}
            progress={progress}
          />
        }
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { id } = ownProps.match.params;
  return {
    icarusDocumentationFileId: id,
    file: state.IcarusDocumentationFile.file,
    progress: state.Progress.progress,
    progressBarOpened: state.Progress.progressOpened,
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
)(withRouter(DialogFileView));

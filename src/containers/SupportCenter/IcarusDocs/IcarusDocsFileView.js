import React, {useEffect} from 'react';
import DialogGenericWarning from "../../../components/core/Dialog/DialogGenericWarning";
import DialogNoCloseFrame from "../../../components/core/Dialog/DialogNoCloseFrame";
import DialogProgress from "../../../components/core/Dialog/DialogProgress";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import DialogPdfFullView from "../../FileView/PdfViewer/DialogPdfFullView";
import * as icarusDocumentationFileActions from '../../../redux/support/icarusDocs/file/icarusDocumentationFileActions';

function FileView(props) {

    useEffect(() => {
        let viewModel = {
            documentationFileId: props.documentationFileId,
            viewFile: true
        };
        props.icarusDocumentationFileActions.viewFile(viewModel);
    }, []);

    const handleDialogWarningClose = () => {
        props.history.goBack()
    }

    const handleFullViewDialogClose = () => {
        props.history.goBack()
    }

    const handleCancelClick = () => {
        props.icarusDocumentationFileActions.cancelViewFile();
    }

    const {progressBarOpened, progress, file} = props;
    if (file.headers) {
        let filename = "";
        const disposition = props.file.headers['content-disposition'];
        if (disposition && disposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches !== null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }
        filename = decodeURIComponent(filename);

        let fileExt = filename.split('.').pop();

        if (fileExt.toLowerCase() === "pdf") {
            return (
                <DialogPdfFullView
                    open={true}
                    onClose={handleFullViewDialogClose}
                    file={props.file}
                    filename={filename}
                />
            )
        } else {
            return (
                <DialogGenericWarning
                    open={true}
                    onClose={handleDialogWarningClose}
                    text="general.file.view.notSupported"
                />
            )

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
                        progress={progress}/>
                }/>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const {id} = ownProps.match.params;
    return {
        documentationFileId: id,
        file: state.IcarusDocumentationFile.file,
        progress: state.Progress.progress,
        progressBarOpened: state.Progress.progressOpened
    }
}

function mapDispatchToProps(dispatch) {
    return {
        icarusDocumentationFileActions: bindActionCreators(icarusDocumentationFileActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FileView));
import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as icarusDocumentationFileActions from '../../redux/support/icarusDocs/file/icarusDocumentationFileActions';
import DialogNoCloseFrame from '../../components/core/Dialog/DialogNoCloseFrame';
import DialogGenericWarning from '../../components/core/Dialog/DialogGenericWarning';
import DialogPdfFullView from './PdfViewer/DialogPdfFullView';
import DialogProgress from "../../components/core/Dialog/DialogProgress";
import {bindActionCreators} from "redux";

function FileView(props) {

    useEffect(() => {
        let viewModel = {
            documentationFileId: props.documentationFileId,
            viewFile: true
        };
        props.icarusDocumentationFileActions.viewFile(viewModel);
    }, []);

    const handleDialogWarningClose = () => {
        props.history.push('/dashboard/documentation');
        //props.history.goBack()
    }

    const handleFullViewDialogClose = () => {
        props.history.push('/dashboard/documentation');
        //props.history.goBack()
    }

    const handleCancelClick = () => {
        props.icarusDocumentationFileActions.cancelViewFile();
    }

    const handleDownloadClick = () => {
        let viewModel = {
            documentationFileId: props.documentationFileId,
            viewFile: false
        }

        props.icarusDocumentationFileActions.download(viewModel)
    }

    const {progressBarOpened, progress, file} = props;
    if (file.headers) {
        let filename = "";
        let protectedFromDownload = true;
        const disposition = props.file.headers['content-disposition'];
        if (disposition && disposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches !== null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
            let dispositionsArray = disposition.split(";");
            if(dispositionsArray.length === 3) {
                let protectedProp = dispositionsArray[2].trim();
                let protectedArray = protectedProp.split("=");
                if(protectedArray.length === 2) {
                    let protectedValue = protectedArray[1];
                    protectedFromDownload = (protectedValue === 'true');
                }
            }
        }
        filename = decodeURIComponent(filename);

        let fileExt = filename.split('.').pop();

        if (fileExt.toLowerCase() === "pdf") {
            return (
                <React.Fragment>
                    <DialogPdfFullView
                        open={true}
                        onClose={handleFullViewDialogClose}
                        file={props.file}
                        filename={filename}
                        onDownloadClick={!protectedFromDownload && handleDownloadClick}
                    />
                    <DialogNoCloseFrame
                        title="general.loading"
                        open={progressBarOpened}
                        formComponent={
                            <DialogProgress
                                showCancel
                                onCancelClick={handleCancelClick}
                                progress={progress}/>
                        }/>
                </React.Fragment>
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
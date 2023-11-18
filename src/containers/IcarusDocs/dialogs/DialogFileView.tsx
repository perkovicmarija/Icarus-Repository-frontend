import { useEffect } from "react";
import DialogGenericWarning from "../../../components/core/Dialog/DialogGenericWarning";
import DialogNoCloseFrame from "../../../components/core/Dialog/DialogNoCloseFrame";
import DialogProgress from "../../../components/core/Dialog/DialogProgress";
import { useHistory } from "react-router-dom";
import DialogPdfFullView from "../../FileView/PdfViewer/DialogPdfFullView";
import * as icarusDocumentationFileActions from "../../../redux/support/icarusDocs/file/icarusDocumentationFileActions";
import { TODO } from "../../../components/core/TODO";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

function DialogFileView({ match }: any) {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const icarusDocumentationFileId = match.params.id;

  const file = useAppSelector((state) => state.IcarusDocumentationFile.file);
  const progress = useAppSelector((state) => state.Progress.progress);
  const progressBarOpened = useAppSelector(
    (state) => state.Progress.progressOpened
  );

  useEffect(() => {
    dispatch(
      icarusDocumentationFileActions.viewFile({
        icarusDocumentationFileId,
        viewFile: true,
      })
    );

    () => console.log("rafa unmount");
  }, []);

  const onClose = () => {
    history.goBack();
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

    const fileExt = filename.split(".").pop();

    return <TODO />;

    /* if (fileExt?.toLowerCase() === "pdf") {
      return (
        <DialogPdfFullView
          open={true}
          onClose={onClose}
          file={file}
          filename={filename}
        />
      );
    } else {
      return (
        <DialogGenericWarning
          open={true}
          onClose={onClose}
          text="general.file.view.notSupported"
        />
      );
    } */
  } else {
    return (
      <DialogNoCloseFrame title="general.loading" open={progressBarOpened}>
        <DialogProgress progress={progress} />
      </DialogNoCloseFrame>
    );
  }
}

export default DialogFileView;

import { useEffect, useState } from "react";
import DialogGenericWarning from "../../../components/core/Dialog/DialogGenericWarning";
import DialogProgress from "../../../components/core/Dialog/DialogProgress";
import { useHistory } from "react-router-dom";
import DialogPdfFullView from "../../FileView/PdfViewer/DialogPdfFullView";
import IcarusDocumentationFileApi from "../../../api/IcarusDocumentationFileApi";
import { networkHelper } from "../../../redux/utils";
import { useAppDispatch } from "../../../redux/store";

function DialogFileView({ match }: any) {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const icarusDocumentationFileId = match.params.id;

  const [progress, setProgress] = useState<number | undefined>();
  const [abortController, setAbortController] = useState<
    AbortController | undefined
  >();

  const [file, setFile] = useState<any>();

  useEffect(() => {
    const abortController = new AbortController();
    setAbortController(abortController);
    dispatch(
      networkHelper(
        IcarusDocumentationFileApi.view2(
          {
            icarusDocumentationFileId,
            viewFile: true,
          },
          setProgress,
          abortController
        )
      )
    ).then(setFile);
  }, []);

  const onClose = () => {
    history.goBack();
  };

  if (file) {
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

    if (fileExt?.toLowerCase() === "pdf") {
      return (
        <DialogPdfFullView
          open={true}
          onClose={onClose}
          file={file}
          filename={filename}
          showDownloadButton={true}
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
    }
  } else {
    return (
      <DialogProgress
        type="download"
        progress={progress}
        onClose={() => {
          abortController!.abort();
          onClose();
        }}
      />
    );
  }
}

export default DialogFileView;

import { useEffect, useState } from "react";
import DialogGenericWarning from "../../../components/core/Dialog/DialogGenericWarning";
import DialogNoCloseFrame from "../../../components/core/Dialog/DialogNoCloseFrame";
import DialogProgress from "../../../components/core/Dialog/DialogProgress";
import { useHistory } from "react-router-dom";
import DialogPdfFullView from "../../FileView/PdfViewer/DialogPdfFullView";
import IcarusDocumentationFileApi from "../../../api/IcarusDocumentationFileApi";

function DialogFileView({ match }: any) {
  const history = useHistory();

  const icarusDocumentationFileId = match.params.id;

  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<any>();

  useEffect(() => {
    const specialRequest = IcarusDocumentationFileApi.view2(
      {
        icarusDocumentationFileId,
        viewFile: true,
      },
      setProgress
    );

    specialRequest.axiosPromise.then((response) => setFile(response));
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
      <DialogNoCloseFrame title="general.loading" open={true}>
        <DialogProgress progress={progress} />
      </DialogNoCloseFrame>
    );
  }
}

export default DialogFileView;

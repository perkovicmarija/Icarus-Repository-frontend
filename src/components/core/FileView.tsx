import DialogPdfFullView from "../../containers/FileView/PdfViewer/DialogPdfFullView";
import DialogGenericWarning from "./Dialog/DialogGenericWarning";

export const FileView = ({ file, onClose }) => {
  if (!file) {
    return null;
  }

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
        /* showDownloadButton={true}
        onDownloadClick={handleDownloadClick} */
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
};

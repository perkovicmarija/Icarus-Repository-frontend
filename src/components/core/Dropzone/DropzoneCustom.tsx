import { useMemo, useCallback, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
  IconButton,
  ListSubheader,
} from "@mui/material";
import { Delete, VerticalAlignBottom } from "@mui/icons-material";
import DialogGenericWarning from "../../core/Dialog/DialogGenericWarning";
import { FormattedMessage } from "react-intl";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#043076",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "inherit",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function DropzoneCusom({
  disabled,
  maxSize,
  onDropAccepted,
  files,
  maxSizeMb,
  onDelete,
  onDownload,
  showDownload,
}: DropzoneOptions & {
  files: any[];
  maxSizeMb: string;
  onDelete?: any;
  onDownload?: any;
  showDownload?: boolean;
  showDelete?: boolean;
}) {
  const [dialogWarningSizeOpen, setDialogWarningSizeOpen] = useState(false);

  const onDropRejected = useCallback((rejectedFiles) => {
    setDialogWarningSizeOpen(true);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    //accept: 'image/*,application/pdf',
    disabled,
    maxSize,
    multiple: false,
    onDropAccepted,
    onDropRejected: onDropRejected,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  const handleDialogWarningSizeClose = () => {
    setDialogWarningSizeOpen(false);
  };

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>
          <FormattedMessage id="general.dragAndDropFile" />
        </p>
        <p>
          <FormattedMessage
            id="general.dragAndDropFileMaxSize"
            values={{ maxSizeMb }}
          />
        </p>
      </div>

      <List
        style={{
          background: files.length > 0 ? "lightblue" : "#ffd4b4",
        }}
      >
        {files.length > 0 ? (
          files.map((file, index) => {
            return (
              <ListItem key={file.path}>
                <ListItemText primary={file.path} />
                <ListItemSecondaryAction>
                  {showDownload && (
                    <Tooltip title={<FormattedMessage id="general.download" />}>
                      <span>
                        <IconButton
                          edge="end"
                          aria-label="download"
                          disabled={!disabled}
                          onClick={() => onDownload(file, index)}
                        >
                          <VerticalAlignBottom />
                        </IconButton>
                      </span>
                    </Tooltip>
                  )}
                  <Tooltip title={<FormattedMessage id="general.delete" />}>
                    <span>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        disabled={disabled}
                        onClick={() => onDelete(file, index)}
                      >
                        <Delete />
                      </IconButton>
                    </span>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <ListItemText
              primary={"No file selected"}
              style={{ fontStyle: "italic" }}
            />
          </ListItem>
        )}
      </List>

      <DialogGenericWarning
        open={dialogWarningSizeOpen}
        onClose={handleDialogWarningSizeClose}
        text="attachments.maxSize.warning"
      />
    </div>
  );
}

export default DropzoneCusom;

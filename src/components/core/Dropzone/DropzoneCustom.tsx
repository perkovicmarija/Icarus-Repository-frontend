import { useMemo, useCallback, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import IntlMessages from "../IntlMessages";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import VerticalAlignBottom from "@mui/icons-material/VerticalAlignBottom";
import ListSubheader from "@mui/material/ListSubheader";
import DialogGenericWarning from "../Dialog/DialogGenericWarning";
import { FormHelperText } from "@mui/material";

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

function DropzoneCustom({
  disabled,
  maxSize,
  multiple,
  onDropAccepted,
  //
  errorMessage,
  files,
  maxSizeMb,
  onDelete,
  onDownload,
  showDownload,
  showDelete,
}: DropzoneOptions & {
  errorMessage?: string;
  files: any[];
  maxSizeMb: string;
  onDelete?: any;
  onDownload?: any;
  showDownload?: boolean;
  showDelete?: boolean;
}) {
  const [dialogWarningSizeOpen, setDialogWarningSizeOpen] = useState(false);

  const onDropRejected = useCallback(() => {
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
    multiple,
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
    <div style={{ position: "relative" }}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>
          <IntlMessages id="general.dragAndDropFile" />
        </p>
        <p>
          <IntlMessages
            id="general.dragAndDropFileMaxSize"
            values={{ maxSizeMb: maxSizeMb }}
          />
        </p>
      </div>
      <List
        sx={{
          backgroundColor: files.length === 0 ? "#ffd7c0" : "#e3f2fd",
        }}
        subheader={
          files.length === 0 && (
            <ListSubheader sx={{ backgroundColor: "inherit" }}>
              <IntlMessages id={"documentation.noFilesAdded"} />
            </ListSubheader>
          )
        }
        dense
      >
        {files.map((file, index) => {
          return (
            <ListItem key={index}>
              <ListItemText primary={file.path} />
              <ListItemSecondaryAction>
                {showDownload && (
                  <Tooltip title={<IntlMessages id="general.download" />}>
                    <>
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
                    </>
                  </Tooltip>
                )}
                {showDelete && (
                  <Tooltip title={<IntlMessages id="general.delete" />}>
                    <>
                      <span>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          disabled={disabled}
                          onClick={() => onDelete(file, index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </>
                  </Tooltip>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>

      {errorMessage && (
        <FormHelperText error={true}>
          <IntlMessages id={errorMessage} />
        </FormHelperText>
      )}

      <DialogGenericWarning
        open={dialogWarningSizeOpen}
        onClose={handleDialogWarningSizeClose}
        text="attachments.maxSize.warning"
      />
    </div>
  );
}

export default DropzoneCustom;

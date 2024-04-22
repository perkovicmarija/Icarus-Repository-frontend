import { useState } from "react";
import { Button, DialogActions, DialogContent, Grid } from "@mui/material";
import DropzoneCustom from "../core/Dropzone/DropzoneCustom";
import TypographyReportField from "../core/TypographyReportField";
import { FormattedMessage } from "react-intl";
import TextFiledReport from "../core/TextField/TextFiledReport";

const DialogFormAttachFile = ({
  onSubmit,
  onClose,
  hideDescription,
  maxAttachmentSize,
}) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();

  const onFileDrop = (file) => {
    if (file && file.length > 0) {
      setFile(file[0]);
    }
  };

  const onInputChange = (name) => (event) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <DialogContent>
        <Grid container spacing={1}>
          {!hideDescription && (
            <Grid item xs={12}>
              <TypographyReportField title="general.description" />
              <TextFiledReport
                disabled={false}
                id="description"
                label=""
                name="description"
                value={description}
                onInputChange={onInputChange}
                type="text"
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <DropzoneCustom
              onDropAccepted={onFileDrop}
              disabled={false}
              maxSize={Number(maxAttachmentSize) * 1048576}
              maxSizeMb={maxAttachmentSize + "MB"}
              files={file ? [file] : []}
              onDelete={() => setFile(undefined)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          <FormattedMessage id="action.close" />
        </Button>
        <Button
          onClick={() => onSubmit(file, description)}
          disabled={!file || file.length === 0}
        >
          <FormattedMessage id="action.add" />
        </Button>
      </DialogActions>
    </>
  );
};

export default DialogFormAttachFile;

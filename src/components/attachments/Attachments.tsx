import { useState } from "react";
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import { VerticalAlignBottom, Delete } from "@mui/icons-material";
import DialogFormAttachFile from "./DialogFormAttachFile";
import DialogFormFrame from "../core/Dialog/DialogFormFrame";
import DialogGenericWarning from "../core/Dialog/DialogGenericWarning";
import IntlMessages from "../core/IntlMessages";
import TableToolbar2 from "../core/Table/TableToolbar2";
import {
  TableContainer3,
  useTableBodyPropsContext,
  useTableDataContext,
} from "../core/Table/TableContainer3";

export interface Attachment {
  attachmentId: string;
  filename: string;
  description: string;
}

const TableBody = () => {
  const data = useTableDataContext();
  const bodyProps = useTableBodyPropsContext();

  return data.map((attachment: Attachment, index: number) => (
    <TableRow key={attachment.filename}>
      <TableCell>{attachment.filename}</TableCell>
      <TableCell>{attachment.description}</TableCell>
      <TableCell className="nostretch">
        <Tooltip title={<IntlMessages id="general.download" />}>
          <>
            <div className="d-inline">
              <IconButton
                disabled={!attachment.attachmentId}
                aria-label="Edit"
                onClick={() => bodyProps.onAttachDownload(attachment)}
              >
                <VerticalAlignBottom />
              </IconButton>
            </div>
          </>
        </Tooltip>
        <Tooltip title={<IntlMessages id="general.delete" />}>
          <>
            <div className="d-inline">
              <IconButton
                disabled={bodyProps.disabled}
                aria-label="Delete"
                onClick={() => bodyProps.onAttachDelete(attachment, index)}
              >
                <Delete />
              </IconButton>
            </div>
          </>
        </Tooltip>
      </TableCell>
    </TableRow>
  ));
};

const Attachments = ({
  attachments,
  disabled,
  onAttachDownload,
  onAttachDelete,
  onAttachAdd,
}) => {
  const [dialogWarningOpen, setDialogWarningOpen] = useState(false);
  const [dialogAttachmentNew, setDialogAttachmentNew] = useState();

  const handleAttacheNewSubmit = (file, description) => {
    setDialogAttachmentNew(undefined);
    for (let i = 0, l = attachments.length; i < l; i++) {
      if (attachments[i].filename === file.path) {
        setDialogWarningOpen(true);
        return;
      }
    }
    onAttachAdd(file, { filename: file.path, description });
  };

  return (
    <>
      <TableToolbar2
        title="attachments.label"
        onAddClick={setDialogAttachmentNew}
      />

      <TableContainer3
        data={attachments}
        headerProps={{
          columnData: [
            { id: "filename", label: "general.filename" },
            { id: "description", label: "general.description" },
            {
              id: "actions",
              label: "general.actions",
              style: { textAlign: "center" },
            },
          ],
        }}
        Body={TableBody}
        BodyProps={{
          disabled,
          onAttachDelete,
          onAttachDownload,
        }}
      />

      <DialogFormFrame
        onClose={() => setDialogAttachmentNew(undefined)}
        title="attachments.label"
        open={dialogAttachmentNew}
      >
        <DialogFormAttachFile
          onClose={() => setDialogAttachmentNew(undefined)}
          onSubmit={handleAttacheNewSubmit}
          maxAttachmentSize={20}
          hideDescription={false}
        />
      </DialogFormFrame>

      <DialogGenericWarning
        open={dialogWarningOpen}
        onClose={() => setDialogWarningOpen(false)}
        text="attachments.duplicate"
      />
    </>
  );
};

export default Attachments;

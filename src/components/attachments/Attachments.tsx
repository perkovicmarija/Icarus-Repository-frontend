import { useState } from "react";
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import { VerticalAlignBottom, Delete, Visibility } from "@mui/icons-material";
import DialogFormAttachFile from "./DialogFormAttachFile";
import DialogFormFrame from "../core/Dialog/DialogFormFrame";
import DialogGenericWarning from "../core/Dialog/DialogGenericWarning";
import TableToolbar2 from "../core/Table/TableToolbar2";
import {
  TableContainer3,
  useTableBodyPropsContext,
  useTableDataContext,
} from "../core/Table/TableContainer3";
import { FormattedMessage } from "react-intl";

export interface IAttachment {
  attachmentId: string;
  filename: string;
  description: string;
}

const TableBody = () => {
  const data = useTableDataContext();
  const bodyProps = useTableBodyPropsContext();

  return data.map((attachment: IAttachment, index: number) => (
    <TableRow key={attachment.filename}>
      <TableCell style={{ paddingLeft: 0 }}>{attachment.filename}</TableCell>
      <TableCell>{attachment.description}</TableCell>
      <TableCell style={{ paddingRight: 0 }} className="nostretch">
        <Tooltip title={<FormattedMessage id="general.view" />}>
          <div className="d-inline">
            <IconButton
              disabled={!attachment.attachmentId}
              onClick={() => bodyProps.onAttachView(attachment)}
            >
              <Visibility />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="general.download" />}>
          <div className="d-inline">
            <IconButton
              disabled={!attachment.attachmentId}
              onClick={() => bodyProps.onAttachDownload(attachment)}
            >
              <VerticalAlignBottom />
            </IconButton>
          </div>
        </Tooltip>
        {bodyProps.onAttachDelete && (
          <Tooltip title={<FormattedMessage id="general.delete" />}>
            <div className="d-inline">
              <IconButton
                disabled={bodyProps.disabled}
                onClick={() => bodyProps.onAttachDelete(attachment, index)}
              >
                <Delete />
              </IconButton>
            </div>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  ));
};

const Attachments = ({
  attachments,
  disabled,
  hideHeader,
  onAttachView,
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
      {!hideHeader && (
        <TableToolbar2
          title="attachments.label"
          onAddClick={setDialogAttachmentNew}
        />
      )}

      <TableContainer3
        data={attachments}
        headerProps={{
          columnData: [
            {
              id: "filename",
              label: "general.filename",
              style: { paddingLeft: 0 },
            },
            { id: "description", label: "general.description" },
            {
              id: "actions",
              label: "general.actions",
              style: { textAlign: "center", paddingRight: 0 },
            },
          ],
        }}
        Body={TableBody}
        BodyProps={{
          disabled,
          onAttachView,
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

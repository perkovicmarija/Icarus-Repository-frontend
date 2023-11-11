import {
  DialogContent,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import IntlMessages from "../../../components/core/IntlMessages";
import { DialogActions2 } from "../../../components/core/Dialog/DialogActions2";
import { AuditChecklist } from "../../../redux/auditChecklistsSlice";

const DialogFormRevisions = ({
  auditChecklist,
  handleViewChecklist,
  onClose,
}: {
  auditChecklist: AuditChecklist;
  handleViewChecklist: (item: AuditChecklist) => void;
  onClose: () => void;
}) => {
  return (
    <>
      <DialogContent>
        <div style={{ fontSize: "1.25rem", width: "100%", textAlign: "center" }}>
          {auditChecklist.title}
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {" "}
                <IntlMessages id="general.active" />
              </TableCell>
              <TableCell>
                {" "}
                <IntlMessages id="documentation.revision" />{" "}
              </TableCell>
              <TableCell>
                {" "}
                <IntlMessages id="general.abbreviation" />{" "}
              </TableCell>
              <TableCell>
                {" "}
                <IntlMessages id="general.actions" />{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditChecklist.checklistRevisions.map((item: AuditChecklist) => {
              return (
                <TableRow>
                  <TableCell>
                    {item.active ? (
                      <strong>
                        <IntlMessages id="general.yes" />
                      </strong>
                    ) : (
                      <IntlMessages id="general.no" />
                    )}
                  </TableCell>
                  <TableCell>{item.version}</TableCell>
                  <TableCell>{item.abbreviation}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="View"
                      onClick={() => handleViewChecklist(item)}
                    >
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions2 onClose={onClose} hideSubmit={true} />
    </>
  );
};

export default DialogFormRevisions;
